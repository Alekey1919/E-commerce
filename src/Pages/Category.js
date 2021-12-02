import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Product from "../Components/Product";

function Category() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  const params = useParams();

  useEffect(() => {
    Axios.post("https://e-commerce-eipiai.herokuapp.com/search-category", {
      category: params.name,
    })
      .then((res) => {
        if (res.data.length >= 1) {
          setProducts(res.data);
          setLoading(false);
        } else {
          setNoProducts(true);
        }
      })
      .catch((err) => console.error(err.message));
  }, [params]);

  if (noProducts) {
    return (
      <div className="container">
        <h1>No products on the "{params.name}" category</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="category-page container">
      <h1 className="container-title">{params.name}</h1>
      <div className="grid">
        {products
          ? products.map((product, key) => {
              return (
                <Product
                  key={key}
                  name={product.name}
                  price={product.price}
                  img={product.img}
                  id={product._id}
                  stars={product.stars}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Category;
