# Hestia — Animations & Polish Toolkit

## Ferramentas Disponíveis

### Bibliotecas de Animação (já instaladas)
- **Motion** (Framer Motion v12) — Animações declarativas React
  - `motion.div`, `AnimatePresence`, `useAnimation`
  - Variantes, gestures, layout animations
- **tailwindcss-animate** — Classes CSS para animações simples
  - `animate-in`, `animate-out`, `fade-in`, `slide-in-from-*`
  - `duration-*`, `delay-*`
- **TailwindCSS transitions** — `transition-all`, `duration-200`, etc.

### Animações Padrão (usar consistentemente)
```
Page transition:    fade-in + slide-up (200ms ease-out)
Modal enter:        fade-in + scale from 95% (150ms)
Modal exit:         fade-out + scale to 95% (100ms)
Button hover:       scale(1.02) + shadow transition (150ms)
Card hover:         translateY(-2px) + shadow (200ms)
Loading skeleton:   pulse animation (1.5s infinite)
Toast enter:        slide-in from right (300ms spring)
Toast exit:         fade-out + slide right (200ms)
```

### Inputs Esperados
- Código responsivo de Hera em `src/`
- `cursor/agents/responsive_specialist/output/breakpoint-report.md`

### Outputs Obrigatórios
Em `cursor/agents/polishing/output/`:

1. **animation-specs.md** — Especificações de animações implementadas
   - Cada animação com: elemento, trigger, duration, easing
   - Variáveis de timing usadas
2. Código com animações em `src/` (diretamente)
3. **status.json**

### Regras
- Animações devem ser SUTIS — aprimorar, não distrair
- Respeitar `prefers-reduced-motion` para acessibilidade
- Duração máxima de 500ms para micro-interações
- Usar spring physics para animações naturais
- NÃO animar em loop exceto loading states
- Performance: usar `transform` e `opacity` (GPU-accelerated)
