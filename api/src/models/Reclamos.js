const { DataTypes, INTEGER, TEXT } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
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
        type: INTEGER,
        allowNull: true,
      },
      pdf: {
        type: TEXT,
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
    },
    {
      timestamps: true,
    }
  );
};
