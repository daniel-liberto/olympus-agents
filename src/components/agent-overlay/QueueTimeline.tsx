import { AgentAvatar } from './AgentAvatar';
import { useAgentTimer } from '@/hooks/use-agent-timer';
import type { AgentInfo } from '@/types/agents';
import { cn } from '@/lib/utils';

interface QueueTimelineProps {
  agents: AgentInfo[];
  onAgentClick?: (agent: AgentInfo) => void;
}

function CompletedRow({ agent, onClick }: { agent: AgentInfo; onClick?: () => void }) {
  const { formatTime } = useAgentTimer(false);

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 py-1.5 opacity-70 hover:opacity-100 transition-opacity',
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <AgentAvatar src={agent.image} name={agent.name} size="sm" status="completed" />
      <div className="flex-1 min-w-0">
        <span className="text-xs text-zinc-300 truncate block">{agent.name}</span>
        <span className="text-[10px] text-zinc-500 truncate block">{agent.role}</span>
      </div>
      <span className="text-[11px] font-mono text-emerald-400/70 tabular-nums shrink-0">
        {agent.elapsedMs ? formatTime(agent.elapsedMs) : '—'}
      </span>
    </div>
  );
}

function WaitingRow({ agent, position, onClick }: { agent: AgentInfo; position: number; onClick?: () => void }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity',
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <AgentAvatar src={agent.image} name={agent.name} size="sm" status="waiting" />
      <div className="flex-1 min-w-0">
        <span className="text-xs text-zinc-400 truncate block">{agent.name}</span>
        <span className="text-[10px] text-zinc-600 truncate block">{agent.role}</span>
      </div>
      <span className="text-[10px] font-medium text-zinc-600 bg-zinc-800 rounded px-1.5 py-0.5 shrink-0">
        #{position}
      </span>
    </div>
  );
}

export function QueueTimeline({ agents, onAgentClick }: QueueTimelineProps) {
  const completed = agents.filter(a => a.status === 'completed');
  const waiting = agents.filter(a => a.status === 'waiting' || a.status === 'idle');
  const queuedWaiting = waiting.filter(a => a.status === 'waiting');

  return (
    <div className="space-y-1">
      {completed.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-500/70">
              Concluídos ({completed.length})
            </span>
          </div>
          <div className="space-y-0.5">
            {completed.map(agent => (
              <CompletedRow key={agent.id} agent={agent} onClick={onAgentClick ? () => onAgentClick(agent) : undefined} />
            ))}
          </div>
        </div>
      )}

      {queuedWaiting.length > 0 && (
        <div className={cn(completed.length > 0 && 'mt-2 pt-2 border-t border-zinc-800')}>
          <div className="flex items-center gap-1.5 mb-1.5 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Na Fila ({queuedWaiting.length})
            </span>
          </div>
          <div className="space-y-0.5">
            {queuedWaiting.map((agent, i) => (
              <WaitingRow key={agent.id} agent={agent} position={i + 1} onClick={onAgentClick ? () => onAgentClick(agent) : undefined} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
