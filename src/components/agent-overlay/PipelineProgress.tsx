import type { AgentInfo } from '@/types/agents';
import { cn } from '@/lib/utils';

interface PipelineProgressProps {
  agents: AgentInfo[];
}

export function PipelineProgress({ agents }: PipelineProgressProps) {
  const stages = agents.filter(a => a.id !== 'zeus');
  const completed = stages.filter(a => a.status === 'completed').length;
  const active = stages.filter(a => a.status === 'active').length;
  const total = stages.length;
  const progress = ((completed + active * 0.5) / total) * 100;

  return (
    <div className="px-1">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
          Pipeline
        </span>
        <span className="text-[10px] font-mono text-zinc-400">
          {completed}/{total}
        </span>
      </div>

      <div className="flex gap-[3px]">
        {stages.map((agent) => (
          <div
            key={agent.id}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all duration-500',
              agent.status === 'completed' && 'bg-emerald-500',
              agent.status === 'active' && 'bg-amber-400 animate-pulse',
              agent.status === 'waiting' && 'bg-zinc-700',
              agent.status === 'idle' && 'bg-zinc-800',
              agent.status === 'error' && 'bg-red-500',
            )}
            title={`${agent.name} — ${agent.status}`}
          />
        ))}
      </div>

      <div className="mt-1 h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
