const { Equipo, Marca, Modelo } = require("../db.js");

const getMarca = async (req, res) => {
  try {
    const marcas = await Marca.findAll({
      attributes: ["id", "nombre"],
    });

    return res.status(200).json(marcas);
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    return res.status(500).json({
      error: "Ocurrió un error en el servidor.",
    });
  }
};

const getModelo = async (req, res) => {
  try {
    const modelos = await Modelo.findAll({
      attributes: ["id", "nombre"],
    });

    return res.status(200).json(modelos);
  } catch (error) {
    console.error("Error al obtener modelos:", error);
    return res.status(500).json({
      error: "Ocurrió un error en el servidor.",
    });
  }
};

module.exports = {
  getMarca,
  getModelo,
};
