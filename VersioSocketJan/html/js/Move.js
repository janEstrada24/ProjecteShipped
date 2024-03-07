window.onload = function start() {
    var image = document.getElementById("imatge");
    var position = 0;
    var speed = 1; 
    
    function moveRight() {
        position += speed;
        image.style.left = position + "px";
        if (position >= window.innerWidth) {
            position = -image.width;
        }
    }
    
    setInterval(moveRight, 10);
}