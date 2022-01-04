import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import Axios from "axios";
import Filters from "../Components/Filters";

function Home() {
  const [products, setProducts] = useState();
  const [ratedProducts, setRatedProducts] = useState(); // The list of products filtered by rating is external to the original list so that when we remove the filter this one gets set to null and the original is displayed. This is done to prevent the code from calling the API on every rating-filter manipulation.
  const [loading, setLoading] = useState(true);
  const [ratedRecord, setRatedRecord] = useState(); // Since the filter slide is a separated component, it needs to keep track of the current rating search, so it is passed through props and the component takes care of lightning the correct amount of stars every time it is re-rendered.

  useEffect(() => {
    Axios.post("https://e-commerce-eipiai.herokuapp.com/getProducts", {})
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const handleAscending = () => {
    if (ratedProducts) {
      // Check if the rated filter is on
      const sorted = ratedProducts.sort((a, b) => {
        return a.price - b.price;
      });

      setRatedProducts([...sorted]);
    } else {
      // Rated filter is off
      const sorted = products.sort((a, b) => {
        return a.price - b.price;
      });

      setProducts([...sorted]);
    }
  };

  const handleDescending = () => {
    if (ratedProducts) {
      // Check if the rated filter is on
      const sorted = ratedProducts.sort((a, b) => {
        return b.price - a.price;
      });

      setRatedProducts([...sorted]);
    } else {
      const sorted = products.sort((a, b) => {
        return b.price - a.price;
      });

      setProducts([...sorted]);
    }
  };

  const handleRating = (stars) => {
    for (let i = 1; i <= 5; i++) {
      // Lightning the rated stars
      if (i <= stars) {
        document.getElementById("filter-star-" + i).classList.add("active");
      } else {
        document.getElementById("filter-star-" + i).classList.remove("active");
      }
    }
    setRatedRecord(stars);

    // Creating an array of products with the amount of stars selected or more.
    const innerRatedProducts = [];

    products.forEach((product) => {
      if (product.stars >= stars) {
        innerRatedProducts.push(product);
      }
    });

    setRatedProducts(innerRatedProducts);
  };

  const handleRemoveRating = () => {
    for (let i = 1; i <= 5; i++) {
      document.getElementById("filter-star-" + i).classList.remove("active");
    }
    setRatedProducts(false);
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="container-title">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <Filters
        products={products}
        ascending={handleAscending}
        descending={handleDescending}
        rating={handleRating}
        removeRating={handleRemoveRating}
        ratedRecord={ratedRecord}
      />
      <div className="home container">
        <h1 className="container-title">Home</h1>
        <main className="home-products grid">
          {ratedProducts
            ? ratedProducts.map((product, key) => {
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
            : products.map((product, key) => {
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
              })}
        </main>
      </div>
    </div>
  );
}

export default Home;
