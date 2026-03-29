# User Flows — CryptoFolio

## Convenções

- **Flow ID**: `F-{DOMAIN}-{NNN}` — identificador estável
- **Screen refs**: `S-{ID}` conforme definido em `sitemap.md` e `scope.md`
- **[if]** — ponto de decisão / bifurcação
- **[error]** — caminho de erro
- **[success]** — caminho de sucesso

---

## F-AUTH-001: Cadastro de Novo Usuário

**Ator**: Visitante (P2)
**Objetivo**: Criar conta na plataforma
**Entry point**: S-LANDING ou S-AUTH-LOGIN (link "Criar conta")

1. Usuário acessa S-AUTH-SIGNUP
2. Preenche formulário: nome, email, senha, confirmar senha
3. Clica em "Criar conta"
4. **[if]** Validação falha (email inválido, senha fraca, senhas não coincidem)
   - 4a. Exibe mensagens de erro inline abaixo dos campos
   - 4b. Volta ao passo 2
5. **[if]** Email já existe
   - 5a. Exibe erro "Email já cadastrado"
   - 5b. Link para "Fazer login"
6. **[success]** Conta criada
7. Redireciona para S-DASH (Dashboard) — primeiro acesso (empty state)

**Edge cases**:
- E1: Usuário perde conexão durante cadastro → toast de erro com "Tentar novamente"
- E2: Primeiro acesso → Dashboard mostra empty state com CTAs para "Fazer primeiro depósito"

---

## F-AUTH-002: Login

**Ator**: Visitante (P2)
**Objetivo**: Acessar conta existente
**Entry point**: S-LANDING, S-AUTH-SIGNUP (link "Já tenho conta"), URL direta

1. Usuário acessa S-AUTH-LOGIN
2. Preenche email e senha
3. Clica em "Entrar"
4. **[if]** Credenciais inválidas
   - 4a. Exibe erro "Email ou senha incorretos"
   - 4b. Volta ao passo 2
5. **[if]** Muitas tentativas (rate limit)
   - 5a. Exibe "Muitas tentativas. Tente novamente em X minutos"
6. **[success]** Autenticado
7. Redireciona para S-DASH

---

## F-AUTH-003: Recuperação de Senha

**Ator**: Visitante (P2)
**Objetivo**: Resetar senha esquecida
**Entry point**: S-AUTH-LOGIN (link "Esqueceu a senha?")

1. Usuário acessa S-AUTH-FORGOT
2. Insere email
3. Clica em "Enviar link"
4. **[if]** Email não encontrado
   - 4a. Exibe mesma mensagem de sucesso (segurança — não revelar existência)
5. **[success]** Exibe mensagem "Enviamos um link para seu email"
6. Usuário clica no link no email → acessa S-AUTH-RESET
7. Insere nova senha + confirmar
8. **[if]** Token expirado
   - 8a. Exibe "Link expirado. Solicite novo link." com botão para S-AUTH-FORGOT
9. **[success]** Senha atualizada
10. Redireciona para S-AUTH-LOGIN com toast "Senha atualizada com sucesso"

---

## F-DASH-001: Visualizar Dashboard

**Ator**: Usuário autenticado (P1)
**Objetivo**: Ver visão geral do portfólio
**Entry point**: Login, Sidebar

1. Usuário acessa S-DASH
2. **[if]** Primeiro acesso (sem ativos)
   - 2a. Exibe empty state: "Seu portfólio está vazio"
   - 2b. CTA "Fazer primeiro depósito" → S-DEP
3. **[if]** Tem ativos
   - 3a. Exibe saldo total em BRL (topo)
   - 3b. Variação do portfólio (24h) — verde se positivo, vermelho se negativo
   - 3c. Gráfico de evolução (últimos 7 dias por padrão)
   - 3d. Lista de ativos (ícone, nome, quantidade, valor BRL, variação 24h)
   - 3e. Quick actions: Depositar, Converter, Sacar
   - 3f. Últimas 5 transações
4. Usuário usa busca rápida para filtrar ativo por nome/símbolo
5. Clicar em ativo → S-WALL-DETAIL
6. Clicar em "Ver todas" (transações) → S-HIST

---

## F-WALL-001: Visualizar Carteira

**Ator**: Usuário autenticado (P1)
**Objetivo**: Ver todos os ativos detalhadamente
**Entry point**: Sidebar → Carteira

1. Usuário acessa S-WALL
2. **[if]** Sem ativos → empty state com CTA para depósito
3. Lista completa de ativos com: ícone, nome, símbolo, quantidade, valor total BRL, variação 24h
4. Filtros: ordenar por valor (desc/asc), nome (A-Z), variação
5. Busca por nome/símbolo
6. Clicar em ativo → S-WALL-DETAIL

---

## F-WALL-002: Detalhe do Ativo

**Ator**: Usuário autenticado (P1)
**Objetivo**: Ver detalhes de uma moeda específica
**Entry point**: S-WALL (clicar em ativo), S-DASH (clicar em ativo)

1. Usuário acessa S-WALL-DETAIL (ex: `/app/wallet/bitcoin`)
2. Exibe: ícone, nome, preço atual, variação 24h, saldo do usuário, valor em BRL
3. Gráfico de preço (7d/30d/90d)
4. Botões de ação: Depositar, Converter, Sacar (pré-selecionando esta moeda)
5. Histórico de transações desta moeda (tabela desktop / cards mobile)
6. **[if]** Sem transações → empty state "Nenhuma transação com {moeda}"

---

## F-DEP-001: Depositar Criptomoeda

**Ator**: Usuário autenticado (P1)
**Objetivo**: Receber cripto na carteira
**Entry point**: Sidebar → Depositar, Dashboard quick action, Detalhe do ativo

1. Usuário acessa S-DEP
2. Seleciona moeda para depósito (dropdown com ícones)
3. **[if]** Moeda pré-selecionada (vindo de S-WALL-DETAIL) → pula seleção
4. Exibe endereço de carteira + QR code
5. Botão "Copiar endereço" → toast "Endereço copiado!"
6. Aviso: "Envie apenas {moeda} para este endereço. Enviar outra moeda pode resultar em perda."
7. **[if]** Depósito detectado
   - 7a. Status muda para "Confirmando..." (pendente)
   - 7b. Após confirmações da rede → S-DEP-SUCCESS (modal de sucesso)
8. Histórico de depósitos abaixo do formulário (tabela/cards)
9. **[if]** Sem histórico → empty state

**Error paths**:
- E1: Falha na geração do endereço → tela de erro com "Tentar novamente"
- E2: Depósito falho (rede) → status "Falho" no histórico com detalhes

---

## F-CONV-001: Converter Moedas

**Ator**: Usuário autenticado (P1)
**Objetivo**: Trocar uma moeda por outra
**Entry point**: Sidebar → Converter, Dashboard quick action, Detalhe do ativo

1. Usuário acessa S-CONV
2. Seleciona moeda de origem (ex: BTC) — dropdown com saldo disponível
3. Seleciona moeda de destino (ex: ETH) — dropdown
4. **[if]** Moedas pré-selecionadas (vindo de contexto) → preenche automaticamente
5. Insere valor a converter
6. Preview em tempo real: "Você receberá ~X.XX ETH"
7. Exibe taxa de conversão e fee estimado
8. **[if]** Saldo insuficiente
   - 8a. Mensagem inline "Saldo insuficiente. Disponível: X.XX BTC"
   - 8b. Botão de submit desabilitado
9. **[if]** Valor menor que mínimo → mensagem "Valor mínimo: X.XX"
10. Clica em "Converter"
11. Modal de confirmação com resumo: de, para, valor, taxa, fee
12. Confirma no modal
13. **[if]** Erro no servidor → toast de erro "Falha na conversão. Tente novamente."
14. **[success]** → Modal/tela de sucesso (S-CONV-SUCCESS) com:
    - Ícone de sucesso (check verde)
    - Resumo: "X.XX BTC convertidos para Y.YY ETH"
    - Botão "Baixar Recibo"
    - Botão "Voltar para Conversão"
15. Histórico de conversões abaixo do formulário
16. **[if]** Sem histórico → empty state

---

## F-SAQUE-001: Sacar (Withdrawal)

**Ator**: Usuário autenticado (P1)
**Objetivo**: Enviar cripto para wallet externa ou fiat para conta bancária
**Entry point**: Sidebar → Sacar, Dashboard quick action, Detalhe do ativo

1. Usuário acessa S-SAQUE
2. Seleciona moeda para saque (dropdown)
3. **[if]** Moeda é cripto (BTC, ETH, etc.)
   - 3a. Insere endereço de destino (wallet externa)
   - 3b. Insere valor
   - 3c. Exibe fee de rede estimado e valor líquido
4. **[if]** Moeda é fiat (BRL)
   - 4a. Seleciona conta bancária cadastrada (ou adicionar nova)
   - 4b. **[if]** Sem contas cadastradas → link para S-SET-BANKS "Cadastre uma conta primeiro"
   - 4c. Insere valor
   - 4d. Exibe taxa (se houver) e valor líquido
5. **[if]** Saldo insuficiente → mensagem inline, botão desabilitado
6. Clica em "Sacar"
7. Modal de confirmação: moeda, valor, destino, fee, valor líquido
8. Confirma no modal
9. **[if]** Erro → toast de erro
10. **[success]** → S-SAQUE-SUCCESS (modal/tela):
    - Ícone de sucesso
    - "Saque de X.XX BTC enviado para {endereço/conta}"
    - Tempo estimado: "30 min a 1 hora"
    - Botão "Baixar Recibo"
    - Botão "Voltar para Saque"
11. Histórico de saques abaixo
12. **[if]** Sem histórico → empty state

---

## F-ALERT-001: Criar Alerta de Preço

**Ator**: Usuário autenticado (P1)
**Objetivo**: Ser notificado quando uma moeda atingir valor-alvo
**Entry point**: Sidebar → Alertas

1. Usuário acessa S-ALERT
2. Lista de alertas ativos (se houver)
3. **[if]** Sem alertas → empty state "Nenhum alerta configurado" com CTA
4. Clica em "Novo Alerta" → S-ALERT-CREATE (modal ou inline)
5. Seleciona moeda (dropdown)
6. Seleciona tipo: "Acima de" ou "Abaixo de"
7. Insere valor-alvo (em BRL ou USD)
8. **[if]** Valor igual ao preço atual → aviso "Valor muito próximo do preço atual"
9. Clica em "Criar Alerta"
10. **[success]** → Alerta aparece na lista, toast "Alerta criado!"
11. Quando alerta é disparado:
    - 11a. Toast notification no app
    - 11b. Badge no ícone de Alertas no sidebar
    - 11c. Alerta movido para "Histórico de alertas"

**Additional flows**:
- Editar alerta: clicar em alerta existente → modal de edição
- Excluir alerta: botão delete → modal de confirmação "Tem certeza?" → confirmar

---

## F-HIST-001: Visualizar Histórico

**Ator**: Usuário autenticado (P1)
**Objetivo**: Ver todas as transações passadas
**Entry point**: Sidebar → Histórico, Dashboard "Ver todas"

1. Usuário acessa S-HIST
2. **[if]** Sem transações → empty state
3. Tabela (desktop) / Cards (mobile) com: tipo, moeda, valor, status, data
4. Filtros: tipo (depósito, conversão, saque), moeda, período (7d, 30d, 90d, custom), status
5. Ordenação por data (padrão: mais recente primeiro)
6. Paginação (ou scroll infinito)
7. Clicar em transação → S-HIST-DETAIL (modal):
   - Tipo de transação
   - Moedas envolvidas
   - Valor, fee, valor líquido
   - Status com timeline (pendente → confirmado)
   - Hash da transação (se blockchain)
   - Data/hora
   - Botão "Baixar Recibo"
8. Botão "Exportar CSV" → download do histórico filtrado

---

## F-SET-001: Editar Perfil

**Ator**: Usuário autenticado (P1)
**Entry point**: Sidebar → Configurações → Perfil

1. Usuário acessa S-SET-PROFILE
2. Exibe formulário: nome, email (read-only), avatar
3. Edita nome
4. Upload de avatar (imagem)
5. Clica em "Salvar"
6. **[if]** Erro → toast de erro
7. **[success]** → toast "Perfil atualizado"

---

## F-SET-002: Alterar Senha

**Ator**: Usuário autenticado (P1)
**Entry point**: Sidebar → Configurações → Segurança

1. Usuário acessa S-SET-SECURITY
2. Insere senha atual
3. Insere nova senha + confirmar
4. Clica em "Alterar senha"
5. **[if]** Senha atual incorreta → erro inline
6. **[if]** Nova senha fraca → erro inline com requisitos
7. **[success]** → toast "Senha alterada com sucesso"

---

## F-SET-003: Gerenciar Contas Bancárias

**Ator**: Usuário autenticado (P1)
**Entry point**: Sidebar → Configurações → Contas Bancárias

1. Usuário acessa S-SET-BANKS
2. **[if]** Sem contas → empty state com CTA "Adicionar conta"
3. Lista contas cadastradas (banco, agência, conta, chave PIX)
4. Clica em "Adicionar conta" → modal de formulário
5. Preenche: banco, agência, conta, tipo (corrente/poupança), chave PIX
6. Salva → conta aparece na lista
7. Editar conta: clicar em conta → modal de edição
8. Excluir conta: botão delete → modal "Tem certeza?" → confirmar
9. **[if]** Conta em uso por saque pendente → não pode excluir

---

## F-SET-004: Preferências

**Ator**: Usuário autenticado (P1)
**Entry point**: Sidebar → Configurações → Preferências

1. Usuário acessa S-SET-PREFS
2. Toggle de tema: Dark (padrão) / Light
3. Moeda fiat padrão: BRL (padrão) / USD
4. Altera preferência → salva automaticamente
5. Toast "Preferências salvas"

---

## F-SET-005: Configurações de Notificação

**Ator**: Usuário autenticado (P1)
**Entry point**: Sidebar → Configurações → Notificações

1. Usuário acessa S-SET-NOTIF
2. Toggles:
   - Alertas de preço (in-app) — padrão: ON
   - Alertas de preço (email) — padrão: OFF
   - Confirmações de transação (email) — padrão: ON
   - Newsletter/novidades — padrão: OFF
3. Altera toggle → salva automaticamente

---

## F-SUPP-001: Acessar Suporte

**Ator**: Usuário autenticado (P1)
**Entry point**: Sidebar footer → Suporte

1. Usuário acessa S-SUPP
2. Lista de FAQs com accordion (expandir/colapsar)
3. Campo de busca para filtrar perguntas
4. Seção "Não encontrou resposta?" com link para email de suporte
5. **[if]** Busca sem resultados → "Nenhum resultado. Entre em contato pelo email."

---

## F-LANDING-001: Landing Page

**Ator**: Visitante (P2)
**Entry point**: URL direta `/`

1. Hero section: headline, sub-headline, CTA "Criar conta grátis"
2. Features section: 3-4 cards com benefícios principais
3. How it works: 3 passos simples
4. CTA final: "Comece agora"
5. Footer: links para Termos, Privacidade, Suporte

---

## Error Paths (Transversais)

### E-NET-001: Perda de Conexão

- Qualquer tela → toast "Sem conexão com a internet"
- Ações que dependem de rede → desabilitadas com mensagem inline
- Ao reconectar → toast "Conexão restaurada" + reload dos dados

### E-AUTH-001: Sessão Expirada

- Qualquer tela autenticada → redirect para S-AUTH-LOGIN
- Toast "Sessão expirada. Faça login novamente."
- Preservar URL de retorno para redirecionar após re-login

### E-SERVER-001: Erro do Servidor (500)

- Toast "Algo deu errado. Tente novamente."
- Botão "Tentar novamente" onde aplicável
- Não mostrar detalhes técnicos ao usuário

### E-404-001: Página Não Encontrada

- Exibir S-404 com mensagem amigável
- Botão "Voltar ao Dashboard"
- Ilustração ou ícone temático

### E-PERM-001: Acesso Negado (403)

- Redirect para S-DASH se o recurso não existe para o usuário
- Toast "Você não tem permissão para acessar este recurso"
