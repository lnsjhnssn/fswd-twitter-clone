// src/components/LogIn.js
import React, { useState } from "react";
import { signInUser } from "../api";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    await signInUser(username, password);
    window.location.replace("/feeds");
  };

  return (
    <form onSubmit={handleLogIn}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogIn;
