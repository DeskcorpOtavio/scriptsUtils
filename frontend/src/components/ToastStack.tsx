import { AlertCircle, Check, X } from "lucide-react";
import type { Toast } from "../types";

interface ToastStackProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

export function ToastStack({ toasts, onRemove }: ToastStackProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm animate-slide-in ${
            t.type === "error"
              ? "bg-red-500/20 border border-red-500/40 text-red-300"
              : "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
          }`}
        >
          {t.type === "error" ? (
            <AlertCircle className="w-4 h-4 shrink-0" />
          ) : (
            <Check className="w-4 h-4 shrink-0" />
          )}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => onRemove(t.id)} className="shrink-0 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
