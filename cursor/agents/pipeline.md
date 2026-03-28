# Olympus Pipeline — Agent Orchestration

## Overview
This pipeline defines the complete workflow for the Olympus multi-agent system. It starts with a **Project Initializer** (Phase 0) that sets up the environment, then Zeus orchestrates all agents in a sequential pipeline, with the final testing stage running in parallel.

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: PROJECT INITIALIZER                   │
│  Config: cursor/agents/init_project.md                           │
│  Task: Receive briefing → Git setup → Clean folders → Start      │
│  Input: Client briefing document                                 │
│  Output: Configured project, briefing in Zeus input              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        ZEUS (Master Agent)                       │
│                   Orchestrates entire pipeline                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: DISCOVERY                                              │
│  Agent: Hermes                                                   │
│  Task: Interpret client input → scope, sitemap, flows            │
│  Input: Client documents/briefs                                  │
│  Output: scope.md, sitemap.md, user-flows.md, requirements.md    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2: PRODUCT STRATEGY                                       │
│  Agent: Athena                                                   │
│  Task: Break scope into detailed flows and interaction maps      │
│  Input: Hermes outputs                                           │
│  Output: detailed-flows.md, interaction-map.md,                  │
│          component-inventory.md, strategy-notes.md               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 3: DESKTOP UI/UX                                          │
│  Agent: Apollo                                                   │
│  Task: Design desktop UI components and layouts                  │
│  Input: Athena outputs                                           │
│  Output: desktop-layouts/, design-system.md,                     │
│          component-specs.md, desktop-wireframes.md               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 4: MOBILE UI/UX                                           │
│  Agent: Artemis                                                  │
│  Task: Adapt desktop designs to mobile                           │
│  Input: Apollo outputs                                           │
│  Output: mobile-layouts/, mobile-navigation.md,                  │
│          mobile-components.md, mobile-wireframes.md              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 5: UI REFINEMENT                                          │
│  Agent: Hephaestus                                               │
│  Task: Polish and refine all designs for consistency             │
│  Input: Apollo + Artemis outputs                                 │
│  Output: refined-design-system.md, refined-desktop/,             │
│          refined-mobile/, visual-qa-checklist.md, handoff-specs.md│
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 6: FRONTEND DEVELOPMENT                                   │
│  Agent: Poseidon                                                 │
│  Task: Implement designs in React/Vite/TS/Tailwind              │
│  Input: Hephaestus outputs                                       │
│  Output: src/, implementation-notes.md, test-report.md           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 7: RESPONSIVE DESIGN                                      │
│  Agent: Hera                                                     │
│  Task: Ensure responsive behavior across all devices             │
│  Input: Poseidon outputs                                         │
│  Output: responsive-fixes/, breakpoint-report.md,                │
│          device-compatibility.md, responsive-checklist.md        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 8: ANIMATIONS & POLISH                                    │
│  Agent: Hestia                                                   │
│  Task: Add micro-interactions and animations                     │
│  Input: Hera outputs                                             │
│  Output: animation-specs.md, animation-code/,                    │
│          interaction-patterns.md, performance-notes.md           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 9: FRONTEND QA                                            │
│  Agent: Ares                                                     │
│  Task: Comprehensive quality assurance testing                   │
│  Input: Hestia outputs                                           │
│  Output: qa-report.md, bug-report.md, browser-compatibility.md,  │
│          performance-report.md, accessibility-report.md          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                     ┌─────┴─────┐
                     ▼           ▼
┌──────────────────────────┐ ┌──────────────────────────┐
│  STAGE 10a: MOBILE TEST  │ │  STAGE 10b: DESKTOP TEST │
│  Agent: Hades            │ │  Agent: Perseus           │
│  Task: Mobile flow tests │ │  Task: Desktop flow tests │
│  (runs in parallel)      │ │  (runs in parallel)       │
└──────────┬───────────────┘ └──────────┬───────────────┘
           │                            │
           └────────────┬───────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ZEUS — FINAL REVIEW                          │
│  Collects all test reports and produces final delivery status    │
└─────────────────────────────────────────────────────────────────┘
```

## Agent Registry

| # | Agent | Codename | Stage | Role |
|---|-------|----------|-------|------|
| — | Initializer | init_project | Phase 0 | Project setup & Git config |
| 0 | Zeus | Master | All | Pipeline orchestration |
| 1 | Hermes | Discovery | 1 | Requirement gathering |
| 2 | Athena | Strategist | 2 | Product flow & strategy |
| 3 | Apollo | Desktop Design | 3 | Desktop UI/UX |
| 4 | Artemis | Mobile Design | 4 | Mobile UI/UX |
| 5 | Hephaestus | Refiner | 5 | Visual refinement |
| 6 | Poseidon | Frontend | 6 | Frontend implementation |
| 7 | Hera | Responsive | 7 | Responsive design |
| 8 | Hestia | Animator | 8 | Animations & polish |
| 9 | Ares | QA | 9 | Quality assurance |
| 10a | Hades | Mobile Tester | 10 | Mobile testing |
| 10b | Perseus | Desktop Tester | 10 | Desktop testing |

## Communication Protocol

### Initialization (Phase 0)
Before any pipeline execution, the **Project Initializer** (`cursor/agents/init_project.md`) must run:
1. Receive client briefing → validate required fields
2. `git remote remove origin` → disconnect old repo
3. Clean all agent `input/` and `output/` folders
4. Create new Git repo with project slug
5. Place briefing in `cursor/agents/zeus/input/briefing.md`
6. Zeus takes over and starts the pipeline with Hermes

### Input/Output Convention
- Each agent reads from `cursor/agents/{agent_name}/input/`
- Each agent writes to `cursor/agents/{agent_name}/output/`
- Zeus copies output from Agent N to input of Agent N+1

### Status Updates
- Each agent writes a `status.json` in their output folder when done:
```json
{
  "agent": "agent_name",
  "status": "completed|failed|needs_review",
  "completed_at": "ISO-8601",
  "summary": "Brief description of work done",
  "issues": [],
  "output_files": ["list of files generated"]
}
```

### Error Handling
- If an agent fails, Zeus is notified and decides whether to:
  1. Retry the current stage
  2. Loop back to a previous stage
  3. Escalate to the user for manual intervention

### Feedback Loops
- Testing agents (Ares, Hades, Perseus) can send bugs back through Zeus
- Zeus routes bug reports to the appropriate agent for fixing
- Maximum 3 rework cycles before escalation to user
