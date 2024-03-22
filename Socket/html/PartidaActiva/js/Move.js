window.onload = function () {
  const IP = "172.23.1.129";
  let now;
  let last;
  let idUsuari;
  let arrayVaixells = [];
  const webSocket = new WebSocket("ws://" + IP + ":3000");

  let vaixells = [];
  let degrees = [];
  let barrils = Array.from(document.getElementsByClassName("barrils"));
  let speed = 1;
  let activeImg = 0;

  /**
   * Afegirem barrils en una posicio aleatoria de la pantalla
   * tenint en compte l'alcada i la meitat de l'amplada.
   * Per altra part, es fara un radi sempre des del punt central
   * de la pantalla.
   * D'aquesta manera, els barrils mai apareixeran en una posicio
   * on hi hagin vaixells.
   */
  var positions = [];

  const PostPosicioVaixell= async (idVaixell, idUsuari, x, y) => {
    console.log("PostPosicioVaixell");
    const myBody = JSON.stringify({
        idvaixell: idVaixell,
        idusuari: idUsuari,
        x: x,
        y: y
    });
    const response = await fetch('http://' + IP + ':4000/posicionsVaixells/postPosicioVaixell', {
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

  function checkTime() {
    now = new Date().getTime();

    if (last) {
        if (now - last >= 1) {
            for (let i = 0; i < vaixells.length; i++) {
              PostPosicioVaixell(arrayVaixells[i].idVaixell, idUsuari, vaixells[i].offsetLeft, vaixells[i].offsetTop);
            }
            last = now;
        }
    }

    last = now;
    requestAnimationFrame(checkTime);
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
    }, 1000 / 60);
    break;
    }

    vaixells[activeImg].style.transform = `rotate(${degrees[activeImg]}deg)`;
  });

  webSocket.onopen = function (event) {
    console.log("Connection established");
    webSocket.send(JSON.stringify({ demanarIDUsuari: "demanarIDUsuari" }));
    webSocket.send(JSON.stringify({ demanarVaixells: "demanarVaixells" }));
  }

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

    if (message.idusuari) {
      idUsuari = message.idusuari;
    }

    if (message.vaixells) {
      arrayVaixells = message.vaixells;
      addVaixells(arrayVaixells);
      vaixells = Array.from(document.getElementsByClassName("vaixells"));
      degrees = new Array(vaixells.length).fill(0);
      animate();
    }
  };
};
