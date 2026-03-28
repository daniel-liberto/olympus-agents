# Fluxos Detalhados — CryptoFolio

## Flow 1: Dashboard — Visualizar Portfólio

### States
| State | Descrição | Visual |
|-------|-----------|--------|
| Loading | Dados carregando | Skeleton screens para saldo e lista |
| Loaded | Dados disponíveis | Saldo + lista de moedas |
| Empty | Sem moedas no portfólio | Ilustração + "Você ainda não tem moedas" |
| Error | Falha ao carregar | Mensagem + botão "Tentar novamente" |

### Happy Path
```
1. App abre → state: Loading
2. Dados carregam (simulated 800ms) → state: Loaded
3. Header exibe:
   - Saldo total em destaque (ex: "R$ 45.230,00")
   - Variação total do dia (ex: "+2.3%") com cor verde/vermelho
4. Campo de busca visível abaixo do saldo
5. Lista de moedas exibe cards:
   - Ícone | Nome (BTC) | Valor atual | Variação % | Quantidade
6. Cards ordenados por valor em portfólio (maior → menor)
```

### Search Sub-flow
```
1. Usuário toca no campo de busca
2. Teclado abre (mobile) / focus (desktop)
3. Ao digitar, lista filtra em tempo real (debounce 300ms)
4. Se nenhum resultado: mensagem "Nenhuma moeda encontrada"
5. Ao limpar busca: lista volta ao estado completo
```

---

## Flow 2: Conversão de Moedas

### States
| State | Descrição | Visual |
|-------|-----------|--------|
| Initial | Formulário vazio | Campos de seleção + input |
| Previewing | Valor calculado | Preview da conversão em tempo real |
| Confirming | Modal de confirmação | Modal com resumo |
| Processing | Executando conversão | Loading indicator no botão |
| Success | Conversão realizada | Modal de sucesso |
| Error | Falha na conversão | Modal de erro |

### Happy Path
```
1. Usuário acessa /convert
2. Tela exibe:
   - Dropdown "De" (moeda origem) — pré-selecionado com moeda de maior saldo
   - Dropdown "Para" (moeda destino) — sem pré-seleção
   - Input de valor numérico
   - Área de preview (inicialmente oculta)
3. Usuário seleciona moeda origem
   → Mostra saldo disponível abaixo do dropdown: "Disponível: 0.5 BTC"
4. Usuário seleciona moeda destino
5. Usuário digita valor
   → Preview aparece em tempo real (debounce 500ms):
   "0.1 BTC ≈ 1.45 ETH (taxa: 0.1%)"
6. Usuário clica "Converter"
7. Modal de confirmação:
   - Título: "Confirmar Conversão"
   - Corpo: "Converter 0.1 BTC para ~1.45 ETH?"
   - Info: "Taxa: 0.001 BTC | Valor final: 1.449 ETH"
   - Botões: [Cancelar] [Confirmar]
8. Usuário clica "Confirmar" → state: Processing (1.5s simulated)
9. Modal de sucesso:
   - Ícone: ✓ verde
   - Título: "Conversão Realizada!"
   - Corpo: "0.1 BTC → 1.45 ETH"
   - Botão: [Voltar ao Dashboard]
```

### Error Paths
```
E1. Saldo insuficiente:
    - Ao digitar valor > saldo → input fica vermelho
    - Mensagem: "Saldo insuficiente. Disponível: 0.5 BTC"
    - Botão "Converter" fica desabilitado

E2. Mesma moeda selecionada:
    - Se origem === destino → mensagem inline
    - "Selecione moedas diferentes"

E3. Valor inválido:
    - Se valor ≤ 0 → "Digite um valor válido"
    - Se valor com mais de 8 decimais → truncar

E4. Falha na conversão (simulada):
    - Modal de erro:
      - Título: "Erro na Conversão"
      - Corpo: "Não foi possível completar. Tente novamente."
      - Botões: [Fechar] [Tentar Novamente]
```

### Validações de Formulário
| Campo | Regra | Mensagem |
|-------|-------|----------|
| Moeda origem | Obrigatório | "Selecione uma moeda" |
| Moeda destino | Obrigatório, ≠ origem | "Selecione moeda diferente da origem" |
| Valor | > 0, ≤ saldo, numérico | "Valor inválido" / "Saldo insuficiente" |

---

## Flow 3: Saque (Withdraw)

### States
| State | Descrição | Visual |
|-------|-----------|--------|
| Select | Seleção de moeda e valor | Form step 1 |
| Destination | Informar destino | Form step 2 |
| Review | Revisar dados | Resumo completo |
| Processing | Executando saque | Loading |
| Success | Saque solicitado | Confirmação com status |
| Error | Falha | Modal de erro |

### Happy Path
```
1. Usuário acessa /withdraw
2. Step 1 — Selecionar moeda e valor:
   - Dropdown de moeda (moedas do portfólio)
   - Ao selecionar: mostra saldo disponível
   - Input de valor
   - Botão "Usar tudo" (preenche com saldo total)
   - Botão "Próximo"
3. Step 2 — Destino:
   - Toggle: [Carteira Crypto] / [Conta Bancária]
   - Se Crypto: input "Endereço da carteira" + seleção de rede
   - Se Fiat: inputs "Banco", "Agência", "Conta"
   - Botão "Próximo"
4. Step 3 — Revisão:
   - Card com resumo:
     - Moeda: BTC
     - Valor: 0.05 BTC (~R$ 15.000)
     - Destino: 0x1234...5678
     - Taxa estimada: 0.0001 BTC
     - Valor final: 0.0499 BTC
   - Botões: [Voltar] [Confirmar Saque]
5. Usuário clica "Confirmar Saque" → state: Processing (2s)
6. Tela de sucesso:
   - Ícone: ✓
   - "Saque Solicitado!"
   - "Seu saque de 0.05 BTC está sendo processado"
   - Status: "⏳ Processando" (badge amarelo)
   - Botão: [Voltar ao Dashboard]
```

### Error Paths
```
E1. Saldo insuficiente: igual ao Flow 2

E2. Endereço de carteira inválido:
    - Validação básica de formato
    - "Endereço inválido. Verifique e tente novamente."

E3. Dados bancários incompletos:
    - Highlight nos campos faltantes
    - "Preencha todos os campos obrigatórios"

E4. Falha no saque:
    - Modal: "Não foi possível processar o saque. Tente novamente."
```

### Validações
| Campo | Regra | Mensagem |
|-------|-------|----------|
| Moeda | Obrigatório | "Selecione uma moeda" |
| Valor | > 0, ≤ saldo | "Valor inválido" / "Saldo insuficiente" |
| Endereço crypto | Formato válido (0x... ou similar) | "Endereço inválido" |
| Banco | Obrigatório (se fiat) | "Campo obrigatório" |
| Agência | Numérico, obrigatório | "Agência inválida" |
| Conta | Numérico, obrigatório | "Conta inválida" |

---

## Flow 4: Alertas de Preço

### States
| State | Descrição |
|-------|-----------|
| List | Lista de alertas existentes |
| Empty | Sem alertas configurados |
| Creating | Formulário de novo alerta |
| Editing | Editando alerta existente |

### Happy Path — Criar Alerta
```
1. Usuário acessa /alerts
2. Tela exibe lista de alertas (ou empty state)
3. Usuário toca no botão "+" / "Novo Alerta"
4. Formulário inline ou modal:
   - Dropdown: selecionar moeda
   - Toggle: "Quando subir ↑" / "Quando descer ↓"
   - Input: porcentagem limiar (ex: 5%)
   - Botão: [Criar Alerta]
5. Alerta criado:
   - Toast: "Alerta criado com sucesso!"
   - Item aparece na lista com animação slide-in
   - Estado: toggle "Ativo" (verde)
```

### Happy Path — Gerenciar Alertas
```
1. Cada alerta na lista mostra:
   - Ícone da moeda | Nome | Tipo (↑/↓) | Limiar (%) | Toggle ativo/inativo
2. Toggle de ativação: tap para ativar/desativar
3. Swipe left (mobile) ou hover (desktop) revela botão "Excluir"
4. Tap no alerta: expande para editar
5. Editar: mesmos campos da criação + botão [Salvar]
```

### Happy Path — Alerta Disparado
```
1. Preço da moeda varia além do limiar configurado
2. Toast notification aparece (qualquer tela):
   - Ícone: 🔔 + ícone da moeda
   - Título: "Bitcoin subiu 5.2%!"
   - Subtítulo: "Preço atual: R$ 320.000"
   - Ação: tap → navega ao Dashboard
3. Toast permanece 5 segundos, depois desaparece
4. Na tela de Alertas, o item fica highlighted temporariamente
```

### Validações
| Campo | Regra | Mensagem |
|-------|-------|----------|
| Moeda | Obrigatório | "Selecione uma moeda" |
| Tipo | Obrigatório (up/down) | — (sempre tem default) |
| Limiar | > 0, ≤ 100, numérico | "Porcentagem inválida" |

---

## Flow 5: Configurações

### Happy Path
```
1. Usuário acessa /settings
2. Tela exibe:
   - Seção "Moeda Padrão": dropdown [BRL / USD / EUR]
   - Seção "Sobre": versão do app, links
3. Mudança é salva automaticamente (sem botão salvar)
4. Toast: "Configuração atualizada"
```
