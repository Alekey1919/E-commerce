import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Firebase";
import { UserContext } from "../Helper/UserContext";

function Login() {
  const [loginEmail, setLoginEmail] = useState("guest@guest.com");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("123guest");
  const [registerPassword, setRegisterPassword] = useState("");
  const { userEmail, setUserEmail } = useContext(UserContext);

  // Form modifiers

  const activateForgot = (e) => {
    e.preventDefault();
    document
      .querySelector(".login-form-field.password")
      .classList.toggle("none");

    document.querySelector(".log-in").classList.toggle("none");
    document.querySelector(".send-recovery").classList.toggle("none");
  };

  const openCloseSignIn = (e) => {
    e.preventDefault();

    document.querySelector(".login-form").classList.toggle("none");
    document.querySelector(".sign-in-form").classList.toggle("none");
  };

  // Auth actions

  const navigate = useNavigate();

  const register = (e) => {
    // Register on firebase
    e.preventDefault();

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((res) => {
        localStorage.setItem("userEmail", res.user.email);
        setUserEmail(res.user.email);
        navigate(-1);
      })
      .catch((err) => alert(err.message));
  };

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((res) => {
        localStorage.setItem("userEmail", res.user.email);
        setUserEmail(res.user.email);
        navigate(-1);
      })
      .catch((err) => alert(err.message));
  };

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, loginEmail)
      .then((res) => alert("Email Sent"))
      .catch((err) => alert(err.message));
  };

  if (userEmail) {
    return (
      <h1 className="logged-in">You are already logged in as {userEmail}</h1>
    );
  }

  return (
    <div className="login">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#c9ada7"
          fillOpacity="1"
          d="M0,96L80,106.7C160,117,320,139,480,122.7C640,107,800,53,960,48C1120,43,1280,85,1360,106.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <form className="login-form">
        <h1>Login</h1>
        <div className="login-form-field email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="login-form-field password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <div className="login-form-btns">
          <div className="login-form-forgot-password-container">
            <p className="login-form-btn" onClick={activateForgot}>
              Forgot password?
            </p>
          </div>
          <button className="login-form-btn log-in" onClick={(e) => login(e)}>
            Login
          </button>
          <button
            className="login-form-btn send-recovery none"
            onClick={resetPassword}
          >
            Send recovery email
          </button>
          <div className="login-form-sign-in-container">
            <button
              className="login-form-btn sign-in"
              onClick={openCloseSignIn}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>

      <form className="sign-in-form none">
        <i className="fas fa-arrow-circle-left" onClick={openCloseSignIn}></i>
        <h1>Sign In</h1>
        <div className="sign-in-form-field email">
          <label htmlFor="sign-in-email">Email:</label>
          <input
            type="email"
            name="sign-in-email"
            id="sign-in-email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>
        <div className="sign-in-form-field password">
          <label htmlFor="sign-in-password">Password:</label>
          <input
            type="password"
            name="sign-in-password"
            id="sign-in-password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <div className="sign-in-form-btns">
          <button
            className="login-form-btn create-account"
            onClick={(e) => register(e)}
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
