import { useMutation, useQuery } from "@tanstack/react-query";
import { ReclamosAPI } from "../components/api/ReclamosAPI";
import Swal from "sweetalert2";

const postBusquedaReclamo = async (data) => {
  return await ReclamosAPI.post(`/buscar`, data);
};

const postCreateReclamo = async (data) => {
  return await ReclamosAPI.post(`create`, data);
};

const putderivado = async (data) => {
  return await ReclamosAPI.put(`/edit`, data);
};

const fetchCountReclamos = async () => {
  const { data } = await ReclamosAPI.get(`/count`);
  return data;
};

export const useReclamosCount = () => {
  return useQuery({
    queryKey: ["countReclamos"],
    queryFn: fetchCountReclamos,
    staleTime: 1000 * 60 * 5,
  });
};

export const useReclamo = () => {
  const reclamoMutation = useMutation({
    mutationKey: ["create-reclamo"],
    mutationFn: (data) => postCreateReclamo(data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El reclamo se guardó correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (error) => {
      if (error.response) {
        const { status, data } = error.response;
        let title = "Hubo un error";
        let details = "";

        switch (status) {
          case 400:
            title = "Por favor, completá los datos obligatorios";
            details =
              data?.message || "Por favor, completa los campos requeridos.";
            break;

          case 404:
            title = "Por favor, completá los datos obligatorios";

            if (
              data?.missingParams &&
              Array.isArray(data.missingParams) &&
              data.missingParams.length > 0
            ) {
              details = `Faltan: ${data.missingParams.join(", ")}`;
            } else {
              details = data?.error || "El recurso solicitado no existe.";
            }
            break;

          case 500:
            title = "Error interno del servidor";
            details = data?.message || "Ocurrió un error inesperado.";
            break;

          default:
            details = data?.message || "Inténtalo de nuevo más tarde.";
        }

        Swal.fire({
          position: "center",
          icon: "warning",
          title,
          text: details,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        // Si no hay respuesta del backend
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error al procesar la solicitud",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
        });
      }
    },
  });

  const PostBusquedaReclamo = useMutation({
    mutationKey: ["busquedaReclamo-mutation"],
    mutationFn: (data) => postBusquedaReclamo(data),
    onError: (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "No se encontraron reclamos para los valores ingresados",
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
              showConfirmButton: false,
              timer: 5000,
            });
            break;
          case 401:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Tu sesión ha expirado",
              showConfirmButton: false,
              timer: 2000,
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
            }).then(() => {});
            break;
          default:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "No se encontraron reclamos para los valores ingresados",
              showConfirmButton: false,
              timer: 2000,
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
            });
            break;
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error al procesar la solicitud",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
        });
      }
    },
  });

  const editreclamoMutation = useMutation({
    mutationKey: ["edit-reclamo"],
    mutationFn: (data) => putderivado(data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El reclamo se modificó correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (error) => {
      if (error.response) {
        const { status, data } = error.response;
        let title = "Hubo un error";
        let details = "";

        switch (status) {
          case 400:
            title = "Por favor, completá los datos obligatorios";
            details = data?.missingParams
              ? `Faltan: ${data.missingParams.join(", ")}`
              : data?.message || "";
            break;

          case 404:
            title = "No encontrado";
            details = data?.message || "El recurso solicitado no existe.";
            break;

          case 500:
            title = "Error interno del servidor";
            details = data?.message || "Ocurrió un error inesperado.";
            break;

          default:
            details = data?.message || "Inténtalo de nuevo más tarde.";
        }

        Swal.fire({
          position: "center",
          icon: "warning",
          title,
          text: details,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error al procesar la solicitud",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
        });
      }
    },
  });

  return { reclamoMutation, PostBusquedaReclamo, editreclamoMutation };
};
