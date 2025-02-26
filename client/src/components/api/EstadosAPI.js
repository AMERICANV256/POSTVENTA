import axios from "axios";

export const EstadosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}estados`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
