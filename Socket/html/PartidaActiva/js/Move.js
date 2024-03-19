window.onload = function () {
  let vaixells = Array.from(document.getElementsByClassName("vaixells"));

  let speed = 1;
  let activeImg = 0;
  let degrees = new Array(vaixells.length).fill(0);
  let barrils = Array.from(document.getElementsByClassName("barrils"));
  
  const webSocket = new WebSocket("ws://172.23.1.129:3000");

  /**
   * Afegirem barrils en una posicio aleatoria de la pantalla
   * tenint en compte l'alcada i la meitat de l'amplada.
   * Per altra part, es fara un radi sempre des del punt central
   * de la pantalla.
   * D'aquesta manera, els barrils mai apareixeran en una posicio
   * on hi hagin vaixells.
   */
  var positions = [];

  function addBarrils() {
    const windowWidth = window.innerWidth * 0.5;
    const windowHeight = window.innerHeight * 0.9;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    var randomX;
    var randomY;

    for (let i = 0; i < 10; i++) {
      let barril = document.createElement("img");
      barril.src = "../../Images/PartidaActiva/barril.png";
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

    for (let i = 0; i < 10; i++) {
      let meteorit = document.createElement("img");
      meteorit.src = "../../Images/PartidaActiva/Meteorit.png";
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
    meteorits = Array.from(document.getElementsByClassName("Meteorit"));
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

    let municio = Array.from(document.getElementsByClassName("municio"));

    for (let meteorit of Meteorit) {
      let meteoritRect = meteorit.getBoundingClientRect();

      for (let municioItem of municio) {
        let municioRect = municioItem.getBoundingClientRect();
        if (
          municioRect.left < meteoritRect.right &&
          municioRect.right > meteoritRect.left &&
          municioRect.top < meteoritRect.bottom &&
          municioRect.bottom > meteoritRect.top
        ) {
          municioItem.parentNode.removeChild(municioItem);
        }
      }

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
  function checkTouchVaixell() {
    var vaixells = Array.from(document.getElementsByClassName("vaixells"));
    var municio = Array.from(document.getElementsByClassName("municio"));

    vaixells.forEach(function (vaixell, i) {
      municio.forEach(function (muni, j) {
        var vaixellRect = vaixell.getBoundingClientRect();
        var muniRect = muni.getBoundingClientRect();

        if (
          vaixellRect.x < muniRect.x + muniRect.width &&
          vaixellRect.x + vaixellRect.width > muniRect.x &&
          vaixellRect.y < muniRect.y + muniRect.height &&
          vaixellRect.y + vaixellRect.height > muniRect.y
        ) {
          // Si se tocan, eliminarlos del DOM y de los arrays
          vaixell.parentNode.removeChild(vaixell);
          muni.parentNode.removeChild(muni);
          vaixells.splice(i, 1);
          municio.splice(j, 1);
        }
      });
    });
  }
  function moveMeteorits() {
    const meteorits = Array.from(document.getElementsByClassName("Meteorit"));

    meteorits.forEach((meteorit) => {
      const meteoritWidth = meteorit.offsetWidth;
      const windowWidth = window.innerWidth;
      const meteoritWidthPercentage = (meteoritWidth / windowWidth) * 100;

      // Solo mover meteoritos con un ancho entre 2% y 3%
      if (meteoritWidthPercentage >= 2 && meteoritWidthPercentage <= 3) {
        const speed = 1;
        const currentLeft = meteorit.offsetLeft;

        let newLeft = currentLeft + speed;

        if (newLeft > windowWidth) {
          newLeft = -meteoritWidth;
        }

        meteorit.style.left = newLeft + "px";
      }
    });
  } setInterval(moveMeteorits, 100);

  const intervalBarrils = setInterval(checkTouchBarrils, 100);
  const intervalMeteorit = setInterval(checkTouchMeteorit, 100);
  const intervalVaixell = setInterval(checkTouchVaixell, 100);

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
  moveMeteorits();

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
        case "l":
    let municon = document.createElement("img");
    municon.src = "../../Images/PartidaActiva/Municio.jpg";
    municon.classList.add("municio");

    // Calculate the position of the vaixell in front of the activeImg
    let frontVaixellLeft =
      vaixells[activeImg].offsetLeft +
      vaixells[activeImg].offsetWidth *
        Math.cos(degrees[activeImg] * (Math.PI / 180));
    let frontVaixellTop =
      vaixells[activeImg].offsetTop +
      vaixells[activeImg].offsetHeight *
        Math.sin(degrees[activeImg] * (Math.PI / 180));

    // Add a constant value to move the municon further away on the diagonals
    const offset = 15; // Change this value to what you need
    frontVaixellLeft += offset * Math.cos(degrees[activeImg] * (Math.PI / 180));
    frontVaixellTop += offset * Math.sin(degrees[activeImg] * (Math.PI / 180));

    municon.style.left = frontVaixellLeft;
    municon.style.top = frontVaixellTop;
    document.body.appendChild(municon);
    let municioSpeed = speed * 5; // Doble de la velocidad del vaixell
    let municonDegrees = degrees[activeImg] * (Math.PI / 180);
    let municioLeft = frontVaixellLeft;
    let municioTop = frontVaixellTop;

    let municonInterval = setInterval(function () {
      municioLeft += municioSpeed * Math.cos(municonDegrees);
      municioTop += municioSpeed * Math.sin(municonDegrees);

      // Check if the municon is about to leave the screen
      if (municioLeft < 0) {
        municioLeft = window.innerWidth;
      } else if (municioLeft > window.innerWidth) {
        municioLeft = 0;
      }

      if (municioTop < 0) {
        municioTop = window.innerHeight;
      } else if (municioTop > window.innerHeight) {
        municioTop = 0;
      }

      municon.style.left = municioLeft + "px";
      municon.style.top = municioTop + "px";
    }, 1000 / 60); // Ajustar la velocidad de movimiento
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
