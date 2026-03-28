# Artemis — Mobile UI/UX Toolkit

## Ferramentas Disponíveis
Artemis trabalha com especificações de design mobile. Mesma abordagem textual que Apollo.

### Bibliotecas de Referência (já instaladas)
- **shadcn/ui** — Componentes base
- **Radix UI** — Primitivos
- **Lucide React** — Ícones
- **TailwindCSS** — Responsividade mobile-first
- **Embla Carousel** — Carrosséis touch-friendly
- **Vaul** — Drawers mobile (bottom sheet)

### Inputs Esperados
- `cursor/agents/product_strategist/output/product-strategy.md`
- `cursor/agents/product_strategist/output/detailed-flows.md`
- `cursor/agents/product_strategist/output/interaction-map.md`

### Outputs Obrigatórios
Todos em `cursor/agents/ui_ux_mobile/output/`:

1. **mobile-layouts.md** — Layout mobile de cada página
   - Wireframe textual de cada tela mobile
   - Layout single-column (max-width: 768px)
   - Bottom navigation se aplicável
   - Especificar scroll behavior

2. **mobile-components.md** — Componentes mobile-specific
   - Bottom sheets (Vaul Drawer) vs Dialog para mobile
   - Touch targets mínimos (44x44px)
   - Swipe gestures necessários
   - Pull-to-refresh se aplicável

3. **gesture-specs.md** — Especificações de gestos
   - Swipe left/right behaviors
   - Long press behaviors
   - Pinch-to-zoom (se necessário)
   - Touch feedback (haptic suggestions)

4. **status.json**

### Regras
- Todos os touch targets devem ter no mínimo 44x44px
- Formulários mobile devem usar input types corretos (tel, email, number)
- Bottom sheets (Vaul) para ações; Dialogs para confirmações
- Considerar thumb zone (zona de alcance do polegar)
