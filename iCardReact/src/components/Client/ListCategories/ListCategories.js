import React from "react";
import "./ListCategories.scss";
import { map } from "lodash";
import { Image } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";

export const ListCategories = (props) => {
  const { categories } = props;
  const history = useNavigate();
  const location = useLocation();

  const goToCategory = (id, category) => {
    history(`${location.pathname}/${id}/${category}`);
  };

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="list-categories-client__category"
          onClick={() => goToCategory(category.id, category.title)}
        >
          <Image src={category.image} size="small" />
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  );
};
