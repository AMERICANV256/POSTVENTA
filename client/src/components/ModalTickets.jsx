import React, { useState, useEffect } from "react";
import moment from "moment";
import { useReclamo } from "../hooks/useReclamos";
import Select from "react-select";

export default function ModalTickets({ data, setShowTickets }) {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data?.data?.length > 0) {
      setShowModal(true);
    }
  }, [data]);

  const handleModalClose = () => {
    setShowModal(false);
    setShowTickets(false);
  };

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  const { mutate: editDerivado, isLoading } = useReclamo().editreclamoMutation;

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

  const handleSelectChange = (selectedOption, reclamoId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [Number(reclamoId)]: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleSave = () => {
    const payload = Object.entries(formData).map(([id, derivado]) => ({
      id: Number(id),
      derivado: Number(derivado),
    }));

    editDerivado(payload);
  };

  return (
    <>
      {data?.data && (
        <div
          className="modal fade show d-block"
          style={{ marginTop: "50px" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resultados</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                {/* Sección de Datos Personales */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card p-3 w-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          Datos Personales del Reclamante
                        </h5>
                        <p>
                          <strong>Nombre:</strong> {data.data.nombre}{" "}
                          {data.data.apellido}
                        </p>
                        <p>
                          <strong>Documento:</strong> {data.data.documento}
                        </p>
                        <p>
                          <strong>Razón Social:</strong> {data.data.razonSocial}
                        </p>
                        <p>
                          <strong>CUIT:</strong> {data.data.cuit}
                        </p>
                        <p>
                          <strong>Teléfono:</strong> {data.data.telefono}
                        </p>
                        <p>
                          <strong>Email:</strong> {data.data.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de Reclamos */}
                <div className="row">
                  <h5 className="mb-3">Reclamos</h5>
                  {data.data.Reclamos.sort((a, b) => b.id - a.id) // Ordenar los reclamos por id en orden descendente
                    .map((reclamo, index) => (
                      <div
                        key={reclamo.id}
                        className="col-md-6 mb-4 d-flex align-items-stretch"
                      >
                        <div className="card p-3 w-100">
                          <div className="card-body">
                            <h5 className="card-title">
                              Reclamo #{reclamo.id}
                            </h5>
                            <p>
                              <strong>Motivo:</strong> {reclamo.motivo}
                            </p>
                            <p>
                              <strong>Fecha de Creación:</strong>{" "}
                              {formatDate(reclamo.createdAt)}
                            </p>
                            <p>
                              <strong>Última Actualización:</strong>{" "}
                              {formatDate(reclamo.updatedAt)}
                            </p>

                            {reclamo.Derivacions?.length > 0 && (
                              <div>
                                <h6>Derivaciones</h6>
                                {reclamo.Derivacions.map((derivacion, i) => (
                                  <div key={i}>
                                    <p>
                                      <strong>Sector:</strong>{" "}
                                      {derivacion.derivacion}
                                    </p>
                                    <p>
                                      <strong>Fecha de Derivación:</strong>{" "}
                                      {formatDate(derivacion.fechaDerivacion)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <label>
                            Derivar:
                            <Select
                              name="derivado"
                              value={reclamosoptions.find(
                                (option) =>
                                  option.value === formData[Number(reclamo.id)]
                              )}
                              onChange={(selectedOption) =>
                                handleSelectChange(selectedOption, reclamo.id)
                              }
                              options={reclamosoptions}
                              placeholder="Seleccionar"
                              className="react-select"
                              isClearable
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
