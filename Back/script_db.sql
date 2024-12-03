CREATE DATABASE Inquadra;
USE Inquadra;

CREATE TABLE Esportes (
    id_esporte INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    basquete BOOLEAN DEFAULT false,
    futebol BOOLEAN DEFAULT false,
    outros BOOLEAN DEFAULT false,
    golfe BOOLEAN DEFAULT false,
    natacao BOOLEAN DEFAULT false,
    volei BOOLEAN DEFAULT false,
    tenis BOOLEAN DEFAULT false,
    pong BOOLEAN DEFAULT false,
    skate BOOLEAN DEFAULT false,
    futsal BOOLEAN DEFAULT false
);

CREATE TABLE Endereco (
    id_endereco INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cep VARCHAR(20),
    uf CHAR(2),
    municipio VARCHAR(100),
    bairro VARCHAR(100),
    logradouro VARCHAR(200),
    numero INT
);

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    email VARCHAR(255),
    senha VARCHAR(50)
);

CREATE TABLE Administrador (
    id_administrador INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    email VARCHAR(255),
    senha VARCHAR(100)
);

CREATE TABLE Telefone (
    id_telefone INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ddd INT,
    numero VARCHAR(50),
    fk_administrador INT,
    fk_usuario INT,
    FOREIGN KEY (fk_administrador) REFERENCES Administrador(id_administrador),
    FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Quadra (
    id_quadra INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    preco_hora DECIMAL(10, 2),
    fk_endereco INT,
    fk_administrador INT,
    descricao VARCHAR(2000),
    FOREIGN KEY (fk_endereco) REFERENCES Endereco(id_endereco),
    FOREIGN KEY (fk_administrador) REFERENCES Administrador(id_administrador)
);

CREATE TABLE Imagem (
    id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    caminho VARCHAR(255) NOT NULL,
    fk_quadra INT NOT NULL,
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra)
);

CREATE TABLE Relacao (
    id_relacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_esporte INT,
    fk_quadra INT,
    FOREIGN KEY (fk_esporte) REFERENCES Esportes(id_esporte),
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra)
);

CREATE TABLE Avaliacao (
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    qualificacao INT,
    data_avaliacao DATE,
    fk_quadra INT,
    fk_usuario INT,
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra),
    FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Reserva (
    id_reserva INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    data_reserva DATE,
    horario_inicio TIME,
    horario_final TIME,
    estado BOOLEAN,
    fk_quadra INT,
    fk_usuario INT,
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra),
    FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Pago (
    id_pago INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantia DECIMAL(10, 2),
    metodo VARCHAR(90),
    data_pago DATE,
    estado BOOLEAN,
    fk_reserva INT,
    FOREIGN KEY (fk_reserva) REFERENCES Reserva(id_reserva)
);
