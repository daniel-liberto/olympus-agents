# Especificações Finais para Implementação — CryptoFolio

## Instruções para Poseidon (Frontend Developer)

Este documento contém tudo que você precisa para implementar o CryptoFolio. Siga estas specs como fonte única de verdade.

---

## 1. Setup do Projeto

```bash
npm create vite@latest cryptofolio -- --template react-ts
cd cryptofolio
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom lucide-react
npm install @fontsource/inter
```

### 1.1 Estrutura de Pastas

```
src/
├── components/
│   ├── ui/          # Primitivos reutilizáveis
│   ├── forms/       # Inputs e seletores
│   ├── cards/       # Cards de dados
│   ├── layout/      # Layout e navegação
│   └── convert/     # Específicos de conversão
├── pages/           # Páginas/rotas
├── hooks/           # Custom hooks
├── data/            # Mock data
├── types/           # TypeScript types
├── lib/             # Utilities
└── App.tsx
```

---

## 2. Rotas

```tsx
// App.tsx routes
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/convert" element={<Convert />} />
  <Route path="/withdraw" element={<Withdraw />} />
  <Route path="/alerts" element={<Alerts />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
```

---

## 3. Layout Principal

### 3.1 AppLayout

```
Desktop (≥1024px):
┌──────────┬────────────────────────────────┐
│          │                                │
│ Sidebar  │         Main Content           │
│ (240px)  │     (max-w: 1200px, centered)  │
│          │                                │
│          │                                │
└──────────┴────────────────────────────────┘

Mobile (<1024px):
┌────────────────────────────────┐
│           Header (56px)        │
├────────────────────────────────┤
│                                │
│         Main Content           │
│      (full width, px-4)       │
│                                │
├────────────────────────────────┤
│     Bottom Nav (56px+safe)     │
└────────────────────────────────┘
```

### 3.2 NavigationSidebar (desktop only)
- Width: 240px, fixed left
- Background: bg-bg-raised
- Items: Dashboard (LayoutDashboard), Converter (ArrowLeftRight), Sacar (ArrowUpFromLine), Alertas (Bell), Config (Settings)
- Active item: bg-accent/10 com accent bar left
- Logo/brand no topo

### 3.3 BottomNavBar (mobile only)
- Height: 56px + safe-area-inset-bottom
- Background: bg-bg-raised, border-top border-border
- Items: 4 tabs (Dashboard, Converter, Sacar, Alertas)
- Active: icon filled + text accent color
- Inactive: icon outline + text-content-muted

---

## 4. Páginas — Specs de Implementação

### 4.1 Dashboard (`/`)

**Layout:**
- BalanceCard (full width)
- SearchBar (sticky on mobile, inline on desktop)
- Quick Actions: 2 botões (Converter, Sacar) — row no desktop, full-width stacked mobile
- CoinCard grid: 1 col mobile → 2 col tablet → 3 col desktop

**Dados mock:**
```ts
const portfolio = {
  totalBalance: 45230.00,
  totalChange: 2.3,
  coins: [
    { symbol: "BTC", name: "Bitcoin", balance: 0.5, value: 32500, change: 3.2, icon: "bitcoin" },
    { symbol: "ETH", name: "Ethereum", balance: 4.2, value: 8400, change: -1.5, icon: "ethereum" },
    { symbol: "SOL", name: "Solana", balance: 25, value: 2500, change: 5.8, icon: "solana" },
    { symbol: "ADA", name: "Cardano", balance: 3000, value: 1200, change: -0.3, icon: "cardano" },
    { symbol: "DOT", name: "Polkadot", balance: 50, value: 630, change: 1.1, icon: "polkadot" },
  ]
};
```

**BalanceCard:**
- Background: gradient (#1E1E32 → #25253D) com borda accent/20
- Saldo: text-4xl font-bold (desktop), text-3xl (mobile)
- Variação: badge com bg-success/10 text-success ou bg-error/10 text-error
- Padding: p-6 (desktop), p-4 (mobile)

**CoinCard:**
- Background: bg-surface, border border-border, rounded-lg
- Hover (desktop): shadow-glow, border-accent/30
- Active (mobile): scale-[0.98] opacity-90
- Conteúdo: ícone (32-40px) | nome + símbolo | valor fiat | variação %
- Tap (mobile): expande detalhes

**SearchBar:**
- Input com ícone Search à esquerda
- Placeholder: "Buscar moeda..."
- Debounce: 300ms
- Clear button (X) quando tem texto

### 4.2 Convert (`/convert`)

**Layout:**
- Form card centralizado (max-w-lg)
- Padding: p-6

**Componentes:**
1. CoinSelector "De" — com saldo disponível abaixo
2. Botão swap (ícone ArrowUpDown) entre os seletores
3. CoinSelector "Para"
4. AmountInput — com botão "MAX"
5. ConversionPreview — rate, fee, receive amount (aparece quando campos preenchidos)
6. Button "Converter" — primary, full-width mobile

**Fluxo de confirmação:**
1. Click "Converter" → Modal confirm (resumo da conversão)
2. Click "Confirmar" → Loading 1.5s → Modal success
3. Modal success → botão "Voltar ao Dashboard"

### 4.3 Withdraw (`/withdraw`)

**Layout:**
- StepIndicator no topo (3 steps: Moeda e Valor → Destino → Revisão)
- Um step por vez, com transição

**Step 1 — Moeda e Valor:**
- CoinSelector
- Saldo disponível display
- AmountInput com botão "Usar tudo"
- Button "Próximo"

**Step 2 — Destino:**
- Toggle: Carteira Crypto / Conta Bancária
- Se crypto: input endereço + select rede
- Se fiat: inputs banco, agência, conta
- Button "Próximo" + "Voltar"

**Step 3 — Revisão:**
- Card resumo: moeda, valor, destino, taxa, valor final
- Button "Confirmar Saque" + "Voltar"

**Confirmação:** Loading 2s → Success screen com status "Processando"

### 4.4 Alerts (`/alerts`)

**Layout:**
- Lista de AlertCards (full-width)
- FAB ou botão "Novo Alerta" no topo

**AlertCard:**
- Ícone moeda | Nome | Tipo (↑ subir / ↓ descer) | Limiar (%) | Toggle ativo/inativo
- Mobile: swipe left para delete
- Desktop: botão delete no hover

**Criar Alerta (modal/sheet):**
- CoinSelector
- Toggle tipo: Subir / Descer
- Input porcentagem (limiar)
- Button "Criar Alerta"

**Empty State:** ícone Bell grande + "Nenhum alerta configurado" + CTA "Criar primeiro alerta"

### 4.5 Settings (`/settings`)

**Layout:**
- Lista de configurações simples
- Moeda padrão: select [BRL, USD, EUR]
- Seção "Sobre": versão do app

---

## 5. Mock Data e Simulações

### 5.1 Simulação de Loading
- Dashboard: 800ms delay inicial com skeleton
- Conversão: 500ms debounce para preview, 1.5s para executar
- Saque: 2s para processar

### 5.2 Simulação de Alertas
- Timer que varia preços das moedas a cada 10s
- Quando variação ultrapassa limiar de um alerta ativo → dispara toast

### 5.3 Formatação de Números
```ts
// Fiat
const formatFiat = (value: number, currency = "BRL") =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);

// Crypto
const formatCrypto = (value: number, symbol: string) =>
  `${value.toFixed(8).replace(/\.?0+$/, "")} ${symbol}`;

// Percentage
const formatPercent = (value: number) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
```

---

## 6. Acessibilidade (WCAG AA)

- Todo input com `<label>` associado
- Modais com `role="dialog"`, `aria-modal="true"`, focus trap
- Toasts com `aria-live="polite"`
- Botões com texto descritivo (não apenas ícones)
- Focus ring visível: `focus-visible:ring-2 focus-visible:ring-accent/40`
- Skip link no topo
- `prefers-reduced-motion`: substituir animações por fade
- Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande

---

## 7. Performance Targets

- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Bundle size: < 200KB gzipped (sem lazy loading), meta < 150KB com code splitting
