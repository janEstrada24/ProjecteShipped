const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const WebSocket = require('ws');
const cors = require('cors');

app.use(cors());

// Serve static files from the Html directory
app.use(express.static(path.join(__dirname, "Html")));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("A user connected");

  ws.on("message", function incoming(message) {
    try {
        const data = JSON.parse(message);
        console.log(data);

        if (data && data.key) {
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                    console.log("Send message to client: " + data.key);
                }
            });
        }
    } catch (error) {
        console.error("Error to process message: " + error);
    }
  });

  ws.on("close", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => console.log("Listening on port 3000"));