const { Reclamos, Derivacion } = require("../db.js");

const createReclamo = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      razonSocial,
      documento,
      email,
      telefono,
      direccion,
      motivo,
      cuit,
      derivado,
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !documento ||
      !razonSocial ||
      !cuit ||
      !telefono ||
      !email ||
      !motivo
    ) {
      throw "Faltan parámetros en el cuerpo de la solicitud";
    }

    // Crea un nuevo reclamo en la base de datos
    const nuevoReclamo = await Reclamos.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      motivo,
      razonSocial,
      documento,
      cuit,
      derivado,
    });

    // Si el reclamo está derivado (1 o 2), crea la derivación correspondiente
    if (derivado === 1 || derivado === 2) {
      const tipoDerivacion = derivado === 1 ? "Postventa" : "Gerencia";

      await Derivacion.create({
        reclamoId: nuevoReclamo.id, // Relación con el reclamo creado
        derivacion: tipoDerivacion,
        fechaDerivacion: new Date(), // Fecha actual
        tipo: derivado,
      });
    }

    // Devuelve el reclamo creado
    return res.status(201).json(nuevoReclamo);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const buscarReclamo = async (req, res) => {
  try {
    const { email, cuit } = req.body;

    if (!email && !cuit) {
      throw "Debe proporcionar al menos un email o un cuit para buscar.";
    }

    const whereClause = {};
    if (email) whereClause.email = email;
    if (cuit) whereClause.cuit = cuit;

    // Busca los reclamos que coincidan con los criterios
    const resultados = await Reclamos.findAll({
      where: whereClause,
      include: {
        model: Derivacion,
        required: false, // Esto permite traer los reclamos aunque no tengan derivaciones
      },
    });

    if (resultados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron reclamos con los criterios proporcionados.",
      });
    }

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createReclamo,
  buscarReclamo,
};
