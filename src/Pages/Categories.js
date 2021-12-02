import React from "react";
import Category from "../Components/Category";

function Categories() {
  return (
    <section className="categories container">
      <h1 className="container-title">Categories</h1>
      <div className="categories-container grid">
        <Category
          name="PC"
          img="https://firebasestorage.googleapis.com/v0/b/e-commerce-3c855.appspot.com/o/Products%2FCategories%2Fpc.png?alt=media&token=84cbdc59-8fb9-4544-ab76-4d9b4b108ead"
          path="/category/Pc"
        />
        <Category
          name="Smarthphone"
          img="https://firebasestorage.googleapis.com/v0/b/e-commerce-3c855.appspot.com/o/Products%2FCategories%2Fsmartphones.jpg?alt=media&token=3ca0c0ee-f1ac-4ebe-9091-015c918c31cc"
          path="/category/Smartphones"
        />
        <Category
          name="Smartwatches"
          img="https://firebasestorage.googleapis.com/v0/b/e-commerce-3c855.appspot.com/o/Products%2FCategories%2Fsmartwatches.jpg?alt=media&token=ee671c98-8ffa-426d-b57e-cddf27cdd52b"
          path="/category/Smartwatches"
        />
        <Category
          name="Audio"
          img="https://firebasestorage.googleapis.com/v0/b/e-commerce-3c855.appspot.com/o/Products%2FCategories%2Faudio.jpg?alt=media&token=65675d99-4c4e-48e7-8ee7-e971fc929671"
          path="/category/Audio"
        />
        <Category
          name="Consoles"
          img="https://firebasestorage.googleapis.com/v0/b/e-commerce-3c855.appspot.com/o/Products%2FCategories%2Fconsoles.png?alt=media&token=78ce47d3-422c-43d2-a8a4-44fa85e00cc3"
          path="/category/Consoles"
        />
      </div>
    </section>
  );
}

export default Categories;
