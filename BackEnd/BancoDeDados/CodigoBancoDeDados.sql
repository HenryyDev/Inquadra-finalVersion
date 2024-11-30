-- Codigo banco de dados so para salvar mesmo pois não sei um lugar melhor
drop database inquadra;
CREATE DATABASE Inquadra;
USE Inquadra;

CREATE TABLE Quadra (
    id_quadra INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    preco_hora DECIMAL(10, 2),
    fk_endereco INT,
    fk_administrador INT
);
CREATE TABLE Imagem (
    id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    caminho VARCHAR(255) NOT NULL, 
    fk_quadra INT NOT NULL,       
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra) 
);


ALTER TABLE Quadra ADD COLUMN Descricao VARCHAR(2000); 

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
ALTER TABLE Telefone
MODIFY COLUMN numero_t VARCHAR(50);


-- Adicionando as chaves estrangeiras após a criação das tabelas
ALTER TABLE Quadra
ADD CONSTRAINT FK_Quadra_Endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(id_endereco),
ADD CONSTRAINT FK_Quadra_Administrador FOREIGN KEY (fk_administrador) REFERENCES Administrador(id_administrador);

ALTER TABLE Relacao
ADD CONSTRAINT FK_Relacao_Esporte FOREIGN KEY (fk_esporte) REFERENCES Esportes(id_esporte),
ADD CONSTRAINT FK_Relacao_Quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra);

ALTER TABLE Esportes ADD COLUMN fk_quadra INT;
ALTER TABLE Esportes ADD CONSTRAINT fk_quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra);

ALTER TABLE Avaliacao
ADD CONSTRAINT FK_Avaliacao_Quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra),
ADD CONSTRAINT FK_Avaliacao_Usuario FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE Reserva
ADD CONSTRAINT FK_Reserva_Quadra FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra),
ADD CONSTRAINT FK_Reserva_Usuario FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE Pago
ADD CONSTRAINT FK_Pago_Reserva FOREIGN KEY (fk_reserva) REFERENCES Reserva(id_reserva);

ALTER TABLE Telefone
ADD CONSTRAINT FK_Telefone_Administrador FOREIGN KEY (fk_administrador) REFERENCES Administrador(id_administrador),
ADD CONSTRAINT FK_Telefone_Usuario FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE Quadra CHANGE Descricao descricao varchar(2000);

ALTER TABLE Endereco CHANGE numero numero_e int;

ALTER TABLE Telefone CHANGE numero numero_t int;

-- teste query de melhores avaliações 
INSERT INTO Avaliacao (fk_quadra, qualificacao)
VALUES (1, 5);
-- consultar medias 
SELECT AVG(qualificacao) AS media_avaliacao
FROM Avaliacao
WHERE fk_quadra = 1;
-- Consultas para exibir os dados das tabelas
SELECT * FROM Quadra;
SELECT * FROM imagem;
SELECT * FROM Avaliacao;
SELECT * FROM Usuario; 
SELECT * FROM Telefone;
SELECT * FROM Administrador;
SELECT * FROM Endereco;
SELECT * FROM Relacao;
SELECT * FROM Esportes;
SELECT * FROM Reserva;
SELECT * FROM Pago;

SHOW CREATE TABLE Esportes;
-- Necessario Adicionar as chaves estrangeiras depois pois se eu não realisase isso imposibilitaria a criação das tabelas  -- 


truncate quadra;
-- desabilitar para limpar o bd 
SET foreign_key_checks = 0;

-- Reabilitar as verificações de chave estrangeira
SET foreign_key_checks = 1;

select * from Quadra;
select * from Avaliacao;
select * from  Usuario;
select * from Telefone;
select * from Administrador;
select * from Endereco;
select * from Relacao;
select * from Esportes;
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