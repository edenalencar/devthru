import { BlogPost } from '../index'

export const postSplitPaymentReformaTributariaGuiaDev: BlogPost = {
    slug: 'split-payment-reforma-tributaria-guia-desenvolvedor',
    title: 'Split Payment na Reforma Tributária: Guia Completo',
    description: 'Entenda o Split Payment na LC 214/2025, os 3 repositórios abertos da Receita Federal (Portaria Cotec 342/2026), o alerta de cClassTrib e como testar.',
    date: '2026-11-20',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 9,
    tags: ['Reforma Tributária', 'Split Payment', 'IBS', 'CBS', 'cClassTrib', 'Receita Federal', 'ERP', 'Pix'],
    relatedTools: ['/tools/finance/split-payment', '/tools/business/nfe-generator'],
    content: `
<p><strong>Aviso:</strong> este é um guia técnico independente, baseado na Lei Complementar nº 214/2025 (atualizada pela LC nº 227/2026), na Portaria Cotec nº 342/2026 e nos repositórios públicos da Receita Federal. O DevThru não é um serviço oficial do Fisco.</p>

<p>O <strong>Split Payment</strong> é o mecanismo previsto no <strong>art. 31 da Lei Complementar nº 214/2025</strong> pelo qual prestadores de serviços de pagamento eletrônico e operadoras de sistemas de pagamento segregam e recolhem o <strong>IBS</strong> (ao Comitê Gestor do IBS) e a <strong>CBS</strong> (à Receita Federal) <strong>no momento da liquidação financeira</strong> da operação. Na prática, em vez de receber o valor bruto e apurar o tributo só no fechamento do mês, o vendedor recebe o valor líquido já descontado da parcela vinculada ao documento fiscal eletrônico.</p>

<h2>1. Como funciona o Split Payment e o que diz a LC 214/2025 sobre alíquotas?</h2>

<p>Conforme o art. 31 da LC 214/2025 (com redação dada pela LC 227/2026), o Split Payment compreende dois fluxos: o <strong>procedimento padrão</strong> (art. 32) e o <strong>procedimento simplificado</strong> (art. 33). Em ambos, a operação financeira é vinculada aos documentos fiscais eletrônicos (DF-e) para que o agente de pagamento separe a fatia tributária.</p>

<p>Um cuidado importante ao montar testes em ERPs é <strong>não fixar alíquotas definitivas no código</strong>:</p>
<ul>
  <li><strong>Período de teste em 2026 (arts. 343 e 346 da LC 214/2025):</strong> o IBS tem alíquota estadual de <strong>0,1%</strong> e a CBS tem alíquota de <strong>0,9%</strong> (soma de 1,0%).</li>
  <li><strong>2027 e 2028 (art. 344 da LC 214/2025):</strong> o IBS passa a <strong>0,05%</strong> estadual + <strong>0,05%</strong> municipal.</li>
  <li><strong>Alíquotas definitivas:</strong> dependem de lei específica de cada ente federativo (União, Estados, Distrito Federal e Municípios), observadas as alíquotas de referência fixadas por resolução do Senado Federal (art. 14 da LC 214/2025). Qualquer percentual cheio usado em planilhas de mercado é estimativa, não alíquota vigente em lei.</li>
</ul>

<h2>2. Impacto técnico nos webhooks e na vinculação com o XML fiscal</h2>

<p>Nas integrações com gateways de pagamento, adquirentes e arranjos Pix, o ERP deixa de conciliar apenas o valor bruto da venda. Abaixo está um <strong>exemplo ilustrativo</strong> de payload de webhook usando as alíquotas de transição de 2026 (0,1% IBS e 0,9% CBS sobre uma operação fictícia de R$ 1.000,00):</p>

<pre><code class="language-json">{
  "event": "payment.settled_with_split",
  "transaction_id": "tx_split_exemplo_001",
  "gross_amount": 1000.00,
  "split_payment_retention": {
    "ibs_rate_pct": 0.1,
    "ibs_retained": 1.00,
    "cbs_rate_pct": 0.9,
    "cbs_retained": 9.00,
    "total_tax_retained": 10.00
  },
  "seller_net_payout": 990.00
}</code></pre>

<p>No lado fiscal, a vinculação entre o documento eletrônico e a transação financeira já aparece nos leiautes mais recentes. Na <strong>NFS-e de padrão nacional</strong>, a <strong>NT 009 v1.01</strong> (§2.8, p. 13) criou o grupo <code>gPgtoVinc</code> dentro de <code>infDPS/IBSCBS/</code>, permitindo vincular até 99 pagamentos com os campos <code>nPag</code>, <code>idTransacao</code>, <code>tpMeioPgto</code> (ex.: <code>15</code> Boleto, <code>17</code> Pix QRCode dinâmico, <code>20</code> Pix chave/estático, <code>23</code> Pix automático), <code>CNPJReceb</code> e <code>CNPJBasePSP</code>. Na <strong>NF-e</strong>, o destaque de IBS/CBS segue a NT 2025.002-RTC e a vinculação com a transação de pagamento é tratada em nota técnica específica (NT 2026.006 <!-- A CONFERIR: conferir tags exatas da NT 2026.006 no Portal da NF-e antes de detalhar campos de NF-e -->).</p>

<h2>3. Os 3 repositórios oficiais da Receita Federal no GitHub</h2>

<p>Em novembro de 2026, por meio da <strong>Portaria Cotec nº 342, de 12 de novembro de 2026</strong> (DOU de 13/11/2026), a Receita Federal publicou pela primeira vez no GitHub, sob <strong>licença MIT</strong>, o código-fonte oficial da Calculadora de Tributos da Reforma Tributária em três repositórios:</p>

<ul>
  <li><strong><code>ReceitaFederal/calculadora-rtc-regime-regular</code> (Java 21 / Spring Boot / SQLite):</strong> API REST que calcula CBS, IBS e Imposto Seletivo (LC 214/2025), gera e valida grupos XML contra XSD (<code>POST /xml/generate</code> e <code>/xml/validate</code>) e expõe tabelas oficiais de <code>CST</code>, <code>cClassTrib</code>, NCM, NBS e alíquotas de referência.</li>
  <li><strong><code>ReceitaFederal/calculadora-rtc-simples-nacional</code> (Java):</strong> API REST dedicada às regras de apuração de CBS e IBS para optantes pelo Simples Nacional.</li>
  <li><strong><code>ReceitaFederal/calculadora-rtc-gerador-danfse</code> (Go):</strong> serviço HTTP que converte o XML da NFS-e no PDF do DANFSe.</li>
</ul>

<p>Se a sua equipe emite NFS-e e usa o gerador em Go, confira também o nosso guia sobre <a href="/blog/danfse-nt-009-validacao-xml-ibs-cbs">o que muda no DANFSe com a NT 009 e como validar o XML dos novos grupos IBS/CBS</a>.</p>

<h2>4. Alerta prático: armadilhas de vigência do <code>cClassTrib</code> na API oficial</h2>

<p>Antes de alimentar o seu ERP com as tabelas da API <code>calculadora-rtc-regime-regular</code> (testada na versão 1.6.1, commit <code>150cccb</code>), atenção a dois bugs abertos no repositório oficial que afetam diretamente o <code>cClassTrib</code>:</p>

<ul>
  <li><strong>Códigos encerrados retornados sem <code>siglaDfe</code> (issue #12):</strong> chamar <code>GET /situacoes-tributarias/cbs-ibs?data=2026-06-01</code> <em>sem</em> informar <code>siglaDfe</code> não aplica o filtro de vigência nas classificações e inclui códigos encerrados (<code>220001</code>, <code>220002</code> e <code>220003</code>). Se o ERP enviar um desses códigos para <code>POST /regime-geral</code>, a própria calculadora rejeita com HTTP 404 (<em>"Classificação tributária não encontrada"</em>). Ao passar <code>siglaDfe=NFE</code> (ou consultar <code>GET /classificacoes-tributarias/cbs-ibs?data=...</code>), os códigos encerrados ficam de fora.</li>
  <li><strong>Colisão de códigos entre IS e CBS/IBS a partir de 2027 (issue #11):</strong> a partir de <code>2027-01-01</code>, <code>GET /classificacoes-tributarias/cbs-ibs/por-atores</code> sem <code>siglaDfe</code> mistura classificações do Imposto Seletivo com o mesmo número de <code>cClassTrib</code> (<code>000002</code>, <code>000004</code>, <code>200001</code>, <code>400001</code>) e devolve códigos restritos a outros atores. Informar <code>siglaDfe</code> contorna o problema enquanto a correção não sai.</li>
</ul>

<p><strong>Regra defensiva para integradores:</strong> sempre passe o parâmetro <code>siglaDfe</code> nas consultas de dados abertos da Calculadora RTC e valide a vigência da classificação antes de gravar o código no cadastro de produtos ou serviços.</p>

<h2>5. Como simular a retenção e gerar JSON de teste no navegador</h2>

<p>Durante o desenvolvimento de rotinas de conciliação e parsing de webhooks, vale testar cenários com diferentes percentuais de IBS e CBS (como o cenário de transição 2026 de 0,1% + 0,9% ou projeções da sua área fiscal) antes de subir a API Java completa.</p>

<p>Para testar sem código, use o <a href="/tools/finance/split-payment">Simulador de Split Payment do DevThru</a>. Ele roda no seu navegador e não envia os dados.</p>

<p><strong>Limites importantes da ferramenta:</strong> o simulador faz uma conta ilustrativa com as alíquotas que você digitar e gera um payload JSON fictício para testes de conciliação e webhook. Ele <strong>não consulta a Receita Federal</strong>, não aplica exceções por NCM/NBS ou <code>cClassTrib</code> e não substitui a Calculadora de Tributos oficial da Receita Federal.</p>

<h2>Fontes oficiais (verificadas em 19/11/2026)</h2>
<ul>
  <li><strong>Lei Complementar nº 214/2025 (com redação da LC nº 227/2026):</strong> <a href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm" target="_blank" rel="noopener noreferrer">planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm</a> (arts. 14, 31–33, 343, 344 e 346).</li>
  <li><strong>Notícia oficial da Receita Federal (Portaria Cotec nº 342/2026):</strong> <a href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/novembro/receita-federal-publica-primeiro-codigo-fonte-aberto-no-github-e-amplia-transparencia-da-reforma-tributaria" target="_blank" rel="noopener noreferrer">gov.br/receitafederal</a> e DOU de 13/11/2026 (<a href="https://www.in.gov.br/web/dou/-/portaria-cotec-n-342-de-12-de-novembro-de-2026-744398356" target="_blank" rel="noopener noreferrer">in.gov.br</a> <!-- A CONFERIR texto integral no DOU -->).</li>
  <li><strong>Repositórios oficiais (licença MIT):</strong> <a href="https://github.com/ReceitaFederal/calculadora-rtc-regime-regular" target="_blank" rel="noopener noreferrer">calculadora-rtc-regime-regular</a> (issues <a href="https://github.com/ReceitaFederal/calculadora-rtc-regime-regular/issues/12" target="_blank" rel="noopener noreferrer">#12</a> e <a href="https://github.com/ReceitaFederal/calculadora-rtc-regime-regular/issues/11" target="_blank" rel="noopener noreferrer">#11</a>), <a href="https://github.com/ReceitaFederal/calculadora-rtc-simples-nacional" target="_blank" rel="noopener noreferrer">calculadora-rtc-simples-nacional</a> e <a href="https://github.com/ReceitaFederal/calculadora-rtc-gerador-danfse" target="_blank" rel="noopener noreferrer">calculadora-rtc-gerador-danfse</a>.</li>
  <li><strong>Nota Técnica SE/CGNFS-e nº 009 – Versão 1.01</strong> (11/09/2026, §2.8 <code>gPgtoVinc</code>): <a href="https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/rtc/nota-tecnica-009-se-cgnfs-e-v-1-01.pdf" target="_blank" rel="noopener noreferrer">gov.br/nfse — PDF oficial</a>.</li>
</ul>
`,
    faqs: [
        {
            question: 'Quais são as alíquotas oficiais de IBS e CBS para testar o Split Payment em 2026?',
            answer: 'Pelos arts. 343 e 346 da LC 214/2025, em 2026 as alíquotas de teste são de 0,1% para o IBS (estadual) e 0,9% para a CBS (federal). As alíquotas definitivas ainda dependem de lei específica de cada ente federativo, com referência fixada pelo Senado Federal.'
        },
        {
            question: 'Por que a Calculadora oficial da Receita rejeita cClassTrib que ela mesma listou?',
            answer: 'Na versão 1.6.1 do repositório ReceitaFederal/calculadora-rtc-regime-regular (issue #12), o endpoint GET /situacoes-tributarias/cbs-ibs sem o parâmetro siglaDfe não filtra a vigência e devolve códigos encerrados (como 220001 a 220003), que o POST /regime-geral rejeita com 404. Informar siglaDfe evita listar códigos encerrados.'
        },
        {
            question: 'O Simulador de Split Payment do DevThru substitui a Calculadora de Tributos da Receita Federal?',
            answer: 'Não. O simulador do DevThru roda no navegador, sem enviar dados a servidor, e serve apenas para simular a divisão de repasse líquido e gerar payloads JSON de teste com as alíquotas que você informar. Para cálculo tributário oficial com memória legal e XSD, use os repositórios oficiais da Receita Federal.'
        }
    ]
}
