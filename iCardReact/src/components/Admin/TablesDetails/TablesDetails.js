import { map } from "lodash";
import React from "react";
import { OrderDetails } from "./OrderDetails";

export const TablesDetails = (props) => {
  const { orders, onReloadOrder } = props;

  return (
    <div className="list-orders-admin">
      {map(orders, (order) => (
        <OrderDetails key={order.id} order={order} onReloadOrder={onReloadOrder} />
      ))}
    </div>
  );
};
