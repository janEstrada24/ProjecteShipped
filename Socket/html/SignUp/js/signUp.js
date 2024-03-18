const registerAction = async (correu, nom, contrasenya) => {
    const userBody = JSON.stringify({
        correu: correu,
        nom: nom,
        contrasenya: contrasenya
    });

    const response = await fetch('http://localhost:4000/usuaris/registre', {
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

function register() {
    const correu = document.getElementsByTagName("input")[0].value;
    const nom = document.getElementsByTagName("input")[1].value;
    const contrasenya = document.getElementsByTagName("input")[2].value;
    registerAction(correu, nom, contrasenya);
}

function navigateToSignIn() {
    window.location.href = "http://172.23.1.129:3000";
}

window.onload = function start() {
    console.log(process.env.PORT);
    const botoSignIn = document.getElementsByTagName("button")[0];
    const botoSignUp = document.getElementsByTagName("button")[1];
    botoSignIn.addEventListener("click", navigateToSignIn);
    botoSignUp.addEventListener("click", register);
}