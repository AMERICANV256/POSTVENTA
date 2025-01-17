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

const check = require("../middlewares/auth");

router.post("/usuarios/login", login);
router.post("/usuarios/registro", registro);
router.post("/usuarios/rol", check.auth, verificarRol);
router.put("/usuarios", check.auth, putUser);
router.get("/usuarios/lastFive", check.auth, getLastLoggedInUsers);
router.get("/usuarios/chart", check.auth, getUsuariosChart);
router.get("/usuarios/detail/:idUsuario", check.auth, obtenerDetalleUsuario);
router.get("/usuarios/all", check.auth, getAllUsers);
router.put("/usuarios/recoverpass", resetPassword);

module.exports = router;
