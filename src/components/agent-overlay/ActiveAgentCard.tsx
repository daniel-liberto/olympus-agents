import { AgentAvatar } from './AgentAvatar';
import { useAgentTimer } from '@/hooks/use-agent-timer';
import type { AgentInfo } from '@/types/agents';
import { cn } from '@/lib/utils';

interface ActiveAgentCardProps {
  agent: AgentInfo;
}

export function ActiveAgentCard({ agent }: ActiveAgentCardProps) {
  const { elapsed, formatTime } = useAgentTimer(
    agent.status === 'active',
    agent.startedAt,
  );

  const displayTime = agent.status === 'completed' && agent.elapsedMs
    ? formatTime(agent.elapsedMs)
    : formatTime(elapsed);

  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
      agent.status === 'active' && 'bg-amber-500/10 border border-amber-500/20',
      agent.status === 'completed' && 'bg-emerald-500/5 border border-emerald-500/10',
    )}>
      <AgentAvatar
        src={agent.image}
        name={agent.name}
        size="lg"
        status={agent.status}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-zinc-100 truncate">
            {agent.name}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Stage {agent.stage}
          </span>
        </div>

        <p className="text-xs text-zinc-400 truncate">{agent.role}</p>
        <p className="text-[10px] text-zinc-500 italic">{agent.god}</p>
      </div>

      <div className="text-right shrink-0">
        <div className={cn(
          'font-mono text-sm font-bold tabular-nums',
          agent.status === 'active' && 'text-amber-400',
          agent.status === 'completed' && 'text-emerald-400',
        )}>
          {displayTime}
        </div>
        <div className={cn(
          'text-[10px] font-medium uppercase tracking-wider mt-0.5',
          agent.status === 'active' && 'text-amber-500/70',
          agent.status === 'completed' && 'text-emerald-500/60',
        )}>
          {agent.status === 'active' ? 'Working' : 'Done'}
        </div>
      </div>
    </div>
  );
}
