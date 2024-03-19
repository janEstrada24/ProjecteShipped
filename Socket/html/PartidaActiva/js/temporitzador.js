class Temporitzador {
    constructor() {
        this.temps = 300;
        this.interval = null;
    }

    iniciar() {
        this.interval = setInterval(() => {
            this.temps--;
            this.mostrarTemps();
        }, 1000);
    }

    parar() {
        clearInterval(this.interval);
    }

    mostrarTemps() {
        let minuts = Math.floor(this.temps / 60);
        let segons = this.temps % 60;

        if (segons < 10) {
            segons = '0' + segons;
        }
        document.getElementById('temps').innerHTML = minuts + ':' + segons;
    }
}