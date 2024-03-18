
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
    const correucreador = "guillembarris@gmail.com";
    PostPartida(nom, correucreador);
}
window.onload = function start() {
    const boto = document.getElementsByTagName("button")[0];
    boto.addEventListener("click", CrearPartida);
}
