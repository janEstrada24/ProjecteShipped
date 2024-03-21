window.onload = function () {
  let vaixells = Array.from(document.getElementsByClassName("vaixells"));

  let speed = 1;
  let activeImg = 0;
  let degrees = new Array(vaixells.length).fill(0);
  let barrils = Array.from(document.getElementsByClassName("barrils"));
  let now;
  let idUsuari;
  let idsVaixells;
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

  const PostPosicioVaixell= async (x, y) => {
    const myBody = JSON.stringify({
        x: x,
        y: y
    });
    const response = await fetch('http://localhost:4000/posicionsVaixells/postPosicioVaixell', {
          method: 'POST',
          body: myBody,
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (!response.ok) {
          const errorMessage = await response.text();
          alert("Error: " + errorMessage);
      }
      else {
          const myJson = await response.json();

          webSocket.send(JSON.stringify({ key: "PosicioVaixell", x: x, y: y }));

          console.log("Response from server:");
          console.log(myJson);
      }
  }

  function addMeteorit() {
    const windowWidth = window.innerWidth * 0.5;
    const windowHeight = window.innerHeight * 0.9;

    for (let i = 0; i < 1; i++) {
      let meteorit = document.createElement("img");
      meteorit.src = "../../Images/PartidaActiva/Meteorit.png";
      meteorit.classList.add("Meteorit");
      meteorit.style.position = "absolute";

      randomWidth = 3;
      meteorit.style.left = windowWidth / 2 + "px";
      meteorit.style.top = windowHeight / 2 + "px";
      meteorit.style.width = `${randomWidth}%`;
      document.body.appendChild(meteorit);
    }
    meteorits = Array.from(document.getElementsByClassName("Meteorit"));
  }

  function checkTime() {
    now = new Date().getTime();

    if (last) {
        if (now - last > 500) {
            last = now;
        }
    }

    last = now;
  }

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
  addMeteorit();
  checkTime();

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
      );
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


  
  webSocket.send(JSON.stringify({ demanarIDUsuari: "demanarIDUsuari" }));
  webSocket.send(JSON.stringify({ demanarIDsVaixells: "demanarIDsVaixells" }));

  webSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);

    if (message.key) {
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
    }

    if (message.idUsuari) {
      idUsuari = message.idUsuari;
      console.log("ID usuari: " + idUsuari);
    }

    if (message.idsVaixells) {
      idsVaixells = message.idsVaixells;
      console.log("IDs vaixells: " + idsVaixells);
    }
  };
};
