import { BlogPost } from '../index'

export const postNormativaEfxBacenGuiaDev: BlogPost = {
    slug: 'normativa-efx-bacen-guia-desenvolvedor-pagamentos-internacionais',
    title: 'Normativa eFX do Banco Central: Guia Técnico de Pagamentos Internacionais para Desenvolvedores',
    description: 'Entenda como funciona a regulamentação eFX do Banco Central, o cálculo obrigatório do VET no checkout e como integrar APIs de pagamento cross-border com exemplos práticos.',
    date: '2026-07-22',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['eFX', 'Banco Central', 'BACEN', 'VET', 'Câmbio', 'IOF', 'Pagamentos Internacionais', 'Fintech'],
    relatedTools: ['/tools/finance/vet-efx-calculator', '/tools/finance/credit-card-generator'],
    content: `
<p>No mercado de fintechs, e-commerce cross-border e aplicativos de remessas internacionais, poucas regulamentações têm tanto impacto na experiência de checkout e na arquitetura de software quanto as normativas de <strong>eFX (Electronic Foreign Exchange)</strong> publicadas pelo Banco Central do Brasil (Resoluções BCB nº 148, 277 e 561).</p>

<p>Essas regras estabelecem o arcabouço regulatório para que plataformas brasileiras e estrangeiras cobrem em reais (BRL) por serviços e bens vendidos por empresas no exterior. Para desenvolvedores, entender o eFX é vital para integrar gateways de pagamento cross-border, evitar rejeições regulatórias e implementar o cálculo transparente do <strong>VET (Valor Efetivo Total)</strong>.</p>

<h2>1. O que é o eFX e Quem são as Prestadoras de Pagamento Internacional?</h2>

<p>O <strong>eFX</strong> é a modalidade autorizada pelo Banco Central em que uma instituição de pagamento ou fintech atua como intermediária em transações cambiais de até <strong>US$ 10.000,00</strong> (ou equivalente em outra moeda). Ela permite que o usuário final no Brasil pague via Pix, cartão de crédito nacional ou boleto bancário, enquanto o vendedor no exterior recebe em moeda estrangeira.</p>

<p>As modalidades de eFX abrangem:</p>
<ul>
  <li>Aquisição de bens e serviços no exterior (compras em e-commerces internacionais e assinaturas SaaS).</li>
  <li>Transferência de recursos entre contas do mesmo titular no exterior.</li>
  <li>Transferências unilaterais e remessas de disponibilidade no exterior.</li>
</ul>

<h2>2. A Exigência Regulatória do VET (Valor Efetivo Total) no Checkout</h2>

<p>O Banco Central exige que, <strong>antes do clique de confirmação de pagamento</strong>, a plataforma exiba de forma discriminada e clara ao consumidor o <strong>VET (Valor Efetivo Total)</strong> por unidade de moeda estrangeira.</p>

<p>A fórmula matemática oficial do VET é expressa como:</p>
<pre><code>VET = (Valor Total Pago em BRL) / (Valor na Moeda Estrangeira)</code></pre>

<p>O valor total pago em Reais engloba três componentes:</p>
<ol>
  <li><strong>Câmbio Comercial Base (PTAX):</strong> A cotação de referência de mercado.</li>
  <li><strong>Spread / Margem Cambial:</strong> O percentual de remuneração da instituição financeira ou gateway.</li>
  <li><strong>Imposto sobre Operações Financeiras (IOF):</strong> A alíquota tributária (ex: 4,38% para compras de bens/serviços; 1,10% para mesma titularidade; 0,38% para outras remessas).</li>
</ol>

<h2>3. Exemplo de Payload JSON para APIs Cambiais e eFX</h2>

<p>Ao integrar um checkout cross-border, sua API deve consumir e expor o detalhamento cambial retornado pelo gateway eFX:</p>

<pre><code>{
  "quote_id": "fx_981247",
  "currency": "USD",
  "foreign_amount": 100.00,
  "base_ptax": 5.60,
  "spread_percentage": 2.0,
  "rate_with_spread": 5.712,
  "iof_percentage": 4.38,
  "iof_amount_brl": 25.02,
  "total_payable_brl": 596.22,
  "vet_per_unit_brl": 5.9622,
  "efx_eligible": true
}</code></pre>

<h2>4. Como Simular e Testar o VET no seu Sistema</h2>

<p>Para criar suítes de teste de integração e validar o motor de cálculo do seu checkout internacional sem depender de APIs de produção, acesse a nossa ferramenta gratuita <a href="/tools/finance/vet-efx-calculator">Simulador e Calculadora de VET & eFX Cambial</a> no DevThru.</p>
`,
    faqs: [
        {
            question: "Qual o limite de valor para transações eFX sem contrato formal de câmbio?",
            answer: "O limite regulatório do eFX simplificado é de US$ 10.000,00 por transação. Acima desse valor, é exigida celebração de contrato de câmbio formal com registro no SISBACEN."
        },
        {
            question: "Onde posso simular o cálculo do VET online?",
            answer: "Você pode utilizar o Simulador de VET & eFX do DevThru em /tools/finance/vet-efx-calculator para calcular o VET com alíquotas oficiais de IOF e copiar mocks JSON."
        }
    ]
}
