import React, { useCallback, useEffect, useState } from "react";
import "./AddEditPrud.scss";
import { Button, Checkbox, Dropdown, Form, Image } from "semantic-ui-react";
import { useCategory, useProduct } from "../../../../hooks";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddEditPrud = (props) => {
  const { onClose, onRefetch, product } = props;

  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );
  const { categories, getCategories } = useCategory();
  const { addProduct, updateProduct } = useProduct();

  useEffect(() => {
    (async () => {
      await getCategories();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      await setCategoriesFormat(formatDropdownData(categories));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (product) {
          await updateProduct(product.id, formValues);
        } else {
          await addProduct(formValues);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg,image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        name="price"
        type="number"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="Categoria"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
        error={formik.errors.category}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto activo
      </div>
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} fluid />
      <Button
        type="submit"
        content={product ? "Actualizar" : "Crear"}
        primary
        fluid
      />
    </Form>
  );
};

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.string().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.string().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  };
}
