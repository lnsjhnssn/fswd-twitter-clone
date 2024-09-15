// assets/javascripts/home.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.body.appendChild(document.createElement("div"));
  ReactDOM.render(<App />, container);
});
