-- Creem l extensio per xifrar les contrasenyes a la base de dades
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Crear taula Usuari
CREATE TABLE Usuari (
    Correu VARCHAR(50) PRIMARY KEY,
    Nom VARCHAR(25),
    Contrasenya VARCHAR(150),
    Victories INTEGER,
    Empats INTEGER,
    Estat VARCHAR(15),
    CONSTRAINT unique_nom UNIQUE (Nom)
);

-- Crear taula Partida
CREATE TABLE Partida (
    ID VARCHAR (100) PRIMARY KEY,
    Nom VARCHAR(25),
    DataInici TIMESTAMP,
    DataFinal TIMESTAMP,
    CorreuCreador VARCHAR(50),
    CorreuGuanyador VARCHAR(50),
    Estat VARCHAR(15),
    CONSTRAINT unique_ID UNIQUE (ID),
    FOREIGN KEY (CorreuCreador) REFERENCES Usuari (Correu),
    FOREIGN KEY (CorreuGuanyador) REFERENCES Usuari (Correu)
);

-- Crear taula Participant
CREATE TABLE Participant (
    CorreuUsuari VARCHAR(50),
    NomUsuari VARCHAR(25),
    IDPartida VARCHAR(100),
    FOREIGN KEY (CorreuUsuari) REFERENCES Usuari (Correu),
    FOREIGN KEY (NomUsuari) REFERENCES Usuari (Nom),
    FOREIGN KEY (IDPartida) REFERENCES Partida (ID),
    PRIMARY KEY (CorreuUsuari, IDPartida)
);

-- Crear taula Vaixell
CREATE TABLE Vaixell (
    CorreuUsuari VARCHAR(50),
    IDPartida VARCHAR(100),
    NumVaixell INTEGER,
    Municio INTEGER,
    Color VARCHAR(25),
    Estat VARCHAR(15),
    FOREIGN KEY (CorreuUsuari) REFERENCES Participant (CorreuUsuari),
    FOREIGN KEY (IDPartida) REFERENCES Participant (IDPartida),
    PRIMARY KEY (CorreuUsuari, IDPartida, NumVaixell)
);