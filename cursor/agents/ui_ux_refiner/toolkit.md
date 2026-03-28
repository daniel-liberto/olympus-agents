# Hephaestus — Visual Refinement Toolkit

## Ferramentas Disponíveis
Hephaestus unifica e refina os designs de Apollo e Artemis em um design system coeso.

### Bibliotecas de Referência
- **TailwindCSS** — Design tokens como CSS variables
- **shadcn/ui** — Componentes base para consistência
- **tailwindcss-animate** — Transições e animações básicas

### Inputs Esperados
- `cursor/agents/ui_ux_desktop/output/desktop-layouts.md`
- `cursor/agents/ui_ux_desktop/output/component-specs.md`
- `cursor/agents/ui_ux_desktop/output/design-tokens.md`
- `cursor/agents/ui_ux_mobile/output/mobile-layouts.md`
- `cursor/agents/ui_ux_mobile/output/mobile-components.md`
- `cursor/agents/ui_ux_mobile/output/gesture-specs.md`

### Outputs Obrigatórios
Todos em `cursor/agents/ui_ux_refiner/output/`:

1. **refined-design-system.md** — Design system unificado
   - CSS variables finais (:root e .dark)
   - Paleta de cores unificada (desktop + mobile)
   - Tipografia unificada
   - Espaçamentos, radius, shadows
   - Deve ser escrito como código CSS pronto para `src/index.css`

2. **visual-audit.md** — Auditoria visual
   - Inconsistências encontradas entre desktop e mobile
   - Correções aplicadas
   - Checklist de consistência visual

3. **final-specs.md** — Especificações finais para implementação
   - Cada página com spec final (desktop + mobile juntos)
   - Componentes finais com variantes responsive
   - Handoff notes para Poseidon

4. **status.json**

### Regras
- Desktop e mobile DEVEM sentir como o mesmo produto
- Design tokens em CSS variables HSL (compatível com shadcn)
- Output de `refined-design-system.md` deve ser copy-paste-ready para index.css
