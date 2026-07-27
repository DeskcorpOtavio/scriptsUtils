import { useState, useCallback } from "react";
import { getMimeFromName } from "../utils/mime";
import { formatBytes } from "../utils/format";

export interface FileMeta {
  name: string;
  type: string;
  originalSize: number;
  base64Size: number;
  dataUrl: string;
}

interface UseFileConverterOptions {
  maxSize?: number;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useFileConverter({
  maxSize = 50 * 1024 * 1024,
  onSuccess,
  onError,
}: UseFileConverterOptions = {}) {
  const [result, setResult] = useState<FileMeta | null>(null);
  const [loading, setLoading] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (file.size > maxSize) {
        onError?.(
          `Arquivo muito grande (${formatBytes(file.size)}). O limite é ${formatBytes(maxSize)}.`,
        );
        return;
      }

      setLoading(true);
      const reader = new FileReader();

      reader.onerror = () => {
        setLoading(false);
        onError?.("Erro ao ler o arquivo. Tente novamente.");
      };

      reader.onload = (event) => {
        const raw = event.target?.result as string;
        if (!raw) {
          setLoading(false);
          onError?.("Resultado da leitura está vazio.");
          return;
        }

        const mime = getMimeFromName(file.name);
        const base64Only = raw.split(",")[1] || raw;
        const dataUrl = `data:${mime};base64,${base64Only}`;

        setResult({
          name: file.name,
          type: mime,
          originalSize: file.size,
          base64Size: dataUrl.length,
          dataUrl,
        });
        setLoading(false);
        onSuccess?.("Arquivo convertido com sucesso!");
      };

      reader.readAsDataURL(file);
    },
    [maxSize, onSuccess, onError],
  );

  const clear = useCallback(() => setResult(null), []);

  return {
    result,
    loading,
    processFile,
    clear,
  };
}
