window.onload = function start() {
    var positions = [];
    var directionsShips = [];
    var rotationAngles = [];
    var images = document.getElementsByClassName("imatge");
    var worker = new Worker("js/worker.js");
    worker.postMessage('Happy Birthday');

    for (var i = 0; i < document.getElementsByClassName("imatge").length; i++) {
        rotationAngles.push(0);
        positions.push({ left: 0, top: 0, rotation: "" });
        directionsShips.push({ "direction": "right" });
    }

    var speed = 1; 
    var webSocket = new WebSocket('ws://172.23.1.129:3000');
    var radian = 0;

    var selectedImage = null;

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
                case "A":
                  rotationAngles[selectedImage] -= 5;
                  break;
                case "D":
                  rotationAngles[selectedImage] += 5;
                  break;
                case "Number":
                  selectedImage = message.selectedImage;
                  break;
            }
        }

        images[selectedImage].style.transform = "rotate(" + rotationAngles[selectedImage] + "deg)";

    }

    function moveImage() {
        for (var i = 0; i < images.length; i++) {
            radian = rotationAngles[i] * Math.PI / 180;
            positions[i].left += speed * Math.cos(radian);
            positions[i].top += speed * Math.sin(radian);
            
            if (positions[i].left < -images[i].offsetWidth) {
                positions[i].left = window.innerWidth;
            }

            if (positions[i].left > window.innerWidth) {
                positions[i].left = -images[i].offsetWidth;
            }

            if (positions[i].top < -images[i].offsetHeight) {
                positions[i].top = window.innerHeight;
            }

            if (positions[i].top > window.innerHeight) {
                positions[i].top = -images[i].offsetHeight;
            }

            images[i].style.left = positions[i].left + "px";
            images[i].style.top = positions[i].top + "px";
        }

        requestAnimationFrame(moveImage);
    }

    window.addEventListener("keydown", function(event) {
        if (selectedImage != null) {
            switch (event.key.toUpperCase()) {
                case "A":
                    rotationAngles[selectedImage] -= 10;
                    break;
                case "D":
                    rotationAngles[selectedImage] += 10;
                    break;
            }
        }

        if (event.key in keysNumbers) {
            webSocket.send(JSON.stringify({ key: "Number", value: event.key, activeImg: activeImg })); 
            
            selectedImage = (parseInt(event.key) - 1);
            console.log("imatge seleccionada " + selectedImage);
        }

        images[selectedImage].style.transform = "rotate(" + rotationAngles[selectedImage] + "deg)";
    });
    
    moveImage();
}