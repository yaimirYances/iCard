import React, { useEffect, useState } from "react";
import { UseOrder } from "../../../../hooks";
import { map } from "lodash";
import { Image } from "semantic-ui-react";

export const PaymentProductList = (props) => {
  const { payment } = props;
  const [orders, setOrders] = useState(null);
  const { getOrdersByPayment } = UseOrder();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="payment-product-list">
      {map(orders, (order) => (
        <div>
          <Image src={order.product_data.image} avatar size="tiny" />
          <span>$ {order.product_data.price}</span>
        </div>
      ))}
    </div>
  );
};
