# Detailed Flows — CryptoFolio

## Conventions

- **Flow IDs** inherited from Hermes (F-{DOMAIN}-{NNN}); sub-steps as a/b/c
- **Screen IDs**: S-{ID} per sitemap
- Each step: **Screen → Element → Action → System Response → Resulting State**
- **[if]** = branch; **[error]** = error path; **[success]** = happy path end

---

## DF-AUTH-001: Signup (Cadastro)

**Actor**: Visitor (P2)
**Preconditions**: Not authenticated
**Postconditions**: Account created, user logged in, redirected to S-DASH

### Steps

1. **S-AUTH-SIGNUP** loads. Form visible: `NameInput`, `EmailInput`, `PasswordInput`, `ConfirmPasswordInput`, `SubmitButton("Criar conta")`, `LoginLink("Já tenho conta")`
2. **States on load**: All inputs empty, submit button `bg-primary text-primary-foreground`, disabled until all fields have value
3. User fills `NameInput` (required, min 2 chars)
   - **On blur validation**: if empty → "Nome é obrigatório" (`text-destructive`); if < 2 chars → "Nome muito curto"
4. User fills `EmailInput` (required, email format)
   - **On blur validation**: if invalid format → "Email inválido"
5. User fills `PasswordInput` (required, min 8 chars, 1 uppercase, 1 number)
   - **On blur validation**: if weak → "Senha deve ter no mínimo 8 caracteres, 1 maiúscula e 1 número"
   - **Strength indicator**: bar below (red/yellow/green)
6. User fills `ConfirmPasswordInput`
   - **On blur validation**: if mismatch → "Senhas não coincidem"
7. All valid → `SubmitButton` enabled
8. User clicks `SubmitButton`
   - 8a. Button shows spinner + "Criando conta..." + disabled
   - 8b. **[if]** API error (500) → toast "Erro ao criar conta. Tente novamente." + button re-enables
   - 8c. **[if]** Email already exists → inline error below EmailInput "Este email já está cadastrado" + link "Fazer login"
   - 8d. **[if]** Network error → toast "Sem conexão. Verifique sua internet."
   - 8e. **[success]** → JWT stored, redirect to S-DASH
9. **S-DASH** loads with empty state (first-time user): "Bem-vindo ao CryptoFolio!" + CTA "Fazer primeiro depósito"

### Edge Cases
- Browser back from dashboard → S-AUTH-SIGNUP (but now authenticated → redirect to S-DASH)
- Session already active → redirect to S-DASH immediately on S-AUTH-SIGNUP load

---

## DF-AUTH-002: Login

**Actor**: Visitor (P2)
**Preconditions**: Has account, not authenticated
**Postconditions**: Authenticated, redirected to S-DASH (or returnUrl)

### Steps

1. **S-AUTH-LOGIN** loads. Form: `EmailInput`, `PasswordInput`, `SubmitButton("Entrar")`, `ForgotPasswordLink`, `SignupLink("Criar conta")`
2. User fills email and password
3. Clicks `SubmitButton`
   - 3a. Button → spinner + "Entrando..." + disabled
   - 3b. **[if]** Invalid credentials → inline error "Email ou senha incorretos" (generic — no reveal)
   - 3c. **[if]** Rate limited (5+ failed attempts) → "Muitas tentativas. Aguarde 5 minutos." + timer countdown
   - 3d. **[if]** API error → toast "Erro ao fazer login. Tente novamente."
   - 3e. **[success]** → JWT stored, redirect to returnUrl or S-DASH

---

## DF-AUTH-003: Forgot Password

**Actor**: Visitor (P2)
**Preconditions**: Has account
**Postconditions**: Reset email sent (or silent if not found — security)

### Steps

1. **S-AUTH-FORGOT** loads. Form: `EmailInput`, `SubmitButton("Enviar link")`, `BackToLoginLink`
2. User fills email
3. Clicks submit
   - 3a. Button → spinner + disabled
   - 3b. Always shows success: "Se este email estiver cadastrado, enviaremos um link de recuperação."
   - 3c. **[if]** API error → toast "Erro. Tente novamente."
4. User checks email → clicks reset link → opens S-AUTH-RESET with token in URL

---

## DF-AUTH-004: Reset Password

**Actor**: Visitor (P2)
**Preconditions**: Has valid reset token
**Postconditions**: Password changed, redirected to S-AUTH-LOGIN

### Steps

1. **S-AUTH-RESET** loads. Validates token.
   - 1a. **[if]** Token invalid/expired → message "Link expirado ou inválido." + button "Solicitar novo link" → S-AUTH-FORGOT
2. Form: `NewPasswordInput`, `ConfirmPasswordInput`, `SubmitButton("Redefinir senha")`
3. Validation same as signup password rules
4. Submit → button spinner
   - 4a. **[success]** → redirect to S-AUTH-LOGIN + toast "Senha redefinida com sucesso. Faça login."
   - 4b. **[error]** → toast "Erro. Tente novamente."

---

## DF-DASH-001: View Dashboard

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in
**Postconditions**: None (read-only)

### Steps

1. **S-DASH** loads. System fetches: portfolio balance, asset list, price changes, recent transactions
2. **Loading state**: Skeleton — total balance skeleton (large rect), chart skeleton (rect), asset list (3 rows of skeletons), transactions (3 rows of skeletons)
3. **[if]** API error → full-page error with retry button
4. **[if]** No assets (empty portfolio):
   - 4a. Balance shows "R$ 0,00"
   - 4b. Asset list replaced with empty state: icon (Wallet outline), "Seu portfólio está vazio", "Deposite sua primeira criptomoeda para começar", CTA button "Depositar" → S-DEP
   - 4c. Chart hidden
   - 4d. Recent transactions: empty state "Nenhuma transação"
5. **[if]** Has assets:
   - 5a. **Portfolio Balance Card**: "R$ 45.230,87" large font, "+2.4% (24h)" in green or red badge
   - 5b. **Quick Actions Row**: 3 buttons: "Depositar" (→ S-DEP), "Converter" (→ S-CONV), "Sacar" (→ S-SAQUE) — `bg-primary/10 text-primary` style, with icons
   - 5c. **Portfolio Chart**: Line chart, period selector tabs (7d | 30d | 90d), tooltip on hover
   - 5d. **Asset List**: each row: coin icon (real image), name, symbol, quantity, value in BRL, change 24h (green/red). Click row → S-WALL-DETAIL
   - 5e. **Search Bar**: above asset list, placeholder "Buscar ativo...", filters list in real-time (debounce 300ms), no results → "Nenhum ativo encontrado"
   - 5f. **Recent Transactions**: mini-table (5 rows max), columns: Type icon, Description, Amount, Date. "Ver todas" link → S-HIST

---

## DF-WALL-001: View Wallet (Asset List)

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in
**Postconditions**: None (read-only)

### Steps

1. **S-WALL** loads. Fetch all user assets with balances and prices.
2. **Loading**: Skeleton rows (6 rows)
3. **[if]** No assets → empty state: "Nenhum ativo na carteira", CTA "Depositar"
4. **[if]** Has assets:
   - 4a. **Total Balance**: shown at top "Saldo total: R$ 45.230,87"
   - 4b. **Sort Controls**: dropdown — "Maior valor", "Menor valor", "Nome A-Z", "Maior variação"
   - 4c. **Search**: input "Buscar ativo..." debounce 300ms
   - 4d. **Desktop Table** (hidden lg:hidden below):
     - Columns: Ativo (icon + name + symbol), Quantidade, Preço Atual, Valor Total (BRL), Variação 24h, Ações (→)
     - Rows: hover bg-accent/20, cursor-pointer, click → S-WALL-DETAIL
     - Variation column: green if positive, red if negative, with arrow icon
   - 4e. **Mobile Cards** (lg:hidden):
     - Each card: icon + name/symbol left, value + variation right
     - Tap → S-WALL-DETAIL
   - 4f. **Empty after filter**: "Nenhum ativo encontrado para '{query}'"

---

## DF-WALL-002: Asset Detail

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in, valid coinId in URL
**Postconditions**: None (read-only)

### Steps

1. **S-WALL-DETAIL** loads (`/app/wallet/:coinId`). Fetch asset details + price history + user transactions for this coin.
2. **[if]** Invalid coinId → S-404
3. **Loading**: Skeleton for header, chart, transactions
4. **Header**: Coin icon (real image) + name + symbol, current price, 24h change badge
5. **User Balance Card**: "Seu saldo: 0.5423 BTC ≈ R$ 23.456,78"
6. **Action Buttons Row**: "Depositar" (→ S-DEP, pre-select coin), "Converter" (→ S-CONV, pre-select from), "Sacar" (→ S-SAQUE, pre-select coin)
7. **Price Chart**: Line chart with period tabs (7d | 30d | 90d | 1y)
8. **Transaction History for this coin**:
   - Desktop table: Type, Amount, Value (BRL), Status badge, Date
   - Mobile cards: same data stacked
   - Empty state: "Nenhuma transação com {coin name}"
   - Pagination: "Mostrar mais" button (load 10 at a time)

---

## DF-DEP-001: Deposit Crypto

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in
**Postconditions**: Deposit address displayed, user can send funds externally

### Steps

1. **S-DEP** loads. If came from S-WALL-DETAIL → coin pre-selected
2. **CoinSelector** dropdown: shows coin icon + name + symbol for each option (BTC, ETH, USDT, SOL, BNB)
3. User selects coin (or already pre-selected)
4. System generates/fetches deposit address for selected coin
   - 4a. **Loading**: Skeleton in address area
   - 4b. **[error]** → inline error "Não foi possível gerar endereço. Tente novamente." + retry button
5. **Deposit Card**:
   - QR Code (large, centered)
   - Address string below (monospace, truncated with full view on click)
   - `CopyButton("Copiar endereço")` → copies to clipboard → toast "Endereço copiado!" (3s)
   - Warning banner: "⚠️ Envie apenas {coinName} ({network}) para este endereço. Enviar outra moeda pode resultar em perda permanente."
6. **Deposit History** below:
   - Desktop table: Moeda, Valor, Status (badge: pending=yellow, confirmed=green, failed=red), Data
   - Mobile cards: same data
   - Empty state: "Nenhum depósito realizado", "Envie criptomoedas para o endereço acima para começar"
7. **When deposit detected** (polling or mock):
   - New row in history with status "Pendente" (yellow badge)
   - After confirmations → status changes to "Confirmado" (green badge)
   - Success modal (S-DEP-SUCCESS): green check icon, "Depósito de X.XX BTC confirmado!", summary card, "Voltar ao Dashboard" button

---

## DF-CONV-001: Convert Crypto

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in, has at least one asset with balance > 0
**Postconditions**: Conversion executed, balances updated

### Steps

1. **S-CONV** loads. If came from context → from-coin pre-selected
2. **Form Layout**:
   - **From Section**: CoinSelector (dropdown with icon + name + balance), AmountInput (large font, centered), "Saldo disponível: X.XX {COIN}" text below in `text-muted-foreground`, "Usar máximo" link
   - **Swap Button**: icon button (⇅) between from/to — click swaps the two selections
   - **To Section**: CoinSelector (dropdown), Preview amount (read-only, calculated in real-time)
   - **Rate Info**: "1 BTC = XX.XX ETH", "Taxa: 0.5%", "Fee estimado: R$ X,XX"
   - **SubmitButton("Converter")**

3. **Real-time preview**: As user types amount, system calculates and shows preview. Debounce 500ms on amount change.

4. **Validations**:
   - Amount empty → submit disabled
   - Amount > saldo disponível → "Saldo insuficiente. Disponível: X.XX {COIN}" in `text-destructive`, submit disabled
   - Amount < minimum → "Valor mínimo: X.XX {COIN}", submit disabled
   - Same coin selected for from and to → "Selecione moedas diferentes", submit disabled
   - From or To not selected → submit disabled

5. User clicks `SubmitButton`
   - 5a. **Confirmation Modal** opens:
     - Title: "Confirmar conversão"
     - Body: "Você está convertendo:", From (icon + amount + coin), arrow, To (icon + estimated amount + coin), "Taxa: 0.5%", "Fee: R$ X,XX", "Valor líquido: X.XX {TO_COIN}"
     - Buttons: "Cancelar" (ghost, closes modal), "Confirmar conversão" (primary)
   - 5b. User clicks "Confirmar conversão"
     - Button → spinner + "Processando..." + disabled
     - **[if]** API error → toast "Falha na conversão. Tente novamente." + modal closes
     - **[if]** Insufficient funds (race condition) → toast "Saldo insuficiente" + modal closes + balance refreshes
     - **[success]** → Modal transitions to success state (S-CONV-SUCCESS):
       - Green check icon (animated)
       - "Conversão realizada com sucesso!"
       - Summary card: From amount, To amount, Rate, Fee, Timestamp
       - "Baixar Recibo" button (secondary/outline)
       - "Nova conversão" button (primary)
       - Clicking outside or "Nova conversão" → modal closes, form resets, balances refresh

6. **Conversion History** below form:
   - Desktop table: De (icon+amount), Para (icon+amount), Taxa, Status badge, Data
   - Mobile cards: same data
   - Empty state: "Nenhuma conversão realizada"

---

## DF-SAQUE-001: Withdraw

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in, has balance
**Postconditions**: Withdrawal initiated

### Steps

1. **S-SAQUE** loads. If came from context → coin pre-selected
2. **CoinSelector**: dropdown with icon + name + balance. Includes BRL for fiat withdrawal.

3. **[if]** Selected coin is crypto (BTC, ETH, etc.):
   - 3a. **DestinationInput**: text input "Endereço da carteira de destino"
     - Validation on blur: basic format check; if invalid → "Endereço inválido"
   - 3b. **AmountInput**: large font, "Saldo disponível: X.XX", "Usar máximo" link
   - 3c. **Fee Info**: "Fee de rede: ~X.XX {COIN} (≈ R$ X,XX)", "Você receberá: X.XX {COIN}"
   - 3d. **Estimated time**: "Tempo estimado: 10-30 minutos"

4. **[if]** Selected coin is BRL (fiat):
   - 4a. **BankAccountSelector**: dropdown of saved accounts (banco + últimos 4 dígitos da conta)
   - 4b. **[if]** No accounts saved → "Nenhuma conta cadastrada." + link "Cadastrar conta bancária" → S-SET-BANKS
   - 4c. **AmountInput**: large font, prefix "R$", "Saldo disponível: R$ X.XXX,XX"
   - 4d. **Fee Info**: "Taxa: R$ 0,00" (or applicable fee)
   - 4e. **Estimated time**: "PIX: instantâneo em horário comercial"

5. **Validations**:
   - Amount empty or 0 → disabled
   - Amount > balance → "Saldo insuficiente"
   - Amount < minimum → "Valor mínimo: X.XX"
   - Destination empty (crypto) → disabled
   - No bank account selected (fiat) → disabled

6. User clicks `SubmitButton("Sacar")`
   - **Confirmation Modal**:
     - Title: "Confirmar saque"
     - Body: Moeda, Valor, Destino (address truncated or bank name), Fee, Valor líquido
     - Warning: "Esta ação não pode ser desfeita após confirmação da rede."
     - Buttons: "Cancelar" (ghost), "Confirmar saque" (primary)
   - Confirm click:
     - Button → spinner + disabled
     - **[error]** → toast + modal closes
     - **[success]** → Success state (S-SAQUE-SUCCESS):
       - Green check icon
       - "Saque iniciado com sucesso!"
       - Summary card
       - "Baixar Recibo" (secondary)
       - "Voltar ao Dashboard" (primary)

7. **Withdrawal History** below:
   - Desktop table: Moeda, Valor, Destino (truncated), Status badge, Data
   - Mobile cards: same
   - Empty state: "Nenhum saque realizado"
   - Status badges: processing (yellow pulse), completed (green), failed (red)

---

## DF-ALERT-001: Manage Price Alerts

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in
**Postconditions**: Alert created/edited/deleted

### Steps

1. **S-ALERT** loads. Fetch active alerts + triggered history.
2. **[if]** No alerts → empty state: bell icon, "Nenhum alerta configurado", "Crie alertas para ser notificado quando o preço de uma moeda subir ou descer.", CTA "Novo Alerta"
3. **Active Alerts List**:
   - Each card: Coin icon + name, Type ("Acima de" / "Abaixo de"), Target value, Current price, Status indicator
   - Actions per alert: Edit (pencil icon), Delete (trash icon)
4. **Create Alert** — user clicks "Novo Alerta":
   - Modal opens (S-ALERT-CREATE):
     - Title: "Novo Alerta de Preço"
     - CoinSelector (dropdown with icons)
     - TypeSelector: "Notificar quando o preço estiver" → radio: "Acima de" / "Abaixo de"
     - ValueInput: "Valor alvo (R$)" — number input
     - Current price reference: "Preço atual: R$ X.XXX,XX"
     - **[if]** Value very close to current (within 1%) → warning "Valor muito próximo do preço atual"
     - Buttons: "Cancelar" (ghost), "Criar Alerta" (primary)
   - Submit:
     - Button → spinner + disabled
     - **[success]** → toast "Alerta criado!", modal closes, list refreshes
     - **[error]** → toast "Erro ao criar alerta"
5. **Edit Alert**: Click edit → same modal, pre-filled, button "Salvar Alterações"
6. **Delete Alert**: Click trash → confirmation modal: "Excluir alerta?", "Você não receberá mais notificações para {coin} {type} R$ {value}.", "Cancelar" / "Excluir" (destructive)
   - **[success]** → toast "Alerta excluído", list refreshes
7. **Triggered Alerts Section** below:
   - Title: "Alertas Disparados"
   - List of triggered alerts: coin, type, target value, triggered at (date/time), price at trigger
   - Empty state: "Nenhum alerta disparado ainda"
8. **When alert triggers** (in real-time / polling):
   - Toast notification: "🔔 Bitcoin atingiu R$ 350.000!" with dismiss
   - Badge on Alerts sidebar item (dot indicator)
   - Alert moved from active to triggered history

---

## DF-HIST-001: Transaction History

**Actor**: Authenticated user (P1)
**Preconditions**: Logged in
**Postconditions**: None (read-only)

### Steps

1. **S-HIST** loads. Fetch all transactions (paginated, 20 per page).
2. **Filter Bar**:
   - Type filter: "Todos", "Depósitos", "Conversões", "Saques" — pill/tab selector
   - Coin filter: dropdown (all coins)
   - Period filter: "7 dias", "30 dias", "90 dias", "Personalizado" (date range picker)
   - Status filter: "Todos", "Pendente", "Confirmado", "Falho"
3. **[if]** No transactions → empty state: "Nenhuma transação", "Suas transações aparecerão aqui."
4. **[if]** No results after filter → "Nenhuma transação encontrada para os filtros selecionados." + "Limpar filtros" link
5. **Desktop Table**:
   - Columns: Tipo (icon + label), Ativo (coin icon + name), Valor, Status (badge), Data
   - Sortable by: Data (default desc), Valor
   - Click row → opens transaction detail modal (S-HIST-DETAIL)
6. **Mobile Cards**:
   - Type icon + description, amount + status badge, date
   - Tap → same modal
7. **Pagination**: "Carregar mais" button at bottom (loads next 20)
8. **Export**: "Exportar CSV" button (top-right) → downloads filtered data as CSV
9. **Transaction Detail Modal** (S-HIST-DETAIL):
   - Title: "Detalhes da transação"
   - Type + status badge
   - Full details card:
     - Tipo, Moeda(s), Valor, Fee, Valor líquido
     - Status with timeline dots (Iniciado → Processando → Confirmado)
     - Data e hora (formatted: "28 Mar 2026, 19:42")
     - TX Hash (if blockchain) — monospace, truncated, copy button
   - "Baixar Recibo" button
   - "Fechar" button

---

## DF-SET-001: Profile Settings

**Actor**: Authenticated user (P1)
**Entry**: S-SET → Profile tab/link

### Steps

1. **S-SET-PROFILE** loads. Fetch current user data.
2. **Form**:
   - `AvatarUpload`: circular image, click to upload (accept: image/*, max 5MB)
     - **[if]** File too large → toast "Imagem muito grande. Máximo: 5MB"
     - **[if]** Invalid format → toast "Formato inválido. Use JPG, PNG ou WebP"
   - `NameInput`: pre-filled, required, min 2 chars
   - `EmailDisplay`: read-only, shown as text (not input)
   - `SubmitButton("Salvar alterações")`: disabled until changes detected
3. Submit:
   - Button → spinner + disabled
   - **[success]** → toast "Perfil atualizado!"
   - **[error]** → toast "Erro ao salvar. Tente novamente."

---

## DF-SET-002: Security (Change Password)

### Steps

1. **S-SET-SECURITY** loads.
2. **Form**:
   - `CurrentPasswordInput` (required)
   - `NewPasswordInput` (required, same rules as signup)
   - `ConfirmNewPasswordInput` (required, must match)
   - `SubmitButton("Alterar senha")`
3. Validations: same strength rules, mismatch check
4. Submit:
   - **[if]** Current password wrong → inline error "Senha atual incorreta"
   - **[success]** → toast "Senha alterada com sucesso!"

---

## DF-SET-003: Bank Accounts

### Steps

1. **S-SET-BANKS** loads. Fetch saved accounts.
2. **[if]** No accounts → empty state: bank icon, "Nenhuma conta cadastrada", "Adicione uma conta bancária para realizar saques em BRL", CTA "Adicionar conta"
3. **Account List**: Cards with bank logo/name, agency, account (masked: ****1234), PIX key type, Edit/Delete buttons
4. **Add Account** → Modal:
   - Title: "Adicionar conta bancária"
   - Fields: Bank (dropdown with major banks), Agency (text, 4 digits), Account (text), Account type (radio: Corrente/Poupança), PIX key (text)
   - All required
   - Buttons: "Cancelar", "Salvar"
   - **[success]** → toast "Conta adicionada!", modal closes, list refreshes
5. **Edit** → same modal pre-filled, button "Salvar alterações"
6. **Delete** → confirmation: "Excluir conta?", "Conta {bank} ****{last4} será removida.", "Cancelar" / "Excluir" (destructive)
   - **[if]** Account used in pending withdrawal → "Esta conta não pode ser excluída pois há um saque pendente."

---

## DF-SET-004: Preferences

### Steps

1. **S-SET-PREFS** loads. Fetch current preferences.
2. **Theme Toggle**: "Tema" label, toggle switch Dark/Light, current state highlighted
   - Change → immediate visual update + auto-save + toast "Tema atualizado"
3. **Currency Selector**: "Moeda padrão" label, select: BRL / USD
   - Change → auto-save + toast "Moeda padrão atualizada" + all values in app refresh

---

## DF-SET-005: Notification Preferences

### Steps

1. **S-SET-NOTIF** loads. Fetch current preferences.
2. **Toggle List**:
   - "Alertas de preço (in-app)" — default ON
   - "Alertas de preço (email)" — default OFF
   - "Confirmações de transação (email)" — default ON
   - "Newsletter" — default OFF
3. Each toggle → auto-save on change + toast "Preferência salva"

---

## DF-SUPP-001: Support / FAQ

### Steps

1. **S-SUPP** loads. Static content.
2. **Search**: input "Buscar na central de ajuda..." — filters FAQ items
3. **FAQ Accordion**: sections with expandable items
   - Sections: "Conta", "Depósitos", "Conversões", "Saques", "Alertas", "Segurança"
   - Click question → expands answer, click again → collapses
4. **Contact Section** at bottom: "Não encontrou sua resposta?", "Entre em contato: suporte@cryptofolio.com.br", icon + link

---

## DF-LANDING-001: Landing Page

### Steps

1. **S-LANDING** loads. Public, no auth required.
2. **Hero**: dark background, headline "Suas criptomoedas, simplificadas.", sub-headline "Acompanhe, converta e saque — tudo em um app clean e moderno.", CTA "Criar conta grátis" (primary, large) → S-AUTH-SIGNUP
3. **Features Section**: 3 cards in row
   - "Portfólio em tempo real" — eye icon
   - "Conversão instantânea" — arrows icon
   - "Alertas inteligentes" — bell icon
4. **How it Works**: 3 numbered steps — "Crie sua conta", "Deposite criptomoedas", "Acompanhe e converta"
5. **Final CTA**: "Comece agora — é grátis" → S-AUTH-SIGNUP
6. **Footer**: Links — Termos de Uso, Política de Privacidade, Suporte
