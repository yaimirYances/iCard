import React, { useEffect, useState } from "react";
import { AddEditCat, HeaderPage, TableCategory } from "../../components/Admin";
import { useCategory } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/BasesModal/ModalBasic/ModalBasic";

export const CategoriesAdmin = () => {
  const [title, setTitle] = useState(null);
  const [show, setShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [content, setContent] = useState(null);

  const { loading, categories, getCategories, deleteCategory} = useCategory();

  useEffect(() => {
    (async () => {
      await getCategories();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const openModal = () => setShow((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitle("Nueva categoria:");
    setContent(<AddEditCat onClose={openModal} onRefetch={onRefetch} />);
    openModal();
  };

  const updateCategory = (data) => {
    setTitle("Actualizar categoria:");
    setContent(
      <AddEditCat onClose={openModal} onRefetch={onRefetch} category={data} />
    );
    openModal();
  };

  const onDeleteCategory = async (data) => {
    const result = window.confirm(`Eliminar categoria ${data.title}?`);
    if (result) {
      try {
        await deleteCategory(data.id);
        console.log("ELIMINADO")
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
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategory
          categories={categories}
          updateCategory={updateCategory}
          deleteCategory={onDeleteCategory}
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
