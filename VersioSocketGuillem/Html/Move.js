window.onload = function() {
  let imgs = document.querySelectorAll('img[src="/Images/VaixellVerdIBlau.jpg"]'); // select only the images with "VaixellVerdIBlau.jpg" in their src
  let speed = 1; // speed of the movement
  let positions = Array(imgs.length).fill(0); // initial positions for each image

  function animate() {
    for (let i = 0; i < imgs.length; i++) {
      positions[i] += speed; // update position for each image
      imgs[i].style.left = positions[i] + 'px'; // apply new position

      if (positions[i] > window.innerWidth) {
        positions[i] = -imgs[i].offsetWidth; // reset position to start if image has moved off screen
      }
    }

    requestAnimationFrame(animate); // call animate again for the next frame
  }

  animate();
}