# Component Specs — CryptoFolio (Desktop)

## Shared / Reusable Components

---

### CMP-Sidebar

**Used on**: All authenticated screens
**shadcn blocks**: Custom (flex layout)
**Lucide icons**: LayoutDashboard, Wallet, Download, ArrowLeftRight, Upload, Bell, Clock, Settings, HelpCircle, LogOut, User, ChevronDown

**Structure**:
- `w-64 h-screen sticky left-0 top-0 bg-sidebar border-r border-border flex flex-col`
- Header: `h-16 flex items-center px-4 border-b border-border` → Logo
- Nav sections: `flex-1 overflow-y-auto py-4`
  - Section label: `text-xs uppercase tracking-wider text-muted-foreground px-4 mb-2`
  - Nav item: `h-10 mx-2 px-3 rounded-lg flex items-center gap-3 text-sm transition-colors`
    - Active: `bg-sidebar-active text-sidebar-active-foreground font-medium`
    - Inactive: `text-sidebar-foreground hover:bg-accent hover:text-accent-foreground`
  - Badge on Alerts: `w-2 h-2 rounded-full bg-primary absolute top-2 right-2`
- Footer: `flex-shrink-0 border-t border-border p-4`
  - Support link: same as nav item
  - User area: `flex items-center gap-3` → Avatar (w-8 h-8) + name + DropdownMenu

**DropdownMenu items**: Profile (→ /app/settings/profile), Preferences (→ /app/settings/preferences), separator, Logout

---

### CMP-PageHeader

**Used on**: All app pages
**Props**: title (string), subtitle? (string), actions? (ReactNode), breadcrumbs? (array)

**Structure**:
- `flex items-center justify-between mb-6`
- Left: breadcrumbs (if any) above, h1 `text-3xl font-bold text-foreground`
- Right: action buttons

---

### CMP-CoinSelector

**Used on**: SCR-DEPOSIT, SCR-CONVERT, SCR-WITHDRAW, SCR-ALERT-CREATE
**shadcn**: Select, SelectTrigger, SelectContent, SelectItem
**Props**: value, onChange, coins (array), showBalance? (boolean)

**Structure per item**:
- `flex items-center gap-3`
- Coin icon (`w-6 h-6 rounded-full`, real image from `/img/coins/{symbol}.svg`)
- Name + Symbol (`text-sm font-medium` + `text-xs text-muted-foreground`)
- Balance (optional, right-aligned, `text-sm text-muted-foreground`)

**States**: default, open, selected, disabled

---

### CMP-AmountInput

**Used on**: SCR-CONVERT, SCR-WITHDRAW
**shadcn**: Input (customized)
**Props**: value, onChange, currency (string), availableBalance? (number), onUseMax?

**Structure**:
- Input: `text-3xl font-medium text-center bg-input border-border rounded-xl p-4 w-full`
- Below: `text-sm text-muted-foreground` "Saldo disponível: {balance} {symbol}"
- "Usar máximo" link: `text-primary text-sm cursor-pointer hover:underline`

**States**: empty, filled, error (border-destructive + error message below)

**Validation display**: `text-sm text-destructive mt-1`

---

### CMP-StatusBadge

**Used on**: All tables with status column
**shadcn**: Badge
**Props**: status (pending | processing | confirmed | failed | cancelled)

**Variants**:
| Status | Classes |
|--------|---------|
| pending | `bg-warning/10 text-warning border border-warning/20` |
| processing | `bg-primary/10 text-primary border border-primary/20 animate-pulse` |
| confirmed | `bg-success/10 text-success border border-success/20` |
| failed | `bg-destructive/10 text-destructive border border-destructive/20` |
| cancelled | `bg-muted text-muted-foreground border border-border` |

---

### CMP-EmptyState

**Used on**: All lists/tables when empty
**Props**: icon (LucideIcon), title (string), description (string), actionLabel? (string), onAction? ()

**Structure**:
- `flex flex-col items-center justify-center py-16 px-8`
- Icon container: `w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4`
- Icon: `w-8 h-8 text-muted-foreground`
- Title: `text-lg font-semibold text-foreground mb-2`
- Description: `text-muted-foreground text-center max-w-sm mb-4`
- CTA Button: `Button variant="default"` (only if actionLabel provided)

---

### CMP-SuccessModal

**Used on**: SCR-DEPOSIT (success), SCR-CONVERT (success), SCR-WITHDRAW (success)
**shadcn**: Dialog, DialogContent
**Props**: title, details (array of {label, value}), onClose, onDownloadReceipt?, primaryAction

**Structure**:
- Dialog `max-w-md`
- Animated check icon: `w-16 h-16 rounded-full bg-success/10` → CheckCircle `text-success`
- Title: `text-xl font-semibold text-foreground mt-4`
- Details card: `bg-muted/50 rounded-lg p-4 mt-4 divide-y divide-border`
  - Each detail: `flex justify-between py-2 text-sm` → label (`text-muted-foreground`) + value (`text-foreground font-medium`)
- Buttons: "Baixar Recibo" (outline) + Primary action (primary)

---

### CMP-ConfirmationModal

**Used on**: SCR-CONVERT, SCR-WITHDRAW, delete actions
**shadcn**: Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter
**Props**: title, description, details? (array), confirmLabel, cancelLabel, variant (default | destructive), onConfirm, onCancel

**Structure**:
- Dialog `max-w-md`
- Title: `text-lg font-semibold`
- Description: `text-muted-foreground`
- Details card (if provided): same as SuccessModal
- Warning text (if destructive): `text-sm text-destructive`
- Footer: Cancel (ghost) + Confirm (primary or destructive)
- Confirm button states: default → loading (spinner + "Processando...") → disabled

---

### CMP-PortfolioChart

**Used on**: SCR-DASHBOARD, SCR-WALLET-DETAIL
**Library**: Recharts (AreaChart)
**Props**: data (array), periods (array), activePeriod, onPeriodChange

**Structure**:
- Period selector: Tabs (`text-sm`) right-aligned
- Chart: AreaChart with gradient fill (amber gradient to transparent)
- Tooltip: `bg-card border-border rounded-lg p-3 shadow-lg`
- X-axis: date labels, Y-axis: BRL values
- Responsive: `ResponsiveContainer width="100%" height={300}`

**States**: loading (skeleton rect), data, empty (hidden)

---

### CMP-TransactionRow

**Used on**: SCR-DASHBOARD (recent), SCR-HISTORY, SCR-WALLET-DETAIL, SCR-DEPOSIT, SCR-CONVERT, SCR-WITHDRAW
**shadcn**: Table components

**Desktop table row**:
- `border-b border-border hover:bg-accent/20 transition-colors h-14 cursor-pointer`
- Type: icon (`w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center`) + label
  - Deposit: `Download` icon (green tint)
  - Conversion: `ArrowLeftRight` icon (amber tint)
  - Withdrawal: `Upload` icon (blue tint)
- Asset: coin icon + name
- Amount: `text-sm font-medium text-foreground`
- Status: CMP-StatusBadge
- Date: `text-sm text-muted-foreground` (relative or absolute)

**Mobile card** (for Artemis reference):
- `p-4 border-b border-border`
- Row 1: Type icon + description (left), amount (right)
- Row 2: Status badge (left), date (right, `text-xs text-muted-foreground`)

---

## Screen-Specific Components

---

### CMP-QRCodeDisplay

**Used on**: SCR-DEPOSIT
**Props**: address (string), coinName (string)

**Structure**:
- QR code image: `w-48 h-48 bg-white p-3 rounded-xl mx-auto` (white bg for QR readability)
- Address: `font-mono text-sm text-foreground bg-muted/50 rounded-lg p-3 break-all`
- Copy button: `Button variant="outline" className="w-full mt-2"` with Copy icon
  - Click: copies address, shows "Copiado!" for 3s, then reverts

---

### CMP-SwapButton

**Used on**: SCR-CONVERT
**Props**: onSwap

**Structure**:
- `mx-auto -my-3 z-10 relative`
- `w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center cursor-pointer hover:bg-accent transition-colors`
- Icon: ArrowUpDown (`w-5 h-5 text-muted-foreground`)

---

### CMP-AlertCard

**Used on**: SCR-ALERTS
**Props**: alert object

**Structure**:
- `bg-card rounded-xl p-4 border border-border`
- Header: `flex items-center justify-between`
  - Left: coin icon + name
  - Right: Edit (Pencil icon, ghost button) + Delete (Trash icon, ghost button)
- Body: type label ("Acima de" / "Abaixo de") + target value (`text-lg font-bold`)
- Footer: "Preço atual: R$ {value}" (`text-sm text-muted-foreground`) + created date

---

### CMP-FAQAccordion

**Used on**: SCR-SUPPORT
**shadcn**: Accordion, AccordionItem, AccordionTrigger, AccordionContent

**Structure per section**:
- Section header: `text-lg font-semibold text-foreground mb-2`
- AccordionItem: `border-b border-border`
  - Trigger: `text-sm font-medium text-foreground py-4 hover:text-primary`
  - Content: `text-sm text-muted-foreground pb-4`

---

### CMP-SettingsNavItem

**Used on**: SCR-SETTINGS
**Props**: label, icon (LucideIcon), href, isActive

**Structure**:
- `flex items-center gap-3 h-10 px-3 rounded-lg text-sm transition-colors`
- Active: `bg-accent text-accent-foreground font-medium`
- Inactive: `text-muted-foreground hover:bg-accent hover:text-accent-foreground`

---

### CMP-BankAccountCard

**Used on**: SCR-SET-BANKS
**Props**: account object, onEdit, onDelete

**Structure**:
- `bg-card rounded-xl p-4 border border-border flex items-center justify-between`
- Left: Bank icon/logo + bank name + masked account details (`text-sm text-muted-foreground`)
- Right: Edit (ghost) + Delete (ghost, text-destructive on hover)

---

### CMP-ToggleRow

**Used on**: SCR-SET-NOTIF
**shadcn**: Switch
**Props**: label, description?, checked, onChange

**Structure**:
- `flex items-center justify-between py-4`
- Left: label (`text-sm font-medium`) + description (`text-xs text-muted-foreground`)
- Right: Switch

---

### CMP-PasswordStrengthBar

**Used on**: SCR-AUTH-SIGNUP, SCR-SET-SECURITY
**Props**: password (string)

**Structure**:
- `h-1.5 rounded-full mt-2` (full width)
- Segments: 3 bars
- Colors: weak → `bg-destructive`, medium → `bg-warning`, strong → `bg-success`
- Label below: "Fraca" / "Média" / "Forte" (`text-xs`)

---

## Modal Specifications

### MDL-ConvertConfirm

**Title**: "Confirmar conversão"
**Size**: `max-w-md`
**Body**:
- From: coin icon + amount + coin name
- Arrow down icon
- To: coin icon + estimated amount + coin name
- Details card: Taxa, Fee, Valor líquido
**Footer**: "Cancelar" (ghost) + "Confirmar conversão" (primary → loading state)

### MDL-WithdrawConfirm

**Title**: "Confirmar saque"
**Size**: `max-w-md`
**Body**:
- Moeda + valor
- Destino (wallet address truncated or bank name)
- Details: Fee, Valor líquido, Tempo estimado
- Warning: "Esta ação não pode ser desfeita." (`text-sm text-destructive`)
**Footer**: "Cancelar" (ghost) + "Confirmar saque" (primary → loading state)

### MDL-AlertCreate

**Title**: "Novo Alerta de Preço" / "Editar Alerta"
**Size**: `max-w-md`
**Body**:
- CoinSelector
- TypeRadio: "Acima de" / "Abaixo de"
- ValueInput (R$)
- Reference: "Preço atual: R$ X.XXX,XX" (`text-sm text-muted-foreground`)
**Footer**: "Cancelar" (ghost) + "Criar Alerta" / "Salvar" (primary)

### MDL-DeleteConfirm

**Title**: "Excluir {entity}?"
**Size**: `max-w-sm`
**Body**: Description text explaining consequences
**Footer**: "Cancelar" (ghost) + "Excluir" (destructive)

### MDL-TransactionDetail

**Title**: "Detalhes da transação"
**Size**: `max-w-md`
**Body**:
- Type badge + status badge (top row)
- Details card:
  - Tipo, Moeda(s), Valor, Fee, Valor líquido
  - Status timeline (dots: Iniciado → Processando → Confirmado)
  - Data e hora
  - TX Hash (if blockchain): `font-mono text-xs` + Copy button
**Footer**: "Baixar Recibo" (outline) + "Fechar" (ghost)

### MDL-AddBankAccount

**Title**: "Adicionar conta bancária" / "Editar conta"
**Size**: `max-w-md`
**Body** (form):
- Bank: Select (major banks list)
- Agency: Input (4 digits)
- Account: Input
- Account Type: RadioGroup (Corrente / Poupança)
- PIX Key: Input
- All required
**Footer**: "Cancelar" (ghost) + "Salvar" (primary)

---

## Toast Specifications

| Type | Icon | Border | Duration |
|------|------|--------|----------|
| Success | CheckCircle (text-success) | `border-l-4 border-success` | 5s |
| Error | XCircle (text-destructive) | `border-l-4 border-destructive` | 8s |
| Warning | AlertTriangle (text-warning) | `border-l-4 border-warning` | 5s |
| Info | Info (text-primary) | `border-l-4 border-primary` | 5s |

**Structure**: `bg-card border border-border rounded-lg shadow-lg p-4 flex items-start gap-3`
- Icon (left), Content (title + description), Close button (X, right)
- Position: `fixed bottom-4 right-4 z-50`

---

## Loading Skeletons

| Context | Structure |
|---------|-----------|
| Portfolio balance | `h-12 w-48 bg-muted animate-pulse rounded-lg` |
| Chart area | `h-[300px] w-full bg-muted animate-pulse rounded-xl` |
| Table row | `h-14 w-full bg-muted animate-pulse rounded-lg` (repeat 5-6x with gap-2) |
| Card | `h-32 w-full bg-muted animate-pulse rounded-xl` |
| Text line | `h-4 w-3/4 bg-muted animate-pulse rounded` |
| Avatar | `w-8 h-8 bg-muted animate-pulse rounded-full` |
