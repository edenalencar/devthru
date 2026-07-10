import { BlogPost } from '../index'

export const postGuiaDeRegexParaDesenvolvedores: BlogPost = {
    slug: 'guia-de-regex-para-desenvolvedores',
    title: 'Guia de Regex para Desenvolvedores',
    description: 'Aprenda os conceitos fundamentais de expressões regulares (Regex). Entenda âncoras, classes de caracteres, quantificadores e grupos.',
    date: '2026-07-16',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['Regex', 'Expressões Regulares', 'Desenvolvimento', 'Validação', 'Busca'],
    relatedTools: ['/tools/development/regex'],
    content: `
<p>As <strong>Expressões Regulares</strong>, amplamente conhecidas como <strong>Regex</strong> (do inglês *Regular Expressions*), são padrões textuais definidos por meio de uma sintaxe especial, usados para buscar, extrair, substituir ou validar blocos de texto. Elas estão presentes nativamente em praticamente todas as linguagens de programação modernas.</p>

<p>Embora as expressões regulares sejam incrivelmente poderosas para tarefas como validação de e-mails, análise de logs ou substituições de texto em lote, elas são frequentemente vistas como "um idioma alienígena" por muitos desenvolvedores. Neste guia prático, vamos decifrar a sintaxe básica das expressões regulares e aprender a ler padrões comuns.</p>

<h2>1. A Anatomia Básica de um Regex</h2>

<p>Uma expressão regular é formada por caracteres normais (que correspondem a si mesmos) combinados com **metacaracteres** (caracteres especiais que representam regras lógicas).</p>

<p>Os metacaracteres mais importantes são divididos em quatro categorias principais:</p>

<h3>A. Âncoras</h3>
<p>As âncoras não correspondem a caracteres físicos, mas sim a posições no texto:</p>
<ul>
  <li><code>^</code> (Circunflexo): Representa o início de uma linha.</li>
  <li><code>$</code> (Cifrão): Representa o fim de uma linha.</li>
</ul>

<h3>B. Classes de Caracteres</h3>
<p>Permitem especificar que tipo de caractere deve ser correspondido:</p>
<ul>
  <li><code>\d</code>: Qualquer caractere numérico (dígito de 0 a 9).</li>
  <li><code>\w</code>: Qualquer caractere alfanumérico (letras, números e underline).</li>
  <li><code>\s</code>: Qualquer espaço em branco (incluindo quebras de linha e tabulações).</li>
  <li><code>.</code> (Ponto): Corresponde a **qualquer caractere**, exceto uma quebra de linha.</li>
  <li><code>[a-z]</code>: Um conjunto customizado. Corresponde a qualquer letra minúscula de 'a' a 'z'.</li>
</ul>

<h3>C. Quantificadores</h3>
<p>Definem quantas vezes o caractere ou grupo anterior deve ocorrer:</p>
<ul>
  <li><code>*</code>: Zero ou mais vezes.</li>
  <li><code>+</code>: Uma ou mais vezes.</li>
  <li><code>?</code>: Zero ou uma vez (torna o caractere opcional).</li>
  <li><code>{n}</code>: Exatamente <code>n</code> vezes.</li>
  <li><code>{min,max}</code>: De <code>min</code> a <code>max</code> vezes.</li>
</ul>

<h2>2. Analisando um Exemplo Real: Validação de Ano</h2>

<p>Vamos analisar uma regex simples usada para validar se uma string representa um ano de 4 dígitos:</p>

<pre><code class="language-bash">^\\d{4}$</code></pre>

<p>Lendo cada parte deste padrão:</p>
<ol>
  <li>O <code>^</code> diz que a busca deve começar no início exato da string.</li>
  <li>O <code>\d</code> busca por dígitos numéricos.</li>
  <li>O <code>{4}</code> exige que tenhamos exatamente 4 desses dígitos em sequência (ex: 2026).</li>
  <li>O <code>$</code> garante que a string termine logo após esses 4 dígitos, prevenindo que textos maiores sejam validados (como "2026-extra").</li>
</ol>

<div class="info-box">
  <strong>💡 Dica Prática:</strong> Para escapar um metacaractere e buscá-lo literalmente (por exemplo, se você quiser buscar um ponto físico "." ou uma barra "/"), insira uma barra invertida antes: <code>\\.</code> ou <code>\\/</code>.
</div>

<h2>3. Grupos e Capturas</h2>

<p>Colocar parte de uma regex entre parênteses <code>( )</code> cria um <strong>Grupo de Captura</strong>. Os grupos servem para duas finalidades principais:</p>
<ol>
  <li>Agrupar partes do padrão para aplicar quantificadores em conjunto (ex: <code>(abc)+</code>).</li>
  <li>Isolar partes específicas do texto correspondido para extração no código (por exemplo, em um e-mail do tipo <code>(usuario)@(dominio).com</code>, extrair o usuário e o domínio separadamente).</li>
</ol>

<h2>Conclusão</h2>

<p>Dominar expressões regulares poupa centenas de linhas de código estruturado com condicionais aninhados e melhora muito sua produtividade na limpeza e estruturação de dados.</p>

<p>Precisa escrever um padrão complexo, testar correspondências em tempo real ou gerar expressões regulares de forma visual com explicações em português sem precisar quebrar a cabeça no terminal? Utilize o <a href="/tools/development/regex">Gerador de Regex</a> do DevThru para construir e depurar seus padrões em segundos.</p>
`
}
