import React from "react";
import "./AddEditTables.scss";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks";

export const AddEditTables = (props) => {
  const { onClose, onRefetch, table } = props;
  const { addTable, updateTable } = useTable();

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(table ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (table) {
          await updateTable(table.id, formValues);
        } else {
          await addTable(formValues);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        placeholder="Numero de mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button
        type="submit"
        primary
        fluid
        content={table ? "Actualizar" : "Crear"}
      />
    </Form>
  );
};

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function newSchema() {
  return {
    number: Yup.number().required(true),
  };
}

function updateSchema() {
  return {
    number: Yup.number().required(true),
  };
}
