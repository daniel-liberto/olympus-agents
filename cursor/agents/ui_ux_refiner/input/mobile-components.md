# Mobile Components — CryptoFolio

## ID Mapping Table (Apollo Desktop → Artemis Mobile)

| Apollo Component ID | Mobile Variant ID | Notes |
|---------------------|-------------------|-------|
| CMP-Sidebar | CMP-MobileDrawer | Off-canvas drawer, same nav structure |
| CMP-PageHeader | CMP-MobileAppBar | Simplified: back + title + actions |
| CMP-CoinSelector | CMP-CoinSelector-Mobile | Same Select, full-width, larger touch targets |
| CMP-AmountInput | CMP-AmountInput-Mobile | inputmode="decimal", larger text |
| CMP-StatusBadge | CMP-StatusBadge | Shared — identical on mobile |
| CMP-EmptyState | CMP-EmptyState-Mobile | Smaller icon (w-12), full-width CTA |
| CMP-SuccessModal | CMP-SuccessSheet | Vaul bottom sheet, snap 70% |
| CMP-ConfirmationModal | CMP-ConfirmSheet | Vaul bottom sheet, snap 50% |
| CMP-PortfolioChart | CMP-PortfolioChart-Mobile | Reduced height (h-48), same Recharts |
| CMP-TransactionRow | CMP-TransactionCard | Card layout instead of table row |
| CMP-QRCodeDisplay | CMP-QRCodeDisplay-Mobile | Smaller QR (w-40), full-width copy button |
| CMP-SwapButton | CMP-SwapButton | Shared — identical |
| CMP-AlertCard | CMP-AlertCard-Mobile | Full-width, overflow menu instead of inline buttons |
| CMP-FAQAccordion | CMP-FAQAccordion | Shared — 44px min touch targets |
| CMP-SettingsNavItem | CMP-SettingsListItem | Full-width row with chevron |
| CMP-BankAccountCard | CMP-BankAccountCard-Mobile | Swipe-to-delete support |
| CMP-ToggleRow | CMP-ToggleRow | Shared — full-width |
| CMP-PasswordStrengthBar | CMP-PasswordStrengthBar | Shared — identical |
| — | CMP-BottomTabBar | Mobile-only component |
| — | CMP-MobileFilterChip | Mobile-only: filter chips for history |
| — | CMP-SwipeRow | Mobile-only: swipeable list rows |

---

## Mobile-Only Components

### CMP-BottomTabBar

**Used on**: All authenticated tab root screens
**shadcn**: Custom

**Structure**:
- `fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border`
- `h-16 pb-[env(safe-area-inset-bottom)]`
- `flex items-center justify-around`

**Tab item**:
- `flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[64px] min-h-[44px]`
- Icon: `w-5 h-5`
- Label: `text-xs`
- Active: `text-primary` + `bg-primary/10 rounded-full px-3 py-1` around icon
- Inactive: `text-muted-foreground`

**States**: default, active, badge (notification dot)
**Events**: tap → navigate to tab route

---

### CMP-MobileDrawer

**Used on**: All authenticated screens (via hamburger)
**shadcn**: Sheet (side="left")

**Structure**:
- Trigger: hamburger icon in app bar
- Overlay: `fixed inset-0 bg-black/50 z-40`
- Drawer: `fixed left-0 top-0 w-[280px] h-screen z-50 bg-background`
- Same nav sections as desktop sidebar
- Close: tap overlay, X button, swipe left (threshold: 30% of drawer width)

---

### CMP-MobileAppBar

**Used on**: All authenticated screens
**Props**: title, showBack?, actions? (ReactNode), showHamburger?

**Structure**:
- `sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border`
- `h-14 pt-[env(safe-area-inset-top)] flex items-center px-4`
- Left: back button (ChevronLeft, 44x44 touch target) OR hamburger (Menu icon)
- Center: title (`text-lg font-semibold truncate`)
- Right: action buttons (each 44x44 min)

---

### CMP-TransactionCard

**Used on**: SCR-DASHBOARD, SCR-HISTORY, SCR-WALLET-DETAIL, SCR-DEPOSIT, SCR-CONVERT, SCR-WITHDRAW
**Replaces**: CMP-TransactionRow (desktop table row)

**Structure**:
- `p-4 border-b border-border active:bg-accent/10 transition-colors`
- Row 1 (`flex items-center justify-between`):
  - Left: Type icon (`w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center`) + description stack (title `text-sm font-medium`, subtitle `text-xs text-muted-foreground`)
  - Right: amount (`text-sm font-medium text-foreground`)
- Row 2 (`flex items-center justify-between mt-1`):
  - Left: StatusBadge
  - Right: date (`text-xs text-muted-foreground`)

**Events**: tap → open transaction detail sheet

---

### CMP-MobileFilterChip

**Used on**: SCR-HISTORY
**Props**: label, isActive, onPress

**Structure**:
- `h-8 px-3 rounded-full border text-xs font-medium flex items-center gap-1`
- Active: `bg-primary/10 border-primary/20 text-primary`
- Inactive: `bg-muted border-border text-muted-foreground`
- Tap → open bottom sheet with filter options

---

### CMP-SwipeRow

**Used on**: SCR-SET-BANKS (swipe to delete)
**Library**: Custom gesture handler or CSS transform

**Structure**:
- Normal state: full-width card content
- Swipe left (threshold 30%): reveals red delete button (`bg-destructive text-white`)
  - Further swipe (60%): auto-triggers delete confirmation sheet
- Swipe right: disabled (no action)

**Delete confirmation**: CMP-ConfirmSheet with destructive variant

---

## Bottom Sheet Specifications (Vaul Drawer)

### CMP-SuccessSheet

**Used on**: Post-deposit, post-convert, post-withdraw success
**Snap points**: [0.7] (70% of viewport)
**Drag handle**: visible, `w-10 h-1 bg-muted rounded-full mx-auto mb-4`

**Content**:
- Animated check icon (same as desktop CMP-SuccessModal)
- Title, details card, action buttons
- "Baixar Recibo" (outline, w-full) + Primary action (primary, w-full)

---

### CMP-ConfirmSheet

**Used on**: Convert confirm, Withdraw confirm, Delete actions
**Snap points**: [0.5] (50%), or [0.3] for simple confirmations
**Drag handle**: visible

**Content**:
- Title, description, details card (if applicable)
- Warning text (if destructive)
- Buttons: "Cancelar" (w-full, ghost) + "Confirmar" (w-full, primary or destructive)
- Button height: `h-12` for easy thumb tap

---

### CMP-AlertCreateSheet

**Used on**: SCR-ALERTS (create/edit)
**Snap points**: [0.7]

**Content**:
- Title: "Novo Alerta" / "Editar Alerta"
- CoinSelector (full-width)
- Type selector: segmented control "Acima de" / "Abaixo de"
- Value input (inputmode="decimal")
- Current price reference
- Buttons: "Cancelar" + "Criar" / "Salvar" (w-full each)

---

### CMP-TransactionDetailSheet

**Used on**: SCR-HISTORY, transaction taps
**Snap points**: [0.8]

**Content**: Same as desktop MDL-TransactionDetail, adapted to full-width layout

---

### CMP-FilterSheet

**Used on**: SCR-HISTORY (filter selection)
**Snap points**: [0.5]

**Content**: List of options with radio/checkbox selection, "Aplicar" button at bottom

---

### CMP-BankAccountSheet

**Used on**: SCR-SET-BANKS (add/edit)
**Snap points**: [0.8]

**Content**: Bank form (same fields as desktop), full-width inputs, sticky submit button

---

## Form Specifications (Mobile Additions)

### All Forms

- **Input height**: `h-12` minimum (48px touch target)
- **Label**: always visible above field, `text-sm font-medium text-foreground`
- **Placeholder**: supplement only, never sole label
- **Validation**: inline below field, `text-xs text-destructive`
- **Focus**: auto-scroll focused field above keyboard
- **Sticky submit**: forms with primary action → sticky footer bar (`fixed bottom-0 w-full p-4 bg-background border-t border-border`)
- **Keyboard dismiss**: tap outside input or scroll dismiss

### Input Types

| Field | inputmode | autocomplete |
|-------|-----------|-------------|
| Email | `email` | `email` |
| Password | `text` (with show/hide) | `current-password` / `new-password` |
| Name | `text` | `name` |
| Amount (crypto) | `decimal` | `off` |
| Amount (BRL) | `decimal` | `off` |
| Wallet address | `text` | `off` |
| Bank agency | `numeric` | `off` |
| Bank account | `numeric` | `off` |
| PIX key | `text` | `off` |
| Search | `search` | `off` |

---

## Coordination Notes for Hephaestus

### Token Alignment

All CSS variable tokens must remain identical between desktop and mobile:
- `--background`, `--foreground`, `--card`, `--card-foreground`
- `--border`, `--input`, `--ring`
- `--muted`, `--muted-foreground`
- `--primary`, `--primary-foreground`
- `--destructive`, `--success`, `--warning`
- All chart colors

### Mobile-Only Additions

- `--safe-area-top`, `--safe-area-bottom` (env values)
- Bottom tab bar height: 64px + safe area
- App bar height: 56px + safe area

### Breakpoint Strategy

- Mobile: `< 1024px` (default, mobile-first)
- Desktop: `lg:` (1024px+)
- Tables hidden on mobile: `hidden lg:block` (desktop table)
- Cards hidden on desktop: `lg:hidden` (mobile cards)
- Sidebar: `hidden lg:flex` (desktop) / drawer (mobile)
- Bottom tabs: `lg:hidden` (mobile only)
