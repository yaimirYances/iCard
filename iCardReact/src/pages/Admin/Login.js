import React from "react";
import "./login.scss";
import {LoginForm} from "../../components/Admin";

export const Login = () => {
  return (
    <div className="loginAdmin">
      <div className="loginAdmin__content">
        <h1>Entrar al panel</h1>
        <LoginForm/>
      </div>
    </div>
  );
};
