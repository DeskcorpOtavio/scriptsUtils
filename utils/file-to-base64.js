const fs = require("fs");
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

function convertFileToBase64(filePath, options = {}) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Erro: Arquivo não encontrado em ${absolutePath}`);
    process.exit(1);
  }

  const ext = path.extname(absolutePath).toLowerCase();
  const mimeType = MIME_MAP[ext] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(absolutePath);
  const base64String = fileBuffer.toString("base64");

  if (options.raw) {
    return base64String;
  }

  return `data:${mimeType};base64,${base64String}`;
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log(`
  Uso: node file-to-base64.js <caminho-do-arquivo> [opções]

  Opções:
    --raw       Retorna apenas o Base64 puro, sem o prefixo data URL
    --out FILE  Salva o resultado em um arquivo ao invés de imprimir no terminal
    --help      Mostra esta mensagem

  Formatos suportados:
    Imagens   : PNG, JPG, GIF, WEBP, SVG, BMP, ICO
    Documentos: PDF, DOC(X), XLS(X), PPT(X), CSV
    Texto     : TXT, HTML, CSS, JS, JSON, XML, MD
    Áudio     : MP3, WAV, OGG
    Vídeo     : MP4, WEBM
    Outros    : ZIP, GZ, TAR, WOFF(2), TTF, OTF
  `);
  process.exit(0);
}

const filePath = args[0];
const raw = args.includes("--raw");
const outIndex = args.indexOf("--out");
const outFile = outIndex !== -1 ? args[outIndex + 1] : null;

try {
  const result = convertFileToBase64(filePath, { raw });

  if (outFile) {
    fs.writeFileSync(path.resolve(outFile), result, "utf-8");
    console.log(`Base64 salvo em: ${path.resolve(outFile)}`);
  } else {
    console.log(result);
  }
} catch (error) {
  console.error(`Erro ao processar arquivo: ${error.message}`);
  process.exit(1);
}
