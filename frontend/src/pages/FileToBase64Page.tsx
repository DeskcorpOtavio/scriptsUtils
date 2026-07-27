import { FileIcon, FileType2, HardDrive } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { useFileConverter } from "../hooks/useFileConverter";
import { ToastStack } from "../components/ToastStack";
import { PageHeader } from "../components/PageHeader";
import { UploadArea } from "../components/UploadArea";
import { FileInfoBar } from "../components/FileInfoBar";
import { Base64Result } from "../components/Base64Result";
import { StatCard } from "../components/StatCard";
import { formatBytes } from "../utils/format";
import { SUPPORTED_FORMATS } from "../utils/mime";

export default function FileToBase64Page() {
  const { toasts, removeToast, onSuccess, onError } = useToast();

  const { result, loading, processFile, clear } = useFileConverter({
    onSuccess,
    onError,
  });

  return (
    <>
      <ToastStack toasts={toasts} onRemove={removeToast} />

      <PageHeader
        title="Arquivo → Base64"
        description="Converta qualquer tipo de arquivo para Base64 — PDF, DOCX, MP3, ZIP e muito mais."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UploadArea
            loading={loading}
            onFileSelect={processFile}
            accept="*"
            title="Clique ou arraste qualquer arquivo"
            dragTitle="Solte o arquivo aqui"
            subtitle="Qualquer formato"
            accentColor="violet"
            maxSize={50 * 1024 * 1024}
          />

          {result && (
            <FileInfoBar
              fileName={result.name}
              onClear={clear}
              icon={<FileIcon className="w-5 h-5 text-violet-400 shrink-0" />}
            />
          )}

          {result && (
            <Base64Result
              base64={result.dataUrl}
              fileName={result.name}
              onCopyError={onError}
              accentColor="violet"
            />
          )}
        </div>

        <aside className="space-y-6">
          {result && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                Detalhes
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  icon={<FileType2 className="w-4 h-4" />}
                  label="Tipo"
                  value={result.type.split("/")[1]?.toUpperCase() || "—"}
                />
                <StatCard
                  icon={<FileType2 className="w-4 h-4" />}
                  label="MIME"
                  value={result.type}
                />
                <StatCard
                  icon={<HardDrive className="w-4 h-4" />}
                  label="Original"
                  value={formatBytes(result.originalSize)}
                />
                <StatCard
                  icon={<HardDrive className="w-4 h-4" />}
                  label="Base64"
                  value={formatBytes(result.base64Size)}
                />
              </div>
            </div>
          )}

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              Formatos Suportados
            </h2>
            <div className="space-y-3 text-sm">
              {SUPPORTED_FORMATS.map((g) => (
                <div key={g.cat}>
                  <p className="text-neutral-300 font-medium">{g.cat}</p>
                  <p className="text-neutral-500 text-xs">{g.exts}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
