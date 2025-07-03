# 🎬 FlixHub

FlixHub é um aplicativo web que permite pesquisar por filmes e séries e visualizar informações detalhadas sobre eles, incluindo dados como título, sinopse e elenco. Também é possível acessar a página de detalhes de atores e ver em quais produções eles participaram.

O app foi desenvolvido com **React**, **Tailwind CSS** e **TypeScript**, consumindo dados diretamente da API do [The Movie Database (TMDB)](https://www.themoviedb.org/).

## ⚙️ Funcionalidades

- 🔍 Pesquisa de filmes e séries
- 📄 Visualização de detalhes de filmes e séries (título, descrição, elenco, etc.)
- 🧑 Navegação para página de detalhes de atores
- 💅 Interface moderna, responsiva e rápida

## 🛠️ Tecnologias utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/flixhub.git

# Acesse a pasta do projeto
cd flixhub

# Instale as dependências
npm install

# Configure sua chave da API TMDB em um arquivo .env.local
VITE_TMDB_TOKEN=sua_chave_tmdb_aqui

# Inicie o servidor de desenvolvimento
npm run dev
