# Relatório de verificação e validação

## Projeto Jay-C — análise dos testes automatizados

**Responsável:** Augusto do Amarante\
**Data:** 15/11/2026 (revisado em 17/11/2026)\
**Projeto:** Jay-C\
**Repositório:** [https://github.com/TyxMatty/Jay-C](https://github.com/TyxMatty/Jay-C)\
**Versão analisada:** 0.5.5

---

## 1. Objetivo

Este relatório apresenta a análise dos testes automatizados existentes no repositório do projeto Jay-C, verificando quais funcionalidades e requisitos possuem testes implementados, quais apresentam cobertura parcial e quais não possuem cobertura automatizada identificada.

A análise considera os requisitos funcionais, os requisitos não funcionais e as regras de negócio definidos na planilha de requisitos do projeto.

## 2. Metodologia

A verificação foi realizada por meio da análise dos arquivos e configurações disponíveis no GitHub.

Foram examinados:

- O arquivo principal `package.json`.
- As configurações dos módulos frontend e signaling-server.
- Os arquivos de testes automatizados.
- Os testes implementados em JavaScript e Rust.
- A configuração de integração contínua em `.github/workflows/ci.yml`.
- A documentação técnica e as instruções de execução.

Foram identificados **47 arquivos JavaScript de teste**, sendo 41 no frontend e 6 no servidor, além de módulos com testes em Rust.

Na primeira versão deste relatório (15/11) a suíte não tinha sido executada. Na revisão de 17/11 ela foi executada; os resultados estão na seção 9.

## 3. Configuração dos testes

O projeto utiliza o recurso nativo `node:test` do Node.js.

O comando principal configurado no projeto é:

```
npm test
```

Esse comando executa os testes dos módulos que possuem scripts de teste configurados.

Também existem testes em Rust, executados separadamente pela integração contínua:

```
cargo test --lib
cargo test
```

A configuração do GitHub Actions prevê:

- Testes JavaScript do servidor e do frontend.
- Testes Rust do plugin de áudio e do aplicativo.
- Construção da imagem Docker do servidor.
- Inicialização do servidor e verificação do endpoint `/health`.

O projeto exige Node.js versão 22 ou superior.

## 4. Análise dos requisitos funcionais

| Código | Requisito | Resultado da análise |
| ------ | --------- | -------------------- |
| RF001 | Configurar endereço do servidor | Coberto por testes de endereço e validação de URL. |
| RF002 | Visualizar servidores, salas e canais | Coberto por testes de listagem e estado das sessões. |
| RF003 | Entrar em uma sala utilizando nome e informações de acesso | Parcial: existem testes de entrada e identificação, mas não de todo o fluxo visual. |
| RF004 | Entrar em salas protegidas com senha válida | Coberto por testes de senha correta e incorreta. |
| RF005 | Realizar chamadas de áudio e vídeo em tempo real | Parcial: existem testes de sinalização, transporte e mídia, mas não uma validação completa com dispositivos reais. |
| RF006 | Ativar e desativar microfone e câmera | Parcial: existem testes de estado do áudio e do microfone, mas não cobertura completa de hardware. |
| RF007 | Compartilhar tela inteira ou janela específica | Parcial: existem testes de sinalização e transmissão, mas não validação completa de captura em todos os sistemas. |
| RF008 | Configurar qualidade da transmissão | Parcial: existem testes de resolução, FPS e bitrate, mas não validação completa de desempenho real. |
| RF009 | Enviar e receber mensagens durante chamadas | Coberto por testes de mensagens e comunicação entre participantes. |
| RF010 | Enviar imagens, GIFs e vídeos | Coberto por testes de formatos, validação de arquivos, uploads e permissões. |
| RF011 | Enviar mensagens e consultar histórico nos canais | Coberto por testes de mensagens, histórico e paginação. |
| RF012 | Responder a mensagens anteriores | Coberto por testes de respostas e citações provenientes do histórico do canal. |
| RF013 | Personalizar perfil com imagem ou cor | Coberto por testes de avatar, cores e atualização do perfil. |
| RF014 | Administrador criar, editar e excluir salas | Coberto por testes de gerenciamento de salas. |
| RF015 | Administrador criar, editar e excluir canais | Coberto por testes de gerenciamento de canais. |
| RF016 | Configurar salas protegidas e ocultas | Coberto por testes de senha, salas ocultas e permissões administrativas. |
| RF017 | Utilizar janela flutuante de vídeo (PiP) | Parcial: existe teste da seleção da faixa de vídeo, mas não validação completa da janela nativa. |
| RF018 | Personalizar aparência e temas | Coberto por testes de aparência, cores e contraste. |
| RF019 | Consultar guia de instruções | Parcial: existem testes das etapas do tour de boas-vindas (`welcome.test.js`) e do renderizador Markdown usado pelo guia (`markdown.test.js`), mas o conteúdo do guia de instalação não é testado. |
| RF020 | Sair de uma sala ou encerrar participação | Coberto por testes de saída, desconexão e encerramento de participantes. |

## 5. Análise dos requisitos não funcionais

| Código | Requisito | Resultado da análise |
| ------ | --------- | -------------------- |
| RNF001 | Suportar até 16 participantes por sala | Parcial: o teste do servidor verifica o mecanismo de limite com uma sala configurada para 2 pessoas (a terceira recebe `room-full`). O limite padrão de 16 vem da configuração, mas não há teste com 16 participantes reais. |
| RNF002 | Restringir funções administrativas por chave | Coberto por testes de validação da chave e bloqueio de acessos incorretos. |
| RNF003 | Proteger arquivos compartilhados por sessão | Coberto por testes de autorização e isolamento de arquivos entre sessões. |
| RNF004 | Validar tipos e tamanhos de arquivos | Coberto por testes de formatos, conteúdo e limites de upload. |
| RNF005 | Remover localização e metadados de mídias | Parcial: existem testes para PNG, WebP, JPEG e MP4. WebM ainda não possui limpeza de metadados implementada. |
| RNF006 | Disponibilizar endpoint de saúde do servidor | Coberto por teste do endpoint HTTP `/health`. |
| RNF007 | Reconectar automaticamente após interrupção | Coberto por teste de reconexão e reentrada na sala (`signaling.test.js`). |
| RNF008 | Suportar plataformas previstas | Parcial: existem etapas de build e testes para Windows e avanços no Android, mas o suporte a iOS permanece pendente. |
| RNF009 | Disponibilizar temas claro e escuro | Coberto por testes de contraste e aparência nos dois temas. |
| RNF010 | Transmitir tela em até 1080p e 60 FPS | Parcial: existem testes de resolução, FPS, bitrate e qualidade nativa, mas não validação completa de transmissão real nessas condições. |

## 6. Análise das regras de negócio

| Código | Regra de negócio | Resultado da análise |
| ------ | ---------------- | -------------------- |
| RN001 | Limite de 16 participantes por sala | Parcial: o teste verifica o bloqueio de quem passa do limite, numa sala configurada para 2; o valor 16 não é testado diretamente. |
| RN002 | Salas protegidas exigem senha | Coberto por testes de autenticação e rejeição de senhas incorretas. |
| RN003 | Salas ocultas não aparecem na lista pública e exigem senha | Coberto por testes de listagem e acesso a salas ocultas. |
| RN004 | Somente administrador autorizado gerencia salas e canais | Coberto por testes de chave administrativa e operações de gerenciamento. |
| RN005 | Mensagens devem possuir entre 1 e 500 caracteres | Parcial: existem testes para mensagens vazias e com 501 caracteres, mas não foi identificada uma validação explícita do limite exato de 500. |
| RN006 | Histórico mantém até 500 mensagens recentes | Coberto por teste de retenção das últimas 500 mensagens. |
| RN007 | Consultas retornam no máximo 50 mensagens | Coberto por testes de paginação e limite de histórico. |
| RN008 | Imagens e GIFs até 8 MB; vídeos até 50 MB | Parcial: existem testes de validação de tamanho, mas com limites próprios dos testes; os valores padrão de 8 MB e 50 MB não são testados diretamente. |
| RN009 | Arquivos compartilhados só podem ser vistos por participantes autorizados | Coberto por testes de isolamento e autorização de arquivos. |
| RN010 | Salas fixas não podem ser renomeadas enquanto ocupadas | Coberto por teste que verifica a restrição de renomeação. |
| RN011 | Fotos de perfil PNG, JPEG ou WebP, com limite de 32.000 caracteres | Parcial: existem testes de formatos e rejeição de imagens grandes, mas não foi identificada confirmação do limite exato. |
| RN012 | Respostas devem pertencer ao mesmo canal da mensagem original | Coberto por testes de citações obtidas do histórico do canal e validação de respostas. |

## 7. Principais arquivos de teste identificados

### Frontend

Entre os arquivos encontrados, destacam-se:

- `frontend/test/signaling.test.js`
- `frontend/test/attachments.test.js`
- `frontend/test/text-channels.test.js`
- `frontend/test/admin-key.test.js`
- `frontend/test/theme-contrast.test.js`
- `frontend/test/media.test.js`
- `frontend/test/pip.test.js`
- `frontend/test/avatar.test.js`
- `frontend/test/server-address.test.js`
- `frontend/test/native-live.test.js`
- `frontend/test/native-mic.test.js`
- `frontend/test/installer.test.js`

### Servidor

- `signaling-server/test/server.test.js`
- `signaling-server/test/channels.test.js`
- `signaling-server/test/directory.test.js`
- `signaling-server/test/media.test.js`
- `signaling-server/test/rate-limit.test.js`
- `signaling-server/test/sfu-room.test.js`

Os testes do servidor verificam operações de entrada e saída, gerenciamento de salas, senhas, canais, mensagens, mídia, permissões e limites de participantes.

## 8. Limitações identificadas

A análise encontrou algumas limitações importantes:

1. A existência de testes automatizados não garante que todas as funcionalidades estejam cobertas.
2. Parte dos testes verifica funções isoladas, e não o funcionamento completo do aplicativo.
3. Testes que dependem de tela, áudio ao vivo ou recursos nativos podem exigir execução específica e não necessariamente fazem parte da rotina padrão de CI.
4. A remoção de metadados em WebM permanece como limitação conhecida.
5. O suporte a iOS ainda não está concluído.
6. Os limites exatos de algumas regras de negócio (16 participantes, 500 caracteres, 8 MB e 50 MB, 32.000 caracteres) precisam de testes de fronteira.

## 9. Evidências de execução

O histórico de desenvolvimento contém registro de que `npm test` e `cargo check` foram verificados no commit da versão 0.5.5.

Na revisão de 17/11/2026 a suíte foi executada de novo:

- **`npm test`** no commit `fccf175` (versão 0.5.5): 186 testes, todos aprovados (50 do servidor e 136 do frontend), 0 falhas, 0 ignorados.
- **GitHub Actions**, última execução do CI no `main` ([execução 43750984966](https://github.com/TyxMatty/Jay-C/actions/runs/43750984966), 15/11/2026, mesmo commit): os três trabalhos passaram (testes JavaScript, testes Rust no Windows e imagem Docker com a verificação do `/health`).

Os testes Rust não foram executados localmente nesta revisão; o resultado deles vem do CI.

## 10. Conclusão

A análise do repositório Jay-C identificou uma estrutura de testes automatizados significativa, distribuída entre frontend, servidor e componentes nativos em Rust.

Os testes existentes cobrem aspectos importantes do projeto, incluindo gerenciamento de salas e canais, autenticação administrativa, mensagens, histórico, compartilhamento de arquivos, reconexão, aparência e comunicação entre participantes.

Também foram identificadas coberturas parciais em funcionalidades que dependem de hardware, sistemas operacionais e transmissão real de mídia, e na validação de limites específicos.

Os pontos que merecem maior atenção são a limpeza de metadados em WebM, a validação completa das plataformas, a transmissão em qualidade máxima e os limites exatos de determinadas regras de negócio.

**Parecer:** o projeto possui testes automatizados implementados e uma estrutura de integração contínua configurada, e a suíte JavaScript passou integralmente na execução de 17/11. A cobertura encontrada é relevante, mas não permite afirmar que todos os requisitos foram integralmente validados: os itens parciais das seções 4 a 6 ainda dependem de testes manuais ou de testes de fronteira.

## 11. Fontes consultadas

- Repositório principal: [https://github.com/TyxMatty/Jay-C](https://github.com/TyxMatty/Jay-C)
- Configuração geral: [https://github.com/TyxMatty/Jay-C/blob/main/package.json](https://github.com/TyxMatty/Jay-C/blob/main/package.json)
- Testes do frontend: [https://github.com/TyxMatty/Jay-C/tree/main/frontend/test](https://github.com/TyxMatty/Jay-C/tree/main/frontend/test)
- Testes do servidor: [https://github.com/TyxMatty/Jay-C/tree/main/signaling-server/test](https://github.com/TyxMatty/Jay-C/tree/main/signaling-server/test)
- Integração contínua: [https://github.com/TyxMatty/Jay-C/blob/main/.github/workflows/ci.yml](https://github.com/TyxMatty/Jay-C/blob/main/.github/workflows/ci.yml)
- Arquitetura: [https://github.com/TyxMatty/Jay-C/blob/main/docs/ARQUITETURA.md](https://github.com/TyxMatty/Jay-C/blob/main/docs/ARQUITETURA.md)
- Instruções de execução: [https://github.com/TyxMatty/Jay-C/blob/main/docs/CONTINUAR.md](https://github.com/TyxMatty/Jay-C/blob/main/docs/CONTINUAR.md)
- Planilha de requisitos: [`TabelaRequisitos.xlsx`](../TabelaRequisitos.xlsx)

---

**Responsável pela verificação e validação:**\
Augusto do Amarante
