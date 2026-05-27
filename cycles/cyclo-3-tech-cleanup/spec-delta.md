# spec-delta.md — cyclo-3-tech-cleanup

## Cycle: cyclo-3-tech-cleanup
## Status: PROMOVIDO (refine 2026-05-27)

> Alterações ab abaixo foram aplicadas directamente em `spec/` durante o refine.

---

## Specs afetadas

### `spec/features/public-site/readme.md`

**Secção:** Navegação pública (nova)

**Mudança:**

- Menu canónico sem item STORE.
- Rota `/store` removida do produto.

**Motivo:** Loja descontinuada por decisão de produto.

---

### `spec/features/nuke-db/readme.md`

**Secção:** Fonte de dados (nova)

**Mudança:**

- Catálogo servido exclusivamente por `src/services/data.js` (`dbData`).
- Pastas legadas `ipf_db-main/` etc. não fazem parte do runtime.

**Motivo:** Evitar remoção acidental do catálogo durante limpeza.

---

### `spec/README.md`

**Mudança:** Referência a `docs/STATUS.md` para inventário operacional.

**Motivo:** Resumo funcional acordado no ciclo.

---

## Checklist antes de promover

- [x] Refine humano concluído
- [ ] Implementação concluída (`validation.md`)
- [ ] Comportamento validado em smoke manual
- [ ] Pronto para `/close-cycle`
