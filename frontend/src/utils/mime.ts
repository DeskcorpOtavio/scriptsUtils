export const MIME_MAP: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  bmp: "image/bmp",
  ico: "image/x-icon",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  json: "application/json",
  xml: "application/xml",
  md: "text/markdown",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  mp4: "video/mp4",
  webm: "video/webm",
  zip: "application/zip",
  gz: "application/gzip",
  tar: "application/x-tar",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
};

export const EXT_MAP: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/bmp": ".bmp",
  "image/x-icon": ".ico",
  "application/pdf": ".pdf",
  "application/json": ".json",
  "text/plain": ".txt",
  "text/html": ".html",
  "text/css": ".css",
  "application/javascript": ".js",
  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "application/zip": ".zip",
  "font/woff": ".woff",
  "font/woff2": ".woff2",
};

export const SUPPORTED_FORMATS = [
  { cat: "Imagens", exts: "PNG, JPG, GIF, WEBP, SVG" },
  { cat: "Documentos", exts: "PDF, DOC(X), XLS(X), CSV" },
  { cat: "Texto", exts: "TXT, HTML, CSS, JS, JSON, MD" },
  { cat: "Áudio", exts: "MP3, WAV, OGG" },
  { cat: "Vídeo", exts: "MP4, WEBM" },
  { cat: "Outros", exts: "ZIP, GZ, WOFF(2), TTF" },
];

export function getMimeFromName(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return MIME_MAP[ext] || "application/octet-stream";
}

export function parseDataUrl(input: string) {
  const match = input.match(/^data:([^;]+);base64,(.+)$/s);
  if (match) return { mime: match[1], base64: match[2] };
  return null;
}
