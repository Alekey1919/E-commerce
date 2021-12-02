import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import Product from "../Components/Product";

function Search() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);

  const params = useParams();

  useEffect(() => {
    Axios.post("https://e-commerce-eipiai.herokuapp.com/search-query", {
      input: params.input,
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

  if (loading) {
    return (
      <div className="search container">
        <h1 className="container-title">Loading</h1>
      </div>
    );
  }

  if (noProducts) {
    return (
      <div className="search container">
        <h1 className="container-title">
          There are no products under the name {params.input}
        </h1>
      </div>
    );
  }

  return (
    <div className="search container">
      <h1 className="container-title">{params.input}</h1>
      <div className="grid">
        {products.map((product, key) => {
          return (
            <Product
              key={key}
              id={product._id}
              name={product.name}
              img={product.img}
              price={product.price}
              stars={product.stars}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;
