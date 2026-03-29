# Product Strategy — CryptoFolio

## Vision & Outcomes

**Vision**: CryptoFolio é a forma mais simples de acompanhar, converter e sacar criptomoedas para usuários não-técnicos brasileiros. Tudo em um app clean, dark, moderno — sem a complexidade das exchanges tradicionais.

**User outcome**: O usuário abre o app, vê exatamente quanto tem, converte em poucos toques, saca quando precisa, e recebe alertas quando algo importante acontece.

**Business outcome**: Plataforma com alta retenção via simplicidade, upsell futuro para features premium (trading avançado, staking).

---

## Delivery Phase: Single-Phase MVP

Todo o escopo definido por Hermes será entregue em uma única fase. Não há roadmap de fases futuras — o MVP é o produto completo para lançamento.

---

## Principles

| # | Principle | Rationale |
|---|-----------|-----------|
| P1 | **Simplicidade radical** | Cliente quer "algo simples, sem mil opções" — cada tela tem uma tarefa clara |
| P2 | **Dark-first, contrast-safe** | Dark theme padrão conforme pedido; seguir quality standards de contraste |
| P3 | **Mobile-first, desktop-polished** | "Fácil de usar no celular e na web" — design mobile-first, desktop refinado |
| P4 | **Progressive disclosure** | Informações avançadas (fees, hash de tx) ficam em seções expansíveis ou detalhes, não na superfície |
| P5 | **Feedback imediato** | Cada ação tem resposta visual: toast, loading state, success screen |
| P6 | **Zero dead ends** | Toda tela vazia tem CTA, todo erro tem retry, todo sucesso tem "próximo passo" |

---

## Feature Priorities (Build Order)

| Priority | Feature Area | Screens | Why |
|----------|-------------|---------|-----|
| 1 | **Auth** | Login, Signup, Forgot Password, Reset Password | Gate — sem auth não há app |
| 2 | **Layout Shell** | Sidebar, Header, Mobile drawer | Estrutura base para todas as telas |
| 3 | **Dashboard** | Home/Dashboard | Tela principal — "abrir e ver minhas moedas" |
| 4 | **Wallet** | Lista de ativos, Detalhe do ativo | Core — ver portfólio detalhado |
| 5 | **Deposit** | Depositar, Confirmação | Entrada de valor — habilita uso |
| 6 | **Convert** | Converter, Confirmação | Feature mais pedida: "converter rapidamente" |
| 7 | **Withdraw** | Sacar, Confirmação | Monetização — "sacar quando precisar" |
| 8 | **Alerts** | Alertas, Criar alerta | "Alerta quando subir ou descer muito" |
| 9 | **History** | Histórico, Detalhe de transação | Auditoria e confiança |
| 10 | **Settings** | Profile, Security, Notifications, Banks, Preferences | Personalização e gestão de conta |
| 11 | **Support** | FAQ, Contato | Suporte ao usuário |
| 12 | **Landing** | Landing page pública | Marketing e conversão |
| 13 | **System** | 404, Error states | Polish final |

---

## Global UX Patterns

### Empty States

Toda lista, tabela ou coleção segue este padrão quando vazia:
- Ícone temático (outline, `text-muted-foreground`, 64px)
- Título: frase descritiva (ex: "Nenhuma transação ainda")
- Descrição: 1 linha explicando o que fazer
- CTA primário quando há ação clara (ex: "Fazer primeiro depósito")

### Loading States

- **Initial load**: Skeleton placeholders (nunca spinner sozinho)
- **Refresh / pull-to-refresh**: Spinner inline no topo
- **Submit / action**: Botão mostra spinner + texto "Processando..." + disabled
- **Polling**: Indicador sutil (pulsing dot ou text "Atualizando...")

### Error States

- **Inline field error**: `text-destructive` abaixo do campo, borda `border-destructive`
- **Toast error**: Ações async que falham → toast "Algo deu errado. Tente novamente."
- **Full-page error**: Se API principal falha no load → tela com ícone, mensagem, botão "Tentar novamente"
- **Network error**: Toast persistente "Sem conexão" até reconectar

### Success States

Após ações importantes (depósito, conversão, saque):
- Modal/tela de sucesso com ícone de check verde
- Card de resumo com detalhes da transação
- Botão "Baixar Recibo" (secundário)
- Botão "Voltar para [origem]" (primário)

### Confirmations (Destructive / Financial)

Toda ação financeira ou destrutiva exige modal de confirmação:
- **Título**: ação clara (ex: "Confirmar conversão")
- **Body**: resumo com valores, taxas, destino
- **Botões**: "Cancelar" (ghost) + "Confirmar" (primary ou destructive)
- **Double-submit prevention**: botão desabilita após primeiro clique

### Navigation

- Desktop: Sidebar permanente (h-screen, sticky) com seções agrupadas
- Mobile: Hamburger → drawer sidebar (overlay + backdrop escuro)
- Todas as páginas acessíveis pelo sidebar sem exceção
- Back navigation: browser back funciona em todas as rotas

---

## Risks & Mitigations

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | Dark theme com contraste ruim | Ilegibilidade, acessibilidade | Seguir quality standards rigorosamente; usar tokens semânticos |
| R2 | Dados mock parecerem falsos | UX pouco convincente | Usar dados realistas: nomes de moedas reais, valores plausíveis, datas recentes |
| R3 | Muitas telas para MVP | Atraso | Priorizar features core (dash, wallet, convert, withdraw) antes de settings/support |
| R4 | Inconsistência desktop/mobile | Confusão do usuário | Hephaestus como checkpoint de unificação |
| R5 | Forms com UX ruim | Abandono | Athena define cada campo, validação e feedback — nada ambíguo |

---

## Glossary

| Term | Definition | Notes |
|------|-----------|-------|
| **Ativo** | Uma criptomoeda ou moeda fiat no portfólio do usuário | Sinônimo de "moeda" no contexto de carteira |
| **Carteira (Wallet)** | Coleção de ativos do usuário na plataforma | Não é a wallet blockchain externa |
| **Conversão** | Troca de um ativo por outro dentro da plataforma | Ex: BTC → ETH, BTC → BRL |
| **Depósito** | Receber criptomoeda de uma wallet externa para o CryptoFolio | Sempre via endereço blockchain |
| **Saque** | Enviar valor para fora da plataforma | Cripto → wallet externa; BRL → conta bancária via PIX |
| **Alerta** | Notificação configurada pelo usuário para variação de preço | Tipo: acima de / abaixo de um valor-alvo |
| **Fee** | Taxa cobrada pela transação (rede ou plataforma) | Exibida antes da confirmação |
| **PIX** | Sistema de pagamento instantâneo brasileiro | Usado para saques em BRL |
| **Saldo disponível** | Quantidade do ativo disponível para uso (excluindo pendentes) | Mostrado em formulários de conversão/saque |
| **Toast** | Notificação temporária no topo/inferior da tela | Auto-dismiss em 5s, pode ter ação de "desfazer" |
| **Empty state** | Estado de uma lista/coleção quando não há itens | Sempre com ícone + mensagem + CTA |
| **Skeleton** | Placeholder animado durante carregamento | Retângulos/linhas cinzas pulsando |
