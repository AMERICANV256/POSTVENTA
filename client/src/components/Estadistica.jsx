import React from "react";
import { useReclamosCount } from "../hooks/useReclamos";
import Excel from "./Excel";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import BackButton from "../UI/BackButton";
import Spinner from "../UI/Spinner";

export default function Estadistica() {
  const { data: count, isLoading: loadingCount } = useReclamosCount();

  if (loadingCount)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (!count) return <div>Aún no se cargaron reclamos</div>;

  const reclamosPorEstadoData = count.reclamosPorEstado.map((item) => ({
    name: item.estadoNombre,
    cantidad: parseInt(item.cantidad),
  }));

  const reclamosPorDerivadoData = count.reclamosPorDerivado.map((item) => ({
    name: item.derivadoNombre,
    cantidad: parseInt(item.cantidad),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Función para formatear la cantidad de reclamos
  const formatearCantidad = (cantidad) => {
    return cantidad > 1000 ? `${(cantidad / 1000).toFixed(1)}K` : cantidad;
  };

  return (
    <div className="estadisticas-container-full">
      <BackButton />
      <h2 className="titulo">Estadísticas de Reclamos</h2>
      <div className="estadistica-container">
        {/* Gráfico de Reclamos por Estado */}
        <div className="grafico-container">
          <h3>Reclamos por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reclamosPorEstadoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad">
                {reclamosPorEstadoData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="estadistica">
            {reclamosPorEstadoData.map((estado) => (
              <p key={estado.name}>
                {estado.name}:{" "}
                <strong>{formatearCantidad(estado.cantidad)}</strong>
              </p>
            ))}
          </div>
        </div>

        <div className="grafico-container">
          <h3>Reclamos por Derivado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reclamosPorDerivadoData}
                dataKey="cantidad"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
              >
                {reclamosPorDerivadoData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="estadistica">
            {reclamosPorDerivadoData.map((derivado) => (
              <p key={derivado.name}>
                {derivado.name}:{" "}
                <strong>{formatearCantidad(derivado.cantidad)}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
      <Excel />
    </div>
  );
}
