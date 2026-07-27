import { useToast } from "../hooks/useToast";
import { useImageConverter } from "../hooks/useImageConverter";
import { ToastStack } from "../components/ToastStack";
import { PageHeader } from "../components/PageHeader";
import { UploadArea } from "../components/UploadArea";
import { FileInfoBar } from "../components/FileInfoBar";
import { ImagePreview } from "../components/ImagePreview";
import { Base64Result } from "../components/Base64Result";
import { DetailsPanel } from "../components/DetailsPanel";
import { HistoryPanel } from "../components/HistoryPanel";

export default function ImageToBase64Page() {
  const { toasts, removeToast, onSuccess, onError } = useToast();

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
    <>
      <ToastStack toasts={toasts} onRemove={removeToast} />

      <PageHeader
        title="Imagem → Base64"
        description="Converta imagens para Data URL localmente e com segurança."
      />

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
    </>
  );
}
