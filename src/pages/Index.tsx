import { BookOpen, ArrowRight, FileText, Copy, Eye, RotateCcw, Terminal } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Prepare o Briefing',
    description: 'Crie um documento PDF ou Markdown descrevendo o projeto — escopo, funcionalidades, público-alvo e referências visuais.',
  },
  {
    icon: Terminal,
    title: 'Inicie o Dev Server',
    description: 'Execute npm run dev para iniciar o overlay visual. Ele vai acompanhar o progresso dos agentes em tempo real.',
  },
  {
    icon: Copy,
    title: 'Copie o Starter Prompt',
    description: 'No painel inferior direito, copie o Starter Prompt e cole no chat do Cursor IDE. Anexe o documento de briefing junto à mensagem.',
  },
  {
    icon: Eye,
    title: 'Acompanhe em Tempo Real',
    description: 'Zeus assume o controle e ativa cada agente na sequência. O overlay mostra quem está trabalhando, o tempo e a fila. Clique em qualquer deus para ver detalhes.',
  },
  {
    icon: RotateCcw,
    title: 'Receba o Resultado',
    description: 'Ao final, todos os 11 agentes terão completado suas tarefas — da descoberta ao teste final. O projeto estará pronto para uso.',
  },
];

const pipelineOrder = [
  { name: 'Hermes', role: 'Discovery & Requirements' },
  { name: 'Athena', role: 'Product Strategy' },
  { name: 'Apollo', role: 'Desktop UI/UX' },
  { name: 'Artemis', role: 'Mobile UI/UX' },
  { name: 'Hephaestus', role: 'Visual Refinement' },
  { name: 'Poseidon', role: 'Frontend Development' },
  { name: 'Hera', role: 'Responsive Design' },
  { name: 'Hestia', role: 'Animations & Polish' },
  { name: 'Ares', role: 'Frontend QA' },
  { name: 'Hades', role: 'Mobile Testing' },
  { name: 'Perseus', role: 'Desktop Testing' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950 relative">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-zinc-400" />
            <h1 className="text-2xl font-semibold text-zinc-200 tracking-tight">
              Olympus Agents
            </h1>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Pipeline de produção multi-agente com 12 entidades baseadas na mitologia grega.
            Cada agente possui uma especialidade e trabalha em sequência para transformar
            um briefing em um projeto frontend completo.
          </p>
        </div>

        {/* Tutorial Steps */}
        <div className="space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Como Usar
          </h2>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="pt-0.5 space-y-1">
                  <h3 className="text-sm font-medium text-zinc-300">
                    <span className="text-zinc-600 mr-1.5">{i + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Order */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Ordem do Pipeline
          </h2>

          <div className="space-y-1">
            {pipelineOrder.map((agent, i) => (
              <div key={agent.name} className="flex items-center gap-3 py-1.5">
                <span className="text-[10px] font-mono text-zinc-600 w-5 text-right tabular-nums">{i + 1}</span>
                <ArrowRight className="w-3 h-3 text-zinc-700" />
                <span className="text-xs text-zinc-300 font-medium">{agent.name}</span>
                <span className="text-[11px] text-zinc-600">— {agent.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Template Notice */}
        <div className="border border-dashed border-zinc-800 rounded-lg px-4 py-3 bg-zinc-900/30">
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            <span className="text-zinc-500 font-medium">Página temporária</span> — esta tela é
            apenas um guia de utilização e será completamente substituída pelo conteúdo do projeto
            assim que o pipeline de criação for iniciado.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Index;
