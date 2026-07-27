const fs = require("fs");
const path = require("path");

function convertImageToBase64(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`Error: File not found at ${absolutePath}`);
      process.exit(1);
    }

    const ext = path.extname(absolutePath).toLowerCase();
    let mimeType = "image/jpeg";

    if (ext === ".png") mimeType = "image/png";
    else if (ext === ".gif") mimeType = "image/gif";
    else if (ext === ".webp") mimeType = "image/webp";
    else if (ext === ".svg") mimeType = "image/svg+xml";

    const fileBuffer = fs.readFileSync(absolutePath);
    const base64String = fileBuffer.toString("base64");

    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node image-to-base64.js <path-to-image>");
  process.exit(1);
}

const imagePath = args[0];
const base64Result = convertImageToBase64(imagePath);
console.log(base64Result);
