# Bug list — Frontend QA (Ares)

| ID | Severity | Area | Description | Status |
|----|----------|------|-------------|--------|
| B1 | **Major** | `DashboardPage.tsx`, `WalletPage.tsx`, `WalletDetailPage.tsx` | `import` declarations appeared after `const` statements, which is invalid in standard ECMAScript modules and fragile for tooling. | **Fixed** — all imports grouped at top; `MotionTableRow` (and `quickActionBtnClass` on detail) defined after imports. |
| B2 | **Minor** | `DepositPage.tsx` (`FakeQr`) | Decorative QR used `bg-white`, conflicting with dark-theme guidance (bare white panel). | **Fixed** — `bg-zinc-100` with `bg-zinc-950` / `bg-zinc-200` modules for QR-like contrast. |
| B3 | **Minor** | `BankAccountsPage.tsx` | Zod `.min()` rules lacked user-facing Portuguese messages (defaults are less clear). | **Fixed** — descriptive messages per field. |
| B4 | **Minor** | `AlertsPage.tsx` | `targetPriceBrl` and `coinId` validation lacked explicit error copy. | **Fixed** — Portuguese messages added. |
| B5 | **Minor** | `ConvertPage.tsx` | `fromId` / `toId` used `.min(1)` without custom messages. | **Fixed** — Portuguese messages added. |

## Not treated as product bugs (documented)

- **Agent overlay** (`src/components/agent-overlay/*`): Contains `text-zinc-600` etc.; explicitly excluded from edits per pipeline rules.
- **Bundle size warning:** Informational only from Vite; does not fail the build.
- **`Index.tsx` unmounted:** Not linked from `App.tsx`; no change requested.
