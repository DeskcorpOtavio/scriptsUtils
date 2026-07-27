export interface ImageMeta {
  name: string;
  type: string;
  originalSize: number;
  base64Size: number;
  width: number;
  height: number;
  dataUrl: string;
  convertedAt: Date;
}

export interface Toast {
  id: number;
  message: string;
  type: "error" | "success";
}
