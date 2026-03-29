# Visual Audit — CryptoFolio (Hephaestus)

Pre-handoff checklist before Poseidon (frontend) implementation. Status below reflects **merged Apollo + Artemis** intent.

---

## Mandatory checks

| Check | Result | Notes |
|-------|--------|--------|
| **Text contrast** | **PASS** | Primary text `foreground` on `background` (~12.6:1). Muted `muted-foreground` reserved for secondary copy only—not sole label for critical actions. Primary CTA uses `primary` / `primary-foreground` (amber on near-black). |
| **Sidebar h-screen** | **PASS** | Desktop: `w-64 h-screen sticky top-0 left-0` on app shell. Mobile: drawer `h-screen` / full viewport height with `Sheet`; no truncated nav column. |
| **Opacity stacking** | **PASS** | No alpha in HSL variable definitions. Opacity applied in classes (`bg-primary/10`, `border-warning/20`). Overlays use `bg-black/50` only on scrim, not as surface tokens. |
| **Button semantic tokens** | **PASS** | All variants mapped to `primary`, `secondary`, `destructive`, `accent`, `border`, `foreground`. **Bare `bg-white` forbidden** for buttons and app chrome; QR pad exception documented. |
| **Navigation structure** | **PASS** | Single IA: Principal (Dashboard, Carteira), Transações (Depositar, Converter, Sacar), Outros (Alertas, Histórico, Configurações), footer Suporte + user menu. Mobile mirrors via drawer; optional bottom tabs for high-frequency roots only. |
| **Cross-platform consistency** | **PASS** | Same routes, same data fields, same validation; presentation swaps table↔card and dialog↔sheet at breakpoint. |

---

## Decision log (Apollo ↔ Artemis conflicts resolved)

| Topic | Apollo | Artemis | **Resolution** |
|-------|--------|---------|----------------|
| Success / confirm UI | `Dialog` centered | Vaul bottom sheet | **Breakpoint split:** `lg+` Dialog via `createPortal`; `<lg` Sheet with snap points. Same inner content component. |
| Alert create | Modal on desktop | `CMP-AlertCreateSheet` | Same fields; mobile sheet 70% snap; desktop `max-w-md` dialog. |
| Transaction detail | `MDL-TransactionDetail` | `CMP-TransactionDetailSheet` | Identical field list; sheet 80% on mobile. |
| History filters | Full filter bar | Chips + `FilterSheet` | **Unified spec:** desktop shows tabs + selects in-page; mobile uses chips opening sheet with same filter options. |
| Wallet list “Ações” column | Desktop row chevron / implied | Card tap | Desktop: optional narrow column or row click; mobile: full row tap—**both navigate to detail**. |
| Settings hub | Inner sidebar `w-56` | Full-width list | Desktop: two-column layout; mobile: stacked list items with chevron → route. |
| Bank delete | Inline buttons | Swipe-to-reveal + confirm sheet | **Both:** destructive confirm required; mobile adds swipe affordance; desktop keeps Edit/Delete. |
| Chart height | 300px | `h-48` | Use `ResponsiveContainer` with `height={300}` desktop / `192` mobile via prop or CSS. |
| Landing min-width note | “1024px” in Apollo doc | Mobile-first | **Product:** landing is fully responsive; Apollo note treated as **desktop artboard reference only**. |

---

## Screen inventory (26 / 26)

| # | ID | Name | Type |
|---|-----|------|------|
| 1 | SCR-LANDING | Landing | Page |
| 2 | SCR-AUTH-LOGIN | Login | Page |
| 3 | SCR-AUTH-SIGNUP | Signup | Page |
| 4 | SCR-AUTH-FORGOT | Forgot Password | Page |
| 5 | SCR-AUTH-RESET | Reset Password | Page |
| 6 | SCR-DASHBOARD | Dashboard | Page |
| 7 | SCR-WALLET | Wallet | Page |
| 8 | SCR-WALLET-DETAIL | Wallet Detail | Page |
| 9 | SCR-DEPOSIT | Deposit | Page |
| 10 | SCR-DEPOSIT-SUCCESS | Deposit success | Modal / sheet |
| 11 | SCR-CONVERT | Convert | Page |
| 12 | SCR-CONVERT-SUCCESS | Convert success | Modal / sheet |
| 13 | SCR-WITHDRAW | Withdraw | Page |
| 14 | SCR-WITHDRAW-SUCCESS | Withdraw success | Modal / sheet |
| 15 | SCR-ALERTS | Alerts | Page |
| 16 | SCR-ALERT-CREATE | Alert Create | Modal / sheet |
| 17 | SCR-HISTORY | History | Page |
| 18 | SCR-HISTORY-DETAIL | History Detail | Modal / sheet |
| 19 | SCR-SETTINGS | Settings hub | Page |
| 20 | SCR-SET-PROFILE | Profile | Page |
| 21 | SCR-SET-SECURITY | Security | Page |
| 22 | SCR-SET-NOTIF | Notifications | Page |
| 23 | SCR-SET-BANKS | Bank Accounts | Page |
| 24 | SCR-SET-PREFS | Preferences | Page |
| 25 | SCR-SUPPORT | Support | Page |
| 26 | SCR-404 | 404 | Page |

**Related overlays (documented inside parent flows, not counted separately):** `MDL-ConvertConfirm`, `MDL-WithdrawConfirm`, `MDL-DeleteConfirm` (alert/bank).

---

## Cross-platform consistency — verified

- **Routes:** Identical pathnames from sitemap (`/`, `/login`, … `/app/settings/preferences`, `/app/support`, catch-all 404).
- **Entities:** `User`, `Asset` (coinId, symbol, name, balance, fiatValue, change24h), `Transaction`, `PriceAlert`, `BankAccount`, `DepositAddress`—field names stable across breakpoints.
- **States:** Loading skeletons, empty states with CTA, error retry/toast patterns aligned on both platforms.
- **i18n placeholder:** Copy in PT-BR as per source specs; Poseidon can wire i18n keys later without layout change.

---

## Sign-off

Hephaestus: desktop + mobile design artifacts **merged** into one token system and one screen spec set. Ready for Poseidon implementation.
