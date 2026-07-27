import { ImageIcon, Trash2 } from "lucide-react";

interface FileInfoBarProps {
  fileName: string;
  onClear: () => void;
}

export function FileInfoBar({ fileName, onClear }: FileInfoBarProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm">
      <ImageIcon className="w-5 h-5 text-blue-400 shrink-0" />
      <span className="flex-1 truncate font-medium">{fileName}</span>
      <button
        onClick={onClear}
        className="text-neutral-500 hover:text-red-400 transition-colors"
        title="Limpar"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
