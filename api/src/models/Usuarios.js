const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nombre: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      apellido: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      direccion: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      telefono: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      rol: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      firma: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      suscripcion: {
        type: DataTypes.STRING,
        defaultValue: "basic",
      },
      fechaInicioSuscripcion: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      fechaFinSuscripcion: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      pagoActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      metodoPago: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      moneda: {
        type: DataTypes.STRING,
        defaultValue: "USD",
      },
      pais: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      updatedAt: false,
    }
  );
};

// roles:
// true: Administrador;
// false: Equipo
// null: Entrenador
