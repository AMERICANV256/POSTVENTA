import axios from "axios";

export const ClientesReclamantesAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}clientes`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
