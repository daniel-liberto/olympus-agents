# Visual Audit — CryptoFolio

## Resumo

Auditoria visual comparando os outputs de Apollo (Desktop) e Artemis (Mobile) para identificar inconsistências, gaps e oportunidades de melhoria.

---

## 1. Inconsistências Encontradas e Resoluções

### I1 — Modal Pattern Divergente
- **Apollo:** Modals sempre centralizados
- **Artemis:** Bottom sheets para não-destrutivos
- **Resolução:** Adotar abordagem adaptativa — bottom sheet em mobile (< 768px), dialog centralizado em desktop. Modais destrutivos sempre centralizados em ambos.

### I2 — Button Height
- **Apollo:** Não especificou altura mínima fixa
- **Artemis:** min-height 48px
- **Resolução:** Mobile: 48px (min-h-12). Desktop: 40px (min-h-10). Ambos atendem 44px touch target.

### I3 — Toast Position
- **Apollo:** Não especificou posição
- **Artemis:** Top, full-width
- **Resolução:** Mobile: top center, full-width. Desktop: top-right corner, max-w-sm.

### I4 — CoinSelector Pattern
- **Apollo:** Dropdown/combobox
- **Artemis:** Bottom sheet
- **Resolução:** Responsivo — bottom sheet em mobile, dropdown popover em desktop. Mesma interface (CoinOption[]), componente interno adapta com `useMediaQuery`.

### I5 — Delete Pattern em AlertCard
- **Apollo:** Botão visível ou context menu
- **Artemis:** Swipe left to reveal
- **Resolução:** Mobile: swipe gesture + fallback com ícone ⋯. Desktop: botão delete visível no hover.

---

## 2. Gaps Identificados

### G1 — Empty States
- **Gap:** Nenhum agente especificou ilustrações para empty states
- **Resolução:** Usar ícones Lucide em tamanho grande (64px) com opacidade reduzida + texto descritivo + CTA

### G2 — Error Boundaries
- **Gap:** Sem menção a tratamento de erros globais
- **Resolução:** Adicionar error boundary no App level com tela de fallback amigável

### G3 — Loading Initial
- **Gap:** Não definido o loading da primeira carga do app
- **Resolução:** Skeleton full-page no primeiro render, transição smooth para conteúdo

### G4 — Scrollbar Styling
- **Gap:** Scrollbars padrão do browser quebram o dark theme
- **Resolução:** Custom scrollbar em CSS (webkit-scrollbar) com cores do tema

---

## 3. Melhorias de Qualidade Visual

### M1 — Gradients Sutis
Adicionar gradients sutis no BalanceCard para diferenciá-lo visualmente:
```css
background: linear-gradient(135deg, #1E1E32 0%, #25253D 100%);
border: 1px solid rgba(108, 92, 231, 0.2);
```

### M2 — Micro-interações nos CoinCards
- Hover: border brilha com glow accent sutil
- Variação positiva: text-success com ícone ↑
- Variação negativa: text-error com ícone ↓

### M3 — Ícones de Crypto
- Usar ícones circulares com background sutil da cor da moeda
- Fallback: primeira letra do símbolo em círculo colorido
- Tamanho: 32px em cards mobile, 40px em grid desktop

### M4 — Number Formatting
- Valores monetários: separador de milhares, 2 casas decimais para fiat
- Valores crypto: até 8 casas decimais, sem trailing zeros
- Porcentagens: 1-2 casas decimais, sempre com sinal (+/-)

---

## 4. Questões em Aberto

| # | Questão | Recomendação |
|---|---------|-------------|
| Q1 | Light mode para versão futura? | CSS variables já preparadas, mas não implementar agora |
| Q2 | Animação de confetti no sucesso? | Sim para conversão, não para saque (contexto financeiro sério) |
| Q3 | Notificações push reais? | Fora do escopo (frontend-only), apenas toast in-app |
| Q4 | Gráfico sparkline nos CoinCards? | Nice-to-have, implementar se tempo permitir |

---

## 5. Score de Consistência

| Critério | Score | Notas |
|----------|-------|-------|
| Color tokens | 10/10 | Idênticos em ambos os outputs |
| Typography | 9/10 | Leve divergência no tamanho do balance (resolvido) |
| Spacing | 10/10 | Ambos usam mesma escala base-4 |
| Component naming | 10/10 | IDs consistentes conforme interaction-map |
| Interaction patterns | 7/10 | Divergências esperadas entre plataformas (resolvidas) |
| Accessibility | 9/10 | Mobile mais detalhado em touch targets |
| **Total** | **9.2/10** | Sistema unificado pronto para implementação |
