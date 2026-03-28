# Olympus Pipeline — Project Initializer

> **Este documento é reutilizável.** Cole-o no início de cada novo projeto para ativar o pipeline Olympus completo.
> Basta preencher a seção `[PROJECT CONFIG]` abaixo e seguir os passos.

---

## [PROJECT CONFIG]

Preencha os campos abaixo antes de iniciar:

```yaml
project_name: "{PROJECT_NAME}"                    # Ex: "Crypto Exchange Platform"
project_slug: "{project-slug}"                     # Ex: "crypto-exchange-platform" (kebab-case)
github_user: "{GITHUB_USERNAME}"                   # Ex: "nexus-dev"
github_repo: "https://github.com/{GITHUB_USERNAME}/{project-slug}.git"
briefing_file: "cursor/agents/zeus/input/briefing.md"
tech_stack:
  - React
  - Vite
  - TypeScript
  - TailwindCSS
model: opus-4.6
```

---

## Phase 0: Project Setup

### 0.1 — Receber o Briefing

Coloque o documento de briefing do cliente em `cursor/agents/zeus/input/briefing.md`.

O briefing deve conter:
- **Nome do projeto** (ex: "Crypto Exchange Platform")
- **Objetivos do cliente** (ex: "Plataforma para exchange de crypto para fiat")
- **Features obrigatórias** (ex: "Telas de Depósito, Conversão, Saque")
- **Restrições** (ex: "Sem tela de login")
- **Referências visuais** (se houver)
- **Público-alvo**
- **Prazo e prioridades**

### 0.2 — Desvincular Repositório Git Atual

```bash
git remote remove origin
```

### 0.3 — Renomear o Projeto

Atualize o `README.md` e os metadados do projeto para refletir o novo nome:

```bash
# Atualize o título no README.md com o nome do novo projeto
# Atualize o campo project_name em cursor/agents/zeus/agent.yaml
```

### 0.4 — Criar Novo Repositório Git

```bash
git init
git remote add origin https://github.com/{GITHUB_USERNAME}/{project-slug}.git
git add .
git commit -m "🏛️ Initial commit — {PROJECT_NAME} (Olympus Pipeline)"
git branch -M main
git push -u origin main
```

### 0.5 — Limpar Pastas de Input/Output

Limpe os dados de projetos anteriores (se houver):

```bash
# Limpar outputs de todos os agentes (manter estrutura)
# Para cada agente: remover conteúdo de input/ e output/ (exceto .gitkeep)
```

Agentes a limpar:
- `cursor/agents/zeus/input/` e `output/`
- `cursor/agents/discovery/input/` e `output/`
- `cursor/agents/product_strategist/input/` e `output/`
- `cursor/agents/ui_ux_desktop/input/` e `output/`
- `cursor/agents/ui_ux_mobile/input/` e `output/`
- `cursor/agents/ui_ux_refiner/input/` e `output/`
- `cursor/agents/frontend/input/` e `output/`
- `cursor/agents/responsive_specialist/input/` e `output/`
- `cursor/agents/polishing/input/` e `output/`
- `cursor/agents/frontend_qa/input/` e `output/`
- `cursor/agents/mobile_tester/input/` e `output/`
- `cursor/agents/desktop_tester/input/` e `output/`

### 0.6 — Colocar Briefing na Pasta do Zeus

```bash
# Copie o briefing para cursor/agents/zeus/input/briefing.md
# Zeus irá distribuir para Hermes automaticamente
```

---

## Phase 1: Iniciar o Pipeline

Uma vez que o briefing está em `cursor/agents/zeus/input/briefing.md`, o pipeline segue esta ordem:

### Stage 1 — Discovery (Hermes)

```
Input:  cursor/agents/zeus/input/briefing.md → cursor/agents/discovery/input/
Output: cursor/agents/discovery/output/
  ├── scope.md
  ├── sitemap.md
  ├── user-flows.md
  └── status.json
```

**Zeus** copia o briefing para `cursor/agents/discovery/input/`.
**Hermes** lê o briefing e extrai:
- Requisitos de negócio
- Restrições técnicas
- Expectativas do usuário
- Escopo, sitemap e fluxos iniciais

### Stage 2 — Product Strategy (Athena)

```
Input:  cursor/agents/discovery/output/ → cursor/agents/product_strategist/input/
Output: cursor/agents/product_strategist/output/
  ├── product-strategy.md
  ├── detailed-flows.md
  ├── interaction-map.md
  └── status.json
```

**Athena** recebe o output do Hermes e cria:
- Fluxos de usuário detalhados (step-by-step)
- Mapa de interações (modais, diálogos, confirmações)
- Estratégia de produto

### Stage 3 — Desktop UI/UX (Apollo)

```
Input:  cursor/agents/product_strategist/output/ → cursor/agents/ui_ux_desktop/input/
Output: cursor/agents/ui_ux_desktop/output/
  ├── desktop-layouts.md
  ├── component-specs.md
  ├── design-tokens.md
  └── status.json
```

### Stage 4 — Mobile UI/UX (Artemis) ⚡ PARALELO COM APOLLO

```
Input:  cursor/agents/product_strategist/output/ → cursor/agents/ui_ux_mobile/input/
Output: cursor/agents/ui_ux_mobile/output/
  ├── mobile-layouts.md
  ├── mobile-components.md
  ├── gesture-specs.md
  └── status.json
```

> **Apollo e Artemis podem rodar em paralelo** — ambos recebem o output da Athena.

### Stage 5 — Visual Refinement (Hephaestus)

```
Input:  cursor/agents/ui_ux_desktop/output/ + cursor/agents/ui_ux_mobile/output/
        → cursor/agents/ui_ux_refiner/input/
Output: cursor/agents/ui_ux_refiner/output/
  ├── refined-design-system.md
  ├── visual-audit.md
  ├── final-specs.md
  └── status.json
```

**Hephaestus** recebe o output de Apollo E Artemis e unifica/refina o design system.

### Stage 6 — Frontend Development (Poseidon)

```
Input:  cursor/agents/ui_ux_refiner/output/ → cursor/agents/frontend/input/
Output: cursor/agents/frontend/output/
  ├── src/               (código React/TS/Tailwind)
  ├── implementation-notes.md
  └── status.json
```

**Stack:** React + Vite + TypeScript + TailwindCSS

### Stage 7 — Responsive Design (Hera)

```
Input:  cursor/agents/frontend/output/ → cursor/agents/responsive_specialist/input/
Output: cursor/agents/responsive_specialist/output/
  ├── responsive-fixes/
  ├── breakpoint-report.md
  └── status.json
```

### Stage 8 — Animations & Polish (Hestia)

```
Input:  cursor/agents/responsive_specialist/output/ → cursor/agents/polishing/input/
Output: cursor/agents/polishing/output/
  ├── animation-specs.md
  ├── animated-components/
  └── status.json
```

### Stage 9 — Frontend QA (Ares)

```
Input:  cursor/agents/polishing/output/ → cursor/agents/frontend_qa/input/
Output: cursor/agents/frontend_qa/output/
  ├── qa-report.md
  ├── bug-list.md
  ├── test-results.md
  └── status.json
```

### Stage 10a — Mobile Testing (Hermes II) ⚡ PARALELO COM PERSEUS

```
Input:  cursor/agents/frontend_qa/output/ → cursor/agents/mobile_tester/input/
Output: cursor/agents/mobile_tester/output/
  ├── mobile-test-report.md
  ├── mobile-bugs.md
  └── status.json
```

### Stage 10b — Desktop Testing (Perseus) ⚡ PARALELO COM HERMES II

```
Input:  cursor/agents/frontend_qa/output/ → cursor/agents/desktop_tester/input/
Output: cursor/agents/desktop_tester/output/
  ├── desktop-test-report.md
  ├── desktop-bugs.md
  └── status.json
```

> **Hermes II e Perseus rodam em paralelo** após Ares completar o QA.

---

## Phase 2: Revisão Final (Zeus)

Zeus coleta todos os relatórios de teste e produz:

```
Output: cursor/agents/zeus/output/
  ├── pipeline-log.md        (log de todas as transições)
  ├── final-delivery.md      (relatório final de entrega)
  └── pipeline-status.json   (status geral do pipeline)
```

### Critérios de Aprovação
- Todos os agentes com `status: "completed"` em seus `status.json`
- Zero bugs críticos nos relatórios de Hermes II e Perseus
- Design system consistente entre desktop e mobile
- Performance adequada (Lighthouse > 90)
- Acessibilidade WCAG básica atendida

### Feedback Loop
Se bugs forem encontrados:
1. Zeus recebe o `bug-list.md` do agente de teste
2. Zeus identifica qual agente é responsável pela correção
3. Zeus envia o bug de volta ao agente responsável via sua pasta `input/`
4. O agente corrige e envia novo output
5. Máximo de **3 ciclos de correção** antes de escalar para o usuário

---

## Phase 3: Deploy Final

Após aprovação do Zeus:

```bash
git add .
git commit -m "✅ {PROJECT_NAME} — Pipeline complete, all tests passed"
git push origin main
```

---

## Checklist de Inicialização

Use este checklist toda vez que iniciar um novo projeto:

- [ ] Briefing do cliente está completo e em `cursor/agents/zeus/input/briefing.md`
- [ ] Git antigo desvinculado (`git remote remove origin`)
- [ ] Novo repositório Git criado e vinculado
- [ ] Pastas de input/output limpas de projetos anteriores
- [ ] `[PROJECT CONFIG]` preenchido neste documento
- [ ] Zeus notificado para iniciar pipeline (copiar briefing para Hermes)
- [ ] Cada agente tem suas pastas input/output prontas

---

## Quick Start (Copie e Cole)

Para iniciar rapidamente um novo projeto, execute estes comandos em sequência:

```bash
# 1. Desvincular repo antigo
git remote remove origin

# 2. Limpar outputs anteriores
Get-ChildItem -Path "cursor/agents" -Recurse -Directory -Filter "input" | ForEach-Object { Get-ChildItem $_.FullName -Exclude ".gitkeep" | Remove-Item -Recurse -Force }
Get-ChildItem -Path "cursor/agents" -Recurse -Directory -Filter "output" | ForEach-Object { Get-ChildItem $_.FullName -Exclude ".gitkeep" | Remove-Item -Recurse -Force }

# 3. Colocar briefing
# Copy-Item "caminho/para/briefing.md" "cursor/agents/zeus/input/briefing.md"

# 4. Criar novo repo
git remote add origin https://github.com/{USER}/{SLUG}.git
git add .
git commit -m "Initial commit — {PROJECT_NAME}"
git branch -M main
git push -u origin main

# 5. Pipeline inicia automaticamente com Zeus → Hermes
```

---

## Referência Rápida de Agentes

| # | Agente | Deus | Pasta | Recebe de | Envia para |
|---|--------|------|-------|-----------|------------|
| 0 | Zeus | Rei dos Deuses | `zeus/` | Todos (final) | Todos (início) |
| 1 | Hermes | Deus Mensageiro | `discovery/` | Zeus | Athena |
| 2 | Athena | Deusa da Sabedoria | `product_strategist/` | Hermes | Apollo, Artemis |
| 3 | Apollo | Deus das Artes | `ui_ux_desktop/` | Athena | Hephaestus |
| 4 | Artemis | Deusa da Caça | `ui_ux_mobile/` | Athena | Hephaestus |
| 5 | Hephaestus | Deus da Forja | `ui_ux_refiner/` | Apollo, Artemis | Poseidon |
| 6 | Poseidon | Deus dos Mares | `frontend/` | Hephaestus | Hera |
| 7 | Hera | Rainha dos Deuses | `responsive_specialist/` | Poseidon | Hestia |
| 8 | Hestia | Deusa do Lar | `polishing/` | Hera | Ares |
| 9 | Ares | Deus da Guerra | `frontend_qa/` | Hestia | Hermes II, Perseus |
| 10a | Hermes II | Semideus | `mobile_tester/` | Ares | Zeus |
| 10b | Perseus | Semideus | `desktop_tester/` | Ares | Zeus |
