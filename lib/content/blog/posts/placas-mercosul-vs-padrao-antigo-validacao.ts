import { BlogPost } from '../index'

export const postPlacasMercosulVsAntigo: BlogPost = {
    slug: 'placas-mercosul-vs-padrao-antigo-validacao',
    title: 'Placas Mercosul vs. Padrão Antigo: O que Muda na Validação?',
    description: 'Entenda as diferenças de formato entre o antigo padrão de placas de veículos e o novo padrão Mercosul, e saiba como validá-los e convertê-los usando Regex.',
    date: '2026-06-15',
    author: 'DevThru',
    category: 'automotivo',
    readingTime: 5,
    tags: ['placa de veículo', 'Mercosul', 'validação', 'regex', 'automotivo', 'JavaScript'],
    relatedTools: ['/tools/automotive/license-plate'],
    content: `
<p>Se você desenvolve sistemas que envolvem gestão de frotas, logística, estacionamentos ou qualquer tipo de cadastro de veículos no Brasil, já se deparou com a necessidade de salvar e validar placas de carros e motos.</p>

<p>Desde a adoção definitiva do padrão de <strong>Placas Mercosul</strong>, a validação de placas deixou de ser um simples formato de 3 letras e 4 números. Hoje em dia, os sistemas precisam lidar tanto com placas antigas (que ainda circulam em milhões de veículos) quanto com o novo padrão alfanumérico.</p>

<p>Neste artigo, veremos as diferenças entre os padrões, como fazer a validação ideal usando expressões regulares (Regex) e como converter placas antigas para o padrão Mercosul.</p>

<h2>Diferenças de Estrutura entre os Padrões</h2>

<p>A transição do padrão antigo (conhecido como placa cinza) para o Mercosul foi necessária para aumentar a quantidade de combinações disponíveis e padronizar a identificação veicular entre os países do bloco.</p>

<ul>
  <li><strong>Padrão Antigo (Cinza):</strong> Possui formato fixo <code>LLL-NNNN</code> (3 letras, um hífen opcional, e 4 números). Exemplo: <code>ABC-1234</code>.</li>
  <li><strong>Padrão Mercosul:</strong> Possui formato alfanumérico intercalado <code>LLLNLNN</code> (3 letras, 1 número, 1 letra, e 2 números). Exemplo: <code>ABC1D23</code>.</li>
</ul>

<p>Com essa mudança, o segundo dígito numérico da placa antiga foi substituído por uma letra. Mas essa substituição não é aleatória; ela segue uma tabela oficial de conversão.</p>

<h2>Tabela de Conversão de Números para Letras</h2>

<p>Se um veículo do padrão antigo é transferido de proprietário ou município, ele recebe a placa Mercosul correspondente, onde o segundo número é substituído pela letra equivalente da tabela abaixo:</p>

<table>
  <thead>
    <tr>
      <th>Dígito Numérico Antigo</th>
      <th>Letra Equivalente Mercosul</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>0</td><td>A</td></tr>
    <tr><td>1</td><td>B</td></tr>
    <tr><td>2</td><td>C</td></tr>
    <tr><td>3</td><td>D</td></tr>
    <tr><td>4</td><td>E</td></tr>
    <tr><td>5</td><td>F</td></tr>
    <tr><td>6</td><td>G</td></tr>
    <tr><td>7</td><td>H</td></tr>
    <tr><td>8</td><td>I</td></tr>
    <tr><td>9</td><td>J</td></tr>
  </tbody>
</table>

<p>Dessa forma, a placa antiga <code>ABC-1234</code> se torna <code>ABC1C34</code> no padrão Mercosul (o número 2 foi substituído pela letra C).</p>

<h2>Validando Placas com Expressões Regulares (Regex)</h2>

<p>Para garantir que o usuário insira uma placa em formato válido em seus formulários, podemos utilizar Regex no frontend ou backend. Dependendo da necessidade do seu sistema, existem diferentes padrões:</p>

<h3>1. Validar Apenas Placa Antiga</h3>
<pre><code class="language-javascript">// Aceita formatos como ABC1234 ou ABC-1234
const regexAntiga = /^[A-Z]{3}-?[0-9]{4}$/i;
</code></pre>

<h3>2. Validar Apenas Placa Mercosul</h3>
<pre><code class="language-javascript">// Aceita formatos como ABC1D23 ou ABC1d23 (Mercosul padrão Brasil)
const regexMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i;
</code></pre>

<h3>3. Validação Unificada (Ambos os Padrões)</h3>
<p>A melhor abordagem na maioria dos cadastros é aceitar qualquer um dos dois padrões. Podemos unir as duas expressões usando o operador lógico de alternativa (<code>|</code>):</p>
<pre><code class="language-javascript">const regexPlacaUnificada = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
</code></pre>
<p>Note que o caractere <code>[A-Z0-9]</code> na quinta posição permite tanto um número (padrão antigo) quanto uma letra (padrão Mercosul). Se você também aceitar hífens na placa antiga, a regex fica ligeiramente diferente:</p>
<pre><code class="language-javascript">const regexComHifen = /^([A-Z]{3}-[0-9]{4})|([A-Z]{3}[0-9][A-Z][0-9]{2})$/i;
</code></pre>

<h2>Implementação de uma Função de Validação em JavaScript</h2>

<p>Uma função de validação robusta deve remover caracteres indesejados (deixando apenas letras, números e hífens se aplicável), converter o texto para letras maiúsculas e testar contra as expressões regulares:</p>

<pre><code class="language-javascript">function validarPlacaVeiculo(placa) {
  // Remove espaços extras e converte para maiúsculo
  const cleanPlaca = String(placa).trim().toUpperCase();
  
  // Regex unificada (permite placa cinza sem hífen e placa Mercosul)
  const regexSemHifen = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
  
  // Regex específica para placa antiga com hífen (ex: ABC-1234)
  const regexComHifen = /^[A-Z]{3}-[0-9]{4}$/;

  return regexSemHifen.test(cleanPlaca) || regexComHifen.test(cleanPlaca);
}

// Exemplos de uso
console.log(validarPlacaVeiculo('ABC-1234')); // true (antigo com hífen)
console.log(validarPlacaVeiculo('ABC1234'));  // true (antigo sem hífen)
console.log(validarPlacaVeiculo('ABC1D23'));  // true (Mercosul)
console.log(validarPlacaVeiculo('AB12C34'));  // false (formato inválido)
</code></pre>

<p>Seja qual for o fluxo de transporte ou veículo que você estiver integrando, garantir a validação de placas evita problemas graves de processamento de dados e fraudes na identificação veicular.</p>

<p>Para gerar ou validar placas fictícias para seus testes integrados, acesse a nossa ferramenta de <a href="/tools/automotive/license-plate">Gerador de Placa</a>.</p>
`
}
