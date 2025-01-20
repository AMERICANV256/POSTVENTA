import React, { useState, useEffect } from "react";
import landing from "../assets/LANDING.png";
import Login from "./usuario/Login";
import Home from "./Home"; // Asegúrate de importar el componente Home
import useAuth from "../hooks/useAuth";

export default function Landing() {
  const { auth, setAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Usamos useEffect para escuchar cambios en auth y actualizar el estado
  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token
    const user = localStorage.getItem("user"); // Obtener el usuario

    // Si el token y el usuario existen, los consideramos autenticados
    if (token && user) {
      const userObj = JSON.parse(user);
      setAuth(userObj); // Establecer el usuario en el estado
      setIsAuthenticated(true); // Marcar como autenticado
    } else {
      setIsAuthenticated(false); // Si no hay token o usuario, no está autenticado
    }
  }, [auth, setAuth]); // Dependemos de auth y setAuth

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
