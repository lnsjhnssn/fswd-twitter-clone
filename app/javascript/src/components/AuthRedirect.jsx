// src/components/AuthRedirect.js
import React, { useEffect } from "react";
import { authenticate } from "../api";

const AuthRedirect = () => {
  useEffect(() => {
    authenticate().then((data) => {
      if (data.authenticated) {
        // Full page redirect handled by the browser
        window.location.href = "/feeds";
      }
    });
  }, []);

  return null;
};

export default AuthRedirect;
