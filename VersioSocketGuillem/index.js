const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors"); // Requiere cors

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

// Serve static files from the Html directory
app.use(express.static(path.join(__dirname, "Html")));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on('keyPress', function(key) {
    console.log(key);
    socket.broadcast.emit('keyPress', key);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
server.listen(3000, () => console.log("Listening on port 3000"));
