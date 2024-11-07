import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import Layout from "./layout";
import Logo from "./Logo.jsx";
import { signInUser, createUser } from "./utils/apiRequests";

import "./main.scss";

const Home = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    signInUser(loginUsername, loginPassword).then((res) => {
      if (res.success) {
        window.location.replace("/feed");
      } else {
        alert("Login failed. Please check your username and password.");
      }
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUser(signupUsername, signupEmail, signupPassword).then((res) => {
      if (res.success) {
        window.location.replace("/feed");
      } else {
        alert("Sign up failed. Please try again.");
      }
    });
  };

  return (
    <Layout>
      <div className="signup-page-container">
        <div>
          <Logo />
          <div className="sub-title">
            <p>
              like <strong>doodle</strong> in english
            </p>
            <p>
              ou <strong>griffonage</strong> en français
            </p>
          </div>
        </div>

        {showLogin ? (
          <div className="log-in">
            <form onSubmit={handleLogin}>
              <h2>Log in</h2>
              <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button id="log-in-btn">Log in</button>
            </form>
            <button
              className="btn-change-form"
              onClick={() => setShowLogin(false)}
            >
              <strong>Create an account</strong>
            </button>
          </div>
        ) : (
          <div className="sign-up">
            <form onSubmit={handleSignUp}>
              <h2>Create Account</h2>
              <input
                type="text"
                placeholder="Username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <button id="sign-up-btn">Sign up for klotter</button>
            </form>
            <button
              className="btn-change-form"
              onClick={() => setShowLogin(true)}
            >
              Already have an account? <strong>Log in</strong>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
