# Bug list — Frontend QA (Ares)

Severity: **critical** | **major** | **minor** | **cosmetic**

---

## Fixed during this audit

| ID | Severity | Area | Description | Resolution |
|----|----------|------|-------------|------------|
| QA-001 | minor | Dashboard | Empty search state could appear together with loading skeletons when the filtered list was empty during the initial simulated load, causing conflicting UI. | Gate empty message with `!listLoading && filteredBalances.length === 0` in `Dashboard.tsx`. |

---

## Open issues

| ID | Severity | Area | Description |
|----|----------|------|-------------|
| QA-002 | major | Tooling | `npm run lint` fails: ESLint 9 expects `eslint.config.js` (flat config); repository has no working ESLint config, so automated linting cannot run. |
| QA-003 | minor | Deposit | QR area shows a Lucide `QrCode` icon inside a styled box, not an encoded/scannable QR image for the deposit address. |
| QA-004 | minor | History | Desktop transaction table rows are mouse-only (`onClick` on `<TableRow>`); no keyboard equivalent or `tabIndex`/Enter handling (mobile cards implement keyboard). |
| QA-005 | minor | Withdraw | Crypto/Fiat method toggle uses plain `<button>` elements without `aria-pressed` or a `tablist` pattern for screen readers. |
| QA-006 | minor | Alerts / Settings | No simulated async **error** state for list/settings persistence (only toast validation on create); acceptable for mock UI but incomplete vs. full error-state matrix. |
| QA-007 | cosmetic | App | Extra nested route `/olympus` → `Index` beyond the nine specified dashboard routes (not a defect if intentional). |

---

## Informational (not defects)

- **Tailwind `gray-*` in `src/`:** Ripgrep found **zero** occurrences; palette consistently uses `zinc-*` (and semantic tokens where applicable).
- **TransactionDetail** imports `toast` from `sonner` while other pages use `@/components/ui/sonner` — behavior works; minor consistency only.
