# Mapa de Interações — CryptoFolio

## 1. Mapa de Telas e Componentes

### Screen: Dashboard (`/`)
| Componente | Tipo | Interação |
|------------|------|-----------|
| BalanceCard | Display | Mostra saldo total + variação |
| SearchBar | Input | Filtra lista de moedas em tempo real |
| CoinList | List | Lista scrollável de moedas |
| CoinCard | ListItem | Tap → expande detalhes (opcional) |
| QuickAction: Converter | Button | Navega → /convert |
| QuickAction: Sacar | Button | Navega → /withdraw |
| NotificationToast | Overlay | Aparece quando alerta dispara |

### Screen: Conversão (`/convert`)
| Componente | Tipo | Interação |
|------------|------|-----------|
| CoinSelector (Origem) | Dropdown | Seleciona moeda + mostra saldo |
| CoinSelector (Destino) | Dropdown | Seleciona moeda destino |
| AmountInput | Input | Valor numérico com máscara |
| ConversionPreview | Display | Atualiza em tempo real |
| ConvertButton | Button | Abre modal de confirmação |
| ConfirmModal | Modal | Confirma ou cancela |
| SuccessModal | Modal | Feedback de sucesso |
| ErrorModal | Modal | Feedback de erro |

### Screen: Saque (`/withdraw`)
| Componente | Tipo | Interação |
|------------|------|-----------|
| StepIndicator | Display | Mostra progresso (1/3, 2/3, 3/3) |
| CoinSelector | Dropdown | Seleciona moeda |
| AmountInput | Input | Valor + botão "Usar tudo" |
| DestinationToggle | Toggle | Crypto / Fiat |
| CryptoAddressInput | Input | Endereço + seleção de rede |
| BankDetailsForm | Form | Banco, agência, conta |
| ReviewCard | Display | Resumo antes de confirmar |
| ConfirmButton | Button | Submete saque |
| SuccessScreen | Screen | Status "Processando" |

### Screen: Alertas (`/alerts`)
| Componente | Tipo | Interação |
|------------|------|-----------|
| AlertList | List | Lista de alertas configurados |
| AlertCard | ListItem | Toggle ativo/inativo, swipe delete |
| CreateAlertButton | FAB/Button | Abre form de criação |
| AlertForm | Form | Moeda + tipo + limiar |
| EmptyState | Display | Quando não há alertas |

### Screen: Configurações (`/settings`)
| Componente | Tipo | Interação |
|------------|------|-----------|
| CurrencySelector | Dropdown | Moeda padrão de exibição |
| AboutSection | Display | Info do app |

---

## 2. Mapa de Modais e Dialogs

| ID | Modal | Trigger | Conteúdo | Ações |
|----|-------|---------|----------|-------|
| M1 | ConfirmConversion | Botão "Converter" | Resumo da conversão (origem, destino, taxa, valor final) | [Cancelar] [Confirmar] |
| M2 | ConversionSuccess | Após conversão OK | Ícone ✓ + detalhes da conversão | [Voltar ao Dashboard] |
| M3 | ConversionError | Após conversão falha | Ícone ✗ + mensagem de erro | [Fechar] [Tentar Novamente] |
| M4 | ConfirmWithdraw | Botão "Confirmar Saque" (step 3) | Resumo completo do saque | [Voltar] [Confirmar] |
| M5 | WithdrawSuccess | Após saque OK | Ícone ✓ + status "Processando" | [Voltar ao Dashboard] |
| M6 | WithdrawError | Após saque falha | Mensagem de erro | [Fechar] [Tentar Novamente] |
| M7 | DeleteAlertConfirm | Swipe delete em alerta | "Excluir alerta para BTC?" | [Cancelar] [Excluir] |

---

## 3. Mapa de Formulários

### Form: Conversão
| Campo | Tipo | Placeholder | Validação | Erro |
|-------|------|-------------|-----------|------|
| coinFrom | Select | "Selecione moeda" | Required | "Selecione uma moeda" |
| coinTo | Select | "Selecione destino" | Required, ≠ coinFrom | "Selecione moeda diferente" |
| amount | Number | "0.00" | > 0, ≤ balance | "Valor inválido" / "Saldo insuficiente" |

### Form: Saque — Step 1
| Campo | Tipo | Placeholder | Validação | Erro |
|-------|------|-------------|-----------|------|
| coin | Select | "Selecione moeda" | Required | "Selecione uma moeda" |
| amount | Number | "0.00" | > 0, ≤ balance | "Valor inválido" / "Saldo insuficiente" |

### Form: Saque — Step 2 (Crypto)
| Campo | Tipo | Placeholder | Validação | Erro |
|-------|------|-------------|-----------|------|
| walletAddress | Text | "0x..." | Required, format | "Endereço inválido" |
| network | Select | "Selecione rede" | Required | "Selecione uma rede" |

### Form: Saque — Step 2 (Fiat)
| Campo | Tipo | Placeholder | Validação | Erro |
|-------|------|-------------|-----------|------|
| bank | Text | "Nome do banco" | Required | "Campo obrigatório" |
| branch | Text | "Agência" | Required, numeric | "Agência inválida" |
| account | Text | "Conta" | Required, numeric | "Conta inválida" |

### Form: Alerta
| Campo | Tipo | Placeholder | Validação | Erro |
|-------|------|-------------|-----------|------|
| coin | Select | "Selecione moeda" | Required | "Selecione uma moeda" |
| type | Toggle | — | Required (up/down) | — |
| threshold | Number | "5%" | > 0, ≤ 100 | "Porcentagem inválida" |

---

## 4. Mapa de Notificações e Feedback

| ID | Tipo | Trigger | Conteúdo | Duração |
|----|------|---------|----------|---------|
| T1 | Toast Success | Conversão OK | "Conversão realizada!" | 3s |
| T2 | Toast Success | Saque OK | "Saque solicitado!" | 3s |
| T3 | Toast Success | Alerta criado | "Alerta criado!" | 3s |
| T4 | Toast Info | Config alterada | "Configuração atualizada" | 2s |
| T5 | Toast Alert | Alerta disparado | "BTC subiu 5.2%!" + ícone | 5s, tap action |
| T6 | Toast Error | Qualquer erro | Mensagem de erro | 4s |
| T7 | Inline Error | Validação campo | Mensagem abaixo do campo | Persistent |
| T8 | Skeleton | Loading | Placeholder animado | Até dados carregarem |
| T9 | Empty State | Sem dados | Ilustração + mensagem + CTA | Persistent |

---

## 5. Transições Entre Telas

| De | Para | Trigger | Animação |
|----|------|---------|----------|
| Dashboard | Convert | Tap "Converter" | Slide right |
| Dashboard | Withdraw | Tap "Sacar" | Slide right |
| Dashboard | Alerts | Tap nav "Alertas" | Tab switch |
| Convert | Dashboard | Sucesso / Back | Slide left |
| Withdraw | Dashboard | Sucesso / Back | Slide left |
| Alerts | Dashboard | Tap nav "Dashboard" | Tab switch |
| Qualquer | Dashboard | Tap toast alerta | Overlay dismiss + navigate |

---

## 6. IDs de Referência (para Apollo e Artemis)

Usar os seguintes IDs consistentes em desktop e mobile:

| Componente | ID |
|------------|-----|
| Dashboard | `screen-dashboard` |
| Conversão | `screen-convert` |
| Saque | `screen-withdraw` |
| Alertas | `screen-alerts` |
| Config | `screen-settings` |
| Modal Confirmar Conversão | `modal-confirm-convert` |
| Modal Sucesso Conversão | `modal-success-convert` |
| Modal Confirmar Saque | `modal-confirm-withdraw` |
| Modal Sucesso Saque | `modal-success-withdraw` |
| Toast Alerta | `toast-price-alert` |
| Bottom Nav (mobile) | `nav-bottom` |
| Sidebar (desktop) | `nav-sidebar` |
