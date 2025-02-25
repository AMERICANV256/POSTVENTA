import axios from "axios";

export const EquiposAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}equipos`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
