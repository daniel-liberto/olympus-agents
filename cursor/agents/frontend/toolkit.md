# Poseidon — Frontend Development Toolkit

## Ferramentas Disponíveis — Stack Completa

### Core (já instalados em package.json)
- **React 18** — UI library
- **Vite 7** — Build tool + HMR
- **TypeScript 5** — Type safety
- **TailwindCSS 3** — Styling (utility-first)

### UI Components (já instalados)
- **shadcn/ui** — 49 componentes em `src/components/ui/`
- **Radix UI** — 25+ primitivos acessíveis
- **Lucide React** — Ícones SVG
- **class-variance-authority** — Variantes de componentes
- **clsx + tailwind-merge** — Utility `cn()` em `src/lib/utils.ts`

### Data & Forms (já instalados)
- **TanStack React Query** — Server state, caching, mutations
- **React Hook Form** — Formulários performáticos
- **Zod** — Validação de schemas
- **@hookform/resolvers** — Bridge RHF + Zod

### Routing (já instalado)
- **React Router DOM v6** — Client-side routing

### UI Extras (já instalados)
- **Recharts** — Gráficos e charts
- **Motion** (Framer Motion) — Animações
- **Sonner** — Toast notifications modernas
- **Embla Carousel** — Carrosséis touch
- **Vaul** — Drawer/bottom sheet
- **cmdk** — Command palette
- **React Day Picker** — Date picker
- **Input OTP** — Inputs de código OTP
- **React Resizable Panels** — Painéis redimensionáveis
- **next-themes** — Dark/light mode

### Path Alias
- `@/` aponta para `src/`
- Exemplo: `import { Button } from '@/components/ui/button'`

### Inputs Esperados
- `cursor/agents/ui_ux_refiner/output/refined-design-system.md`
- `cursor/agents/ui_ux_refiner/output/final-specs.md`

### Outputs Obrigatórios
Código implementado diretamente em `src/`:
- `src/pages/` — Páginas da aplicação
- `src/components/` — Componentes custom
- `src/hooks/` — Custom hooks
- `src/lib/` — Utilities
- `src/types/` — TypeScript types

E em `cursor/agents/frontend/output/`:
1. **implementation-notes.md** — Notas de implementação
   - Decisões técnicas tomadas
   - Componentes criados
   - Rotas configuradas
2. **status.json**

### Regras
- USAR componentes shadcn/ui existentes — NÃO reinventar
- USAR TailwindCSS para styling — NÃO CSS modules ou styled-components
- USAR React Query para dados async — NÃO useEffect + fetch manual
- USAR React Hook Form + Zod para formulários
- USAR o path alias `@/` para imports
- Código deve compilar sem erros (`npm run build`)
- Componentes devem ser funcionais (não classes)
