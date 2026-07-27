import { useRef } from "react";
import {
  Upload,
  Download,
  FileDown,
  AlertCircle,
  Trash2,
  FileType2,
  HardDrive,
} from "lucide-react";
import { useToast } from "../hooks/useToast";
import { useBase64Decoder } from "../hooks/useBase64Decoder";
import { ToastStack } from "../components/ToastStack";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { ImagePreview } from "../components/ImagePreview";
import { formatBytes } from "../utils/format";

export default function Base64ToFilePage() {
  const { toasts, removeToast, onSuccess, onError } = useToast();

  const { input, setInput, decoded, decode, handleDownload, clear } =
    useBase64Decoder({ onSuccess, onError });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => onError("Erro ao ler o arquivo.");
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setInput(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <>
      <ToastStack toasts={toasts} onRemove={removeToast} />

      <PageHeader
        title="Base64 → Arquivo"
        description="Cole uma string Base64 (Data URL ou raw) e baixe o arquivo original."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">String Base64</label>
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-md border border-neutral-700"
                >
                  <Upload className="w-4 h-4" />
                  Carregar .txt
                </button>
                {input && (
                  <button
                    onClick={clear}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors rounded-md border border-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Cole aqui: "data:image/png;base64,iVBOR..." ou Base64 puro'
              className="w-full h-44 p-3 text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-neutral-600"
            />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept=".txt,.text"
              onChange={handleLoadFile}
            />
          </div>

          <button
            onClick={() => decode(input)}
            disabled={!input.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors rounded-xl"
          >
            <FileDown className="w-5 h-5" />
            Decodificar
          </button>

          {decoded?.isImage && decoded.previewUrl && (
            <ImagePreview src={decoded.previewUrl} />
          )}

          {decoded && (
            <div className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                  <FileDown className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">output{decoded.ext}</p>
                  <p className="text-xs text-neutral-500">
                    {formatBytes(decoded.sizeBytes)} · {decoded.mime}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors rounded-md"
              >
                <Download className="w-4 h-4" />
                Baixar
              </button>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {decoded && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                Detalhes do Arquivo
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  icon={<FileType2 className="w-4 h-4" />}
                  label="Extensão"
                  value={decoded.ext}
                />
                <StatCard
                  icon={<FileType2 className="w-4 h-4" />}
                  label="MIME"
                  value={decoded.mime}
                />
                <StatCard
                  icon={<HardDrive className="w-4 h-4" />}
                  label="Tamanho"
                  value={formatBytes(decoded.sizeBytes)}
                />
                <StatCard
                  icon={<HardDrive className="w-4 h-4" />}
                  label="Base64"
                  value={formatBytes(input.length)}
                />
              </div>
            </div>
          )}

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              Como usar
            </h2>
            <ol className="space-y-3 text-sm text-neutral-400 list-decimal list-inside">
              <li>
                Cole uma string Base64 no campo de texto ou carregue um arquivo{" "}
                <code className="text-neutral-300">.txt</code>
              </li>
              <li>
                Clique em{" "}
                <strong className="text-emerald-400">Decodificar</strong>
              </li>
              <li>Visualize o preview (se for imagem) e baixe o arquivo</li>
            </ol>
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Aceita tanto Data URLs (<code>data:mime;base64,...</code>)
                quanto Base64 puro.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
