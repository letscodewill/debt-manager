# 💰 Gerenciador de Dívidas (Debt Manager)

Este projeto é uma aplicação completa para gerenciamento pessoal de dívidas e gastos. O objetivo é fornecer uma ferramenta robusta e intuitiva, com uma API segura e uma interface moderna para o controle financeiro.

## ✨ Tecnologias Utilizadas

| Componente | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Back-end / API** | **Node.js (com Express)** | Servirá as rotas CRUD e implementará a lógica de negócios e autenticação. |
| **Banco de Dados** | **SQLite** | Banco de dados leve e ideal para o desenvolvimento, prototipagem e uso local. |
| **Front-end / Interface** | **ReactJS** | Framework moderno para construção de uma interface de usuário responsiva e dinâmica. |

## 🚀 Funcionalidades Principais

O sistema será dividido em duas grandes áreas: o núcleo de dados (API) e a experiência do usuário (Interface).

### API (Back-end)

* **CRUD de Dívidas:** Funcionalidade completa de `Create`, `Read`, `Update` e `Delete` para gerenciar as despesas.
* **Autenticação JWT:** Proteção de rotas para garantir que apenas usuários autenticados possam acessar e modificar seus dados.
* **Controle de Usuário:** Todas as dívidas criadas estarão estritamente vinculadas ao usuário que as registrou.

### Interface (Front-end)

* **Login & Registro:** Tela de autenticação para acesso seguro à aplicação.
* **Visualização de Gastos:** Lista organizada de todas as dívidas do usuário.
* **Busca & Filtros:** Capacidade de pesquisar despesas por **nome** ou **categoria**.
* **Gráfico de Gastos:** Dashboard visual para analisar a distribuição dos gastos (por categoria, por período, etc.).
* **Contas Compartilhadas (Funcionalidade Avançada):** Possibilidade de visualizar e gerenciar dívidas em conjunto com outros usuários.

## 🚧 Roadmap de Desenvolvimento

O projeto será desenvolvido em fases, garantindo a solidez da API antes de focar na interface.

### Fase 1: Core e Segurança (API)

1.  Configuração do ambiente Node.js e SQLite.
2.  Implementação do **CRUD básico de Dívidas** (Versão de teste via terminal).
3.  Criação das rotas da API.
4.  Implementação da **Autenticação (JWT)** e rotas de **Login**.
5.  Refatoração do CRUD para vincular e proteger os dados por usuário autenticado.

### Fase 2: Interface e Usabilidade (ReactJS)

1.  Configuração do ambiente ReactJS.
2.  Desenvolvimento da **Tela de Login** e integração com a API.
3.  Criação da tela principal de **Visualização de Gastos** e implementação do CRUD completo via interface.
4.  Implementação da **Busca por Nome e Categoria**.

### Fase 3: Valor Adicional

1.  Desenvolvimento do **Gráfico de Gastos** (Requer pesquisa e implementação de biblioteca de gráficos React).
2.  Implementação da funcionalidade de **Contas Compartilhadas**.

## 💻 Como Executar o Projeto (Em breve)

_Instruções detalhadas sobre como clonar o repositório, instalar as dependências (`npm install`), configurar variáveis de ambiente e iniciar a API e a Interface._

```bash
# 1. Configurar o Backend
cd backend
npm install
npm npm run devStart

# 2. Configurar o Frontend
cd frontend
npm install
npm run dev
