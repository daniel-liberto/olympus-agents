# User Flows — Crypto Wallet Dashboard

## F-DASH-001: Visualizar Dashboard (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Abertura do app / navegação para Dashboard
**Screen**: SCR-HOME

1. Usuário abre o app → redireciona para `/dashboard`
2. Dashboard carrega e exibe:
   - Saldo total consolidado em BRL no topo
   - Lista de moedas com saldo, valor em fiat e variação 24h
   - Destaques de variação significativa (badge ou seção especial)
3. Usuário pode:
   - **Buscar moeda**: digita no campo de busca → lista filtra em tempo real
   - **Ver detalhes de uma moeda**: observa saldo, variação, valor
   - **Ação rápida**: clica em Converter / Sacar / Depositar → navega para tela correspondente
4. **Exit**: Navegação para qualquer tela via sidebar/bottom nav, ou ação rápida

### F-DASH-001-ERR: Dashboard — Error Paths
- **Erro de carregamento**: Se dados mock falham → exibir estado de erro com botão "Tentar novamente"
- **Empty state (SCR-EMPTY)**: Se usuário não tem moedas → exibir mensagem "Você ainda não tem moedas" com CTA "Fazer primeiro depósito" → navega para SCR-DEPOSIT

---

## F-CONV-001: Converter Moedas (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Dashboard (quick action "Converter") ou Sidebar/Nav
**Screen**: SCR-CONVERT

1. Usuário clica em "Converter" → navega para `/convert`
2. Tela exibe:
   - Seletor de moeda de origem (dropdown com busca)
   - Campo de valor a converter
   - Seletor de moeda de destino (dropdown com busca)
   - Botão de swap (inverter par)
   - Preview do valor convertido em tempo real
   - Taxa de câmbio e fee estimado
3. Usuário seleciona moeda de origem (ex: BTC)
4. Usuário digita o valor (ex: 0.01 BTC)
5. Usuário seleciona moeda de destino (ex: ETH)
6. Preview atualiza automaticamente (ex: ~0.15 ETH)
7. Usuário clica "Converter"
8. **Modal de confirmação** aparece com resumo:
   - De: 0.01 BTC
   - Para: ~0.15 ETH
   - Taxa: 0.1%
   - Botões: "Confirmar" / "Cancelar"
9. Usuário clica "Confirmar"
10. Toast de sucesso: "Conversão realizada com sucesso!"
11. **Exit**: Retorna ao Dashboard ou permanece para nova conversão

### F-CONV-001-ERR: Conversão — Error Paths
- **Saldo insuficiente**: Ao digitar valor > saldo disponível → campo fica vermelho + mensagem "Saldo insuficiente" → botão "Converter" desabilitado
- **Mesma moeda**: Se origem = destino → mensagem "Selecione moedas diferentes" → botão desabilitado
- **Valor zero/vazio**: Botão "Converter" permanece desabilitado
- **Valor inválido**: Caracteres não numéricos → campo rejeita input
- **Falha na conversão**: Toast de erro "Erro ao converter. Tente novamente."

---

## F-SAQUE-001: Sacar Moedas (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Dashboard (quick action "Sacar") ou Sidebar/Nav
**Screen**: SCR-WITHDRAW

1. Usuário clica em "Sacar" → navega para `/withdraw`
2. Tela exibe:
   - Seletor de moeda
   - Saldo disponível para a moeda selecionada
   - Campo de valor a sacar
   - Seletor de método: Crypto (endereço) / Fiat (dados bancários)
   - Se crypto: campo de endereço de destino + seleção de rede
   - Se fiat: campos de dados bancários (banco, agência, conta)
   - Taxa estimada de saque
3. Usuário seleciona moeda (ex: BTC)
4. Seleciona método: Crypto
5. Digita endereço de destino
6. Seleciona rede (ex: Bitcoin Network)
7. Digita valor (ex: 0.005 BTC)
8. Tela mostra: taxa estimada, valor líquido a receber
9. Clica "Sacar"
10. **Modal de confirmação** com resumo completo
11. Usuário clica "Confirmar"
12. Toast de sucesso: "Saque solicitado com sucesso!"
13. **Exit**: Retorna ao Dashboard; transação aparece em Histórico como "Pendente"

### F-SAQUE-001-ERR: Saque — Error Paths
- **Saldo insuficiente**: Valor > saldo → campo vermelho + mensagem + botão desabilitado
- **Endereço inválido** (crypto): Formato incorreto → mensagem "Endereço inválido para esta rede"
- **Valor mínimo**: Abaixo do mínimo permitido → mensagem "Valor mínimo: X"
- **Campos obrigatórios vazios**: Botão "Sacar" permanece desabilitado
- **Falha no saque**: Toast de erro "Erro ao processar saque. Tente novamente."

---

## F-DEP-001: Depositar Moedas (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Dashboard (quick action "Depositar") ou Sidebar/Nav
**Screen**: SCR-DEPOSIT

1. Usuário clica em "Depositar" → navega para `/deposit`
2. Tela exibe:
   - Seletor de moeda
   - Seletor de rede
3. Usuário seleciona moeda (ex: BTC) e rede (ex: Bitcoin Network)
4. Tela exibe:
   - Endereço de depósito
   - QR Code do endereço
   - Botão "Copiar endereço" (com feedback: "Copiado!")
   - Aviso: "Envie apenas BTC nesta rede. Depósitos em outra moeda/rede serão perdidos."
   - Informação de confirmações necessárias
5. Usuário copia o endereço ou escaneia QR
6. **Exit**: Usuário volta ao Dashboard; depósito aparecerá em Histórico quando confirmado

### F-DEP-001-ERR: Depósito — Error Paths
- **Nenhuma moeda selecionada**: Endereço não é exibido até seleção
- **Erro ao gerar endereço**: Mensagem de erro + botão "Tentar novamente"

---

## F-ALERT-001: Configurar Alerta de Preço (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Navegação para Alertas ou Dashboard (ação na moeda)
**Screen**: SCR-ALERTS → SCR-ALERT-CREATE

1. Usuário navega para `/alerts`
2. Tela exibe lista de alertas ativos (se houver) com toggle on/off e botão delete
3. Usuário clica "Criar Alerta"
4. Formulário (modal ou inline) exibe:
   - Seletor de moeda
   - Tipo de alerta: "Subiu mais de X%" / "Caiu mais de X%"
   - Campo de porcentagem (ex: 5%)
5. Usuário preenche: BTC, "Subiu mais de", 5%
6. Clica "Salvar"
7. Toast: "Alerta criado com sucesso!"
8. Alerta aparece na lista de alertas ativos
9. **Exit**: Permanece em Alertas ou navega para outro lugar

### F-ALERT-001-TRIGGER: Alerta Disparado
1. Simulação: variação de BTC atinge +5%
2. Badge aparece no ícone de Alertas na navegação
3. Banner ou toast no Dashboard: "BTC subiu 5.2% nas últimas 24h!"
4. Usuário pode clicar para ir ao Dashboard/ver detalhes

### F-ALERT-001-ERR: Alertas — Error Paths
- **Alerta duplicado**: Mesmo moeda + direção + % → mensagem "Alerta similar já existe"
- **Porcentagem inválida**: Valor <= 0 ou não numérico → campo vermelho + mensagem
- **Sem moeda selecionada**: Botão "Salvar" desabilitado

---

## F-HIST-001: Visualizar Histórico (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Navegação para Histórico
**Screen**: SCR-HISTORY

1. Usuário navega para `/history`
2. Tela exibe:
   - Barra de filtros: tipo (Todos / Conversão / Saque / Depósito), período, moeda
   - Lista de transações ordenada por data (mais recente primeiro)
   - Cada item mostra: tipo, moeda(s), valor, data, status (badge colorido)
3. Usuário pode filtrar por tipo, período ou moeda
4. Usuário clica em uma transação → navega para `/history/:txId`

### F-HIST-002: Detalhe da Transação
**Screen**: SCR-TX-DETAIL

1. Tela exibe todos os detalhes:
   - Tipo de operação
   - Data e hora
   - Moeda(s) envolvida(s)
   - Valor(es)
   - Taxa cobrada
   - Status (Pendente / Confirmada / Falhou)
   - Transaction ID (para crypto)
   - Endereço de destino (para saque)
2. Botão "Voltar" → retorna ao Histórico

### F-HIST-001-ERR: Histórico — Error/Edge Paths
- **Sem transações**: Empty state → "Nenhuma transação encontrada" + CTA para fazer primeira operação
- **Filtro sem resultados**: "Nenhuma transação para os filtros selecionados" + link "Limpar filtros"

---

## F-SETTINGS-001: Configurações (Happy Path)

**Actor**: Usuário Casual (P1)
**Entry**: Navegação para Configurações
**Screen**: SCR-SETTINGS

1. Usuário navega para `/settings`
2. Tela exibe seções:
   - **Moeda de exibição**: dropdown (BRL / USD / EUR) → salva automaticamente
   - **Tema**: toggle Dark / Light → aplica imediatamente
   - **Notificações**: toggles para alertas de preço
   - **Conta**: nome e email (apenas exibição no MVP)
3. Alterações são salvas automaticamente (localStorage)
4. Toast: "Preferências salvas"
5. **Exit**: Navegação para qualquer tela

---

## F-NAV-001: Navegação Global

### Desktop
1. Sidebar fixa à esquerda com logo, links de navegação e quick actions
2. Link ativo destacado visualmente
3. Conteúdo principal à direita da sidebar

### Mobile
1. Bottom navigation bar fixa com 4 itens: Home, Histórico, Alertas, Configurações
2. FAB (Floating Action Button) para ações rápidas (Converter, Sacar, Depositar)
3. Ao clicar FAB → menu expandido com 3 opções
4. Toque em qualquer opção → navega para a tela correspondente

---

## Edge Cases Gerais

- **EC-001 — Primeiro acesso (empty state)**: Usuário sem moedas → Dashboard exibe SCR-EMPTY com orientação para primeiro depósito
- **EC-002 — URL inválida**: Qualquer rota não reconhecida → SCR-404 com link para Dashboard
- **EC-003 — Dados não carregados**: Skeleton/loading state em todas as telas enquanto dados mockados "carregam"
- **EC-004 — Ação em moeda com saldo zero**: Botão de saque/conversão desabilitado ou mensagem informativa
- **EC-005 — Muitas moedas na lista**: Scroll suave + busca funcional para filtrar
- **EC-006 — Notificação de alerta enquanto navega**: Toast não intrusivo que aparece sobre qualquer tela
