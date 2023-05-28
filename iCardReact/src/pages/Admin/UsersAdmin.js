import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import { HeaderPage } from "../../components/Admin/HeaderPage/HeaderPage";
import { Loader } from "semantic-ui-react";
import { AddEdit, TableUsers } from "../../components/Admin";
import { ModalBasic } from "../../components/BasesModal/ModalBasic/ModalBasic";

export const UsersAdmin = () => {
  const [title, setTitle] = useState(null);
  const [show, setShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [content, setContent] = useState(null);
  const { loading, users, getUsers, deleteUser } = useUser();

  useEffect(() => {
    (async () => {
      await getUsers();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const openModal = () => setShow((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitle("Nuevo usuario:");
    setContent(<AddEdit onClose={openModal} onRefetch={onRefetch} />);
    openModal();
  };

  const updateUser = (data) => {
    setTitle("Actualizar usuario:");
    setContent(
      <AddEdit onClose={openModal} onRefetch={onRefetch} user={data} />
    );
    openModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`Eliminar usuario ${data.email}?`);
    if (result) {
      try {
        await deleteUser(data.id);
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Usuarios:"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
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
