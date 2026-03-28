# Estratégia de Produto — CryptoFolio

## Visão Geral

CryptoFolio é uma carteira de criptomoedas focada em **simplicidade radical**. O público-alvo são usuários não-técnicos que querem acompanhar, converter e sacar suas moedas sem fricção. A estratégia de produto prioriza clareza visual, velocidade de execução de tarefas e confiança do usuário em cada ação.

## Princípios de Design de Produto

1. **Zero Cognitive Load** — Cada tela tem um único propósito claro
2. **3-Click Rule** — Qualquer tarefa principal completável em 3 cliques ou menos
3. **Progressive Disclosure** — Mostrar apenas o necessário, detalhes sob demanda
4. **Trust Through Feedback** — Toda ação crítica tem confirmação e feedback visual
5. **Dark-First** — Tema escuro como padrão, otimizado para conforto visual

## Priorização de Features

### Must-Have (MVP)
| # | Feature | Justificativa | Complexidade |
|---|---------|---------------|-------------|
| 1 | Dashboard com saldo | Core da proposta — é o que o usuário vê ao abrir | Média |
| 2 | Busca rápida de saldo | Solicitação explícita do cliente | Baixa |
| 3 | Conversão de moedas | Funcionalidade core mencionada | Média |
| 4 | Saque | Funcionalidade core mencionada | Média |
| 5 | Alertas de preço | Solicitação explícita do cliente | Média |
| 6 | Dark mode | Preferência explícita do cliente | Baixa |
| 7 | Responsividade mobile/desktop | Requisito explícito | Alta |

### Nice-to-Have (Pós-MVP)
| # | Feature | Justificativa |
|---|---------|---------------|
| 1 | Histórico de transações | Útil mas não solicitado |
| 2 | Gráficos de variação detalhados | Pode agregar valor mas adiciona complexidade |
| 3 | Tela de configurações expandida | Mínimo é suficiente para MVP |

## Métricas de Sucesso

| Métrica | Target | Como Medir |
|---------|--------|------------|
| Time-to-First-Action | < 3 segundos | Tempo entre abertura e primeira interação útil |
| Task Completion Rate | > 95% | Conversão e saque concluídos vs iniciados |
| Navigation Depth | ≤ 2 níveis | Máximo de cliques para qualquer feature |
| Lighthouse Performance | > 90 | Audit automatizado |
| Mobile Usability | 100% | Lighthouse mobile audit |

## Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Interface muito simples perde funcionalidade | Alto | Média | Testes de usabilidade nos fluxos core |
| Dados mockados não representam realidade | Médio | Alta | Usar valores realistas e simular latência |
| Alertas sem backend real parecem artificiais | Médio | Alta | Simular variações com timers e animações |
| Responsividade em edge cases | Médio | Média | Breakpoints bem definidos, testes em múltiplos viewports |
| Tela de saque sem validação real | Baixo | Alta | UX de feedback convincente mesmo com mock |

## Estratégia de Navegação

### Mobile
- **Bottom Navigation Bar** com 4 itens (Dashboard, Converter, Sacar, Alertas)
- Config acessível via ícone de gear no header do Dashboard
- Navegação por gestos: swipe entre tabs não é necessário (simplicidade)

### Desktop
- **Sidebar fixa** à esquerda com 5 itens (Dashboard, Converter, Sacar, Alertas, Config)
- Content area centralizada com max-width para legibilidade
- Sidebar colapsável para telas menores

## Estratégia de Feedback

| Ação | Feedback |
|------|----------|
| Conversão confirmada | Modal de sucesso com confetti sutil + redirect ao dashboard |
| Saque confirmado | Modal com ícone de check + status "Processando" |
| Alerta criado | Toast success + item aparece na lista com animação |
| Alerta disparado | Toast notification no topo (qualquer tela) |
| Erro de formulário | Inline error message abaixo do campo |
| Saldo insuficiente | Mensagem inline + desabilitar botão de ação |
| Loading | Skeleton screens (nunca spinner genérico) |
| Empty state | Ilustração + mensagem + CTA |
