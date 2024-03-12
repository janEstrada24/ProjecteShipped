window.onload = function () {
  let imgs = Array.from(document.getElementsByClassName("Jugador1"));
  


  let speed = 1;
  let activeImg = 0;
  let degrees = new Array(imgs.length).fill(0);
  const webSocket = new WebSocket("ws://172.23.2.211:3000");
  function createMeteorit() {
    const windowWidth = window.innerWidth * 0.5;
    const windowHeight = window.innerHeight * 0.9;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    var randomX;
    var randomY;
    for (let i = 0; i < 10; i++) {
      
      let meteorit = document.createElement("img");
      meteorit.src = "/Images/Meteorit.png";
      meteorit.classList.add("Meteorit");
      meteorit.style.position = "absolute";

      randomX = centerX - windowWidth / 2 + Math.random() * windowWidth;
      randomY = centerY - windowHeight / 2 + Math.random() * windowHeight;
      randomWidth = 2 + Math.random() * 2;
      meteorit.style.left = randomX + "px";
      meteorit.style.top = randomY + "px";
      meteorit.style.width = `${randomWidth}%`;
      document.body.appendChild(meteorit);
    }
    
    Meteorit = Array.from(document.getElementsByClassName("Meteorit"));
  }
  function animate() {
    imgs.forEach((img, index) => {
      let imgWidth = img.offsetWidth;
      let imgHeight = img.offsetHeight;
      let currentLeft = img.offsetLeft;
      let currentTop = img.offsetTop;

      let radian = degrees[index] * (Math.PI / 180);
      currentLeft += speed * Math.cos(radian);
      currentTop += speed * Math.sin(radian);

      if (currentLeft > window.innerWidth) {
        currentLeft = -imgWidth;
      } else if (currentLeft < -imgWidth) {
        currentLeft = window.innerWidth;
      }

      if (currentTop > window.innerHeight) {
        currentTop = -imgHeight;
      } else if (currentTop < -imgHeight) {
        currentTop = window.innerHeight;
      }

      img.style.left = currentLeft + "px";
      img.style.top = currentTop + "px";
      // Check for collision with any meteor
      for (let meteorit of Meteorit) {
        let meteoritRect = meteorit.getBoundingClientRect();
        let imgRect = img.getBoundingClientRect();

        if (
          imgRect.left < meteoritRect.right &&
          imgRect.right > meteoritRect.left &&
          imgRect.top < meteoritRect.bottom &&
          imgRect.bottom > meteoritRect.top
        ) {
          // Collision detected, remove the image
          img.parentNode.removeChild(img);
          return false;
        }
      }

      return true;
    });

    // Make sure activeImg is not referring to a removed image
    if (activeImg >= imgs.length) {
      activeImg = imgs.length - 1;
    }

    requestAnimationFrame(animate);
  }
  createMeteorit();
  animate();

  window.addEventListener("keydown", function (event) {
    if (event.key >= "1" && event.key <= "5") {
      activeImg = parseInt(event.key) - 1;
      if (activeImg >= imgs.length) {
        activeImg = imgs.length - 1;
      }
      webSocket.send(
        JSON.stringify({
          key: "Number",
          value: event.key,
          activeImg: activeImg,
        })
      ); // Enviar el número presionado y activeImg al socket
    }

    switch (event.key.toLowerCase()) {
      case "a":
        webSocket.send(JSON.stringify({ key: "A" }));
        degrees[activeImg] -= 5;
        break;
      case "d":
        webSocket.send(JSON.stringify({ key: "D" }));
        degrees[activeImg] += 5;
        break;
    }

    imgs[activeImg].style.transform = `rotate(${degrees[activeImg]}deg)`;
  });

  webSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    const key = message.key;

    switch (key) {
      case "A":
        degrees[activeImg] -= 5;
        break;
      case "D":
        degrees[activeImg] += 5;
        break;
      case "Number":
        activeImg = message.activeImg;
        break;
    }

    imgs[activeImg].style.transform = `rotate(${degrees[activeImg]}deg)`;
  };
};
