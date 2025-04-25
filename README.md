# CreativeX3 - Sistema de Gerenciamento de Usuários

Este é um sistema de gerenciamento de usuários desenvolvido com React no frontend e Node.js no backend.

## Tecnologias Utilizadas

- Frontend: React, Vite
- Backend: Node.js, Express
- Banco de Dados: MySQL

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL chamado `creativex3`
2. Importe o arquivo `database.sql` que está na pasta `backend`

## Executando o Projeto

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Inicie o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:8800`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## Fluxo de Telas

1. **Tela Inicial**
   - Lista de usuários cadastrados
   - Botões para adicionar, editar e excluir usuários

2. **Tela de Eventos**
   - Três botões para executar, na respectiva ordem, os métodos de CREATE, PUT e DELETE da API

3. **Modal de Cadastro**
   - Formulário para adicionar novo usuário
   - Campos: Nome, Trabalho, Telefone e Cidade
   - Validação de campos obrigatórios
   - Mensagens de erro em laranja

4. **Modal de Edição**
   - Formulário pré-preenchido com dados do usuário
   - Mesmos campos do cadastro
   - Validação de campos obrigatórios
   - Mensagens de erro em laranja

5. **Modal de Exclusão**
   - Confirmação de exclusão do usuário
   - Lista de usuários para seleção

6. **Tela de Detalhes**
   - Visualização detalhada dos dados do usuário
   - Botão para voltar à lista principal
  
7. **Tela de About it**
   - Informações sobre o desenvolvedor do projeto

## Funcionalidades

- CRUD completo de usuários
- Validação de campos obrigatórios
- Interface responsiva e moderna
- Feedback visual para ações do usuário
- Mensagens de erro em laranja para melhor visibilidade 
