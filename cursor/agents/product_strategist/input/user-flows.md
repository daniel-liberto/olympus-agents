# User Flows — CryptoFolio

## Flow 1: Visualizar Portfólio (Core)

**Ponto de entrada:** Abertura do app
**Ponto de saída:** Usuário informado sobre seu portfólio

```
1. Usuário abre o app
2. Dashboard carrega automaticamente
3. Saldo total consolidado é exibido em destaque no topo
4. Lista de moedas do portfólio é exibida abaixo
   - Cada moeda mostra: ícone, nome, valor atual, variação %, quantidade
5. Usuário pode rolar para ver todas as moedas
6. [Opcional] Usuário usa campo de busca para filtrar moeda específica
   6a. Digita nome/símbolo da moeda
   6b. Lista filtra em tempo real
```

## Flow 2: Converter Moedas

**Ponto de entrada:** Tap no item "Converter" na navegação ou atalho do dashboard
**Ponto de saída:** Conversão confirmada com feedback visual

```
1. Usuário acessa tela de Conversão
2. Seleciona moeda de ORIGEM (dropdown com moedas do portfólio)
3. Seleciona moeda de DESTINO (dropdown com moedas disponíveis)
4. Digita o VALOR a converter
5. Sistema exibe em tempo real:
   - Taxa de conversão
   - Valor estimado a receber
6. Usuário clica em "Converter"
7. Modal de confirmação aparece com resumo:
   - De: X BTC → Para: Y ETH
   - Taxa aplicada
   - Valor final
8. Usuário confirma
   → 8a. SUCESSO: Tela/modal de sucesso com opção de voltar ao dashboard
   → 8b. ERRO: Mensagem de erro com opção de tentar novamente
```

## Flow 3: Realizar Saque

**Ponto de entrada:** Tap no item "Sacar" na navegação ou atalho do dashboard
**Ponto de saída:** Saque solicitado com confirmação

```
1. Usuário acessa tela de Saque
2. Seleciona moeda para saque (dropdown)
3. Sistema mostra saldo disponível daquela moeda
4. Usuário digita o VALOR a sacar
   → 4a. Se valor > saldo: exibir mensagem de saldo insuficiente
5. Usuário informa dados de destino:
   - Para crypto: endereço da carteira
   - Para fiat: dados bancários (simplificado)
6. Tela de revisão exibe resumo completo:
   - Moeda, valor, destino, taxas estimadas
7. Usuário confirma o saque
   → 7a. SUCESSO: Tela de confirmação com status "Processando"
   → 7b. ERRO: Mensagem com opção de corrigir dados
```

## Flow 4: Configurar Alerta de Preço

**Ponto de entrada:** Tela de Alertas na navegação
**Ponto de saída:** Alerta criado e ativo

```
1. Usuário acessa tela de Alertas
2. Vê lista de alertas existentes (se houver)
   - Cada alerta mostra: moeda, tipo (alta/baixa), limiar, status (ativo/inativo)
3. Usuário toca em "Criar Alerta" (botão + )
4. Seleciona a moeda
5. Define o tipo: "Alertar quando SUBIR" ou "Alertar quando DESCER"
6. Define o limiar em porcentagem (ex: 5%)
7. Confirma a criação
8. Alerta aparece na lista como "Ativo"
```

## Flow 5: Receber Notificação de Alerta

**Ponto de entrada:** Variação de preço atinge o limiar configurado
**Ponto de saída:** Usuário notificado e ciente

```
1. Sistema detecta que preço da moeda X variou além do limiar
2. Toast notification aparece no topo da tela (qualquer tela)
   - Mostra: ícone da moeda, "BTC subiu 5.2%!", ação rápida
3. Usuário pode:
   → 3a. Ignorar (toast desaparece em 5s)
   → 3b. Tap no toast → vai para Dashboard com moeda destacada
```

## Flow 6: Busca Rápida de Saldo

**Ponto de entrada:** Dashboard
**Ponto de saída:** Moeda encontrada

```
1. Usuário está no Dashboard
2. Toca no campo de busca (sempre visível no topo)
3. Digita nome ou símbolo da moeda (ex: "BTC" ou "Bitcoin")
4. Lista filtra em tempo real
5. Moeda aparece com todas as informações de saldo
6. [Opcional] Tap na moeda pode expandir detalhes
```

## Resumo dos Fluxos

| # | Fluxo | Passos | Complexidade |
|---|-------|--------|-------------|
| 1 | Visualizar Portfólio | 6 | Baixa |
| 2 | Converter Moedas | 8 | Média |
| 3 | Realizar Saque | 7 | Média |
| 4 | Configurar Alerta | 8 | Baixa |
| 5 | Receber Notificação | 3 | Baixa |
| 6 | Busca Rápida | 6 | Baixa |

## Pontos de Decisão Identificados

| Local | Decisão | Caminhos |
|-------|---------|----------|
| Conversão (passo 8) | Confirmação | Sucesso / Erro |
| Saque (passo 4) | Validação de saldo | Suficiente / Insuficiente |
| Saque (passo 7) | Confirmação | Sucesso / Erro |
| Alerta (passo 5) | Tipo de alerta | Alta / Baixa |
| Notificação (passo 3) | Ação do usuário | Ignorar / Interagir |
