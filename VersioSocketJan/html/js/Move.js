window.onload = function () {
    let imgs = Array.from(document.getElementsByClassName("imatge"));

    let speed = 1;
    let activeImg = 0;
    let degrees = new Array(imgs.length).fill(0);
    let barrils = 10;

    const webSocket = new WebSocket("ws://172.23.1.129:3000");
    
    function addBarrils() {
        for (let i = 0; i < barrils; i++) {
            let img = document.createElement("img");
            img.src = "/Images/barril.png";
            img.classList.add("barril");
            img.style.position = "absolute";
            img.style.left = Math.random() * window.innerWidth + "px";
            img.style.top = Math.random() * window.innerHeight + "px";
            document.body.appendChild(img);
        }
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
      });

      requestAnimationFrame(animate);
    }
  
    animate();
    addBarrils();

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