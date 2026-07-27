# 🛠️ Scripts Utils

Coleção de utilitários para o dia a dia de desenvolvimento. Inclui **scripts Node.js** para conversão de arquivos em Base64 (e vice-versa) via terminal e uma **interface web** moderna para converter imagens pelo navegador.

---

## 📁 Estrutura do Projeto

```
scripts-utils/
├── utils/
│   ├── image-to-base64.js   # Imagem → Base64 (CLI simples)
│   ├── file-to-base64.js    # Qualquer arquivo → Base64 (CLI avançado)
│   └── base64-to-file.js    # Base64 → Arquivo (CLI)
├── frontend/                 # Interface web (React)
│   └── src/
│       ├── App.tsx
│       ├── types.ts
│       ├── constants.ts
│       ├── hooks/
│       │   ├── useToast.ts
│       │   └── useImageConverter.ts
│       ├── components/
│       │   ├── UploadArea.tsx
│       │   ├── ImagePreview.tsx
│       │   ├── Base64Result.tsx
│       │   ├── FileInfoBar.tsx
│       │   ├── DetailsPanel.tsx
│       │   ├── HistoryPanel.tsx
│       │   ├── StatCard.tsx
│       │   └── ToastStack.tsx
│       └── utils/
│           └── format.ts
├── public/
└── package.json
```

---

## 🚀 Como Usar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+

---

### 🖼️ Imagem → Base64 (simples)

```bash
node utils/image-to-base64.js <caminho-da-imagem>
```

Suporta PNG, JPG, GIF, WEBP e SVG. Retorna a Data URL no terminal.

---

### 📄 Qualquer Arquivo → Base64 (avançado)

```bash
node utils/file-to-base64.js <caminho-do-arquivo> [opções]
```

**Opções:**

| Flag | Descrição |
|---|---|
| `--raw` | Retorna apenas o Base64 puro, sem o prefixo `data:` |
| `--out <arquivo>` | Salva o resultado em um arquivo `.txt` |
| `--help` | Exibe a ajuda |

**Formatos suportados:**

| Categoria | Extensões |
|---|---|
| Imagens | PNG, JPG, GIF, WEBP, SVG, BMP, ICO |
| Documentos | PDF, DOC(X), XLS(X), PPT(X), CSV |
| Texto | TXT, HTML, CSS, JS, JSON, XML, MD |
| Áudio | MP3, WAV, OGG |
| Vídeo | MP4, WEBM |
| Outros | ZIP, GZ, TAR, WOFF(2), TTF, OTF |

**Exemplos:**

```bash
# Converter um PDF para Base64 e imprimir no terminal
node utils/file-to-base64.js documento.pdf

# Converter e salvar em arquivo
node utils/file-to-base64.js foto.png --out resultado.txt

# Base64 puro (sem data URL)
node utils/file-to-base64.js audio.mp3 --raw
```

---

### 🔄 Base64 → Arquivo

```bash
node utils/base64-to-file.js <entrada> [opções]
```

A entrada pode ser:
- Um **caminho** para um arquivo `.txt` contendo a string Base64
- Uma **string Base64** diretamente (Data URL ou raw)

**Opções:**

| Flag | Descrição |
|---|---|
| `--out <arquivo>` | Define o caminho e nome do arquivo de saída |
| `--help` | Exibe a ajuda |

**Exemplos:**

```bash
# A partir de um arquivo .txt contendo o Base64
node utils/base64-to-file.js resultado.txt --out foto.png

# A partir de uma string Data URL diretamente
node utils/base64-to-file.js "data:image/png;base64,iVBOR..." --out foto.png
```

---

### 🌐 Interface Web

1. Instale as dependências:

```bash
cd frontend
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador: **http://localhost:5173**

**Funcionalidades da interface:**

- Upload de imagens por clique ou drag & drop
- Preview em tempo real
- Conversão instantânea para Base64
- Copiar para a área de transferência
- Baixar resultado como `.txt`
- Painel de detalhes (tipo, dimensões, tamanho)
- Histórico das últimas 20 conversões
- Validação de tipo e tamanho (máx 10 MB)
- Notificações de erro e sucesso

---

## 🧰 Tech Stack

### CLI
- **Node.js** — `fs` e `path` (sem dependências externas)

### Frontend
- **Vite** — Bundler
- **React 19** — UI
- **TypeScript** — Tipagem
- **Tailwind CSS 3** — Estilização
- **Lucide React** — Ícones

---

## 📝 Licença

ISC
