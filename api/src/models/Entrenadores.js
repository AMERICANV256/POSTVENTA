const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Entrenadores",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      direccion: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      telefono: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
    }
  );
};
