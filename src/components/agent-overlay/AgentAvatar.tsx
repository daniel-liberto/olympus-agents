import { cn } from '@/lib/utils';
import type { AgentStatus } from '@/types/agents';

interface AgentAvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  status: AgentStatus;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const ringMap: Record<AgentStatus, string> = {
  active: 'ring-2 ring-amber-400 ring-offset-2 ring-offset-zinc-900',
  completed: 'ring-2 ring-emerald-500/50 ring-offset-1 ring-offset-zinc-900',
  waiting: 'ring-1 ring-zinc-600',
  idle: 'ring-1 ring-zinc-700/50',
  error: 'ring-2 ring-red-500 ring-offset-2 ring-offset-zinc-900',
};

export function AgentAvatar({ src, name, size = 'md', status, className }: AgentAvatarProps) {
  return (
    <div className={cn('relative shrink-0', className)}>
      <img
        src={src}
        alt={name}
        className={cn(
          sizeMap[size],
          'rounded-full object-cover',
          ringMap[status],
          status === 'active' && 'shadow-lg shadow-amber-500/20',
        )}
      />
      {status === 'active' && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-zinc-900" />
        </span>
      )}
      {status === 'completed' && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 border-2 border-zinc-900">
          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </div>
  );
}
