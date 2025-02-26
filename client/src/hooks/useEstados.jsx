import { useQuery } from "@tanstack/react-query";
import { EstadosAPI } from "../components/api/EstadosAPI";

const fetchEstados = async () => {
  const { data } = await EstadosAPI.get(`/todos`);
  return data;
};

export const useEstados = () => {
  return useQuery({
    queryKey: ["estados"],
    queryFn: fetchEstados,
    staleTime: 1000 * 60 * 5,
  });
};
