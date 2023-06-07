import React, { useState } from "react";
import "./SelectTable.scss";
import { Button, Form } from "semantic-ui-react";
import { useTable } from "../../../hooks";
import { useNavigate } from "react-router-dom";

export const SelectTable = () => {
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();
  const history = useNavigate();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("No ha introducido una mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) history(`/client/${tableNum}`);
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenidos</h1>
        <h2>Introduce tu numero de mesa:</h2>
        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="1 - 45"
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid>
            Entrar
          </Button>
        </Form>
        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
};
