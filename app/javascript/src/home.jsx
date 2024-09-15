import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./home.scss";
import TwitterFeed from "./twitter_feed";

const csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");

const Login = ({ onSwitch, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          user: {
            // Nest parameters under 'user'
            username,
            password,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={onSwitch} className="switch-button">
          Sign Up
        </button>
      </p>
    </div>
  );
};

const Signup = ({ onSwitch }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          user: {
            // Nest parameters under 'user'
            username,
            email,
            password,
          },
        }),
      });
      if (response.ok) {
        onSwitch(); // Switch to login form on successful signup
      } else {
        setError("Signup failed. Try a different email.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={onSwitch} className="switch-button">
          Log In
        </button>
      </p>
    </div>
  );
};

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (sessionData) => {
    setIsAuthenticated(true);
    console.log("Logged in!", sessionData);
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  if (isAuthenticated) {
    return <TwitterFeed />;
  }

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login onSwitch={switchForm} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Signup onSwitch={switchForm} />
      )}
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
