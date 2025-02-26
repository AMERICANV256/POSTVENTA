import { useQuery } from "@tanstack/react-query";
import { DerivadosAPI } from "../components/api/DerivadosAPI";

const fetchDerivados = async () => {
  const { data } = await DerivadosAPI.get(`/todos`);
  return data;
};

export const useDerivados = () => {
  return useQuery({
    queryKey: ["derivados"],
    queryFn: fetchDerivados,
    staleTime: 1000 * 60 * 5,
  });
};
