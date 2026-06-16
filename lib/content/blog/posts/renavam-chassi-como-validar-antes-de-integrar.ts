import { BlogPost } from '../index'

export const postRenavamChassiValidacao: BlogPost = {
    slug: 'renavam-chassi-como-validar-antes-de-integrar',
    title: 'RENAVAM e Chassi: Para que Servem e Como Validar Dados Veiculares',
    description: 'Entenda a finalidade do RENAVAM e do Chassi (VIN) na gestão veicular e aprenda a validá-los corretamente antes de integrá-los no seu sistema.',
    date: '2026-06-13',
    author: 'DevThru',
    category: 'automotivo',
    readingTime: 6,
    tags: ['RENAVAM', 'Chassi', 'validação', 'automotivo', 'JavaScript', 'TypeScript'],
    relatedTools: ['/tools/automotive/renavam', '/tools/automotive/chassi'],
    content: `
<p>No setor automotivo e logístico, dois documentos são fundamentais para identificar qualquer veículo no Brasil: o <strong>RENAVAM</strong> e o <strong>Chassi (VIN)</strong>. Se você trabalha em sistemas de seguros, compra e venda de veículos, frotas ou e-commerce de autopeças, precisa garantir que esses dados sejam inseridos corretamente.</p>

<p>Salvar um RENAVAM inválido ou um Chassi mal formatado no banco de dados pode travar integrações com APIs do Detran ou órgãos de trânsito (como Serpro e Denatran) no momento de emitir guias, checar multas ou realizar transferências.</p>

<p>Neste artigo, explicamos o papel de cada identificador e como estruturar validações eficientes em JavaScript/TypeScript.</p>

<h2>O que é o RENAVAM e Como Validar</h2>

<p>O <strong>RENAVAM (Registro Nacional de Veículos Automotores)</strong> funciona como o "CPF" do veículo. Ele armazena todo o histórico físico e legal do carro ou moto (como cor, potência, multas, pendências e IPVA).</p>

<p>Atualmente, o número do RENAVAM possui <strong>11 dígitos</strong>, sendo o último o dígito verificador (DV). A validação matemática segue uma variação do algoritmo de **módulo 11**:</p>

<h3>Algoritmo de validação do RENAVAM:</h3>
<ol>
  <li>Preencha o número com zeros à esquerda se ele tiver menos de 11 caracteres.</li>
  <li>Multiplique os primeiros 10 dígitos pelos pesos correspondentes: <code>3, 2, 9, 8, 7, 6, 5, 4, 3, 2</code>.</li>
  <li>Some os resultados dessas multiplicações.</li>
  <li>Multiplique a soma por 10 e divida o resultado por 11.</li>
  <li>O resto da divisão é o Dígito Verificador. Se o resto for igual a 10, o DV passa a ser 0.</li>
  <li>Compare o DV calculado com o último dígito do RENAVAM original.</li>
</ol>

<h3>Implementação em JavaScript:</h3>
<pre><code class="language-javascript">function validarRenavam(renavam) {
  const cleanRenavam = String(renavam).replace(/\\D/g, '');
  
  if (cleanRenavam.length !== 11) return false;

  // Rejeita padrões com dígitos todos iguais
  if (/^(\\d)\\1{10}$/.test(cleanRenavam)) return false;

  const renavamSemDV = cleanRenavam.substring(0, 10);
  let soma = 0;
  
  // Pesos oficiais para cálculo
  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 10; i++) {
    soma += parseInt(renavamSemDV.charAt(i), 10) * pesos[i];
  }

  let digitoCalculado = (soma * 10) % 11;
  if (digitoCalculado === 10) digitoCalculado = 0;

  const digitoOriginal = parseInt(cleanRenavam.charAt(10), 10);
  return digitoCalculado === digitoOriginal;
}
</code></pre>

<h2>O que é o Chassi (VIN) e Como Validar</h2>

<p>O <strong>Chassi (VIN - Vehicle Identification Number)</strong> é uma sequência de <strong>17 caracteres alfanuméricos</strong> gravada diretamente no metal estrutural do veículo. É um padrão global regulado pela ISO 3779 que atua como a "certidão de nascimento" do automóvel.</p>

<p>A estrutura de 17 caracteres é dividida em três seções principais:</p>
<ul>
  <li><strong>WMI (World Manufacturer Identifier)</strong>: Primeiros 3 caracteres. Identificam a região geográfica, país e fabricante.</li>
  <li><strong>VDS (Vehicle Descriptor Section)</strong>: Posições 4 a 9. Informam os atributos de fábrica (modelo, tipo de motor, cabine).</li>
  <li><strong>VIS (Vehicle Indicator Section)</strong>: Posições 10 a 17. Informam o ano de fabricação, código da planta fabril e número sequencial de série.</li>
</ul>

<div class="info-box">
  <strong>⚠️ Regra de Ouro:</strong> Para evitar confusões de leitura com números, os caracteres alfanuméricos do Chassi <strong>nunca</strong> devem conter as letras <strong>I, O e Q</strong> (pois se parecem visualmente com os números 1 e 0).
</div>

<h3>Validando o Chassi com Regex:</h3>
<p>Diferente do RENAVAM, a validação de Chassi em sistemas comerciais brasileiros geralmente foca na estrutura formal dos caracteres e do tamanho (17 caracteres, sem as letras proibidas I, O, Q):</p>

<pre><code class="language-javascript">function validarChassi(chassi) {
  const cleanChassi = String(chassi).trim().toUpperCase();
  
  // Garante 17 caracteres alfanuméricos excluindo as letras I, O, Q
  const regexChassi = /^[A-HJ-NPR-Z0-9]{17}$/;
  
  return regexChassi.test(cleanChassi);
}

// Exemplos de uso
console.log(validarChassi('9BWZZZ99Z99999999')); // true (Válido)
console.log(validarChassi('9BWIZZZ9Z99999999')); // false (Contém a letra 'I' proibida)
console.log(validarChassi('9BWZZZ99Z'));          // false (Tamanho incorreto)
</code></pre>

<h2>Por que Validar Antes de Enviar ao Banco?</h2>

<p>Evitar erros de digitação de RENAVAM e Chassi no cadastro do veículo poupa tempo operacional e previne erros de comunicação com bancos de dados do Detran. Adicionar essas validações simples no formulário do seu sistema melhora consideravelmente a consistência do banco de dados.</p>

<p>Para gerar massa de dados válida para homologação ou validar números sob demanda, acesse nossas ferramentas:</p>
<ul>
  <li>Gere e teste registros de chassi no nosso <a href="/tools/automotive/chassi">Gerador de Chassi</a>.</li>
  <li>Obtenha registros válidos de renavam no nosso <a href="/tools/automotive/renavam">Gerador de RENAVAM</a>.</li>
</ul>
`
}
