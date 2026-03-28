import { X } from 'lucide-react';
import type { AgentInfo } from '@/types/agents';
import { cn } from '@/lib/utils';

interface AgentDetailModalProps {
  agent: AgentInfo;
  onClose: () => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  idle: { label: 'Aguardando', color: 'text-zinc-500 bg-zinc-800' },
  active: { label: 'Trabalhando', color: 'text-amber-300 bg-amber-500/15' },
  completed: { label: 'Concluído', color: 'text-emerald-400 bg-emerald-500/15' },
  waiting: { label: 'Na Fila', color: 'text-zinc-400 bg-zinc-700' },
  error: { label: 'Erro', color: 'text-red-400 bg-red-500/15' },
};

export function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  const statusInfo = statusLabels[agent.status] || statusLabels.idle;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 fade-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Left — Image */}
          <div className="sm:w-[240px] shrink-0 relative">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-48 sm:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-zinc-950/80" />

            {agent.status === 'active' && (
              <div className="absolute top-3 left-3">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
                </span>
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div className="flex-1 p-5 sm:p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h2 className="text-xl font-bold text-zinc-100">{agent.name}</h2>
                <span className={cn('text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full', statusInfo.color)}>
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-sm text-amber-400/80 font-medium">{agent.god}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Stage {agent.stage} • {agent.role}</p>
            </div>

            {agent.description && (
              <p className="text-sm text-zinc-400 leading-relaxed">{agent.description}</p>
            )}

            {agent.tools && agent.tools.length > 0 && (
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Ferramentas
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {agent.tools.map(tool => (
                    <span
                      key={tool}
                      className="text-[11px] font-medium px-2 py-1 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {agent.elapsedMs && (
              <div className="pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Tempo de trabalho</span>
                  <span className="text-sm font-mono text-emerald-400 tabular-nums">
                    {Math.floor(agent.elapsedMs / 60000)}m {Math.floor((agent.elapsedMs % 60000) / 1000)}s
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
