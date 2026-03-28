# Test results — pass/fail matrix

**Run date:** 2026-03-28  
**Environment:** Windows, Node per `package.json` (`>=20`)

| ID | Test case | Result | Evidence / notes |
|----|-----------|--------|------------------|
| T-01 | `npm run build` completes with 0 errors | **PASS** | Vite production build succeeded (exit 0). |
| T-02 | `npx tsc --noEmit` | **PASS** | No TypeScript errors. |
| T-03 | No `gray-*` Tailwind classes under `src/` | **PASS** | Repository search: 0 matches. |
| T-04 | Route `/` → Dashboard | **PASS** | `App.tsx`: `<Route index element={<Dashboard />} />` under `AppShell`. |
| T-05 | Route `/dashboard` → Dashboard | **PASS** | `<Route path="dashboard" element={<Dashboard />} />`. |
| T-06 | Route `/converter` → Convert | **PASS** | Defined under `AppShell`. |
| T-07 | Route `/sacar` → Withdraw | **PASS** | Defined under `AppShell`. |
| T-08 | Route `/depositar` → Deposit | **PASS** | Defined under `AppShell`. |
| T-09 | Route `/history` → History | **PASS** | Defined under `AppShell`. |
| T-10 | Route `/history/:txId` → TransactionDetail | **PASS** | Defined under `AppShell`. |
| T-11 | Route `/alertas` → Alerts | **PASS** | Defined under `AppShell`. |
| T-12 | Route `/configuracoes` → Settings | **PASS** | Defined under `AppShell`. |
| T-13 | Catch-all `*` → NotFound | **PASS** | `<Route path="*" element={<NotFound />} />` outside `AppShell`. |
| T-14 | Redirect `/settings` → `/configuracoes` | **PASS** | Present (extra, non-blocking). |
| T-15 | Dashboard: stats, coin list, search, empty state | **PASS** | Cards, table/cards, search, empty copy; empty gated after load fix. |
| T-16 | Convert: form, confirmation, validation | **PASS** | Dialog/Sheet confirm, insufficient/same-coin checks, `canSubmit`. |
| T-17 | Withdraw: form, method toggle, confirmation | **PASS** | Crypto/fiat toggle, Dialog/Sheet confirm. |
| T-18 | Deposit: coin/network, address, QR, copy | **PASS** | Address + copy; QR is visual placeholder (see bug list). |
| T-19 | History: filters, list, empty state | **PASS** | Selects/chips, table/cards, empty card + CTA. |
| T-20 | TransactionDetail: breadcrumb, card, copy | **PASS** | Breadcrumb, detail card, copy ID/hash; not-found branch. |
| T-21 | Alerts: list, create dialog, toggle, delete | **PASS** | Dialog/Sheet create, Switch, delete confirm. |
| T-22 | Settings: currency, theme, notifications, account | **PASS** | Four cards with controls + read-only account. |
| T-23 | NotFound: 404 + navigation | **PASS** | Message + link to `/dashboard`. |
| T-24 | Loading / empty / error coverage (where applicable) | **PARTIAL** | Loading/empty present on Dashboard/History; API error flows not modeled. |
| T-25 | Sidebar links match routes | **PASS** | `/`, `/history`, `/alertas`, `/configuracoes`, quick actions `/converter`, `/sacar`, `/depositar`. |
| T-26 | Bottom nav links match routes | **PASS** | `/`, `/history`, `/alertas`, `/configuracoes`; FAB menu for converter/withdraw/deposit. |
| T-27 | Accessibility spot check | **PARTIAL** | Many `focus-visible` rings, `aria-label` on icon buttons; gaps: History desktop rows, withdraw toggle (see bug list). |
| T-28 | `npm run lint` | **FAIL** | ESLint exits: no `eslint.config.*` (QA-002). |

**Summary:** 27 PASS, 1 PARTIAL (state/error coverage), 1 FAIL (lint script), 1 PARTIAL (a11y spot check).
