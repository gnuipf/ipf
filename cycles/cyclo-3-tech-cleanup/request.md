# request.md — Limpeza técnica, segurança e inventário funcional

## Cycle
- **Path:** `cycles/cyclo-3-tech-cleanup/`
- **Tipo:** Medium
- **Data:** 2026-05-27

---

## Contexto

O repositório acumulou artefactos da migração Vanilla → React (pastas `*-main/`, dados duplicados, fallbacks legados) e pequenas inconsistências técnicas. Queremos um ciclo curto de limpeza e hardening, sem mudanças de produto além de descontinuar a loja.

---

## Intent

- Remover código e ficheiros não usados pela app React/Vite atual.
- Aplicar boas práticas de cibersegurança em pontos óbvios (env, admin, sanitização, links).
- Documentar de forma breve o que está funcional vs. parcial/não funcional.
- Remover a loja por completo: link STORE no header **e** rota `/store`.

---

## Decisões (refine)

| Tema | Decisão |
|------|---------|
| Loja / Store | Remover rota `/store`, página, assets e link no menu — **não haverá mais loja** |
| NUKE DB | Fonte canónica: `src/services/data.js` (`dbData`); **não apagar**; pastas legadas na raiz (`ipf_db-main/`, etc.) podem ser removidas se não referenciadas |
| Legado na raiz | Apagar pastas/ficheiros não usados pelo build (`inaudivel_por_favor-main/`, `ipf_home-main/`, `ipf_store-main/`, `ipf_db-main/`, etc.) |
| Fallback posts | Manter `legacyPosts` + `public/posts.json` para dev sem Supabase; documentar como parcial |
| Resumo funcional | `docs/STATUS.md` (PT-BR, dev + operador) |
| Segurança RLS | Auditar e documentar; corrigir só gaps óbvios sem migration nova salvo necessidade clara |

---

## Escopo

### 1. Descontinuar loja (única mudança de produto)

- Remover item STORE de `NAV_ITEMS` em `src/components/Navbar.jsx`.
- Remover rota `/store` de `App.jsx`.
- Remover `src/pages/Store.jsx`, `src/pages/Store.css`.
- Remover lógica de logo `/store` no Navbar.
- Remover assets órfãos da loja (`public/img/store/`, `logo.png` se só servia à store).

### 2. Limpeza de código morto

- Apagar pastas legadas na raiz não referenciadas pelo build/deploy.
- Remover imports, assets, CSS e scripts órfãos dentro de `src/` e `public/`.
- Corrigir inconsistências triviais (ex.: `"name": "temp-app"` → nome do projeto).
- **Não** remover `src/services/data.js` nem alterar catálogo NUKE DB.
- **Não** remover `legacyPosts` / `posts.json` sem evidência de obsolescência em prod.

### 3. Cibersegurança (mínimo verificável)

- Rever `.env.example` vs. uso real; garantir que segredos não entram no bundle.
- Confirmar sanitização de markdown (`rehype-sanitize`) e links externos seguros.
- Rever fluxo admin (`/adminipf`): sessão Supabase, `noindex`, mensagens de erro.
- Rever migrations Supabase (RLS/policies) por gaps óbvios documentados ou corrigidos no ciclo.
- Executar lint e corrigir issues óbvias.

### 4. Resumo funcional (curto)

- Criar `docs/STATUS.md` com bullets: **Funcional**, **Parcial**, **Não funcional / removido**.

---

## Constraints

- Não alterar layout, copy ou fluxos das páginas restantes (home, posts, `/db`, admin, estáticas).
- Não introduzir novas features nem refactors funcionais (editor admin, checkout, etc.).
- Remoções só após confirmar zero referência no build, scripts npm e deploy.
- `npm run lint`, `npm run test` e `npm run build` devem passar ao fim do ciclo.

---

## Fora de escopo

- Novas features, redesign, migrações de BD, e-commerce, refactor do editor admin.
- Reescrita completa de RLS/Supabase ou multi-utilizador admin.
- Admin NUKE DB (não existe no código).

---

## Specs relevantes

- `spec/README.md`
- `spec/features/public-site/readme.md`
- `spec/features/admin-posts/readme.md`
- `spec/features/nuke-db/readme.md`

---

## Validação

- `npm run lint`, `npm run test`, `npm run build` passam.
- Menu sem STORE; `/store` inacessível; `/db` intacto com dados de `src/services/data.js`.
- `docs/STATUS.md` entregue; lista do que foi removido documentada no ciclo.
