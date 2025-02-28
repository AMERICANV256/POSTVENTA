import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Necesitarás instalar esta librería

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setAuth(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp > currentTime) {
        setAuth(JSON.parse(user));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth(null);
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
