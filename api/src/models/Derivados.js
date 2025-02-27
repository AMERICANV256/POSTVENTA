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
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          len: [1, 15],
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
