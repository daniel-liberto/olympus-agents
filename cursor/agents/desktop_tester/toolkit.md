# Perseus — Desktop Testing Toolkit

## Ferramentas Disponíveis

### Testes Desktop
- Chrome DevTools
- Resolutions para testar: 1024x768, 1366x768, 1920x1080, 2560x1440
- Keyboard navigation testing (Tab, Enter, Escape)

### Inputs Esperados
- `cursor/agents/frontend_qa/output/qa-report.md`
- `cursor/agents/frontend_qa/output/bug-list.md`
- Código em `src/`

### Outputs Obrigatórios
Em `cursor/agents/desktop_tester/output/`:

1. **desktop-test-report.md** — Relatório completo desktop
   - Cada fluxo testado com resultado (pass/fail)
   - Cada resolução testada
   - Keyboard navigation testada
   - Hover states verificados

2. **desktop-bugs.md** — Bugs desktop-specific
   - Cada bug com: resolução, browser, descrição, severidade
   - Layout issues em diferentes resoluções

3. **status.json**

### Regras
- Testar TODOS os fluxos em pelo menos 3 resoluções
- Verificar keyboard navigation (Tab order faz sentido?)
- Verificar hover states de TODOS os elementos interativos
- Verificar sidebar collapse/expand em diferentes widths
- Verificar que modals/dialogs são centralizados corretamente
