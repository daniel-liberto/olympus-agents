import { useMockPipeline } from '@/hooks/use-mock-pipeline';
import { AgentOverlay } from '@/components/agent-overlay/AgentOverlay';

const Index = () => {
  const { agents, isRunning, startPipeline, resetPipeline } = useMockPipeline();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative">
      <div className="text-center space-y-6 max-w-lg px-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Olympus Agents
          </h1>
          <p className="text-zinc-400 text-lg">
            Pipeline de Produção Multi-Agente
          </p>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed">
          12 agentes AI inspirados na mitologia grega trabalhando em sequência —
          da descoberta ao teste final. Clique abaixo para simular o pipeline.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={startPipeline}
            disabled={isRunning}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500
                       text-zinc-900 font-semibold text-sm rounded-lg transition-all duration-200
                       disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 disabled:shadow-none"
          >
            {isRunning ? 'Pipeline em andamento...' : 'Iniciar Simulação'}
          </button>

          {isRunning && (
            <button
              onClick={resetPipeline}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300
                         font-medium text-sm rounded-lg transition-colors border border-zinc-700"
            >
              Reset
            </button>
          )}
        </div>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-zinc-600">
          <span>React + Vite</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>TypeScript</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>TailwindCSS</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>shadcn/ui</span>
        </div>
      </div>

      <AgentOverlay agents={agents} />
    </div>
  );
};

export default Index;
