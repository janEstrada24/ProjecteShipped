require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./Database/connection.js");

const usuarisRoutes = require("./Routes/usuaris.js");
const partidesRoutes = require("./Routes/partides.js");
const participantsRoutes = require("./Routes/participants.js");
const vaixellsRoutes = require("./Routes/vaixells.js");
const posicionsVaixellsRoutes = require("./Routes/posicionsVaixells.js");

app.use(cors({}));
app.use(express.json());

app.use("/usuaris", usuarisRoutes);
app.use("/partides", partidesRoutes);
app.use("/participants", participantsRoutes);
app.use("/vaixells", vaixellsRoutes);
app.use("/posicionsVaixells", posicionsVaixellsRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

client.connect();