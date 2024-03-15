const express = require("express");
const router = express.Router();
const participantsController = require("../Controllers/ParticipantController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/participants", participantsController.getAllParticipants);
router.post("/postParticipant", participantsController.postParticipant);

module.exports = router;