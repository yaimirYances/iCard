import React from "react";
import "./ListProducts.scss";
import { map } from "lodash";
import { Button, Icon, Image, Label } from "semantic-ui-react";
import { addProductCart } from "../../../api/cart";
import { toast } from "react-toastify";

export const ListProducts = (props) => {
  const { products, category } = props;

  const addCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.title} - Añadido al carrito`);
  };

  return (
    <div className="list-products-client">
      <span>
        <Label>{category}</Label>
      </span>
      {map(products, (product) => (
        <div key={product.id} className="list-products-client__product">
          <div>
            <Image src={product.image} size="small" />
            <span>{product.title}</span>
          </div>
          <Button icon primary onClick={() => addCart(product)}>
            <Icon name="add" />
          </Button>
        </div>
      ))}
    </div>
  );
};
