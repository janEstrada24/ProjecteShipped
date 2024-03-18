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

    // Crear tabla
    let table = document.createElement("table");

    // Crear encabezado de tabla
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let thNom = document.createElement("th");
    thNom.textContent = "Nom Partida";
    headerRow.appendChild(thNom);

    // Crear encabezado para botones
    let thButton = document.createElement("th");
    thButton.textContent = "Botons";
    headerRow.appendChild(thButton);
    let thDataInici = document.createElement("th");
    thDataInici.textContent = "Data Inici";
    headerRow.appendChild(thDataInici);
    let thCorreuCreador = document.createElement("th");
    thCorreuCreador.textContent = "Correu Creador";
    headerRow.appendChild(thCorreuCreador);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de tabla
    let tbody = document.createElement("tbody");
    myJson.forEach((obj) => {
      let row = document.createElement("tr");

      // Crear columna de nombres
      let tdNom = document.createElement("td");
      tdNom.textContent = obj.nom; // Asegúrate de que 'nom' es la propiedad correcta en tu objeto
      row.appendChild(tdNom);
      let tdDataInici = document.createElement("td");
      tdDataInici.textContent = obj.datainici;
      row.appendChild(tdDataInici);
      let tdCorreuCreador = document.createElement("td");
      tdCorreuCreador.textContent = obj.correucreador;
      row.appendChild(tdCorreuCreador);
      
      // Crear columna de botones
      let tdButton = document.createElement("td");
      let button = document.createElement("button");
      button.textContent = "Botón";
      tdButton.appendChild(button);
      row.appendChild(tdButton);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Añadir tabla al cuerpo del documento
    document.body.appendChild(table);
  }
};
window.onload = function start() {
  GetPartida();
};
