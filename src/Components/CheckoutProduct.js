import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../Helper/StateProvider";

function CheckoutProduct(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    // Weirdly enough, if you don't add this function and you decrease a checkoutProduct to 0, the quantity of the product below it will be set to 0 as well. By adding this you always set the quantity state to the correct value
    setQuantity(props.quantity);
  }, [props]);

  const handleAdd = () => {
    let newCount = quantity + 1; // Save the value locally because of the asynchronous nature of setState
    setQuantity(newCount);

    dispatch({
      type: "INCREMENT_BY_ONE",
      item: {
        id: props.id,
        price: props.price,
        quantity: newCount,
        totalPrice: newCount * props.price,
      },
    });
  };

  const handleRemove = () => {
    let newCount = quantity - 1; // Save the value locally because of the asynchronous nature of setState
    setQuantity(newCount);

    if (newCount === 0) {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: props.id,
      });
    } else {
      dispatch({
        type: "DECREMENT_BY_ONE",
        item: {
          id: props.id,
          price: props.price,
          quantity: newCount,
          totalPrice: newCount * props.price,
        },
      });
    }
  };

  const handleDelete = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });
  };

  return (
    <div className="checkout-product">
      <Link
        to={`/product/${props.id.substr(0, props.id.indexOf("@"))}`}
        className="checkout-product-img"
      >
        <img src={props.img} alt={props.name} />
      </Link>
      <div className="checkout-product-info">
        <h1>{props.name}</h1>
        <h2>{props.description.join(" - ")}</h2>
        <div className="checkout-product-info-qty">
          <h4>Quantity: {quantity}</h4>
          <div>
            <i className="fas fa-chevron-up" onClick={handleAdd}></i>
            <i className="fas fa-chevron-down" onClick={handleRemove}></i>
          </div>
        </div>
        <h3>
          $<strong>{props.totalPrice}</strong>
          {props.quantity >= 2 ? <span>$ {props.price} each</span> : null}
        </h3>
        <button className="checkout-product-info-remove" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
