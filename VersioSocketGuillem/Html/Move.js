window.onload = function () {
  let imgs = document.querySelectorAll(
    'img[src="/Images/VaixellVerdIBlau.jpg"]'
  );
  let speed = 0.2;
  let positions = Array(imgs.length).fill(0);
  let moveLeft = true;
  let moveTop = false;

  function animate() {
    for (let i = 0; i < imgs.length; i++) {
      if (moveLeft) {
        positions[i] += speed;
        imgs[i].style.left = positions[i] + "px";
      } else {
        positions[i] += speed;
        imgs[i].style.top = positions[i] + "px";
      }

      if (positions[i] > window.innerWidth) {
        positions[i] = -imgs[i].offsetWidth;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();


  window.addEventListener('keydown', function (event) {
    if (event.key === 's' || event.key === 'S') {
      moveLeft = false;
      moveTop = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = 'rotate(90deg)';
      }
      

    }
    
   
    
  });
 
}