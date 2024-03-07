window.onload = function () {
  let imgs = document.querySelectorAll(
    'img[src="/Images/VaixellVerdIBlau.jpg"]'
  );
  let speed = 0.2;
  let positions = Array(imgs.length).fill(0);
  let moveLeft = true;
  let moveTop = false;
  let moveRight = false;
  let moveBottom = false;

  function animate() {
    for (let i = 0; i < imgs.length; i++) {
      if (moveLeft) {
        positions[i] += speed;
        imgs[i].style.left = positions[i] + "px";
      } else if (moveBottom) {
        positions[i] -= speed;
        imgs[i].style.top = positions[i] + "px";
      } else if (moveRight) {
        positions[i] -= speed;
        imgs[i].style.left = positions[i] + "px";
      } else if (moveTop) {
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
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = 'rotate(90deg)';
      }
    } else if (event.key === 'd' || event.key === 'D') {
      moveLeft = true;
      moveTop = false;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = 'rotate(0deg)';
      }
    }else if (event.key === 'a' || event.key === 'A') {
      moveLeft = false;
      moveTop = false;
      moveRight = true;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = 'rotate(180deg)';
      }
    } else if(event.key === 'w' || event.key === 'W'){
      moveLeft = false;
      moveTop = false;
      moveRight = false;
      moveBottom = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = 'rotate(270deg)';
      }
    
   
    }
  });
 
}