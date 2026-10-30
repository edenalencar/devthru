import { BlogPost } from '../index'

export const postComoValidarAssinaturaWebhooksHmacSha256: BlogPost = {
    slug: 'como-validar-assinatura-webhooks-hmac-sha256',
    title: 'Como Validar Assinatura de Webhooks (HMAC SHA-256) com Segurança',
    description: 'Guia definitivo para validar assinaturas criptográficas de webhooks em Node.js e Python, prevenindo vulnerabilidades de timing attack e falsificação de requisições.',
    date: '2026-10-30',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 7,
    tags: ['Webhooks', 'HMAC', 'Segurança', 'APIs', 'Node.js', 'Python', 'Criptografia'],
    relatedTools: ['/tools/development/hmac-generator', '/tools/development/jwt-debugger'],
    content: `
<p>Webhooks são a espinha dorsal da comunicação assíncrona na web moderna. Seja para receber notificações de pagamentos aprovados no Stripe, Asaas e Mercado Pago, eventos de repositório no GitHub ou mensagens no WhatsApp Cloud API, sua aplicação precisa expor um endpoint público HTTP na internet.</p>

<p>No entanto, expor uma rota pública traz um desafio crítico de segurança: <strong>como garantir que a requisição POST recebida foi genuinamente enviada pelo serviço terceiro e que o payload não foi forjado por um invasor?</strong> A resposta da indústria para esse desafio é o <strong>HMAC (Hash-based Message Authentication Code)</strong>.</p>

<h2>1. Como Funciona a Assinatura HMAC de Webhooks</h2>

<p>O HMAC combina uma função de hash unidirecional (quase sempre <strong>SHA-256</strong>) com uma <strong>chave secreta compartilhada (Secret Key)</strong> que apenas o provedor e você possuem:</p>

<ol>
  <li><strong>No Provedor (ex: Stripe, GitHub):</strong> Ao disparar o evento, o servidor pega o corpo bruto da requisição (raw body) e calcula: <code>HMAC-SHA256(raw_body, secret_key)</code>. O hash resultante é enviado em um cabeçalho HTTP (como <code>Stripe-Signature</code> ou <code>X-Hub-Signature-256</code>).</li>
  <li><strong>No seu Servidor:</strong> Sua aplicação recebe a requisição, recalcula a mesma assinatura usando o corpo bruto e o segredo configurado no seu arquivo <code>.env</code>, e compara se a assinatura calculada é idêntica à assinatura do cabeçalho.</li>
</ol>

<h2>2. A Armadilha dos Timing Attacks (Ataques de Tempo)</h2>

<p>O erro mais comum cometido por desenvolvedores ao implementar a verificação de assinatura é utilizar o operador clássico de igualdade de strings (<code>if (receivedSignature === expectedSignature)</code>).</p>

<p>Operadores de comparação padrão encerram a execução <strong>no primeiro caractere divergente</strong>. Isso significa que uma assinatura que acerta os primeiros 10 caracteres leva algumas frações de microssegundo a mais para ser rejeitada do que uma assinatura que erra logo no primeiro caractere. Invasores sofisticados utilizam essa variação de tempo para descobrir hashes válidos caractere por caractere (vulnerabilidade conhecida como <em>Timing Attack</em>).</p>

<p>Para evitar essa falha grave, as linguagens fornecem funções de comparação em <strong>tempo constante</strong>.</p>

<h2>3. Implementação Segura em Node.js / TypeScript</h2>

<p>No Node.js, utilize o módulo nativo <code>node:crypto</code> com a função <code>crypto.timingSafeEqual</code>. <strong>Atenção:</strong> nunca utilize o JSON já parseado; sempre utilize o buffer ou string exata do corpo bruto (raw body):</p>

<pre><code class="language-typescript">import crypto from "node:crypto";

export function verifyWebhook(
  rawBody: string,
  receivedSignature: string,
  secretKey: string
): boolean {
  // 1. Calcula o HMAC-SHA256 do corpo bruto
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(rawBody);
  const calculatedSignature = hmac.digest("hex");

  // 2. Prepara os buffers para comparação segura
  const receivedBuffer = Buffer.from(receivedSignature, "utf8");
  const calculatedBuffer = Buffer.from(calculatedSignature, "utf8");

  // 3. Verifica o tamanho dos buffers antes de comparar
  if (receivedBuffer.length !== calculatedBuffer.length) {
    return false;
  }

  // 4. Comparação em tempo constante contra Timing Attacks
  return crypto.timingSafeEqual(receivedBuffer, calculatedBuffer);
}</code></pre>

<h2>4. Implementação Segura em Python</h2>

<p>No Python, a biblioteca padrão <code>hmac</code> possui a função <code>hmac.compare_digest</code>, desenvolvida especificamente para mitigar ataques de tempo:</p>

<pre><code class="language-python">import hmac
import hashlib

def verify_webhook(raw_payload: str, received_signature: str, secret_key: str) -> bool:
    # Calcula a assinatura esperada
    expected_signature = hmac.new(
        secret_key.encode('utf-8'),
        raw_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    # Comparação segura em tempo constante
    return hmac.compare_digest(expected_signature, received_signature)</code></pre>

<h2>5. Como Testar e Simular Assinaturas no Desenvolvimento</h2>

<p>Durante a criação de testes locais ou simulações com cURL e Postman, você não precisa ficar disparando eventos reais no painel do gateway para gerar assinaturas de teste. Você pode utilizar o <a href="/tools/development/hmac-generator">Gerador e Validador de HMAC Online do DevThru</a> para calcular assinaturas instantaneamente em SHA-256 ou SHA-512 e testar a reação do seu webhook.</p>
`
}
