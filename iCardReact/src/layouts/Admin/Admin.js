import React from "react";
import "./Admin.scss";
import { Login } from "../../pages/Admin";

export const Admin = (props) => {
  const { children } = props;

  const auth = null;
  if (!auth) return <Login />;

  return (
    <div>
      <p>Admin layout</p>
      {children}
    </div>
  );
};
