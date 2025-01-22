import { useQuery } from "@tanstack/react-query";
import { ClientesReclamantesAPI } from "../components/api/ClientesReclamantesAPI";

const clienteByCuit = async (cuit) => {
  const { data } = await ClientesReclamantesAPI.get(`/${cuit}`);
  return data;
};

export const useCliente = (cuit) => {
  const clienteQueryByCuit = useQuery({
    queryKey: ["productodetail", { cliente: cuit }],
    queryFn: () => clienteByCuit(cuit),
    enabled: cuit !== undefined && cuit !== null,
  });

  return {
    clienteQueryByCuit,
  };
};
