function addVaixells(vaixells) {
    let lastTop = 0;
    let y;
    for (let i = 0; i < vaixells.length; i++) {
        let vaixell = document.createElement("img");
        if (i == 0) {
            vaixell.src = "../../Images/PartidaActiva/VaixellBlau.png";
        } else {
            vaixell.src = "../../Images/PartidaActiva/VaixellBlanc.png";
        }
        
        vaixell.classList.add("vaixells");
        vaixell.style.position = "absolute";
        vaixell.alt = "Vaixell";

        y = vaixells[i].y + lastTop;
        vaixell.style.left = vaixells[i].x + "px";
        vaixell.style.top = y + "px";
        lastTop += 20;
        document.body.appendChild(vaixell);
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
}