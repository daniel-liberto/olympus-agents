# Scope — CryptoFolio (Plataforma de Gestão de Criptomoedas)

## Overview

**CryptoFolio** é uma plataforma web e mobile-first de gestão de portfólio de criptomoedas voltada para usuários não-técnicos. O produto resolve o problema de acompanhar, converter e sacar criptomoedas de forma simples, sem a complexidade das exchanges tradicionais.

O cliente quer uma experiência minimalista — abrir o app, ver saldos, converter moedas e sacar — sem se perder em funcionalidades avançadas.

---

## Goals & Non-Goals

### Goals (MVP)

- G1: Dashboard com visão rápida do portfólio (saldos, variações)
- G2: Conversão rápida entre criptomoedas (e cripto→fiat)
- G3: Saque simplificado para conta bancária
- G4: Alertas de preço (alta/baixa significativa)
- G5: Busca rápida de saldo na tela inicial
- G6: Design dark theme, clean e moderno
- G7: Responsivo — funciona bem em celular e desktop (notebook)
- G8: Depósito de criptomoedas (receber moedas)

### Non-Goals (Fora do escopo MVP)

- NG1: Trading avançado (ordens limitadas, stop-loss, gráficos candlestick)
- NG2: Staking / DeFi / Yield farming
- NG3: NFTs
- NG4: Chat / comunidade
- NG5: API pública para desenvolvedores
- NG6: Multi-idioma (MVP apenas pt-BR)
- NG7: KYC avançado (verificação de identidade completa) — assumimos fluxo simplificado

---

## Personas / Actors

### P1: Usuário Comum (primary)

- **Perfil**: Pessoa não-técnica, 20-40 anos, investidor casual de cripto
- **Objetivo**: Acompanhar portfólio, converter moedas, sacar quando necessário
- **Dor**: Exchanges são confusas, muitas opções, interface poluída
- **Permissões**: Acesso total ao próprio portfólio, transações, configurações pessoais

### P2: Visitante (guest)

- **Perfil**: Usuário não autenticado
- **Objetivo**: Conhecer a plataforma, criar conta
- **Permissões**: Apenas páginas públicas (landing, login, cadastro)

---

## Functional Requirements

### FR-AUTH: Autenticação

- FR-AUTH-01: Cadastro com email e senha
- FR-AUTH-02: Login com email e senha
- FR-AUTH-03: Recuperação de senha por email
- FR-AUTH-04: Logout
- FR-AUTH-05: Sessão persistente com expiração (auto-logout após inatividade)

### FR-DASH: Dashboard / Home

- FR-DASH-01: Saldo total do portfólio em moeda fiat (BRL) com variação percentual (24h)
- FR-DASH-02: Lista de ativos (moedas) com ícone, nome, quantidade, valor em BRL, variação 24h
- FR-DASH-03: Busca rápida de ativo por nome/símbolo
- FR-DASH-04: Gráfico simples de evolução do portfólio (linha, 7d/30d/90d)
- FR-DASH-05: Atalhos rápidos para Depositar, Converter, Sacar
- FR-DASH-06: Últimas transações (mini-lista das 5 mais recentes)

### FR-WALL: Carteira / Wallet

- FR-WALL-01: Lista completa de todos os ativos com saldo, valor, variação
- FR-WALL-02: Detalhe de ativo individual: histórico de preço, saldo, transações daquele ativo
- FR-WALL-03: Filtro e ordenação de ativos (por valor, nome, variação)

### FR-DEP: Depósito

- FR-DEP-01: Selecionar moeda para depósito
- FR-DEP-02: Exibir endereço de carteira / QR code para recebimento
- FR-DEP-03: Copiar endereço com um clique
- FR-DEP-04: Histórico de depósitos com status (pendente, confirmado, falho)
- FR-DEP-05: Tela de confirmação/sucesso após detecção de depósito

### FR-CONV: Conversão

- FR-CONV-01: Selecionar par de conversão (ex: BTC → ETH, BTC → BRL)
- FR-CONV-02: Inserir valor a converter (com preview do resultado)
- FR-CONV-03: Exibir taxa de conversão e fee estimado
- FR-CONV-04: Confirmar conversão (modal de confirmação com resumo)
- FR-CONV-05: Tela de sucesso/erro pós-conversão
- FR-CONV-06: Histórico de conversões

### FR-SAQUE: Saque / Withdrawal

- FR-SAQUE-01: Selecionar moeda e valor para saque
- FR-SAQUE-02: Informar dados de destino (wallet externa ou conta bancária para fiat)
- FR-SAQUE-03: Exibir fee de rede e tempo estimado
- FR-SAQUE-04: Confirmação com resumo antes de executar
- FR-SAQUE-05: Tela de sucesso/erro pós-saque
- FR-SAQUE-06: Histórico de saques com status (processando, concluído, falho)

### FR-ALERT: Alertas de Preço

- FR-ALERT-01: Criar alerta: selecionar moeda, tipo (alta/baixa), percentual ou valor-alvo
- FR-ALERT-02: Listar alertas ativos
- FR-ALERT-03: Editar/excluir alerta
- FR-ALERT-04: Notificação visual (toast/badge) quando alerta é disparado
- FR-ALERT-05: Histórico de alertas disparados

### FR-HIST: Histórico Geral

- FR-HIST-01: Histórico unificado de todas as transações (depósitos, conversões, saques)
- FR-HIST-02: Filtros: tipo de transação, moeda, período, status
- FR-HIST-03: Exportar histórico (CSV)
- FR-HIST-04: Detalhe de transação individual (modal ou página)

### FR-SET: Configurações

- FR-SET-01: Perfil do usuário (nome, email, avatar)
- FR-SET-02: Alterar senha
- FR-SET-03: Preferências de notificação (alertas push, email)
- FR-SET-04: Moeda fiat padrão (BRL, USD)
- FR-SET-05: Gerenciar contas bancárias cadastradas (para saque fiat)
- FR-SET-06: Tema (dark é padrão, mas permitir light)

### FR-SUPP: Suporte

- FR-SUPP-01: Página de FAQ / Central de ajuda
- FR-SUPP-02: Link para contato/suporte por email

---

## Screen Inventory

| Screen ID | Screen Name | Primary Goal | Entry Points | Exit Points | Visibility |
|-----------|------------|--------------|--------------|-------------|------------|
| S-AUTH-LOGIN | Login | Autenticar usuário | Landing, Logout, Link direto | Dashboard, Cadastro, Recuperar senha | Guest |
| S-AUTH-SIGNUP | Cadastro | Criar conta | Login, Landing | Dashboard, Login | Guest |
| S-AUTH-FORGOT | Recuperar Senha | Resetar senha | Login | Login | Guest |
| S-AUTH-RESET | Nova Senha | Definir nova senha | Email link | Login | Guest |
| S-DASH | Dashboard / Home | Visão geral do portfólio | Login, Sidebar | Wallet, Depósito, Conversão, Saque, Alertas | Authenticated |
| S-WALL | Carteira (Wallet) | Ver todos os ativos | Sidebar, Dashboard | Detalhe de ativo, Depósito, Conversão, Saque | Authenticated |
| S-WALL-DETAIL | Detalhe do Ativo | Ver detalhes de uma moeda | Wallet, Dashboard | Wallet, Converter, Depositar, Sacar | Authenticated |
| S-DEP | Depósito | Receber cripto | Sidebar, Dashboard, Wallet | Sucesso, Dashboard | Authenticated |
| S-DEP-SUCCESS | Confirmação Depósito | Confirmar depósito | Depósito flow | Dashboard, Depósito | Authenticated |
| S-CONV | Conversão | Converter moedas | Sidebar, Dashboard, Wallet | Sucesso, Dashboard | Authenticated |
| S-CONV-SUCCESS | Confirmação Conversão | Confirmar conversão | Conversão flow | Dashboard, Conversão | Authenticated |
| S-SAQUE | Saque | Sacar para wallet/banco | Sidebar, Dashboard, Wallet | Sucesso, Dashboard | Authenticated |
| S-SAQUE-SUCCESS | Confirmação Saque | Confirmar saque | Saque flow | Dashboard, Saque | Authenticated |
| S-ALERT | Alertas de Preço | Gerenciar alertas | Sidebar | Criar alerta, Dashboard | Authenticated |
| S-ALERT-CREATE | Criar/Editar Alerta | Configurar alerta | Alertas | Alertas | Authenticated |
| S-HIST | Histórico | Ver todas as transações | Sidebar | Detalhe transação | Authenticated |
| S-HIST-DETAIL | Detalhe Transação | Ver detalhes de uma transação | Histórico | Histórico | Authenticated |
| S-SET | Configurações | Gerenciar conta/preferências | Sidebar | Sub-páginas de config | Authenticated |
| S-SET-PROFILE | Perfil | Editar dados pessoais | Configurações | Configurações | Authenticated |
| S-SET-SECURITY | Segurança | Alterar senha | Configurações | Configurações | Authenticated |
| S-SET-NOTIF | Notificações | Gerenciar preferências de notif | Configurações | Configurações | Authenticated |
| S-SET-BANKS | Contas Bancárias | Gerenciar contas para saque | Configurações | Configurações | Authenticated |
| S-SET-PREFS | Preferências | Tema, moeda padrão | Configurações | Configurações | Authenticated |
| S-SUPP | Suporte / FAQ | Buscar ajuda | Sidebar footer | — | Authenticated |
| S-404 | Página Não Encontrada | Redirecionar usuário | URL inválida | Dashboard, Home | All |
| S-LANDING | Landing Page | Apresentar produto | URL direta | Login, Cadastro | Guest |

---

## Non-Functional Requirements

### Performance

- NFR-PERF-01: Lighthouse score > 90 em todas as métricas
- NFR-PERF-02: First Contentful Paint < 1.5s
- NFR-PERF-03: Time to Interactive < 3s

### Accessibility

- NFR-A11Y-01: WCAG 2.1 AA (mínimo)
- NFR-A11Y-02: Navegação por teclado funcional em todos os fluxos
- NFR-A11Y-03: Contraste adequado (especialmente no dark theme)
- NFR-A11Y-04: Labels em todos os inputs de formulário

### Responsividade

- NFR-RESP-01: Mobile-first (360px+)
- NFR-RESP-02: Tablet (768px+)
- NFR-RESP-03: Desktop (1024px+)
- NFR-RESP-04: Sidebar colapsável em mobile (drawer)
- NFR-RESP-05: Tabelas viram cards em mobile

### Segurança

- NFR-SEC-01: Autenticação via JWT com refresh token
- NFR-SEC-02: HTTPS obrigatório
- NFR-SEC-03: Rate limiting em endpoints sensíveis
- NFR-SEC-04: Sanitização de inputs

### Browser Support

- NFR-BROWSER-01: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- NFR-BROWSER-02: iOS Safari 15+, Chrome Mobile 90+

### Analytics / SEO

- NFR-SEO-01: Landing page com meta tags, Open Graph, schema markup
- NFR-SEO-02: Páginas autenticadas não precisam de SEO
- NFR-ANALYTICS-01: Tracking de eventos core (signup, deposit, convert, withdraw)

---

## Data Concepts (Entities)

### User

- id, email, name, avatar, passwordHash, createdAt, lastLoginAt
- Relationships: has many Wallets, Transactions, Alerts, BankAccounts

### Wallet

- id, userId, coinId, balance, address
- Relationships: belongs to User, has many Transactions

### Coin / Asset

- id, symbol, name, iconUrl, currentPriceUsd, currentPriceBrl, change24h
- Global reference entity

### Transaction

- id, userId, type (deposit | conversion | withdrawal), status (pending | confirmed | failed | cancelled)
- fromCoin, toCoin (nullable), amount, convertedAmount, fee, txHash
- createdAt, confirmedAt

### Alert

- id, userId, coinId, type (above | below), targetValue, isActive, triggeredAt
- Relationships: belongs to User, references Coin

### BankAccount

- id, userId, bankName, agency, accountNumber, accountType, pixKey
- Relationships: belongs to User

---

## Integrations

- INT-01: API de preços de criptomoedas (CoinGecko ou equivalente) — para cotações em tempo real
- INT-02: Blockchain RPC / API (para gerar endereços de depósito, monitorar transações)
- INT-03: Gateway de pagamento / PIX (para saques em BRL)
- INT-04: Serviço de email (transactional — verificação, recuperação de senha, alertas)
- INT-05: Serviço de notificações push (para alertas de preço no mobile)

---

## Compliance / Risk

- COMP-01: LGPD — dados pessoais protegidos, direito de exclusão
- COMP-02: Termos de uso e política de privacidade obrigatórios
- COMP-03: Disclaimer financeiro — "não somos corretora regulamentada" (ou adequação conforme regulamento CVM se aplicável)
- COMP-04: Logs de auditoria para transações financeiras

---

## Acceptance Themes

### MVP "Done" significa:

- Usuário pode se cadastrar, logar, ver dashboard com portfólio
- Pode depositar, converter entre moedas, e sacar para conta bancária
- Recebe alertas quando moeda sobe/desce significativamente
- Busca rápida funciona na home
- Dark theme implementado, design clean e moderno
- Funciona bem em celular (360px) e desktop (1440px)
- Todas as telas com empty states, loading states, error states, success screens
- Lighthouse > 90

---

## Assumptions & Intelligent Defaults

| # | Assumption | Reasoning |
|---|-----------|-----------|
| A1 | Moedas suportadas no MVP: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Solana (SOL), BNB, Real Brasileiro (BRL) | Briefing menciona "moedas" genericamente; estas são as mais populares |
| A2 | Moeda fiat padrão: BRL (Real Brasileiro) | Cliente é brasileiro, briefing em pt-BR |
| A3 | Dark theme como padrão, com opção de light | Cliente pediu explicitamente dark |
| A4 | Sem tela de admin | Briefing focado em usuário final |
| A5 | Autenticação simples (email+senha), sem OAuth/social login no MVP | Simplicidade pedida pelo cliente |
| A6 | Dados de mock para demonstração (sem backend real) | Pipeline Olympus foca em frontend |
| A7 | Português (pt-BR) como único idioma | Briefing em português, público brasileiro |
| A8 | Sidebar como padrão de navegação (não bottom tabs no desktop) | Conforme quality standards |
| A9 | Bottom navigation no mobile para ações principais | Padrão mobile UX |
| A10 | Alertas visuais (in-app), não push notifications reais no MVP | Frontend-only |

---

## Open Questions for Client

| # | Question | Default if no answer |
|---|----------|---------------------|
| Q1 | Existe marca/logo definida? | Usaremos "CryptoFolio" como nome e criaremos identidade visual clean |
| Q2 | Quais moedas específicas além de BTC? | BTC, ETH, USDT, SOL, BNB + BRL |
| Q3 | Saque apenas via PIX ou também TED/DOC? | Apenas PIX (mais moderno e alinhado ao perfil do cliente) |
