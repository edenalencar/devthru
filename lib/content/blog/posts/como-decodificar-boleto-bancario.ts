import { BlogPost } from '../index'

export const postComoDecodificarBoleto: BlogPost = {
    slug: 'como-decodificar-boleto-bancario',
    title: 'Como Decodificar Boleto Bancário Programaticamente (Regra FEBRABAN)',
    description: 'Aprenda como funciona a estrutura de boletos bancários comerciais e de concessionárias. Entenda o cálculo do fator de vencimento, validação de dígitos verificadores e código de barras.',
    date: '2026-07-05',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 9,
    tags: ['boletos', 'FEBRABAN', 'algoritmo', 'finanças', 'JavaScript', 'Python'],
    relatedTools: ['/tools/finance/boleto-validator', '/tools/finance/boleto-generator'],
    content: `
<p>O <strong>boleto bancário</strong> é um dos meios de pagamento mais tradicionais e seguros do mercado brasileiro. Mas, por trás daquela sequência longa de números na linha digitável, existe uma arquitetura lógica e matemática complexa definida pela <strong>FEBRABAN (Federação Brasileira de Bancos)</strong>.</p>

<p>Neste artigo, vamos dissecar o funcionamento da linha digitável e do código de barras de boletos, aprender a calcular a data de vencimento e o valor programaticamente e implementar rotinas de validação completas.</p>

<h2>1. A Diferença entre Linha Digitável e Código de Barras</h2>
<p>Embora representem o mesmo boleto, eles possuem estruturas diferentes:</p>
<ul>
  <li><strong>Código de Barras (44 dígitos):</strong> É a representação binária direta lida pelos scanners. Possui formato corrido.</li>
  <li><strong>Linha Digitável (47 ou 48 dígitos):</strong> Criada para digitação manual quando a leitura óptica não funciona. Possui blocos divididos por pontos e inclui dígitos verificadores em cada bloco para evitar erros de digitação.</li>
</ul>

<h2>2. Anatomia do Boleto Comercial (47 dígitos)</h2>
<p>Um boleto bancário tradicional de cobrança possui a seguinte divisão na linha digitável:</p>
<pre><code class="language-plaintext">AAABC.CCDDX  DDDDD.DDDDDY  EEEEE.EEEEEZ  K  UUUUVVVVVVVVVV
</code></pre>
<ul>
  <li><strong>AAA (Banco Emissor):</strong> Os 3 primeiros dígitos indicam o código de compensação do banco (ex: 001 Banco do Brasil, 341 Itaú).</li>
  <li><strong>B (Moeda):</strong> Indica a moeda do boleto (geralmente 9 para o Real).</li>
  <li><strong>X, Y, Z (DVs dos Blocos):</strong> Dígitos verificadores para validação matemática de cada bloco usando o cálculo do <strong>Módulo 10</strong>.</li>
  <li><strong>K (Dígito Verificador Geral):</strong> Localizado na 33ª posição da linha digitável. Valida toda a estrutura do código de barras de 44 dígitos usando o <strong>Módulo 11</strong>.</li>
  <li><strong>UUUU (Fator de Vencimento):</strong> 4 dígitos que indicam quantos dias se passaram desde a data base FEBRABAN (07/10/1997).</li>
  <li><strong>VVVVVVVVVV (Valor):</strong> Os últimos 10 dígitos indicam o valor do boleto com centavos (ex: <code>0000015000</code> representa R$ 150,00).</li>
</ul>

<h2>3. Calculando o Vencimento e o Estouro do Fator</h2>
<p>O fator de vencimento é uma contagem de dias iniciada em 07/10/1997. No entanto, o fator possui limite de 4 dígitos (máximo 9999). 
Em <strong>22 de Fevereiro de 2025</strong>, a contagem atingiu o fator 9999 e estourou. Seguindo a regra oficial da FEBRABAN, o fator reiniciou em 1000 a partir de 23 de Fevereiro de 2025.</p>
<p>Para ler o vencimento de boletos em 2026 e anos seguintes, a sua rotina deve ajustar essa contagem de ciclos somando 9000 dias caso o fator resultante calcule uma data anterior ao estouro. Veja isso implementado no snippet de código a seguir.</p>

<h2>4. Implementação Prática em JavaScript</h2>
<p>Abaixo está um snippet completo de código em JavaScript para decodificar dados de um boleto de cobrança:</p>

<pre><code class="language-javascript">function decodificarBoletoComercial(linha) {
    const cleaned = linha.replace(/\\D/g, "");
    if (cleaned.length !== 47) return null;

    // Extrai o código do banco emissor
    const banco = cleaned.substring(0, 3);
    
    // Calcula a data de vencimento
    const fator = parseInt(cleaned.substring(33, 37));
    let vencimento = "Sem vencimento";
    if (fator >= 1000) {
        const dataBase = new Date(1997, 9, 7); // 07/10/1997
        let dataVenc = new Date(dataBase.getTime() + fator * 24 * 60 * 60 * 1000);
        
        // Ajuste de ciclo FEBRABAN pós-2025
        const corteEstouro = new Date(2025, 1, 22);
        if (dataVenc < corteEstouro) {
            dataVenc = new Date(dataVenc.getTime() + 9000 * 24 * 60 * 60 * 1000);
        }
        vencimento = dataVenc.toLocaleDateString("pt-BR");
    }

    // Calcula o valor
    const valorCentavos = parseInt(cleaned.substring(37, 47));
    const valor = valorCentavos / 100;

    return { banco, vencimento, valor };
}
</code></pre>

<h2>5. Boletos de Concessionárias e Tributos (48 dígitos)</h2>
<p>Os boletos de concessionárias (água, luz, telefone) e tributos (IPTU, IPVA, taxas de órgãos municipais/estaduais) seguem uma regra diferente. Eles começam com o dígito <strong>8</strong> e possuem 48 dígitos organizados em 4 blocos de 12.
A validação de cada bloco pode ser feita por Módulo 10 ou Módulo 11 dependendo do terceiro dígito do código do boleto.</p>

<h2>Erros Comuns na Validação de Boletos</h2>
<ol>
  <li><strong>Não sanitizar strings:</strong> Pontos, hífens e espaços são incluídos apenas para legibilidade humana. Certifique-se de removê-los com regex (ex: <code>replace(/\\D/g, "")</code>) antes de processar o cálculo.</li>
  <li><strong>Ignorar o estouro do fator de vencimento:</strong> Rotinas antigas de e-commerce e ERP que não ajustam a regra de estouro de 2025 calcularão vencimentos errados em 2026. Mantenha seu backend atualizado.</li>
  <li><strong>Confundir Módulo 10 e Módulo 11:</strong> Lembre-se que cada bloco da linha comercial usa Módulo 10, mas o DV Geral do código de barras de 44 dígitos usa Módulo 11.</li>
</ol>
`,
    faqs: [
        {
            question: 'O que é o fator de vencimento do boleto?',
            answer: 'O fator de vencimento é um número de 4 dígitos contido no boleto que representa a quantidade de dias passados desde a data base de 07/10/1997, permitindo que os sistemas de pagamento leiam a data de vencimento de forma padronizada.'
        },
        {
            question: 'Qual a diferença entre boleto comercial e de concessionária?',
            answer: 'O boleto comercial (cobrança bancária tradicional) possui 47 dígitos e é emitido por bancos. O boleto de concessionária possui 48 dígitos, começa com o número 8, e serve para pagar contas de serviços básicos (água, energia, gás, telefone) e tributos públicos.'
        },
        {
            question: 'Como se calcula a data de vencimento após o estouro do fator em 2025?',
            answer: 'Após o fator atingir 9999 em 22/02/2025, ele reiniciou em 1000. Para fins de cálculo, se a data obtida for menor que 22/02/2025 em sistemas modernos, deve-se somar 9000 dias adicionais à contagem para realinhar a data ao novo ciclo de vencimentos da FEBRABAN.'
        }
    ]
}
