const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the Html directory
app.use(express.static(path.join(__dirname, "Html")));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("move image", { x, y });

  // Server-side code
  const io = require("socket.io")(httpServer, {
    // options...
  });

  io.on("connection", (socket) => {
    socket.on("move image", (coords) => {
      // Broadcast the 'move image' event with the coordinates to all other connected clients
      socket.broadcast.emit("move image", coords);
    });
  });
});

server.listen(3000, () => console.log("Listening on port 3000"));
