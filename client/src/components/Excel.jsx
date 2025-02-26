import React from "react";

export default function Excel() {
  const descargarExcel = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}reclamos/excel`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Error al generar el archivo Excel.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `reclamos_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al intentar descargar el archivo.");
    }
  };

  return (
    <div className="excel-container">
      <button className="excel-button" onClick={descargarExcel}>
        📂 Descargar Excel
      </button>
    </div>
  );
}
