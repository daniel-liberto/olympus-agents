# Sitemap — CryptoFolio

## Legenda

- `[Public]` — acessível sem autenticação
- `[Auth]` — requer autenticação
- `(param)` — rota dinâmica

---

## Árvore Completa de Rotas

```
/                                         [Public]  Landing Page (S-LANDING)
├── /login                                [Public]  Login (S-AUTH-LOGIN)
├── /signup                               [Public]  Cadastro (S-AUTH-SIGNUP)
├── /forgot-password                      [Public]  Recuperar Senha (S-AUTH-FORGOT)
├── /reset-password/:token                [Public]  Nova Senha (S-AUTH-RESET)
│
├── /app                                  [Auth]    Layout Shell (Sidebar + Header + Main)
│   ├── /app/dashboard                    [Auth]    Dashboard / Home (S-DASH)
│   │
│   ├── /app/wallet                       [Auth]    Carteira — Lista de ativos (S-WALL)
│   ├── /app/wallet/:coinId               [Auth]    Detalhe do Ativo (S-WALL-DETAIL)
│   │
│   ├── /app/deposit                      [Auth]    Depósito (S-DEP)
│   │
│   ├── /app/convert                      [Auth]    Conversão (S-CONV)
│   │
│   ├── /app/withdraw                     [Auth]    Saque (S-SAQUE)
│   │
│   ├── /app/alerts                       [Auth]    Alertas de Preço (S-ALERT)
│   │
│   ├── /app/history                      [Auth]    Histórico Geral (S-HIST)
│   │
│   ├── /app/settings                     [Auth]    Configurações (S-SET)
│   │   ├── /app/settings/profile         [Auth]    Perfil (S-SET-PROFILE)
│   │   ├── /app/settings/security        [Auth]    Segurança (S-SET-SECURITY)
│   │   ├── /app/settings/notifications   [Auth]    Notificações (S-SET-NOTIF)
│   │   ├── /app/settings/bank-accounts   [Auth]    Contas Bancárias (S-SET-BANKS)
│   │   └── /app/settings/preferences     [Auth]    Preferências — tema, moeda (S-SET-PREFS)
│   │
│   └── /app/support                      [Auth]    Suporte / FAQ (S-SUPP)
│
└── /*                                    [All]     404 — Página Não Encontrada (S-404)
```

---

## Navigation Patterns

### Desktop Sidebar (permanent, sticky h-screen)

```
┌──────────────────────────────┐
│  🔶 CryptoFolio              │  ← Logo/brand
│                              │
│  PRINCIPAL                   │
│  ◉ Dashboard                 │  → /app/dashboard
│  ◉ Carteira                  │  → /app/wallet
│                              │
│  TRANSAÇÕES                  │
│  ◉ Depositar                 │  → /app/deposit
│  ◉ Converter                 │  → /app/convert
│  ◉ Sacar                     │  → /app/withdraw
│                              │
│  OUTROS                      │
│  ◉ Alertas                   │  → /app/alerts
│  ◉ Histórico                 │  → /app/history
│  ◉ Configurações             │  → /app/settings
│                              │
│  ─────────────────────────── │
│  ◉ Suporte                   │  → /app/support
│  ◉ João Silva     ▾          │  → Profile menu (logout)
└──────────────────────────────┘
```

### Mobile Navigation

- **Hamburger menu** (top-left) abre sidebar como drawer (overlay)
- **Bottom bar** (opcional — atalhos para Dashboard, Carteira, Converter)
- Sidebar mobile: mesma estrutura, animação slide-in da esquerda

### Cross-Links

| From | To | Trigger |
|------|----|---------|
| S-DASH | S-WALL | Clicar em ativo na lista |
| S-DASH | S-DEP | Botão "Depositar" quick action |
| S-DASH | S-CONV | Botão "Converter" quick action |
| S-DASH | S-SAQUE | Botão "Sacar" quick action |
| S-DASH | S-HIST | Link "Ver todos" nas últimas transações |
| S-WALL | S-WALL-DETAIL | Clicar em um ativo |
| S-WALL-DETAIL | S-DEP | Botão "Depositar" este ativo |
| S-WALL-DETAIL | S-CONV | Botão "Converter" este ativo |
| S-WALL-DETAIL | S-SAQUE | Botão "Sacar" este ativo |
| S-DEP | S-DEP-SUCCESS | Após confirmação de depósito (modal) |
| S-CONV | S-CONV-SUCCESS | Após confirmação de conversão (modal) |
| S-SAQUE | S-SAQUE-SUCCESS | Após confirmação de saque (modal) |
| S-HIST | S-HIST-DETAIL | Clicar em transação (modal) |
| S-SET | S-SET-* | Clicar em item de configuração |
| S-AUTH-LOGIN | S-AUTH-SIGNUP | Link "Criar conta" |
| S-AUTH-LOGIN | S-AUTH-FORGOT | Link "Esqueceu a senha?" |
| S-AUTH-SIGNUP | S-AUTH-LOGIN | Link "Já tenho conta" |
| S-AUTH-FORGOT | S-AUTH-LOGIN | Link "Voltar ao login" |

---

## Pages by Visibility

### Public (Guest)

| Route | Screen |
|-------|--------|
| `/` | Landing Page |
| `/login` | Login |
| `/signup` | Cadastro |
| `/forgot-password` | Recuperar Senha |
| `/reset-password/:token` | Nova Senha |

### Authenticated

| Route | Screen |
|-------|--------|
| `/app/dashboard` | Dashboard |
| `/app/wallet` | Carteira |
| `/app/wallet/:coinId` | Detalhe do Ativo |
| `/app/deposit` | Depósito |
| `/app/convert` | Conversão |
| `/app/withdraw` | Saque |
| `/app/alerts` | Alertas de Preço |
| `/app/history` | Histórico Geral |
| `/app/settings` | Configurações (hub) |
| `/app/settings/profile` | Perfil |
| `/app/settings/security` | Segurança |
| `/app/settings/notifications` | Notificações |
| `/app/settings/bank-accounts` | Contas Bancárias |
| `/app/settings/preferences` | Preferências |
| `/app/support` | Suporte / FAQ |

### System

| Route | Screen |
|-------|--------|
| `/*` | 404 Não Encontrada |
