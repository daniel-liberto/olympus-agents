# Hermes — Discovery Toolkit

## Ferramentas Disponíveis
Hermes NÃO precisa de bibliotecas externas. Seu trabalho é puramente analítico e textual.

### Inputs Esperados
- `cursor/agents/zeus/input/briefing.md` — Documento de briefing do cliente

### Outputs Obrigatórios
Todos os arquivos devem ser criados em `cursor/agents/discovery/output/`:

1. **scope.md** — Escopo completo do projeto
   - Nome do projeto
   - Objetivo principal
   - Público-alvo
   - Funcionalidades principais (lista detalhada)
   - Funcionalidades fora do escopo
   - Restrições técnicas e de negócio

2. **sitemap.md** — Mapa completo do site/app
   - Estrutura hierárquica de todas as páginas
   - Relação entre páginas (navegação)
   - Páginas públicas vs autenticadas
   - Formato: árvore com indentação

3. **user-flows.md** — Fluxos de usuário iniciais
   - Fluxos principais (cadastro, login, funcionalidades core)
   - Formato: step-by-step numerado
   - Indicar onde há decisões/bifurcações
   - Indicar pontos de entrada e saída

4. **status.json** — Status de conclusão (obrigatório)

### Formato do status.json
```json
{
  "agent": "hermes",
  "status": "completed",
  "startedAt": "ISO-8601",
  "completedAt": "ISO-8601",
  "elapsedMs": 0,
  "summary": "Breve descrição do trabalho",
  "outputFiles": ["scope.md", "sitemap.md", "user-flows.md"]
}
```

### Regras
- NÃO invente features que não estão no briefing
- SE algo estiver ambíguo, documente a ambiguidade em scope.md
- Seja detalhista — o próximo agente (Athena) depende da qualidade deste output
