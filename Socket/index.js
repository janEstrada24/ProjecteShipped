const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const WebSocket = require('ws');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, "/html")));
app.use(express.static(path.join(__dirname, "/js")));

const wss = new WebSocket.Server({ server });

const numVaixells = 2;
let numJugadors = 0;
let partida = [];
let vaixells = [];
let idsUsuaris = [];
let idsVaixells = [];
let arrayX = [];
let arrayY = [];

wss.on("connection", (ws) => {

    for (let i = 0; i < numVaixells; i++) {
        idsVaixells.push(uuidv4());
    }

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
                if (data.sumarJugador
                    && data.windowHeight && data.windowWidth) {
                    
                    wss.clients.forEach(function each(client) {
                        numJugadors++;
                        console.log("Jugador sumat: " + numJugadors);
                        const idJugador = uuidv4();
                        idsUsuaris.push(idJugador);

                        var x = "100px";
                        var y = "200px";

                        vaixells.push({
                            idVaixell: uuidv4(),
                            idJugador: idJugador,
                            x: x,
                            y: y
                        });

                        if (numJugadors == 2) {
                            client.send(JSON.stringify({ numJugadors: numJugadors}));
                        }
                    });
                }

                if (data.demanarIDUsuari) {
                    console.log("ID usuari: " + idsUsuaris[0]);
                    ws.send(JSON.stringify({ idusuari: idsUsuaris[0] }));
                    idsUsuaris.splice(0, 1);
                }

                if (data.demanarVaixells) {
                    /**
                     * Segons el numero de vaixells que volem que hi hagi a la pantalla, es crea per cada vaixell
                     * una UUID aleatoria que després hauran d'obtenir els usuaris.
                     * 
                     * Per altra banda, assignem una posicio aleatoria a cadascun d'aquests vaixells. Aixo fa 
                     * que tots els usuaris d'una partida vegin un vaixell en concret sempre a la mateixa posicio.
                     */ 
                    ws.send(JSON.stringify({ vaixells: vaixells }));
                    console.log(vaixells);
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