import React, { useEffect } from "react";

function Filters(props) {
  const toggleSlide = () => {
    document.querySelector(".filters-slide").classList.toggle("active");
  };

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      if (i <= props.ratedRecord) {
        document.getElementById("filter-star-" + i).classList.add("active");
      } else {
        document.getElementById("filter-star-" + i).classList.remove("active");
      }
    }
  }, [props.ratedRecord]);

  return (
    <div className="filters">
      <h1 onClick={toggleSlide}>Filter</h1>
      <div className="filters-slide">
        <p>Price:</p>
        <div className="filters-slide-price">
          <div>
            <button id="descending" onClick={props.ascending}>
              Ascending
              {/* <i className="fas fa-sort-up"></i> */}
            </button>
          </div>
          <div>
            <button id="descending" onClick={props.descending}>
              Descending
              {/* <i className="fas fa-sort-down"></i> */}
            </button>
          </div>
        </div>
        <div className="filters-slide-rating">
          <p>Rating:</p>
          <div>
            <i
              className="far fa-star"
              id="filter-star-1"
              onClick={() => props.rating(1)}
            ></i>
            <i
              className="far fa-star"
              id="filter-star-2"
              onClick={() => props.rating(2)}
            ></i>
            <i
              className="far fa-star"
              id="filter-star-3"
              onClick={() => props.rating(3)}
            ></i>
            <i
              className="far fa-star"
              id="filter-star-4"
              onClick={() => props.rating(4)}
            ></i>
            <i
              className="far fa-star"
              id="filter-star-5"
              onClick={() => props.rating(5)}
            ></i>
          </div>
        </div>
        <button className="remove-rating" onClick={props.removeRating}>
          Remove rating
        </button>
      </div>
    </div>
  );
}

export default Filters;
