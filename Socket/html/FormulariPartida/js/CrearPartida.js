const IP = "172.23.1.129";
const webSocket = new WebSocket("ws://" + IP + ":3000");

webSocket.onopen = function (event) {
    console.log("Connection established");
    webSocket.send(JSON.stringify({ numJugadors: 1 }));
};

const PostPartida= async (nom, correucreador) => {
    const myBody = JSON.stringify({
        nom: nom,
        correucreador: correucreador
    });
   const response = await fetch('http://localhost:4000/partides/postPartida', {
        method: 'POST',
        body: myBody,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        alert("Error: " + errorMessage);
    }
    else {
        const myJson = await response.json();
        console.log("Response from server:");
        console.log(myJson);
    }
}
function CrearPartida() {
    const nom = document.getElementsByTagName("input")[0].value;
    const correucreador = localStorage.getItem('correu');
    PostPartida(nom, correucreador);
    
    webSocket.send(
        JSON.stringify({
            numJugadors: "Number"
        })
      );
}
window.onload = function start() {
    const boto = document.getElementsByTagName("button")[0];
    boto.addEventListener("click", CrearPartida);

    webSocket.onmessage = function (event) {
        const message = JSON.parse(event.data);

        if (message.numJugadors && message.numJugadors === 2) {        
            window.location.href = "http://" + IP + ":3000/MenuPartida/menuPartida.html";
        }
    }
}
