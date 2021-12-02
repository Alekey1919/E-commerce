import React, { useState, useEffect } from "react";
import { getBasketTotal } from "../Helper/Reducer";
import { useStateValue } from "../Helper/StateProvider";
import CheckoutProduct from "../Components/CheckoutProduct";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [innerBasket, setInnerBasket] = useState();

  useEffect(() => {
    // If I use the raw basket react throws the fucking "ObJeCtS aRe NoT vAlId As A rEaCt ChIlD" error.
    setInnerBasket(basket);
  }, [basket]);

  const clearBasket = () => {
    dispatch({
      type: "CLEAR_BASKET",
    });
  };

  const buy = () => {
    window.alert("Thanks for buying in my store :)");
    clearBasket();
  };

  return (
    <div className="checkout container">
      <div className="checkout-products">
        {innerBasket?.length >= 1 ? (
          <h1 className="checkout-products-title">Products</h1>
        ) : (
          <h1 className="checkout-products-title">Your cart is empty</h1>
        )}

        {innerBasket
          ? innerBasket.map((item, key) => {
              return (
                <CheckoutProduct
                  key={key}
                  id={item.id}
                  name={item.name}
                  img={item.img}
                  description={item.description}
                  price={item.price}
                  quantity={item.quantity}
                  totalPrice={item.totalPrice}
                />
              );
            })
          : null}
        {innerBasket && innerBasket.length >= 1 && (
          <button className="checkout-products-clear" onClick={clearBasket}>
            Clear basket
          </button>
        )}
      </div>
      {innerBasket?.length >= 1 ? (
        <div className="checkout-options">
          <h1>Checkout</h1>
          <p>
            Total: $ <strong>{getBasketTotal(basket)}</strong>
          </p>
          <button className="btn" onClick={buy}>
            Buy
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Checkout;
