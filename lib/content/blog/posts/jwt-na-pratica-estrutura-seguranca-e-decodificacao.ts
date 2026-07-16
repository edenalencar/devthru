import { BlogPost } from '../index'

export const postJwtNaPraticaEstruturaSegurancaEDecodificacao: BlogPost = {
    slug: 'jwt-na-pratica-estrutura-seguranca-e-decodificacao',
    title: 'JWT na Prática: Segurança e Decodificação',
    description: 'Entenda a estrutura de um JSON Web Token (JWT), como funciona a assinatura de segurança e as melhores práticas de armazenamento.',
    date: '2026-07-12',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 7,
    tags: ['JWT', 'Autenticação', 'Segurança', 'JSON Web Token', 'API', 'WebDev'],
    relatedTools: ['/tools/development/jwt-debugger'],
    content: `
<p>O <strong>JWT (JSON Web Token)</strong> tornou-se o padrão mais popular para autenticação stateless em APIs modernas e arquiteturas de microsserviços. Por ser compacto, autossuficiente e fácil de transmitir via cabeçalhos HTTP, ele resolveu o desafio de manter sessões de usuários ativas sem a necessidade de consultar bancos de dados a cada requisição.</p>

<p>Contudo, a facilidade de implementação do JWT frequentemente vem acompanhada de falhas graves de segurança. Muitos desenvolvedores tratam o JWT como um token criptografado (secreto) ou esquecem de validar sua integridade de forma correta. Neste artigo, vamos analisar a anatomia de um JWT, entender como funciona sua assinatura digital e ver as melhores práticas de segurança.</p>

<h2>1. A Estrutura de um JWT: Três Partes Separadas por Pontos</h2>

<p>Um token JWT completo é composto por três blocos de texto codificados em Base64URL, separados por pontos (<code>.</code>): <strong>Header</strong>, <strong>Payload</strong> e <strong>Signature</strong>.</p>

<pre><code class="language-bash">header.payload.signature</code></pre>

<p>Vamos entender o papel de cada uma dessas três seções:</p>

<h3>A. Header (Cabeçalho)</h3>
<p>Informa os metadados do token, tipicamente o tipo do token (<code>JWT</code>) e o algoritmo de criptografia ou assinatura que foi utilizado para gerá-lo (como <code>HS256</code> ou <code>RS256</code>).</p>
<pre><code class="language-json">{
  "alg": "HS256",
  "typ": "JWT"
}</code></pre>

<h3>B. Payload (Carga Útil)</h3>
<p>Contém as informações de identificação do usuário e metadados da sessão, conhecidos como <strong>Claims</strong> (reivindicações). Existem claims reservadas padrão (como <code>sub</code> para o ID do usuário, <code>exp</code> para expiração e <code>iat</code> para data de criação), além de claims personalizadas que você mesmo pode definir.</p>
<pre><code class="language-json">{
  "sub": "1234567890",
  "name": "João da Silva",
  "role": "admin",
  "exp": 1783776000
}</code></pre>

<h3>C. Signature (Assinatura)</h3>
<p>Esta é a parte mais importante para a segurança. A assinatura é gerada pegando o Header codificado em Base64, juntando com o Payload codificado em Base64, e aplicando a chave secreta da sua aplicação usando o algoritmo especificado no header. Ela garante que os dados do payload não foram adulterados em trânsito.</p>

<h2>2. O Maior Erro com JWT: Confundir Codificação com Criptografia</h2>

<div class="info-box">
  <strong>⚠️ IMPORTANTE:</strong> O JWT por padrão <strong>não é criptografado</strong>. O Header e o Payload são apenas codificados em Base64URL. Qualquer pessoa que interceptar o token pode decodificá-lo instantaneamente e ler todas as informações contidas nele.
</div>

<p>Por isso, siga sempre estas duas regras fundamentais:</p>
<ul>
  <li><strong>Nunca guarde dados sensíveis no Payload:</strong> Informações confidenciais como senhas, chaves de API, saldos financeiros ou dados pessoais críticos de privacidade não devem ser inseridos no JWT.</li>
  <li><strong>Valide sempre a assinatura no backend:</strong> Antes de aceitar qualquer informação do token, o seu servidor deve validar se a assinatura coincide, prevenindo que um invasor altere as claims (como mudar seu role de <code>user</code> para <code>admin</code>).</li>
</ul>

<h2>3. Melhores Práticas para Armazenamento e Uso</h2>

<p>Decidir onde armazenar o JWT no frontend é crucial para prevenir ataques comuns da web:</p>

<table>
<thead>
<tr>
  <th>Local de Armazenamento</th>
  <th>Vulnerabilidade a XSS</th>
  <th>Vulnerabilidade a CSRF</th>
  <th>Recomendação</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>LocalStorage / SessionStorage</strong></td>
  <td>Alta (qualquer script injetado lê o token)</td>
  <td>Zero (não enviado automaticamente)</td>
  <td>Não recomendado para tokens de longa duração.</td>
</tr>
<tr>
  <td><strong>Cookie (HttpOnly, Secure)</strong></td>
  <td>Zero (indisponível para scripts JS)</td>
  <td>Alta (enviado de forma automática pelo browser)</td>
  <td><strong>Recomendado</strong>, desde que utilize a flag <code>SameSite=Strict</code> ou tokens anti-CSRF adicionais.</td>
</tr>
</tbody>
</table>

<h2>Conclusão</h2>

<p>O JWT é uma ferramenta fantástica quando compreendida e integrada de forma segura. Utilizando o armazenamento correto sob cookies HttpOnly, limitando o tempo de expiração do token e garantindo que chaves seguras sejam mantidas no servidor, você constrói uma arquitetura de login resiliente e rápida.</p>

<p>Precisa debugar um JWT, ler o payload decodificado ou verificar a validade do tempo de expiração da sua sessão local de forma rápida e segura sem enviar os dados da sua empresa para servidores externos? Utilize o <a href="/tools/development/jwt-debugger">JWT Debugger</a> do DevThru para validar e inspecionar seus tokens localmente no navegador.</p>
`
}
