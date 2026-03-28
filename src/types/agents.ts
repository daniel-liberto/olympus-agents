export type AgentStatus = 'idle' | 'active' | 'completed' | 'waiting' | 'error';

export interface AgentInfo {
  id: string;
  name: string;
  god: string;
  role: string;
  stage: number;
  image: string;
  status: AgentStatus;
  startedAt?: number;
  completedAt?: number;
  elapsedMs?: number;
  description?: string;
  tools?: string[];
}

export interface PipelineState {
  agents: AgentInfo[];
  currentAgentId: string | null;
  queue: string[];
  isRunning: boolean;
  startedAt?: number;
}

export interface AgentStatusFile {
  agent: string;
  status: 'active' | 'completed' | 'error';
  startedAt: string;
  completedAt?: string;
  elapsedMs?: number;
  summary?: string;
  outputFiles?: string[];
}
