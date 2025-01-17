require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URL, DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  DB_URL,

  {
    logging: false,
    native: false,
    dialect: "postgres",
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Usuarios, Alumnos, Entrenadores, Sesiones, Actividades, ValoresPSE } =
  sequelize.models;

// Usuarios -> Sesiones
Usuarios.hasMany(Sesiones, { foreignKey: "usuario_id" });
Sesiones.belongsTo(Usuarios, { foreignKey: "usuario_id" });

// Sesiones -> ValoresPSE
Sesiones.hasMany(ValoresPSE, { foreignKey: "sesion_id" });
ValoresPSE.belongsTo(Sesiones, { foreignKey: "sesion_id" });

// Actividades -> Sesiones
Actividades.hasMany(Sesiones, { foreignKey: "actividad_id" });
Sesiones.belongsTo(Actividades, { foreignKey: "actividad_id" });

// Usuarios -> Entrenadores
Usuarios.hasMany(Entrenadores, { foreignKey: "usuario_id" });
Entrenadores.belongsTo(Usuarios, { foreignKey: "usuario_id" });

// Alumnos -> Entrenadores (Muchos a Muchos)
Alumnos.belongsToMany(Entrenadores, {
  through: "AlumnoEntrenador",
  foreignKey: "alumno_id",
  otherKey: "entrenador_id",
});
Entrenadores.belongsToMany(Alumnos, {
  through: "AlumnoEntrenador",
  foreignKey: "entrenador_id",
  otherKey: "alumno_id",
});

// Alumnos -> Sesiones (Muchos a Muchos)
Alumnos.belongsToMany(Sesiones, {
  through: "AlumnoSesion",
  foreignKey: "alumno_id",
  otherKey: "sesion_id",
});
Sesiones.belongsToMany(Alumnos, {
  through: "AlumnoSesion",
  foreignKey: "sesion_id",
  otherKey: "alumno_id",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
