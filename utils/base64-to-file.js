const fs = require("fs");
const path = require("path");

const EXT_MAP = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/bmp": ".bmp",
  "image/x-icon": ".ico",
};

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (match) {
    return { mimeType: match[1], base64: match[2] };
  }
  return null;
}

function base64ToFile(input, outputPath) {
  const content = input.trim();

  let base64Data;
  let detectedExt = null;

  const parsed = parseDataUrl(content);
  if (parsed) {
    base64Data = parsed.base64;
    detectedExt = EXT_MAP[parsed.mimeType] || null;
  } else {
    base64Data = content;
  }

  let finalPath;
  if (outputPath) {
    finalPath = path.resolve(outputPath);
  } else {
    const ext = detectedExt || ".png";
    finalPath = path.resolve(`output${ext}`);
  }

  const buffer = Buffer.from(base64Data, "base64");

  if (buffer.length === 0) {
    console.error(
      "Erro: O conteúdo Base64 resultou em um buffer vazio. Verifique a string de entrada.",
    );
    process.exit(1);
  }

  const dir = path.dirname(finalPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(finalPath, buffer);
  console.log(`Arquivo salvo em: ${finalPath} (${formatBytes(buffer.length)})`);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log(`
  Uso: node base64-to-file.js <entrada> [opções]

  A entrada pode ser:
    - Um caminho para um arquivo .txt contendo a string Base64
    - Uma string Base64 diretamente (data URL ou raw)

  Opções:
    --out FILE  Define o caminho e nome do arquivo de saída
                (padrão: output.<ext> baseado no mime type detectado)
    --help      Mostra esta mensagem

  Exemplos:
    node base64-to-file.js resultado.txt --out foto.png
    node base64-to-file.js "data:image/png;base64,iVBOR..." --out foto.png
  `);
  process.exit(0);
}

const input = args[0];
const outIndex = args.indexOf("--out");
const outFile = outIndex !== -1 ? args[outIndex + 1] : null;

try {
  let base64Content;

  const inputPath = path.resolve(input);
  if (fs.existsSync(inputPath) && fs.statSync(inputPath).isFile()) {
    base64Content = fs.readFileSync(inputPath, "utf-8");
  } else {
    base64Content = input;
  }

  base64ToFile(base64Content, outFile);
} catch (error) {
  console.error(`Erro ao processar: ${error.message}`);
  process.exit(1);
}
