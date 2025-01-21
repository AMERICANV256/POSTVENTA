import React, { useState } from "react";
import MisTickets from "./MisTickets";
import FormTickets from "./FormTickets";

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const [showTickets, setShowTickets] = useState(false);

  return (
    <div className="Home">
      <div className="topBar">
        <span className="serviceTitle">Servicio de Postventa</span>
        <button className="logoutButton" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="buttonMyTickets">
        <button onClick={() => setShowTickets(!showTickets)}>
          {showTickets ? "Ocultar Reclamos" : "Buscar Reclamos"}
        </button>
      </div>

      {showTickets && (
        <div className="ticketsPage">
          <MisTickets setShowTickets={setShowTickets} />
        </div>
      )}

      {!showTickets && (
        <div className="content">
          <FormTickets />
        </div>
      )}
    </div>
  );
}
