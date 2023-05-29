import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/Admin";
import { useTable } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { TableTables } from "../../components/Admin/Table/TableTables/TableTables";
import { ModalBasic } from "../../components/BasesModal/ModalBasic/ModalBasic";
import { AddEditTables } from "../../components/Admin/Table/AddEditTables";

export const TablesAdmin = () => {
  const [title, setTitle] = useState(null);
  const [show, setShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [content, setContent] = useState(null);

  const { loading, tables, getTables, deleteTable } = useTable();

  useEffect(() => {
    (async () => {
      await getTables();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const openModal = () => setShow((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addTable = () => {
    setTitle("Nueva Mesa:");
    setContent(<AddEditTables onClose={openModal} onRefetch={onRefetch} />);
    openModal();
  };

  const updateTable = (data) => {
    setTitle("Actualizar Mesa:");
    setContent(
      <AddEditTables onClose={openModal} onRefetch={onRefetch} table={data} />
    );
    openModal();
  };

  const onDeleteTable = async (data) => {
    const result = window.confirm(`Eliminar categoria ${data.number}?`);
    if (result) {
      try {
        await deleteTable(data.id);
        console.log("ELIMINADO");
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Mesas"
        btnTitle="Crear nueva mesa"
        btnClick={addTable}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTables
          tables={tables}
          updateTable={updateTable}
          deleteTable={onDeleteTable}
        />
      )}

      <ModalBasic
        show={show}
        onClose={openModal}
        title={title}
        children={content}
      />
    </>
  );
};
