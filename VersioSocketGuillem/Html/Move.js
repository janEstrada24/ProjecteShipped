window.onload = function () {
  let imgs = Array.from(document.getElementsByClassName("Jugador1"));
  let Meteorit = Array.from(document.getElementsByClassName("Meteorit"));

  let speed = 1;
  let activeImg = 0;
  let degrees = new Array(imgs.length).fill(0);
  const webSocket = new WebSocket("ws://172.23.2.211:3000");

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
       // Verificar la colisión con cada meteorito
    let hasCollided = Meteorit.some(meteor => {
      let meteorLeft = meteor.offsetLeft;
      let meteorTop = meteor.offsetTop;
      let meteorWidth = meteor.offsetWidth;
      let meteorHeight = meteor.offsetHeight;

      return currentLeft < meteorLeft + meteorWidth &&
             currentLeft + imgWidth > meteorLeft &&
             currentTop < meteorTop + meteorHeight &&
             currentTop + imgHeight > meteorTop;
    });
    Meteorit.forEach((meteorit) => {
      meteorit.updated = false;
      
    });
  
    if (hasCollided) {
      img.style.display = 'none'; // Ocultar la imagen
      return false; // Eliminar la imagen de la lista
    }

    return true; // Mantener la imagen en la lista
  });
   
    
    

    requestAnimationFrame(animate);
  }
  update();
  animate();
  function update() {
  
      Meteorit.forEach((meteorit) => {
        if (!meteorit.updated) {
          let randomLeft = Math.random() * window.innerWidth;
          let randomTop = Math.random() * window.innerHeight;
          let randomWidth = 2 + Math.random() * 2; // genera un número aleatorio entre 2 y 4
    
          meteorit.style.left = `${randomLeft}px`;
          meteorit.style.top = `${randomTop}px`;
          meteorit.style.width = `${randomWidth}%`; // establece el ancho del meteorito
    
          meteorit.updated = true;
        }
      });
    }

  window.addEventListener("keydown", function (event) {
    if (event.key >= "1" && event.key <= "5") {
      activeImg = parseInt(event.key) - 1;
      if (activeImg >= imgs.length) {
        activeImg = imgs.length - 1;
      }
      webSocket.send(JSON.stringify({ key: "Number", value: event.key, activeImg: activeImg })); // Enviar el número presionado y activeImg al socket
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
