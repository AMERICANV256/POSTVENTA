const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "AlumnoSesion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
