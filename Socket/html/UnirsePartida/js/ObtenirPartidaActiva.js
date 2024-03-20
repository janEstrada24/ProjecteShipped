const IP = "172.23.1.129";
const webSocket = new WebSocket("ws://" + IP + ":3000");
let numJugadors = 0;

function unirsePartida() {
  window.location.href = "http://" + IP + ":3000/PartidaActiva/partidaActiva.html";
  webSocket.send(JSON.stringify({ sumarJugador: "sumarJugador" }));
}

const GetPartida = async () => {
  const response = await fetch(
    "http://localhost:4000/partides/PartidesActives/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    alert("Error: " + errorMessage);
  } else {
    const myJson = await response.json();
    console.log("Response from server:");
    console.log(myJson);

    let table = document.createElement("table");

    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let thNom = document.createElement("th");
    thNom.textContent = "Nom Partida";
    headerRow.appendChild(thNom);

    let thDataInici = document.createElement("th");
    thDataInici.textContent = "Data Inici";
    headerRow.appendChild(thDataInici);
    let thCorreuCreador = document.createElement("th");
    thCorreuCreador.textContent = "Correu Creador";
    headerRow.appendChild(thCorreuCreador);
    let thButton = document.createElement("th");
    thButton.textContent = "Botons";
    headerRow.appendChild(thButton);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    myJson.forEach((obj) => {
      let row = document.createElement("tr");

      let tdNom = document.createElement("td");
      tdNom.textContent = obj.nom; 
      row.appendChild(tdNom);
      let tdDataInici = document.createElement("td");
      tdDataInici.textContent = obj.datainici;
      row.appendChild(tdDataInici);
      let tdCorreuCreador = document.createElement("td");
      tdCorreuCreador.textContent = obj.correucreador;
      row.appendChild(tdCorreuCreador);
      
      let tdButton = document.createElement("td");
      let button = document.createElement("button");
      button.textContent = "Unir-se";
      tdButton.appendChild(button);
      row.appendChild(tdButton);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    document.body.appendChild(table);
  }
};

window.onload = function start() {
  webSocket.send(JSON.stringify({ veureJugadors: "veureJugadors" }));

  webSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);

    if (message.numJugadors) { 
        numJugadors = message.numJugadors;
        console.log(typeof numJugadors);
        if (numJugadors >= 2) {
            window.location.href = "http://" + IP + ":3000/MenuPartida/menuPartida.html";
        }     
    }
  }

  GetPartida();

  let botons = document.getElementsByTagName("button");
  for (let i = 0; i < botons.length; i++) {
    botons[i].addEventListener("click", unirsePartida);
  }
};
