# validation.md — cyclo-3-tech-cleanup

## Cycle: cyclo-3-tech-cleanup
## Data de validação: 2026-05-27

---

## Resultado dos comandos

| Comando | Resultado | Observações |
|---|---|---|
| `npm run lint` | PASS | Corrigidos Navbar (menu mobile) e Home (filtros/paginação) |
| `npm run test` | PASS | 6 ficheiros, 17 testes |
| `npm run build` | PASS | Bundle inclui `data.js`; aviso chunk >500kB (esperado) |

---

## Mapeamento scenarios.feature → evidência

| Cenário | Tipo de evidência | Resultado |
|---|---|---|
| Menu principal não inclui loja | build + código Navbar | PASS |
| URL antiga da loja deixa de funcionar | rota removida de App.jsx | PASS |
| Rotas públicas principais permanecem acessíveis | build + rotas em App.jsx | PASS |
| Catálogo continua pesquisável | testes + data.js intacto | PASS |
| Filtro por tipo continua funcional | Database.jsx inalterado | PASS |
| Links externos em postagens abrem de forma segura | PostBody.jsx (código) | PASS |
| Painel admin não é indexado | AdminLayout.jsx meta noindex | PASS |

---

## Smoke manual

| Passo | Ação | Resultado esperado | Resultado observado |
|---|---|---|---|
| 1 | Build produção | dist gerado | PASS |
| 2 | Rotas em App.jsx | sem `/store` | PASS |
| 3 | NUKE DB | import de `src/services/data.js` | PASS |
| 4 | Backup | `ipf-backup-2026-05-27` existe | PASS |

---

## Falhas baseline (pré-existentes)

- Nenhuma bloqueante após correções de lint em Navbar/Home.

---

## Conclusão

- [x] Todos os cenários de aceite com evidência
- [x] Lint, test e build passando
- [x] Pronto para `/close-cycle`
