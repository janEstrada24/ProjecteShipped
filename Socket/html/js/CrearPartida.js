const IP = "172.23.1.129";
const webSocket = new WebSocket("ws://" + IP + ":3000");
let boto;

webSocket.onopen = function (event) {
    console.log("Connection established");
};

function CrearPartida() {
    if (boto.disabled == false) {
        webSocket.send(JSON.stringify({ sumarJugador: "sumarJugador" }));
    }
    boto.disabled = true;
}

window.onload = function start() {
    boto = document.getElementsByTagName("button")[0];
    boto.addEventListener("click", CrearPartida);

    webSocket.onmessage = function (event) {
        const message = JSON.parse(event.data);

        if (message.numJugadors) { 
            console.log("Missatge del servidor: " + message);
            window.location.href = "http://" + IP + ":3000/PartidaActiva/partidaActiva.html";
        }
    }
}
