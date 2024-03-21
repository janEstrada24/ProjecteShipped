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

wss.on("connection", (ws) => {
    let numJugadors = 0;
    let numVaixells = 2;
    let arrayX = [];
    let arrayY = [];
    let idsUsuaris = [];
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
                        idsUsuaris.push(uuidv4());
                        
                        if (numJugadors == 2) {
                            client.send(JSON.stringify({ numJugadors: numJugadors}));

                            /**
                             * Assignem una posicio aleatoria a cada vaixell segons el numero
                             * de vaixells que volem que hi hagi a la pantalla. Aixo fa que tots
                             * els usuaris d'una partida vegin un vaixell en concret sempre a 
                             * la mateixa posicio.
                             */ 
                            for (let k = 0; k < numVaixells; k++) {
                                const x = Math.floor(Math.random() * data.windowWidth);
                                const y = Math.floor(Math.random() * data.windowHeight);
                                arrayX.push(x);
                                arrayY.push(y);
                            }

                            for (let i = 0; i < numJugadors; i++) {
                                for (let k = 0; k < numVaixells; k++) {
                                    axios.post('http://' + process.env.SERVER_ADDRES + ':4000/posicionsVaixells/postPosicioVaixell', 
                                    {
                                        idVaixell: uuidv4(),
                                        idUsuari: idsUsuaris[i],
                                        x: arrayX[k],
                                        y: arrayY[k]
                                    });
                                }
                            }

                        }
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