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
  const webSocket = new WebSocket('ws://172.23.2.211:3000');

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
      webSocket.send(JSON.stringify({ key: "S" }));
      moveLeft = false;
      moveTop = true;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(90deg)";
      }
    } else if (event.key === "d" || event.key === "D") {
      webSocket.send(JSON.stringify({ key: "D" }));
      moveLeft = true;
      moveTop = false;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(0deg)";
      }
    } else if (event.key === "a" || event.key === "A") {
      webSocket.send(JSON.stringify({ key: "A" }));
      moveLeft = false;
      moveTop = false;
      moveRight = true;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(180deg)";
      }
    } else if (event.key === "w" || event.key === "W") {
       webSocket.send(JSON.stringify({ key: "W" }));
      moveLeft = false;
      moveTop = false;
      moveRight = false;
      moveBottom = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(270deg)";
      }
    }
  });
  webSocket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    const direction = message.key;
  
    // Mover la imagen en la dirección recibida
    if (direction === "S") {
      moveLeft = false;
      moveTop = true;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(90deg)";
      }
    } else if (direction === "W") {
      moveLeft = false;
      moveTop = false;
      moveRight = false;
      moveBottom = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(270deg)";
      }
    } else if (direction === "A") {
      moveLeft = false;
      moveTop = false;
      moveRight = true;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(180deg)";
      }
    } else if (direction === "D") {
      moveLeft = true;
      moveTop = false;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "rotate(0deg)";
      }
    }
  };
};
