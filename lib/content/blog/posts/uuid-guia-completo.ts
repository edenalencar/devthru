import { BlogPost } from '../index'

export const postUuidGuiaCompleto: BlogPost = {
    slug: 'uuid-o-que-e-como-gerar',
    title: 'UUID: O Que É, Para Que Serve e Como Gerar em Qualquer Linguagem',
    description: 'Entenda o que são UUIDs, as diferenças entre v1, v4 e v7, quando usá-los como chave primária e como gerar em JavaScript, Python, Java e no terminal.',
    date: '2026-02-28',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 7,
    tags: ['UUID', 'GUID', 'identificador único', 'banco de dados', 'chave primária', 'API'],
    relatedTools: ['/tools/utilities/uuid', '/tools/development/timestamp'],
    content: `
<p>Se você já trabalhou com bancos de dados, APIs ou microsserviços, provavelmente esbarrou em <strong>UUIDs</strong>. Esses identificadores universais aparecem em toda parte: IDs de usuários, tokens de sessão, nomes de arquivos, rastreamento de eventos e muito mais.</p>

<p>Neste guia, vamos explicar o que são, quando usá-los, as diferenças entre as versões e como gerar em diversas linguagens.</p>

<h2>O Que É UUID?</h2>

<p><strong>UUID (Universally Unique Identifier)</strong>, também chamado de <strong>GUID</strong> (no ecossistema Microsoft), é um identificador de 128 bits representado como uma string de 36 caracteres no formato:</p>

<pre><code>550e8400-e29b-41d4-a716-446655440000</code></pre>

<p>A especificação é definida pela <strong>RFC 4122</strong> e garante que cada UUID gerado seja — na prática — único no universo, sem necessidade de coordenação centralizada.</p>

<div class="info-box">
<strong>💡 Na prática:</strong> A chance de colisão entre dois UUID v4 é tão pequena que você precisaria gerar 1 bilhão por segundo, durante 85 anos, para ter 50% de chance de uma duplicata.
</div>

<h2>UUID vs. Auto Increment: Quando Usar Cada Um?</h2>

<table>
<thead>
<tr><th>Critério</th><th>Auto Increment (INT)</th><th>UUID</th></tr>
</thead>
<tbody>
<tr><td>Tamanho</td><td>4–8 bytes</td><td>16 bytes</td></tr>
<tr><td>Previsibilidade</td><td>Sequencial (1, 2, 3...)</td><td>Aleatório</td></tr>
<tr><td>Segurança</td><td>Enumerável (IDOR)</td><td>Não enumerável</td></tr>
<tr><td>Sistemas distribuídos</td><td>Requer coordenação</td><td>Sem coordenação</td></tr>
<tr><td>Performance de índice</td><td>Excelente</td><td>Boa (v7 melhora isso)</td></tr>
<tr><td>Legibilidade</td><td>Fácil (ID 42)</td><td>Difícil (UUID longo)</td></tr>
</tbody>
</table>

<p><strong>Use UUID quando:</strong></p>
<ul>
<li>Seu sistema é distribuído (microsserviços, multi-tenancy)</li>
<li>Precisa gerar IDs no client-side antes de enviar ao servidor</li>
<li>Segurança é importante (evitar enumeração de recursos)</li>
<li>Faz merge de bancos de dados de diferentes fontes</li>
</ul>

<p><strong>Use auto-increment quando:</strong></p>
<ul>
<li>Performance de leitura é crítica</li>
<li>Sistema é centralizado (um único banco)</li>
<li>Precisa de IDs legíveis por humanos</li>
</ul>

<h2>Versões de UUID: Qual Escolher?</h2>

<h3>UUID v1 — Baseado em Timestamp + MAC Address</h3>

<p>Usa o horário atual e o endereço MAC da máquina. É <strong>sequencial no tempo</strong>, mas expõe informações de hardware. <strong>Raramente recomendado</strong> hoje em dia por questões de privacidade.</p>

<h3>UUID v4 — Totalmente Aleatório</h3>

<p>A versão mais popular. Usa 122 bits de dados aleatórios. <strong>Segura, simples e sem dependência de hardware.</strong> É a escolha padrão na maioria das aplicações.</p>

<pre><code>// Exemplo de UUID v4
f47ac10b-58cc-4372-a567-0e02b2c3d479</code></pre>

<h3>UUID v7 — Timestamp + Aleatório (a melhor dos dois mundos)</h3>

<p>Introduzida mais recentemente, a v7 combina um <strong>timestamp Unix em milissegundos</strong> com bits aleatórios. Resultado: UUIDs que são <strong>ordenáveis cronologicamente</strong> e ao mesmo tempo únicos — ideal para bancos de dados.</p>

<pre><code>// UUID v7 mantém ordem cronológica
0190a6e2-7b3a-7f1c-8b5d-1c2d3e4f5a6b  (gerado primeiro)
0190a6e2-7b4f-7a2d-9c6e-2d3e4f5a6b7c  (gerado depois → maior)</code></pre>

<div class="info-box">
<strong>🚀 Recomendação:</strong> Para novos projetos, prefira <strong>UUID v7</strong> como chave primária. Ele resolve o problema de fragmentação de índice B-Tree que UUID v4 causa em bancos relacionais.
</div>

<h2>Como Gerar UUID em Diferentes Linguagens</h2>

<h3>JavaScript / Node.js</h3>

<pre><code class="language-javascript">// Nativo (Node.js 14.17+ e browsers modernos)
const uuid = crypto.randomUUID();
console.log(uuid);
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"

// Com a biblioteca 'uuid'
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';

console.log(uuidv4()); // UUID v4
console.log(uuidv7()); // UUID v7 (ordenável)</code></pre>

<h3>Python</h3>

<pre><code class="language-python">import uuid

# UUID v4 (aleatório)
print(uuid.uuid4())
# 550e8400-e29b-41d4-a716-446655440000

# UUID v1 (baseado em timestamp)
print(uuid.uuid1())

# Para UUID v7, use a lib 'uuid6'
# pip install uuid6
import uuid6
print(uuid6.uuid7())</code></pre>

<h3>Java</h3>

<pre><code class="language-java">import java.util.UUID;

public class Main {
    public static void main(String[] args) {
        // UUID v4
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid);
        // 550e8400-e29b-41d4-a716-446655440000
    }
}</code></pre>

<h3>Terminal (Linux/macOS)</h3>

<pre><code class="language-bash"># Gerar UUID v4
uuidgen

# Gerar vários de uma vez
for i in {1..5}; do uuidgen; done</code></pre>

<h2>UUID como Chave Primária no PostgreSQL</h2>

<p>Usar UUID como PK é cada vez mais comum. Veja como configurar:</p>

<pre><code class="language-sql">-- Habilitar extensão
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Criar tabela com UUID como chave primária
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir sem especificar ID (gerado automaticamente)
INSERT INTO users (name, email) VALUES ('Maria', 'maria@email.com');

-- Para UUID v7 (PostgreSQL 17+)
-- SELECT uuidv7();</code></pre>

<div class="info-box">
<strong>⚠️ Dica de performance:</strong> Se estiver usando UUID v4 como PK em tabelas grandes, considere criar um índice <code>BRIN</code> adicional na coluna <code>created_at</code> para queries temporais, já que UUIDs v4 não são ordenáveis.
</div>

<h2>Validando um UUID</h2>

<p>Para verificar se uma string é um UUID válido, use regex:</p>

<pre><code class="language-javascript">function isValidUUID(str) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(str);
}

console.log(isValidUUID('550e8400-e29b-41d4-a716-446655440000')); // true
console.log(isValidUUID('not-a-uuid'));                            // false</code></pre>

<h2>Perguntas Frequentes</h2>

<h3>UUID e GUID são a mesma coisa?</h3>
<p>Sim, tecnicamente. <strong>GUID</strong> é o termo usado pela Microsoft, enquanto <strong>UUID</strong> é o padrão da RFC 4122. A implementação é idêntica.</p>

<h3>UUID é seguro para tokens de autenticação?</h3>
<p>Não. Apesar de ser difícil de adivinhar, UUID não foi projetado para segurança criptográfica. Para tokens de sessão ou API keys, use geradores criptográficos como <code>crypto.randomBytes()</code> ou <code>secrets.token_hex()</code>.</p>

<h3>Posso usar UUID em URLs?</h3>
<p>Sim, é uma prática comum: <code>/api/users/550e8400-e29b-41d4-a716-446655440000</code>. É melhor que IDs sequenciais pois previne enumeração de recursos (<strong>IDOR</strong>).</p>
`
}
