import React from "react";

export default function Home() {
  // Función para cerrar sesión (limpiar el localStorage)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Recarga la página para aplicar los cambios
  };

  return (
    <div className="Home">
      <div className="topBar">
        <span className="serviceTitle">Servicio de Postventa</span>
        <button className="logoutButton" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="content">
        <span>Holis</span>
      </div>
    </div>
  );
}
