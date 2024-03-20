const IP = "172.23.1.129";
const webSocket = new WebSocket("ws://" + IP + ":3000");

webSocket.onopen = function (event) {
    console.log("Connection established");
};

function CrearPartida() {
    webSocket.send(JSON.stringify({ sumarJugador: "sumarJugador" }));
}

window.onload = function start() {
    const boto = document.getElementsByTagName("button")[0];
    boto.addEventListener("click", CrearPartida);

    webSocket.onmessage = function (event) {
        const message = JSON.parse(event.data);

        if (message.numJugadors) { 
                window.location.href = "http://" + IP + ":3000/PartidaActiva/partidaActiva.html";
    
        }
    }
}
