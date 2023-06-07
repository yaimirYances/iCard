import React, { useEffect, useState } from "react";
import { UseOrder, usePayment, useTable } from "../../hooks";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import {
  AddOrderForm,
  HeaderPage,
  PaymentDetail,
  TablesDetails,
} from "../../components/Admin";
import { ModalBasic } from "../../components/BasesModal/ModalBasic/ModalBasic";
import { forEach, size } from "lodash";

export const TableDetails = () => {
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = UseOrder();
  const [reload, setReload] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { table, getTable } = useTable();
  const [show, setShow] = useState(false);
  const { addPayment, getPayment } = usePayment();

  useEffect(() => {
    (async () => {
      await getOrdersByTable(id, "", "ordering=-status,create_at");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reload]);

  useEffect(() => {
    (async () => {
      await getTable(id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await getPayment(id);
      if (size(response) > 0) {
        setPaymentData(response[0]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const onReloadOrder = () => setReload((prev) => !prev);
  const openModal = () => setShow((prev) => !prev);

  const OnCreatePayment = async () => {
    const result = window.confirm("Estas seguro de generar la cuenta?");
    if (result) {
      let total = 0;
      forEach(orders, (order) => (total += Number(order.product_data.price)));
      const paymentData = {
        table: id,
        totalPayment: total.toFixed(2),
        paymentType: "CARD",
        statusPayment: "PENDING",
      };
      const payment = await addPayment(paymentData);
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrder();
    }
  };

  return (
    <div>
      <HeaderPage
        title={`mesa: ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedidos"}
        btnClick={openModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={OnCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesDetails orders={orders} onReloadOrder={onReloadOrder} />
      )}
      <ModalBasic show={show} onClose={openModal} title="Generar pedidos">
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openModal={openModal}
            onReloadOrder={onReloadOrder}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openModal={openModal}
            onReloadOrder={onReloadOrder}
          />
        )}
      </ModalBasic>
    </div>
  );
};
