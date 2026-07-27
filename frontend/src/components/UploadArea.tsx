import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { MAX_FILE_SIZE } from "../constants";
import { formatBytes } from "../utils/format";

interface UploadAreaProps {
  loading: boolean;
  onFileSelect: (file: File) => void;
}

export function UploadArea({ loading, onFileSelect }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50"
      } ${loading ? "pointer-events-none opacity-60" : ""}`}
    >
      {loading ? (
        <div className="w-8 h-8 border-2 border-neutral-500 border-t-blue-400 rounded-full animate-spin" />
      ) : (
        <>
          <Upload className="w-10 h-10 mb-4 text-neutral-500" />
          <p className="text-lg font-medium text-neutral-300">
            {isDragging ? "Solte a imagem aqui" : "Clique ou arraste uma imagem"}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            PNG, JPG, GIF, WEBP, SVG — até {formatBytes(MAX_FILE_SIZE)}
          </p>
        </>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
