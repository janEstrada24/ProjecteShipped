window.onload = function start() {
    var image = document.getElementById("imatge");
    var position = { left: 0, top: 0 };
    var speed = 1; 

    // Objeto para rastrear qué teclas están presionadas
    var keysPressed = {
        "A": false,
        "D": false,
        "W": false,
        "S": false,
        "a": false,
        "d": false,
        "w": false,
        "s": false
    };

    function moveImage() {
        if (keysPressed["A"] || keysPressed["a"]) {
            position.top -= speed;
        }
        if (keysPressed["D"] || keysPressed["d"]) {
            position.top += speed;
        }
        if (keysPressed["W"] || keysPressed["w"]) {
            position.left -= speed;
        }
        if (keysPressed["S"] || keysPressed["s"]) {
            position.left += speed;
        }
        
        image.style.left = position.left + "px";
        image.style.top = position.top + "px";
    }

    function moveRight() {
        position += speed;
        image.style.left = position + "px";
        if (position >= window.innerWidth) {
            position = -image.width;
        }
    }

    function moveLeft() {
        position += speed;
        image.style.right = position + "px";
        if (position >= window.innerWidth) {
            position = -image.width;
        }
    }

    window.addEventListener("keydown", function(event) {
        if (event.key in keysPressed) {
            keysPressed[event.key] = true;
        }
        /*if (event.key === "W" || event.key === "w") {
            direction = "up";
            moveImage();
            console.log("Tecla 'W' o 'w' premuda");
        }
        else if (event.key === "A" || event.key === "a") {
            direction = "left";
            moveImage();
            //setInterval(moveLeft, 10);
            console.log("Tecla 'A' o 'a' premuda");
        }
        else if (event.key === "S" || event.key === "s") {
            direction = "down";
            moveImage();
            console.log("Tecla 'S' o 's' premuda");
        }
        else if (event.key === "D" || event.key === "d") {
            direction = "right";
            moveImage();
            //setInterval(moveRight, 10);
            console.log("Tecla 'D' o 'd' premuda");
        }*/
    });

    window.addEventListener('keyup', function(event) {
        if (event.key in keysPressed) {
            keysPressed[event.key] = false;
        }
    });

    moveImage();
}