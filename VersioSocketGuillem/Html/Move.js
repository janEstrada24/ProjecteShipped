window.onload = function () {
  let imgs = Array.from(document.getElementsByClassName("Jugador1"));

  let speed = 1;
  let positions = Array(imgs.length).fill(0);
  let activeImg = 0;
  let moveDirection = "left";
  const webSocket = new WebSocket("ws://172.23.2.211:3000");

  function animate() {
    imgs.forEach((img, index) => {
      let imgWidth = img.offsetWidth;
      let imgHeight = img.offsetHeight;
      let currentLeft = img.offsetLeft;
      let currentTop = img.offsetTop;

      if (index === activeImg) {
        switch (moveDirection) {
          case "left":
            currentLeft += speed;
            if (currentLeft > window.innerWidth) {
              currentLeft = -imgWidth;
            }
            img.style.left = currentLeft + "px";
            break;
          case "bottom":
            currentTop -= speed;
            if (currentTop < -imgHeight) {
              currentTop = window.innerHeight;
            }
            img.style.top = currentTop + "px";
            break;
          case "right":
            currentLeft -= speed;
            if (currentLeft < -imgWidth) {
              currentLeft = window.innerWidth;
            }
            img.style.left = currentLeft + "px";
            break;
          case "top":
            currentTop += speed;
            if (currentTop > window.innerHeight) {
              currentTop = -imgHeight;
            }
            img.style.top = currentTop + "px";
            break;
        }
      }

      // Cuando la imagen termine de ser activa, guarda la dirección hacia la que va la imagen
      if (index === activeImg) {
        positions[index] = moveDirection;
      }

      // Si la imagen no es activa, mueve la imagen en la dirección guardada de cada imagen, si no hay dirección, se mueve hacia la izquierda.
      if (index !== activeImg) {
        let direction = positions[index] || "left";
        switch (direction) {
          case "left":
            currentLeft += speed;
            if (currentLeft > window.innerWidth) {
              currentLeft = -imgWidth;
            }
            img.style.left = currentLeft + "px";
            break;
          case "bottom":
            currentTop -= speed;
            if (currentTop < -imgHeight) {
              currentTop = window.innerHeight;
            }
            img.style.top = currentTop + "px";
            break;
          case "right":
            currentLeft -= speed;
            if (currentLeft < -imgWidth) {
              currentLeft = window.innerWidth;
            }
            img.style.left = currentLeft + "px";
            break;
          case "top":
            currentTop += speed;
            if (currentTop > window.innerHeight) {
              currentTop = -imgHeight;
            }
            img.style.top = currentTop + "px";
            break;
        }
      }
    });

    // Llama a requestAnimationFrame fuera del bucle forEach
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

    switch (event.key.toLowerCase()) {
      case "s":
        webSocket.send(JSON.stringify({ key: "S" }));
        moveDirection = "top";
        break;
      case "d":
        webSocket.send(JSON.stringify({ key: "D" }));
        moveDirection = "left";
        break;
      case "a":
        webSocket.send(JSON.stringify({ key: "A" }));
        moveDirection = "right";
        break;
      case "w":
        webSocket.send(JSON.stringify({ key: "W" }));
        moveDirection = "bottom";
        break;
    }

    for (let i = 0; i < imgs.length; i++) {
      imgs[activeImg].style.transform = `rotate(${["left", "top", "right", "bottom"].indexOf(moveDirection) * 90}deg)`;
    }
  });

  webSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    const direction = message.key;

    switch (direction) {
      case "S":
        moveDirection = "top";
        break;
      case "W":
        moveDirection = "bottom";
        break;
      case "A":
        moveDirection = "right";
        break;
      case "D":
        moveDirection = "left";
        break;
    }

    for (let i = 0; i < imgs.length; i++) {
      imgs[activeImg].style.transform = `rotate(${["left", "bottom", "right", "top"].indexOf(moveDirection) * 90}deg)`;
    }
  };
};