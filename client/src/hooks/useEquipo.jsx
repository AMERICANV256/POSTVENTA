import { useQuery } from "@tanstack/react-query";
import { EquiposAPI } from "../components/api/EquipoAPI";

const fetchMarcas = async () => {
  const { data } = await EquiposAPI.get(`/marcas`);
  return data;
};

const fetchModelos = async () => {
  const { data } = await EquiposAPI.get(`/modelos`);
  return data;
};

export const useMarcas = () => {
  return useQuery({
    queryKey: ["marcas"],
    queryFn: fetchMarcas,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para obtener modelos
export const useModelos = () => {
  return useQuery({
    queryKey: ["modelos"],
    queryFn: fetchModelos,
    staleTime: 1000 * 60 * 5,
  });
};
