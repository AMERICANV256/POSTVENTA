const { Reclamos, Derivacion, ClientesReclamantes } = require("../db.js");

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

    // Validación de parámetros
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

    // 1. Verificar si el cliente ya existe por el cuit
    let cliente = await ClientesReclamantes.findOne({ where: { cuit } });

    // 2. Si no existe, crearlo
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
      });
    }

    // 3. Crear el reclamo en la tabla Reclamos con la referencia al cliente encontrado o creado
    const nuevoReclamo = await Reclamos.create({
      clienteReclamanteId: cliente.id, // Relacionamos el reclamo con el cliente
      motivo,
      derivado,
      pdf,
    });

    // 4. Si el reclamo está derivado (1 o 2), crea la derivación correspondiente
    if (derivado === 1 || derivado === 2) {
      const tipoDerivacion = derivado === 1 ? "Postventa" : "Gerencia";

      await Derivacion.create({
        reclamoId: nuevoReclamo.id,
        derivacion: tipoDerivacion,
        fechaDerivacion: new Date(),
        tipo: derivado,
      });
    }

    // 5. Devuelve el reclamo creado
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

    // Buscar cliente reclamante, sus reclamos y las derivaciones asociadas
    const resultados = await ClientesReclamantes.findOne({
      where: whereClause,
      include: [
        {
          model: Reclamos, // Incluir todos los reclamos asociados al cliente
          include: [
            {
              model: Derivacion, // Incluir todas las derivaciones asociadas a cada reclamo
              required: false, // Permitir reclamos sin derivaciones
            },
          ],
        },
      ],
    });

    // Si no hay resultados, devolver un mensaje adecuado
    if (!resultados) {
      return res.status(404).json({
        message: "No se encontraron reclamos con los criterios proporcionados.",
      });
    }

    // Devolver los resultados encontrados
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
