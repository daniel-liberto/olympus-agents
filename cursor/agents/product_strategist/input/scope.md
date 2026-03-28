# Escopo do Projeto — CryptoFolio

## Nome do Projeto
**CryptoFolio** — Carteira de Criptomoedas Simplificada

## Objetivo Principal
Criar uma aplicação web responsiva (mobile-first + desktop) que permita ao usuário visualizar seu portfólio de criptomoedas, converter entre moedas e realizar saques de forma rápida e intuitiva, com uma interface clean, moderna e em tema dark.

## Público-Alvo
- Usuários iniciantes/intermediários em criptomoedas
- Pessoas que não têm conhecimento técnico profundo
- Usuários que valorizam simplicidade e clareza na interface
- Faixa etária estimada: 20-40 anos
- Perfil: mobile-heavy, mas também usam notebook

## Funcionalidades Principais

### F1 — Dashboard / Tela Inicial
- Exibição do saldo total consolidado (destaque visual)
- Listagem das moedas do portfólio com valores atuais
- Busca rápida de saldo (campo de busca na tela inicial)
- Variação de preço das moedas (indicador visual de alta/baixa)

### F2 — Conversão de Moedas
- Converter entre criptomoedas e/ou para fiat
- Interface simples: selecionar moeda origem → moeda destino → valor
- Pré-visualização da conversão antes de confirmar
- Confirmação com feedback visual

### F3 — Saque (Withdraw)
- Solicitar saque de valores
- Selecionar moeda e valor
- Informar dados de destino
- Confirmação e acompanhamento do status

### F4 — Sistema de Alertas de Preço
- Configurar alertas para quando uma moeda subir ou descer além de um limiar
- Notificações visuais dentro do app
- Possibilidade de ativar/desativar alertas por moeda

### F5 — Navegação Simplificada
- Navegação bottom-bar (mobile) / sidebar (desktop)
- Máximo de 4-5 itens de navegação principal
- Sem menus profundos ou opções confusas

## Funcionalidades Fora do Escopo
- **Tela de login/cadastro** — Não mencionada pelo cliente, não será incluída
- **Trading avançado** (order book, limit orders, charts avançados) — Cliente quer simplicidade
- **Depósito de moedas** — Não mencionado explicitamente
- **Chat/suporte ao vivo** — Não mencionado
- **Integração com exchanges reais** (API Binance, etc.) — Escopo apenas de frontend
- **Backend/API real** — Projeto é frontend-only com dados mockados

## Restrições Técnicas
- **Stack:** React + Vite + TypeScript + TailwindCSS
- **Frontend-only:** Sem backend, dados serão mockados
- **Tema:** Dark mode como padrão (preferência explícita do cliente)
- **Responsivo:** Deve funcionar bem em celular (mobile-first) e em notebook/desktop
- **Performance:** Target Lighthouse > 90

## Restrições de Negócio
- Interface deve ser extremamente simples — cliente explicitamente não quer complexidade
- Não deve parecer "coisa de banco antigo" — design moderno obrigatório
- Foco em usabilidade sobre quantidade de features

## Ambiguidades Identificadas
1. **"Minhas moedas"** — Assumimos que o usuário já possui um portfólio pré-carregado (mock)
2. **"Converter rapidamente"** — Assumimos conversão crypto↔crypto e crypto↔fiat
3. **"Sacar quando precisar"** — Assumimos funcionalidade de saque para conta bancária (mock do fluxo)
4. **"Alerta quando subir ou descer muito"** — O limiar será configurável pelo usuário
5. **"Buscar o saldo rapidamente"** — Interpretamos como um campo de busca/filtro na tela principal
6. **Sem menção a autenticação** — App abre direto no dashboard

## Critérios de Aceitação
- [ ] Usuário consegue ver saldo total e por moeda na tela inicial
- [ ] Usuário consegue buscar/filtrar moedas na tela inicial
- [ ] Usuário consegue converter entre moedas em no máximo 3 cliques
- [ ] Usuário consegue iniciar um saque em no máximo 3 cliques
- [ ] Alertas de preço funcionam visualmente no app
- [ ] Interface é 100% dark mode
- [ ] App funciona bem em telas de 375px (mobile) até 1440px (desktop)
- [ ] Design é clean, moderno e minimalista
