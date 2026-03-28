# Scope — Crypto Wallet Dashboard

## Overview

O produto é uma **plataforma de dashboard para criptomoedas** voltada para usuários não-técnicos que desejam visualizar, converter e sacar seus ativos digitais de forma simples e intuitiva. A experiência deve ser clean, moderna, com tema dark, e funcionar em **web (notebook)** e **mobile (celular)**.

O problema resolvido é dar ao usuário uma visão rápida e clara do estado de seus criptoativos, com ações diretas (conversão, saque) e alertas de variação de preço, sem a complexidade de exchanges tradicionais.

---

## Goals & Non-Goals

### Goals
- G1: Dashboard com visão rápida do saldo total e por moeda
- G2: Conversão rápida entre criptomoedas (e crypto-fiat)
- G3: Saque simples e direto
- G4: Alertas de variação de preço (alta/queda significativa)
- G5: Busca rápida de saldo na tela inicial
- G6: Design clean, moderno, tema dark
- G7: Responsivo — funcionar bem em mobile e desktop (notebook)
- G8: UX simplificada — sem opções excessivas, sem confusão

### Non-Goals
- NG1: Trading avançado (ordens limitadas, margin, futuros)
- NG2: Funcionalidade de exchange pública (order book, gráficos de candlestick avançados)
- NG3: KYC/verificação de identidade (fora do escopo front-end)
- NG4: Backend real / integração com APIs de exchange reais (apenas front-end mockado)
- NG5: Carteira multi-sig ou funcionalidades de segurança avançada
- NG6: Aplicativo nativo (será web responsivo)

---

## Personas / Actors

### P1: Usuário Casual de Crypto
- **Descrição**: Pessoa não-técnica que possui criptomoedas e quer acompanhar, converter e sacar de forma fácil
- **Goals**: Ver saldos rapidamente, converter moedas, sacar, receber alertas de preço
- **Permissions**: Acesso completo ao dashboard, configurações pessoais, operações
- **Comportamento**: Abre o app rapidamente, quer ver informação imediata, não quer aprender interfaces complexas

---

## Functional Requirements

### FR-DASH: Dashboard / Home
- FR-DASH-001: Exibir saldo total consolidado em moeda fiat (ex: BRL/USD) no topo da tela
- FR-DASH-002: Listar todas as moedas do usuário com saldo individual, variação 24h e valor em fiat
- FR-DASH-003: Campo de busca rápida para filtrar moedas por nome/ticker na tela inicial
- FR-DASH-004: Indicadores visuais de alta/queda (verde/vermelho, ícones de seta)
- FR-DASH-005: Card ou seção de "variação relevante" destacando moedas com movimentos significativos
- FR-DASH-006: Acesso rápido às ações: Converter, Sacar, Depositar

### FR-CONV: Conversão
- FR-CONV-001: Tela/modal de conversão com seleção de moeda de origem e destino
- FR-CONV-002: Campo de valor com cálculo em tempo real da conversão
- FR-CONV-003: Exibir taxa de câmbio atual e taxa de fee
- FR-CONV-004: Botão de inverter par (swap)
- FR-CONV-005: Confirmação antes de executar (modal de confirmação com resumo)
- FR-CONV-006: Feedback de sucesso/erro após conversão (toast)

### FR-SAQUE: Saque (Withdrawal)
- FR-SAQUE-001: Tela/modal de saque com seleção de moeda
- FR-SAQUE-002: Campo de valor e endereço/conta destino
- FR-SAQUE-003: Exibir saldo disponível e taxas estimadas
- FR-SAQUE-004: Confirmação antes de executar (modal de confirmação com resumo)
- FR-SAQUE-005: Feedback de sucesso/erro (toast)
- FR-SAQUE-006: Opção de selecionar rede (para crypto) ou método de saque (para fiat)

### FR-DEP: Depósito
- FR-DEP-001: Tela/modal de depósito com seleção de moeda
- FR-DEP-002: Exibir endereço de depósito / QR code
- FR-DEP-003: Opção de copiar endereço
- FR-DEP-004: Seleção de rede para a moeda
- FR-DEP-005: Aviso sobre confirmações necessárias

### FR-ALERT: Alertas de Preço
- FR-ALERT-001: Configurar alertas de variação percentual (ex: +5%, -10%) por moeda
- FR-ALERT-002: Listar alertas ativos
- FR-ALERT-003: Ativar/desativar alertas individuais
- FR-ALERT-004: Notificação visual (badge, toast ou banner) quando alerta é disparado
- FR-ALERT-005: Tela de gerenciamento de alertas

### FR-HIST: Histórico de Transações
- FR-HIST-001: Lista de transações (conversões, saques, depósitos) com filtros
- FR-HIST-002: Detalhes da transação (data, valor, moeda, status, txid)
- FR-HIST-003: Filtros por tipo (conversão/saque/depósito), período, moeda
- FR-HIST-004: Status da transação (pendente, confirmada, falhou)

### FR-SETTINGS: Configurações
- FR-SETTINGS-001: Preferência de moeda fiat de exibição (BRL, USD, EUR)
- FR-SETTINGS-002: Preferência de tema (dark padrão, opção light)
- FR-SETTINGS-003: Configurações de notificação/alertas
- FR-SETTINGS-004: Informações da conta (nome, email)

### FR-NAV: Navegação
- FR-NAV-001: Menu lateral (desktop) / bottom navigation (mobile)
- FR-NAV-002: Itens: Dashboard, Histórico, Alertas, Configurações
- FR-NAV-003: Indicador visual da página ativa

---

## Non-Functional Requirements

- **NFR-PERF**: Carregamento inicial < 3s; transições entre páginas suaves (< 300ms)
- **NFR-A11Y**: WCAG 2.1 AA como alvo (contraste adequado no tema dark, labels em inputs, navegação por teclado)
- **NFR-RESP**: Breakpoints: mobile (< 768px), tablet (768–1024px), desktop (> 1024px)
- **NFR-BROWSER**: Suporte a Chrome, Firefox, Safari, Edge (últimas 2 versões)
- **NFR-THEME**: Tema dark como padrão; tema light como alternativa
- **NFR-I18N**: Apenas pt-BR no MVP; estrutura preparada para i18n futuro
- **NFR-ANALYTICS**: Fora do escopo do MVP
- **NFR-SEO**: Não aplicável (app autenticado)
- **NFR-OFFLINE**: Fora do escopo

---

## Data Concepts (Entidades Principais)

| Entidade | Descrição | Relações |
|----------|-----------|----------|
| **User** | Usuário da plataforma | Possui Wallets, AlertConfigs, Transactions |
| **Wallet** | Carteira de uma moeda específica | Pertence a User; contém balance |
| **Coin** | Moeda (BTC, ETH, etc.) | Referenciada por Wallet, Transaction |
| **Transaction** | Operação (conversão, saque, depósito) | Pertence a User; referencia Coin(s) |
| **AlertConfig** | Configuração de alerta de preço | Pertence a User; referencia Coin |
| **PriceData** | Dados de preço/cotação de moedas | Referencia Coin; atualizado periodicamente |

---

## Integrations

- **Nenhuma integração real no MVP** — dados mockados
- Estrutura preparada para futura integração com APIs de cotação (CoinGecko, Binance)
- Estrutura preparada para futura integração com serviços de wallet/exchange

---

## Compliance / Risk

- Fora do escopo para MVP (front-end apenas)
- Nota: em produção real seria necessário KYC/AML, autenticação robusta, criptografia de dados sensíveis

---

## Acceptance Themes

### MVP (Este projeto)
- Dashboard funcional com saldos mockados
- Conversão, saque e depósito (fluxos UI completos com dados mock)
- Alertas de preço configuráveis (UI funcional, dados mock)
- Histórico de transações (dados mock)
- Tema dark, design clean e moderno
- Responsivo mobile + desktop
- Busca rápida de saldo na home

### Futuro (Fora do escopo)
- Integração real com APIs
- Autenticação real
- Notificações push
- Multi-idioma

---

## Screen Inventory

| ID | Screen | Primary Goal | Entry Points | Exit Points | Visibility |
|----|--------|-------------|--------------|-------------|------------|
| SCR-HOME | Dashboard / Home | Ver saldos e status das moedas | Login, navegação | Conversão, Saque, Depósito, Detalhes moeda, Alertas | Authenticated |
| SCR-CONVERT | Conversão | Converter moedas | Dashboard, navegação | Dashboard (pós sucesso) | Authenticated |
| SCR-WITHDRAW | Saque | Sacar moedas | Dashboard, navegação | Dashboard (pós sucesso) | Authenticated |
| SCR-DEPOSIT | Depósito | Depositar moedas | Dashboard, navegação | Dashboard | Authenticated |
| SCR-HISTORY | Histórico | Ver transações passadas | Navegação | Detalhes transação | Authenticated |
| SCR-TX-DETAIL | Detalhe Transação | Ver detalhes de uma transação | Histórico | Histórico | Authenticated |
| SCR-ALERTS | Alertas | Gerenciar alertas de preço | Navegação | Criar alerta, Editar alerta | Authenticated |
| SCR-ALERT-CREATE | Criar Alerta | Configurar novo alerta | Tela Alertas | Alertas | Authenticated |
| SCR-SETTINGS | Configurações | Personalizar preferências | Navegação | Dashboard | Authenticated |
| SCR-404 | Página não encontrada | Redirecionar usuário perdido | URL inválida | Dashboard | Public |
| SCR-EMPTY | Empty State (Dashboard) | Orientar novo usuário | Primeiro acesso | Depósito | Authenticated |

---

## Assumptions & Intelligent Defaults

1. **Sem autenticação real**: O app assume que o usuário está logado (sem tela de login/registro no MVP)
2. **Dados mockados**: Todos os saldos, preços e transações usam dados estáticos/mock
3. **Moedas padrão**: BTC, ETH, BNB, SOL, ADA, USDT, USDC como moedas disponíveis
4. **Moeda fiat padrão**: BRL como moeda de exibição padrão
5. **Tema dark padrão**: App inicia em dark mode por padrão conforme solicitado
6. **Sem depósito fiat**: Depósito é apenas crypto (endereço de wallet)
7. **Saque dual**: Suporta saque crypto (endereço) e fiat (dados bancários) como opções na UI
8. **Alertas locais**: Alertas são armazenados localmente (localStorage) no MVP
9. **Sem WebSocket**: Preços não atualizam em tempo real; simulados com polling ou dados estáticos
10. **Navegação**: Sidebar em desktop, bottom nav bar em mobile

---

## Open Questions for Client

1. Há preferência por moedas específicas a serem exibidas, ou o conjunto padrão (BTC, ETH, BNB, SOL, ADA, USDT, USDC) está adequado?
2. O saque deve incluir a opção de saque em fiat (transferência bancária) ou apenas crypto?
3. Existe alguma referência visual de design específica (site, app, marca)?
