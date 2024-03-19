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
    const numJugadors = 0;

    ws.on("message", function incoming(message) {
        try {
            const data = JSON.parse(message);

            if (data) {
                if (data.key) {
                    wss.clients.forEach(function each(client) {
                        console.log("Message from server: " + data.key);
                        client.send(JSON.stringify(data));
                    });
                }
                if (data.veureJugadors) {
                    wss.clients.forEach(function each(client) {
                        console.log("Numero de jugadors: " + numJugadors);
                        client.send(JSON.stringify({ numJugadors: numJugadors}));
                    });
                }
                if (data.sumarJugador) {
                    wss.clients.forEach(function each(client) {
                        numJugadors++;
                        console.log("Jugador sumat: " + numJugadors);
                        client.send(JSON.stringify({ numJugadors: numJugadors}));
                    });
                }
            } 
        } catch (error) {
            console.error("Error to process message: " + error);
        }
    });
    ws.send("Hello! Message From Server!!");

    ws.on("closed", function close() {
        console.log("disconnected");
    });
    
    ws.on("error", function error(err) {
        console.log("Error: ", err);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});