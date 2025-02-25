const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reclamos = sequelize.define(
    "Reclamos",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      motivo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      derivado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pdf: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      clienteReclamanteId: {
        type: DataTypes.INTEGER,
        references: {
          model: "ClientesReclamantes",
          key: "id",
        },
        allowNull: false,
      },
      equipoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Equipos",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Reclamos;
};
