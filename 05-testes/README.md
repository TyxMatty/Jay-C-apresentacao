# 05 — Testes

Os 23 casos de teste do dossiê (CT01 a CT23) ficam na seção 4.6: [`07-entrega-final/dossie.md`](../07-entrega-final/dossie.md#27-casos-de-teste). Base de CT01 a CT08 escrita por Henrique Augusto.

Os testes automatizados ficam junto do código (47 arquivos JS rodando com `node --test`, alem dos testes em Rust):
- `signaling-server/test/`: servidor (salas, canais, arquivos, permissões de admin).
- `frontend/test/`: app (chat, menções, temas e contraste, áudio, live).

Para rodar os dois workspaces juntos (precisa ter rodado `npm install` ou `npm ci` antes pra puxar `ws` e `@tauri-apps/api`):

```bash
npm install
npm test
```

O CI (`.github/workflows/ci.yml`) roda `npm test` e `cargo test` a cada envio para o GitHub.
