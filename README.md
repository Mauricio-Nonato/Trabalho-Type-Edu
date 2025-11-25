:

🍕 Trabalho-Type-Edu: API de Pedidos de Pizzaria
📝 Descrição do Projeto

O Trabalho-Type-Edu é uma API RESTful desenvolvida para simular o sistema de gerenciamento de pedidos de uma pizzaria.
A aplicação lida com:

Autenticação de clientes e proprietários

Cadastro e gerenciamento de produtos (cardápio)

Controle completo do ciclo de vida de um pedido, desde a criação até a conclusão

O projeto foi desenvolvido como [Mencione a finalidade: Trabalho Acadêmico, Projeto Pessoal, etc.], utilizando as tecnologias Node.js, TypeScript e Express.

✨ Funcionalidades da API
🔐 Autenticação e Usuários

Cadastro e Login

Atualização de dados

Perfis: Cliente e Proprietário (Admin)

🍕 Cardápio (Produtos)

CRUD de produtos (somente Proprietários)

Listagem de produtos para Clientes

📦 Pedidos

Criação de pedido

Consulta

Atualização de status (Aberto → Em Preparo → Concluído)

🛠 Tecnologias Utilizadas
Categoria	Tecnologia	Uso / Dependência
Linguagem	TypeScript	Tipagem estática e segurança
Runtime	Node.js	Ambiente de execução
Framework Web	Express	Criação de rotas e controle HTTP
Banco de Dados	SQL Server	Persistência via mssql
Autenticação	JWT (jsonwebtoken)	Tokens de sessão
Segurança	Bcrypt	Hash de senhas
Configuração	Dotenv	Variáveis de ambiente
Desenvolvimento	ts-node-dev	Reload automático
📂 Estrutura do Projeto
pizzaria-backend/
├── src/
│   ├── config/
│   │   └── db.ts                 # Conexão com o banco
│   ├── models/
│   │   ├── Clientes.ts
│   │   └── ...                   # Pedido, Produtos, Proprietario etc.
│   ├── routes/
│   │   ├── clientesRoutes.ts
│   │   ├── loginRoutes.ts
│   │   └── ...                   # Rotas adicionais
│   └── server.ts                 # Entry point da API
├── .env                          # Variáveis de ambiente
├── package.json
└── tsconfig.json

🚀 Como Executar o Projeto
✔ Pré-requisitos

Node.js 18+

SQL Server instalado e rodando

Git

📥 Instalação e Setup
1. Clone o repositório
git clone https://github.com/Mauricio-Nonato/Trabalho-Type-Edu.git
cd Trabalho-Type-Edu

2. Instale as dependências
npm install
npm i -D typescript ts-node @types/node
npm install mssql


Opcional para desenvolvimento: extensão Live Server

▶ Rodando o projeto

Entre na pasta principal do backend:

cd pizzaria-backend


Crie o administrador:

npx ts-node .\src\criarAdmin.ts


Inicie o servidor:

npx ts-node .\src\server.ts


Rode o front executando index.html com o Live Server.

🔧 Variáveis de Ambiente (.env)
DB_HOST=localhost
DB_USER=seu_usuario_sql
DB_PASSWORD=sua_senha_sql
DB_NAME=pizzaria
PORT=3000
SECRET_KEY=suaChaveSecretaParaJWT

💾 Schema do Banco de Dados (SQL Server)
CREATE DATABASE [pizzaria];
GO

USE [pizzaria];
GO

-- =============================================
-- CRIAÇÃO DAS TABELAS
-- =============================================

CREATE TABLE Clientes (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    celular VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    cep VARCHAR(10),
    rua VARCHAR(150),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf VARCHAR(2)
);

CREATE TABLE Proprietarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE Produtos (
    cod_produto INT PRIMARY KEY IDENTITY(1,1),
    tipo_produto VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(MAX),
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(MAX),
    ativo BIT DEFAULT 1,
    tem_grande BIT DEFAULT 1,
    tem_broto BIT DEFAULT 0,
    preco_broto DECIMAL(10, 2) DEFAULT 0
);

CREATE TABLE Pedidos (
    cod_pedido INT PRIMARY KEY IDENTITY(1,1),
    username_cliente VARCHAR(50) NOT NULL,
    data_pedido DATETIME DEFAULT GETDATE(),
    status VARCHAR(50) DEFAULT 'Aberto',
    forma_pagamento VARCHAR(50),
    tipo_entrega VARCHAR(50),
    endereco_entrega VARCHAR(255),
    observacao VARCHAR(255),
    preco_total DECIMAL(10, 2)
);

CREATE TABLE ItensPedidos (
    cod_item INT PRIMARY KEY IDENTITY(1,1),
    cod_pedido INT NOT NULL,
    cod_produto INT NOT NULL,
    nome_produto VARCHAR(100),
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2),
    tamanho_selecionado VARCHAR(50),
    observacao_item VARCHAR(255),

    CONSTRAINT FK_Itens_Pedidos FOREIGN KEY (cod_pedido) REFERENCES Pedidos(cod_pedido),
    CONSTRAINT FK_Itens_Produtos FOREIGN KEY (cod_produto) REFERENCES Produtos(cod_produto)
);
GO

-- =============================================
-- DADOS INICIAIS (SEED)
-- =============================================

INSERT INTO Proprietarios (username, password_hash, nome, email)
VALUES ('admin', '$2b$10$89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.', 'Dono da Pizzaria', 'admin@pizzaria.com');
