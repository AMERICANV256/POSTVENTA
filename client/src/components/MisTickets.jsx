import React, { useState, useEffect } from "react";
import { useReclamo } from "../hooks/useReclamos";
import ModalTickets from "./ModalTickets";
import InputMask from "react-input-mask";

export default function MisTickets({ setShowTickets }) {
  const [email, setEmail] = useState("");
  const [cuit, setCuit] = useState("");
  const [reclamos, setReclamos] = useState([]);
  const [error, setError] = useState("");
  const { mutate: busqueda, data } = useReclamo().PostBusquedaReclamo;

  useEffect(() => {
    if (data) {
      setReclamos(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!email && !cuit) {
      setError("Debe ingresar un email o un cuit.");
      return;
    }

    setError("");

    const searchData = email ? { email } : { cuit };

    busqueda(searchData);
  };

  return (
    <div className="ticketsPage">
      <h2>
        Buscar Reclamos <span>(ingresar CUIT o e-mail)</span>{" "}
      </h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan.perez@example.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cuit">CUIT:</label>
          <InputMask
            mask="99-99999999-9"
            value={cuit}
            onChange={(e) => {
              let newValue = e.target.value
                .replace(/-/g, "")
                .replace(/[^0-9]/g, "");

              let regex = /^[0-9]{0,11}$/;
              if (regex.test(newValue)) {
                setCuit(newValue);
              }
            }}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                id="cuit"
                placeholder="20-12345678-9"
                className="form-input"
              />
            )}
          </InputMask>
        </div>

        <button type="submit" className="search-btn">
          Buscar
        </button>
      </form>

      <ModalTickets data={data} setShowTickets={setShowTickets} />
    </div>
  );
}
