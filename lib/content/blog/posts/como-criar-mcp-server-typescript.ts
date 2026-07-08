import { BlogPost } from '../index'

export const postMcpServerTypescript: BlogPost = {
    slug: 'tutorial-como-criar-mcp-server-typescript',
    title: 'Como Criar MCP Server em TypeScript',
    description: 'Aprenda a construir do zero o seu próprio servidor Model Context Protocol (MCP) utilizando TypeScript e o SDK oficial da Anthropic.',
    date: '2026-03-08',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 8,
    tags: ['MCP', 'TypeScript', 'Tutorial', 'SDK', 'Anthropic', 'Claude Desktop', 'Servidor de IA'],
    relatedTools: [],
    content: `
<p>Após compreendermos o conceito no <a href="/blog/o-que-e-mcp-model-context-protocol">Guia sobre Model Context Protocol</a>, é chegada a hora de colocarmos a mão na massa.</p>

<p>Seja provendo acesso ao seu banco de dados interno ou manipulando arquivos, a criação de um Servidor MCP personalizado confere "superpoderes" à sua IDE e aos seus LLMs favoritos. E a melhor maneira de iniciar hoje é por meio do <strong>Node.js com TypeScript</strong>.</p>



<h2>Pré-requisitos e Instalação</h2>
<p>Para construir a fundação, utilizaremos o <strong>SDK TypeScript Oficial do MCP</strong>.</p>

<p>Inicialize o seu projeto e instale o pacote principal:</p>
<pre><code class="language-bash">npm init -y
npm install @modelcontextprotocol/sdk</code></pre>

<p>Para um projeto moderno e escalável, recomendamos o formato ECMAScript Modules (ESM) no <code>package.json</code> e o TypeScript devidamente configurado (com tipos para NodeJS e <code>ts-node</code> ou build rápido via <code>tsup/esbuild</code>).</p>

<h2>Estrutura Base de um Servidor MCP</h2>

<p>A configuração inicial do seu arquivo <code>server.ts</code> envolverá injetar dados do seu projeto e lidar com os ciclos vitais (Transport). Pela nossa abordagem usaremos a conexão padrão recomendada para IDEs: o <strong>StdioServerTransport</strong> (transporte focado em terminal standard I/O).</p>

<pre><code class="language-typescript">import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "meu-primeiro-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},    // Habilitando Ferramentas Interativas Actions
      prompts: {},  // (Opção) Habilitando Prompts e templates
      resources: {} // (Opção) Habilitando extração de resources URIs
    },
  }
);
</code></pre>

<div class="info-box">
<strong>⚠️ Dica TypeScript:</strong> No TypeScript precisamos explicitamente declarar <code>tools: {}</code> na propriedade <em>capabilities</em>, caso contrário o SDK deduzirá que o seu servidor destina-se puramente a Prompts ou Resources, ignorando os callbacks de Tools.
</div>

<h2>Definindo sua Tool (Ferramenta IA)</h2>

<p>Digamos que você quer permitir ao modelo de Inteligência Artificial consultar o clima em real-time a partir da sua infraestrutura. Para o LLM entender, você precisa usar a estrutura rígida de <em>JSON Schema</em> para declarar o formato (Tool Definition):</p>

<pre><code class="language-typescript">const WEATHER_TOOL: Tool = {
  name: "get_internal_weather",
  description: "Busca o alerta de tempestades atual do sensor privado do escritório.",
  inputSchema: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "Local que a IA quer saber o clima ex: 'São Paulo', 'Data Center'",
      },
    },
    required: ["location"],
  },
};
</code></pre>

<h2>Registrando os Handlers</h2>

<p>O servidor não fará nada até você amarrar as "pontas": criar o handler dizendo pro SDK retornar a lista de ferramentas declaradas (List) e criar o executor lógico delas (Call). O uso da biblioteca <code>zod</code> é extremamente benéfico para injetar Typesafety durante o executor, embora não seja obrigatório.</p>

<pre><code class="language-typescript">
// 1. O LLM descobrirá da sua existência pedindo a lista.
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: [WEATHER_TOOL] };
});

// 2. Quando o LLM decidir 'tocar' no método get_internal_weather
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_internal_weather") {
    // Garantimos e destruturamos o location do JSON injetado pela IA
    const location = String(args?.location);

    // Faça seu processamento de Backend Real, fetch na DB, etc.
    const resultado = location === 'Data Center' 
        ? "Tempestade na sala do Servidor: ALERTA CRÍTICO." 
        : \`Previsão para \${location} é limpo.\`

    // Devolvemos o log para o modelo na estrutura nativa obrigatória
    return {
      content: [{ type: "text", text: resultado }],
    };
  }

  throw new Error("Tool desconhecida pelo Servidor");
});
</code></pre>


<h2>Iniciando o Transporte</h3>

<p>A fase final consiste em atar o Stdio transport em uma coroutine (<code>main</code>), garantindo os logs via Error Output para você conseguir debugar o fluxo (já que a saída padrão <code>console.log()</code> do Stdio é sequestrada inteiramente para o tráfego JSON do MCP).</p>

<pre><code class="language-typescript">async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Imprimiremos em sys.stderr pra IDE não quebrar
  console.error("🚀 MCP Server TypeScript inciado perfeitamente no Studio");
}

runServer().catch(console.error);
</code></pre>

<h2>Adicionando na sua IDE (Cursor / Claude Desktop)</h2>
<p>Faça o build ou instanciamento nativo usando TS-Node para gerar o executável final em seu ambiente local. Em seguida:</p>

1. Para o Claude Desktop, edite o arquivo primário config: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (Mac) ou <code>%APPDATA%/Claude/claude_desktop_config.json</code> (Windows).
2. Adicione os comandos para a inicialização no dict <code>mcpServers</code>:</p>

<pre><code class="language-json">
{
  "mcpServers": {
    "weather_office": {
      "command": "node",
      "args": [
        "C:/Seu/Projeto/build/server.js"
      ]
    }
  }
}
</code></pre>

<p>Reinicie o Desktop Client (ou o reload no Cursor) e você notará a <code>get_internal_weather</code> devidamente autorizada no chat.</p>

<p>A partir daqui, os seus agentes são irrestritos, possuindo total autonomia e visão analítica sobre tabelas no PostgreSQL da empresa e execuções profundas pelo File System, sob os limites da sua arquitetura Typescript.</p>
`
}
