const { Derivados } = require("../db.js");

const getDerivados = async (req, res) => {
  try {
    const derivados = await Derivados.findAll({
      attributes: ["id", "nombre"],
    });

    return res.status(200).json(derivados);
  } catch (error) {
    console.error("Error al obtener derivados:", error);
    return res.status(500).json({
      error: "Ocurrió un error en el servidor.",
    });
  }
};

module.exports = {
  getDerivados,
};
