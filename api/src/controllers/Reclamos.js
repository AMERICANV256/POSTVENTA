const {
  Reclamos,
  Derivacion,
  ClientesReclamantes,
  Equipo,
  Marca,
  Modelo,
} = require("../db.js");

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
      telefono2,
      marca, // Aquí recibimos el ID de la marca
      modelo, // Aquí recibimos el ID del modelo
      hsUso,
      falla,
    } = req.body;

    // Validación de parámetros
    if (
      !nombre ||
      !apellido ||
      !documento ||
      !razonSocial ||
      !cuit ||
      !telefono ||
      !email ||
      !motivo ||
      !marca || // Asegurarse de que 'marca' esté presente
      !modelo // Asegurarse de que 'modelo' esté presente
    ) {
      const error = new Error("Faltan parámetros en el cuerpo de la solicitud");
      error.status = 400;
      throw error;
    }

    let cliente = await ClientesReclamantes.findOne({ where: { cuit } });

    if (!cliente) {
      cliente = await ClientesReclamantes.create({
        nombre,
        apellido,
        documento,
        razonSocial,
        cuit,
        telefono,
        email,
        direccion,
        telefono2,
      });
    }

    // Buscar la marca por ID, no por nombre
    let marcaExistente = await Marca.findOne({ where: { id: marca } });
    if (!marcaExistente) {
      // Si no existe la marca, se crea una nueva
      marcaExistente = await Marca.create({
        id: marca,
        nombre: "Nombre por defecto",
      }); // Usa un nombre por defecto si es necesario
    }

    // Buscar el modelo por ID, no por nombre
    let modeloExistente = await Modelo.findOne({ where: { id: modelo } });
    if (!modeloExistente) {
      // Si no existe el modelo, se crea uno nuevo
      modeloExistente = await Modelo.create({
        id: modelo,
        nombre: "Modelo por defecto",
      }); // Usa un nombre por defecto si es necesario
    }

    let equipo = await Equipo.findOne({
      where: {
        marcaId: marcaExistente.id,
        modeloId: modeloExistente.id,
        hsUso,
        falla,
      },
    });

    if (!equipo) {
      equipo = await Equipo.create({
        marcaId: marcaExistente.id,
        modeloId: modeloExistente.id,
        hsUso,
        falla,
      });
    }

    const nuevoReclamo = await Reclamos.create({
      clienteReclamanteId: cliente.id,
      motivo,
      derivado,
      pdf,
      equipoId: equipo.id,
    });

    if (derivado === 1 || derivado === 2) {
      const tipoDerivacion = derivado === 1 ? "Servicios" : "Garantías";

      await Derivacion.create({
        reclamoId: nuevoReclamo.id,
        derivacion: tipoDerivacion,
        fechaDerivacion: new Date(),
        tipo: derivado,
      });
    }

    return res.status(201).json(nuevoReclamo);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const buscarReclamo = async (req, res) => {
  try {
    const { email, cuit } = req.body;

    // Validar que al menos uno de los campos esté presente
    if (!email && !cuit) {
      throw "Debe proporcionar al menos un email o un cuit para buscar.";
    }

    // Construir la cláusula where dinámicamente
    const whereClause = {};
    if (email) whereClause.email = email;
    if (cuit) whereClause.cuit = cuit;

    const resultados = await ClientesReclamantes.findOne({
      where: whereClause,
      include: [
        {
          model: Reclamos,
          include: [
            {
              model: Derivacion,
              required: false,
            },
          ],
          order: [["id", "DESC"]],
        },
      ],
    });

    if (!resultados) {
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
    const updates = req.body; // Ahora esperamos un array de objetos

    // Iterar sobre cada reclamo en el array
    for (const { id, derivado } of updates) {
      // Buscar el reclamo por ID
      const reclamo = await Reclamos.findByPk(id);

      if (!reclamo) {
        return res
          .status(404)
          .json({ message: `Reclamo con ID ${id} no encontrado` });
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
        return res.status(400).json({
          message: `El valor de 'derivado' para el reclamo ${id} no es válido`,
        });
      }
    }

    // Devolver una respuesta exitosa
    return res
      .status(200)
      .json({ message: "Derivaciones actualizadas correctamente" });
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
