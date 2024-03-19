class Temporitzador {
    constructor() {
        this.tiempo = 0;
        this.interval = null;
    }

    iniciar() {
        this.interval = setInterval(() => {
            this.tiempo++;
            this.mostrarTemps();
        }, 1000);
    }

    parar() {
        clearInterval(this.interval);
    }

    mostrarTemps() {
        let minuts = Math.floor(this.tiempo / 60);
        let segons = this.tiempo % 60;
        document.getElementById('temps').innerHTML = minuts + ':' + segons;
    }
}