import React, { useEffect, useState } from "react";
import "./TableAdmin.scss";
import { ReactComponent as IcTable } from "../../../../assets/Mesas.svg";
import { getOrderTableApi } from "../../../../api/orders";
import { ORDER_STATUS } from "../../../../util/constants";
import classNames from "classnames";
import { size } from "lodash";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { usePayment } from "../../../../hooks";

export const TableAdmin = (props) => {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const { getPayment } = usePayment();

  useEffect(() => {
    (async () => {
      const response = await getOrderTableApi(table.id, ORDER_STATUS.PENDING);
      setOrders(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrderTableApi(table.id, ORDER_STATUS.DELIVERED);
      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPayment(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}
      {pendingPayment && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )}
      <IcTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          "pending-payment": pendingPayment,
        })}
      />
      <p>Mesa: {table.number}</p>
    </Link>
  );
};
