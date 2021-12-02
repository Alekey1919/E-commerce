import React from "react";
import { Link } from "react-router-dom";

function Related(props) {
  console.log(props.img);

  return (
    <div className="related">
      <Link to={`/product/${props.id}`} className="related-img">
        <img src={props.img} alt={props.name} />
      </Link>
      <div className="related-info">
        <h1>{props.name}</h1>
        <p>
          $<strong>{props.price}</strong>
        </p>
      </div>
    </div>
  );
}

export default Related;
