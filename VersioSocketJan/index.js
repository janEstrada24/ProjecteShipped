const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

app.use(express.static(path.join(__dirname, "/html")));
app.use(express.static(path.join(__dirname, "/js")));

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
  ws.send("Hello! Message From Server!!");
});

wss.on("keyPress", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send("Hello! Message From Server!!");
});

wss.on("closed", function close() {
    console.log("disconnected");
});

wss.on("error", function error(err) {
    console.log("Error: ", err);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});