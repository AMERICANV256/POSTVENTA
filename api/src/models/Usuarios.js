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
