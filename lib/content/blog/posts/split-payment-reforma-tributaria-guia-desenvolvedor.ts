import { BlogPost } from '../index'

export const postSplitPaymentReformaTributariaGuiaDev: BlogPost = {
    slug: 'split-payment-reforma-tributaria-guia-desenvolvedor',
    title: 'Split Payment na Reforma Tributária: Guia Técnico para Desenvolvedores de ERP e E-commerce',
    description: 'Entenda como funciona o Split Payment no IBS e CBS, o impacto nos meios de pagamento (Pix, Cartão) e como adaptar seu ERP e e-commerce com exemplos práticos.',
    date: '2026-07-21',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 7,
    tags: ['Reforma Tributária', 'Split Payment', 'IBS', 'CBS', 'ERP', 'Pix', 'Checkout', 'SEFAZ'],
    relatedTools: ['/tools/finance/split-payment', '/tools/business/nfe-generator'],
    content: `
<p>A Reforma Tributária no Brasil trouxe uma das maiores mudanças arquiteturais na história dos sistemas de pagamento e ERPs nacionais: o <strong>Split Payment</strong>. Diferente do modelo legado, onde a empresa recebia o valor bruto da venda e apurava os impostos (ICMS, ISS, PIS, COFINS) ao final do mês, a nova sistemática realiza a retenção dos impostos estaduais, municipais (IBS) e federais (CBS) <strong>no momento exato da liquidação financeira</strong>.</p>

<p>Para equipes de engenharia de software, CTOs e desenvolvedores de e-commerce, o Split Payment exige reformular conciliações bancárias, rotinas de webhook e integrações com adquirentes e a SEFAZ. Neste guia técnico, analisamos a arquitetura do Split Payment e como adaptar suas aplicações.</p>

<h2>1. O que é o Split Payment e por que ele muda o fluxo do ERP?</h2>

<p>No modelo tradicional de liquidação de e-commerce e PDV, uma venda de <strong>R$ 1.000,00</strong> paga no Pix entrava quase integralmente na conta bancária do vendedor (descontando apenas a taxa de intermediação do meio de pagamento). No final do mês, a contabilidade gerava as guias de recolhimento dos tributos.</p>

<p>Com o <strong>Split Payment (Reforma Tributária - IBS + CBS)</strong>:</p>
<ul>
  <li>A instituição financeira ou adquirente (banco, credenciadora de cartão, gateway Pix) atua como agente retentor.</li>
  <li>Na liquidação da transação, o imposto estimado (ex: ~17,7% de IBS + ~8,8% de CBS) é <strong>retido na fonte</strong> e direcionado aos cofres públicos.</li>
  <li>O valor creditado na conta do vendedor é exclusivamente o <strong>valor líquido</strong> da operação.</li>
</ul>

<h2>2. Impacto Técnico nas APIs de Pagamento e Webhooks</h2>

<p>Para quem desenvolve integrações com plataformas como Stripe, Asaas, PagSeguro, Mercado Pago ou APIs Pix via Banco Central, o payload de liquidação financeira incluirá novos campos de retenção fiscal.</p>

<p>Exemplo de Payload de Webhook simulando liquidação com Split Payment:</p>

<pre><code>{
  "event": "payment.settled_with_split",
  "transaction_id": "tx_split_892341",
  "gross_amount": 1000.00,
  "split_payment_retention": {
    "ibs_retained": 177.00,
    "cbs_retained": 88.00,
    "total_tax_retained": 265.00
  },
  "seller_net_payout": 735.00
}</code></pre>

<p>O ERP não pode mais tentar conciliar o recebimento de R$ 1.000,00 na conta corrente. O lançamento contábil de entrada financeira passa a ser de R$ 735,00, registrando os R$ 265,00 como imposto retido diretamente no banco.</p>

<h2>3. Novas Tags no XML da Nota Fiscal (NF-e v5.0)</h2>

<p>Para garantir que o banco saiba exatamente quanto reter em cada operação, a SEFAZ e o Comitê Gestor do IBS estruturaram novos grupos no XML da NF-e para identificar as contas e percentuais do Split Payment:</p>

<ul>
  <li><code>&lt;gSplitPayment&gt;</code>: Grupo do XML onde é declarada a modalidade do Split Payment.</li>
  <li><code>&lt;vIBS&gt;</code>: Valor do Imposto sobre Bens e Serviços destinado ao Estado/Município.</li>
  <li><code>&lt;vCBS&gt;</code>: Valor da Contribuição sobre Bens e Serviços destinada à União.</li>
</ul>

<h2>4. Como Simular e Testar o Split Payment</h2>

<p>Durante a fase de desenvolvimento e staging das suas aplicações, é essencial validar se o motor de cálculo do seu ERP e e-commerce está arredondando corretamente os centavos e distribuindo as retenções sem divergências financeiras.</p>

<p>Utilize o nosso <a href="/tools/finance/split-payment">Simulador e Calculadora de Split Payment da Reforma Tributária</a> no DevThru para simular valores de venda, calcular repasses líquidos e copiar payloads JSON de teste prontos para uso.</p>
`,
    faqs: [
        {
            question: "O Split Payment é obrigatório para todas as vendas no Brasil?",
            answer: "O Split Payment se aplica gradualmente a partir da entrada em vigor do IBS e CBS nas liquidações eletrônicas (Pix, cartões de crédito/débito e boletos)."
        },
        {
            question: "Onde posso simular o cálculo do Split Payment online?",
            answer: "Você pode utilizar o Simulador de Split Payment do DevThru em /tools/finance/split-payment para simular alíquotas de IBS/CBS e copiar mocks em JSON."
        }
    ]
}
