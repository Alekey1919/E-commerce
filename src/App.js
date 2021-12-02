import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./Helper/UserContext";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Categories from "./Pages/Categories";
import Login from "./Pages/Login";
import Category from "./Pages/Category";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Checkout from "./Pages/Checkout";
import { useStateValue } from "./Helper/StateProvider";
import Search from "./Pages/Search";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const [userEmail, setUserEmail] = useState(false);

  useEffect(() => {
    if (localStorage) {
      setUserEmail(localStorage.getItem("userEmail"));
    }
  }, []);

  // Saving basket to localstorage

  const [{ basket }] = useStateValue();

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(basket));
  }, [basket]);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }} className="App">
      <Router basename="/">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/categories" exact element={<Categories />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/category/:name" exact element={<Category />} />
            <Route path="/product/:id" exact element={<ProductDetailPage />} />
            <Route path="/checkout" exact element={<Checkout />} />
            <Route path="/search/:input" exact element={<Search />} />
            <Route path="*" exact element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
