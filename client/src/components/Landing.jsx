import React, { useState, useEffect } from "react";
import landing from "../assets/postventa.png";
import Login from "./usuario/Login";
import Home from "./Home";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default function Landing() {
  const { auth, setAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {
          // Token válido
          setAuth(JSON.parse(user));
          setIsAuthenticated(true);
        } else {
          // Token expirado
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated ? (
    <Home />
  ) : (
    <div className="landingContainer">
      <div className="topBar">
        <span className="serviceTitle2">Servicio de Postventa</span>
      </div>
      <div className="Login">
        <Login />
      </div>
      <img src={landing} className="landingImg" alt="Landing" />
    </div>
  );
}
