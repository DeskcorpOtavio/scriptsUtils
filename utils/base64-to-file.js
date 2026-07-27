const fs = require("fs");
const path = require("path");
const {
  getFileExtension,
  parseDataUrl,
  formatBytes,
  exitWithError,
  printSuccess,
} = require("./mime-config");

function base64ToFile(input, outputPath) {
  const content = input.trim();

  if (!content) {
    exitWithError("A string Base64 informada está vazia.");
  }

  let base64Data;
  let detectedExt = null;

  const parsed = parseDataUrl(content);
  if (parsed) {
    base64Data = parsed.base64;
    detectedExt = getFileExtension(parsed.mimeType);
  } else {
    base64Data = content;
  }

  let finalPath;
  if (outputPath) {
    finalPath = path.resolve(outputPath);
  } else {
    const ext = detectedExt || ".bin";
    finalPath = path.resolve(`output${ext}`);
  }

  try {
    const buffer = Buffer.from(base64Data, "base64");

    if (buffer.length === 0) {
      exitWithError(
        "O conteúdo Base64 gerou um arquivo com 0 bytes. Verifique se a string de entrada é um Base64 válido.",
      );
    }

    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(finalPath, buffer);
    printSuccess(
      `Arquivo restaurado com sucesso em: ${finalPath} (${formatBytes(buffer.length)})`,
    );
  } catch (err) {
    exitWithError(`Falha ao converter Base64 para arquivo: ${err.message}`);
  }
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
    node base64-to-file.js resultado.txt --out documento.pdf
    node base64-to-file.js "data:application/pdf;base64,JVBERi0..."
  `);
  process.exit(0);
}

const input = args[0];
const outIndex = args.indexOf("--out");
const outFile = outIndex !== -1 ? args[outIndex + 1] : null;

try {
  let base64Content;

  const inputPath = path.resolve(input);
  if (fs.existsSync(inputPath)) {
    if (!fs.statSync(inputPath).isFile()) {
      exitWithError(`O caminho informado "${input}" não é um arquivo válido.`);
    }
    base64Content = fs.readFileSync(inputPath, "utf-8");
  } else {
    base64Content = input;
  }

  base64ToFile(base64Content, outFile);
} catch (error) {
  exitWithError(`Erro ao processar a entrada: ${error.message}`);
}
