const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Derivados",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
    }
  );
};
