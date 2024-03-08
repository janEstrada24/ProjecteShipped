window.onload = function start() {
    var image = document.getElementById("imatge");
    var position = { left: 0, top: 0 };
    var speed = 1; 
    var comptadorTecla = 0;
    var webSocket = new WebSocket('ws://172.23.1.129:3000');

    var keysPressed = {
        "A": false,
        "D": false,
        "W": false,
        "S": false
    };

    webSocket.onopen = function(event) {
        console.log("Connection is open ...");
        webSocket.send(JSON.stringify({key: "A"}));
    }

    /*webSocket.addEventListener("message", function(event) {
        var data = JSON.parse(event.data);
        console.log("Missatge rebut des del servidor: " + data.key);
        if (data.key) {
            keysPressed[data.key] = true;
            console.log("Key rebuda des del servidor" + data.key);
        }
    })
    webSocket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        console.log("Missatge rebut des del servidor: " + data.key);
        if (data.key) {
            keysPressed[data.key] = true;
            console.log("Key rebuda des del servidor" + data.key);
        }
    }*/

    // Comprovar com obtenir el missatge del socket al client i processar-lo
    function moveImage() {
        if (keysPressed["A"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({key: "A"}));
                comptadorTecla++;
            }
            
            position.left -= speed;
            image.style.transform = 'rotate(180deg)';
            if (position.left < -image.offsetWidth) {
                position.left = window.innerWidth;
            }
        }
        if (keysPressed["D"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({key: "D"}));
                comptadorTecla++;
            }

            position.left += speed;
            image.style.transform = 'rotate(0deg)';
            if (position.left > window.innerWidth) {
                position.left = -image.offsetWidth;
            }
        }
        if (keysPressed["W"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({key: "W"}));
                comptadorTecla++;
            }

            position.top -= speed;
            image.style.transform = 'rotate(270deg)';
            if (position.top < -image.offsetHeight) {
                position.top = window.innerHeight;
            }
        }
        if (keysPressed["S"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({key: "S"}));
                comptadorTecla++;
            }

            position.top += speed;
            image.style.transform = 'rotate(90deg)';
            if (position.top > window.innerHeight) {
                position.top = -image.offsetHeight;
            }
        }
        
        image.style.left = position.left + "px";
        image.style.top = position.top + "px";

        if (position >= window.innerWidth) {
            position = -image.width;
        }
        if (position >= window.innerHeight) {
            position = -image.height;
        }
        
        requestAnimationFrame(moveImage);
    }

    window.addEventListener("keydown", function(event) {
        if (event.key.toUpperCase() in keysPressed) {
            for (var key in keysPressed) {
                keysPressed[key] = false;
            }
            keysPressed[event.key.toUpperCase()] = true;
        }
    });
    
    window.addEventListener("keyup", function(event) {
        comptadorTecla = 0;
    });

    moveImage();
}