-- Codigo banco de dados so para salvar mesmo pois não sei um lugar melhor
drop database inquadra;
-- Criando a base de dados e utilizando
CREATE DATABASE  Inquadra;
USE Inquadra;
drop database Inquadra;
-- Criando a tabela de Esportes primeiro, pois será referenciada na tabela Relacao
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

-- Criando a tabela Endereco
CREATE TABLE Endereco (
    id_endereco INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cep VARCHAR(20),
    uf CHAR(2),
    municipio VARCHAR(100),
    bairro VARCHAR(100),
    logradouro VARCHAR(200),
    numero_e INT
);

-- Criando a tabela Quadra
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

-- Criando a tabela Imagem
CREATE TABLE Imagem (
    id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    caminho VARCHAR(255) NOT NULL, 
    fk_quadra INT NOT NULL,       
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra)
);

-- Criando a tabela Administrador
CREATE TABLE Administrador (
    id_administrador INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    email VARCHAR(255),
    senha VARCHAR(100)
);

-- Criando a tabela Relacao
CREATE TABLE Relacao (
    id_relacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_esporte INT,
    fk_quadra INT,
    FOREIGN KEY (fk_esporte) REFERENCES Esportes(id_esporte),
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra)
);

-- Criando a tabela Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(90),
    email VARCHAR(255),
    senha VARCHAR(50)
);

-- Criando a tabela Avaliacao
CREATE TABLE Avaliacao (
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    qualificacao INT,
    data_avaliacao DATE,
    fk_quadra INT, 
    fk_usuario INT,
    FOREIGN KEY (fk_quadra) REFERENCES Quadra(id_quadra),
    FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario)
);

-- Criando a tabela Reserva
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

-- Criando a tabela Pago
CREATE TABLE Pago (
    id_pago INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantia DECIMAL(10, 2),
    metodo VARCHAR(90),
    data_pago DATE,
    estado BOOLEAN,
    fk_reserva INT,
    FOREIGN KEY (fk_reserva) REFERENCES Reserva(id_reserva)
);

-- Criando a tabela Telefone
CREATE TABLE Telefone (
    id_telefone INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ddd INT,
    numero VARCHAR(50),
    fk_administrador INT,
    fk_usuario INT,
    FOREIGN KEY (fk_administrador) REFERENCES Administrador(id_administrador),
    FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario)
);

-- Corrigindo o tipo da coluna 'numero' da tabela Telefone
ALTER TABLE Telefone MODIFY COLUMN numero VARCHAR(50);

-- Testando a inserção de dados na tabela Avaliacao
INSERT INTO Avaliacao (fk_quadra, qualificacao, data_avaliacao, fk_usuario)
VALUES (1, 5, '2024-11-26', 1);

-- Consultando as médias de avaliações
SELECT AVG(qualificacao) AS media_avaliacao
FROM Avaliacao
WHERE fk_quadra = 1;

-- Consultas para exibir os dados das tabelas
SELECT * FROM Quadra;
SELECT * FROM Imagem;
SELECT * FROM Avaliacao;
SELECT * FROM Usuario;
SELECT * FROM Telefone;
SELECT * FROM Administrador;
SELECT * FROM Endereco;
SELECT * FROM Relacao;
SELECT * FROM Esportes;
SELECT * FROM Reserva;
SELECT * FROM Pago;

-- Visualizando a estrutura da tabela Esportes
SHOW CREATE TABLE Esportes;


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