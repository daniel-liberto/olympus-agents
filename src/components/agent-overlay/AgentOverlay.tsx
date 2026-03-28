import { useState } from 'react';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AgentInfo } from '@/types/agents';
import { AgentAvatar } from './AgentAvatar';
import { ActiveAgentCard } from './ActiveAgentCard';
import { QueueTimeline } from './QueueTimeline';
import { PipelineProgress } from './PipelineProgress';
import { useAgentTimer } from '@/hooks/use-agent-timer';

interface AgentOverlayProps {
  agents: AgentInfo[];
}

export function AgentOverlay({ agents }: AgentOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const pipelineAgents = agents.filter(a => a.id !== 'zeus');
  const activeAgent = pipelineAgents.find(a => a.status === 'active');
  const completed = pipelineAgents.filter(a => a.status === 'completed');
  const nonActiveAgents = pipelineAgents.filter(a => a.status !== 'active');
  const { elapsed, formatTime } = useAgentTimer(
    activeAgent?.status === 'active',
    activeAgent?.startedAt,
  );

  const totalTime = completed.reduce((acc, a) => acc + (a.elapsedMs || 0), 0)
    + (activeAgent?.startedAt ? Date.now() - activeAgent.startedAt : 0);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <div className={cn(
        'bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl',
        'shadow-2xl shadow-black/50 overflow-hidden',
        'transition-all duration-500 ease-out',
      )}>
        {isExpanded && (
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {/* Active Agent */}
              {activeAgent && (
                <div className="p-3 pb-0">
                  <ActiveAgentCard agent={activeAgent} />
                </div>
              )}

              {!activeAgent && (
                <div className="p-4 text-center">
                  <div className="text-zinc-500 text-sm">Pipeline inativo</div>
                  <div className="text-zinc-600 text-xs mt-1">
                    Nenhum agente trabalhando no momento
                  </div>
                </div>
              )}

              {/* Pipeline Progress */}
              <div className="px-3 py-2.5">
                <PipelineProgress agents={pipelineAgents} />
              </div>

              {/* Queue & Completed */}
              <div className="px-3 pb-3">
                <QueueTimeline agents={nonActiveAgents} />
              </div>
            </div>

            {/* Total Time Footer */}
            <div className="px-3 py-2 border-t border-zinc-800/60 flex items-center justify-between bg-zinc-900/50">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                Tempo Total
              </span>
              <span className="text-xs font-mono text-zinc-300 tabular-nums">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>
        )}

        {/* Minimized Header / Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'w-full flex items-center gap-3 p-3 transition-colors',
            'hover:bg-zinc-800/30 cursor-pointer',
            !isExpanded && 'py-2.5',
          )}
        >
          {activeAgent ? (
            <>
              <div className="relative">
                <AgentAvatar
                  src={activeAgent.image}
                  name={activeAgent.name}
                  size="sm"
                  status="active"
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-zinc-200 truncate">
                    {activeAgent.name}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    — {activeAgent.role}
                  </span>
                </div>
                {!isExpanded && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-amber-400/80 tabular-nums">
                      {formatTime(elapsed)}
                    </span>
                    <span className="text-[10px] text-zinc-600">
                      • {completed.length}/{pipelineAgents.length} concluídos
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-xs text-zinc-400">Olympus Pipeline</span>
            </div>
          )}

          <div className="shrink-0 text-zinc-500">
            {isExpanded
              ? <ChevronDown className="w-4 h-4" />
              : <ChevronUp className="w-4 h-4" />
            }
          </div>
        </button>
      </div>
    </div>
  );
}
