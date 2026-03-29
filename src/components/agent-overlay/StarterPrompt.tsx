import { useState } from 'react';
import { Copy, Check, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

const STARTER_PROMPT = `Você é Zeus, o Master Agent do Olympus Pipeline. Siga RIGOROSAMENTE as instruções em cursor/agents/zeus/INSTRUCTIONS.md.

Eu estou anexando o briefing do projeto nesta mensagem. Execute:

1. Salve o briefing em cursor/agents/zeus/input/briefing.md
2. Limpe as pastas input/output de todos os agentes (manter .gitkeep)
3. Atualize cursor/agents/pipeline-status.json: phase "running", currentAgent "hermes", activeStartedAt com timestamp ISO real (new Date().toISOString()), queue com todos os outros
4. Copie o briefing para cursor/agents/discovery/input/briefing.md
5. Assuma cada agente UM POR VEZ (NUNCA em paralelo): leia o INSTRUCTIONS.md e toolkit.md dele, execute o trabalho completo
6. ANTES de iniciar cada agente: atualize pipeline-status.json com currentAgent e activeStartedAt (timestamp real)
7. APÓS concluir cada agente: atualize pipeline-status.json movendo para completed com startedAt, completedAt e elapsedMs REAIS (não arredonde — use timestamps com milissegundos)
8. Copie o output do agente anterior para o input do próximo
9. Pipeline SEQUENCIAL: Hermes → Athena → Apollo → Artemis → Hephaestus → Poseidon → Hera → Hestia → Ares → Hades (Landing Page) → Perseus (Desktop Test)
10. OBRIGATÓRIO: Poseidon DEVE implementar sistema de tema dark/light (dark como padrão) com botão toggle
11. OBRIGATÓRIO: Hades cria a Landing Page (NÃO é mobile tester) — hero, features, social proof, CTA, footer
12. Ao final: phase "completed", escreva cursor/agents/zeus/output/final-delivery.md`;

export function StarterPrompt() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(STARTER_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = STARTER_PROMPT;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative group">
        <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-lg p-2.5 pr-9 max-h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          <p className="text-[10px] text-zinc-400 leading-relaxed font-mono whitespace-pre-wrap break-words">
            {STARTER_PROMPT}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'absolute top-2 right-2 p-1.5 rounded-md transition-all',
            copied
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-zinc-800/80 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700',
          )}
          title="Copiar prompt"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>

      <div className="flex items-start gap-1.5 px-1">
        <Paperclip className="w-3 h-3 text-amber-500/60 shrink-0 mt-0.5" />
        <p className="text-[9px] text-zinc-600 leading-relaxed">
          <span className="text-amber-500/70 font-medium">Obrigatório:</span> anexe o documento de briefing
          (PDF ou MD) junto a este prompt no chat do Cursor.
        </p>
      </div>
    </div>
  );
}
