import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  return (
    <div className="category">
      <div className="category-name">
        <h1 title={props.name}>{props.name}</h1>
      </div>
      <div className="category-img">
        <Link to={props.path}>
          <img src={props.img} alt={props.img} />
        </Link>
      </div>
    </div>
  );
}

export default Category;
