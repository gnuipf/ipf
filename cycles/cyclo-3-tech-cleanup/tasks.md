# tasks.md — cyclo-3-tech-cleanup

## Cycle: cyclo-3-tech-cleanup

---

## Especificação canônica (obrigatório)

- [x] Atualizar `spec/features/public-site/readme.md` — navegação pública sem loja; rotas canónicas.
- [x] Atualizar `spec/features/nuke-db/readme.md` — fonte de dados `src/services/data.js`.
- [x] Atualizar `spec/README.md` — referência a `docs/STATUS.md`.

---

## Descontinuar loja

- [x] Remover `{ path: '/store', label: 'STORE' }` de `src/components/Navbar.jsx`.
- [x] Remover import/case `/store` e `logoStore` do Navbar (se órfão).
- [x] Remover rota e import de Store em `src/App.jsx`.
- [x] Apagar `src/pages/Store.jsx` e `src/pages/Store.css`.
- [x] Apagar assets órfãos da loja (`public/img/store/`, `src/assets/img/logo.png` se confirmado órfão).

---

## Limpeza de legado (preservar NUKE DB)

- [x] Confirmar que `/db` importa apenas `src/services/data.js` — **não alterar** `data.js`.
- [x] Apagar `inaudivel_por_favor-main/` (sem referências no build).
- [x] Apagar `ipf_home-main/`, `ipf_store-main/`, `ipf_db-main/` (duplicados legados).
- [x] Apagar ficheiros soltos não referenciados (`banco de dados novo.txt`, `src/assets/img/index.html`, etc.).
- [x] Remover imports/assets/CSS órfãos restantes em `src/` e `public/`.
- [x] Corrigir `"name": "temp-app"` em `package.json` → `inaudivel-por-favor`.
- [x] Actualizar `README.md` — remover secção Loja/Store.

---

## Cibersegurança

- [x] Rever `.env.example` vs. variáveis usadas; confirmar service role só em scripts server-side.
- [x] Confirmar `rehype-sanitize` em `PostBody.jsx` e links `noopener noreferrer`.
- [x] Confirmar `noindex` em `AdminLayout.jsx`.
- [x] Auditar policies RLS em `supabase/migrations/`; documentar gaps ou corrigir se óbvio.
- [x] Corrigir issues de lint/security óbvias.

---

## Documentação operacional

- [x] Criar `docs/STATUS.md` — Funcional / Parcial / Removido (bullets curtos).
- [x] Registar em `implementation-notes.md` lista do que foi apagado.

---

## Qualidade e validação

- [x] `npm run lint` — PASS
- [x] `npm run test` — PASS
- [x] `npm run build` — PASS
- [x] Smoke: rotas públicas e `/store` removida — PASS (código)
- [x] Actualizar `validation.md` com evidências

---

## Legenda

- `pending` — não iniciado | `done` — concluído com evidência em `validation.md`
