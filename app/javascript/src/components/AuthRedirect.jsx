// src/components/AuthRedirect.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../api";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authenticate().then((data) => {
      if (data.authenticated) navigate("/feeds");
    });
  }, [navigate]);

  return null;
};

export default AuthRedirect;
