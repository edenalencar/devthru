import { BlogPost } from '../index'

export const postCnab240VsCnab400DiferencasEstruturaPosicional: BlogPost = {
    slug: 'cnab-240-vs-cnab-400-diferencas-e-estrutura-posicional',
    title: 'CNAB 240 vs CNAB 400: Diferenças e Estrutura',
    description: 'Entenda as diferenças entre os padrões CNAB 240 e CNAB 400 da FEBRABAN. Aprenda a estrutura posicional dos arquivos de remessa e retorno bancário.',
    date: '2026-07-22',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 7,
    tags: ['CNAB', 'CNAB 240', 'CNAB 400', 'FEBRABAN', 'boletos', 'bancos', 'fintech'],
    relatedTools: ['/tools/finance/cnab-parser', '/tools/finance/boleto-validator', '/tools/finance/boleto-generator'],
    content: `
<p>Se você desenvolve sistemas de gestão financeira (ERP), plataformas de e-commerce, módulos de cobrança ou trabalhou na integração de um banco brasileiro, com certeza já se deparou com arquivos de extensão <code>.rem</code> (Remessa) ou <code>.ret</code> (Retorno). Esses arquivos são baseados no padrão <strong>CNAB (Centro Nacional de Automação Bancária)</strong> da <strong>FEBRABAN (Federação Brasileira de Bancos)</strong>.</p>

<p>Embora existam APIs bancárias modernas via Pix e Open Finance, os padrões CNAB continuam sendo a espinha dorsal de cobranças por boleto, pagamentos em lote de salários, fornecedores e conciliação bancária massiva no Brasil.</p>

<p>Neste artigo, vamos comparar detalhadamente os dois principais formatos utilizados no mercado: o <strong>CNAB 240</strong> e o <strong>CNAB 400</strong>, explorando suas diferenças de layout, hierarquia de registros e cenários de uso.</p>

<h2>O que é um Arquivo Posicional CNAB?</h2>

<p>Diferente de formatos modernos como JSON ou XML, um arquivo CNAB é um arquivo de texto puro (UTF-8 ou ASCII) baseado em <strong>largura de colunas fixa (posicional)</strong>. Isso significa que cada campo possui uma posição de início e fim rigorosamente definida por contrato.</p>

<ul>
  <li><strong>Colunas / Posicionamento:</strong> Se o código do banco fica nas colunas <code>001 a 003</code>, os 3 primeiros caracteres da linha sempre representarão o número da instituição financeira (ex: <code>001</code> para Banco do Brasil, <code>341</code> para Itaú, <code>237</code> para Bradesco).</li>
  <li><strong>Preenchimento:</strong> Campos numéricos são alinhados à direita e preenchidos com zeros à esquerda. Campos alfanuméricos são alinhados à esquerda e preenchidos com espaços em branco à direita.</li>
  <li><strong>Tolerância a Erros:</strong> Zero. Um único caractere adicionado ou removido desloca todos os campos subsequentes da linha, fazendo o banco rejeitar o arquivo inteiro.</li>
</ul>

<div class="info-box">
  <strong>💡 Dica:</strong> Se você precisa inspecionar e validar arquivos de remessa ou retorno sem precisar contar colunas manualmente no bloco de notas, utilize nosso <a href="/tools/finance/cnab-parser">Leitor e Decodificador de CNAB Online</a>.
</div>

<h2>Tabela Comparativa: CNAB 240 vs CNAB 400</h2>

<table>
  <thead>
    <tr>
      <th>Característica</th>
      <th>CNAB 240</th>
      <th>CNAB 400</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Comprimento da Linha</strong></td>
      <td>240 caracteres exatamente por linha</td>
      <td>400 caracteres exatamente por linha</td>
    </tr>
    <tr>
      <td><strong>Estrutura de Hierarquia</strong></td>
      <td>Multi-nível (Header de Arquivo, Header de Lote, Segmentos, Trailer de Lote, Trailer de Arquivo)</td>
      <td>Simples (Header de Arquivo, Registros Detalhe Tipo 1, Trailer de Arquivo)</td>
    </tr>
    <tr>
      <td><strong>Tipos de Operação</strong></td>
      <td>Cobrança, Pagamento de salários/fornecedores, PIX, Custódia de cheques, Extrato para conciliação</td>
      <td>Focado primariamente em Cobrança Bancária (Emissão e Liquidação de Boletos)</td>
    </tr>
    <tr>
      <td><strong>Flexibilidade</strong></td>
      <td>Alta (Permite misturar diferentes tipos de serviço no mesmo arquivo via lotes)</td>
      <td>Baixa (Um arquivo por carteira/serviço)</td>
    </tr>
    <tr>
      <td><strong>Adotado por</strong></td>
      <td>Bancos públicos (Caixa, BB) e novos serviços de pagamentos em lote</td>
      <td>Amplo legado em grandes bancos privados (Itaú, Bradesco, Santander)</td>
    </tr>
  </tbody>
</table>

<h2>Anatomia Estrutural do CNAB 400</h2>

<p>O <strong>CNAB 400</strong> é uma estrutura mais antiga e simples. Cada linha possui exatos 400 caracteres e o arquivo é dividido em 3 partes principais:</p>

<ol>
  <li><strong>Header do Arquivo (Registro Tipo 0):</strong> Primeira linha do arquivo. Contém a identificação da empresa (CNPJ, Razão Social), o código do banco, a data de geração e a identificação do serviço de cobrança.</li>
  <li><strong>Registros Detalhe (Registro Tipo 1):</strong> Linhas intermediárias. Cada linha representa um título de cobrança (boleto). Contém o Nosso Número, data de vencimento, valor do título, juros, multa, dados do pagador (sacado) e código de ocorrência.</li>
  <li><strong>Trailer do Arquivo (Registro Tipo 9):</strong> Última linha. Contém a contagem total de linhas do arquivo e o valor total acumulado dos títulos.</li>
</ol>

<pre><code class="language-text">01REMESSA01COBRANCA       00000000000000123456EMPRESA EXEMPLO LTDA       237BRADESCO       2207260000001... (Header - 400 caracteres)
10201234567890000000000123456789... (Registro Detalhe Boleto 1 - 400 caracteres)
10201234567890000000000123456789... (Registro Detalhe Boleto 2 - 400 caracteres)
9                                                                                              (Trailer - 400 caracteres)
</code></pre>

<h2>Anatomia Estrutural do CNAB 240</h2>

<p>O <strong>CNAB 240</strong> introduziu o conceito de <strong>Lotes e Segmentos</strong>. Cada linha possui 240 caracteres e o arquivo é organizado em uma árvore hierárquica:</p>

<ul>
  <li><strong>Header de Arquivo (Tipo de Registro 0):</strong> Identifica a empresa e o banco emissor do arquivo global.</li>
  <li><strong>Header de Lote (Tipo de Registro 1):</strong> Inicia um lote específico (ex: Lote de Pagamento de Salários ou Lote de Cobrança).</li>
  <li><strong>Registros de Detalhe / Segmentos (Tipo de Registro 3):</strong>
    <ul>
      <li><strong>Segmento P:</strong> Dados do título, Nosso Número, vencimento, valor.</li>
      <li><strong>Segmento Q:</strong> Dados do pagador (Nome, CPF/CNPJ, Endereço, CEP).</li>
      <li><strong>Segmento R:</strong> Descontos, multas, chave Pix ou dados adicionais.</li>
      <li><strong>Segmento A / B / J:</strong> Utilizados em transferências TED/PIX e pagamento de títulos/tributos.</li>
    </ul>
  </li>
  <li><strong>Trailer de Lote (Tipo de Registro 5):</strong> Fecha o lote e traz o totalizador de títulos daquele serviço.</li>
  <li><strong>Trailer de Arquivo (Tipo de Registro 9):</strong> Última linha do arquivo que encerra a transmissão.</li>
</ul>

<h2>Remessa vs Retorno: Como Funciona o Fluxo Bancário</h2>

<p>A comunicação via CNAB é bidirecional entre o ERP da empresa e a plataforma do banco:</p>

<ul>
  <li><strong>Arquivo de Remessa (<code>.REM</code>):</strong> Gerado pela sua aplicação e enviado ao banco. Instrui o banco a registrar novos boletos, cancelar títulos, alterar vencimentos ou agendar pagamentos.</li>
  <li><strong>Arquivo de Retorno (<code>.RET</code>):</strong> Gerado pelo banco e baixado pela sua aplicação. Informa quais boletos foram liquidados (pagos pelo cliente), quais foram rejeitados por erro de cadastro e quais tarifas foram cobradas.</li>
</ul>

<h2>Conclusão</h2>

<p>Entender a diferença entre CNAB 240 e CNAB 400 é essencial ao arquitetar integrações financeiras no Brasil. Enquanto o CNAB 400 oferece simplicidade direta para emissão de boletos simples, o CNAB 240 traz poder para gerenciar múltiplos serviços bancários em um único fluxo automatizado.</p>

<p>Precisa validar o formato de um arquivo CNAB ou encontrar erros de alinhamento de colunas? Teste agora o nosso <a href="/tools/finance/cnab-parser">Leitor e Decodificador de CNAB Gratuito</a>!</p>
`,
    faqs: [
        {
            question: 'Qual a principal diferença entre CNAB 240 e CNAB 400?',
            answer: 'O CNAB 240 possui linhas de 240 caracteres e estrutura em lotes com segmentos (P, Q, R, A, B), sendo mais flexível. O CNAB 400 possui linhas de 400 caracteres e estrutura simples, sendo focado em cobrança por boleto.'
        },
        {
            question: 'O que são arquivos de Remessa e Retorno?',
            answer: 'Remessa (.rem) é o arquivo gerado pela empresa e enviado ao banco para registrar ou alterar cobranças. Retorno (.ret) é o arquivo enviado pelo banco informando quais boletos foram pagos ou rejeitados.'
        }
    ]
}
