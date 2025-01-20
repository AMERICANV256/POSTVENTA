import React, { useState } from "react";

export default function FormTickets() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    razonSocial: "",
    documento: "",
    cuit: "",
    telefono: "",
    email: "",
    motivoContacto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del cliente:", formData);
    alert("Datos guardados en el estado");
  };

  return (
    <div className="clientFormContainer">
      <h2>Ingresar Reclamo</h2>
      <hr />
      <form className="clientForm" onSubmit={handleSubmit}>
        <div className="formGrid">
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Razón Social:
            <input
              type="text"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
            />
          </label>
          <label>
            Documento:
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            CUIT:
            <input
              type="text"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label className="fullWidth">
          Motivos de contacto:
          <textarea
            name="motivoContacto"
            value={formData.motivoContacto}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
