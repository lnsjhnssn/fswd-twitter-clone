import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"; // Import the Router

document.addEventListener("DOMContentLoaded", () => {
  const container = document.body.appendChild(document.createElement("div"));

  // Wrap your App component with a Router
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    container
  );
});
