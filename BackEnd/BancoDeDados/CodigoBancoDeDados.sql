-- Codigo banco de dados so para salvar mesmo pois não sei um lugar melhor

create database Inquadra;
use Inquadra;

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nome_usuario VARCHAR(255) NOT NULL,
    CPF_usuario VARCHAR(14) NOT NULL UNIQUE,
    Email_usuario VARCHAR(255) NOT NULL UNIQUE,
    Senha_usuario VARCHAR(255) NOT NULL
);

-- Criação da tabela Usuario_Admin
CREATE TABLE Usuario_Admin (
    id_usuario_admin INT AUTO_INCREMENT PRIMARY KEY,
    Nome_admin VARCHAR(255) NOT NULL,
    CPF_admin VARCHAR(14) NOT NULL UNIQUE,
    email_admin VARCHAR(255) NOT NULL UNIQUE,
    Senha_admin VARCHAR(255) NOT NULL
);

-- Criação da tabela Quadras
CREATE TABLE Quadras (
    id_quadra INT AUTO_INCREMENT PRIMARY KEY,
    Titulo_Anuncio_Quadra VARCHAR(255) NOT NULL,
    Descricao_Quadra TEXT,
    Preco_Quadra DECIMAL(10, 2) NOT NULL,
    Endereco_Quadra VARCHAR(255) NOT NULL,
    Cep_Quadra VARCHAR(10) NOT NULL,
    Numero_Quadra INT NOT NULL,
    id_usuario INT,
    id_usuario_admin INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_usuario_admin) REFERENCES Usuario_Admin(id_usuario_admin)
);



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