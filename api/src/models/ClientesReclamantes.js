const { DataTypes, INTEGER, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ClientesReclamantes",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      direccion: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          len: [0, 100],
        },
      },
      documento: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 10],
        },
      },
      razonSocial: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      cuit: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [11, 11],
        },
      },
      telefono: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
      },
      telefono2: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: [1, 50],
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
