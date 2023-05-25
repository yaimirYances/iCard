import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./LoginForm.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../../api/user";
import { useAuth } from "../../../hooks";

//Para modificar los valores por defecto en formik se realiza un onChange
export const LoginForm = () => {
  const { login } = useAuth(); //Haciendo login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),
    // Aplicando  comunicacion con la API
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        //Devolviendo el token
        const { access } = response;
        login(access); //pasando el token de acceso
      } catch (error) {
        //Mostrando mensaje de la tarea programada
        toast.error(error.message);
      }
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
