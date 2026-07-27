import { useCallback } from "react";
import { useToast } from "./hooks/useToast";
import { useImageConverter } from "./hooks/useImageConverter";
import { ToastStack } from "./components/ToastStack";
import { UploadArea } from "./components/UploadArea";
import { FileInfoBar } from "./components/FileInfoBar";
import { ImagePreview } from "./components/ImagePreview";
import { Base64Result } from "./components/Base64Result";
import { DetailsPanel } from "./components/DetailsPanel";
import { HistoryPanel } from "./components/HistoryPanel";

export default function App() {
  const { toasts, pushToast, removeToast } = useToast();

  const onSuccess = useCallback(
    (msg: string) => pushToast(msg, "success"),
    [pushToast],
  );
  const onError = useCallback(
    (msg: string) => pushToast(msg, "error"),
    [pushToast],
  );

  const {
    base64,
    preview,
    meta,
    history,
    loading,
    processFile,
    clear,
    loadFromHistory,
  } = useImageConverter({ onSuccess, onError });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <ToastStack toasts={toasts} onRemove={removeToast} />

      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Image to Base64
            </span>
          </h1>
          <p className="mt-1 text-neutral-400">
            Converta imagens para Data URL localmente e com segurança.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UploadArea loading={loading} onFileSelect={processFile} />

            {meta && <FileInfoBar fileName={meta.name} onClear={clear} />}

            {preview && <ImagePreview src={preview} />}

            {base64 && meta && (
              <Base64Result
                base64={base64}
                fileName={meta.name}
                onCopyError={onError}
              />
            )}
          </div>

          <aside className="space-y-6">
            {meta && <DetailsPanel meta={meta} />}
            <HistoryPanel
              history={history}
              activeMeta={meta}
              onSelect={loadFromHistory}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
