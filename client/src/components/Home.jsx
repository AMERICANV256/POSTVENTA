import React, { useState } from "react";
import MisTickets from "./MisTickets";
import FormTickets from "./FormTickets";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigation = useNavigate();

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
      <div className="buttonstickets">
        <div className="buttonMyTickets">
          <button onClick={() => setShowTickets(!showTickets)}>
            {showTickets ? "Ocultar Reclamos" : "Buscar Reclamos"}
          </button>
        </div>
        <div className="buttonMyTicketsestadistica">
          <button onClick={() => navigation("/estadistica")}>
            Ver estadística
          </button>
        </div>
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
