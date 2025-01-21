import React, { useState } from "react";
import Select from "react-select";
import { useReclamo } from "../hooks/useReclamos";

export default function FormTickets() {
  const { mutate: formReclamo, isLoading } = useReclamo().reclamoMutation;

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    razonSocial: "",
    documento: "",
    cuit: "",
    telefono: "",
    email: "",
    motivo: "",
    derivado: null,
    pdf: null,
  });

  const reclamos = [
    {
      value: 1,
      label: "Post Venta",
    },
    {
      value: 2,
      label: "Gerencia",
    },
  ];

  const reclamosoptions = reclamos.map((reclamo) => ({
    value: reclamo.value,
    label: reclamo.label,
  }));

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      derivado: selectedOption ? selectedOption.value : null,
    });
  };

  const selectedLabel = reclamos.find(
    (reclamo) => reclamo.value === formData.derivado
  )?.label;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formReclamo(formData);
  };

  return (
    <div className="clientFormContainer">
      <h2>Ingresar Reclamo</h2>
      <hr />
      <form className="clientForm" onSubmit={handleSubmit}>
        <div className="formGrid">
          <label>
            Nombre: <span className="obligatorio">*</span>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido:<span className="obligatorio">*</span>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Razón Social:<span className="obligatorio">*</span>
            <input
              type="text"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
            />
          </label>
          <label>
            Documento:<span className="obligatorio">*</span>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            CUIT:<span className="obligatorio">*</span>
            <input
              type="text"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
            />
          </label>
          <label>
            Teléfono:<span className="obligatorio">*</span>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:<span className="obligatorio">*</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Derivar:
            <Select
              name="derivado"
              value={reclamosoptions.find(
                (option) => option.value === formData.derivado
              )}
              onChange={handleSelectChange}
              options={reclamosoptions}
              placeholder={selectedLabel || "Seleccionar"}
              className="react-select"
              isClearable
            />
          </label>
        </div>
        <label className="fullWidth">
          Motivo de contacto: <span className="obligatorio">*</span>
          <textarea
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </label>
        <div className="create-button-reclamo">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
