import React, { useEffect, useState } from "react";
import { HeaderPage, TablesList } from "../../components/Admin";
import { useTable } from "../../hooks";
import { Loader } from "semantic-ui-react";

export const OrdersAdmin = () => {
  const [title, setTitle] = useState(null);
  const [show, setShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [content, setContent] = useState(null);

  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    (async () => {
      await getTables();
    })();
  }, []);

  return (
    <>
      <HeaderPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesList tables={tables} />
      )}
    </>
  );
};
