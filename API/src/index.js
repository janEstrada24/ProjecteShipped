require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./Database/connection.js");

const usuarisRoutes = require("./Routes/usuaris.js");
const partidesRoutes = require("./Routes/partides.js");

app.use(cors({}));
app.use(express.json());

app.use("/usuaris", usuarisRoutes);
app.use("/partides", partidesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

client.connect();