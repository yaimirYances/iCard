import React from "react";
import moment from "moment";
import { Image } from "semantic-ui-react";
import { ORDER_STATUS } from "../../../util/constants";
import classNames from "classnames";
import "./OrderingListItem.scss";

export const OrderingListItem = (props) => {
  const { order } = props;
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.create_at).startOf("second").fromNow()}
        </span>
      </div>
      <div className="order-history-item__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
};
