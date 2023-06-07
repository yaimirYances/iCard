import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../../components/Client/ListCategories/ListCategories";
import { Loader } from "semantic-ui-react";

export const Categories = () => {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    (async () => {
     await getCategories();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Categorias</h3>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListCategories categories={categories} />
      )}
    </div>
  );
};
