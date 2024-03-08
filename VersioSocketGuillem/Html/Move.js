window.onload = function () {
  let imgs = Array.from(document.querySelectorAll('img[src="/Images/VaixellVerdIBlau.jpg"]'));
  
  let speed = 1;
  let positions = Array(imgs.length).fill(0);
  let moveLeft = true;
  let moveTop = false;
  let moveRight = false;
  let moveBottom = false;
  let activeImg = 0
  const webSocket = new WebSocket('ws://172.23.2.211:3000');

  function animate() {
    let img = imgs[activeImg];
    let imgWidth = img.offsetWidth;
    let imgHeight = img.offsetHeight;
    let currentLeft = img.offsetLeft;
    let currentTop = img.offsetTop;
  
    if (moveLeft) {
      currentLeft += speed;
      if (currentLeft > window.innerWidth) {
        currentLeft = -imgWidth;
      }
      img.style.left = currentLeft + "px";
    } else if (moveBottom) {
      currentTop -= speed;
      if (currentTop < -imgHeight) {
        currentTop = window.innerHeight;
      }
      img.style.top = currentTop + "px";
    } else if (moveRight) {
      currentLeft -= speed;
      if (currentLeft < -imgWidth) {
        currentLeft = window.innerWidth;
      }
      img.style.left = currentLeft + "px";
    } else if (moveTop) {
      currentTop += speed;
      if (currentTop > window.innerHeight) {
        currentTop = -imgHeight;
      }
      img.style.top = currentTop + "px";
    }
  
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("keydown", function (event) {
    if (event.key >= "1" && event.key <= "5") {
      activeImg = parseInt(event.key) - 1;
      if (activeImg >= imgs.length) {
        activeImg = imgs.length - 1;
      }
    }
  
    if (event.key === "s" || event.key === "S") {
      webSocket.send(JSON.stringify({ key: "S" }));
      moveLeft = false;
      moveTop = true;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(90deg)";
      }
    } else if (event.key === "d" || event.key === "D") {
      webSocket.send(JSON.stringify({ key: "D" }));
      moveLeft = true;
      moveTop = false;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(0deg)";
      }
    } else if (event.key === "a" || event.key === "A") {
      webSocket.send(JSON.stringify({ key: "A" }));
      moveLeft = false;
      moveTop = false;
      moveRight = true;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(180deg)";
      }
    } else if (event.key === "w" || event.key === "W") {
       webSocket.send(JSON.stringify({ key: "W" }));
      moveLeft = false;
      moveTop = false;
      moveRight = false;
      moveBottom = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(270deg)";
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
        imgs[activeImg].style.transform = "rotate(90deg)";
      }
    } else if (direction === "W") {
      moveLeft = false;
      moveTop = false;
      moveRight = false;
      moveBottom = true;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(270deg)";
      }
    } else if (direction === "A") {
      moveLeft = false;
      moveTop = false;
      moveRight = true;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(180deg)";
      }
    } else if (direction === "D") {
      moveLeft = true;
      moveTop = false;
      moveRight = false;
      moveBottom = false;
      for (let i = 0; i < imgs.length; i++) {
        imgs[activeImg].style.transform = "rotate(0deg)";
      }
    }
  };
};
