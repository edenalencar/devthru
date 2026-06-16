import { BlogPost } from '../index'

export const postConstruindoServidorMcpDadosBr: BlogPost = {
    slug: 'construindo-servidor-mcp-dados-teste-brasileiros',
    title: 'Construindo um Servidor MCP de Dados de Teste Brasileiros',
    description: 'Aprenda a criar um servidor MCP (Model Context Protocol) em TypeScript para fornecer geradores de CPF, CNPJ e endereços para agentes de IA de forma nativa.',
    date: '2026-06-11',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 8,
    tags: ['MCP', 'Model Context Protocol', 'servidor MCP', 'dados de teste', 'TypeScript', 'Node.js'],
    relatedTools: ['/tools/development/mock-data', '/tools/documents/cpf', '/tools/documents/cnpj'],
    content: `
<p>O <strong>Model Context Protocol (MCP)</strong> é uma especificação aberta criada pela Anthropic que padroniza a forma como modelos de Inteligência Artificial interagem com fontes de dados e ferramentas locais ou em nuvem. Em vez de escrever integrações proprietárias para cada IDE ou cliente de chat, você constrói um <strong>servidor MCP</strong> que expõe capacidades que qualquer LLM compatível pode consumir nativamente.</p>

<p>Para desenvolvedores brasileiros que utilizam assistentes de IA (como Claude Desktop, Cursor ou windsurf) no dia a dia, ter um servidor MCP que gera dados de teste locais e válidos (como CPF, CNPJ e CEP) é um enorme ganho de produtividade.</p>

<p>Neste tutorial passo a passo, vamos construir um servidor MCP em TypeScript/Node.js para gerar massas de dados de teste brasileiras.</p>

<h2>Arquitetura do Model Context Protocol</h2>

<p>A arquitetura do MCP é baseada em uma relação cliente-servidor muito simples:</p>
<ul>
  <li><strong>MCP Client</strong>: O aplicativo que hospeda a IA (ex: Claude Desktop, sua IDE ou seu agente customizado). Ele controla o ciclo de vida do servidor.</li>
  <li><strong>MCP Server</strong>: Um processo leve executado localmente ou exposto via rede que responde a requisições de descoberta e execução de ferramentas através de canais como Entrada/Saída Padrão (<code>stdio</code>) ou Server-Sent Events (<code>SSE</code>).</li>
</ul>

<p>No nosso tutorial, usaremos a comunicação via <code>stdio</code>, que é a mais simples e recomendada para ferramentas locais.</p>

<h2>Passo 1: Setup do Projeto TypeScript</h2>

<p>Primeiro, vamos inicializar um novo projeto Node.js e instalar as dependências necessárias, incluindo a SDK oficial do MCP:</p>

<pre><code class="language-bash"># Cria a pasta do projeto
mkdir mcp-brasil-generator
cd mcp-brasil-generator

# Inicializa o npm e instala as dependências
npm init -y
npm install @modelcontextprotocol/sdk
npm install -D typescript @types/node tsx
npx tsc --init
</code></pre>

<h2>Passo 2: Criando os Geradores de Dados</h2>

<p>Crie um arquivo chamado <code>generators.ts</code> para conter as funções puras de geração de documentos e dados válidos para testes:</p>

<pre><code class="language-javascript">// generators.ts
export function gerarCPF() {
  const numAleatorio = () => Math.floor(Math.random() * 9);
  const d = Array.from({ length: 9 }, numAleatorio);
  
  let d1 = d.reduce((s, v, i) => s + v * (10 - i), 0);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  
  d.push(d1);
  let d2 = d.reduce((s, v, i) => s + v * (11 - i), 0);
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  
  d.push(d2);
  return d.join('').replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, "$1.$2.$3-$4");
}
</code></pre>

<h2>Passo 3: Construindo o Servidor MCP</h2>

<p>Agora, vamos estruturar o servidor MCP no arquivo <code>index.ts</code>. Usaremos o <code>Server</code> da SDK oficial e declararemos nossa ferramenta de geração para a IA:</p>

<pre><code class="language-javascript">// index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { gerarCPF } from "./generators.js";

// Instancia o servidor MCP
const server = new Server(
  {
    name: "mcp-brasil-generator",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 1. Declara as ferramentas disponíveis para o cliente
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "gerar_cpf",
        description: "Gera um número de CPF brasileiro fictício matematicamente válido para uso em testes.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// 2. Trata a execução das ferramentas chamadas pela IA
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  if (name === "gerar_cpf") {
    const cpf = gerarCPF();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ cpf }),
        },
      ],
    };
  }

  throw new Error(\`Ferramenta não encontrada: \${name}\`);
});

// Inicializa o servidor usando comunicação via stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor MCP Brasil rodando em stdio!");
}

main().catch((error) => {
  console.error("Erro ao rodar servidor MCP:", error);
  process.exit(1);
});
</code></pre>

<div class="info-box">
  <strong>💡 Importante:</strong> Qualquer saída no console do servidor MCP via <code>console.log</code> será interpretada pelo cliente como dados do protocolo e causará erros de comunicação. Use sempre <code>console.error</code> para fazer logs de depuração.
</div>

<h2>Passo 4: Configurando no Claude Desktop</h2>

<p>Para expor essa ferramenta localmente para o app oficial do Claude Desktop, você precisa adicionar a configuração do servidor ao seu arquivo <code>claude_desktop_config.json</code>:</p>

<p>No Windows, esse arquivo fica em: <code>%APPDATA%/Claude/claude_desktop_config.json</code><br>
No macOS, em: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code></p>

<pre><code class="language-json">{
  "mcpServers": {
    "mcp-brasil-generator": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "C:/caminho/para/seu/projeto/index.ts"
      ]
    }
  }
}
</code></pre>

<p>Ao reiniciar o Claude Desktop, você verá o ícone de tomada indicando que o servidor foi conectado. A partir desse momento, a IA poderá criar e preencher dados brasileiros de teste sob demanda em seus prompts de codificação.</p>

<p>Com essa mesma estrutura de código, você pode expandir o servidor MCP para gerar CNPJ, gerar endereços simulados ou até consultar chaves da Tabela FIPE.</p>

<p>Se você precisa de uma interface visual amigável ou de geradores prontos na web para criar amostras estruturadas rapidamente, acesse as nossas ferramentas:</p>
<ul>
  <li>Gere CPFs válidos sob demanda no <a href="/tools/documents/cpf">Gerador de CPF</a>.</li>
  <li>Gere dados de empresas no <a href="/tools/documents/cnpj">Gerador de CNPJ</a>.</li>
  <li>Configure massas robustas e estruturadas no nosso <a href="/tools/development/mock-data">Mock Data Generator</a>.</li>
</ul>
`
}
