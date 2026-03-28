# Visual Audit — Crypto Wallet Dashboard (Hephaestus)

**Scope:** Apollo (desktop) and Artemis (mobile) deliverables aligned for **final-specs.md**.  
**Product:** Crypto Wallet Dashboard (dark-first, BRL, zinc / amber / emerald / red).

---

## Screen Inventory Audit

Verification that **all** product screens appear in both platform specs (layouts + components) with consistent routes and IDs.

| # | Screen ID | Route / surface | Role | Status |
|---|-----------|-----------------|------|--------|
| 1 | **SCR-HOME** | `/dashboard` | Dashboard | ✅ |
| 2 | **SCR-CONVERT** | `/convert` | Conversion | ✅ |
| 3 | **SCR-WITHDRAW** | `/withdraw` | Withdrawal | ✅ |
| 4 | **SCR-DEPOSIT** | `/deposit` | Deposit | ✅ |
| 5 | **SCR-HISTORY** | `/history` | Transaction History | ✅ |
| 6 | **SCR-TX-DETAIL** | `/history/:txId` | Transaction Detail | ✅ |
| 7 | **SCR-ALERTS** | `/alerts` | Alerts | ✅ |
| 8 | **SCR-ALERT-CREATE** | modal / sheet (e.g. `/alerts/new`) | Create Alert | ✅ |
| 9 | **SCR-SETTINGS** | `/settings` | Settings | ✅ |
| 10 | **SCR-404** | `*` (catch-all) | Not Found | ✅ |
| 11 | **SCR-EMPTY** | `/dashboard` (empty portfolio variant) | Empty Dashboard | ✅ |

**Finding:** The full set of **11** screen IDs is represented in Apollo’s desktop layouts / component index and Artemis’s mobile layouts / mobile components. **SCR-EMPTY** shares `/dashboard` with **SCR-HOME**; implementation must branch on portfolio-empty vs populated data (documented below).

---

## Apollo ↔ Artemis component ID mapping (naming alignment)

Apollo uses **`CMP-*`**; Artemis uses **`CMP-*-Mobile`** (or explicit mobile-only IDs). **Both naming schemes are kept**; frontend maps shared behavior by table below.

| Apollo (desktop) | Artemis (mobile) | Notes |
|------------------|------------------|--------|
| CMP-Sidebar | CMP-BottomTabBar-Mobile | Nav chrome; 4 primary destinations |
| CMP-PortfolioSummaryCard | CMP-PortfolioStatCard-Mobile | Stats; desktop cards vs horizontal snap strip |
| CMP-CoinListTable | CMP-CoinCardList-Mobile | Holdings list |
| CMP-QuickSearchInput | CMP-SearchBar-Mobile | Coin search |
| CMP-QuickActionCard | CMP-FABSpeedDial-Mobile | 3 quick actions (Convert, Withdraw, Deposit) |
| CMP-ConversionForm | CMP-ConversionForm-Mobile | Full flow; selectors as Dialog vs Sheet |
| CMP-CoinSelector | CMP-CoinSelectorSheet-Mobile | Vaul sheet on mobile |
| CMP-ConfirmConversionModal | CMP-ConfirmConversionSheet-Mobile | Confirm UI |
| CMP-WithdrawalForm | CMP-WithdrawalForm-Mobile | Full-screen stack on mobile |
| CMP-ConfirmWithdrawalModal | CMP-ConfirmWithdrawalSheet-Mobile | Confirm UI |
| CMP-DepositView | CMP-DepositView-Mobile | Deposit + QR |
| CMP-TransactionTable | CMP-TransactionCardList-Mobile | History list |
| CMP-TransactionFilters | CMP-FilterChips-Mobile | Filters |
| CMP-TransactionDetail | CMP-TransactionDetail-Mobile | Detail |
| CMP-AlertList | CMP-AlertCardList-Mobile | Alerts |
| CMP-CreateAlertModal | CMP-CreateAlertSheet-Mobile | Create alert |
| CMP-SettingsForm | CMP-SettingsList-Mobile | Settings groups |

**Mobile-only (Artemis):** e.g. `CMP-SwipeRow-Mobile`, `CMP-PullToRefresh-Mobile`, `CMP-KeyboardAwareFooter-Mobile`, `CMP-FilterChipBar-Mobile` — QA against **gesture-specs.md** only below `lg`.

---

## Audit items (Problem → Resolution → Impact on final-specs.md)

### Issue #1: Component naming across Apollo and Artemis

- **Problem:** Identifiers differ (`CMP-` vs `CMP-*-Mobile`), which risks duplicated implementations or broken traceability from specs to code.
- **Resolution:** Maintain **both** conventions: Apollo keeps `CMP-*`; Artemis keeps `CMP-*-Mobile`. Use the mapping table above in engineering docs; shared logic hooks on **screen ID + data contract**, not on string equality of component names.
- **Impact on final-specs.md:** Include the mapping table (or a condensed version) and a rule that **cross-platform parity** is defined by **SCR-*** and **route**, not by a single component name.

---

### Issue #2: Design token consistency (zinc, amber, emerald, red)

- **Problem:** Desktop `design-tokens.md` is the full HSL/CSS-variable source of truth; mobile states “identical variable names” but designers could still drift in raw Tailwind usage (e.g. mixing `zinc-500` vs `--muted-foreground`).
- **Resolution:** **Unify** in **`refined-design-system.md`**: single canonical palette — **zinc-only neutrals**, **amber** primary/focus, **emerald** success/up, **red** destructive/down; same `--ring`, `--price-up`, `--price-down`, `--badge-*` semantics as Apollo. Mobile inherits the same CSS variables; no alternate “mobile palette.”
- **Impact on final-specs.md:** Lock **one** token set for both platforms; state that **Artemis references Apollo tokens** with no semantic divergence.

---

### Issue #3: Navigation parity (sidebar + quick actions vs tabs + FAB)

- **Problem:** Desktop exposes **4 nav items** + **3 quick actions**; mobile exposes **4 tabs** + **FAB** with **3** actions. Routes must match 1:1 without orphan screens.
- **Resolution:** Confirm **same destinations**: Home `/dashboard`, History `/history`, Alerts `/alerts`, Settings `/settings`; quick actions / FAB: `/convert`, `/withdraw`, `/deposit`. Document **FAB hidden** on full-screen flows (convert, withdraw, deposit, tx detail, alert create, 404) per Artemis; sidebar always shows quick actions on desktop.
- **Impact on final-specs.md:** Add a **navigation matrix** (destination → desktop control → mobile control) so routing and analytics stay aligned.

---

### Issue #4: Dialog (desktop) vs Sheet (mobile) for confirmations and selectors

- **Problem:** Apollo specifies **Radix Dialog** for confirmations and inline/step flows; Artemis uses **Vaul `Drawer`** for confirmations, coin pickers, and filters. Without explicit guidance, responsive builds might render the wrong primitive at the wrong breakpoint.
- **Resolution:** **Platform-conditional rendering:** **`lg` (1024px) and up** → `Dialog` / modal patterns; **below `lg`** → Vaul bottom **Sheet** for the same logical steps (confirm conversion, confirm withdrawal, create alert, coin/network selection). Share **one** copy and validation model; only the container changes.
- **Impact on final-specs.md:** Specify **breakpoint-driven** shell components and list which flows are **Dialog vs Sheet** by platform.

---

### Issue #5: CoinListTable vs CoinCardList (responsive data parity)

- **Problem:** Desktop uses **table** semantics (sortable headers, row actions); mobile uses **cards**. Data and actions must not diverge.
- **Resolution:** **Same data source and actions**; switch layout at **`lg` (1024px)**: `CMP-CoinListTable` above `lg`, `CMP-CoinCardList-Mobile` below. Optional: table gains horizontal scroll on narrow desktop without switching to cards until `<lg`.
- **Impact on final-specs.md:** Define the **`lg`** breakpoint as the **list layout switch** and require **feature parity** (search, row actions, 24h badge) across both.

---

### Issue #6: Empty states for all lists and primary surfaces

- **Problem:** Empty UX is easy to ship inconsistently (e.g. history empty vs alerts empty vs empty portfolio).
- **Resolution:** **Per-screen empty behavior:** **SCR-EMPTY** / **SCR-HOME** — no coins: illustration + **Deposit** CTA; **SCR-HISTORY** — `CMP-EmptyState` “no transactions”; **SCR-ALERTS** — “create first alert”; **SCR-HOME** alert highlights card — compact empty + link to `/alerts`; **convert/withdraw** — zero balance **Alert** + Deposit path. Tables/lists use **CMP-EmptyState** variants from desktop specs where applicable.
- **Impact on final-specs.md:** Add an **empty-state matrix** (screen → condition → CTA → route).

---

### Issue #7: Loading states and skeleton patterns

- **Problem:** Both platforms use **Skeleton** but without a single list of **which regions** skeleton (stats, table rows, chart, alert list) per screen, loaders may flicker or jump layout.
- **Resolution:** **Unified skeleton specs:** fixed **min-heights** for stat cards / table header / first N rows; chart block skeleton; mobile **horizontal stat strip** skeleton heights matching `CMP-PortfolioStatCard-Mobile`; **page-level** skeleton for **SCR-TX-DETAIL** on fetch. Align **shimmer** with `--muted` / zinc-800 surfaces.
- **Impact on final-specs.md:** Include a **skeleton checklist** per **SCR-*** ID and reference shared **skeleton primitives** (no ad-hoc spinners except buttons).

---

### Issue #8: Form patterns — desktop inline vs mobile full-screen + sticky footer

- **Problem:** Desktop forms live in **main column Cards** with actions inline or in **Dialog**; mobile uses **full-screen stack**, **bottom sheets** for pickers, and **CMP-KeyboardAwareFooter-Mobile** for primary CTA.
- **Resolution:** Document **responsive form behavior:** ≥`lg` — **inline** primary steps, optional two-column summary; `<lg` — **scroll body** + **sticky footer** primary; sheets for selectors; **same fields and validation order**. Keyboard: hide bottom tab bar when keyboard open on mobile (per mobile layouts).
- **Impact on final-specs.md:** State **one** field order and validation rules; **layout shell** differs by breakpoint only.

---

### Issue #9: History / activity — dashboard vs SCR-HISTORY

- **Problem:** Stakeholders may expect a global “activity feed” on the dashboard; specs split **portfolio** (home) vs **transaction history** (dedicated screen).
- **Resolution:** **Clarify product intent:** **SCR-HOME** is **portfolio-focused** (totals, top coins, price changes, alert **highlights** only). Full **transaction log** and filters live on **SCR-HISTORY** only. No duplicate full activity feed on dashboard.
- **Impact on final-specs.md:** Explicitly state **dashboard ≠ activity feed**; link users to **SCR-HISTORY** for complete history.

---

### Issue #10: User profile and settings entry points

- **Problem:** Desktop **sidebar** shows **avatar + name + email** with **dropdown** (profile placeholder, sign out). Mobile **Home** shows **avatar in app bar** → **Settings** (no separate profile screen in scope).
- **Resolution:** Document **both paths:** desktop — **sidebar user block** + dropdown; mobile — **avatar → SCR-SETTINGS**. **Settings** holds theme, notifications, currency, etc., on both platforms. Profile “placeholder” on desktop should not imply a route that mobile lacks—keep **parity via Settings** until a profile screen exists.
- **Impact on final-specs.md:** **User account** subsection: desktop sidebar vs mobile app bar; single **Settings** destination.

---

### Issue #11: Accessibility (focus, keyboard, contrast)

- **Problem:** Dark zinc UI needs explicit **focus**, **keyboard order**, and **WCAG AA** verification for text/icons.
- **Resolution:** **Focus rings** use **`--ring`** (amber-500 / primary); **keyboard**: skip order matches visual order, sidebar/nav first, main landmark, dialogs trap focus; **contrast**: primary text on `zinc-950`/`zinc-900`, muted `zinc-400`+ on dark backgrounds; destructive/success actions use token pairs (`--destructive-foreground`, etc.). Provide **per-component a11y checklist** (label, aria, role, live regions for toasts).
- **Impact on final-specs.md:** Add **Accessibility** section with **checklist per CMP** (or per pattern family: tables, dialogs, sheets, FAB).

---

### Issue #12: Gesture specifications — mobile-only scope

- **Problem:** **gesture-specs.md** (pull-to-refresh, swipe rows, long-press, edge back) could be misapplied to desktop or to wide tablet layouts.
- **Resolution:** Gestures apply only where **`viewport < lg` (1024px)** — i.e. **Artemis / mobile QA**. Desktop Apollo: **no** pull-to-refresh, **no** swipe-row affordances as primary actions; use buttons/menus. **Edge swipe back** applies to **stack screens** on mobile only.
- **Impact on final-specs.md:** State **“Gestures: see gesture-specs.md; mobile breakpoint `<lg` only.”**

---

### Issue #13: SCR-EMPTY vs SCR-HOME on the same route

- **Problem:** **SCR-EMPTY** and **SCR-HOME** both use **`/dashboard`**, which can confuse routing, analytics, and empty-state detection.
- **Resolution:** Treat as **one route, two UI modes**: if `portfolio.assets.length === 0` (or equivalent), render **SCR-EMPTY** layout; else **SCR-HOME**. Optional query `?empty=1` for QA. Same tab/shell behavior on mobile.
- **Impact on final-specs.md:** Document **conditional rendering** on `/dashboard` and shared **deep links** behavior.

---

### Issue #14: Transaction detail presentation (desktop vs mobile)

- **Problem:** Desktop may use **panel / modal / inline detail** patterns; mobile uses **stack push** for **SCR-TX-DETAIL**. Breadcrumbs on desktop vs **back** on mobile must carry the same labels.
- **Resolution:** **Same fields** on detail; desktop uses **breadcrumb** `History → Transaction`; mobile uses **back** + title. Invalid `txId` → **SCR-404** on both (per mobile component states).
- **Impact on final-specs.md:** Single **transaction detail field list** with **navigation chrome** noted per platform.

---

## Summary for downstream agents

| Theme | Action |
|--------|--------|
| Naming | Keep **CMP-** and **CMP-*-Mobile**; use mapping table. |
| Tokens | Single **refined-design-system.md** + Apollo CSS variables. |
| Nav | Four primary routes + three actions, matched desktop ↔ mobile. |
| Overlays | **Dialog** ≥`lg`, **Sheet** `<lg` for same flows. |
| Lists | **Table** vs **cards** at **`lg`**; same data. |
| Empty / load / a11y | Matrices + skeleton + checklist in **final-specs.md**. |
| Scope | Dashboard **portfolio**; history on **SCR-HISTORY**; gestures **mobile only**. |

---

*Hephaestus (UI/UX Refiner) — visual audit complete. Next consumer: **final-specs.md** (frontend implementation).*
