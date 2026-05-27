# STATUS — Inaudível Por Favor

Inventário operacional (cyclo-3-tech-cleanup). Atualizado: 2026-05-27.

## Funcional

- **Home** (`/`) — destaques fixos + feed com filtros e paginação (Supabase ou fallback JSON).
- **Detalhe de post** (`/post/:slug`) — Markdown sanitizado, links externos seguros.
- **NUKE DB** (`/db`) — catálogo em `src/services/data.js`; busca, filtro por tipo, paginação.
- **Páginas estáticas** — `/sobre`, `/seja-revisor`.
- **Admin postagens** (`/adminipf`) — login Supabase, CRUD de posts, upload de imagens (requer env + migrations).
- **Deploy SPA** — Vercel rewrites para `index.html`.

## Parcial / depende de config

- **Posts via Supabase** — requer `VITE_SUPABASE_*` e migrations SQL aplicadas no projeto.
- **Fallback legado** — sem Supabase, usa `public/posts.json` + `legacyPosts.js` (dev/preview).
- **Scripts de migração** — `npm run migrate:posts` e `npm run db:migrate-sql` (uso manual, service role).

## Removido neste ciclo

- **Loja** — rota `/store`, menu STORE, `Store.jsx`, assets da loja.
- **Legado Vanilla** — pastas `inaudivel_por_favor-main/`, `ipf_home-main/`, `ipf_store-main/`, `ipf_db-main/`.
- **Ficheiros soltos** — `banco de dados novo.txt`, `src/assets/img/index.html`, `logo.png` (só usado na store).

## Não funcional / fora de escopo

- **Admin NUKE DB** — catálogo só em código (`data.js`); sem painel de edição.
- **Checkout / pagamento** — não existe.
- **Editor rich-text / hyperlinks admin** — pendente cyclo-2.

## Segurança (estado actual)

- Markdown: `rehype-sanitize` no front.
- Links externos em posts: `target="_blank"` + `rel="noopener noreferrer"`.
- Admin: meta `noindex, nofollow`.
- Bundle: apenas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (ver `.env.example`).
- RLS Supabase: anon lê posts publicados; autenticado tem CRUD completo — adequado a **operador único**; qualquer conta auth no projecto pode administrar.

## Backup

- Cópia completa do repo antes deste ciclo: `c:\Users\weban\ipf-backup-2026-05-27`
