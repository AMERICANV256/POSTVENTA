const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Estado",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(25),
        allowNull: true,
        validate: {
          len: [1, 25],
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
