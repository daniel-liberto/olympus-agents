# CryptoFolio — Reusable Component Specifications (Desktop)

**Stack:** React + Vite + TypeScript + TailwindCSS  
**Theme:** Dark (default)  
**Audience:** Engineers implementing UI; QA defining test cases for states and variants.

**Convention:** Each component lists **name**, **description**, **variants**, **states**, and **props** (TypeScript-oriented). Hover/focus/active apply to interactive components; **disabled** and **loading** override pointer events where noted.

---

## BalanceCard

**Description:** Prominent summary of total portfolio value (and optional 24h change). Primary hero on Dashboard.

**Variants**

| Variant | Use |
|---------|-----|
| `default` | Standard portfolio total |
| `compact` | Denser height when vertical space is tight (optional future) |
| `loading` | Skeleton placeholder for value line |

**States**

| State | Visual |
|-------|--------|
| Default | Surface background, large balance typography, secondary sublabels |
| Hover | Entire card optional subtle lift (`shadow`) — subtle on dark |
| Active | N/A (non-clickable) or if whole card is clickable: pressed scale 0.99 |
| Disabled | Reduced opacity if used in gated context |
| Loading | `Skeleton` for amount and change row |
| Error | Inline error text or retry link if balance fetch fails |

**Props**

```ts
interface BalanceCardProps {
  totalLabel?: string;           // default: "Total balance"
  totalFormatted: string;       // e.g. "$12,345.67"
  changePercent?: number | null;
  changeLabel?: string;         // e.g. "24h"
  fiatCurrency?: string;
  onRetry?: () => void;         // error state
  className?: string;
}
```

---

## CoinCard

**Description:** One asset row/cell in the Dashboard grid: icon, symbol, balance, fiat value, mini trend or sparkline placeholder.

**Variants**

| Variant | Use |
|---------|-----|
| `default` | Grid tile |
| `list` | Optional single-column list variant (shared styles) |

**States**

| State | Visual |
|-------|--------|
| Default | Resting card surface, border token |
| Hover | Border brightens; optional accent glow (see design-tokens) |
| Active | Pressed: slight inset or darker surface |
| Disabled | Not used for holdings; omit or gray out if asset frozen |
| Loading | `Skeleton` rectangle for icon and two text lines |
| Error | Subtle warning icon + “—” for value |

**Props**

```ts
interface CoinCardProps {
  symbol: string;
  name: string;
  iconUrl?: string;
  balanceCrypto: string;
  balanceFiat: string;
  changePercent?: number | null;
  onClick?: () => void;        // navigate to detail if added
  className?: string;
}
```

---

## SearchBar

**Description:** Filter coin list by symbol or name; clear affordance; optional keyboard shortcut hint.

**Variants**

| Variant | Use |
|---------|-----|
| `default` | Full-width input with leading search icon |
| `compact` | Smaller height for dense layouts |

**States**

| State | Visual |
|-------|--------|
| Default | Neutral border |
| Hover | Border slightly lighter |
| Active / Focus | Ring using accent (`ring-2 ring-primary/40`), caret visible |
| Disabled | Muted bg, no focus |
| Loading | Optional trailing spinner when debounced search hits network |
| Error | Red border + message below |

**Props**

```ts
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  onClear?: () => void;
  className?: string;
}
```

---

## CoinSelector

**Description:** Dropdown or combobox to pick a cryptocurrency (Convert, alerts, etc.). Shows icon + symbol + name.

**Variants**

| Variant | Use |
|---------|-----|
| `dropdown` | Click to open list in popover |
| `searchable` | Typeahead inside popover for long lists |

**States**

| State | Visual |
|-------|--------|
| Default | Closed trigger showing current selection |
| Hover | Trigger border/glow |
| Active / Focus | Open list; focus trap in popover |
| Open | Elevated panel, scrollable list, keyboard nav |
| Disabled | Muted, `pointer-events-none` |
| Loading | Skeleton in trigger or spinner in list |
| Error | Inline message + retry |

**Props**

```ts
interface CoinOption {
  id: string;
  symbol: string;
  name: string;
  iconUrl?: string;
}

interface CoinSelectorProps {
  value: CoinOption | null;
  options: CoinOption[];
  onChange: (option: CoinOption) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  searchable?: boolean;
  className?: string;
}
```

---

## AmountInput

**Description:** Numeric entry for crypto or fiat amounts with optional “MAX” action and suffix.

**Variants**

| Variant | Use |
|---------|-----|
| `crypto` | Suffix shows asset symbol |
| `fiat` | Prefix/suffix currency |

**States**

| State | Visual |
|-------|--------|
| Default | Empty or numeric |
| Hover | Border highlight |
| Active / Focus | Ring; numeric keypad friendly on touch (mobile concern) |
| Disabled | Muted |
| Loading | Read-only with spinner when quoting |
| Error | Red border + helper text (insufficient balance, min/max) |

**Props**

```ts
interface AmountInputProps {
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  prefix?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onMax?: () => void;
  maxLabel?: string;
  className?: string;
}
```

---

## ConversionPreview

**Description:** Read-only summary block: exchange rate, fees, estimated receive, refresh timestamp.

**Variants**

| Variant | Use |
|---------|-----|
| `default` | Stacked rows |
| `compact` | Single line + expand |

**States**

| State | Visual |
|-------|--------|
| Default | Static text |
| Hover | N/A |
| Active | N/A |
| Disabled | Muted when inputs incomplete |
| Loading | Skeleton lines or shimmer |
| Error | Warning color + “Rate unavailable” + retry |

**Props**

```ts
interface ConversionPreviewProps {
  fromSymbol: string;
  toSymbol: string;
  rate?: string;
  fee?: string;
  receiveAmount?: string;
  updatedAt?: Date | string;
  isLoading?: boolean;
  error?: string;
  onRefresh?: () => void;
  className?: string;
}
```

---

## StepIndicator

**Description:** Horizontal steps for Withdraw (and reusable wizards). Shows current, completed, upcoming.

**Variants**

| Variant | Use |
|---------|-----|
| `numbered` | 1 · 2 · 3 with labels |
| `icons` | Optional icon per step (future) |

**States**

| State | Visual |
|-------|--------|
| Default | Current step accent; completed check or filled circle; upcoming muted |
| Hover | Step only if clickable (optional jump-back) |
| Active | Current step emphasized |
| Disabled | Future steps non-interactive in strict linear flow |
| Loading | Current step shows small spinner |
| Error | Current step error ring if validation fails |

**Props**

```ts
interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentIndex: number;
  completedThrough?: number;
  allowClickPrevious?: boolean;
  onStepClick?: (index: number) => void;
  className?: string;
}
```

---

## AlertCard

**Description:** One alert: coin, condition, threshold, enabled toggle, delete.

**Variants**

| Variant | Use |
|---------|-----|
| `default` | Full card |
| `dense` | Tighter padding for two-column grids |

**States**

| State | Visual |
|-------|--------|
| Default | Neutral surface |
| Hover | Elevated shadow/border |
| Active | Press feedback on row (if clickable) |
| Disabled | Whole card muted when global killswitch |
| Loading | Toggle disabled + spinner on toggle only |
| Error | Banner on card if sync failed |

**Props**

```ts
interface AlertCardProps {
  symbol: string;
  name: string;
  iconUrl?: string;
  condition: "above" | "below";
  thresholdFormatted: string;
  enabled: boolean;
  onToggle: (next: boolean) => void;
  onDelete: () => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}
```

---

## Modal

**Description:** Overlay dialogs: **confirm** (destructive/neutral), **success**, **error**. Centered, focus-trapped, ESC and backdrop click to dismiss where allowed.

**Variants**

| Variant | Use |
|---------|-----|
| `confirm` | Title, body, Cancel + Confirm (danger for delete) |
| `success` | Check icon, message, primary OK |
| `error` | Error icon, message, Retry or OK |

**States**

| State | Visual |
|-------|--------|
| Default | Open, content visible |
| Hover | Button hover states inside |
| Active | Button active |
| Disabled | Confirm disabled until checkbox (e.g. legal) |
| Loading | Primary shows spinner, disabled |
| Error | Inline error in body (e.g. API message) |

**Props**

```ts
type ModalVariant = "confirm" | "success" | "error";

interface ModalProps {
  variant: ModalVariant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  confirmVariant?: "primary" | "danger";
  isLoading?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
}
```

---

## Toast

**Description:** Short-lived feedback (success, error, info) in a corner stack; auto-dismiss.

**Variants**

| Variant | Use |
|---------|-----|
| `success` | Green accent icon/text |
| `error` | Error color |
| `info` | Primary/muted |
| `warning` | Warning token |

**States**

| State | Visual |
|-------|--------|
| Default | Enter animation (slide + fade) |
| Hover | Pause auto-dismiss |
| Active | N/A |
| Disabled | N/A |
| Loading | Optional progress bar for long operations |
| Error | Same as error variant |

**Props**

```ts
interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info" | "warning";
  durationMs?: number;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
}
```

---

## Button

**Description:** Primary actions, secondary actions, and destructive actions. Supports icons and full width.

**Variants**

| Variant | Use |
|---------|-----|
| `primary` | Main CTA (Convert, Confirm) |
| `secondary` | Cancel, back, less emphasis |
| `danger` | Destructive confirm, delete |

**States**

| State | Visual |
|-------|--------|
| Default | Filled or outline per variant |
| Hover | Lighter/darker fill; outline brightens |
| Active | Scale down slightly or darker |
| Disabled | Opacity ~50%, `cursor-not-allowed` |
| Loading | Spinner replaces label; `aria-busy` |
| Error | Optional red ring if submission failed |

**Props**

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
```

---

## Toggle

**Description:** Binary on/off (alert enabled, setting).

**Variants**

| Variant | Use |
|---------|-----|
| `default` | Standard switch |
| `compact` | Smaller track (dense tables) |

**States**

| State | Visual |
|-------|--------|
| Default | Off = muted track; On = accent fill |
| Hover | Ring or brighter track |
| Active | Thumb pressed offset |
| Disabled | Gray, no interaction |
| Loading | Thumb static + spinner near label |
| Error | Red outline + helper text |

**Props**

```ts
interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  description?: string;
  id?: string;
}
```

---

## EmptyState

**Description:** Friendly empty view when no coins, no alerts, or no search results.

**Variants**

| Variant | Use |
|---------|-----|
| `no-data` | Generic |
| `no-results` | Search/filter |
| `error` | Failed load with retry |

**States**

| State | Visual |
|-------|--------|
| Default | Illustration/icon + title + description + optional CTA |
| Hover | CTA button only |
| Active | CTA active |
| Disabled | CTA disabled |
| Loading | Rare; usually swap to Skeleton instead |
| Error | Same as error variant messaging |

**Props**

```ts
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  variant?: "no-data" | "no-results" | "error";
  className?: string;
}
```

---

## Skeleton

**Description:** Loading placeholders for cards, list rows, text lines. Dark theme: elevated gray blocks with pulse or shimmer.

**Variants**

| Variant | Use |
|---------|-----|
| `text` | Lines |
| `circle` | Avatar/icon |
| `rect` | Card blocks |
| `coinCard` | Preset matching CoinCard layout |

**States**

| State | Visual |
|-------|--------|
| Default | Pulse animation |
| Hover | N/A |
| Active | N/A |
| Disabled | Static (no animation) for reduced motion |
| Loading | Same as default |
| Error | N/A — replace with error UI |

**Props**

```ts
interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
  animate?: boolean;
}
```

---

## NavigationSidebar

**Description:** Persistent left navigation for desktop: logo, nav links (Dashboard, Convert, Withdraw, Alerts, Settings), optional footer (help, logout).

**Variants**

| Variant | Use |
|---------|-----|
| `expanded` | Full labels (default desktop) |
| `collapsed` | Icon-only — optional future; not required v1 |

**States**

| State | Visual |
|-------|--------|
| Default | Active route: accent bar or bg pill |
| Hover | Nav item bg highlight |
| Active | Current page persistent style |
| Disabled | Item grayed (coming soon) |
| Loading | Optional skeleton for user block |
| Error | Banner at bottom of sidebar |

**Props**

```ts
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface NavigationSidebarProps {
  items: NavItem[];
  activePath: string;
  footer?: React.ReactNode;
  className?: string;
}
```

---

## Cross-component accessibility

- **Focus visible:** All interactive components use consistent `focus-visible` ring (accent).
- **Reduced motion:** Prefer opacity transitions over large motion; honor `prefers-reduced-motion`.
- **Labels:** Form controls always have associated labels or `aria-label`.
- **Modals:** Initial focus on primary action or heading; restore focus on close.

---

## File organization (suggested)

```
src/components/
  balance/BalanceCard.tsx
  coin/CoinCard.tsx
  forms/AmountInput.tsx
  forms/CoinSelector.tsx
  forms/SearchBar.tsx
  convert/ConversionPreview.tsx
  withdraw/StepIndicator.tsx
  alerts/AlertCard.tsx
  feedback/Modal.tsx
  feedback/Toast.tsx
  primitives/Button.tsx
  primitives/Toggle.tsx
  primitives/Skeleton.tsx
  layout/EmptyState.tsx
  layout/NavigationSidebar.tsx
```
