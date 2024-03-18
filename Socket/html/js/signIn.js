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

function navigateToSignUp() {
    window.location.href = "http://172.23.1.129:3000/SignUp/signUp.html";
}

window.onload = function start() {
    const botoSignIn = document.getElementsByTagName("button")[0];
    const botoSignUp = document.getElementsByTagName("button")[1];
    botoSignIn.addEventListener("click", login);
    botoSignUp.addEventListener("click", navigateToSignUp);
}