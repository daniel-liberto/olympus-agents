# Test results — CryptoFolio (Ares)

Method: static audit + `npm run build` + `npx tsc --noEmit`. No automated E2E suite in repo; manual route matrix verified against `App.tsx`.

## Build & types

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |

## Routing

| Path | Component | Result |
|------|-----------|--------|
| `/` | `LandingPage` | OK |
| `/app/login` | `LoginPage` | OK |
| `/app/signup` | `SignupPage` | OK |
| `/app` → redirect | `Navigate` → `dashboard` | OK |
| `/app/dashboard` | `DashboardPage` | OK |
| `/app/wallet` | `WalletPage` | OK |
| `/app/wallet/:coinId` | `WalletDetailPage` | OK |
| `/app/deposit` | `DepositPage` | OK |
| `/app/convert` | `ConvertPage` | OK |
| `/app/withdraw` | `WithdrawPage` | OK |
| `/app/alerts` | `AlertsPage` | OK |
| `/app/history` | `HistoryPage` | OK |
| `/app/settings` | `SettingsPage` | OK |
| `/app/settings/profile` | `ProfilePage` | OK |
| `/app/settings/security` | `SecurityPage` | OK |
| `/app/settings/notifications` | `NotificationsPage` | OK |
| `/app/settings/bank-accounts` | `BankAccountsPage` | OK |
| `/app/settings/preferences` | `PreferencesPage` | OK |
| `/app/support` | `SupportPage` | OK |
| `*` | `NotFound` | OK |

## Feature areas

| Area | Tables mobile/desktop | Empty states | Form validation | Notes |
|------|----------------------|--------------|-----------------|-------|
| Dashboard | Yes | Yes | N/A (links) | Chart + lists |
| Wallet / detail | Yes | Yes | N/A | Search/sort only on wallet list |
| Deposit / convert / withdraw | Yes | Yes | Zod | Success dialogs |
| History | Yes | Yes | N/A (filters) | Filters are selects |
| Alerts | Yes | Yes | Zod | |
| Bank accounts | Yes | Yes | Zod | |
| Settings subtree | N/A | N/A | Mixed | Profile/security Zod; notifications toggles; preferences selects |
| Auth | N/A | N/A | Zod | Login/signup |
| Support | N/A | N/A | N/A | FAQ + mailto |

## Loading / async

| Area | Result |
|------|--------|
| Mock-only data | **N/A** — no loading UI required for synchronous mocks |

## Regressions after fixes

| Check | Result |
|-------|--------|
| Re-run `npm run build` | **PASS** |
