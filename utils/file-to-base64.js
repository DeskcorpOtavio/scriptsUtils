const fs = require("fs");
const path = require("path");
const { getMimeType, exitWithError, printSuccess } = require("./mime-config");

function convertFileToBase64(filePath, options = {}) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    exitWithError(
      `Arquivo não encontrado: "${filePath}". Verifique o caminho digitado.`,
    );
  }

  try {
    const mimeType = getMimeType(absolutePath);
    const fileBuffer = fs.readFileSync(absolutePath);
    const base64String = fileBuffer.toString("base64");

    if (options.raw) {
      return base64String;
    }

    return `data:${mimeType};base64,${base64String}`;
  } catch (err) {
    exitWithError(`Falha ao ler o arquivo: ${err.message}`);
  }
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
    printSuccess(`Base64 salvo com sucesso em: ${path.resolve(outFile)}`);
  } else {
    console.log(result);
  }
} catch (error) {
  exitWithError(`Erro ao processar o arquivo: ${error.message}`);
}
