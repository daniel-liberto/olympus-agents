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
}

export interface PipelineState {
  agents: AgentInfo[];
  currentAgentId: string | null;
  queue: string[];
}
