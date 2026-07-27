import { useState, useCallback } from "react";
import { EXT_MAP, parseDataUrl } from "../utils/mime";

export interface DecodedFile {
  mime: string;
  ext: string;
  sizeBytes: number;
  blob: Blob;
  isImage: boolean;
  previewUrl: string | null;
}

interface UseBase64DecoderOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useBase64Decoder({ onSuccess, onError }: UseBase64DecoderOptions = {}) {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedFile | null>(null);

  const decode = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        onError?.("Cole ou carregue uma string Base64 primeiro.");
        return;
      }

      try {
        let base64Data: string;
        let mime = "application/octet-stream";

        const parsed = parseDataUrl(trimmed);
        if (parsed) {
          base64Data = parsed.base64;
          mime = parsed.mime;
        } else {
          base64Data = trimmed;
        }

        const byteString = atob(base64Data);
        const bytes = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          bytes[i] = byteString.charCodeAt(i);
        }

        if (bytes.length === 0) {
          onError?.("O Base64 resultou em um arquivo vazio.");
          return;
        }

        const blob = new Blob([bytes], { type: mime });
        const ext = EXT_MAP[mime] || ".bin";
        const isImage = mime.startsWith("image/");
        const previewUrl = isImage ? URL.createObjectURL(blob) : null;

        setDecoded({ mime, ext, sizeBytes: bytes.length, blob, isImage, previewUrl });
        onSuccess?.("Base64 decodificado com sucesso!");
      } catch {
        onError?.("Erro ao decodificar. Verifique se a string Base64 é válida.");
      }
    },
    [onSuccess, onError],
  );

  const handleDownload = useCallback(() => {
    if (!decoded) return;
    const url = URL.createObjectURL(decoded.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output${decoded.ext}`;
    link.click();
    URL.revokeObjectURL(url);
  }, [decoded]);

  const clear = useCallback(() => {
    if (decoded?.previewUrl) URL.revokeObjectURL(decoded.previewUrl);
    setInput("");
    setDecoded(null);
  }, [decoded]);

  return {
    input,
    setInput,
    decoded,
    decode,
    handleDownload,
    clear,
  };
}
