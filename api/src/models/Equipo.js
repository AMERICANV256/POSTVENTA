const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Equipo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      marcaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Marcas",
          key: "id",
        },
      },
      modeloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Modelos",
          key: "id",
        },
      },
      hsUso: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      falla: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
    }
  );
};
