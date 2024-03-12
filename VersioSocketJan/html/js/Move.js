window.onload = function start() {
    var image = null;
    var position = null;
    var positions = [];
    var directionsShips = [];
    var images = document.getElementsByClassName("imatge");
    var worker = new Worker("js/worker.js");
    worker.postMessage('Happy Birthday');

    for (var i = 0; i < document.getElementsByClassName("imatge").length; i++) {
        positions.push({ left: 0, top: 0, rotation: "" });
        directionsShips.push({ "direction": "right" });
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
        if (data.direction) {
            directionsShips[selectedImage]["direction"] = data.direction;
            console.log("Missatge rebut des del servidor: " + data.direction);
            image.style.transform = data.transform;
        }
    }

    function moveImage() {
        if (image != null) {

            images = document.getElementsByClassName("imatge");

            for (var i = 0; i < images.length; i++) {
                if (images[i] != image) {

                    var direction = directionsShips[i]["direction"];
                    switch (direction) {
                        case "left":
                            positions[i].rotation = "rotate(180deg)";
                            positions[i].left -= speed;
                            if (positions[i].left < -images[i].offsetWidth) {
                                positions[i].left = window.innerWidth;
                            }
                            break;
                        case "right":
                            positions[i].rotation = "rotate(0deg)";
                            positions[i].left += speed;
                            if (positions[i].left > window.innerWidth) {
                                positions[i].left = -images[i].offsetWidth;
                            }
                            break;
                        case "up":
                            positions[i].rotation = "rotate(270deg)";
                            positions[i].top -= speed;
                            if (positions[i].top < -images[i].offsetHeight) {
                                positions[i].top = window.innerHeight;
                            }
                            break;
                        case "down":
                            positions[i].rotation = "rotate(90deg)";
                            positions[i].top += speed;
                            if (positions[i].top > window.innerHeight) {
                                positions[i].top = -images[i].offsetHeight;
                            }
                            break;
                    }

                    images[i].style.left = positions[i].left + "px";
                    images[i].style.top = positions[i].top + "px";
            
                    if (positions[i] >= window.innerWidth) {
                        positions[i] = -images[i].width;
                    }
                    if (positions[i] >= window.innerHeight) {
                        positions[i] = -images[i].height;
                    }
                    images[i].style.transform = positions[i].rotation;
                }
            }

            position = positions[selectedImage];

            switch (directionsShips[selectedImage]["direction"]) {
                case "left":
                    if (comptadorTecla == 0) {
                        webSocket.send(JSON.stringify({
                            direction: "left",
                            transform: 'rotate(180deg)'
                        }));
                        comptadorTecla++;
                    }
        
                    position.left -= speed;
                    if (position.left < -image.offsetWidth) {
                        position.left = window.innerWidth;
                    }
                    break;

                case "right":
                    if (comptadorTecla == 0) {
                        webSocket.send(JSON.stringify({
                            direction: "right",
                            transform: 'rotate(0deg)'
                        }));
                        comptadorTecla++;
                    }
        
                    position.left += speed;
                    if (position.left > window.innerWidth) {
                        position.left = -image.offsetWidth;
                    }
                    break;

                case "up":
                    if (comptadorTecla == 0) {
                        webSocket.send(JSON.stringify({
                            direction: "up",
                            transform: 'rotate(270deg)'
                        }));
                        comptadorTecla++;
                    }
        
                    position.top -= speed;
                    if (position.top < -image.offsetHeight) {
                        position.top = window.innerHeight;
                    }
                    break;

                case "down":
                    if (comptadorTecla == 0) {
                        webSocket.send(JSON.stringify({
                            direction: "down",
                            transform: 'rotate(90deg)'
                        }));
                        comptadorTecla++;
                    }
    
                    position.top += speed;
                    if (position.top > window.innerHeight) {
                        position.top = -image.offsetHeight;
                    }
                    break;
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
        if (event.key.toUpperCase() in keysPressed 
            && selectedImage != null) {

            switch (event.key.toUpperCase()) {
                case "A":
                    directionsShips[selectedImage]["direction"] = "left";
                    break;
                case "D":
                    directionsShips[selectedImage]["direction"] = "right";
                    break;
                case "W":
                    directionsShips[selectedImage]["direction"] = "up";
                    break;
                case "S":
                    directionsShips[selectedImage]["direction"] = "down";
                    break;
            }
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