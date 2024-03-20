const express = require("express");
const router = express.Router();
const posicionsVaixellsController = require("../Controllers/PosicioVaixellController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/posicionsVaixells", posicionsVaixellsController.getPosicionsVaixells);
router.post("/postPosicioVaixell", posicionsVaixellsController.postPosicioVaixell);
router.put("/updatePosicioVaixell", posicionsVaixellsController.updatePosicioVaixell);
router.delete("/deletePosicionsVaixells", posicionsVaixellsController.deletePosicionsVaixells);

module.exports = router;