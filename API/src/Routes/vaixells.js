const express = require("express");
const router = express.Router();
const vaixellsController = require("../Controllers/VaixellController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/getVaixells/:correuusuari/:idpartida", vaixellsController.getVaixellsByPartidaAndCorreuUsuari);
router.get("/getMunicioVaixell/:correuusuari/:idpartida/:numvaixell", vaixellsController.getMunicioVaixell);
router.post("/postVaixell", vaixellsController.postVaixell);
router.put("/putVaixell/:correuusuari/:idpartida/:numvaixell", vaixellsController.putEstatVaixellDestruit);
router.put("/sumarMunicio/:correuusuari/:idpartida/:numvaixell", vaixellsController.sumarMunicio);
router.put("/restarMunicio/:correuusuari/:idpartida/:numvaixell", vaixellsController.restarMunicio);

module.exports = router;