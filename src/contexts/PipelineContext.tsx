import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { PIPELINE_AGENTS } from '@/data/agents';
import type { AgentInfo, AgentStatus } from '@/types/agents';

const PIPELINE_ORDER = [
  'hermes', 'athena', 'apollo', 'artemis',
  'hephaestus', 'poseidon', 'hera', 'hestia',
  'ares', 'hades', 'perseus',
];

const STORAGE_KEY = 'olympus-pipeline-state';

export type PipelinePhase = 'idle' | 'running' | 'completed';

interface PipelineContextValue {
  agents: AgentInfo[];
  isRunning: boolean;
  phase: PipelinePhase;
  currentAgentId: string | null;
  briefingFile: string | null;
  activateAgent: (agentId: string) => void;
  completeAgent: (agentId: string, summary?: string) => void;
  errorAgent: (agentId: string, reason?: string) => void;
  resetPipeline: () => void;
  startPipeline: (briefingFileName?: string) => void;
  getAgent: (agentId: string) => AgentInfo | undefined;
  getActiveAgent: () => AgentInfo | undefined;
}

const PipelineContext = createContext<PipelineContextValue | null>(null);

function loadPersistedState(): AgentInfo[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === PIPELINE_AGENTS.length) {
      return parsed.map((saved: any, i: number) => ({
        ...PIPELINE_AGENTS[i],
        status: saved.status || 'idle',
        startedAt: saved.startedAt,
        completedAt: saved.completedAt,
        elapsedMs: saved.elapsedMs,
      }));
    }
  } catch {}
  return null;
}

function persistState(agents: AgentInfo[]) {
  try {
    const minimal = agents.map(a => ({
      id: a.id,
      status: a.status,
      startedAt: a.startedAt,
      completedAt: a.completedAt,
      elapsedMs: a.elapsedMs,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
  } catch {}
}

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<AgentInfo[]>(() => {
    return loadPersistedState() || PIPELINE_AGENTS.map(a => ({ ...a }));
  });
  const agentsRef = useRef(agents);
  agentsRef.current = agents;

  useEffect(() => {
    persistState(agents);
  }, [agents]);

  const [briefingFile, setBriefingFile] = useState<string | null>(null);

  const hasActive = agents.some(a => a.status === 'active' || a.status === 'waiting');
  const pipelineAgents = agents.filter(a => a.id !== 'zeus');
  const allCompleted = pipelineAgents.length > 0 && pipelineAgents.every(a => a.status === 'completed');

  const phase: PipelinePhase = allCompleted ? 'completed' : hasActive ? 'running' : 'idle';
  const isRunning = phase === 'running';
  const currentAgentId = agents.find(a => a.status === 'active')?.id || null;

  const activateAgent = useCallback((agentId: string) => {
    const now = Date.now();
    setAgents(prev => {
      const agentIndex = PIPELINE_ORDER.indexOf(agentId);
      return prev.map(a => {
        if (a.id === agentId) {
          return { ...a, status: 'active' as AgentStatus, startedAt: now, completedAt: undefined, elapsedMs: undefined };
        }
        const futureIndex = PIPELINE_ORDER.indexOf(a.id);
        if (futureIndex > agentIndex && (a.status === 'idle' || a.status === 'waiting')) {
          return { ...a, status: 'waiting' as AgentStatus };
        }
        return a;
      });
    });
  }, []);

  const completeAgent = useCallback((agentId: string, _summary?: string) => {
    const completedAt = Date.now();
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return {
          ...a,
          status: 'completed' as AgentStatus,
          completedAt,
          elapsedMs: completedAt - (a.startedAt || completedAt),
        };
      }
      return a;
    }));
  }, []);

  const errorAgent = useCallback((agentId: string, _reason?: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return { ...a, status: 'error' as AgentStatus, completedAt: Date.now() };
      }
      return a;
    }));
  }, []);

  const startPipeline = useCallback((briefingFileName?: string) => {
    if (briefingFileName) setBriefingFile(briefingFileName);
    const fresh = PIPELINE_AGENTS.map(a => ({ ...a, status: 'idle' as AgentStatus }));
    setAgents(fresh);
    setTimeout(() => {
      const now = Date.now();
      setAgents(prev => prev.map(a => {
        if (a.id === 'hermes') {
          return { ...a, status: 'active' as AgentStatus, startedAt: now };
        }
        if (PIPELINE_ORDER.indexOf(a.id) > 0) {
          return { ...a, status: 'waiting' as AgentStatus };
        }
        return a;
      }));
    }, 50);
  }, []);

  const resetPipeline = useCallback(() => {
    setAgents(PIPELINE_AGENTS.map(a => ({ ...a, status: 'idle' as AgentStatus })));
    setBriefingFile(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getAgent = useCallback((agentId: string) => {
    return agentsRef.current.find(a => a.id === agentId);
  }, []);

  const getActiveAgent = useCallback(() => {
    return agentsRef.current.find(a => a.status === 'active');
  }, []);

  return (
    <PipelineContext.Provider value={{
      agents,
      isRunning,
      phase,
      currentAgentId,
      briefingFile,
      activateAgent,
      completeAgent,
      errorAgent,
      resetPipeline,
      startPipeline,
      getAgent,
      getActiveAgent,
    }}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline() {
  const ctx = useContext(PipelineContext);
  if (!ctx) throw new Error('usePipeline must be used within PipelineProvider');
  return ctx;
}
