import React from "react";
import "./Admin.scss";
import { Login } from "../../pages/Admin";
import { useAuth } from "../../hooks";
import { SideMenu, TopMenu } from "../../components/Admin";

export const Admin = (props) => {
  const { children } = props;

  const { auth } = useAuth();
  if (!auth) return <Login />;

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>
      <div className="admin-layout__main-content">
        <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
};
