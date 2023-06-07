import { forEach, map } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Icon, Image } from "semantic-ui-react";
import "./ListProductCart.scss";
import { clearProductsCart, removeProductsCart } from "../../../api/cart";
import { UseOrder, useTable } from "../../../hooks";
import { useNavigate, useParams } from "react-router-dom";

export const ListProductCart = (props) => {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = UseOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const history = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductsCart(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }
    clearProductsCart();
    history(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title}</span>
          </div>
          <span>$ {product.price}</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}
      <Button primary fluid onClick={createOrder}>
        Realizar pedido ($ {total})
      </Button>
    </div>
  );
};
