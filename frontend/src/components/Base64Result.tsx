import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

interface Base64ResultProps {
  base64: string;
  fileName: string;
  onCopyError?: (message: string) => void;
  accentColor?: "blue" | "violet" | "emerald";
}

export function Base64Result({
  base64,
  fileName,
  onCopyError,
  accentColor = "blue",
}: Base64ResultProps) {
  const [copied, setCopied] = useState(false);

  const ringStyles = {
    blue: "focus:ring-blue-500/50",
    violet: "focus:ring-violet-500/50",
    emerald: "focus:ring-emerald-500/50",
  }[accentColor];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onCopyError?.("Não foi possível copiar. Verifique as permissões do navegador.");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(base64)}`;
    link.download = `${fileName}.base64.txt`;
    link.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">Código Base64</label>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-md border border-neutral-700"
          >
            <Download className="w-4 h-4" />
            Baixar .txt
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors rounded-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>
      <textarea
        readOnly
        value={base64}
        className={`w-full h-36 p-3 text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg resize-none focus:outline-none focus:ring-2 ${ringStyles}`}
      />
    </div>
  );
}
