window.onload = function start() {
    var image = null;
    var position = null;
    var positions = [];

    for (var i = 0; i < document.getElementsByClassName("imatge").length; i++) {
        positions.push({ left: 0, top: 0 });
    }

    var speed = 1; 
    var comptadorTecla = 0;
    var webSocket = new WebSocket('ws://localhost:3000');

    var selectedImage = null;

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

            for (var key in keysPressed) {
                keysPressed[key] = false;
            }

            keysPressed[data.key] = true;
            console.log("Missatge rebut des del servidor: " + data.key);
            image.style.transform = data.transform;
        }
    }

    function moveImage() {
        if (image != null) {
            position = positions[selectedImage];

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
            image = document.getElementsByClassName("imatge")[event.key - 1];
            selectedImage = (parseInt(event.key) - 1);
            console.log("imatge seleccionada " + selectedImage);
        }
    });
    
    window.addEventListener("keyup", function(event) {
        comptadorTecla = 0;
    });

    moveImage();
}