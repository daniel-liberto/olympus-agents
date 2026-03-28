import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { PIPELINE_AGENTS } from '@/data/agents';
import type { AgentInfo, AgentStatus } from '@/types/agents';

const POLL_INTERVAL = 3000;

export type PipelinePhase = 'idle' | 'running' | 'completed';

interface CompletedEntry {
  startedAt: string;
  completedAt: string;
  elapsedMs: number;
  summary?: string;
}

interface PipelineStatusFile {
  currentAgent: string | null;
  activeStartedAt?: string | null;
  phase?: string;
  queue: string[];
  completed: Record<string, CompletedEntry>;
  startedAt: string | null;
}

interface PipelineContextValue {
  agents: AgentInfo[];
  isRunning: boolean;
  phase: PipelinePhase;
  currentAgentId: string | null;
  resetPipeline: () => void;
  getAgent: (agentId: string) => AgentInfo | undefined;
  getActiveAgent: () => AgentInfo | undefined;
}

const PipelineContext = createContext<PipelineContextValue | null>(null);

function deriveAgents(status: PipelineStatusFile): AgentInfo[] {
  return PIPELINE_AGENTS.map(base => {
    if (base.id === 'zeus') return { ...base, status: 'idle' as AgentStatus };

    if (status.currentAgent === base.id) {
      return {
        ...base,
        status: 'active' as AgentStatus,
        startedAt: status.activeStartedAt
          ? new Date(status.activeStartedAt).getTime()
          : Date.now(),
      };
    }

    if (status.completed[base.id]) {
      const entry = status.completed[base.id];
      return {
        ...base,
        status: 'completed' as AgentStatus,
        startedAt: new Date(entry.startedAt).getTime(),
        completedAt: new Date(entry.completedAt).getTime(),
        elapsedMs: entry.elapsedMs,
      };
    }

    if (status.queue.includes(base.id)) {
      return { ...base, status: 'waiting' as AgentStatus };
    }

    return { ...base, status: 'idle' as AgentStatus };
  });
}

function derivePhase(status: PipelineStatusFile): PipelinePhase {
  if (status.phase === 'completed') return 'completed';
  if (status.phase === 'running') return 'running';
  if (status.currentAgent) return 'running';
  if (Object.keys(status.completed).length > 0 && !status.currentAgent && status.queue.length === 0) return 'completed';
  return 'idle';
}

const DEFAULT_STATUS: PipelineStatusFile = {
  currentAgent: null,
  phase: 'idle',
  queue: [],
  completed: {},
  startedAt: null,
};

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<PipelineStatusFile>(DEFAULT_STATUS);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const res = await fetch('/api/pipeline-status', { cache: 'no-store' });
        if (res.ok && active) {
          const data: PipelineStatusFile = await res.json();
          setStatus(data);
        }
      } catch {
        // dev server not running or file not found — keep current state
      }
    }

    poll();
    const interval = setInterval(poll, POLL_INTERVAL);
    return () => { active = false; clearInterval(interval); };
  }, []);

  const agents = deriveAgents(status);
  const phase = derivePhase(status);
  const isRunning = phase === 'running';

  const currentAgentId = status.currentAgent || null;

  const resetPipeline = useCallback(() => {
    setStatus(DEFAULT_STATUS);
  }, []);

  const getAgent = useCallback((agentId: string) => {
    return deriveAgents(status).find(a => a.id === agentId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const getActiveAgent = useCallback(() => {
    return deriveAgents(status).find(a => a.status === 'active');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <PipelineContext.Provider value={{
      agents,
      isRunning,
      phase,
      currentAgentId,
      resetPipeline,
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
