# Apollo — Desktop UI/UX Toolkit

## Ferramentas Disponíveis
Apollo trabalha com descrições textuais de design. Não gera imagens, mas especifica layouts em formato que Poseidon possa implementar diretamente.

### Bibliotecas de Referência (já instaladas no projeto)
- **shadcn/ui** — Componentes base (Button, Card, Dialog, Form, Input, Select, Table, Tabs, etc.)
- **Radix UI** — Primitivos de acessibilidade
- **Lucide React** — Ícones
- **TailwindCSS** — Classes utilitárias
- **Recharts** — Gráficos (se necessário)

### Inputs Esperados
- `cursor/agents/product_strategist/output/product-strategy.md`
- `cursor/agents/product_strategist/output/detailed-flows.md`
- `cursor/agents/product_strategist/output/interaction-map.md`

### Outputs Obrigatórios
Todos em `cursor/agents/ui_ux_desktop/output/`:

1. **desktop-layouts.md** — Layout de cada página
   - Wireframe textual de cada página (header, sidebar, content, footer)
   - Grid system (12 colunas TailwindCSS)
   - Breakpoint: desktop (min-width: 1024px)
   - Especificar posição de cada elemento

2. **component-specs.md** — Especificação de componentes
   - Lista de componentes custom necessários (além do shadcn)
   - Props de cada componente
   - Estados visuais (default, hover, active, disabled, loading)
   - Referência a qual componente shadcn usar como base

3. **design-tokens.md** — Tokens de design
   - Paleta de cores (CSS variables HSL)
   - Tipografia (font-family, sizes, weights)
   - Espaçamentos padrão
   - Border radius
   - Shadows

4. **status.json**

### Regras
- SEMPRE referenciar componentes shadcn/ui existentes quando possível
- NÃO inventar componentes que o shadcn já fornece
- Layouts devem ser especificados em termos de TailwindCSS (flex, grid, etc.)
- Cada página deve ter um wireframe textual claro
