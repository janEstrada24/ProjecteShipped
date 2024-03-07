window.onload = function () {
  let imgs = document.querySelectorAll(
    'img[src="/Images/VaixellVerdIBlau.jpg"]'
  );
  let speed = 1;
  let positions = Array(imgs.length).fill(0);
  let moveLeft = true;
  let moveTop = false;
  let moveRight = false;
  let moveBottom = false;

  function animate() {
    for (let i = 0; i < imgs.length; i++) {
      let imgWidth = imgs[i].offsetWidth;
      let imgHeight = imgs[i].offsetHeight;
      let currentLeft = imgs[i].offsetLeft;
      let currentTop = imgs[i].offsetTop;

      if (moveLeft) {
        currentLeft += speed;
        if (currentLeft > window.innerWidth) {
          currentLeft = -imgWidth;
        }
        imgs[i].style.left = currentLeft + "px";
      } else if (moveBottom) {
        currentTop -= speed;
        if (currentTop < -imgHeight) {
          currentTop = window.innerHeight;
        }
        imgs[i].style.top = currentTop + "px";
      } else if (moveRight) {
        currentLeft -= speed;
        if (currentLeft < -imgWidth) {
          currentLeft = window.innerWidth;
        }
        imgs[i].style.left = currentLeft + "px";
      } else if (moveTop) {
        currentTop += speed;
        if (currentTop > window.innerHeight) {
          currentTop = -imgHeight;
        }
        imgs[i].style.top = currentTop + "px";
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.key === "S") {
      moveLeft = false;
      moveTop = true;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(90deg)";
      }
    } else if (event.key === "d" || event.key === "D") {
      moveLeft = true;
      moveTop = false;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(0deg)";
      }
    } else if (event.key === "a" || event.key === "A") {
      moveLeft = false;
      moveTop = false;
      moveRight = true;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(180deg)";
      }
    } else if (event.key === "w" || event.key === "W") {
      moveLeft = false;
      moveTop = false;
      moveRight = false;
      moveBottom = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(270deg)";
      }
    }
    const socket = io();

    window.addEventListener("keydown", function (event) {
      const key = event.key;
      socket.emit("keyPress", key);
    });
    // Aquí es donde agregas el código de Socket.IO
    
    socket.on("keyPress", function (key) {
      if (key === "a" || key === "A") {
        moveLeft = false;
        moveTop = false;
        moveRight = true;
        moveBottom = false;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.transform = "rotate(180deg)";
        }
      } else if (key === "d" || key === "D") {
        moveLeft = true;
        moveTop = false;
        moveRight = false;
        moveBottom = false;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.transform = "rotate(0deg)";
        }
      } else if (key === "w" || key === "W") {
        moveLeft = false;
        moveTop = false;
        moveRight = false;
        moveBottom = true;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.transform = "rotate(270deg)";
        }
      } else if (key === "s" || key === "S") {
        moveLeft = false;
        moveTop = true;
        moveRight = false;
        moveBottom = false;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.transform = "rotate(90deg)";
        }
      }
    });
  });
};
