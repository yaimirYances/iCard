import React from "react";
import { Button, Image } from "semantic-ui-react";
import "./OrderDetails.scss";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../../util/constants";
import { UseOrder } from "../../../../hooks";

export const OrderDetails = (props) => {
  const { order,onReloadOrder } = props;
  const { title, image } = order.product_data;
  const { checkDeliveredOrder } = UseOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrder()
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.create_at).format("HH:mm")}</span>
        {" - "}
        <span>{moment(order.create_at).startOf("secods").fromNow()}</span>
      </div>
      <div className="order-item-admin__status">
        {order.status == "PENDING" ? "Pediente" : "Entregado"}
      </div>
      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING && (
        <Button primary onClick={() => onCheckDeliveredOrder()}>
          Marcar entregado
        </Button>
      )}
    </div>
  );
};
