import { useState, useCallback } from "react";
import type { ImageMeta } from "../types";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "../constants";
import { formatBytes } from "../utils/format";

interface UseImageConverterOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useImageConverter({ onSuccess, onError }: UseImageConverterOptions) {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<ImageMeta | null>(null);
  const [history, setHistory] = useState<ImageMeta[]>([]);
  const [loading, setLoading] = useState(false);

  const validate = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type))
      return `Tipo de arquivo "${file.type || "desconhecido"}" não suportado. Use PNG, JPG, GIF, WEBP ou SVG.`;
    if (file.size > MAX_FILE_SIZE)
      return `Arquivo muito grande (${formatBytes(file.size)}). O limite é ${formatBytes(MAX_FILE_SIZE)}.`;
    return null;
  };

  const processFile = useCallback(
    (file: File) => {
      const error = validate(file);
      if (error) {
        onError?.(error);
        return;
      }

      setLoading(true);
      const reader = new FileReader();

      reader.onerror = () => {
        setLoading(false);
        onError?.("Erro ao ler o arquivo. Tente novamente.");
      };

      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (!result) {
          setLoading(false);
          onError?.("Resultado da leitura está vazio.");
          return;
        }

        const img = new Image();
        img.onerror = () => {
          setLoading(false);
          onError?.("Não foi possível carregar a imagem. O arquivo pode estar corrompido.");
        };
        img.onload = () => {
          const entry: ImageMeta = {
            name: file.name,
            type: file.type,
            originalSize: file.size,
            base64Size: result.length,
            width: img.naturalWidth,
            height: img.naturalHeight,
            dataUrl: result,
            convertedAt: new Date(),
          };

          setBase64(result);
          setPreview(result);
          setMeta(entry);
          setHistory((prev) => [entry, ...prev].slice(0, 20));
          setLoading(false);
          onSuccess?.("Imagem convertida com sucesso!");
        };
        img.src = result;
      };

      reader.readAsDataURL(file);
    },
    [onSuccess, onError],
  );

  const clear = useCallback(() => {
    setBase64("");
    setPreview(null);
    setMeta(null);
  }, []);

  const loadFromHistory = useCallback((entry: ImageMeta) => {
    setBase64(entry.dataUrl);
    setPreview(entry.dataUrl);
    setMeta(entry);
  }, []);

  return {
    base64,
    preview,
    meta,
    history,
    loading,
    processFile,
    clear,
    loadFromHistory,
  };
}
