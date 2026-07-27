const path = require("path");

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",

  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".csv": "text/csv",

  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".md": "text/markdown",

  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",

  ".mp4": "video/mp4",
  ".webm": "video/webm",

  ".zip": "application/zip",
  ".gz": "application/gzip",
  ".tar": "application/x-tar",

  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
};

const EXT_MAP = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/bmp": ".bmp",
  "image/x-icon": ".ico",

  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ".pptx",
  "text/csv": ".csv",

  "text/plain": ".txt",
  "text/html": ".html",
  "text/css": ".css",
  "application/javascript": ".js",
  "application/json": ".json",
  "application/xml": ".xml",
  "text/markdown": ".md",

  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "audio/ogg": ".ogg",

  "video/mp4": ".mp4",
  "video/webm": ".webm",

  "application/zip": ".zip",
  "application/gzip": ".gz",
  "application/x-tar": ".tar",

  "font/woff": ".woff",
  "font/woff2": ".woff2",
  "font/ttf": ".ttf",
  "font/otf": ".otf",
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_MAP[ext] || "application/octet-stream";
}

function getFileExtension(mimeType) {
  return EXT_MAP[mimeType] || ".bin";
}

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (match) {
    return { mimeType: match[1], base64: match[2] };
  }
  return null;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function exitWithError(message, code = 1) {
  console.error(`\n\x1b[31m❌ [Erro]: ${message}\x1b[0m\n`);
  process.exit(code);
}

function printSuccess(message) {
  console.log(`\x1b[32m✅ ${message}\x1b[0m`);
}

module.exports = {
  MIME_MAP,
  EXT_MAP,
  getMimeType,
  getFileExtension,
  parseDataUrl,
  formatBytes,
  exitWithError,
  printSuccess,
};
