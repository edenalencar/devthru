import { BlogPost } from '../index'

export const postInscricaoEstadualGuia: BlogPost = {
    slug: 'inscricao-estadual-o-que-e-como-validar',
    title: 'Inscrição Estadual: O Que É, Para Que Serve e Como Validar por Estado',
    description: 'Entenda o que é a Inscrição Estadual, como ela varia por estado, as regras de validação e como gerar números válidos para testes de software.',
    date: '2026-02-26',
    author: 'DevThru',
    category: 'documentos',
    readingTime: 8,
    tags: ['Inscrição Estadual', 'ICMS', 'SEFAZ', 'documentos brasileiros', 'nota fiscal', 'validação'],
    relatedTools: ['/tools/documents/inscricao-estadual', '/tools/documents/cnpj'],
    content: `
<p>A <strong>Inscrição Estadual (IE)</strong> é o registro obrigatório para empresas que comercializam produtos e pagam <strong>ICMS</strong>. Se você desenvolve sistemas fiscais, ERPs ou e-commerces, precisa entender como a IE funciona — e por que ela é tão complexa.</p>

<p>Neste guia, vamos explicar o que é a IE, por que cada estado tem regras diferentes, como validar e como gerar números válidos para testes.</p>

<h2>O Que É a Inscrição Estadual?</h2>

<p>A Inscrição Estadual é um <strong>número de registro no cadastro de contribuintes do ICMS</strong> mantido pela <strong>SEFAZ (Secretaria da Fazenda)</strong> de cada estado. Funciona como um "CPF da empresa" para fins de impostos estaduais.</p>

<p>Toda empresa que <strong>vende produtos</strong> ou <strong>presta serviços de transporte e comunicação</strong> precisa de uma IE. Prestadores de serviço puros (que pagam ISS em vez de ICMS) são <strong>isentos</strong>.</p>

<div class="info-box">
<strong>💡 IE vs. CNPJ:</strong> O CNPJ é federal e identifica a empresa na Receita Federal. A IE é estadual e identifica o contribuinte na SEFAZ do seu estado. Uma empresa pode ter <strong>múltiplas IEs</strong> se operar em estados diferentes.
</div>

<h2>Por Que a IE É Tão Complexa para Desenvolvedores?</h2>

<p>Ao contrário do CPF e CNPJ (que seguem um único padrão nacional), a IE tem <strong>27 formatos diferentes</strong> — um para cada estado. Isso significa:</p>

<ul>
<li>Cada estado tem um <strong>número diferente de dígitos</strong> (de 8 a 14)</li>
<li>As <strong>máscaras de formatação</strong> variam entre estados</li>
<li>Os <strong>algoritmos de validação</strong> do dígito verificador são diferentes</li>
<li>Alguns estados usam letras (ex: São Paulo para indústria/comércio)</li>
</ul>

<h2>Formato por Estado</h2>

<p>Veja os formatos mais comuns:</p>

<table>
<thead>
<tr><th>Estado</th><th>UF</th><th>Formato</th><th>Dígitos</th><th>Exemplo</th></tr>
</thead>
<tbody>
<tr><td>São Paulo</td><td>SP</td><td>NNN.NNN.NNN.NNN</td><td>12</td><td>110.042.490.114</td></tr>
<tr><td>Rio de Janeiro</td><td>RJ</td><td>NN.NNN.NN-N</td><td>8</td><td>77.281.42-3</td></tr>
<tr><td>Minas Gerais</td><td>MG</td><td>NNN.NNN.NNN/NNNN</td><td>13</td><td>062.307.904/0081</td></tr>
<tr><td>Bahia</td><td>BA</td><td>NNN.NNN.NNN</td><td>9</td><td>123.456.789</td></tr>
<tr><td>Paraná</td><td>PR</td><td>NNN.NNNNN-NN</td><td>10</td><td>123.45678-50</td></tr>
<tr><td>Rio Grande do Sul</td><td>RS</td><td>NNN/NNNNNNN</td><td>10</td><td>224/0658949</td></tr>
<tr><td>Distrito Federal</td><td>DF</td><td>NNNNNNNNNNNNN</td><td>13</td><td>0730000100109</td></tr>
</tbody>
</table>

<h2>Onde a IE Aparece em Sistemas Fiscais?</h2>

<p>A Inscrição Estadual é obrigatória em diversos documentos fiscais eletrônicos:</p>

<h3>NF-e (Nota Fiscal Eletrônica)</h3>
<p>O campo <code>&lt;IE&gt;</code> do emitente é obrigatório. Se estiver ausente ou inválido, a SEFAZ rejeita a nota com o erro <strong>212 — "IE do emitente não cadastrada"</strong>.</p>

<pre><code class="language-xml">&lt;emit&gt;
    &lt;CNPJ&gt;11222333000181&lt;/CNPJ&gt;
    &lt;xNome&gt;Empresa Exemplo LTDA&lt;/xNome&gt;
    &lt;IE&gt;110042490114&lt;/IE&gt;
    &lt;CRT&gt;1&lt;/CRT&gt;
&lt;/emit&gt;</code></pre>

<h3>CT-e (Conhecimento de Transporte)</h3>
<p>Obrigatória para transportadoras. O campo segue o mesmo padrão do NF-e.</p>

<h3>SPED Fiscal</h3>
<p>A IE é chave para cruzamento de dados fiscais. Inconsistências entre IE e CNPJ geram notificações da SEFAZ.</p>

<h2>Como Validar uma Inscrição Estadual</h2>

<p>A validação de IE é mais complexa que CPF/CNPJ porque cada estado tem seu próprio algoritmo. Veja o exemplo para São Paulo:</p>

<h3>Validação para SP (12 dígitos)</h3>

<pre><code class="language-javascript">function validarIE_SP(ie) {
    // Remove formatação
    ie = ie.replace(/\\D/g, '');
    
    if (ie.length !== 12) return false;
    
    // Primeiro dígito verificador (posição 9)
    const pesos1 = [1, 3, 4, 5, 6, 7, 8, 10];
    let soma = 0;
    for (let i = 0; i < 8; i++) {
        soma += parseInt(ie[i]) * pesos1[i];
    }
    let resto = soma % 11;
    let dig1 = resto < 10 ? resto : 0;
    
    if (parseInt(ie[8]) !== dig1) return false;
    
    // Segundo dígito verificador (posição 12)
    const pesos2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    soma = 0;
    for (let i = 0; i < 11; i++) {
        soma += parseInt(ie[i]) * pesos2[i];
    }
    resto = soma % 11;
    let dig2 = resto < 10 ? resto : 0;
    
    return parseInt(ie[11]) === dig2;
}

console.log(validarIE_SP('110042490114')); // true</code></pre>

<h3>Abordagem Genérica</h3>

<p>Para validar IE de qualquer estado, você pode usar bibliotecas que já implementam os 27 algoritmos:</p>

<pre><code class="language-javascript">// Node.js: usando a lib 'br-validations'
// npm install br-validations
const { validateIE } = require('br-validations');

console.log(validateIE('110042490114', 'SP')); // true
console.log(validateIE('77281423', 'RJ'));      // true</code></pre>

<pre><code class="language-python"># Python: usando a lib 'validate-docbr'
# pip install validate-docbr
from validate_docbr import IE

ie = IE()
print(ie.validate('110042490114'))  # True</code></pre>

<h2>Situações Cadastrais da IE</h2>

<p>Uma IE pode ter diferentes status na SEFAZ:</p>

<table>
<thead>
<tr><th>Status</th><th>Significado</th><th>Impacto</th></tr>
</thead>
<tbody>
<tr><td><strong>Ativa</strong></td><td>Contribuinte regular</td><td>Pode emitir NF-e normalmente</td></tr>
<tr><td><strong>Suspensa</strong></td><td>Temporariamente inativa</td><td>Não pode emitir NF-e</td></tr>
<tr><td><strong>Cassada</strong></td><td>Cancelada pela SEFAZ</td><td>Empresa com irregularidades graves</td></tr>
<tr><td><strong>Nula</strong></td><td>Anulada (nunca deveria existir)</td><td>Registro inválido desde a origem</td></tr>
<tr><td><strong>Baixada</strong></td><td>Empresa encerrou atividades</td><td>IE permanentemente inativa</td></tr>
</tbody>
</table>

<div class="info-box">
<strong>⚠️ Para testes:</strong> Ao testar sistemas fiscais, use IEs geradas por ferramentas de teste. Nunca use IEs reais de empresas em desenvolvimento — isso pode gerar problemas com a SEFAZ.
</div>

<h2>IE Isenta e Não Contribuinte</h2>

<p>Nem todos os destinatários de uma NF-e têm IE. Nesses casos:</p>

<ul>
<li><strong>ISENTO</strong> — Empresa isenta de IE (ex: prestadores de serviço puros)</li>
<li><strong>Não Contribuinte</strong> — Pessoa física ou empresa sem atividade de ICMS</li>
</ul>

<p>Na NF-e, isso é representado pelo campo <code>&lt;indIEDest&gt;</code>:</p>

<pre><code class="language-xml">&lt;!-- 1 = Contribuinte ICMS (informar IE) --&gt;
&lt;indIEDest&gt;1&lt;/indIEDest&gt;
&lt;IE&gt;110042490114&lt;/IE&gt;

&lt;!-- 2 = Contribuinte Isento --&gt;
&lt;indIEDest&gt;2&lt;/indIEDest&gt;

&lt;!-- 9 = Não Contribuinte --&gt;
&lt;indIEDest&gt;9&lt;/indIEDest&gt;</code></pre>

<h2>Perguntas Frequentes</h2>

<h3>MEI precisa de Inscrição Estadual?</h3>
<p>Sim, se o MEI vender produtos. A IE é obtida automaticamente ao se registrar como MEI em atividades de comércio. MEIs de serviços são isentos.</p>

<h3>Uma empresa pode ter mais de uma IE?</h3>
<p>Sim. Empresas que operam em múltiplos estados podem ter uma IE em cada estado onde possuem estabelecimento. Cada filial com CNPJ diferente terá sua própria IE.</p>

<h3>Como consultar a situação cadastral de uma IE?</h3>
<p>Através do portal <strong>SINTEGRA</strong> (<a href="http://www.sintegra.gov.br" target="_blank" rel="noopener noreferrer">sintegra.gov.br</a>) ou diretamente no site da SEFAZ do estado. A consulta é gratuita e retorna dados do contribuinte.</p>
`
}
