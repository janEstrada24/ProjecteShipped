// Escuchar mensajes del script principal
onmessage = function(e) {
    console.log('Message received from main script');
    var result = e.data[0] * e.data[1];
    postMessage(result);
}
