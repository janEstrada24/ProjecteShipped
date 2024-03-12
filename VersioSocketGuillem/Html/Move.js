window.onload = function () {
  let imgs = Array.from(document.getElementsByClassName("Jugador1"));

  let speed = 1;
  let activeImg = 0;
  let degree = 0;
  const webSocket = new WebSocket("ws://172.23.2.211:3000");

  function animate() {
    imgs.forEach((img, index) => {
      let imgWidth = img.offsetWidth;
      let imgHeight = img.offsetHeight;
      let currentLeft = img.offsetLeft;
      let currentTop = img.offsetTop;

      if (index === activeImg) {
        let radian = degree * (Math.PI / 180);
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
      }
    });

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
      case "a":
        webSocket.send(JSON.stringify({ key: "A" }));
        degree -= 5;
        break;
      case "d":
        webSocket.send(JSON.stringify({ key: "D" }));
        degree += 5;
        break;
    }

    imgs[activeImg].style.transform = `rotate(${degree}deg)`;
  });

  webSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    const key = message.key;

    switch (key) {
      case "A":
        degree -= 5;
        break;
      case "D":
        degree += 5;
        break;
    }

    imgs[activeImg].style.transform = `rotate(${degree}deg)`;
  };
};