const fs = require("fs");
const path = require("path");
const { getMimeType, exitWithError } = require("./mime-config");

function convertImageToBase64(filePath) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    exitWithError(`Imagem não encontrada: "${filePath}". Verifique o caminho digitado.`);
  }

  try {
    const mimeType = getMimeType(absolutePath);

    if (!mimeType.startsWith("image/")) {
      exitWithError(`O arquivo "${filePath}" não possui um formato de imagem válido.`);
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const base64String = fileBuffer.toString("base64");

    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    exitWithError(`Erro ao ler imagem: ${error.message}`);
  }
}

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help")) {
  console.log("Uso: node image-to-base64.js <caminho-para-imagem>");
  process.exit(0);
}

const imagePath = args[0];
const base64Result = convertImageToBase64(imagePath);
console.log(base64Result);
