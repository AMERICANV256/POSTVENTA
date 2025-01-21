import React, { useState, useEffect } from "react";
import landing from "../assets/LANDING.png";
import Login from "./usuario/Login";
import Home from "./Home";
import useAuth from "../hooks/useAuth";

export default function Landing() {
  const { auth, setAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const userObj = JSON.parse(user);
      setAuth(userObj);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated ? (
    <Home />
  ) : (
    <div className="landingContainer">
      <div className="Login">
        <Login />
      </div>
      <img src={landing} className="landingImg" alt="Landing" />
    </div>
  );
}
