import { BlogPost } from '../index'

export const postWebMcpModelContextProtocolViaSse: BlogPost = {
    slug: 'o-que-e-webmcp-model-context-protocol-via-sse',
    title: 'O que é WebMCP? Model Context Protocol via SSE',
    description: 'Entenda o que é o WebMCP, como funciona o transporte SSE (Server-Sent Events) no Model Context Protocol e como criar um servidor WebMCP com Node.js.',
    date: '2026-06-05',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 7,
    tags: ['WebMCP', 'MCP', 'Model Context Protocol', 'SSE', 'Next.js', 'Node.js', 'IA'],
    relatedTools: ['/tools/utilities/json', '/tools/development/jwt-debugger'],
    content: `
<p>Se você leu o nosso <a href="/blog/o-que-e-mcp-model-context-protocol">Guia sobre Model Context Protocol (MCP)</a> e o nosso <a href="/blog/tutorial-como-criar-mcp-server-typescript">Tutorial de MCP Server com TypeScript</a>, você já sabe como esse protocolo está revolucionando a integração de Inteligência Artificial localmente nas nossas IDEs favoritas, como o Cursor e o Claude Desktop.</p>

<p>Mas e se você quisesse conectar o seu agente de IA a um servidor remoto na nuvem? E se você quisesse criar uma aplicação baseada em navegador (Web App) que interage com agentes inteligentes usando o MCP, sem depender do sistema de arquivos local do usuário ou do terminal dele? É aqui que o <strong>WebMCP</strong> brilha.</p>

<p>Neste artigo, vamos explorar o conceito de <strong>WebMCP</strong>, compreender como funciona o transporte baseado em <strong>SSE (Server-Sent Events)</strong> e implementar passo a passo um servidor WebMCP remoto utilizando Node.js e TypeScript.</p>



<h2>A Limitação do Standard I/O (stdio)</h2>

<p>Por padrão, a maioria dos servidores MCP que configuramos localmente se comunica através do fluxo padrão de entrada e saída do sistema operacional (<strong>stdio</strong>). A IDE inicia o processo do servidor em background e se comunica com ele por meio de streams de texto.</p>

<p>Embora essa abordagem seja extremamente rápida, performática e segura para execuções locais, ela impõe barreiras físicas:</p>

<ul>
  <li><strong>Isolamento de Máquina:</strong> A IA e o servidor MCP precisam estar no mesmo computador.</li>
  <li><strong>Incompatibilidade Web:</strong> Navegadores não possuem acesso direto para spawnar processos de sistema ou ler/escrever fluxos de <code>stdio</code> arbitrários por razões óbvias de sandbox e segurança.</li>
  <li><strong>Dificuldade de Compartilhamento:</strong> Se uma equipe deseja usar uma ferramenta customizada e centralizada (como um catálogo corporativo de microsserviços), cada desenvolvedor precisaria instalar e configurar o servidor MCP localmente em sua própria máquina.</li>
</ul>

<div class="info-box">
  <strong>💡 O WebMCP resolve isso:</strong> Em vez de se comunicar via terminal local, o cliente e o servidor MCP conversam através da rede de forma padronizada usando o protocolo HTTP e tecnologias web modernas.
</div>



<h2>A Magia do Server-Sent Events (SSE)</h2>

<p>Para o transporte na Web, a especificação oficial do MCP adota a arquitetura de <strong>SSE (Server-Sent Events)</strong> associada a requisições HTTP POST tradicionais. Mas por que o SSE foi escolhido em vez de WebSockets ou polling simples?</p>

<p>O <strong>SSE</strong> é uma tecnologia nativa que permite ao servidor enviar notificações de mão única em tempo real para o cliente sobre uma conexão HTTP de longa duração. No fluxo de mensagens do WebMCP, o tráfego JSON-RPC 2.0 funciona da seguinte forma:</p>

<ol>
  <li><strong>Conexão Inicial:</strong> O cliente web (MCP Client) inicia uma conexão HTTP GET em um endpoint específico do servidor (por exemplo, <code>/sse</code>). O servidor responde mantendo a conexão aberta com o header <code>Content-Type: text/event-stream</code>.</li>
  <li><strong>Event Stream (Servidor ➔ Cliente):</strong> Através dessa conexão aberta, o servidor pode enviar mensagens e respostas assíncronas para o cliente de forma contínua e em tempo real.</li>
  <li><strong>Requisições HTTP POST (Cliente ➔ Servidor):</strong> Quando o cliente precisa enviar uma requisição ou comando para o servidor (como chamar uma ferramenta), ele faz uma requisição HTTP POST comum para um endpoint separado (geralmente chamado de <code>/messages</code>), passando a payload no corpo.</li>
</ol>

<p>Essa arquitetura assíncrona desacoplada simplifica drasticamente o roteamento em firewalls e proxies reversos corporativos se comparado ao protocolo WebSockets, operando totalmente sob HTTPS padrão.</p>



<h2>Tutorial Prático: Construindo um Servidor WebMCP com SSE</h2>

<p>Vamos colocar a mão na massa e criar um servidor WebMCP funcional utilizando o SDK oficial da Anthropic (<code>@modelcontextprotocol/sdk</code>) e o Express no Node.js.</p>

<h3>1. Inicialização do Projeto</h3>
<p>Crie um diretório para o projeto e instale as dependências necessárias. Utilizaremos o SDK oficial e o Express, juntamente com o Zod para validação e suporte a TypeScript:</p>

<pre><code class="language-bash">npm init -y
npm install @modelcontextprotocol/sdk express cors zod
npm install --save-dev typescript @types/express @types/node @types/cors ts-node</code></pre>

<h3>2. Escrevendo o Servidor Express com SSE</h3>
<p>Crie um arquivo chamado <code>server.ts</code>. Neste arquivo, configuramos a instância clássica de <code>Server</code> do MCP e mapeamos os endpoints HTTP necessários para configurar o <code>SSEServerTransport</code>:</p>

<pre><code class="language-typescript">import express from "express";
import cors from "cors";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

// 1. Instanciando o Servidor MCP
const mcpServer = new Server(
  {
    name: "webmcp-demo-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // Habilitando suporte a ferramentas dinâmicas
    },
  }
);

// 2. Definindo uma ferramenta para consultar informações
const CONSULTAR_DOC_TOOL = {
  name: "consultar_documentacao",
  description: "Busca informações técnicas na base interna corporativa.",
  inputSchema: {
    type: "object",
    properties: {
      termo: {
        type: "string",
        description: "Termo de busca (ex: 'deploy', 'auth', 'database')",
      },
    },
    required: ["termo"],
  },
};

// 3. Registrando handlers do MCP
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [CONSULTAR_DOC_TOOL],
  };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "consultar_documentacao") {
    const termo = z.string().parse(args?.termo);
    let resposta = \`Nenhuma documentação encontrada para: \${termo}\`;

    if (termo.toLowerCase().includes("deploy")) {
      resposta = "Procedimento de Deploy: Execute 'npm run build' e depois faça o push na branch developer.";
    } else if (termo.toLowerCase().includes("auth")) {
      resposta = "Autenticação: Utilize os tokens JWT gerados via cabeçalho Authorization: Bearer.";
    }

    return {
      content: [{ type: "text", text: resposta }],
    };
  }

  throw new Error("Ferramenta não encontrada");
});

// 4. Mapeando sessões ativas do SSE
const activeTransports = new Map&lt;string, SSEServerTransport&gt;();

app.get("/sse", async (req, res) => {
  console.log("🔌 Novo cliente iniciando conexão SSE");
  
  // Criamos o transporte SSE apontando para a rota de mensagens HTTP POST
  const transport = new SSEServerTransport("/messages", res);
  
  // Salvamos o transporte associado ao ID da conexão
  const sessionId = transport.sessionId;
  activeTransports.set(sessionId, transport);
  
  // Conectamos o transporte ao nosso servidor MCP
  await mcpServer.connect(transport);
  
  // Removemos o transporte do cache quando a conexão é encerrada
  req.on("close", () => {
    console.log(\`❌ Conexão SSE encerrada para a sessão \${sessionId}\`);
    activeTransports.delete(sessionId);
  });
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = activeTransports.get(sessionId);

  if (!transport) {
    res.status(404).send("Sessão ativa não encontrada.");
    return;
  }

  // Delega a leitura e parse do payload JSON-RPC para o SDK do MCP resolver
  await transport.handleMessage(req, res);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(\`🚀 Servidor WebMCP rodando em http://localhost:\${PORT}\`);
  console.log(\`  -> Conexão SSE: http://localhost:\${PORT}/sse\`);
});
</code></pre>

<div class="info-box">
  <strong>⚠️ Atenção ao SessionId:</strong> Note que o <code>SSEServerTransport</code> gera dinamicamente um identificador único de sessão (<code>sessionId</code>). O cliente web precisará passar este ID como query string ao fazer requisições POST para a rota de mensagens (ex: <code>/messages?sessionId=xpto</code>), permitindo que o servidor direcione a resposta para o túnel SSE correto.
</div>



<h2>Consumindo o Servidor WebMCP</h2>

<p>Agora que você tem um servidor WebMCP expondo endpoints HTTP, você pode conectá-lo a clientes. No ecossistema moderno, existem duas formas principais:</p>

<h3>1. Configurando em Ferramentas Locais</h3>
<p>O próprio Claude Desktop e IDEs como o Cursor aceitam conexões SSE nativamente em seus arquivos de configuração. Veja um exemplo de configuração no <code>claude_desktop_config.json</code>:</p>

<pre><code class="language-json">
{
  "mcpServers": {
    "meu-servidor-web-mcp": {
      "url": "http://localhost:3002/sse"
    }
  }
}
</code></pre>

<h3>2. Integrando diretamente em Web Apps</h3>
<p>Se você estiver desenvolvendo o seu próprio chatbot ou painel web, você pode utilizar o SDK de cliente no navegador. Veja como se conectar usando Vanilla JavaScript/TypeScript no client-side:</p>

<pre><code class="language-typescript">import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const client = new Client({
  name: "meu-web-app-client",
  version: "1.0.0"
}, {
  capabilities: {}
});

const transport = new SSEClientTransport(new URL("http://localhost:3002/sse"));
await client.connect(transport);

// A partir daqui, o cliente web está conectado de forma bidirecional!
const tools = await client.listTools();
console.log("Ferramentas disponíveis remotamente:", tools);
</code></pre>



<h2>Conclusão</h2>

<p>O <strong>WebMCP</strong> desamarra o Model Context Protocol do ambiente do computador local e o escala para toda a Web. Seja centralizando ferramentas e utilitários da sua equipe de engenharia em um único servidor remoto ou criando aplicações e assistentes de IA interativos que rodam inteiramente no navegador, o uso de <strong>SSE</strong> no MCP abre portas gigantescas para a computação e automação por agentes em 2026.</p>

<p>Que tal testar a criação de ferramentas no seu próprio servidor WebMCP para formatar dados em tempo real ou analisar payloads corporativos?</p>
`
}
