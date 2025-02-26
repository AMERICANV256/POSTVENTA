import axios from "axios";

export const DerivadosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}derivados`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
