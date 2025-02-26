const {
  Reclamos,
  Derivados,
  ClientesReclamantes,
  Equipo,
  Marca,
  Modelo,
  Estado,
} = require("../db.js");
const { conn } = require("../db.js");
const ExcelJS = require("exceljs");

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
      marca,
      modelo,
      hsUso,
      falla,
      nombreMarca,
      nombreModelo,
      estado,
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
      !estado
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

    // Buscar la marca por ID
    let marcaExistente = await Marca.findOne({ where: { id: marca } });
    if (!marcaExistente) {
      // Si no existe la marca, se crea una nueva
      marcaExistente = await Marca.create({
        id: marca,
        nombre: nombreMarca,
      });
    }

    // Buscar el modelo por ID
    let modeloExistente = await Modelo.findOne({ where: { id: modelo } });
    if (!modeloExistente) {
      // Si no existe el modelo, se crea uno nuevo
      modeloExistente = await Modelo.create({
        id: modelo,
        nombre: nombreModelo,
      });
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
      derivadoId: derivado,
      pdf,
      equipoId: equipo.id,
      estadoId: estado,
    });

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

    const resultados = await ClientesReclamantes.findOne({
      where: whereClause,
      include: [
        {
          model: Reclamos,
          include: [
            {
              model: Derivados,
              required: false,
              attributes: ["nombre"],
            },
            {
              model: Estado,
              attributes: ["nombre"],
            },
            {
              model: Equipo,
              include: [
                {
                  model: Marca,
                  attributes: ["nombre"],
                },
                {
                  model: Modelo,
                  attributes: ["nombre"],
                },
              ],
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
    const updates = Array.isArray(req.body) ? req.body : [req.body];

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ message: "No se recibieron datos para actualizar" });
    }

    for (const { id, derivadoId, estadoId } of updates) {
      if (!id) {
        return res
          .status(400)
          .json({ message: "El ID es obligatorio para la actualización" });
      }

      const reclamo = await Reclamos.findByPk(id);

      if (!reclamo) {
        return res
          .status(404)
          .json({ message: `Reclamo con ID ${id} no encontrado` });
      }

      const updateData = {};
      if (derivadoId !== undefined) updateData.derivadoId = derivadoId;
      if (estadoId !== undefined) updateData.estadoId = estadoId;

      if (Object.keys(updateData).length > 0) {
        await reclamo.update(updateData);
        console.log(
          `Reclamo ${id} actualizado con derivadoId ${
            updateData.derivadoId || reclamo.derivadoId
          } y estadoId ${updateData.estadoId || reclamo.estadoId}`
        );
      } else {
        console.log(`No se actualizaron datos para el reclamo ${id}`);
      }
    }

    return res
      .status(200)
      .json({ message: "Reclamos actualizados correctamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar reclamos", error });
  }
};

const obtenerCantidadReclamos = async (req, res) => {
  try {
    // Contar reclamos por estado con el nombre del estado
    const reclamosPorEstado = await Reclamos.findAll({
      attributes: [
        [conn.col("Estado.nombre"), "estadoNombre"],
        [conn.fn("COUNT", conn.col("Reclamos.id")), "cantidad"],
      ],
      include: [
        {
          model: Estado,
          attributes: [],
        },
      ],
      group: ["Estado.nombre"],
      raw: true,
    });

    // Contar reclamos por derivado con el nombre del derivado
    const reclamosPorDerivado = await Reclamos.findAll({
      attributes: [
        [conn.col("Derivado.nombre"), "derivadoNombre"],
        [conn.fn("COUNT", conn.col("Reclamos.id")), "cantidad"],
      ],
      include: [
        {
          model: Derivados,
          attributes: [],
        },
      ],
      group: ["Derivado.nombre"],
      raw: true,
    });

    return res.status(200).json({
      reclamosPorEstado,
      reclamosPorDerivado,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener las cantidades", error });
  }
};

const generarExcel = async (req, res) => {
  try {
    const resultados = await Reclamos.findAll({
      include: [
        {
          model: ClientesReclamantes,
          attributes: ["nombre", "apellido"],
        },
        {
          model: Derivados,
          attributes: ["nombre"],
        },
        {
          model: Estado,
          attributes: ["nombre"],
        },
        {
          model: Equipo,
          include: [
            {
              model: Marca,
              attributes: ["nombre"],
            },
            {
              model: Modelo,
              attributes: ["nombre"],
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });

    const ExcelJS = require("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reclamos");

    worksheet.columns = [
      { header: "ID Reclamo", key: "id", width: 15 },
      { header: "Nombre Cliente", key: "clienteNombre", width: 25 },
      { header: "Apellido Cliente", key: "clienteApellido", width: 25 },
      { header: "Estado", key: "estado", width: 20 },
      { header: "Derivado", key: "derivado", width: 20 },
      { header: "Marca", key: "marca", width: 20 },
      { header: "Modelo", key: "modelo", width: 20 },
    ];

    resultados.forEach((reclamo) => {
      worksheet.addRow({
        id: reclamo.id,
        clienteNombre: reclamo.ClientesReclamante?.nombre || "No asignado",
        clienteApellido: reclamo.ClientesReclamante?.apellido || "No asignado",
        estado: reclamo.Estado?.nombre || "No asignado",
        derivado: reclamo.Derivados?.nombre || "No asignado",
        marca: reclamo.Equipo?.Marca?.nombre || "No asignado",
        modelo: reclamo.Equipo?.Modelo?.nombre || "No asignado",
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=reclamos_${Date.now()}.xlsx`
    );

    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al generar el archivo Excel" });
  }
};

module.exports = {
  obtenerCantidadReclamos,
  createReclamo,
  buscarReclamo,
  updateDerivado,
  generarExcel,
};
