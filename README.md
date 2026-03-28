# Olympus Agents — Multi-Agent Production Pipeline

A mythology-themed multi-agent system for orchestrating a complete frontend production pipeline, from discovery to final testing.

## Architecture

**Zeus** (Master Agent) orchestrates **11 specialized subagents**, each with a unique role in the pipeline:

```
Zeus (Master)
  │
  ├── Stage 1:  Hermes ........... Discovery & Requirements
  ├── Stage 2:  Athena ........... Product Strategy
  ├── Stage 3:  Apollo ........... Desktop UI/UX
  ├── Stage 4:  Artemis .......... Mobile UI/UX
  ├── Stage 5:  Hephaestus ....... Visual Refinement
  ├── Stage 6:  Poseidon ......... Frontend Development (React/Vite/TS/Tailwind)
  ├── Stage 7:  Hera ............. Responsive Design
  ├── Stage 8:  Hestia ........... Animations & Micro-Interactions
  ├── Stage 9:  Ares ............. Frontend QA
  └── Stage 10: Hades + Perseus (Mobile & Desktop Testing — parallel)
```

## Folder Structure

```
cursor/agents/
├── pipeline.md              # Full pipeline documentation
├── agent-registry.json      # Machine-readable agent registry
├── zeus/                    # Master Agent
│   ├── agent.md
│   ├── input/
│   └── output/
├── discovery/               # Hermes
│   ├── agent.md
│   ├── input/
│   └── output/
├── product_strategist/      # Athena
│   ├── agent.md
│   ├── input/
│   └── output/
├── ui_ux_desktop/           # Apollo
│   ├── agent.md
│   ├── input/
│   └── output/
├── ui_ux_mobile/            # Artemis
│   ├── agent.md
│   ├── input/
│   └── output/
├── ui_ux_refiner/           # Hephaestus
│   ├── agent.md
│   ├── input/
│   └── output/
├── frontend/                # Poseidon
│   ├── agent.md
│   ├── input/
│   └── output/
├── responsive_specialist/   # Hera
│   ├── agent.md
│   ├── input/
│   └── output/
├── polishing/               # Hestia
│   ├── agent.md
│   ├── input/
│   └── output/
├── frontend_qa/             # Ares
│   ├── agent.md
│   ├── input/
│   └── output/
├── mobile_tester/           # Hades
│   ├── agent.md
│   ├── input/
│   └── output/
└── desktop_tester/          # Perseus
    ├── agent.md
    ├── input/
    └── output/
```

## How It Works

1. **Client input** is placed in `cursor/agents/zeus/input/`
2. Zeus dispatches the project to **Hermes** for discovery
3. Each agent reads from their `input/` folder and writes results to `output/`
4. Zeus routes outputs from one agent to the next agent's input
5. Testing agents (Hades + Perseus) run in parallel at the end
6. Zeus collects all reports and produces a final delivery status

## Communication Protocol

- Each agent writes a `status.json` upon completion
- Zeus maintains a `pipeline-status.json` tracking all stages
- Feedback loops allow testing agents to send bugs back through Zeus
- Maximum 3 rework cycles before escalation

## Model

All agents use **opus-4.6** for maximum quality and reasoning capability.
