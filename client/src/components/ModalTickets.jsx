import React, { useState, useEffect } from "react";
import moment from "moment";
import { useReclamo } from "../hooks/useReclamos";

export default function ModalTickets({ data, setShowTickets }) {
  const [showModal, setShowModal] = useState(false);

  const { mutate: editDerivado, isLoading } = useReclamo().editreclamoMutation;

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

  return (
    <>
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
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
                <div className="row justify-content-center">
                  {data?.data.length === 1 ? (
                    // Si solo hay 1 reclamo, centramos el contenido
                    <div className="col-12 d-flex justify-content-center">
                      <div className="card p-3 reclamo-card w-100">
                        <div className="card-body">
                          <h5 className="card-title">
                            Reclamo de {data.data[0].nombre}{" "}
                            {data.data[0].apellido}
                          </h5>
                          <p>
                            <strong>Motivo:</strong> {data.data[0].motivo}
                          </p>
                          <p>
                            <strong>Documento:</strong> {data.data[0].documento}
                          </p>
                          <p>
                            <strong>Razón Social:</strong>{" "}
                            {data.data[0].razonSocial}
                          </p>
                          <p>
                            <strong>CUIT:</strong> {data.data[0].cuit}
                          </p>
                          <p>
                            <strong>Teléfono:</strong> {data.data[0].telefono}
                          </p>
                          <p>
                            <strong>Email:</strong> {data.data[0].email}
                          </p>
                          <p>
                            <strong>Fecha de creación:</strong>{" "}
                            {formatDate(data.data[0].createdAt)}
                          </p>
                          <p>
                            <strong>Última actualización:</strong>{" "}
                            {formatDate(data.data[0].updatedAt)}
                          </p>
                          {/* Mostrar derivaciones si existen */}
                          {data.data[0].Derivacions?.length > 0 && (
                            <div>
                              <h5>Derivación</h5>
                              {data.data[0].Derivacions.map(
                                (derivacion, index) => (
                                  <div key={index}>
                                    <p>
                                      <strong>Tipo:</strong>{" "}
                                      {derivacion.derivacion}
                                    </p>
                                    <p>
                                      <strong>Fecha de Derivación:</strong>{" "}
                                      {formatDate(derivacion.fechaDerivacion)}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Si hay más de 1 reclamo, mostramos 2 por fila
                    data?.data.map((reclamo) => (
                      <div
                        key={reclamo.id}
                        className="col-md-6 mb-4 d-flex align-items-stretch"
                      >
                        <div className="card p-3 reclamo-card w-100">
                          <div className="card-body">
                            <h5 className="card-title">
                              Reclamo de {reclamo.nombre} {reclamo.apellido}
                            </h5>
                            <p>
                              <strong>Motivo:</strong> {reclamo.motivo}
                            </p>
                            <p>
                              <strong>Documento:</strong> {reclamo.documento}
                            </p>
                            <p>
                              <strong>Razón Social:</strong>{" "}
                              {reclamo.razonSocial}
                            </p>
                            <p>
                              <strong>CUIT:</strong> {reclamo.cuit}
                            </p>
                            <p>
                              <strong>Teléfono:</strong> {reclamo.telefono}
                            </p>
                            <p>
                              <strong>Email:</strong> {reclamo.email}
                            </p>
                            <p>
                              <strong>Fecha de creación:</strong>{" "}
                              {formatDate(reclamo.createdAt)}
                            </p>
                            <p>
                              <strong>Última actualización:</strong>{" "}
                              {formatDate(reclamo.updatedAt)}
                            </p>

                            {reclamo.Derivacions?.length > 0 && (
                              <div>
                                <h5>Derivación</h5>
                                {reclamo.Derivacions.map(
                                  (derivacion, index) => (
                                    <div key={index}>
                                      <p>
                                        <strong>Sector:</strong>{" "}
                                        {derivacion.derivacion}
                                      </p>
                                      <p>
                                        <strong>Fecha de Derivación:</strong>{" "}
                                        {formatDate(derivacion.fechaDerivacion)}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
