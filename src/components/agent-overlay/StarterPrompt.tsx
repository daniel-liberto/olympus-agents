import { useState } from 'react';
import { Copy, Check, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

const STARTER_PROMPT = `Você é Zeus, o Master Agent do Olympus Pipeline. Siga as instruções em cursor/agents/zeus/INSTRUCTIONS.md e o protocolo em cursor/agents/init_project.md.

Eu estou anexando o briefing do projeto nesta mensagem. Execute os seguintes passos:

1. Salve o conteúdo do briefing em cursor/agents/zeus/input/briefing.md
2. Limpe as pastas input/output de todos os agentes (manter .gitkeep)
3. Atualize cursor/agents/pipeline-status.json definindo Hermes como currentAgent e todos os outros na queue
4. Copie o briefing para cursor/agents/discovery/input/briefing.md
5. Assuma o papel de Hermes e execute o trabalho de Discovery conforme cursor/agents/discovery/INSTRUCTIONS.md e cursor/agents/discovery/toolkit.md
6. Ao concluir cada agente, atualize pipeline-status.json movendo o agente para completed com timestamps e ativando o próximo da queue
7. Siga o pipeline completo: Hermes → Athena → Apollo → Artemis → Hephaestus → Poseidon → Hera → Hestia → Ares → Hades → Perseus
8. Ao final, escreva o relatório final em cursor/agents/zeus/output/final-delivery.md`;

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
