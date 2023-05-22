import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./LoginForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
{
  /**Para modificar los valores por defecto en formik se realiza un onChange */
}
export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: (formValue) => {
      alert("Login OK");
      console.log(formValue);
    },
  });

  return (
    <div>
      <form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button type="submit" content="Iniciar sesion" primary fluid />
    </form>
    </div>
  );
};
