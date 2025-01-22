const { ClientesReclamantes } = require("../db.js");

const getClienteByCuit = async (req, res) => {
  try {
    const { cuit } = req.params;

    if (!cuit) {
      return res.status(400).json({
        error: "El parámetro 'cuit' es obligatorio.",
      });
    }

    // Buscar cliente por cuit
    const cliente = await ClientesReclamantes.findOne({
      where: { cuit },
    });

    if (!cliente) {
      return res.status(404).json({
        error: "No se encontró un cliente con el CUIT proporcionado.",
      });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente por CUIT:", error);
    return res.status(500).json({
      error: "Ocurrió un error en el servidor.",
    });
  }
};

module.exports = {
  getClienteByCuit,
};
