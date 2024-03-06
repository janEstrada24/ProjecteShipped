let img = document.querySelector('img'); // select the image
let speed = 2; // speed of the movement
let position = 0; // initial position

window.onload = function() {
  let img = document.querySelector('img'); // select the image
  let speed = 2; // speed of the movement
  let position = 0; // initial position

  const socket = io();

  socket.on("move image", (coords) => {
    // Update the image's position
    img.style.left = `${coords.x}px`;
    img.style.top = `${coords.y}px`;
  });

  function animate() {
    position += speed; // update position
    img.style.transform = `translateX(${position}px)`; // apply new position

    if (position > window.innerWidth) {
      position = -img.offsetWidth; // reset position to start if image has moved off screen
    }

    requestAnimationFrame(animate); // call animate again for the next frame
  }

  animate(); // start the animation
}