import { BlogPost } from '../index'

export const postJwtComoFunciona: BlogPost = {
    slug: 'jwt-como-funciona-guia-pratico',
    title: 'JWT: Como Funciona, Como Decodificar e Erros Comuns',
    description: 'Entenda a estrutura do JSON Web Token, como funciona a autenticação com JWT, aprenda a decodificar tokens e evitar vulnerabilidades de segurança.',
    date: '2026-02-27',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 10,
    tags: ['JWT', 'autenticação', 'token', 'segurança', 'API', 'OAuth'],
    relatedTools: ['/tools/development/jwt-debugger', '/tools/utilities/base64'],
    content: `
<p>O <strong>JWT (JSON Web Token)</strong> se tornou o padrão de autenticação mais usado em APIs modernas. Se você trabalha com backend, frontend ou mobile, entender como JWT funciona é essencial — e debugar tokens faz parte do dia a dia.</p>

<p>Neste guia, vamos destrinchar a estrutura de um JWT, explicar o fluxo de autenticação, mostrar como decodificar tokens e cobrir os erros de segurança mais comuns.</p>

<h2>O Que É JWT?</h2>

<p>JWT é um padrão aberto (<strong>RFC 7519</strong>) que define um formato compacto e seguro para transmitir informações entre partes como um objeto JSON. O token é <strong>assinado digitalmente</strong>, garantindo que seu conteúdo não foi adulterado.</p>

<p>Um JWT tem esta aparência:</p>

<pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlhIiwiaWF0IjoxNjE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>

<div class="info-box">
<strong>💡 Importante:</strong> JWT é <strong>assinado</strong>, não <strong>criptografado</strong>. Qualquer pessoa pode decodificar o payload. Nunca coloque dados sensíveis (senhas, cartões de crédito) dentro de um JWT.
</div>

<h2>Estrutura do JWT: As 3 Partes</h2>

<p>Um JWT é composto por três partes separadas por pontos (<code>.</code>):</p>

<table>
<thead>
<tr><th>Parte</th><th>Nome</th><th>Conteúdo</th></tr>
</thead>
<tbody>
<tr><td>1ª</td><td><strong>Header</strong></td><td>Algoritmo e tipo do token</td></tr>
<tr><td>2ª</td><td><strong>Payload</strong></td><td>Claims (dados do usuário/sessão)</td></tr>
<tr><td>3ª</td><td><strong>Signature</strong></td><td>Assinatura para verificação</td></tr>
</tbody>
</table>

<h3>1. Header</h3>

<p>Indica o algoritmo de assinatura e o tipo do token:</p>

<pre><code class="language-json">{
  "alg": "HS256",
  "typ": "JWT"
}</code></pre>

<p>Os algoritmos mais comuns são:</p>
<ul>
<li><strong>HS256</strong> — HMAC com SHA-256 (chave simétrica, mais simples)</li>
<li><strong>RS256</strong> — RSA com SHA-256 (chave assimétrica, mais seguro para APIs públicas)</li>
<li><strong>ES256</strong> — ECDSA com SHA-256 (compacto e moderno)</li>
</ul>

<h3>2. Payload (Claims)</h3>

<p>Contém as <strong>claims</strong> — informações sobre o usuário e metadados do token:</p>

<pre><code class="language-json">{
  "sub": "user_123",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "role": "admin",
  "iat": 1616239022,
  "exp": 1616242622
}</code></pre>

<p>As claims padrão (registradas) mais importantes:</p>

<table>
<thead>
<tr><th>Claim</th><th>Nome</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code>sub</code></td><td>Subject</td><td>Identificador do usuário</td></tr>
<tr><td><code>iat</code></td><td>Issued At</td><td>Timestamp de criação</td></tr>
<tr><td><code>exp</code></td><td>Expiration</td><td>Timestamp de expiração</td></tr>
<tr><td><code>iss</code></td><td>Issuer</td><td>Quem emitiu o token</td></tr>
<tr><td><code>aud</code></td><td>Audience</td><td>Para quem o token é destinado</td></tr>
</tbody>
</table>

<h3>3. Signature</h3>

<p>A assinatura é criada combinando header + payload + secret:</p>

<pre><code class="language-text">HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)</code></pre>

<p>É a assinatura que garante que o token não foi alterado. Se alguém modificar o payload, a assinatura não vai bater e o servidor rejeitará o token.</p>

<h2>Fluxo de Autenticação com JWT</h2>

<p>O fluxo típico de autenticação funciona assim:</p>

<ol>
<li><strong>Login:</strong> Usuário envia credenciais (email + senha) para <code>/api/login</code></li>
<li><strong>Geração:</strong> Servidor valida credenciais e gera um JWT com os dados do usuário</li>
<li><strong>Armazenamento:</strong> Cliente recebe e armazena o token (cookie httpOnly ou localStorage)</li>
<li><strong>Uso:</strong> Em cada request, o cliente envia o token no header <code>Authorization: Bearer &lt;token&gt;</code></li>
<li><strong>Verificação:</strong> Servidor verifica a assinatura e extrai os dados do token (sem consultar banco)</li>
</ol>

<pre><code class="language-javascript">// Exemplo: enviando JWT em requisições
const response = await fetch('/api/profile', {
    headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
    }
});</code></pre>

<h2>Como Decodificar um JWT</h2>

<h3>No Terminal</h3>

<pre><code class="language-bash"># Decodificar payload (parte 2)
echo "eyJzdWIiOiIxMjM0NTY3ODkwIn0" | base64 -d
# {"sub":"1234567890"}</code></pre>

<h3>Em JavaScript</h3>

<pre><code class="language-javascript">function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token inválido');

    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    return { header, payload };
}

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.xxx';
const decoded = decodeJWT(token);
console.log(decoded.payload.sub); // "1234567890"</code></pre>

<h3>Em Python</h3>

<pre><code class="language-python">import jwt  # pip install PyJWT

# Decodificar sem verificar assinatura (debug)
payload = jwt.decode(token, options={"verify_signature": False})
print(payload)

# Decodificar COM verificação (produção)
payload = jwt.decode(token, "minha-chave-secreta", algorithms=["HS256"])
print(payload)</code></pre>

<h2>Erros Comuns e Vulnerabilidades</h2>

<h3>1. Armazenar JWT no localStorage</h3>
<p>O <code>localStorage</code> é acessível via JavaScript, o que significa que qualquer ataque <strong>XSS</strong> pode roubar o token. <strong>Preferível:</strong> armazene em um cookie <code>httpOnly</code> com flags <code>Secure</code> e <code>SameSite</code>.</p>

<h3>2. Não validar o algoritmo</h3>
<p>O ataque <strong>"alg: none"</strong> é clássico: o atacante modifica o header para <code>"alg": "none"</code> e remove a assinatura. Sempre valide que o algoritmo é o esperado no servidor.</p>

<pre><code class="language-javascript">// ❌ Vulnerável
jwt.verify(token, secret);

// ✅ Seguro — forçar algoritmo
jwt.verify(token, secret, { algorithms: ['HS256'] });</code></pre>

<h3>3. Tokens que nunca expiram</h3>
<p>Tokens sem <code>exp</code> são um risco. Sempre defina um tempo de expiração curto (15–30 minutos) e use <strong>refresh tokens</strong> para renovar.</p>

<h3>4. Secret fraco</h3>
<p>Usar strings como <code>"secret"</code> ou <code>"123456"</code> permite ataques de força bruta. Use chaves geradas com pelo menos 256 bits de entropia:</p>

<pre><code class="language-bash"># Gerar um secret seguro
openssl rand -hex 32</code></pre>

<h2>JWT vs. Sessions: Quando Usar Cada Um?</h2>

<table>
<thead>
<tr><th>Critério</th><th>JWT (Stateless)</th><th>Sessions (Stateful)</th></tr>
</thead>
<tbody>
<tr><td>Armazenamento</td><td>No cliente</td><td>No servidor (Redis, DB)</td></tr>
<tr><td>Escalabilidade</td><td>Excelente (sem estado)</td><td>Requer sessão compartilhada</td></tr>
<tr><td>Revogação</td><td>Difícil (precisa de blocklist)</td><td>Fácil (deletar sessão)</td></tr>
<tr><td>SSR / Server-side</td><td>Funciona com cookies</td><td>Padrão nativo</td></tr>
<tr><td>Microsserviços</td><td>Ideal</td><td>Complexo</td></tr>
</tbody>
</table>

<h2>Perguntas Frequentes</h2>

<h3>JWT é a mesma coisa que OAuth?</h3>
<p>Não. <strong>OAuth 2.0</strong> é um protocolo de autorização. JWT é um formato de token. O OAuth pode usar JWT como formato dos access tokens, mas são conceitos distintos.</p>

<h3>Posso revogar um JWT?</h3>
<p>Não diretamente, pois ele é stateless. A prática comum é manter uma <strong>blocklist</strong> de tokens revogados (ex: em Redis) ou usar tokens de curta duração + refresh tokens.</p>

<h3>Devo usar JWT para tudo?</h3>
<p>Não. Para apps monolíticos com renderização server-side, <strong>sessions tradicionais</strong> são mais simples e seguras. JWT brilha em APIs, SPAs e microsserviços.</p>
`
}
