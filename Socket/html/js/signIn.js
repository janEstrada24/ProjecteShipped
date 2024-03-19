const IP = "192.168.43.92";

const loginAction = async (correu, contrasenya) => {
    const userBody = JSON.stringify({
        correu: correu,
        contrasenya: contrasenya
    });

    const response = await fetch(`http://${IP}:4000/usuaris/login`, {
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
        localStorage.setItem('correu', correu);
        window.location.href = "http://" + IP + ":3000/MenuPartida/menuPartida.html";
    }
}

function login() {
    const correu = document.getElementsByTagName("input")[0].value;
    const contrasenya = document.getElementsByTagName("input")[1].value;
    
    if (correu === "" || contrasenya === "") {
        alert("Error: És necessari omplir tots els camps!");
        return;
    } else {
        loginAction(correu, contrasenya);
    }
}

function navigateToSignUp() {
    window.location.href = "http://" + IP + ":3000/SignUp/signUp.html";
}

window.onload = function start() {
    const botoSignIn = document.getElementsByTagName("button")[0];
    const botoSignUp = document.getElementsByTagName("button")[1];
    botoSignIn.addEventListener("click", login);
    botoSignUp.addEventListener("click", navigateToSignUp);
}