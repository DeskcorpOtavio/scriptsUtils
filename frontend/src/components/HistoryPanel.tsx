import { Clock } from "lucide-react";
import type { ImageMeta } from "../types";
import { formatBytes, timeAgo } from "../utils/format";

interface HistoryPanelProps {
  history: ImageMeta[];
  activeMeta: ImageMeta | null;
  onSelect: (entry: ImageMeta) => void;
}

export function HistoryPanel({ history, activeMeta, onSelect }: HistoryPanelProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
        Histórico
      </h2>
      {history.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-6">
          Nenhuma conversão ainda.
        </p>
      ) : (
        <ul className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {history.map((entry, i) => (
            <li
              key={`${entry.name}-${i}`}
              onClick={() => onSelect(entry)}
              className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors text-sm ${
                activeMeta?.convertedAt === entry.convertedAt
                  ? "bg-blue-500/10 border border-blue-500/30"
                  : "hover:bg-neutral-800 border border-transparent"
              }`}
            >
              <img
                src={entry.dataUrl}
                alt={entry.name}
                className="w-8 h-8 rounded object-cover shrink-0 bg-neutral-800"
              />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-neutral-200">
                  {entry.name}
                </p>
                <p className="text-xs text-neutral-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeAgo(entry.convertedAt)}
                </p>
              </div>
              <span className="text-xs text-neutral-500 shrink-0">
                {formatBytes(entry.originalSize)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
