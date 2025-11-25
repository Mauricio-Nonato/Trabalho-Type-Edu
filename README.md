🍕 Trabalho-Type-Edu — API de Pedidos de Pizzaria












📝 Descrição do Projeto

O Trabalho-Type-Edu é uma API RESTful desenvolvida para simular o fluxo completo de pedidos de uma pizzaria.

A aplicação contempla:

Autenticação de clientes e proprietários

Cadastro e gerenciamento de produtos (cardápio)

Criação e atualização de pedidos

Controle do status: Aberto → Em Preparo → Concluído

Foi desenvolvida como [coloque aqui: Trabalho Acadêmico / Projeto Pessoal / Projeto de Estudo], utilizando Node.js + TypeScript + Express + SQL Server.

✨ Funcionalidades
🔐 Autenticação & Usuários

Cadastro e Login (Cliente e Proprietário)

Atualização de perfis

Tokens JWT

🍕 Produtos (Cardápio)

CRUD completo (apenas Proprietário/Admin)

Listagem para clientes

📦 Pedidos

Criação de pedidos

Listagem e consulta

Alteração de status

Itens detalhados (tamanho, observações, etc.)

🛠 Tecnologias Utilizadas
Categoria	Tecnologia	Descrição
Linguagem	TypeScript	Tipagem estática
Runtime	Node.js	Ambiente de execução
Framework	Express	Rotas e HTTP
Banco	SQL Server	Persistência via mssql
Autenticação	JWT	Tokens
Segurança	Bcrypt	Hash de senhas
Configuração	Dotenv	Variáveis de ambiente
Dev	ts-node-dev	Reload automático
📂 Estrutura do Projeto
pizzaria-backend/
│
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
│   └── server.ts                 # Servidor principal
│
├── .env
├── package.json
└── tsconfig.json

🚀 Como Executar
✔ Pré-requisitos

Node.js 18+

SQL Server instalado e rodando

Git

📥 Instalação
git clone https://github.com/Mauricio-Nonato/Trabalho-Type-Edu.git
cd Trabalho-Type-Edu


Instale as dependências:

npm install
npm i -D typescript ts-node @types/node
npm install mssql

▶ Rodando o projeto

Entre na pasta:

cd pizzaria-backend


Criar administrador padrão:

npx ts-node src/criarAdmin.ts


Iniciar o servidor:

npx ts-node src/server.ts


Executar o front-end:

Abra index.html com a extensão Live Server.

🔧 Variáveis de Ambiente (.env)
DB_HOST=localhost
DB_USER=seu_usuario_sql
DB_PASSWORD=sua_senha_sql
DB_NAME=pizzaria
PORT=3000
SECRET_KEY=suaChaveSecretaParaJWT

💾 Script SQL — Banco de Dados
CREATE DATABASE [pizzaria];
GO

USE [pizzaria];
GO

-- TABELA CLIENTES
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

-- PROPRIETÁRIOS
CREATE TABLE Proprietarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(100),
    email VARCHAR(100)
);

-- PRODUTOS
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

-- PEDIDOS
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

-- ITENS DO PEDIDO
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

-- SEED
INSERT INTO Proprietarios (username, password_hash, nome, email)
VALUES ('admin', '$2b$10$89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.', 'Dono da Pizzaria', 'admin@pizzaria.com');
