const IP = "172.23.2.211";
function crearPartida() {
   window.location.href = "http://" + IP + ":3000/FormulariPartida/formulariPartida.html";
}
function unirPartida() {
    window.location.href = "http://" + IP + ":3000/UnirsePartida/unirsePartida.html";
}
window.onload = function start() {
    const botoCrearPartida = document.getElementsByTagName("button")[0];
    const botoUnirPartida = document.getElementsByTagName("button")[1];
    botoCrearPartida.addEventListener("click", crearPartida);
    botoUnirPartida.addEventListener("click", unirPartida);
}