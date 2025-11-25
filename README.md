# Trabalho-Type-Edu: API de Pedidos de Pizzaria

📝 **Descrição do Projeto**\
O **Trabalho-Type-Edu** é uma **API RESTful** desenvolvida para simular
o sistema de gerenciamento de pedidos de uma pizzaria. Este projeto lida
com autenticação de clientes e proprietários, cadastro de produtos
(cardápio) e o ciclo de vida completo de um pedido, desde criação até
conclusão.\
Foi desenvolvido como **Trabalho Acadêmico**, focado em **Node.js,
TypeScript e Express**.

------------------------------------------------------------------------

## ✨ Funcionalidades da API

-   **Autenticação e Usuários**\
    Cadastro, Login e Atualização de dados para Clientes e Proprietários
    (Admin).

-   **Cardápio (Produtos)**\
    CRUD completo para produtos (apenas Proprietário) e listagem para
    Clientes.

-   **Pedidos**\
    Criar pedido, listar pedidos, atualizar status (Ex: Aberto, Em
    Preparo, Concluído etc.).

------------------------------------------------------------------------

## 🛠 Tecnologias Utilizadas

-   **TypeScript** -- Tipagem estática\
-   **Node.js** -- Ambiente de execução\
-   **Express** -- Framework HTTP\
-   **SQL Server** -- Banco de Dados\
-   **MSSQL** -- Conexão com BD\
-   **JWT** -- Autenticação\
-   **Bcrypt** -- Hash de senhas\
-   **Dotenv** -- Variáveis de ambiente\
-   **ts-node-dev** -- Dev server com reload automático

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    pizzaria-backend/
    ├── src/
    │   ├── config/
    │   │   └── db.ts
    │   ├── models/
    │   │   ├── Clientes.ts
    │   │   └── ...
    │   ├── routes/
    │   │   ├── clientesRoutes.ts
    │   │   ├── loginRoutes.ts
    │   │   └── ...
    │   └── server.ts
    ├── .env
    ├── package.json
    └── tsconfig.json

------------------------------------------------------------------------

## 🚀 Como Executar o Projeto

### 🔽 Clonar repositório

``` sh
git clone https://github.com/Mauricio-Nonato/Trabalho-Type-Edu.git
cd Trabalho-Type-Edu
```

### 📦 Instalar dependências

``` sh
npm install
npm i -D typescript ts-node @types/node
npm install mssql
```

### ▶️ Rodar API

``` sh
cd pizzaria-backend
npx ts-node .\src\criarAdmin.ts
npx ts-node .\src\server.ts
```

### 🌐 Rodar index.html (Frontend)

    Abra o arquivo com Live Server

------------------------------------------------------------------------

## 🔐 Variáveis de Ambiente (.env)

    DB_HOST=localhost
    DB_USER=seu_usuario_sql
    DB_PASSWORD=sua_senha_sql
    DB_NAME=pizzaria
    PORT=3000
    SECRET_KEY=suaChaveSecretaParaJWT

------------------------------------------------------------------------

## 💾 Script SQL Completo (Schema)

``` sql
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
VALUES (
    'admin',
    '$2b$10$89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.',
    'Dono da Pizzaria',
    'admin@pizzaria.com'
);
```

------------------------------------------------------------------------
