const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Derivacion",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reclamoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Reclamos", // Hace referencia a la tabla Reclamos
          key: "id", // Relacionado con el campo `id` de la tabla Reclamos
        },
        onDelete: "CASCADE", // Si se elimina un reclamo, también se eliminarán las derivaciones relacionadas
      },
      derivacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fechaDerivacion: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tipo: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser nulo
        validate: {
          isIn: [[null, 1, 2]], // Valores permitidos: null, 1 o 2
        },
        comment: "1: Postventa, 2: Gerencia", // Descripción para referencia
      },
    },
    {
      timestamps: false,
    }
  );
};
