import { useMutation } from "@tanstack/react-query";
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
        switch (error.response.status) {
          case 400:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Por favor, completá los datos obligatorios",
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
              showConfirmButton: false,
              timer: 5000,
            });
            break;
          default:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Hubo un error",
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
        switch (error.response.status) {
          case 400:
            Swal.fire({
              position: "center",
              icon: "warning",
              title:
                "Hay errores en el formulario; por favor, intente nuevamente",
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
              showConfirmButton: false,
              timer: 5000,
            });
            break;
          default:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Hubo un error",
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

  return { reclamoMutation, PostBusquedaReclamo, editreclamoMutation };
};
