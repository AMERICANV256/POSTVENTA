const { Router } = require("express");

//VAMOS A USAR ESTO CUANDO NECESITEMOS TENER LOS DATOS DE DE SESION DEL USUARIO O CUANDO NECESITEMOS SEGURIDAD.

//PARA APLICAR EL MIDDLEWARE EN ALGUNA RUTA QUEDARIA ALGO ASI:

// router.get("/usuarios", check.auth, getUsers);
//En el postman se prueba poniendo dentro de la accion GET, en los headers, y en Authorization el TOKEN GENERADO

const router = Router();

const {
  login,
  registro,
  putUser,
  resetPassword,
  getAllUsers,
  getLastLoggedInUsers,
  verificarRol,
  obtenerDetalleUsuario,
  getUsuariosChart,
} = require("../controllers/Usuarios");

const {
  createReclamo,
  buscarReclamo,
  updateDerivado,
  obtenerCantidadReclamos,
  generarExcel,
} = require("../controllers/Reclamos");

const { getMarca, getModelo } = require("../controllers/Equipo");
const { getEstados } = require("../controllers/Estado");

const { getClienteByCuit } = require("../controllers/ClientesReclamantes");
const { getDerivados } = require("../controllers/Derivados");

const check = require("../middlewares/auth");

router.post("/usuarios/login", login);
router.post("/usuarios/registro", registro);
router.post("/usuarios/rol", check.auth, verificarRol);
router.put("/usuarios", check.auth, putUser);
router.get("/usuarios/lastFive", check.auth, getLastLoggedInUsers);
router.get("/equipos/marcas", getMarca);
router.get("/equipos/modelos", getModelo);
router.get("/estados/todos", getEstados);
router.get("/derivados/todos", getDerivados);
router.get("/usuarios/chart", check.auth, getUsuariosChart);
router.get("/usuarios/detail/:idUsuario", check.auth, obtenerDetalleUsuario);
router.get("/usuarios/all", check.auth, getAllUsers);
router.put("/usuarios/recoverpass", resetPassword);
router.post("/reclamos/create", createReclamo);
router.post("/reclamos/excel", generarExcel);
router.post("/reclamos/buscar", buscarReclamo);
router.get("/reclamos/count", obtenerCantidadReclamos);
router.put("/reclamos/edit", updateDerivado);
router.get("/clientes/:cuit", getClienteByCuit);

module.exports = router;
