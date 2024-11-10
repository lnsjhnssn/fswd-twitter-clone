import React from "react";
import { signOutUser } from "./utils/apiRequests";
import "./main.scss";

const handleLogout = () => {
  signOutUser()
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => console.error("Error signing out:", error));
};

const SignOutButton = () => (
  <button onClick={handleLogout} className="btn-signout">
    Logout
  </button>
);

export default SignOutButton;
