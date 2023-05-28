import React, { useEffect, useState } from "react";
import { AddEditPrud, HeaderPage, TableProduct } from "../../components/Admin";
import { useProduct } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/BasesModal/ModalBasic";

export const ProductAdmin = () => {
  const [title, setTitle] = useState(null);
  const [show, setShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [content, setContent] = useState(null);
  const { loading, products, getProducts, deleteProduct } = useProduct();

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const openModal = () => setShow((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitle("Nueva Categoria:");
    setContent(<AddEditPrud onClose={openModal} onRefetch={onRefetch} />);
    openModal();
  };

  const updateProduct = (data) => {
    setTitle("Actualizar Producto:");
    setContent(
      <AddEditPrud onClose={openModal} onRefetch={onRefetch} product={data} />
    );
    openModal();
  };

  const onDeleteProduct = async (data) => {
    const result = window.confirm(`Eliminar categoria ${data.title}?`);
    if (result) {
      try {
        await deleteProduct(data.id);
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Categorias:"
        btnTitle="Nueva categoria"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProduct
          products={products}
          updateProduct={updateProduct}
          deleteProduct={onDeleteProduct}
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
