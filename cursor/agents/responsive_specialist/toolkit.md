# Hera — Responsive Design Toolkit

## Ferramentas Disponíveis

### Bibliotecas (já instaladas)
- **TailwindCSS** — Breakpoints responsivos (sm, md, lg, xl, 2xl)
- **shadcn/ui** — Componentes já responsivos por padrão
- **React** — Conditional rendering por breakpoint

### Hook Disponível
- `src/hooks/use-mobile.tsx` — `useIsMobile()` retorna boolean para breakpoint 768px

### Breakpoints TailwindCSS (referência)
```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (desktop wide)
2xl: 1536px  (ultra wide)
```

### Inputs Esperados
- Código implementado por Poseidon em `src/`
- `cursor/agents/frontend/output/implementation-notes.md`

### Outputs Obrigatórios
Em `cursor/agents/responsive_specialist/output/`:

1. **breakpoint-report.md** — Relatório de breakpoints
   - Cada página testada em cada breakpoint
   - Problemas encontrados e correções aplicadas
   - Screenshots textuais (descrição do layout em cada breakpoint)

2. Código corrigido diretamente em `src/` (ajustes de responsividade)

3. **status.json**

### Regras
- Mobile-first: estilos base são mobile, adicionar via sm:, md:, lg:
- Testar overflow horizontal em TODAS as páginas
- Navigation deve adaptar: hamburger mobile → sidebar desktop
- Tabelas devem ter scroll horizontal em mobile
- Formulários devem ser single-column em mobile
