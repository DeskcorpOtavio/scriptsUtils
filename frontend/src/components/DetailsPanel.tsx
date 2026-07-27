import { FileType2, HardDrive, Ruler } from "lucide-react";
import type { ImageMeta } from "../types";
import { formatBytes } from "../utils/format";
import { StatCard } from "./StatCard";

interface DetailsPanelProps {
  meta: ImageMeta;
}

export function DetailsPanel({ meta }: DetailsPanelProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
      <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
        Detalhes
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<FileType2 className="w-4 h-4" />}
          label="Tipo"
          value={meta.type.split("/")[1]?.toUpperCase() || "—"}
        />
        <StatCard
          icon={<Ruler className="w-4 h-4" />}
          label="Dimensões"
          value={`${meta.width}×${meta.height}`}
        />
        <StatCard
          icon={<HardDrive className="w-4 h-4" />}
          label="Original"
          value={formatBytes(meta.originalSize)}
        />
        <StatCard
          icon={<HardDrive className="w-4 h-4" />}
          label="Base64"
          value={formatBytes(meta.base64Size)}
        />
      </div>
    </div>
  );
}
