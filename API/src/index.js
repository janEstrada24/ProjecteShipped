require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./Database/connection.js");

app.use(cors({}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

client.connect();