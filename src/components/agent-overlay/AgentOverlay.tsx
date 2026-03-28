import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, Zap, Crown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePipeline } from '@/contexts/PipelineContext';
import { AgentAvatar } from './AgentAvatar';
import { ActiveAgentCard } from './ActiveAgentCard';
import { QueueTimeline } from './QueueTimeline';
import { PipelineProgress } from './PipelineProgress';
import { StarterPrompt } from './StarterPrompt';
import { AgentDetailModal } from './AgentDetailModal';
import { useAgentTimer } from '@/hooks/use-agent-timer';
import type { AgentInfo } from '@/types/agents';

export function AgentOverlay() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
  const { agents, phase, resetPipeline } = usePipeline();

  const allAgents = agents;
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

  const handleAgentClick = useCallback((agent: AgentInfo) => {
    setSelectedAgent(agent);
  }, []);

  return (
    <>
      {selectedAgent && (
        <AgentDetailModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      <div className="fixed bottom-4 right-4 z-50 w-80">
        <div className={cn(
          'bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl',
          'shadow-2xl shadow-black/50 overflow-hidden',
          'transition-all duration-500 ease-out',
        )}>
          {isExpanded && (
            <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">

                {/* === IDLE STATE: Gods Gallery + Briefing Upload === */}
                {phase === 'idle' && (
                  <div className="p-3 space-y-3">
                    <div className="grid grid-cols-6 gap-1.5">
                      {allAgents.map(agent => (
                        <button
                          key={agent.id}
                          onClick={() => handleAgentClick(agent)}
                          className="group relative flex flex-col items-center gap-1 cursor-pointer"
                          title={`${agent.name} — ${agent.role}`}
                        >
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className={cn(
                              'w-10 h-10 rounded-full object-cover ring-1 transition-all group-hover:scale-110',
                              agent.id === 'zeus'
                                ? 'ring-amber-500/40 group-hover:ring-amber-400'
                                : 'ring-zinc-700/50 group-hover:ring-amber-400/60',
                            )}
                          />
                          <span className={cn(
                            'text-[8px] transition-colors truncate w-full text-center',
                            agent.id === 'zeus'
                              ? 'text-amber-400/70 group-hover:text-amber-300 font-medium'
                              : 'text-zinc-500 group-hover:text-zinc-300',
                          )}>
                            {agent.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-zinc-800/60">
                      <div className="flex items-center gap-1.5 mb-2 px-1">
                        <Crown className="w-3 h-3 text-amber-400/60" />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                          Starter Prompt
                        </span>
                      </div>
                      <StarterPrompt />
                    </div>
                  </div>
                )}

                {/* === RUNNING STATE: Active Agent + Queue === */}
                {phase === 'running' && (
                  <>
                    {activeAgent && (
                      <div className="p-3 pb-0">
                        <div className="cursor-pointer" onClick={() => handleAgentClick(activeAgent)}>
                          <ActiveAgentCard agent={activeAgent} />
                        </div>
                      </div>
                    )}

                    <div className="px-3 py-2.5">
                      <PipelineProgress agents={pipelineAgents} />
                    </div>

                    <div className="px-3 pb-3">
                      <QueueTimeline agents={nonActiveAgents} onAgentClick={handleAgentClick} />
                    </div>
                  </>
                )}

                {/* === COMPLETED STATE: Epic Conclusion === */}
                {phase === 'completed' && (
                  <div className="p-4 text-center space-y-3">
                    <div className="relative mx-auto w-16 h-16">
                      <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <Crown className="w-7 h-7 text-zinc-900" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                        Os Deuses Concluíram sua Obra
                      </h3>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Todos os {pipelineAgents.length} agentes completaram suas tarefas divinas
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs">
                      <div className="text-center">
                        <div className="font-mono text-emerald-400 font-bold tabular-nums">{formatTime(totalTime)}</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Tempo Total</div>
                      </div>
                      <div className="w-px h-6 bg-zinc-800" />
                      <div className="text-center">
                        <div className="font-mono text-amber-400 font-bold tabular-nums">{pipelineAgents.length}</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Agentes</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-1">
                      {pipelineAgents.map(agent => (
                        <button
                          key={agent.id}
                          onClick={() => handleAgentClick(agent)}
                          className="group cursor-pointer"
                          title={`${agent.name} — ${agent.elapsedMs ? formatTime(agent.elapsedMs) : ''}`}
                        >
                          <AgentAvatar
                            src={agent.image}
                            name={agent.name}
                            size="sm"
                            status="completed"
                            className="mx-auto group-hover:scale-110 transition-transform"
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={resetPipeline}
                      className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors mt-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Nova Jornada
                    </button>
                  </div>
                )}
              </div>

              {/* Total time footer — only during running */}
              {phase === 'running' && (
                <div className="px-3 py-2 border-t border-zinc-800/60 flex items-center justify-between bg-zinc-900/50">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                    Tempo Total
                  </span>
                  <span className="text-xs font-mono text-zinc-300 tabular-nums">
                    {formatTime(totalTime)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* === BOTTOM BAR (always visible) === */}
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
            ) : phase === 'completed' ? (
              <div className="flex-1 flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-amber-300/80 font-medium">Obra Divina Concluída</span>
              </div>
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
    </>
  );
}
