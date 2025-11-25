# TypeScript + Vite: Projeto Pizzaria

Este é um projeto de pizzaria construído com **React** e **TypeScript**, utilizando **Vite** para um setup mínimo com Hot Module Replacement (HMR) e regras de ESLint pré-configuradas. O projeto está dividido em duas partes principais: `pizzaria-backend` (Node.js/TypeScript) e `pizzaria-frontend` (React/TypeScript).

---

## 🏗️ Estrutura do Projeto

O projeto está organizado em dois diretórios principais: `pizzaria-backend` (API/Servidor) e `pizzaria-frontend` (Interface do Usuário).

### 1. pizzaria-backend (API/Servidor)

Responsável pela lógica de negócios, manipulação do banco de dados e rotas da API.

pizzaria-backend/ ├── node_modules/ ├── src/ │ ├── config/ │ │ └── db.ts # Configuração da conexão com o banco de dados │ ├── models/ │ │ ├── Clientes.ts # Modelo de dados para Clientes │ │ ├── ItemCarrinho.ts # Modelo de dados para Itens do Carrinho │ │ ├── ItemPedido.ts # Modelo de dados para Itens do Pedido │ │ ├── Pedido.ts # Modelo de dados para Pedidos │ │ ├── Produtos.ts # Modelo de dados para Produtos (Cardápio) │ │ └── Proprietario.ts # Modelo de dados para Proprietários/Admins │ ├── routes/ │ │ ├── clientesRoutes.ts # Rotas de Clientes (registro, perfil, etc.) │ │ ├── loginRoutes.ts # Rotas de Autenticação (Login) │ │ ├── pedidosRoutes.ts # Rotas para Pedidos │ │ ├── produtosRoutes.ts # Rotas para consulta e gestão de Produtos │ │ └── proprietarioRoutes.ts # Rotas de Proprietários/Admins │ ├── service/ │ │ └── criarAdmin.ts # Lógica/script para criação inicial de um admin │ └── server.ts # Inicialização do servidor (Express/App principal) ├── .env # Variáveis de ambiente ├── package-lock.json ├── package.json # Dependências e scripts do backend └── tsconfig.json # Configurações do TypeScript para o backend


### 2. pizzaria-frontend (Interface do Usuário)

Responsável pela interface React, incluindo o site público e o painel administrativo.

pizzaria-frontend/ ├── css/ │ └── style.css # Estilos globais ├── cadastro.html # Página de Cadastro de Clientes ├── index.html # Página Principal / Homepage ├── login-proprietario.html # Página de Login para Proprietários/Admins ├── login.html # Página de Login para Clientes └── painel-admin.html # Página Principal do Painel Administrativo


---

## 💻 Iniciar o Projeto

Para configurar e rodar o projeto localmente, siga os passos abaixo:

1.  **Instalação de Dependências (Para cada pasta: `pizzaria-backend` e `pizzaria-frontend`):**
    ```bash
    cd pizzaria-backend
    npm install
    
    cd ../pizzaria-frontend
    npm install
    ```

2.  **Rodar em Modo de Desenvolvimento:**
    ```bash
    # Para o Backend (API)
    cd pizzaria-backend
    npm start # ou o comando configurado para rodar o server.ts
    
    # Para o Frontend (Vite)
    cd ../pizzaria-frontend
    npm run dev
    ```
    Isso iniciará o servidor de desenvolvimento com o Fast Refresh habilitado, geralmente em `http://localhost:5173`.

3.  **Build de Produção:**
    ```bash
    # Para o Frontend (Vite)
    cd pizzaria-frontend
    npm run build
    ```
    Este comando cria a versão otimizada para produção na pasta `dist/`.

---

## ⚡ Configuração e Fast Refresh

Para o desenvolvimento, esta aplicação usa Vite, que oferece uma experiência de desenvolvimento rápida. O **Fast Refresh** (Recarregamento Rápido) é habilitado por meio de um dos dois plugins oficiais do Vite:

* **`@vitejs/plugin-react`**: Utiliza [Babel](https://babeljs.io/) (ou [oxc](https://oxc.rs) quando usado em [rolldown-vite](https://vite.dev/guide/rolldown)) para o Fast Refresh.
* **`@vitejs/plugin-react-swc`**: Utiliza [SWC](https://swc.rs/) para o Fast Refresh, que geralmente é mais rápido.

### React Compiler

O **React Compiler** (ou React Forget) **não está habilitado** neste template por padrão, devido ao seu impacto potencial no desempenho de desenvolvimento (`dev`) e `build`. Para adicioná-lo ao projeto, consulte a documentação oficial para a [instalação do React Compiler](https://react.dev/learn/react-compiler/installation).

---

## 🛠️ Expansão da Configuração do ESLint

Recomendamos expandir a configuração do ESLint para aplicações em produção, especialmente para habilitar regras de lint que são **sensíveis a tipos** (type-aware lint rules), o que é crucial em projetos TypeScript.

### 1. Configuração com `tseslint`

Para habilitar as regras de checagem de tipo do `tseslint` (substituindo o `tseslint.configs.recommended` padrão), utilize o seguinte no seu arquivo de configuração:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Outras configs...

      // Remover tseslint.configs.recommended e substituir por:
      tseslint.configs.recommendedTypeChecked,
      // Alternativamente, use 'strict' para regras mais rigorosas:
      // tseslint.configs.strictTypeChecked,
      // Opcional: Adicionar regras estilísticas:
      // tseslint.configs.stylisticTypeChecked,

      // Outras configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // outras opções...
    },
  },
])
2. Configuração com Plugins Específicos do React
Você também pode instalar e utilizar eslint-plugin-react-x e eslint-plugin-react-dom para regras de lint específicas do ecossistema React:

JavaScript

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Outras configs...
      // Habilitar regras de lint para React (componentes, hooks, etc.)
      reactX.configs['recommended-typescript'],
      // Habilitar regras de lint para o React DOM (acessibilidade, tags, etc.)
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // outras opções...
    },
  },
])
💾 Banco de Dados SQL (Esquema da Pizzaria)
O esquema do banco de dados para a pizzaria é definido pelo script SQL abaixo. Ele estabelece as tabelas principais para gerenciar clientes, proprietários (administradores), produtos, pedidos e os itens detalhados de cada pedido.

SQL

CREATE DATABASE [pizzaria];
GO

USE [pizzaria];
GO

-- =============================================
-- 2. CRIAÇÃO DAS TABELAS
-- =============================================

-- 1. Tabela: Clientes (Para usuários que fazem pedidos)
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

-- 2. Tabela: Proprietarios (Para usuários Administradores)
CREATE TABLE Proprietarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(100),
    email VARCHAR(100)
);

-- 3. Tabela: Produtos (Cardápio da pizzaria)
CREATE TABLE Produtos (
    cod_produto INT PRIMARY KEY IDENTITY(1,1),
    tipo_produto VARCHAR(50) NOT NULL, -- 'Pizza Salgada', 'Bebida', 'Borda', etc.
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(MAX),
    preco DECIMAL(10, 2) NOT NULL, -- Preço Padrão/Grande
    imagem VARCHAR(MAX), -- Foto em Base64 (se for o caso)
    ativo BIT DEFAULT 1,
    
    -- Controle de Tamanhos
    tem_grande BIT DEFAULT 1,
    tem_broto BIT DEFAULT 0,
    preco_broto DECIMAL(10, 2) DEFAULT 0
);

-- 4. Tabela: Pedidos (Registros dos pedidos feitos)
CREATE TABLE Pedidos (
    cod_pedido INT PRIMARY KEY IDENTITY(1,1),
    username_cliente VARCHAR(50) NOT NULL,
    data_pedido DATETIME DEFAULT GETDATE(),
    status VARCHAR(50) DEFAULT 'Aberto', -- 'Aberto', 'Em Preparo', 'Concluído', 'Cancelado'
    forma_pagamento VARCHAR(50),
    tipo_entrega VARCHAR(50), -- 'Entrega' ou 'Retirada'
    endereco_entrega VARCHAR(255),
    observacao VARCHAR(255),
    preco_total DECIMAL(10, 2)
);

-- 5. Tabela: Itens do Pedido (Detalhes dos produtos dentro de cada pedido)
CREATE TABLE ItensPedidos (
    cod_item INT PRIMARY KEY IDENTITY(1,1),
    cod_pedido INT NOT NULL,
    cod_produto INT NOT NULL,
    nome_produto VARCHAR(100),
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2),
    tamanho_selecionado VARCHAR(50), -- 'Grande', 'Broto', 'Padrão'
    observacao_item VARCHAR(255),
    
    -- Chaves Estrangeiras (Vínculos)
    CONSTRAINT FK_Itens_Pedidos FOREIGN KEY (cod_pedido) REFERENCES Pedidos(cod_pedido),
    CONSTRAINT FK_Itens_Produtos FOREIGN KEY (cod_produto) REFERENCES Produtos(cod_produto)
);
GO

-- =============================================
-- 3. DADOS INICIAIS (SEED)
-- =============================================

-- Cria o usuário ADMIN padrão na tabela Proprietarios
-- Usuário: admin
-- Senha: admin
INSERT INTO Proprietarios (username, password_hash, nome, email)
VALUES ('admin', '$2b$10$89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.6.89.', 'Dono da Pizzaria', 'admin@pizzaria.com');

PRINT 'Banco de dados [pizzaria] instalado com sucesso!';
PRINT 'Login Admin: admin';
PRINT 'Senha Admin (com hash): admin';
Você pode salvar o conteúdo acima como README.md no seu projeto.

