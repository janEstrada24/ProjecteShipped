const express = require("express");
const router = express.Router();
const usuarisController = require("../Controllers/UsuariController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", usuarisController.login);
router.post("/logout", usuarisController.logout);
router.post("/registre", usuarisController.registre);
router.get("/usuarisAsc", usuarisController.getUsuarisAsc);
router.get("/usuarisDesc", usuarisController.getUsuarisDesc);
router.put("/sumarVictoria", usuarisController.sumarVictoria);
router.put("/sumarEmpat", usuarisController.sumarEmpat);

module.exports = router;