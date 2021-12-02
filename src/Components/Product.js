import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div className="product">
      <Link to={`/product/${props.id}`} className="product-img">
        <img src={props.img} alt={props.name} />
      </Link>
      <div className="product-info">
        <h1>{props.name}</h1>
        <p>
          <strong>$</strong>
          {props.price}
        </p>
        <div className="product-info-rating">
          {Array(props.stars)
            .fill()
            .map((_, i) => (
              <i className="fas fa-star" key={i}></i>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
