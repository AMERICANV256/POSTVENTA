require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URL, DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  DATABASE_URL,

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
const {
  Reclamos,
  ClientesReclamantes,
  Equipo,
  Marca,
  Modelo,
  Estado,
  Derivados,
} = sequelize.models;

Reclamos.belongsTo(Estado, { foreignKey: "estadoId" });
Estado.hasMany(Reclamos, { foreignKey: "estadoId" });

Reclamos.belongsTo(Derivados, { foreignKey: "derivadoId" });
Derivados.hasMany(Reclamos, { foreignKey: "derivadoId" });

ClientesReclamantes.hasMany(Reclamos, { foreignKey: "clienteReclamanteId" });
Reclamos.belongsTo(ClientesReclamantes, { foreignKey: "clienteReclamanteId" });

Equipo.belongsTo(Marca, { foreignKey: "marcaId" });
Equipo.belongsTo(Modelo, { foreignKey: "modeloId" });
Marca.hasMany(Equipo, { foreignKey: "marcaId" });
Modelo.hasMany(Equipo, { foreignKey: "modeloId" });

Reclamos.belongsTo(sequelize.models.Equipo, { foreignKey: "equipoId" });
sequelize.models.Equipo.hasMany(Reclamos, { foreignKey: "equipoId" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
