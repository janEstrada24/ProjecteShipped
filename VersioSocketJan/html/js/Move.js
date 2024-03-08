window.onload = function start() {
    var image = document.getElementById("imatge");
    var images = document.getElementsByClassName("imatge");
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

    var keysNumbers = {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    };

    webSocket.onopen = function(event) {
        console.log("Connection is open ...");
    }

    webSocket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.key) {
            switch (data.key) {
                case 'A':
                    keysPressed["A"] = true;
                    keysPressed["D"] = false;
                    keysPressed["W"] = false;
                    keysPressed["S"] = false;
                    break;
                case 'D':
                    keysPressed["A"] = false;
                    keysPressed["D"] = true;
                    keysPressed["W"] = false;
                    keysPressed["S"] = false;
                    break;
                case 'W':
                    keysPressed["A"] = false;
                    keysPressed["D"] = false;
                    keysPressed["W"] = true;
                    keysPressed["S"] = false;
                    break;
                case 'S':
                    keysPressed["A"] = false;
                    keysPressed["D"] = false;
                    keysPressed["W"] = false;
                    keysPressed["S"] = true;
                    break;
            }

            keysPressed[data.key] = true;
            console.log("Missatge rebut des del servidor: " + data.key);
            image.style.transform = data.transform;
        }
    }

    function moveImage() {
        if (keysPressed["A"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({
                    key: "A",
                    transform: 'rotate(180deg)'
                }));
                comptadorTecla++;
            }

            position.left -= speed;
            if (position.left < -image.offsetWidth) {
                position.left = window.innerWidth;
            }
        }
        if (keysPressed["D"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({
                    key: "D",
                    transform: 'rotate(0deg)'
                }));
                comptadorTecla++;
            }

            position.left += speed;
            if (position.left > window.innerWidth) {
                position.left = -image.offsetWidth;
            }
        }
        if (keysPressed["W"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({
                    key: "W",
                    transform: 'rotate(270deg)'
                }));
                comptadorTecla++;
            }

            position.top -= speed;
            if (position.top < -image.offsetHeight) {
                position.top = window.innerHeight;
            }
        }
        if (keysPressed["S"]) {
            if (comptadorTecla == 0) {
                webSocket.send(JSON.stringify({
                    key: "S",
                    transform: 'rotate(90deg)'
                }));
                comptadorTecla++;
            }

            position.top += speed;
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
        
        if (event.key in keysNumbers) {
            for (var key in keysNumbers) {
                keysNumbers[key] = false;
            }
            keysNumbers[event.key] = true;
        }
    });
    
    window.addEventListener("keyup", function(event) {
        comptadorTecla = 0;
    });

    moveImage();
}