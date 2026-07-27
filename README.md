# 🛠️ Scripts Utils

Coleção de utilitários para o dia a dia de desenvolvimento. Inclui um **script Node.js** para conversão de imagens em Base64 via terminal e uma **interface web** moderna para fazer o mesmo pelo navegador.

---

## 📁 Estrutura do Projeto

```
scripts-utils/
├── utils/
│   └── image-to-base64.js      # Script Node.js (CLI)
├── frontend/                    # Interface web (React)
│   └── src/
│       ├── App.tsx              # Componente raiz
│       ├── types.ts             # Interfaces TypeScript
│       ├── constants.ts         # Constantes da aplicação
│       ├── hooks/
│       │   ├── useToast.ts      # Hook de notificações
│       │   └── useImageConverter.ts  # Lógica de conversão
│       ├── components/
│       │   ├── UploadArea.tsx    # Área de upload (drag & drop)
│       │   ├── ImagePreview.tsx  # Preview da imagem
│       │   ├── Base64Result.tsx  # Resultado + copiar/baixar
│       │   ├── FileInfoBar.tsx   # Barra de info do arquivo
│       │   ├── DetailsPanel.tsx  # Painel de detalhes (tipo, dimensões)
│       │   ├── HistoryPanel.tsx  # Histórico de conversões
│       │   ├── StatCard.tsx      # Card de estatística
│       │   └── ToastStack.tsx    # Notificações toast
│       └── utils/
│           └── format.ts        # Funções auxiliares (formatBytes, timeAgo)
├── public/                      # Arquivos públicos
└── package.json
```

---

## 🚀 Como Usar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+

### Script CLI

Converta uma imagem para Base64 diretamente pelo terminal:

```bash
node utils/image-to-base64.js <caminho-da-imagem>
```

**Exemplo:**

```bash
node utils/image-to-base64.js public/selfie.png
```

A saída será a string `data:<mime>;base64,...` impressa no terminal.

### Interface Web

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

---

## ✨ Funcionalidades

| Funcionalidade | CLI | Web |
|---|:---:|:---:|
| Conversão de imagem para Base64 | ✅ | ✅ |
| Suporte a PNG, JPG, GIF, WEBP, SVG | ✅ | ✅ |
| Preview da imagem | — | ✅ |
| Copiar para a área de transferência | — | ✅ |
| Baixar resultado como `.txt` | — | ✅ |
| Drag & Drop | — | ✅ |
| Detalhes (tipo, dimensões, tamanho) | — | ✅ |
| Histórico de conversões | — | ✅ |
| Validação de tipo e tamanho (máx 10 MB) | — | ✅ |
| Notificações de erro/sucesso | — | ✅ |

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
