const loginAction = async (correu, contrasenya) => {
    const userBody = JSON.stringify({
        correu: correu,
        contrasenya: contrasenya
    });

    const response = await fetch('http://localhost:4000/usuaris/login', {
        method: 'POST',
        body: userBody,
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
        console.log("Response from server:");
        console.log(myJson);
    }
}

function login() {
    const correu = document.getElementsByTagName("input")[0].value;
    const contrasenya = document.getElementsByTagName("input")[1].value;
    loginAction(correu, contrasenya);
}

window.onload = function start() {
    const boto = document.getElementsByTagName("button")[0];
    boto.addEventListener("click", login);
}