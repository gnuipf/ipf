# Inaudível Por Favor (IPF) - Modernização React

Este projeto é uma refatoração completa da plataforma **Inaudível Por Favor**, antes construída em Vanilla JS/HTML, para uma arquitetura moderna utilizando **React** e **Vite**.

## 🚀 Tecnologias Utilizadas

- **React 19**: Biblioteca principal para construção da interface.
- **Vite**: Ferramenta de build ultra-rápida.
- **React Router Dom**: Gerenciamento de rotas (SPA).
- **Lucide React**: Biblioteca de ícones.
- **CSS Vanilla**: Estilização customizada e responsiva.
- **Supabase**: Auth, posts e storage (produção).

## 📁 Estrutura do Projeto

```text
src/
 ├── assets/        # Imagens e logos
 ├── components/    # Componentes globais (Navbar, Layout, Footer)
 ├── pages/         # Páginas (Home, Database, Post, estáticas)
 ├── services/      # Dados (NUKE DB em data.js, postsApi)
 ├── admin/         # Painel /adminipf
 └── lib/           # Utilitários (Supabase, slugify, sanitize)
spec/               # Especificações canónicas
docs/STATUS.md      # Inventário funcional
```

## ✨ Principais áreas

1. **NUKE DB (`/db`):**
   - Catálogo em `src/services/data.js`.
   - Busca, filtro por tipo de obra, paginação e ordenação.

2. **Postagens (home + admin):**
   - Feed público com filtros; painel em `/adminipf` (URL directa, sem link no menu).

3. **Navegação SPA:**
   - Menu: INÍCIO, SOBRE NÓS, SEJA REVISOR, NUKE DB.
   - Logo dinâmico na Navbar (home vs `/db`).

## 🛠️ Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (recomendado v18+)

### Instalação
```bash
npm install
cp .env.example .env   # preencher VITE_SUPABASE_* se usar admin/posts
npm run dev
```

### Build de Produção
```bash
npm run build
npm run preview
```

### Testes e lint
```bash
npm run lint
npm run test
```

## 📜 Licença
Este projeto é de uso restrito da **Inaudível Por Favor**.

---
*Refatorado com 🤘 para a cena metal brasileira.*
