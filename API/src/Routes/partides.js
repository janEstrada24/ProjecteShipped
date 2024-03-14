const express = require("express");
const router = express.Router();
const partidesController = require("../Controllers/PartidaController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/partidesActives", partidesController.getPartidesActives);
router.get("/partidesFinalitzades", partidesController.getPartidesFinalitzades);

module.exports = router;