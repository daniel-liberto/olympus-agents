import { useState, useEffect, useCallback, useRef } from 'react';
import { PIPELINE_AGENTS } from '@/data/agents';
import type { AgentInfo, AgentStatus } from '@/types/agents';

const PIPELINE_ORDER = [
  'hermes', 'athena', 'apollo', 'artemis',
  'hephaestus', 'poseidon', 'hera', 'hestia',
  'ares', 'hades', 'perseus',
];

const MOCK_DURATIONS_MS: Record<string, number> = {
  hermes: 5000,
  athena: 6000,
  apollo: 7000,
  artemis: 5500,
  hephaestus: 4500,
  poseidon: 8000,
  hera: 4000,
  hestia: 3500,
  ares: 6000,
  hades: 5000,
  perseus: 5000,
};

export function useMockPipeline() {
  const [agents, setAgents] = useState<AgentInfo[]>(() =>
    PIPELINE_AGENTS.map(a => ({ ...a })),
  );
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activateAgent = useCallback((index: number) => {
    const agentId = PIPELINE_ORDER[index];
    if (!agentId) return;

    const now = Date.now();

    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return { ...a, status: 'active' as AgentStatus, startedAt: now };
      }
      const futureIndex = PIPELINE_ORDER.indexOf(a.id);
      if (futureIndex > index && a.status === 'idle') {
        return { ...a, status: 'waiting' as AgentStatus };
      }
      return a;
    }));

    const duration = MOCK_DURATIONS_MS[agentId] || 5000;

    timeoutRef.current = setTimeout(() => {
      const completedAt = Date.now();

      setAgents(prev => prev.map(a => {
        if (a.id === agentId) {
          return {
            ...a,
            status: 'completed' as AgentStatus,
            completedAt,
            elapsedMs: completedAt - (a.startedAt || now),
          };
        }
        return a;
      }));

      if (index + 1 < PIPELINE_ORDER.length) {
        setCurrentIndex(index + 1);
      } else {
        setIsRunning(false);
      }
    }, duration);
  }, []);

  useEffect(() => {
    if (isRunning && currentIndex >= 0 && currentIndex < PIPELINE_ORDER.length) {
      activateAgent(currentIndex);
    }
  }, [currentIndex, isRunning, activateAgent]);

  const startPipeline = useCallback(() => {
    setAgents(PIPELINE_AGENTS.map(a => ({ ...a, status: 'idle' as AgentStatus })));
    setIsRunning(true);
    setCurrentIndex(0);
  }, []);

  const resetPipeline = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsRunning(false);
    setCurrentIndex(-1);
    setAgents(PIPELINE_AGENTS.map(a => ({ ...a, status: 'idle' as AgentStatus })));
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { agents, isRunning, startPipeline, resetPipeline };
}
