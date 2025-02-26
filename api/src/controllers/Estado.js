const { Estado } = require("../db.js");

const getEstados = async (req, res) => {
  try {
    const estados = await Estado.findAll({
      attributes: ["id", "nombre"],
    });

    return res.status(200).json(estados);
  } catch (error) {
    console.error("Error al obtener estados:", error);
    return res.status(500).json({
      error: "Ocurrió un error en el servidor.",
    });
  }
};

module.exports = {
  getEstados,
};
