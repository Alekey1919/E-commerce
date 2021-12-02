import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import Related from "../Components/Related";
import { useStateValue } from "../Helper/StateProvider";

function ProductDetailPage() {
  const [product, setProduct] = useState();
  const [related, setRelated] = useState();
  const params = useParams();
  const [currentImg, setCurrentImg] = useState();
  const [currentPrice, setCurrentPrice] = useState();

  useEffect(() => {
    Axios.post("https://e-commerce-eipiai.herokuapp.com/getProducts", {
      _id: params.id,
    })
      .then((res) => {
        setProduct(res.data[0]);
        setCurrentImg(res.data[0].img);
        setCurrentPrice(res.data[0].price);
        fetchRelated(res.data[0].categories, res.data[0]._id);
      })
      .catch((err) => console.error(err.message));
  }, [params.id]);

  const fetchRelated = (categories, id) => {
    Axios.post("https://e-commerce-eipiai.herokuapp.com/search-related", {
      categories,
      id,
    })
      .then((res) => {
        if (res.data.length >= 1) {
          setRelated(res.data);
        }
      })
      .catch((err) => console.error(err.message));
  };

  const changeColor = () => {
    const option = document.getElementById("colors").value;
    const img = option.substr(option.indexOf("@") + 1);
    setCurrentImg(img);
  };

  const changeVariant = () => {
    const option = document.getElementById("variants").value;
    const price = option.substr(option.indexOf("@") + 1);
    setCurrentPrice(parseInt(price));
  };

  // Reducer Functions

  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    let quantity = parseInt(document.getElementById("quantity").value);
    if (isNaN(quantity)) {
      return window.alert("You need to specify the quantity.");
    }

    let color;
    let variant;
    let description = [];
    if (product.colors.length >= 1) {
      color = document.querySelector("#colors option:checked").textContent;
      description.push(color);
    }

    if (product.variants.length >= 1) {
      variant = document.querySelector("#variants option:checked").textContent;

      description.push(variant);
    }

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product._id + "@" + color + variant,
        name: product.name,
        description,
        price: parseInt(currentPrice),
        img: currentImg,
        route: `/Product/${params.id}`,
        quantity,
        totalPrice: quantity * parseInt(currentPrice),
      },
    });
  };

  if (!product) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="container">
      <div className="detail-page">
        <div className="detail-page-img">
          <div className="detail-page-categories">
            <ul>
              {product.categories.map((category, key) => {
                return (
                  <Link to={`/category/${category}`} key={key}>
                    <li key={key}>{category}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <img src={currentImg} alt={product.name} />
        </div>
        <div className="detail-page-info">
          <h1>{product.name}</h1>
          <h2>
            $ <strong>{currentPrice}</strong>
          </h2>
          {product.colors.length >= 1 ? (
            <select name="colors" id="colors" onChange={changeColor}>
              {product.colors.map((color, key) => {
                return (
                  <option value={color} key={key}>
                    {color.substr(0, color.indexOf("@"))}
                  </option>
                );
              })}
            </select>
          ) : null}
          {product.variants.length >= 1 ? (
            <select name="variants" id="variants" onChange={changeVariant}>
              {product.variants.map((variant, key) => {
                return (
                  <option value={variant} key={key}>
                    {variant.substr(0, variant.indexOf("@"))}
                  </option>
                );
              })}
            </select>
          ) : null}
          <div className="add-to-basket">
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              placeholder="1"
              min="1"
              max="20"
            />
            <button className="detail-page-info-btn btn" onClick={addToBasket}>
              Add to basket
            </button>
          </div>
        </div>
      </div>
      {related ? (
        <div>
          <h1 className="detail-page-related-title">Related Products</h1>
          <div className="detail-page-related related-grid">
            {related.map((related, key) => {
              return (
                <Related
                  key={key}
                  img={related.img}
                  name={related.name}
                  id={related._id}
                  price={related.price}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h1 className="detail-page-related-title">
          There are no related products
        </h1>
      )}
    </div>
  );
}

export default ProductDetailPage;
