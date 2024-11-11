-- Codigo banco de dados so para salvar mesmo pois não sei um lugar melhor

CREATE DATABASE Inquadra;
USE Inquadra;

CREATE TABLE Quadra (
    id_quadra INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    preco_hora DECIMAL(10, 2),
    fk_endereco INT,
    fk_administrador INT
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

CREATE TABLE Relacao (
    id_relacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_esporte INT,
    fk_quadra INT
);

CREATE TABLE Esporte (
    id_esporte INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    esporte VARCHAR(60)
);

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    email VARCHAR(255),
    senha VARCHAR(50)
);


CREATE TABLE Avaliacao (
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    qualificacao INT,
    data_avaliacao DATE,
    fk_quadra INT, 
    fk_usuario INT
);

CREATE TABLE Reserva (
    id_reserva INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    data_reserva DATE,
    horario_inicio TIME,
    horario_final TIME,
    estado BOOLEAN,
    fk_quadra INT, 
    fk_usuario INT
);

CREATE TABLE Pago (
    id_pago INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantia DECIMAL(10, 2),
    metodo VARCHAR(90),
    data_pago DATE,
    estado BOOLEAN,
    fk_reserva INT
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
    fk_usuario INT
);

-- Necessario Adicionar as chaves estrangeiras depois pois se eu não realisase isso imposibilitaria a criação das tabelas  -- 
ALTER TABLE Quadra
ADD CONSTRAINT FK_Quadra_Endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(fk_endereco),
ADD CONSTRAINT FK_Quadra_Administrador FOREIGN KEY (fk_administrador) REFERENCES Administrador(fk_administrador);

ALTER TABLE Relacao
ADD CONSTRAINT FK_Relacao_Esporte FOREIGN KEY (fk_esporte) REFERENCES Esporte(fk_esporte),
ADD CONSTRAINT FK_Relacao_Quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(fk_quadra);

ALTER TABLE Avaliacao
ADD CONSTRAINT FK_Avaliacao_Quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(fk_quadra),
ADD CONSTRAINT FK_Avaliacao_Usuario FOREIGN KEY (fk_usuario) REFERENCES Usuario(fk_usuario);

ALTER TABLE Reserva
ADD CONSTRAINT FK_Reserva_Quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(fk_quadra),
ADD CONSTRAINT FK_Reserva_Usuario FOREIGN KEY (fk_usuario) REFERENCES Usuario(fk_usuario);

ALTER TABLE Pago
ADD CONSTRAINT FK_Pago_Reserva FOREIGN KEY (fk_reserva) REFERENCES Reserva(fk_reserva);

ALTER TABLE Telefone
ADD CONSTRAINT FK_Telefone_Administrador FOREIGN KEY (fk_administrador) REFERENCES Administrador(fk_administrador),
ADD CONSTRAINT FK_Telefone_Usuario FOREIGN KEY (fk_usuario) REFERENCES Usuario(fk_usuario);


select * from Quadra;
select * from Avaliacao;
select * from  Usuario;
select * from Telefone;
select * from Administrador;
select * from Endereco;
select * from Relacao;
select * from Esporte;
select * from Reserva;
select * from Pago;





--Explicações
-- Chave Estrangeira id_usuario:
-- FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
-- Função: Esta chave estrangeira indica que a coluna id_usuario na tabela quadras faz referência à coluna id_usuario na tabela usuario.
-- Uso: Garante que qualquer valor inserido em quadras.id_usuario deve já existir em usuario.id_usuario. Isso significa que você não pode ter uma quadra associada a um usuário que não existe na tabela usuario.
-- Chave Estrangeira id_usuario_admin:
-- FOREIGN KEY (id_usuario_admin) REFERENCES usuario_admin(id_usuario_admin)
-- Função: Esta chave estrangeira indica que a coluna id_usuario_admin na tabela quadras faz referência à coluna id_usuario_admin na tabela usuario_admin.
-- Uso: Garante que qualquer valor inserido em quadras.id_usuario_admin deve já existir em usuario_admin.id_usuario_admin. Isso significa que você não pode ter uma quadra associada a um administrador que não existe na tabela usuario_admin.
-- Restrição UNIQUE
-- A restrição UNIQUE é usada para garantir que todos os valores em uma coluna (ou conjunto de colunas) sejam únicos em toda a tabela.
-- Colunas com UNIQUE:
-- cpf_usuario VARCHAR(14) UNIQUE,
-- email_usuario VARCHAR(255) UNIQUE,
-- cpf_admin VARCHAR(14) UNIQUE,
-- email_admin VARCHAR(255) UNIQUE
-- Função: Garante que os valores nas colunas cpf_usuario, email_usuario, cpf_admin e email_admin sejam únicos em suas respectivas tabelas.
-- Uso:
-- cpf_usuario e email_usuario em usuario: Cada CPF e email de usuário deve ser único, evitando duplicatas.
-- cpf_admin e email_admin em usuario_admin: Cada CPF e email de administrador deve ser único, evitando duplicatas.