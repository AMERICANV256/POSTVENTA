const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ValoresPSE",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sesion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      escala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 6,
          max: 20,
        },
      },
      momento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
