const IP = "172.23.1.129";

const registerAction = async (correu, nom, contrasenya) => {
    const userBody = JSON.stringify({
        correu: correu,
        nom: nom,
        contrasenya: contrasenya
    });

    const response = await fetch(`http://${IP}:4000/usuaris/registre`, {
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
        window.location.href = "http://" + IP + ":3000";
    }
}

function register() {
    const correu = document.getElementsByTagName("input")[0].value;
    const nom = document.getElementsByTagName("input")[1].value;
    const contrasenya = document.getElementsByTagName("input")[2].value;

    if (correu === "" || nom === "" || contrasenya === "") {
        alert("Error: És necessari omplir tots els camps!");
        return;
    } else {
        registerAction(correu, nom, contrasenya);
    }
}

function navigateToSignIn() {
    window.location.href = "http://" + IP + ":3000";
}

window.onload = function start() {
    const botoSignIn = document.getElementsByTagName("button")[0];
    const botoSignUp = document.getElementsByTagName("button")[1];
    botoSignIn.addEventListener("click", navigateToSignIn);
    botoSignUp.addEventListener("click", register);
}