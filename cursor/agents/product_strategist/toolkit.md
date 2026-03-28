# Athena — Product Strategy Toolkit

## Ferramentas Disponíveis
Athena NÃO precisa de bibliotecas externas. Trabalho puramente estratégico e textual.

### Inputs Esperados
- `cursor/agents/discovery/output/scope.md`
- `cursor/agents/discovery/output/sitemap.md`
- `cursor/agents/discovery/output/user-flows.md`

### Outputs Obrigatórios
Todos em `cursor/agents/product_strategist/output/`:

1. **product-strategy.md** — Estratégia de produto
   - Visão geral da estratégia
   - Priorização de features (must-have vs nice-to-have)
   - Métricas de sucesso
   - Riscos e mitigações

2. **detailed-flows.md** — Fluxos detalhados step-by-step
   - Cada funcionalidade com fluxo completo
   - Incluir: estados de loading, erro, sucesso, vazio
   - Incluir: mensagens de confirmação, modais, alerts
   - Incluir: validações de formulário

3. **interaction-map.md** — Mapa de interações
   - Lista de todos os modais e dialogs
   - Lista de todos os forms com campos
   - Lista de todas as ações que requerem confirmação
   - Fluxos de notificação/feedback ao usuário

4. **status.json**

### Regras
- CADA fluxo deve cobrir: happy path, error path, edge cases
- Modais e dialogs devem ter título, conteúdo e botões definidos
- Formulários devem ter validações especificadas
