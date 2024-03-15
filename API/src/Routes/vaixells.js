const express = require("express");
const router = express.Router();
const vaixellsController = require("../Controllers/VaixellController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/vaixells", vaixellsController.getVaixellsByPartidaAndCorreuUsuari);
router.get("/getMunicioVaixell", vaixellsController.getMunicioByPartidaCorreuUsuariAndNumVaixell);
router.post("/postVaixell", vaixellsController.postVaixell);
router.put("/putVaixell", vaixellsController.putEstatVaixellDestruit);
router.put("/sumarMunicio", vaixellsController.sumarMunicio);
router.put("/restarMunicio", vaixellsController.restarMunicio);

module.exports = router;