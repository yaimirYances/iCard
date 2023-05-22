import React from "react";
import "./Client.scss";

export const Client = (props) => {
  const { children } = props;
  return (
    <div>
      <p>Client layout</p>
      {children}
    </div>
  );
};
