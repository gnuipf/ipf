# implementation-notes.md — cyclo-3-tech-cleanup

## Cycle: cyclo-3-tech-cleanup

---

## Backup pré-ciclo

- `c:\Users\weban\ipf-backup-2026-05-27` — cópia completa antes de qualquer alteração.

---

## Removido

### Loja
- `src/pages/Store.jsx`, `src/pages/Store.css`
- Rota `/store` e item STORE no Navbar
- `src/assets/img/logo.png`
- `public/img/store/` (diretório)

### Legado Vanilla (raiz)
- `inaudivel_por_favor-main/`
- `ipf_home-main/`
- `ipf_store-main/`
- `ipf_db-main/`

### Outros
- `banco de dados novo.txt`
- `src/assets/img/index.html`

---

## Preservado (deliberado)

- `src/services/data.js` — catálogo NUKE DB
- `public/posts.json`, `src/lib/legacyPosts.js` — fallback sem Supabase
- `docs/superpowers/` — planos de ciclos anteriores

---

## Decisões técnicas

- **RLS Supabase:** mantida como está; modelo de operador único. Documentado em `docs/STATUS.md` que qualquer utilizador auth no projecto tem CRUD.
- **Segurança front:** já conforme (`rehype-sanitize`, `noopener noreferrer`, admin `noindex`); nenhuma alteração de código necessária além da limpeza.

---

## Desvios do plano

- Nenhum.
