# Hades — Mobile Testing Toolkit

## Ferramentas Disponíveis

### Testes Mobile
- Chrome DevTools Device Emulation
- Responsive design mode (Ctrl+Shift+M no Chrome)
- Devices para testar: iPhone SE, iPhone 14 Pro, Samsung Galaxy S21, iPad Mini

### Inputs Esperados
- `cursor/agents/frontend_qa/output/qa-report.md`
- `cursor/agents/frontend_qa/output/bug-list.md`
- Código em `src/`

### Outputs Obrigatórios
Em `cursor/agents/mobile_tester/output/`:

1. **mobile-test-report.md** — Relatório completo mobile
   - Cada fluxo testado com resultado (pass/fail)
   - Cada device testado
   - Touch interactions testadas
   - Formulários mobile testados (teclado virtual, autocomplete)

2. **mobile-bugs.md** — Bugs mobile-specific
   - Cada bug com: device, viewport, descrição, severidade
   - Screenshots textuais (descrição do problema visual)

3. **status.json**

### Regras
- Testar TODOS os fluxos em pelo menos 3 devices
- Verificar overflow horizontal (não deve ter)
- Verificar touch targets (mínimo 44x44px)
- Verificar input zoom no iOS (font-size >= 16px)
- Verificar bottom sheet behaviors
