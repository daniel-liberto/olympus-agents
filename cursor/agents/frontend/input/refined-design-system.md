# Design System Unificado — CryptoFolio

## 1. Visão Geral

Este documento é a **fonte única de verdade** para implementação. Ele unifica os design tokens, componentes e padrões definidos por Apollo (Desktop) e Artemis (Mobile) em um sistema coeso e responsivo.

**Stack:** React + Vite + TypeScript + TailwindCSS
**Theme:** Dark mode (único, sem light mode no MVP)
**Font:** Inter (via @fontsource/inter)
**Icons:** Lucide React (stroke 1.5-2px)

---

## 2. Design Tokens Unificados

### 2.1 Cores

```css
:root {
  /* Backgrounds */
  --color-bg-base: #0A0A0F;
  --color-bg-raised: #12121A;
  --color-bg-elevated: #1A1A2E;

  /* Surfaces */
  --color-surface: #1E1E32;
  --color-surface-muted: #25253D;

  /* Accent */
  --color-accent: #6C5CE7;
  --color-accent-hover: #7B6CF0;
  --color-accent-active: #5A4BD4;
  --color-accent-soft: #A29BFE;

  /* Semantic */
  --color-success: #00D68F;
  --color-error: #FF6B6B;
  --color-warning: #FFD93D;

  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #8B8BA3;
  --color-text-muted: #5A5A7A;

  /* Border */
  --color-border: #2A2A45;

  /* Overlay */
  --color-overlay: rgba(10, 10, 15, 0.72);
  --color-glow-accent: rgba(108, 92, 231, 0.15);
}
```

### 2.2 Tailwind Config

```js
// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { base: "#0A0A0F", raised: "#12121A", elevated: "#1A1A2E" },
        surface: { DEFAULT: "#1E1E32", muted: "#25253D" },
        accent: { DEFAULT: "#6C5CE7", hover: "#7B6CF0", active: "#5A4BD4", soft: "#A29BFE" },
        success: "#00D68F",
        error: "#FF6B6B",
        warning: "#FFD93D",
        content: { primary: "#FFFFFF", secondary: "#8B8BA3", muted: "#5A5A7A" },
        border: "#2A2A45",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        glow: "0 0 24px rgba(108, 92, 231, 0.15)",
        "glow-strong": "0 0 32px rgba(162, 155, 254, 0.2)",
        modal: "0 12px 40px rgba(0, 0, 0, 0.55)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      animation: {
        "skeleton-pulse": "skeleton-pulse 1.5s ease-in-out infinite",
        "slide-up": "slide-up 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        "slide-down": "slide-down 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        "fade-in": "fade-in 200ms ease-out",
      },
      keyframes: {
        "skeleton-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
```

### 2.3 Typography

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `text-xs` | 12px | 400 | Captions, meta |
| `text-sm` | 14px | 400-500 | Labels, hints |
| `text-base` | 16px | 400 | Body text |
| `text-lg` | 18px | 600 | Card titles |
| `text-xl` | 20px | 600 | Section titles |
| `text-2xl` | 24px | 600 | Page subtitles |
| `text-3xl` | 30px | 700 | Page titles, mobile balance |
| `text-4xl` | 36px | 700 | Desktop balance |

### 2.4 Spacing

Base unit: 4px. Usar escala padrão do Tailwind (1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px, 16=64px).

### 2.5 Z-Index

| Layer | Value | Uso |
|-------|-------|-----|
| Base | 0 | Conteúdo normal |
| Sticky | 10 | SearchBar sticky, header |
| Sidebar | 20 | NavigationSidebar |
| FAB | 30 | Floating action button |
| BottomNav | 30 | Bottom navigation bar |
| Backdrop | 40 | Modal/sheet backdrop |
| Modal | 50 | Modals e bottom sheets |
| Toast | 60 | Toast notifications |

---

## 3. Breakpoints e Layout

### 3.1 Breakpoints

| Nome | Valor | Tipo |
|------|-------|------|
| `xs` | 320px | Small phone |
| `sm` | 375px | Standard phone |
| `md` | 428px | Large phone |
| `lg` | 768px | Tablet / switch point |
| `xl` | 1024px | Small desktop |
| `2xl` | 1280px | Medium desktop |
| `3xl` | 1440px | Large desktop |

### 3.2 Layout por Breakpoint

| Breakpoint | Navigation | Layout | Content Max-Width |
|------------|------------|--------|-------------------|
| < 768px | Bottom nav (4 tabs) | Single column, full width | 100% - 32px padding |
| 768px-1023px | Bottom nav | Single column | 720px centered |
| ≥ 1024px | Sidebar (240px) | Sidebar + main | 1200px |

### 3.3 Grid

- **Mobile:** Single column, gap-4 (16px)
- **Tablet:** Single column ou 2 colunas para CoinCards
- **Desktop:** Sidebar (240px fixed) + main content (12-col grid, gap-6)
- **CoinCard grid:** 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)

---

## 4. Componentes Unificados

### 4.1 Regra Universal de Touch

Todos os elementos interativos devem ter área de toque mínima de **44x44px**, usando padding ou `min-h-11 min-w-11` quando necessário.

### 4.2 Componentes Responsivos

| Componente | Mobile | Desktop |
|------------|--------|---------|
| Navigation | BottomNavBar (56px + safe area) | NavigationSidebar (240px) |
| CoinSelector | Bottom sheet com busca | Dropdown popover |
| Modal (não-destrutivo) | Bottom sheet com drag handle | Dialog centralizado |
| Modal (destrutivo) | Dialog centralizado | Dialog centralizado |
| CoinCard | Full-width card, tap expand | Grid card, hover glow |
| Button (primary) | Full-width, min-h-12 (48px) | Auto-width, min-h-10 (40px) |
| Toast | Top, full-width | Top-right corner |
| SearchBar | Sticky below balance | Inline in dashboard header |
| AlertCard delete | Swipe left | Hover reveal delete button |

### 4.3 File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Toggle.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── EmptyState.tsx
│   │   └── StepIndicator.tsx
│   ├── forms/
│   │   ├── AmountInput.tsx
│   │   ├── CoinSelector.tsx
│   │   └── SearchBar.tsx
│   ├── cards/
│   │   ├── BalanceCard.tsx
│   │   ├── CoinCard.tsx
│   │   └── AlertCard.tsx
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── NavigationSidebar.tsx
│   │   └── BottomNavBar.tsx
│   └── convert/
│       └── ConversionPreview.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Convert.tsx
│   ├── Withdraw.tsx
│   ├── Alerts.tsx
│   └── Settings.tsx
├── hooks/
│   ├── useMediaQuery.ts
│   ├── useToast.ts
│   └── useMockData.ts
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
└── App.tsx
```

---

## 5. Padrões de Interação

### 5.1 Feedback Pattern

| Ação | Feedback | Componente |
|------|----------|------------|
| Hover (desktop) | Background lighten + glow | CSS transition 150ms |
| Press (mobile) | Scale 0.98 + opacity 0.9 | `active:scale-[0.98]` |
| Loading | Skeleton screens | Skeleton component |
| Success | Toast + modal de sucesso | Toast + Modal |
| Error | Inline message + toast | Inline error + Toast |
| Empty | Ilustração + CTA | EmptyState component |

### 5.2 Motion Guidelines

- Transições de interação: **150ms** ease
- Modais/sheets: **300ms** cubic-bezier(0.2, 0.8, 0.2, 1)
- Skeleton pulse: **1.5s** infinite ease-in-out
- Respeitar `prefers-reduced-motion`: trocar animações por fade simples

### 5.3 Acessibilidade

- Contraste mínimo WCAG AA para texto primário em todas as superfícies
- Focus ring visível em todos os interativos: `ring-2 ring-accent/40 ring-offset-2 ring-offset-bg-base`
- Labels obrigatórios em todos os form controls
- Modais com focus trap e restauração de foco
- Suporte a navegação por teclado completa
- `aria-live` em toasts para screen readers
