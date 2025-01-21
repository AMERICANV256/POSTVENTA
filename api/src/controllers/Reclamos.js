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
      pdf,
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
      pdf,
    });

    // Si el reclamo está derivado (1 o 2), crea la derivación correspondiente
    if (derivado === 1 || derivado === 2) {
      const tipoDerivacion = derivado === 1 ? "Postventa" : "Gerencia";

      await Derivacion.create({
        reclamoId: nuevoReclamo.id,
        derivacion: tipoDerivacion,
        fechaDerivacion: new Date(),
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
        required: false,
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

const updateDerivado = async (req, res) => {
  try {
    const { id, derivado } = req.body; // Solo necesitamos el id y derivado del cuerpo

    // Buscar el reclamo por ID
    const reclamo = await Reclamos.findByPk(id);

    if (!reclamo) {
      return res.status(404).json({ message: "Reclamo no encontrado" });
    }

    // Si se pasa el campo derivado, actualizamos la derivación
    if (derivado === 1 || derivado === 2) {
      const tipoDerivacion = derivado === 1 ? "Postventa" : "Gerencia";

      // Buscar si existe una derivación asociada al reclamo
      let derivacion = await Derivacion.findOne({
        where: { reclamoId: id },
      });

      if (derivacion) {
        // Si ya existe una derivación, la actualizamos
        await derivacion.update({
          derivacion: tipoDerivacion,
          fechaDerivacion: new Date(),
          tipo: derivado,
        });
      } else {
        // Si no existe una derivación, creamos una nueva
        await Derivacion.create({
          reclamoId: id,
          derivacion: tipoDerivacion,
          fechaDerivacion: new Date(),
          tipo: derivado,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "El valor de 'derivado' no es válido" });
    }

    // Devolver una respuesta exitosa
    return res
      .status(200)
      .json({ message: "Derivación actualizada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createReclamo,
  buscarReclamo,
  updateDerivado,
};
