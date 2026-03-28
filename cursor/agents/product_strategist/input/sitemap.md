# Sitemap — Crypto Wallet Dashboard

## Route Structure

```
/ (root — redirects to /dashboard)
│
├── /dashboard                          [SCR-HOME] Dashboard / Home
│   ├── Quick search (inline)           Busca rápida de saldo
│   ├── Portfolio summary               Saldo total consolidado
│   ├── Coin list                       Lista de moedas com saldos
│   └── Quick actions                   Converter, Sacar, Depositar
│
├── /convert                            [SCR-CONVERT] Conversão de moedas
│   ├── Select source coin
│   ├── Select target coin
│   ├── Amount input + live preview
│   └── Confirmation modal
│
├── /withdraw                           [SCR-WITHDRAW] Saque
│   ├── Select coin
│   ├── Amount + destination
│   ├── Network/method selection
│   └── Confirmation modal
│
├── /deposit                            [SCR-DEPOSIT] Depósito
│   ├── Select coin
│   ├── Network selection
│   └── Address + QR code display
│
├── /history                            [SCR-HISTORY] Histórico de Transações
│   ├── Filter bar (type, period, coin)
│   ├── Transaction list
│   └── /history/:txId                  [SCR-TX-DETAIL] Detalhe da Transação
│
├── /alerts                             [SCR-ALERTS] Gerenciamento de Alertas
│   ├── Active alerts list
│   ├── Create alert (modal/inline)     [SCR-ALERT-CREATE]
│   └── Toggle/delete alerts
│
├── /settings                           [SCR-SETTINGS] Configurações
│   ├── Display currency (BRL/USD/EUR)
│   ├── Theme (dark/light)
│   ├── Notification preferences
│   └── Account info
│
└── /* (catch-all)                      [SCR-404] Página não encontrada
```

## Navigation Structure

### Desktop — Sidebar Navigation
```
┌─────────────────────────────────────────────────┐
│  [Logo]  Crypto Dashboard                       │
│                                                 │
│  ● Dashboard         (icon: home)               │
│  ○ Histórico         (icon: clock)              │
│  ○ Alertas           (icon: bell)               │
│  ○ Configurações     (icon: gear)               │
│                                                 │
│  ─────────────────                              │
│  Quick Actions:                                 │
│  [Converter] [Sacar] [Depositar]                │
└─────────────────────────────────────────────────┘
```

### Mobile — Bottom Navigation Bar
```
┌─────────────────────────────────────┐
│  [Home] [Histórico] [Alertas] [⚙]  │
└─────────────────────────────────────┘
+ Floating Action Button (FAB) para ações rápidas:
  → Converter, Sacar, Depositar
```

## Page Classification

| Route | Auth Required | Type |
|-------|:------------:|------|
| `/dashboard` | ✅ | Main view |
| `/convert` | ✅ | Action view |
| `/withdraw` | ✅ | Action view |
| `/deposit` | ✅ | Action view |
| `/history` | ✅ | List view |
| `/history/:txId` | ✅ | Detail view |
| `/alerts` | ✅ | List + action view |
| `/settings` | ✅ | Settings view |
| `/*` (404) | ❌ | Error view |

## Cross-Links

- **Dashboard** → links diretos para Convert, Withdraw, Deposit (quick actions)
- **Dashboard** → cada coin card pode linkar para Convert pré-preenchido com aquela moeda
- **History** → cada transação linka para TX Detail
- **TX Detail** → botão de voltar para History
- **Alerts** → criar alerta pode ser pré-preenchido ao vir do Dashboard (clicando na moeda)
- **Settings** → link de volta ao Dashboard
- **404** → link para Dashboard
- **Todas as páginas** → navegação global (sidebar/bottom nav)
