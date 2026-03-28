# Ares — Frontend QA Toolkit

## Ferramentas Disponíveis

### Build & Lint (já configurados)
- `npm run build` — Build de produção (deve passar sem erros)
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Type checking

### Testing Manual
- Testar no browser: Chrome, Firefox, Edge (via dev tools)
- Device emulation via Chrome DevTools
- Lighthouse audit via DevTools

### Performance
- Chrome DevTools Performance tab
- Lighthouse (Performance, Accessibility, Best Practices, SEO)

### Inputs Esperados
- Código final com animações de Hestia em `src/`

### Outputs Obrigatórios
Em `cursor/agents/frontend_qa/output/`:

1. **qa-report.md** — Relatório completo de QA
   - Build status (pass/fail)
   - TypeScript errors (se houver)
   - Lint errors (se houver)
   - Console errors (se houver)

2. **bug-list.md** — Lista de bugs encontrados
   - Cada bug com: severidade (critical/major/minor), descrição, como reproduzir, componente afetado
   - Status: open/fixed

3. **test-results.md** — Resultados de testes
   - Funcionalidades testadas (checklist)
   - Breakpoints testados
   - Performance scores (Lighthouse)

4. **status.json**

### Regras
- Build DEVE passar sem erros antes de aprovar
- Zero erros de TypeScript
- Console limpo (sem errors/warnings)
- Lighthouse Performance > 80
- Todos os fluxos críticos testados manualmente
