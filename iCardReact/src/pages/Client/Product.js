import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ListProducts } from "../../components/Client/ListProducts/ListProducts";

export const Product = () => {
  const { idCategory, tableNumber, category } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(() => {
    (async () => {
      await getProductsByCategory(idCategory);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCategory]);

  return (
    <div>
      <div className="link-category">
        <Link to={`/client/${tableNumber}`}>Atras</Link>
      </div>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListProducts products={products} category={category} />
      )}
    </div>
  );
};
