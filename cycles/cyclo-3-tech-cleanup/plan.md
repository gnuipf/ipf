# plan.md — Limpeza técnica, segurança e inventário funcional

## Cycle: cyclo-3-tech-cleanup
## Gerado em: 2026-05-27

---

## Resumo do plano

Descontinuar a loja (menu + rota + código), remover artefactos legados Vanilla não referenciados pelo build React/Vite, endurecer pontos óbvios de segurança no front e admin, atualizar specs canónicas e entregar `docs/STATUS.md` com inventário funcional. **Preservar** `src/services/data.js` como única fonte do NUKE DB.

---

## Baseline observado

| Área | Estado actual |
|------|----------------|
| NUKE DB (`/db`) | Dados em `src/services/data.js` → `dbData`; UI em `Database.jsx` |
| Loja (`/store`) | Rota activa, link no Navbar, páginas `Store.jsx` / `Store.css` |
| Legado na raiz | `inaudivel_por_favor-main/`, `ipf_home-main/`, `ipf_store-main/`, `ipf_db-main/` — **não importados** pela app |
| Posts | Supabase + fallback `public/posts.json` via `legacyPosts.js` |
| Segurança front | `rehype-sanitize`, links externos com `rel="noopener noreferrer"`, admin com `noindex` |
| RLS Supabase | Policies em `20260419120000_posts_and_storage.sql` — operador único autenticado com CRUD |

---

## Estado desejado (decisões deste ciclo)

### Loja descontinuada

- Navbar: INÍCIO, SOBRE NÓS, SEJA REVISOR, NUKE DB (sem STORE).
- Rota `/store` removida do router; visitante que aceder URL antiga cai no fallback SPA (404 ou home — comportamento actual do React Router sem rota).
- Ficheiros Store e assets órfãos removidos.

### Limpeza de repositório

- Apagar pastas legadas na raiz confirmadas sem referência.
- Apagar ficheiros soltos obsoletos (`banco de dados novo.txt`, `src/assets/img/index.html`, etc.) se não referenciados.
- Manter `src/services/data.js` intacto (catálogo NUKE DB).
- Manter fallback JSON de posts para ambiente sem Supabase.

### Segurança

- Confirmar que nenhum segredo server-only entra no bundle Vite.
- Documentar estado RLS e limitações (conta única operador).
- Corrigir apenas gaps concretos encontrados na auditoria (sem reescrever auth).

### Documentação

- `docs/STATUS.md`: inventário curto funcional / parcial / removido.
- Specs canónicas actualizadas (navegação, fonte NUKE DB, ausência de loja).

---

## Arquivos afetados

| Arquivo / pasta | Tipo | Motivo |
|-----------------|------|--------|
| `src/components/Navbar.jsx` | edit | Remover STORE e logo `/store` |
| `src/App.jsx` | edit | Remover rota `/store` |
| `src/pages/Store.jsx`, `Store.css` | delete | Loja descontinuada |
| `public/img/store/` (se existir) | delete | Assets da loja |
| `src/assets/img/logo.png` | delete | Só usado pelo Navbar `/store` (confirmar) |
| `inaudivel_por_favor-main/` etc. | delete | Legado não usado |
| `package.json` | edit | Nome do projecto |
| `README.md` | edit | Remover secção Store |
| `docs/STATUS.md` | create | Inventário funcional |
| `spec/features/public-site/readme.md` | edit | Navegação sem loja |
| `spec/features/nuke-db/readme.md` | edit | Fonte de dados canónica |
| `spec/README.md` | edit | Referência a STATUS + nota de limpeza |

---

## Dependências e ordem de execução

1. **Inventário de remoções** — grep/build para confirmar que `data.js` e fallback posts não são tocados; listar candidatos à remoção.
2. **Descontinuar loja** — Navbar, router, páginas, assets.
3. **Apagar legado na raiz** — pastas `*-main/` e ficheiros soltos.
4. **Auditoria segurança** — env, sanitize, admin, RLS (documentar).
5. **Specs + STATUS + README** — reflectir estado final.
6. **Validação** — lint, test, build, smoke manual.

---

## Specs afetadas

- `spec/features/public-site/readme.md` — menu público e rotas (sem `/store`).
- `spec/features/nuke-db/readme.md` — fonte de dados `src/services/data.js`.
- `spec/README.md` — hub + `docs/STATUS.md`.

---

## Riscos identificados

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Apagar ficheiro ainda referenciado | Média | Grep + `npm run build` antes de commit |
| Remover `data.js` por engano | Baixa | Explicitar no plano/tasks; não incluir em candidatos |
| Links externos para `/store` noutros sites | Baixa | Documentar em STATUS como removido; URL antiga 404 |
| Fallback posts necessário em prod | Média | Manter; marcar parcial em STATUS |

---

## Fora de escopo (confirmado)

- Nova loja ou redirecionamento `/store` → outra página.
- Admin NUKE DB, editor hyperlinks (cyclo-2), migrações novas.
- Remoção de `legacyPosts` / `posts.json`.

---

## Perguntas abertas

- [x] Rota `/store` — **remover** (decisão humana 2026-05-27).
- [x] Pastas legadas — **apagar se não usadas**; NUKE DB fica em `src/services/data.js`.
- [ ] Supabase sempre em prod? — assumir sim; fallback mantido e documentado como parcial.
