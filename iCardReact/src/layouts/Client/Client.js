import React, { useEffect } from "react";
import "./Client.scss";
import { useTable } from "../../hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Icon } from "semantic-ui-react";

export const Client = (props) => {
  const { children } = props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams();
  const history = useNavigate();

  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      if (!exist) closeTable();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableNumber]);

  const closeTable = () => {
    history("/");
  };

  const goToCart = () => {
    history(`/client/${tableNumber}/cart`);
  };

  const goToOrders = () => {
    history(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="client-layout-bg">
      <div className="client-layout__header">
        <Link to={`/client/${tableNumber}`}>
          <h1>iCard</h1>
        </Link>
        <span>Mesa: {tableNumber}</span>
        <div>
          <Button icon primary onClick={goToCart}>
            <Icon name="shop" />
          </Button>
          <Button icon primary onClick={goToOrders}>
            <Icon name="list" />
          </Button>
          <Button icon primary onClick={closeTable}>
            <Icon name="sign-out" />
          </Button>
        </div>
      </div>
      <Container className="client-layout">
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
};
