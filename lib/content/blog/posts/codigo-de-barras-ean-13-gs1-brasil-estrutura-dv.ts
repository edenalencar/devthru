import { BlogPost } from '../index'

export const postCodigoDeBarrasEan13Gs1BrasilEstruturaDv: BlogPost = {
    slug: 'codigo-de-barras-ean-13-gs1-brasil-estrutura-dv',
    title: 'Código de Barras EAN-13 e GS1: Estrutura e Cálculo do Dígito Verificador',
    description: 'Entenda a anatomia do código de barras EAN-13 (GTIN), o significado dos prefixos brasileiros 789 e 790 e o algoritmo oficial do dígito verificador.',
    date: '2026-10-30',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['EAN-13', 'Código de Barras', 'GS1', 'E-commerce', 'ERP', 'NF-e', 'Logística'],
    relatedTools: ['/tools/utilities/barcode-generator', '/tools/business/nfe-decoder'],
    content: `
<p>Seja em gôndolas de supermercados, etiquetas de logística ou no preenchimento do campo obrigatório <code>cEAN</code> em Notas Fiscais Eletrônicas (NF-e), o código de barras <strong>EAN-13 (European Article Number)</strong> é a representação numérica e ótica mais utilizada no planeta para identificar produtos comerciais de forma exclusiva.</p>

<p>Gerenciado globalmente pela <strong>GS1</strong>, o código EAN-13 (também denominado comercialmente como <strong>GTIN-13</strong> - <em>Global Trade Item Number</em>) possui uma estrutura padronizada rigorosa. Neste artigo técnico, desvendamos como esses 13 dígitos são divididos e como funciona o algoritmo matemático do dígito verificador.</p>

<h2>1. A Anatomia dos 13 Dígitos do EAN-13</h2>

<p>Um código EAN-13 é composto por quatro blocos funcionais:</p>

<table>
  <thead>
    <tr>
      <th>Posição</th>
      <th>Segmento</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dígitos 1 a 3</strong></td>
      <td>Prefixo do País (GS1 Member)</td>
      <td>Identifica a organização nacional da GS1. No Brasil, os prefixos são <strong>789</strong> e <strong>790</strong>.</td>
    </tr>
    <tr>
      <td><strong>Dígitos 4 a 8 / 9</strong></td>
      <td>Código da Empresa (Fabricante)</td>
      <td>Número de licença atribuído pela GS1 à indústria ou importador.</td>
    </tr>
    <tr>
      <td><strong>Dígitos 9 / 10 a 12</strong></td>
      <td>Código do Produto (Item)</td>
      <td>Numeração livre atribuída pelo fabricante para identificar cada SKU, cor ou tamanho.</td>
    </tr>
    <tr>
      <td><strong>Dígito 13</strong></td>
      <td>Dígito Verificador (DV)</td>
      <td>Calculado matematicamente com o algoritmo Módulo 10 para evitar erros de digitação e leitura ótica.</td>
    </tr>
  </tbody>
</table>

<div class="info-box">
  <strong>📌 Mito Comum:</strong> O prefixo 789 não significa necessariamente que o produto foi fisicamente fabricado no Brasil, mas sim que a empresa detentora da marca está filiada à GS1 Brasil.
</div>

<h2>2. O Algoritmo do Dígito Verificador (Módulo 10 GS1)</h2>

<p>O 13º dígito do código é gerado através de um cálculo ponderado oficial estabelecido pela GS1. Para os 12 primeiros dígitos (da esquerda para a direita):</p>

<ol>
  <li>Dígitos em <strong>posições ímpares</strong> (1ª, 3ª, 5ª, 7ª, 9ª, 11ª) têm peso <strong>1</strong>.</li>
  <li>Dígitos em <strong>posições pares</strong> (2ª, 4ª, 6ª, 8ª, 10ª, 12ª) têm peso <strong>3</strong>.</li>
  <li>Multiplicam-se os dígitos por seus respectivos pesos e soma-se o resultado.</li>
  <li>O dígito verificador é o número necessário para alcançar o próximo múltiplo de 10. Se a soma já for múltiplo de 10, o DV é <strong>0</strong>.</li>
</ol>

<h3>Exemplo Prático de Cálculo:</h3>
<p>Vamos calcular o DV do produto brasileiro <code>789100031550</code>:</p>

<pre><code>Posição:  1  2  3  4  5  6  7  8  9 10 11 12
Dígito:   7  8  9  1  0  0  0  3  1  5  5  0
Peso:    x1 x3 x1 x3 x1 x3 x1 x3 x1 x3 x1 x3
---------------------------------------------
Subtotal: 7+24 +9 +3 +0 +0 +0 +9 +1+15 +5 +0 = 73

Próximo múltiplo de 10: 80
Dígito Verificador (80 - 73) = 7!
Código EAN-13 completo: 7891000315507</code></pre>

<h2>3. Implementação em TypeScript / JavaScript</h2>

<pre><code class="language-typescript">export function calculateEan13Checksum(digits12: string): number {
  const clean = digits12.replace(/\D/g, "");
  if (clean.length &lt; 12) return -1;

  let sum = 0;
  for (let i = 0; i &lt; 12; i++) {
    const val = parseInt(clean[i], 10);
    sum += (i % 2 === 0) ? val * 1 : val * 3;
  }

  const mod = sum % 10;
  return mod === 0 ? 0 : 10 - mod;
}</code></pre>

<h2>4. EAN-13 vs Code 128: Quando Usar Cada Um?</h2>

<ul>
  <li><strong>EAN-13:</strong> Obrigatório para itens comerciais de consumo que passam pelo checkout de caixas de supermercados e PDVs (leitores laser e scanners de balcão). Comprimento estritamente fixo de 13 dígitos numéricos.</li>
  <li><strong>Code 128:</strong> Padrão de alta densidade alfanumérico (aceita letras, números e caracteres especiais). Ideal para rastreamento interno de encomendas, controle de estoque em almoxarifados, números de série e etiquetas de transporte (como Sedex e transportadoras).</li>
</ul>

<p>Para gerar e baixar códigos de barras vetoriais prontos para impressão em SVG ou PNG, utilize o <a href="/tools/utilities/barcode-generator">Gerador de Código de Barras do DevThru</a>.</p>
`
}
