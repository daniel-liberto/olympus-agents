# Crypto Wallet Dashboard — Refined Design System

**Single source of truth** merging Apollo (desktop) and Artemis (mobile) into one coherent system.

**Stack:** React · Vite · TypeScript · Tailwind CSS · shadcn/ui · Lucide icons  
**Theme:** Dark-first. All neutrals use **zinc** (never `gray`).

---

## 1. Color System (HSL CSS Variables)

Neutrals are **zinc**-aligned. Primary accent is **amber** for CTAs. Semantic colors align with Tailwind’s emerald / red conventions.

### 1.1 Core tokens (`:root`)

```css
:root {
  --background: 240 10% 3.9%;        /* zinc-950 — page bg */
  --foreground: 0 0% 98%;            /* zinc-50 — primary text */
  --card: 240 10% 9%;                /* zinc-900 — cards, sidebar */
  --card-foreground: 0 0% 98%;       /* zinc-50 */
  --popover: 240 10% 9%;             /* zinc-900 */
  --popover-foreground: 0 0% 98%;    /* zinc-50 */
  --primary: 38 92% 50%;             /* amber-500 — CTAs */
  --primary-foreground: 240 10% 3.9%; /* zinc-950 */
  --secondary: 240 5.9% 15%;         /* zinc-800 */
  --secondary-foreground: 0 0% 98%;  /* zinc-50 */
  --muted: 240 5.9% 15%;             /* zinc-800 */
  --muted-foreground: 240 5% 64.9%;  /* zinc-400 */
  --accent: 240 5.9% 15%;            /* zinc-800 */
  --accent-foreground: 0 0% 98%;     /* zinc-50 */
  --destructive: 0 84.2% 60.2%;      /* red-500 */
  --destructive-foreground: 0 0% 98%;
  --success: 160 84% 39.4%;          /* emerald-500 */
  --success-foreground: 0 0% 98%;
  --border: 240 5.9% 15%;            /* zinc-800 */
  --input: 240 5.9% 15%;             /* zinc-800 */
  --ring: 38 92% 50%;                /* amber-500 */
  --radius: 0.75rem;
}
```

### 1.2 Variable → usage mapping

| Token | Typical usage |
|--------|----------------|
| `--background` | **Page canvas** — main app background behind all regions. |
| `--foreground` | **Primary text** — headings, body, labels on default surfaces. |
| `--card` | **Elevated surfaces** — cards, **desktop sidebar** panel, dropdown/sheet surfaces that read as “on top” of the page. |
| `--card-foreground` | Text and icons on `--card` surfaces. |
| `--popover` | **Popover, dropdown, autocomplete** panels — match card elevation for consistency. |
| `--popover-foreground` | Content on popover surfaces. |
| `--primary` | **Primary CTAs** — Send, Confirm, Connect wallet, main actions. |
| `--primary-foreground` | Text/icons on primary buttons and primary-filled chips. |
| `--secondary` | **Secondary actions** — less prominent buttons, grouped controls. |
| `--secondary-foreground` | Text on secondary surfaces. |
| `--muted` | **Muted fills** — table header strip, inactive tab track, subtle input backgrounds when needed. |
| `--muted-foreground` | **Secondary text** — captions, helper text, timestamps, column labels. |
| `--accent` | **Hover / selected row** — list/table row hover, selectable tile hover (pairs with transparency in UI). |
| `--accent-foreground` | Text on accented/hover states. |
| `--destructive` | **Destructive actions** — disconnect, delete, irreversible sends. |
| `--destructive-foreground` | Text on destructive buttons. |
| `--success` | **Success states** — confirmed tx, copied address, positive feedback. |
| `--success-foreground` | Text on success surfaces (e.g. solid success buttons). |
| `--border` | **Default borders** — card edges, dividers, input borders (rest state). |
| `--input` | **Input chrome** — same as border for form controls. |
| `--ring` | **Focus ring** — keyboard focus, focus-visible; aligns with amber CTA emphasis. |
| `--radius` | **Base radius** — shadcn defaults; components may override (see §4). |

**Implementation notes**

- **Table row hover:** `bg-zinc-800/50` or `hsl(var(--accent) / 0.5)` — subtle lift without competing with `--card`.
- **Sidebar bg (desktop):** use `--card` (zinc-900) so sidebar reads as a persistent elevated rail.
- **Sticky headers / subbars:** `--card` or `--muted` depending on hierarchy; border with `--border`.

### 1.3 Domain-specific tokens (crypto)

Add alongside core tokens for portfolio and transaction UI:

```css
:root {
  --price-up: 160 84% 39.4%;         /* emerald-500 — positive Δ */
  --price-down: 0 84.2% 60.2%;       /* red-500 — negative Δ */
  --badge-pending: 38 92% 50%;       /* amber-500 — pending / in-flight */
  --badge-confirmed: 160 84% 39.4%; /* emerald-500 — confirmed / success */
  --badge-failed: 0 84.2% 60.2%;    /* red-500 — failed / error */
}
```

| Token | Usage |
|--------|--------|
| `--price-up` | Positive price change, P&amp;L up, inflow indicators. Use with `tabular-nums`. |
| `--price-down` | Negative price change, P&amp;L down, outflow indicators. |
| `--badge-pending` | Tx pending, awaiting confirmations, “processing” states. |
| `--badge-confirmed` | Tx confirmed, network finality reached. |
| `--badge-failed` | Tx failed, rejected, or reverted. |

**Tailwind usage:** map in `tailwind.config` as `hsl(var(--price-up) / <alpha>)` etc., or use arbitrary values `text-[hsl(var(--price-up))]`.

---

## 2. Typography

| Role | Font | Size | Weight | Line height / tracking |
|------|------|------|--------|-------------------------|
| **Sans (UI)** | Inter | — | — | Default stack for all UI copy. |
| **Mono (data)** | JetBrains Mono | — | — | Addresses, hashes, raw amounts, seed phrase slots (when applicable). |

### 2.1 Type scale

| Element | Size | Weight | Notes |
|---------|------|--------|--------|
| **h1** | `2.25rem` (36px) | bold (`700`) | `leading-tight` — page titles, wallet overview hero. |
| **h2** | `1.875rem` (30px) | semibold (`600`) | Section titles. |
| **h3** | `1.5rem` (24px) | semibold (`600`) | Card titles, panel headings. |
| **h4** | `1.25rem` (20px) | medium (`500`) | Subsections, list group titles. |
| **body** | `1rem` (16px) | normal (`400`) | Default paragraph and form labels. |
| **small** | `0.875rem` (14px) | normal | Secondary labels, table metadata. |
| **xs** | `0.75rem` (12px) | normal | Captions, legal microcopy, badge text. |

### 2.2 Financial data

- Apply **`tabular-nums`** to balances, prices, percentages, and fiat equivalents so digits align in tables and cards.
- Prefer **mono** for truncated addresses (`0x1234…5678`) and full hashes in detail views.

---

## 3. Spacing & Layout

| Concept | Value |
|---------|--------|
| **Base unit** | `4px` — Tailwind default (`1` = 4px). |
| **Content padding** | `p-4` mobile · `p-6` desktop |
| **Section gaps** | `space-y-4` mobile · `space-y-6` desktop |
| **Sidebar (desktop)** | `w-64` (256px); **hidden** on mobile |
| **Bottom nav (mobile)** | `h-14` (56px) + **safe-area** inset; **hidden** on desktop |
| **Content max-width** | `max-w-7xl` — centered main column where applicable |
| **Breakpoints** | `sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px |

**Layout shell**

- **Desktop:** fixed sidebar (`--card`) + scrollable main (`--background`) with `max-w-7xl` inner container and horizontal padding.
- **Mobile:** full-width main + fixed bottom nav; reserve bottom padding `pb-[calc(3.5rem+env(safe-area-inset-bottom))]` on scrollable content.

---

## 4. Radii & Shadows

| Surface | Radius | Tailwind |
|---------|--------|------------|
| **Cards** | `rounded-xl` | `12px` at default scale |
| **Buttons** | `rounded-lg` | — |
| **Inputs** | `rounded-lg` | — |
| **Badges** | `rounded-full` | — |

**Shadows:** Use **zinc-tinted** elevation — `shadow-sm`, `shadow-md`, `shadow-lg` with neutral dark bias (avoid warm shadows). Prefer subtle elevation on modals, floating FABs (if any), and sticky headers. Cards on `--background` may use `shadow-sm` or rely on border only for a flatter dashboard look.

---

## 5. Borders & Dividers

| Level | Token / class | Use |
|-------|----------------|-----|
| **Default** | `border-zinc-800` / `border` → `hsl(var(--border))` | Cards, inputs, tables, sidebar edge. |
| **Subtle** | `border-zinc-700` | Dividers inside dense panels, nested regions. |

**Separator:** Use shadcn **Separator** for section splits (horizontal under headings, vertical in toolbars). Color: `bg-border` or `border-border` for theme consistency.

---

## 6. Component Specifications (shadcn/ui)

Conventions below assume Tailwind + `class-variance-authority` patterns from shadcn. Lucide for all icons.

### 6.1 Button

**Variants**

| Variant | Visual | Use |
|---------|--------|-----|
| **default** | Amber fill (`bg-primary`, `text-primary-foreground`) | Primary CTAs |
| **secondary** | Zinc-800 fill (`bg-secondary`) | Secondary actions |
| **outline** | Border `border`, bg transparent | Tertiary, crowded toolbars |
| **ghost** | No border, hover `accent` | Icon-only, nav items |
| **destructive** | Red fill | Irreversible / dangerous |
| **link** | Underline / text primary | Inline actions in copy |

**Sizes:** `sm` · `default` · `lg` · `icon` (square, min touch target on mobile ≥ 44px for `icon` and `default` where primary).

**Radius:** `rounded-lg`.

---

### 6.2 Card

**Structure:** `Card` → `CardHeader` · `CardTitle` · `CardDescription` · `CardContent` · `CardFooter`

| Part | Role |
|------|------|
| **CardHeader** | Title row; optional action slot (top-right). |
| **CardTitle** | h3/h4 semantic heading. |
| **CardDescription** | Muted subtitle (`text-muted-foreground`). |
| **CardContent** | Primary body — lists, charts, forms. |
| **CardFooter** | Actions or summary row. |

**Padding:** `p-4` mobile · `p-6` desktop (apply to Card or inner wrapper consistently).  
**Radius:** `rounded-xl`. **Border:** `border-border`.

---

### 6.3 Input

**States**

| State | Behavior |
|-------|----------|
| **default** | `border-input`, focus ring `ring-ring`. |
| **error** | `ring-2 ring-red-500` (or `ring-destructive`), `border-destructive`; paired with **FormMessage**. |
| **disabled** | `disabled:opacity-50`, `disabled:cursor-not-allowed`. |

**Pattern:** Label (small/medium) + **Input** + **FormMessage** (error) from `react-hook-form` + shadcn Form.

**Radius:** `rounded-lg`.

---

### 6.4 Select

- Default **Select** for short lists.
- **Coin / token selector:** use **Combobox** pattern (Popover + Command) for **search**, recent assets, and chain filter — required for long token lists.

---

### 6.5 Table

| Area | Specification |
|------|----------------|
| **Header** | `bg-zinc-900` (`bg-card` / muted strip), `text-muted-foreground`, `text-xs` or `small` uppercase optional. |
| **Row hover** | `hover:bg-zinc-800/50` |
| **Cell** | `py-3 px-4`; numbers `text-right tabular-nums`. |
| **Border** | Row dividers `border-border`. |

On **mobile**, swap to **card list** (same data; see §7).

---

### 6.6 Badge

| Variant | Use |
|---------|-----|
| **default** | Neutral status (`bg-zinc-800` / secondary text) |
| **success** | Confirmed, synced (`emerald`) |
| **warning** | Pending, attention (`amber`) |
| **destructive** | Failed, error (`red`) |
| **outline** | Low emphasis, filter chips |

Domain mapping: align **warning** with `--badge-pending`, **success** with `--badge-confirmed`, **destructive** with `--badge-failed`.

**Shape:** `rounded-full`. **Text:** `xs` or `small`.

---

### 6.7 Dialog

**Sizes:** `sm` · `md` · `lg` — max-width constraints (`max-w-sm` / `md` / `lg`).

**Anatomy:** **Title** + **Description** + body + **footer** (primary / secondary actions, right-aligned on desktop).

**Use for:** confirmations, short forms, destructive ack — on **desktop** prefer centered dialog.

---

### 6.8 Sheet

- **Desktop:** **side** sheet (right default for details; left optional for filters).
- **Mobile:** **bottom** sheet via **Vaul** — same content as dialog where appropriate; **snap points** (e.g. `0.5`, `0.9`, `1`) for tx detail and token pickers.

Same **title / description / footer** patterns as Dialog.

---

### 6.9 Tabs

- **Default** shadcn tabs: list in `bg-muted/50` or border-bottom track.
- **Active indicator:** bottom border or pill using `bg-background` + `text-foreground`; inactive `text-muted-foreground`.
- Use for **dashboard subsections** (Overview / Activity / NFTs) without full page reload.

---

### 6.10 Avatar

**Sizes:** `sm` · `md` · `lg` — map to `h-8 w-8`, `h-10 w-10`, `h-12 w-12` (adjust if design tokens demand).

**Fallback:** initials from wallet label or token symbol (2 chars max), `bg-muted`, `text-muted-foreground`.

**Asset avatars:** token logos with rounded-full or rounded-md per asset guidelines.

---

### 6.11 Toast (Sonner or shadcn Toast)

| Type | Use |
|------|-----|
| **success** | Copy address, tx submitted, saved settings |
| **error** | RPC error, validation, failed tx |
| **warning** | Network switch suggested, high slippage |
| **info** | Neutral system messages |

**Duration:** ~**4s** auto-dismiss; errors may persist until dismissed.

---

## 7. Cross-Platform Notes

| Pattern | Desktop (Apollo) | Mobile (Artemis) |
|---------|------------------|------------------|
| **Primary nav** | **Sidebar** `w-64`, destinations as vertical list | **Bottom nav** `h-14` + safe area; **same routes/labels** |
| **Modal content** | **Dialog** centered | **Sheet** bottom (Vaul); **same fields and copy** |
| **Dense data** | **Table** with hover rows | **Card list** — one row per tx/asset; **same columns as data** |
| **Forms** | Actions **inline** in footer or toolbar | **Sticky footer** with primary CTA; scroll form body |
| **Touch** | Click targets per desktop norms | **Min 44×44px** for taps (buttons, nav, icon hits) |

**Shared across platforms**

- Button hierarchy (primary amber → secondary → outline/ghost).
- Card structure, badge semantics, form field patterns.
- **Color tokens** and domain badges (`--price-up`, `--price-down`, tx states).
- Typography scale and **tabular numerals** for money.

---

*Hephaestus — UI/UX Refiner. Merged Apollo + Artemis into one dark-first, zinc-based system for React + Vite + TypeScript + Tailwind + shadcn/ui + Lucide.*
