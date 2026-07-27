import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { MAX_FILE_SIZE } from "../constants";
import { formatBytes } from "../utils/format";

interface UploadAreaProps {
  loading: boolean;
  onFileSelect: (file: File) => void;
  accept?: string;
  title?: string;
  dragTitle?: string;
  subtitle?: string;
  maxSize?: number;
  accentColor?: "blue" | "violet" | "emerald";
}

export function UploadArea({
  loading,
  onFileSelect,
  accept = "image/*",
  title = "Clique ou arraste uma imagem",
  dragTitle = "Solte a imagem aqui",
  subtitle = "PNG, JPG, GIF, WEBP, SVG",
  maxSize = MAX_FILE_SIZE,
  accentColor = "blue",
}: UploadAreaProps) {
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

  const borderStyles = {
    blue: isDragging ? "border-blue-500 bg-blue-500/10" : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50",
    violet: isDragging ? "border-violet-500 bg-violet-500/10" : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50",
    emerald: isDragging ? "border-emerald-500 bg-emerald-500/10" : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50",
  }[accentColor];

  const spinnerStyles = {
    blue: "border-t-blue-400",
    violet: "border-t-violet-400",
    emerald: "border-t-emerald-400",
  }[accentColor];

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${borderStyles} ${
        loading ? "pointer-events-none opacity-60" : ""
      }`}
    >
      {loading ? (
        <div className={`w-8 h-8 border-2 border-neutral-500 ${spinnerStyles} rounded-full animate-spin`} />
      ) : (
        <>
          <Upload className="w-10 h-10 mb-4 text-neutral-500" />
          <p className="text-lg font-medium text-neutral-300">
            {isDragging ? dragTitle : title}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            {subtitle} — até {formatBytes(maxSize)}
          </p>
        </>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
}
