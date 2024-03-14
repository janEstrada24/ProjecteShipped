const express = require("express");
const router = express.Router();
const usuarisController = require("../Controllers/UsuariController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/usuarisAsc", usuarisController.getUsuarisAsc);
router.get("/usuarisDesc", usuarisController.getUsuarisDesc);

module.exports = router;