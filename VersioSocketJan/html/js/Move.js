window.onload = function start() {
    var image = null;
    var position = null;
    var positions = [];
    var keysShips = [];
    var images = document.getElementsByClassName("imatge");
    var worker = new Worker("js/worker.js");
    worker.postMessage('Happy Birthday');

    for (var i = 0; i < document.getElementsByClassName("imatge").length; i++) {
        positions.push({ left: 0, top: 0, rotation: "" });
        keysShips.push({
            "A": false,
            "D": false,
            "W": false,
            "S": false
        });
    }

    var speed = 1; 
    var comptadorTecla = 0;
    var webSocket = new WebSocket('ws://172.23.1.129:3000');

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

            for (var key in keysShips[selectedImage]) {
                keysShips[selectedImage][key] = false;
            }

            /*for (var key in keysPressed) {
                keysPressed[key] = false;
            }*/

            keysShips[selectedImage][data.key] = true;
            console.log("Missatge rebut des del servidor: " + data.key);
            image.style.transform = data.transform;
        }
    }

    function moveImages() {
        images = document.getElementsByClassName("imatge");
        for (var i = 0; i < images.length; i++) {
            for (var key in keysShips[i]) {
                if (keysShips[i][key]) {
                    switch (key) {
                        case "A":
                            positions[i].rotation = "rotate(180deg)";
                            positions[i].left -= speed;
                            if (positions[i].left < -images[i].offsetWidth) {
                                positions[i].left = window.innerWidth;
                            }
                            break;
                        case "D":
                            positions[i].rotation = "rotate(0deg)";
                            positions[i].left += speed;
                            if (positions[i].left > window.innerWidth) {
                                positions[i].left = -images[i].offsetWidth;
                            }
                            break;
                        case "W":
                            positions[i].rotation = "rotate(270deg)";
                            positions[i].top -= speed;
                            if (positions[i].top < -images[i].offsetHeight) {
                                positions[i].top = window.innerHeight;
                            }
                            break;
                        case "S":
                            positions[i].rotation = "rotate(90deg)";
                            positions[i].top += speed;
                            if (positions[i].top > window.innerHeight) {
                                positions[i].top = -images[i].offsetHeight;
                            }
                            break;
                    }

                    if (comptadorTecla == 0) {
                        webSocket.send(JSON.stringify({
                            key: key,
                            transform: positions[i].rotation
                        }));
                        comptadorTecla++;
                    }

                }
            }
            position = positions[i];
            position.left = images[i].offsetLeft;
            position.top = images[i].offsetTop;
        }
    }

    function moveImage() {
        if (image != null) {

            images = document.getElementsByClassName("imatge");

            for (var i = 0; i < images.length; i++) {
                if (images[i] != image) {
                    for (var key in keysShips[i]) {
                        if (keysShips[i][key] == true) {
                            switch (key) {
                                case "A":
                                    positions[i].rotation = "rotate(180deg)";
                                    positions[i].left -= speed;
                                    if (positions[i].left < -images[i].offsetWidth) {
                                        positions[i].left = window.innerWidth;
                                    }
                                    break;
                                case "D":
                                    positions[i].rotation = "rotate(0deg)";
                                    positions[i].left += speed;
                                    if (positions[i].left > window.innerWidth) {
                                        positions[i].left = -images[i].offsetWidth;
                                    }
                                    break;
                                case "W":
                                    positions[i].rotation = "rotate(270deg)";
                                    positions[i].top -= speed;
                                    if (positions[i].top < -images[i].offsetHeight) {
                                        positions[i].top = window.innerHeight;
                                    }
                                    break;
                                case "S":
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
                }
            }

            position = positions[selectedImage];

            //if (keysPressed["A"]) {
            if (keysShips[selectedImage]["A"]) {
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
            //if (keysPressed["D"]) {
            if (keysShips[selectedImage]["D"]) {
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
            //if (keysPressed["W"]) {
            if (keysShips[selectedImage]["W"]) {
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
            //if (keysPressed["S"]) {
            if (keysShips[selectedImage]["S"]) {
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
        /*if (event.key.toUpperCase() in keysPressed) {
            for (var key in keysPressed) {
                keysPressed[key] = false;
            }
            keysPressed[event.key.toUpperCase()] = true;
        }*/

        if (event.key.toUpperCase() in keysPressed 
            && selectedImage != null) {
            for (var key in keysShips[selectedImage]) {
                keysShips[selectedImage][key] = false;
            }
            keysShips[selectedImage][event.key.toUpperCase()] = true;
        }

        if (event.key in keysNumbers) {
            image = document.getElementsByClassName("imatge")[event.key - 1];
            selectedImage = (parseInt(event.key) - 1);
            console.log("imatge seleccionada " + selectedImage);
        }
    });
    
    window.addEventListener("keyup", function(event) {
        /*if (event.key.toUpperCase() in keysPressed
            && selectedImage != null) {
            keysShips[selectedImage][event.key.toUpperCase()] = false;
        }*/
        comptadorTecla = 0;
    });

    moveImage();
}