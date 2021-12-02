import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Helper/UserContext";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../Helper/StateProvider";

function Navbar() {
  const { userEmail, setUserEmail } = useContext(UserContext);
  const [{ basket }] = useStateValue();

  const hamburguerToggle = () => {
    document.querySelector(".navbar-hamburguer").classList.toggle("active");
    document.querySelector(".navbar-mobile").classList.toggle("active");
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("userEmail");
    setUserEmail(false);
  };

  // Search query

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchProduct();
    }
  };

  const searchProduct = () => {
    const input = document.getElementById("search-input").value;
    if (input !== "") {
      navigate(`/search/${input}`);
    }
  };

  const handleKeyDownMobile = (e) => {
    if (e.key === "Enter") {
      searchProductMobile();
    }
  };

  const searchProductMobile = () => {
    const input = document.getElementById("search-input-mobile").value;
    if (input !== "") {
      navigate(`/search/${input}`);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="router-link">
            <h1>E-commerce</h1>
          </Link>
        </div>
        <div className="navbar-links">
          <ul>
            <li className="navbar-link">
              <input
                type="text"
                placeholder="Search"
                id="search-input"
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <button>
                <i className="fas fa-search" onClick={searchProduct}></i>
              </button>
            </li>
            <li className="navbar-link">
              <Link to="/categories" className="router-link">
                Categories
              </Link>
            </li>
            <li className="navbar-link">
              <Link to="/checkout" className="router-link">
                <i className="fas fa-shopping-cart"></i> {basket.length}
              </Link>
            </li>
            <li className="navbar-link">
              {userEmail ? (
                <div className="logout">
                  <p>
                    Hi,
                    <small>{userEmail.substr(0, userEmail.indexOf("@"))}</small>
                  </p>
                  <button className="logout-btn" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="router-link">
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </div>
        <button className="navbar-hamburguer" onClick={hamburguerToggle}>
          <div className="bar"></div>
        </button>
      </nav>
      <nav className="navbar-mobile">
        <div className="navbar-mobile-links">
          <ul>
            <li className="navbar-mobile-link">
              <input
                type="text"
                placeholder="Search"
                id="search-input-mobile"
                onKeyDown={(e) => handleKeyDownMobile(e)}
              />
              <button>
                <i className="fas fa-search" onClick={searchProductMobile}></i>
              </button>
            </li>
            <li className="navbar-mobile-link">
              <Link to="/categories" className="router-link">
                Categories
              </Link>
            </li>
            <li className="navbar-mobile-link">
              <Link to="/checkout" className="router-link">
                Checkout
              </Link>
            </li>
            <li className="navbar-link">
              {userEmail ? (
                <div className="logout">
                  <p>
                    Hi,
                    <small>{userEmail.substr(0, userEmail.indexOf("@"))}</small>
                  </p>
                  <button className="logout-btn" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="router-link">
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
