Trabalho-Type-Edu: API de Pedidos de Pizzaria

📝 Descrição do ProjetoO Trabalho-Type-Edu é uma API RESTful desenvolvida para simular o sistema de gerenciamento de pedidos de uma pizzaria. Este projeto lida com a autenticação de clientes e proprietários, o cadastro de produtos (cardápio) e o ciclo de vida completo de um pedido, desde sua criação até sua conclusão.Foi desenvolvido como [Mencione a finalidade: Trabalho Acadêmico, Projeto Pessoal, etc.] focado em Node.js, TypeScript e Express.

✨ Funcionalidades da APIA API oferece os seguintes recursos:Autenticação e Usuários: Cadastro, Login e Atualização de dados para Clientes e Proprietários (Admin).Cardápio (Produtos): Operações CRUD (Create, Read, Update, Delete) de produtos por Proprietários e listagem para Clientes.Pedidos: Criação, consulta e atualização do status do pedido (Ex: "Em Preparo", "Concluído").

🛠 Tecnologias UtilizadasEste projeto é uma aplicação Backend (API) construída com:CategoriaTecnologiaUso Específico / DependênciaLinguagemTypeScriptGarante tipagem estática e segurança de código.RuntimeNode.jsAmbiente de execução.Framework WebExpressCriação de rotas e manipulação de requisições HTTP.Banco de DadosSQL ServerConexão via biblioteca mssql para gerenciar dados.AutenticaçãoJWT (jsonwebtoken)Criação de tokens de sessão.SegurançaBcrypt (bcrypt)Hashing de senhas para armazenamento seguro.ConfiguraçãoDotenv (dotenv)Gerenciamento de variáveis de ambiente (.env).Desenvolvimentots-node-devExecução e reload automático do servidor.

📂 Estrutura do ProjetoO código-fonte está organizado da seguinte forma:pizzaria-backend/
├── src/
│   ├── config/
│   │   └── db.ts           # Configuração de conexão com o banco de dados
│   ├── models/
│   │   ├── Clientes.ts
│   │   └── ...             # Outros modelos (Pedido, Produtos, Proprietario, etc.)
│   ├── routes/
│   │   ├── clientesRoutes.ts
│   │   ├── loginRoutes.ts
│   │   └── ...             # Outras rotas (Proprietario, Produtos)
│   └── server.ts           # Ponto de entrada da aplicação (API principal)
├── .env                    # Variáveis de ambiente
├── package.json
└── tsconfig.json           # Configuração de compilação do TypeScript


🚀 Como Executar o Projeto (API)Pré-requisitos de InstalaçãoNode.js: Versão 18 ou superior.SQL Server: Uma instância do banco de dados em execução.Git: Para clonar o repositório.Instalação e SetupClone o repositório:

git 

clone https://github.com/Mauricio-Nonato/Trabalho-Type-Edu.git

cd Trabalho-Type-Edu

Instale as dependências:
npm install
npm i -D typescript ts-node@types/node
npm install mssql
extensão live server

Como rodar:
cd pizzaria-backend
npx ts-node .\src\criarAdmin.ts
npx ts-node .\src\server.ts
execute o index.html com live server

DB_HOST=localhost
DB_USER=seu_usuario_sql
DB_PASSWORD=sua_senha_sql
DB_NAME=pizzaria
PORT=3000
SECRET_KEY=suaChaveSecretaParaJWT

💾 Schema do Banco de Dados (SQL)Script completo para a criação do banco de dados pizzaria:SQLCREATE DATABASE [pizzaria];
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
