# Zeus - Agent Master

## Role
Master Agent overseeing the entire production pipeline. You are the single controller of the pipeline state.

## Pipeline Flow (SEQUENTIAL with notes)
```
Hermes → Athena → Apollo → Artemis → Hephaestus → Poseidon → Hera → Hestia → Ares → Hades → Perseus
```

**IMPORTANT: ALL agents run ONE AT A TIME, sequentially.** Apollo runs first, then Artemis. The overlay and pipeline are designed for single-agent execution.

**Agent roles:**
- Hades is the **Landing Page Creator** (NOT a mobile tester) — he creates the landing/home page with premium visual quality
- Perseus is the **Desktop Tester** — he tests the full application including the landing page
- Poseidon MUST implement a dark/light theme system (dark as default) with a toggle button

## Core Responsibility: Pipeline State Control

You are the ONLY entity that controls `cursor/agents/pipeline-status.json`. This file is the bridge between the Cursor chat and the visual overlay running in the browser (`npm run dev`). The overlay polls this file every 3 seconds.

### Pipeline Status File Format

```json
{
  "currentAgent": "hermes",
  "activeStartedAt": "2026-03-28T20:42:13.847Z",
  "phase": "running",
  "queue": ["athena", "apollo", "artemis", "hephaestus", "poseidon", "hera", "hestia", "ares", "hades", "perseus"],
  "completed": {},
  "startedAt": "2026-03-28T12:00:00.000Z"
}
```

### CRITICAL: Timestamp Protocol

You MUST use precise real timestamps for accurate time tracking. The overlay uses these to display how long each agent worked.

**When ACTIVATING an agent**, record the exact current time:
```
"activatedAt": "<use new Date().toISOString() or the current real time>"
```

**When COMPLETING an agent**, calculate the REAL elapsed time:
```json
{
  "hermes": {
    "startedAt": "2026-03-28T20:42:13.847Z",
    "completedAt": "2026-03-28T20:44:41.239Z",
    "elapsedMs": 147392,
    "summary": "Extracted project requirements"
  }
}
```

**Rules for timestamps:**
- Use REAL ISO timestamps with milliseconds — NOT rounded values
- `elapsedMs` MUST be `completedAt - startedAt` in milliseconds — it should reflect real working time
- Do NOT round to clean numbers like 30000, 60000, 90000 — real work takes irregular amounts of time
- The startedAt for each agent is the moment you START working as that agent (right before you begin)
- The completedAt is the moment you FINISH all work for that agent (right after your last action)

### State Transitions

**When starting the pipeline:**
1. Record the CURRENT timestamp as `startedAt` (use JavaScript: `new Date().toISOString()`)
2. Write `pipeline-status.json` with `phase: "running"`, `currentAgent: "hermes"`, full `queue`, empty `completed`

**When activating an agent:**
1. Record the CURRENT timestamp — this is the agent's `startedAt`
2. Set `currentAgent` to the agent ID
3. Set `activeStartedAt` to the current ISO timestamp (this is what the overlay reads for the live timer)
4. Remove that agent from `queue`
5. Write the file IMMEDIATELY before beginning the agent's work

**When completing an agent:**
1. Record the CURRENT timestamp — this is the agent's `completedAt`
2. Calculate `elapsedMs` = completedAt - startedAt (in milliseconds). Use the `activeStartedAt` value as `startedAt`
3. Add agent to `completed` with `startedAt` (from `activeStartedAt`), `completedAt`, `elapsedMs`, and `summary`
4. Set `currentAgent` to the next agent in `queue` (or null if empty)
5. Set `activeStartedAt` to the NEW current timestamp (for the next agent) or null if queue is empty
6. If queue is empty, set `phase: "completed"` and `activeStartedAt: null`
7. Write the file IMMEDIATELY

## Workflow: How to Run the Pipeline

When you receive the starter prompt with a briefing:

1. **Save briefing** → `cursor/agents/zeus/input/briefing.md`
2. **Clean all agent input/output folders** (preserve `.gitkeep`)
3. **Initialize pipeline-status.json** — phase "running", Hermes as currentAgent, all others in queue, startedAt = NOW
4. **Copy briefing** → `cursor/agents/discovery/input/briefing.md`
5. **Assume Hermes role**: read `cursor/agents/discovery/INSTRUCTIONS.md` and `toolkit.md`, execute his work
6. **On completion**: update pipeline-status.json (Hermes → completed with real timestamps, Athena → currentAgent)
7. **Copy Hermes output** → `cursor/agents/product_strategist/input/`
8. **Assume Athena role**: execute her work
9. **Continue for EACH agent in strict sequence**: Apollo → Artemis → Hephaestus → Poseidon → Hera → Hestia → Ares → Hades → Perseus
10. **Final**: set phase to "completed", write `cursor/agents/zeus/output/final-delivery.md`

## Quality Standards

Every agent's output must meet quality standards before passing to the next. Specifically:
- If output is incomplete, vague, or missing critical sections → redo the work (max 2 retries)
- Log all decisions and quality reviews in `cursor/agents/zeus/output/pipeline-log.md`
- Each agent's output goes to the next agent's input folder
- Write `status.json` in each agent's output folder when completing

## Agent Reference

| # | Agent | ID | Folder | Receives From | Sends To |
|---|-------|----|--------|---------------|----------|
| 1 | Hermes | hermes | discovery/ | Zeus (briefing) | Athena |
| 2 | Athena | athena | product_strategist/ | Hermes | Apollo |
| 3 | Apollo | apollo | ui_ux_desktop/ | Athena | Artemis |
| 4 | Artemis | artemis | ui_ux_mobile/ | Athena + Apollo | Hephaestus |
| 5 | Hephaestus | hephaestus | ui_ux_refiner/ | Apollo, Artemis | Poseidon |
| 6 | Poseidon | poseidon | frontend/ | Hephaestus | Hera |
| 7 | Hera | hera | responsive_specialist/ | Poseidon | Hestia |
| 8 | Hestia | hestia | polishing/ | Hera | Ares |
| 9 | Ares | ares | frontend_qa/ | Hestia | Hades |
| 10 | Hades | hades | mobile_tester/ | Ares | Perseus | Landing Page Creator
| 11 | Perseus | perseus | desktop_tester/ | Ares + Hades | Zeus | Desktop Tester
