import React from "react";
import { map } from "lodash";
import "./TableProduct.scss";
import { Button, Icon, Image, Table } from "semantic-ui-react";

export const TableProduct = (props) => {
  const { products, updateProduct, deleteProduct } = props;
  return (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Table.Cell>
              <Actions
                product={product}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

function Actions(props) {
  const { product, updateProduct, deleteProduct } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteProduct(product)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
