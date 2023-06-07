import React, { useEffect, useState } from "react";
import { getProductsCart } from "../../api/cart";
import { useProduct } from "../../hooks";
import { Button, Loader } from "semantic-ui-react";
import { size } from "lodash";
import { Link, useParams } from "react-router-dom";
import { ListProductCart } from "../../components/Client/ListProductCart/ListProductCart";

export const Cart = () => {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProduct } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductCart = getProductsCart();
      const productArray = [];
      for await (const idProduct of idProductCart) {
        const response = await getProduct(idProduct);
        productArray.push(response);
      }
      setProducts(productArray);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h1>Carrito</h1>
      {!products ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : size(products) < 1 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
};
