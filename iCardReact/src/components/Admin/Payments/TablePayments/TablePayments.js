import { map } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { ModalBasic } from "../../../BasesModal/ModalBasic/ModalBasic";
import { PaymentProductList } from "../PaymentProductList";

export const TablePayments = (props) => {
  const { payments } = props;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const openModal = () => setShow((prev) => !prev);

  const getIconPayment = (key) => {
    if (key === "CARD") return "credit card outline";
    if (key === "CASH") return "money bill alternate outline";
    return null;
  };

  const showDetails = (payment) => {
    setTitle(`Pedidos de la mesa: ${payment.table_data.number}`);
    setContent(<PaymentProductList payment={payment} />);
    openModal();
  };
  return (
    <>
      <Table className="table-payments-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Mesa</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Tipo de pago</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(payments, (payment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{payment.id}</Table.Cell>
              <Table.Cell>{payment.table_data.number}</Table.Cell>
              <Table.Cell>$ {payment.totalPayment}</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name={getIconPayment(payment.paymentType)} />
              </Table.Cell>
              <Table.Cell>
                {moment(payment.created_at).format("DD-MM-YYYY - HH:MM")}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Button Icon onClick={() => showDetails(payment)}>
                  <Icon name="eye" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ModalBasic
        show={show}
        onClose={openModal}
        title={title}
        children={content}
      />
    </>
  );
};
