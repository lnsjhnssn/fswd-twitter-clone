import React, { useState } from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";
import { signInUser, createUser } from "./utils/apiRequests"; // Import the functions from authApi.js
import "./home.scss";

const Home = () => {
  // State for login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for signup form
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    signInUser(loginUsername, loginPassword).then((res) => {
      if (res.success) {
        window.location.replace("/feed");
      } else {
        console.log("Login failed");
      }
    });
  };

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    createUser(signupUsername, signupEmail, signupPassword).then((res) => {
      if (res.success) {
        window.location.replace("/feed");
      } else {
        console.log("Sign up failed");
      }
    });
  };

  return (
    <Layout>
      {/* Sign Up Form */}
      <div className="sign-up">
        <form onSubmit={handleSignUp}>
          <h3>Create Account</h3>
          <input
            type="text"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)} // Separate state for signup username
          />
          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)} // Separate state for signup email
          />
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)} // Separate state for signup password
          />
          <button id="sign-up-btn">Sign up for Clone</button>
        </form>
      </div>
      {/* Login Form */}
      <div className="log-in">
        <form onSubmit={handleLogin}>
          <h3>Log in</h3>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)} // Separate state for login username
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)} // Separate state for login password
          />
          <button id="log-in-btn">Log in</button>
        </form>
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
