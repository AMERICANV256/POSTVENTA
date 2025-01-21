import axios from "axios";

export const ReclamosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}reclamos`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
