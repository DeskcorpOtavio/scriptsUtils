interface ImagePreviewProps {
  src: string;
}

export function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 flex justify-center p-6">
      <img
        src={src}
        alt="Preview"
        className="max-h-72 object-contain rounded"
      />
    </div>
  );
}
