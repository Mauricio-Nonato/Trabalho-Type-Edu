# Trabalho-Type-Edu: API de Pedidos de Pizzaria

📝 **Descrição do Projeto**\
O **Trabalho-Type-Edu** é uma **API RESTful** desenvolvida para simular
o sistema de gerenciamento de pedidos de uma pizzaria.

## ✨ Funcionalidades da API

Autenticação de usuários, CRUD de produtos e gerenciamento de pedidos.

## 🛠 Tecnologias Utilizadas

(Tabela ok no GitHub)

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

## 🔐 Variáveis de Ambiente (.env)

    DB_HOST=localhost
    DB_USER=seu_usuario_sql
    DB_PASSWORD=sua_senha_sql
    DB_NAME=pizzaria
    PORT=3000
    SECRET_KEY=suaChaveSecretaParaJWT

## 💾 Script SQL Completo (Schema)

``` sql
CREATE DATABASE [pizzaria];
GO
...
```
