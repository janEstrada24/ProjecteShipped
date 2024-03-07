window.onload = function start() {
    var image = document.getElementById("imatge");
    var position = { left: 0, top: 0 };
    var speed = 1; 

    var keysPressed = {
        "A": false,
        "D": false,
        "W": false,
        "S": false
    };

    function moveImage() {
        if (keysPressed["A"]) {
            position.left -= speed;
            image.style.transform = 'rotate(180deg)';
            if (position.left < -image.offsetWidth) {
                position.left = window.innerWidth;
            }
        }
        if (keysPressed["D"]) {
            position.left += speed;
            image.style.transform = 'rotate(0deg)';
            if (position.left > window.innerWidth) {
                position.left = -image.offsetWidth;
            }
        }
        if (keysPressed["W"]) {
            position.top -= speed;
            image.style.transform = 'rotate(270deg)';
            if (position.top < -image.offsetHeight) {
                position.top = window.innerHeight;
            }
        }
        if (keysPressed["S"]) {
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

    moveImage();
}