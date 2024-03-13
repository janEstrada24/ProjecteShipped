window.onload = function () {
  let vaixells = Array.from(document.getElementsByClassName("vaixells"));

  let speed = 1;
  let activeImg = 0;
  let degrees = new Array(vaixells.length).fill(0);
  let barrils = Array.from(document.getElementsByClassName("barrils"));

  let quantityBarrils = 10;

  const webSocket = new WebSocket("ws:/172.23.2.211:3000");

  /**
   * Afegirem barrils en una posicio aleatoria de la pantalla
   * tenint en compte l'alcada i la meitat de l'amplada.
   * Per altra part, es fara un radi sempre des del punt central
   * de la pantalla.
   * D'aquesta manera, els barrils mai apareixeran en una posicio
   * on hi hagin vaixells.
   */
  function addBarrils() {
    const windowWidth = window.innerWidth * 0.5;
    const windowHeight = window.innerHeight * 0.9;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    var randomX;
    var randomY;
    var positions = [];

    for (let i = 0; i < 10; i++) {
      let barril = document.createElement("img");
      barril.src = "/Images/barril.png";
      barril.classList.add("barrils");
      barril.style.position = "absolute";

      while (true) {
        randomX = centerX - windowWidth / 2 + Math.random() * windowWidth;
        randomY = centerY - windowHeight / 2 + Math.random() * windowHeight;

        if (
          positions.every(
            (pos) => Math.hypot(pos.x - randomX, pos.y - randomY) >= 100
          )
        ) {
          break;
        }
      }

      positions.push({ x: randomX, y: randomY });

      barril.style.left = randomX + "px";
      barril.style.top = randomY + "px";
      document.body.appendChild(barril);
    }
    barrils = Array.from(document.getElementsByClassName("barrils"));
  }
  function addMeteorit() {
    const windowWidth = window.innerWidth * 0.5;
    const windowHeight = window.innerHeight * 0.9;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    var randomX;
    var randomY;
    var positions = [];

    for (let i = 0; i < 10; i++) {
      let meteorit = document.createElement("img");
      meteorit.src = "/Images/Meteorit.png";
      meteorit.classList.add("Meteorit");
      meteorit.style.position = "absolute";

      while (true) {
        randomX = centerX - windowWidth / 2 + Math.random() * windowWidth;
        randomY = centerY - windowHeight / 2 + Math.random() * windowHeight;

        if (
          positions.every(
            (pos) => Math.hypot(pos.x - randomX, pos.y - randomY) >= 100
          )
        ) {
          break;
        }
      }

      positions.push({ x: randomX, y: randomY });

      randomWidth = 2 + Math.random() * 2;
      meteorit.style.left = randomX + "px";
      meteorit.style.top = randomY + "px";
      meteorit.style.width = `${randomWidth}%`;
      document.body.appendChild(meteorit);
    }

    Meteorit = Array.from(document.getElementsByClassName("Meteorit"));
  }

  function checkTouchBarrils() {
    console.log("Check touch barrils");
    vaixells = Array.from(document.getElementsByClassName("vaixells"));
    barrils = Array.from(document.getElementsByClassName("barrils"));

    let vaixellRect;
    let barrilRect;

    for (let vaixell of vaixells) {
      vaixellRect = vaixell.getBoundingClientRect();

      for (let barril of barrils) {
        barrilRect = barril.getBoundingClientRect();

        if (
          vaixellRect.x < barrilRect.x + barrilRect.width &&
          vaixellRect.x + vaixellRect.width > barrilRect.x &&
          vaixellRect.y < barrilRect.y + barrilRect.height &&
          vaixellRect.y + vaixellRect.height > barrilRect.y
        ) {
          barril.remove();
          barrils.splice(barrils.indexOf(barril), 1);
          console.log("Barril eliminat");
        }
      }
    }
  }
  function checkTouchMeteorit() {
    console.log("Check touch meteorit");
    vaixells = Array.from(document.getElementsByClassName("vaixells"));
    Meteorit = Array.from(document.getElementsByClassName("Meteorit"));
    for (let meteorit of Meteorit) {
      let meteoritRect = meteorit.getBoundingClientRect();

      for (let vaixell of vaixells) {
        let vaixellRect = vaixell.getBoundingClientRect();

        if (
          vaixellRect.left < meteoritRect.right &&
          vaixellRect.right > meteoritRect.left &&
          vaixellRect.top < meteoritRect.bottom &&
          vaixellRect.bottom > meteoritRect.top
        ) {
          // Collision detected, remove the vaixell
          vaixell.parentNode.removeChild(vaixell);
          return false;
        }
      }
    }

    return true;
  }

  const intervalBarrils = setInterval(checkTouchBarrils, 100);
  const intervalMeteorit = setInterval(checkTouchMeteorit, 100);
  function animate() {
    vaixells.forEach((vaixell, index) => {
      let vaixellWidth = vaixell.offsetWidth;
      let vaixellHeight = vaixell.offsetHeight;
      let currentLeft = vaixell.offsetLeft;
      let currentTop = vaixell.offsetTop;

      let radian = degrees[index] * (Math.PI / 180);
      currentLeft += speed * Math.cos(radian);
      currentTop += speed * Math.sin(radian);

      if (currentLeft > window.innerWidth) {
        currentLeft = -vaixellWidth;
      } else if (currentLeft < -vaixellWidth) {
        currentLeft = window.innerWidth;
      }

      if (currentTop > window.innerHeight) {
        currentTop = -vaixellHeight;
      } else if (currentTop < -vaixellHeight) {
        currentTop = window.innerHeight;
      }

      vaixell.style.left = currentLeft + "px";
      vaixell.style.top = currentTop + "px";
    });

    requestAnimationFrame(animate);
  }

  animate();
  addBarrils();
  addMeteorit();

  window.addEventListener("keydown", function (event) {
    if (event.key >= "1" && event.key <= "5") {
      activeImg = parseInt(event.key) - 1;
      if (activeImg >= vaixells.length) {
        activeImg = vaixells.length - 1;
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

    vaixells[activeImg].style.transform = `rotate(${degrees[activeImg]}deg)`;
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

    vaixells[activeImg].style.transform = `rotate(${degrees[activeImg]}deg)`;
  };
};
