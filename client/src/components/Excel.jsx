import React from "react";

export default function Excel() {
  const descargarExcel = async () => {
    try {
      // Solicitar el archivo Excel al backend
      const response = await fetch("/reclamos/excel", {
        method: "POST", // Cambiar de GET a POST
      });

      if (response.ok) {
        // Crear el archivo Excel como blob y descargarlo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `reclamos_${Date.now()}.xlsx`; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Error al generar el archivo Excel.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al intentar descargar el archivo.");
    }
  };

  return (
    <div>
      <button onClick={descargarExcel}>Descargar Excel de Reclamos</button>
    </div>
  );
}
