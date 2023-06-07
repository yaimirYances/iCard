import React, { useEffect, useState } from "react";
import { UseOrder, usePayment, useTable } from "../../hooks";
import { useParams } from "react-router-dom";
import { OrderingListItem } from "../../components/Client/OrderingListItem/OrderingListItem";
import { Button, Loader } from "semantic-ui-react";
import { forEach, map, size } from "lodash";
import { ModalConfirmPay } from "../../components/ModalConfirmPay/ModalConfirmPay";

export const OrdersHistory = () => {
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = UseOrder();
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [idTable, setIdTable] = useState(null);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { addPayment, getPayment } = usePayment();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);
      getOrdersByTable(idTableTemp, "", "ordering=-status,create_at");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getPayment(idTable);
      setIsRequestAccount(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTable]);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING",
    };

    const payment = await addPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>Historial de pedidos</h1>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              primary
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta esta pedida"
                : "Pedir la cuenta"}
            </Button>
          )}
          {map(orders, (order) => (
            <OrderingListItem key={order.id} order={order} />
          ))}
        </>
      )}
      <ModalConfirmPay
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("CARD")}
      />
    </div>
  );
};
