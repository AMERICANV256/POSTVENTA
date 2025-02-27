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
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 500],
        },
      },

      derivadoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Derivados",
          key: "id",
        },
      },
      estadoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Estados",
          key: "id",
        },
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
