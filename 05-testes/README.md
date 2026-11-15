# 05 — Testes

Os 19 casos de teste do dossiê (CT01 a CT19) ficam na seção 4.6: [`07-entrega-final/dossie.md`](../07-entrega-final/dossie.md#27-casos-de-teste). Base de CT01 a CT08 escrita por Henrique Augusto.

Os testes automatizados ficam junto do código:
- `signaling-server/test/`: servidor (salas, canais, arquivos, permissões de admin).
- `frontend/test/`: app (chat, menções, temas e contraste, áudio, live).

Para rodar todos:

```bash
npm install
npm test
```

O CI (`.github/workflows/ci.yml`) roda os testes a cada envio para o GitHub.
