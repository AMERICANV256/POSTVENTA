import React, { useState, useEffect } from "react";
import moment from "moment";
import { useReclamo } from "../hooks/useReclamos";
import Select from "react-select";
import Pdf from "./Pdf";
import { useDerivados } from "../hooks/useDerivados";
import { useEstados } from "../hooks/useEstados";

export default function ModalTickets({ data, setShowTickets }) {
  const [showModal, setShowModal] = useState(false);

  const { data: estados, isLoading: loadingEstados } = useEstados();
  const { data: derivados, isLoading: loadingDerivados } = useDerivados();

  const [selectedEstado, setSelectedEstado] = useState(null);
  const [selectedDerivados, setSelectedDerivados] = useState(null);

  const estadosOptions = estados?.map((estado) => ({
    value: estado.id,
    label: estado.nombre,
  }));

  const derivadosOptions = derivados?.map((derivado) => ({
    value: derivado.id,
    label: derivado.nombre,
  }));

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (data?.data?.Reclamos?.length > 0) {
      setFormData(
        data.data.Reclamos.map((reclamo) => ({
          id: reclamo.id,
          estado: reclamo.estadoId || null,
          derivado: reclamo.derivadoId || null,
        }))
      );
    }
  }, [data]);

  const handleEstadoChange = (selectedOption, index) => {
    const estadoId = selectedOption ? parseInt(selectedOption.value, 10) : null;
    setFormData((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, estado: estadoId } : item
      )
    );
  };

  const handleDerivadoChange = (selectedOption, index) => {
    const derivadoId = selectedOption
      ? parseInt(selectedOption.value, 10)
      : null;
    setFormData((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, derivado: derivadoId } : item
      )
    );
  };

  useEffect(() => {}, [formData]);

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

  const handleSave = () => {
    const payload = formData.map((item) => ({
      id: item.id,
      derivadoId: item.derivado,
      estadoId: item.estado,
    }));

    editDerivado(payload);
    setShowTickets(false);
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
                        <hr />
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
                          <strong>Teléfono alternativo:</strong>{" "}
                          {data.data.telefono2}
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
                  <div className="sombreadoLeve">
                    <h5 className="mb-3 titulosReclamosDerivaciones">
                      Reclamos
                    </h5>
                  </div>
                  {data.data.Reclamos.sort((a, b) => b.id - a.id).map(
                    (reclamo, index) => (
                      <div
                        key={reclamo.id}
                        className="col-md-6 mb-4 d-flex align-items-stretch"
                      >
                        <div className="card p-3 w-100">
                          <div className="card-body">
                            <h5 className="card-title">
                              Reclamo #{reclamo.id}
                            </h5>
                            <hr />
                            <p>
                              <strong>Motivo:</strong> {reclamo.motivo}
                            </p>
                            <p>
                              <strong>Estado:</strong>{" "}
                              {reclamo.Estado?.nombre || "Sin estado"}
                            </p>
                            <p>
                              <strong>Derivado a:</strong>{" "}
                              {reclamo.Derivado?.nombre || "No derivado"}
                            </p>
                            <p>
                              <strong>Fecha de Creación:</strong>{" "}
                              {formatDate(reclamo.createdAt)}
                            </p>
                            <p>
                              <strong>Última Actualización:</strong>{" "}
                              {formatDate(reclamo.updatedAt)}
                            </p>
                            {reclamo.Equipo && (
                              <>
                                <hr />
                                <h5 className="titulosReclamosDerivaciones">
                                  Información del Equipo
                                </h5>
                                <p>
                                  <strong>Marca:</strong>{" "}
                                  {reclamo.Equipo.Marca?.nombre || "Sin marca"}
                                </p>
                                <p>
                                  <strong>Modelo:</strong>{" "}
                                  {reclamo.Equipo.Modelo?.nombre ||
                                    "Sin modelo"}
                                </p>
                                <p>
                                  <strong>Falla:</strong>{" "}
                                  {reclamo.Equipo.falla ||
                                    "Sin falla reportada"}
                                </p>
                                <p>
                                  <strong>Horas de Uso:</strong>{" "}
                                  {reclamo.Equipo.hsUso || "No especificado"}
                                </p>
                              </>
                            )}

                            <hr />
                          </div>
                          <label>
                            Derivar:
                            <Select
                              name="derivado"
                              value={
                                derivadosOptions.find(
                                  (option) =>
                                    option.value === formData[index]?.derivado
                                ) || null
                              }
                              onChange={(selectedOption) =>
                                handleDerivadoChange(selectedOption, index)
                              }
                              options={derivadosOptions}
                              placeholder="Seleccionar"
                              className="react-select"
                              isClearable
                            />
                          </label>
                          <label>
                            Estado:
                            <Select
                              name="estado"
                              value={
                                estadosOptions.find(
                                  (option) =>
                                    option.value === formData[index]?.estado
                                ) || null
                              }
                              onChange={(selectedOption) =>
                                handleEstadoChange(selectedOption, index)
                              }
                              options={estadosOptions}
                              placeholder="Seleccionar"
                              className="react-select"
                              isClearable
                            />
                          </label>
                          <br />
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <Pdf ticket={reclamo} data={data} />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="logoutButton"
                  style={{
                    fontSize: "16px",
                    padding: "10px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                  }}
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
}
