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

  socket.on("move image", (coords) => {
    // Notify all clients that the image is about to move
    socket.broadcast.emit("pre move image", coords);

    // Then move the image
    socket.broadcast.emit("move image", coords);

    // Check if the image has been detected
    let imageDetected = checkImageDetection(); // replace this with your image detection logic

    // Send the image detection status to the client
    socket.emit("image detection", { detected: imageDetected });
  });
});
server.listen(3000, () => console.log("Listening on port 3000"));
