const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const WebSocket = require('ws');

app.use(express.static(path.join(__dirname, "/html")));
app.use(express.static(path.join(__dirname, "/js")));

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    ws.on("message", function incoming(message) {
        try {
            const data = JSON.parse(message);
            console.log("Message from server: " + data.key);

            if (data && data.key) {
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });
            }
        } catch (error) {
            console.error("Error to process message: " + error);
        }
    });
    /*ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
    });*/
    ws.send("Hello! Message From Server!!");

    ws.on("closed", function close() {
        console.log("disconnected");
    });
    
    ws.on("error", function error(err) {
        console.log("Error: ", err);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});