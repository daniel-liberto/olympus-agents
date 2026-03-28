# Product Strategy — Crypto Wallet Dashboard

**Product:** Web-based crypto wallet dashboard for non-technical users  
**Stack:** React, Vite, TypeScript, Tailwind CSS  
**Assumptions:** User is always treated as logged in; all balances, quotes, and history are **mocked** (no real blockchain or exchange integration).  
**Theme:** Dark by default; responsive layouts for mobile and desktop.  
**Supported assets:** BTC, ETH, BNB, SOL, ADA, USDT, USDC  
**Default display fiat:** BRL (Brazilian Real)

---

## 1. Vision & Outcomes

### Vision

Give everyday holders a **calm, trustworthy surface** to see what they own, move value when they need to (convert, deposit, withdraw), and stay informed (price alerts, history)—without exchange jargon, dense tables, or trading complexity.

### Success looks like

**For users**

- **Clarity at a glance:** Within seconds on **SCR-HOME**, the user understands total portfolio value in BRL, how each asset moved in the last 24 hours, and where to tap next (Convert, Withdraw, Deposit).
- **Confidence in actions:** Convert and withdraw flows feel **predictable**: amounts, fees, and what will happen are visible **before** confirmation; success or failure is obvious afterward.
- **Low cognitive load:** Primary paths use plain language; advanced detail (network, confirmations, fee breakdown) appears only when relevant (**progressive disclosure**).
- **Consistent reassurance:** Loading, empty, and error states behave the same way across screens so the product feels **one system**, not a collection of pages.

**For delivery (Apollo desktop, Artemis mobile)**

- A single **MVP slice** ships all listed screens and core flows with mocked data, enabling demo, usability testing, and future API swap without redesigning information architecture.
- **Screen IDs** (`SCR-HOME`, `SCR-CONVERT`, etc.) and domain terms in the **Glossary** stay stable so specs, components, and copy do not drift between breakpoints.

**Measurable outcomes (demo / QA)**

- User can complete: view dashboard → convert → see updated mock balance → open transaction detail → create price alert → adjust setting → find transaction in history—without dead ends or unexplained errors.
- No screen ships without defined behavior for **loading**, **empty**, **error**, and **success** feedback aligned with **Global Patterns** below.

---

## 2. MVP vs Later

### Single-phase MVP (ship together)

One release contains the full **mocked** experience below. “MVP” here means *scope boundary*, not a stripped-down subset: everything listed is required for the first shippable version.

| Area | MVP scope |
|------|------------|
| **Shell & navigation** | Dark-first UI; primary nav to Dashboard, Convert, Withdraw, Deposit, History, Alerts, Settings; responsive layout (mobile + desktop). |
| **SCR-HOME** | Portfolio summary in BRL, per-asset rows (supported coins), 24h change, quick search/filter for assets, shortcuts to Convert / Withdraw / Deposit. |
| **SCR-CONVERT** | From/to asset selection (from supported list), amount, live quote (mocked), fee display, invert pair, review step, confirm, success/error feedback. |
| **SCR-WITHDRAW** | Asset, amount, destination (address or account field per design), available balance, fee estimate, network/method where applicable, confirm, feedback. |
| **SCR-DEPOSIT** | Asset selection, deposit instructions (address + QR placeholder as UI), copy address, network selector, confirmations notice. |
| **SCR-HISTORY** | Filterable list of mock transactions; tap row → **SCR-TX-DETAIL**. |
| **SCR-TX-DETAIL** | Full mock transaction metadata (type, assets, amounts, status, timestamps, ids). |
| **SCR-ALERTS** | List alerts; toggle active/inactive; navigation to create. |
| **SCR-ALERT-CREATE** | Create alert for an asset (e.g. threshold or % move—mocked rules), validation, save. |
| **SCR-SETTINGS** | Preferences that affect UI copy or display (e.g. fiat display, notifications toggles for demo); all persisted client-side or in mock layer. |
| **SCR-404** | Friendly not found; link home. |
| **SCR-EMPTY** | Reusable empty state pattern where a feature has no data (see Global Patterns). |

**Explicitly in MVP:** No real authentication UI (session is assumed). **Mocked** rates, balances, and history.

### Future (post-MVP)

| Item | Rationale |
|------|-----------|
| Real authentication (sign-up, login, 2FA, session expiry) | Out of scope for current front-end contract. |
| Live market data and execution (exchange / custodian APIs) | Replace mock services; UX patterns (confirm, error handling) should remain. |
| Advanced trading (limit orders, margin, derivatives) | Conflicts with non-technical positioning. |
| Multi-chain address books, whitelists, hardware wallet flows | Security and compliance depth beyond current demo. |
| Push notifications, email/SMS alerts | Requires backend; in-app toasts/banners only in MVP. |
| Native mobile apps | Web responsive only in MVP. |
| Full localization beyond copy hooks | English-first implementation; BRL as default fiat display. |
| Tax reporting exports | Regulatory and data model complexity. |

---

## 3. Principles

### Simplicity first

- **One primary action per screen** where possible (e.g. on Convert: complete the conversion; secondary: cancel, learn more).
- **Plain language** over trader slang: “Convert” not “Swap”; “Withdraw” not “Off-ramp” unless Settings exposes an alternative term for power users.
- **Numbers are formatted**: BRL with sensible decimals; crypto with clear asset ticker; avoid raw wei or excessive precision in default views.

### Progressive disclosure

- **Dashboard:** Summary first; optional drill-down to transaction or asset detail.
- **Convert / Withdraw:** Show fee and total impact before the final confirm step; do not hide fees behind extra clicks on the primary path.
- **Deposit:** Surface network and confirmation expectations **on the deposit screen**, not only in legal-style footnotes.
- **Settings:** Keep dangerous or rare options (if any) behind clear sections—not on the home screen.

### Dark-first design

- Default theme is **dark** for the entire app shell and content areas.
- Maintain **readable contrast** for primary text, secondary labels, and semantic colors (gain/loss, success, error).
- **Accent color** use is restrained: reserve strong color for primary CTAs and critical status (success, error, destructive).

### Trust & safety (UX-only in MVP)

- **Human-readable summaries** on confirmation modals for Convert and Withdraw (what goes out, what arrives, fees).
- **Destructive or irreversible-feeling actions** always use a confirmation pattern and clear labels (see Global Patterns).
- **Mock disclaimer** (short, non-alarming): where appropriate in Deposit/Withdraw, remind users that MVP uses simulated data—wording can live in Settings or footer as a single consistent string.

### Consistency across breakpoints

- **Same mental model** on mobile and desktop: feature parity; layout adapts (e.g. bottom nav vs sidebar) without changing flow order or naming.
- **Apollo and Artemis** align on **Glossary** terms, **screen IDs**, and **global patterns** so components can be shared or mirrored with minimal divergence.

---

## 4. Priorities (build order)

Order optimizes **vertical slices** early (navigation + home + one transaction type end-to-end), then fills remaining flows and cross-cutting polish.

1. **App shell & routing** — Layout, dark theme tokens, route map for all `SCR-*` screens, 404 route.
2. **SCR-HOME (Dashboard)** — Portfolio header, asset list, search/filter, quick actions; establishes list/card patterns and mocked portfolio store.
3. **Mock data layer** — Central mocked balances, quotes, fees, and transaction generator; consistent types for assets (BTC, ETH, BNB, SOL, ADA, USDT, USDC) and BRL conversion display.
4. **SCR-HISTORY + SCR-TX-DETAIL** — List/detail pattern reused across app; deep link from home “recent activity” if present.
5. **SCR-CONVERT** — Highest complexity among money movement flows; confirm modal, toasts, post-convert list updates.
6. **SCR-WITHDRAW** — Parallels convert confirmation patterns; destination field validation (format messages mocked).
7. **SCR-DEPOSIT** — Copy/QR UX; network selection; read-only informational tone.
8. **SCR-ALERTS + SCR-ALERT-CREATE** — List/create/toggle; tie alert rules to mocked price feed updates (simulated triggers optional).
9. **SCR-SETTINGS** — Fiat display preferences, notification toggles (demo), theme note if “light” is ever added as non-default experimental.
10. **SCR-EMPTY** — Wire empty states into History, Alerts, and search-no-results on Home.
11. **Cross-cutting QA** — Loading/error consistency, focus order, responsive checks, toast and confirmation audit against Global Patterns.

---

## 5. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Crypto UX is unfamiliar** to non-technical users | Wrong network, wrong address, misunderstood fees | Use **plain copy**, **confirm summaries**, **network labels** on Deposit/Withdraw; mock validations still return **clear, field-level errors**. |
| **Fake data feels “off”** (stale quotes, perfect numbers) | Erodes trust in demo | **Simulate** small quote refresh intervals; show “last updated” time on quotes; avoid impossible balances in mocks. |
| **Scope creep into trading** | Confuses product story | **Non-goals** locked: no order book, no charts beyond simple spark/24h if needed; redirect ideas to “Future”. |
| **Inconsistent terms** (Swap vs Convert, Withdraw vs Send) | Split mental models across UI | Enforce **Glossary**; one verb per action everywhere. |
| **Responsive duplication** | Desktop/mobile drift | Single source of truth for flows; shared components; **screen IDs** identical. |
| **Double submit** on convert/withdraw | Duplicate mock transactions | Disable primary button on submit; idempotent-feeling UI (single success toast, single new row). |
| **Empty first-time experience** | User thinks app is broken | Use **SCR-EMPTY** and Home onboarding hints; never a blank white screen. |
| **Accessibility gaps** | Excludes users | Semantic headings, focus visible, alerts/notifications use `role="status"` or live region patterns for toasts where implemented. |

---

## 6. Global Patterns

These rules apply **everywhere** unless a specific screen strategy document explicitly overrides them.

### Errors

- **Inline errors:** Shown next to the field; message states **what failed and how to fix** (e.g. “Enter an amount greater than zero”, “Amount exceeds available balance”).
- **Form-level / page-level errors:** When submission fails (mock failure), show a **short title + one sentence** at the top of the form or in a **toast** (see Toasts).
- **Recoverability:** Always offer **Retry** (same action) or **Edit** (return to inputs) for failed submissions; never leave the user on a dead end.
- **Technical tone:** No raw stack traces; optional “Error code: …” only in dev builds if needed.

### Empty states

- **When:** No transactions, no alerts yet, no search results on Home, or an optional “no assets” edge case in mocks.
- **Content:** Illustration or icon + **one headline** + **one supporting line** + **primary CTA** (e.g. “Make your first conversion”, “Create alert”, “Clear search”).
- **SCR-EMPTY** may be a **template**: same spacing and typography wherever reused; only copy and CTA target change.

### Loading

- **Initial page load:** Skeletons or placeholder blocks for lists and summary cards—**prefer skeletons** over spinners for layout stability.
- **Short actions** (submit convert, submit withdraw): Primary button shows **loading state** (spinner + disabled); optional subtle inline “Processing…” on modals.
- **Pull-to-refresh (mobile):** If implemented, uses same skeleton/refresh rules as desktop re-fetch.
- **Do not** clear existing data on refresh unless success returns new data; avoid flicker.

### Confirmations

- **Required for:** Executing a **Convert** or **Withdraw** (anything that moves value in the mock), **deleting** an alert, and **destructive** settings (if any).
- **Modal structure:** Title (action name) → **Summary block** (amounts, fees, destination truncated with middle ellipsis if long) → **Primary** (“Confirm”) + **Secondary** (“Cancel” or “Back”).
- **Cancel:** Always safe; returns user to previous step with inputs preserved where possible.
- **Unsaved changes:** If alert create/edit has dirty state, navigating away shows **“Discard changes?”** with Discard / Keep editing.

### Toasts (non-blocking notifications)

- **Success:** After successful convert, withdraw, alert save, settings save—**short**, past tense (“Conversion completed”).
- **Error:** When mock API returns failure—**actionable** when possible (“Couldn’t complete withdrawal. Try again.”).
- **Warning:** Rate stale, balance adjusted by mock race—use sparingly.
- **Duration:** Default auto-dismiss ~4 seconds; errors may persist until dismissed if critical.
- **Stacking:** New toast appears below or replaces prior per implementation, but **never** hide modal confirmations behind toasts.

### Banners (optional, persistent inline)

- Use for **system-level** messages (e.g. “Using simulated data—balances are not real”) if not placed in Settings only. Dismissible if non-critical.

### Navigation feedback

- **Active nav item** reflects current route.
- **404:** **SCR-404** explains link may be broken; button to **SCR-HOME**.

---

## 7. Glossary

Terms **Apollo** (desktop) and **Artemis** (mobile) should use consistently in UI, specs, and components.

| Term | Definition / usage |
|------|---------------------|
| **Asset** | A cryptocurrency or fiat balance line item; includes **ticker** (e.g. BTC) and full name where space allows. |
| **Portfolio** | User’s combined holdings; total value shown in **display fiat** (default **BRL**). |
| **Display fiat** | The fiat currency used for aggregated values and some labels; default **BRL**. |
| **Ticker** | Short symbol (BTC, ETH, USDT, …)—always uppercase in UI. |
| **Convert** | Exchange one asset for another at a quoted rate (mocked). Use **Convert**, not “Swap”, in primary navigation and buttons unless a future setting explicitly enables alternate copy. |
| **Withdraw** | Send crypto to an external address or withdraw to a linked destination (mocked). Use **Withdraw**, not “Send” in nav; “Send” may appear in helper text if clarifying direction. |
| **Deposit** | Receive funds by showing a deposit address or instructions; user copies or scans. |
| **Quote** | The current **conversion rate** and resulting output amount for a given input—time-limited in real life; mocked with a “last updated” indicator. |
| **Fee** | Charge applied to convert or withdraw; always shown **before** final confirmation. |
| **Network** | Blockchain network for deposit/withdraw (e.g. for USDT/USDC)—must be labeled when multiple networks exist in mocks. |
| **Confirmation (blockchain)** | Number of confirmations before funds are considered settled—Deposit copy only; not confused with **modal confirmation**. |
| **Transaction** | A ledger entry: convert, withdraw, deposit, or system adjustment in **History**. |
| **Transaction status** | e.g. Completed, Pending, Failed—shown in list and detail. |
| **Price alert** | User-defined rule that fires when price or % change crosses a threshold (mocked behavior). |
| **Alert rule** | The conditions of a price alert (asset, threshold logic as implemented). |
| **Available balance** | Amount user can spend or withdraw **now** in mocks; subtext if some balance is “pending” (optional future). |
| **24h change** | Percentage (and/or fiat delta) change over the last 24 hours for an asset on Home. |
| **SCR-HOME** | Dashboard route: portfolio overview and entry to key actions. |
| **SCR-CONVERT** | Conversion flow screen. |
| **SCR-WITHDRAW** | Withdrawal flow screen. |
| **SCR-DEPOSIT** | Deposit instructions screen. |
| **SCR-HISTORY** | Transaction list. |
| **SCR-TX-DETAIL** | Single transaction detail. |
| **SCR-ALERTS** | Alerts management list. |
| **SCR-ALERT-CREATE** | Create new alert. |
| **SCR-SETTINGS** | User preferences and informational links. |
| **SCR-404** | Not found page. |
| **SCR-EMPTY** | Generic empty state template/page. |

---

*Document owner: Athena (Product Strategist). Aligned with Hermes Discovery: Crypto Wallet Dashboard, dark theme, responsive web, mocked data, React + Vite + TypeScript + Tailwind CSS.*
