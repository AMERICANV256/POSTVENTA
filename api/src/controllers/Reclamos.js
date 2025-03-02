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

    const requiredParams = [
      "nombre",
      "apellido",
      "documento",
      "razonSocial",
      "cuit",
      "telefono",
      "email",
      "motivo",
      "nombreMarca",
      "nombreModelo",
      "hsUso",
      "falla",
    ];

    const missingParams = requiredParams.filter((param) => !req.body[param]);

    if (missingParams.length > 0) {
      return res.status(404).json({
        error: "Faltan parámetros en el cuerpo de la solicitud",
        missingParams,
      });
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
        message: "No se encontraron reclamos con los valores proporcionados.",
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
        .status(404)
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
    // Contar reclamos por estado con el nombre del estado, excluyendo NULL
    const reclamosPorEstado = await Reclamos.findAll({
      attributes: [
        [conn.col("Estado.nombre"), "estadoNombre"],
        [conn.fn("COUNT", conn.col("Reclamos.id")), "cantidad"],
      ],
      include: [
        {
          model: Estado,
          attributes: [],
          required: true, // Esto hace que solo se incluyan los reclamos con estado asignado
        },
      ],
      group: ["Estado.nombre"],
      raw: true,
    });

    // Contar reclamos por derivado con el nombre del derivado, excluyendo NULL
    const reclamosPorDerivado = await Reclamos.findAll({
      attributes: [
        [conn.col("Derivado.nombre"), "derivadoNombre"],
        [conn.fn("COUNT", conn.col("Reclamos.id")), "cantidad"],
      ],
      include: [
        {
          model: Derivados,
          attributes: [],
          required: true, // Esto excluye los reclamos sin derivado asignado
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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reclamos");

    // Definir las columnas de la tabla
    const columnas = [
      { name: "Nro Reclamo", key: "id", width: 15 },
      { name: "Nombre", key: "clienteNombre", width: 25 },
      { name: "Apellido", key: "clienteApellido", width: 25 },
      { name: "Marca", key: "marca", width: 20 },
      { name: "Modelo", key: "modelo", width: 20 },
      { name: "Motivo del reclamo", key: "motivo", width: 50 },
      { name: "Estado", key: "estado", width: 20 },
      { name: "Derivado", key: "derivado", width: 20 },
    ];

    worksheet.addTable({
      name: "ReclamosTable",
      ref: "A1",
      headerRow: true,
      columns: columnas.map((col) => ({ name: col.name })),
      rows: resultados.map((reclamo) => [
        reclamo.id,
        reclamo.ClientesReclamante?.nombre || "No asignado",
        reclamo.ClientesReclamante?.apellido || "No asignado",
        reclamo.Equipo?.Marca?.nombre || "No asignado",
        reclamo.Equipo?.Modelo?.nombre || "No asignado",
        reclamo.motivo || "Sin especificar",
        reclamo.Estado?.nombre || "No asignado",
        reclamo.Derivado?.nombre || "No asignado",
      ]),
    });

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    const ultimaFila = worksheet.rowCount + 2;

    worksheet.addRow([]);
    worksheet.addRow([]);

    const fechaActual = new Date().toLocaleDateString("es-ES");
    const filaFecha = worksheet.addRow([
      `Reclamos al día de la fecha (${fechaActual})`,
    ]);
    filaFecha.getCell(1).font = { bold: true };

    worksheet.addRow([]);

    const filaCopyright = worksheet.addRow([
      `Copyright © ${new Date().getFullYear()} | American Vial Todos los derechos reservados`,
    ]);
    filaCopyright.getCell(1).font = { italic: true };

    worksheet.mergeCells(`A${filaFecha.number}:G${filaFecha.number}`);
    worksheet.mergeCells(`A${filaCopyright.number}:G${filaCopyright.number}`);

    filaFecha.getCell(1).alignment = { horizontal: "center" };
    filaCopyright.getCell(1).alignment = { horizontal: "center" };

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
