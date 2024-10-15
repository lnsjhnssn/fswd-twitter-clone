import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";

// Login form component
const LoginForm = () => (
  <div className="log-in">
    <form>
      <div className="form-group">
        <input type="text" className="username" placeholder="Username" />
      </div>
      <div className="form-group">
        <input type="password" className="password" placeholder="Password" />
      </div>
      <button id="log-in-btn" className="login-btn">
        Log in
      </button>
    </form>
  </div>
);

// Sign up form component
const SignUpForm = () => (
  <div className="sign-up">
    <form>
      <div className="new-to-t">
        <p>
          <strong>New to Twitter?</strong>
          <span> Sign Up</span>
        </p>
      </div>
      <div className="form-group">
        <input type="text" className="username" placeholder="Username" />
      </div>
      <div className="form-group">
        <input type="email" className="email" placeholder="Email" />
      </div>
      <div className="form-group">
        <input type="password" className="password" placeholder="Password" />
      </div>
      <button id="sign-up-btn" className="sign-up-btn">
        Sign up for Twitter
      </button>
    </form>
  </div>
);

const Home = () => (
  <Layout>
    <LoginForm /> {/* Added Login Form */}
    <SignUpForm /> {/* Added Sign Up Form */}
  </Layout>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
