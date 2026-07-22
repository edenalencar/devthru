import { BlogPost } from '../index'

export const postEntendendoDigitosVerificadoresTituloDeEleitor: BlogPost = {
    slug: 'entendendo-digitos-verificadores-titulo-de-eleitor-algoritmo',
    title: 'Validação do Título de Eleitor',
    description: 'Entenda o algoritmo de validação do Título de Eleitor brasileiro. Conheça a estrutura dos 12 dígitos, os códigos de UF e o cálculo do Módulo 11 com exceções.',
    date: '2026-07-22',
    author: 'DevThru',
    category: 'documentos',
    readingTime: 6,
    tags: ['Título de Eleitor', 'validação', 'algoritmo', 'documentos brasileiros', 'Módulo 11', 'TSE'],
    relatedTools: ['/tools/documents/titulo-eleitor'],
    content: `
<p>O <strong>Título de Eleitor</strong> é o documento emitido pela Justiça Eleitoral (TSE) que atesta o alistamento eleitoral de cidadãos brasileiros. Em aplicações de onboarding, sistemas de Recursos Humanos, plataformas de fintechs e portais governamentais, a verificação desse número é crucial para mitigar fraudes cadastrais e garantir a integridade dos dados.</p>

<p>Assim como o CPF e o CNPJ, o Título de Eleitor utiliza um algoritmo baseado em <strong>Módulo 11</strong> para gerar seus dígitos verificadores. No entanto, ele possui peculiaridades únicas: uma estrutura que codifica o estado de emissão do documento e regras de exceção históricas para os estados de São Paulo e Minas Gerais.</p>

<p>Neste artigo, vamos detalhar a anatomia do Título de Eleitor, a tabela de códigos de UF do TSE e como implementar uma validação matemática completa em código.</p>

<h2>Estrutura dos 12 Dígitos do Título de Eleitor</h2>

<p>O Título de Eleitor é formado por exatamente <strong>12 dígitos numéricos</strong> (no formato <code>AAAA AAAA UF D1D2</code>), organizados sequencialmente da seguinte forma:</p>

<table>
  <thead>
    <tr>
      <th>Posição</th>
      <th>Descrição</th>
      <th>Função</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1 a 8</strong></td>
      <td>Número Sequencial</td>
      <td>Identificador único do eleitor gerado pelo cartório eleitoral.</td>
    </tr>
    <tr>
      <td><strong>9 e 10</strong></td>
      <td>Código da UF</td>
      <td>Identifica o estado (Unidade da Federação) onde o título foi emitido.</td>
    </tr>
    <tr>
      <td><strong>11</strong></td>
      <td>1º Dígito Verificador (D1)</td>
      <td>Calculado sobre o número sequencial (dígitos 1 a 8).</td>
    </tr>
    <tr>
      <td><strong>12</strong></td>
      <td>2º Dígito Verificador (D2)</td>
      <td>Calculado sobre o código da UF e o primeiro dígito verificador (dígitos 9, 10 e 11).</td>
    </tr>
  </tbody>
</table>

<div class="info-box">
  <strong>💡 Importante:</strong> Títulos emitidos no Exterior (ZZ) utilizam o código de UF <code>28</code>. O número total sempre possui 12 dígitos; caso um título antigo possua menos dígitos visíveis no cartão impresso, ele deve ser preenchido com zeros à esquerda até completar os 12 dígitos.
</div>

<h2>Tabela de Códigos da UF (Justiça Eleitoral)</h2>

<p>Os dígitos 9 e 10 indicam o estado de emissão conforme a tabela oficial do Tribunal Superior Eleitoral (TSE):</p>

<table>
  <thead>
    <tr>
      <th>Código</th>
      <th>UF / Região</th>
      <th>Código</th>
      <th>UF / Região</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>01</code></td><td>São Paulo (SP)</td><td><code>15</code></td><td>Pará (PA)</td></tr>
    <tr><td><code>02</code></td><td>Minas Gerais (MG)</td><td><code>16</code></td><td>Maranhão (MA)</td></tr>
    <tr><td><code>03</code></td><td>Rio de Janeiro (RJ)</td><td><code>17</code></td><td>Ceará (CE)</td></tr>
    <tr><td><code>04</code></td><td>Rio Grande do Sul (RS)</td><td><code>18</code></td><td>Piauí (PI)</td></tr>
    <tr><td><code>05</code></td><td>Bahia (BA)</td><td><code>19</code></td><td>Rio Grande do Norte (RN)</td></tr>
    <tr><td><code>06</code></td><td>Paraná (PR)</td><td><code>20</code></td><td>Paraíba (PB)</td></tr>
    <tr><td><code>07</code></td><td>Ceará (CE - Antigo) / DF</td><td><code>21</code></td><td>Pernambuco (PE)</td></tr>
    <tr><td><code>08</code></td><td>Pernambuco (PE - Antigo) / AL</td><td><code>22</code></td><td>Alagoas (AL)</td></tr>
    <tr><td><code>09</code></td><td>Goiás (GO) / TO</td><td><code>23</code></td><td>Sergipe (SE)</td></tr>
    <tr><td><code>10</code></td><td>Mato Grosso (MT) / MS</td><td><code>24</code></td><td>Amapá (AP)</td></tr>
    <tr><td><code>11</code></td><td>Amazonas (AM) / RR / AP / AC</td><td><code>25</code></td><td>Roraima (RR)</td></tr>
    <tr><td><code>12</code></td><td>Rondônia (RO)</td><td><code>26</code></td><td>Tocantins (TO)</td></tr>
    <tr><td><code>13</code></td><td>Santa Catarina (SC)</td><td><code>27</code></td><td>Distrito Federal (DF)</td></tr>
    <tr><td><code>14</code></td><td>Paraíba (PB - Antigo) / AM</td><td><code>28</code></td><td>Exterior (ZZ)</td></tr>
  </tbody>
</table>

<h2>O Algoritmo de Validação dos Dígitos Verificadores</h2>

<h3>Passo 1: Cálculo do Primeiro Dígito Verificador (D1)</h3>

<ol>
  <li>Pegue os primeiros 8 dígitos do título.</li>
  <li>Multiplique cada um pelos pesos posicionais da esquerda para a direita: <code>2, 3, 4, 5, 6, 7, 8, 9</code>.</li>
  <li>Somar os resultados das 8 multiplicações.</li>
  <li>Calcular o resto da divisão da soma por 11 (<code>resto = soma % 11</code>).</li>
  <li>Regra do Dígito D1:
    <ul>
      <li>Se <code>resto === 10</code>: <strong>D1 = 0</strong>.</li>
      <li>Se <code>resto === 0</code>:
        <ul>
          <li>Se o código de UF for <code>01</code> (SP) ou <code>02</code> (MG): <strong>D1 = 1</strong>.</li>
          <li>Para qualquer outro estado: <strong>D1 = 0</strong>.</li>
        </ul>
      </li>
      <li>Caso contrário: <strong>D1 = resto</strong>.</li>
    </ul>
  </li>
</ol>

<h3>Passo 2: Cálculo do Segundo Dígito Verificador (D2)</h3>

<ol>
  <li>Pegue os dígitos 9 e 10 (código da UF) e o dígito 11 (o D1 recém-calculado).</li>
  <li>Multiplique cada um pelos pesos: <code>7, 8, 9</code> (ex: <code>dígito9 * 7 + dígito10 * 8 + D1 * 9</code>).</li>
  <li>Somar os 3 resultados das multiplicações.</li>
  <li>Calcular o resto da divisão da soma por 11 (<code>resto = soma % 11</code>).</li>
  <li>Regra do Dígito D2:
    <ul>
      <li>Se <code>resto === 10</code>: <strong>D2 = 0</strong>.</li>
      <li>Se <code>resto === 0</code>:
        <ul>
          <li>Se o código de UF for <code>01</code> (SP) ou <code>02</code> (MG): <strong>D2 = 1</strong>.</li>
          <li>Para qualquer outro estado: <strong>D2 = 0</strong>.</li>
        </ul>
      </li>
      <li>Caso contrário: <strong>D2 = resto</strong>.</li>
    </ul>
  </li>
</ol>

<h2>Implementação Completa em TypeScript / JavaScript</h2>

<p>Abaixo está o código pronto e resiliente para integrar em serviços backend ou no frontend de suas aplicações web:</p>

<pre><code class="language-javascript">/**
 * Valida se uma string é um Título de Eleitor brasileiro válido.
 * @param {string} tituloStr - O número do título de eleitor (com ou sem pontuação).
 * @returns {boolean} True se for um título válido, False caso contrário.
 */
function validarTituloEleitor(tituloStr) {
  // Remove caracteres não numéricos
  const cleaned = tituloStr.replace(/\\D/g, "");

  // Preenche com zeros à esquerda se necessário para completar 12 dígitos
  const titulo = cleaned.padStart(12, "0");

  if (titulo.length !== 12) return false;

  // Rejeita números com todos os dígitos iguais (ex: 000000000000)
  if (/^(\\d)\\1{11}$/.test(titulo)) return false;

  const ufCode = parseInt(titulo.substring(8, 10), 10);
  // Os códigos de UF válidos vão de 01 a 28
  if (ufCode < 1 || ufCode > 28) return false;

  // 1º Dígito Verificador (D1)
  const pesosD1 = [2, 3, 4, 5, 6, 7, 8, 9];
  let somaD1 = 0;
  for (let i = 0; i < 8; i++) {
    somaD1 += parseInt(titulo.charAt(i), 10) * pesosD1[i];
  }

  let restoD1 = somaD1 % 11;
  let d1;
  if (restoD1 === 10) {
    d1 = 0;
  } else if (restoD1 === 0) {
    d1 = (ufCode === 1 || ufCode === 2) ? 1 : 0;
  } else {
    d1 = restoD1;
  }

  // Compara D1 calculado com o D1 informado no documento
  if (d1 !== parseInt(titulo.charAt(10), 10)) return false;

  // 2º Dígito Verificador (D2)
  const pesosD2 = [7, 8, 9];
  let somaD2 =
    parseInt(titulo.charAt(8), 10) * pesosD2[0] +
    parseInt(titulo.charAt(9), 10) * pesosD2[1] +
    d1 * pesosD2[2];

  let restoD2 = somaD2 % 11;
  let d2;
  if (restoD2 === 10) {
    d2 = 0;
  } else if (restoD2 === 0) {
    d2 = (ufCode === 1 || ufCode === 2) ? 1 : 0;
  } else {
    d2 = restoD2;
  }

  // Compara D2 calculado com o D2 informado no documento
  return d2 === parseInt(titulo.charAt(11), 10);
}

// Exemplo de Uso:
console.log(validarTituloEleitor("123456780190")); // Teste de validação
</code></pre>

<h2>Perguntas Frequentes (FAQ)</h2>

<h3>Por que os estados de SP (01) e MG (02) têm regras especiais no resto 0?</h3>
<p>Trata-se de uma convenção histórica da Justiça Eleitoral brasileira mantida nos sistemas computacionais do TSE para evitar duplicidade ou inconsistências na transição de cadastros manuais legados dos dois maiores colégios eleitorais do país.</p>

<h3>Um Título de Eleitor gerado sinteticamente serve como documento real?</h3>
<p>Não. A validação do número atesta apenas a conformidade matemática da chave e a validade do código da UF. Ele atesta a estrutura lógica, mas a existência de um eleitor ativo cadastrado requer consulta aos webservices oficiais do TSE.</p>

<h2>Conclusão</h2>

<p>Entender a matemática do Título de Eleitor permite criar rotinas de validação eficientes em formulários de cadastro, garantindo a captura correta dos dados antes de submetê-los a APIs externas.</p>

<p>Precisa gerar números válidos para testes de software ou validar documentos em staging? Utilize a nossa ferramenta gratuita [Gerador e Validador de Título de Eleitor](/tools/documents/titulo-eleitor)!</p>
`,
    faqs: [
        {
            question: 'Quantos dígitos tem o Título de Eleitor?',
            answer: 'O Título de Eleitor possui 12 dígitos, sendo 8 dígitos de número sequencial, 2 dígitos para a UF do estado de emissão e 2 dígitos verificadores.'
        },
        {
            question: 'Quais os códigos de UF do Título de Eleitor?',
            answer: 'Os códigos variam de 01 a 28, onde 01 representa São Paulo, 02 Minas Gerais, 03 Rio de Janeiro e 28 representa eleitores cadastrados no Exterior.'
        }
    ]
}
