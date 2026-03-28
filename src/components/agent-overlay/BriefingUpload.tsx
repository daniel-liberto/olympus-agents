import { useState, useCallback, useRef, type DragEvent } from 'react';
import { Upload, FileText, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BriefingUploadProps {
  onStart: (file: File) => void;
}

export function BriefingUpload({ onStart }: BriefingUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && isValidFile(selected)) {
      setFile(selected);
    }
  }, []);

  const handleStart = useCallback(() => {
    if (file) onStart(file);
  }, [file, onStart]);

  const clearFile = useCallback(() => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 min-w-0">
        {file ? (
          <div className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-3 py-2 border border-zinc-700/50">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-zinc-300 truncate flex-1">{file.name}</span>
            <button onClick={clearFile} className="shrink-0 p-0.5 hover:bg-zinc-700 rounded text-zinc-500 hover:text-zinc-300 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all border border-dashed',
              isDragging
                ? 'border-amber-400/60 bg-amber-500/5'
                : 'border-zinc-700/60 bg-zinc-800/30 hover:bg-zinc-800/50 hover:border-zinc-600',
            )}
          >
            <Upload className={cn('w-4 h-4 shrink-0', isDragging ? 'text-amber-400' : 'text-zinc-500')} />
            <span className="text-xs text-zinc-500">
              Arraste PDF ou MD aqui
            </span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.md,.markdown,.txt"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      <button
        onClick={handleStart}
        disabled={!file}
        className={cn(
          'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all',
          file
            ? 'bg-amber-500 hover:bg-amber-400 text-zinc-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 cursor-pointer'
            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed',
        )}
      >
        <Play className="w-4 h-4 ml-0.5" />
      </button>
    </div>
  );
}

function isValidFile(file: File): boolean {
  const valid = ['.pdf', '.md', '.markdown', '.txt'];
  return valid.some(ext => file.name.toLowerCase().endsWith(ext));
}
