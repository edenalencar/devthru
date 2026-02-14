import { BlogPost } from '../index'

export const postRegexGuiaPratico: BlogPost = {
    slug: 'regex-guia-pratico-desenvolvedores',
    title: 'Regex para Desenvolvedores: Guia Prático com Exemplos',
    description: 'Domine expressões regulares com exemplos práticos do dia a dia. Aprenda a validar emails, CPFs, URLs e mais com regex em JavaScript e Python.',
    date: '2026-02-12',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 10,
    tags: ['regex', 'expressão regular', 'JavaScript', 'Python', 'validação', 'padrões'],
    relatedTools: ['/tools/development/regex'],
    content: `
<p><strong>Expressões regulares (regex)</strong> são uma das ferramentas mais poderosas — e temidas — do arsenal de um desenvolvedor. Elas permitem buscar, validar e manipular texto com padrões complexos em uma única linha de código.</p>

<p>Neste guia prático, vamos desmistificar regex com exemplos reais que você pode usar no dia a dia.</p>

<h2>O Que São Expressões Regulares?</h2>

<p>Uma regex é um <strong>padrão de busca</strong> que descreve um conjunto de strings. Em vez de buscar texto exato, você descreve o "formato" do que procura.</p>

<pre><code class="language-javascript">// Busca exata — encontra só "gato"
'O gato preto'.includes('gato'); // true

// Regex — encontra "gato", "gata", "gatos"
/gat[oa]s?/.test('O gato preto'); // true
/gat[oa]s?/.test('A gata preta'); // true
</code></pre>

<h2>Sintaxe Essencial</h2>

<table>
<thead>
<tr><th>Símbolo</th><th>Significado</th><th>Exemplo</th><th>Match</th></tr>
</thead>
<tbody>
<tr><td><code>.</code></td><td>Qualquer caractere</td><td><code>c.t</code></td><td>cat, cot, c9t</td></tr>
<tr><td><code>\\d</code></td><td>Dígito (0-9)</td><td><code>\\d{3}</code></td><td>123, 456</td></tr>
<tr><td><code>\\w</code></td><td>Letra, número ou _</td><td><code>\\w+</code></td><td>hello, user_1</td></tr>
<tr><td><code>\\s</code></td><td>Espaço em branco</td><td><code>\\s+</code></td><td>espaço, tab</td></tr>
<tr><td><code>*</code></td><td>Zero ou mais</td><td><code>ab*c</code></td><td>ac, abc, abbc</td></tr>
<tr><td><code>+</code></td><td>Um ou mais</td><td><code>ab+c</code></td><td>abc, abbc</td></tr>
<tr><td><code>?</code></td><td>Zero ou um</td><td><code>colou?r</code></td><td>color, colour</td></tr>
<tr><td><code>{n}</code></td><td>Exatamente n vezes</td><td><code>\\d{4}</code></td><td>2024</td></tr>
<tr><td><code>{n,m}</code></td><td>Entre n e m vezes</td><td><code>\\d{2,4}</code></td><td>12, 123, 1234</td></tr>
<tr><td><code>[abc]</code></td><td>Um dos caracteres</td><td><code>[aeiou]</code></td><td>a, e, i, o, u</td></tr>
<tr><td><code>[^abc]</code></td><td>Nenhum dos caracteres</td><td><code>[^0-9]</code></td><td>qualquer não-dígito</td></tr>
<tr><td><code>^</code></td><td>Início da string</td><td><code>^Olá</code></td><td>Olá mundo</td></tr>
<tr><td><code>$</code></td><td>Fim da string</td><td><code>fim$</code></td><td>este é o fim</td></tr>
<tr><td><code>|</code></td><td>OU</td><td><code>gato|cachorro</code></td><td>gato, cachorro</td></tr>
<tr><td><code>()</code></td><td>Grupo de captura</td><td><code>(\\d{2})/(\\d{2})</code></td><td>25/12 → 25, 12</td></tr>
</tbody>
</table>

<h2>10 Regex que Todo Dev Precisa</h2>

<h3>1. Validar Email</h3>

<pre><code class="language-javascript">const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

emailRegex.test('user@email.com');     // true
emailRegex.test('invalid@');           // false
emailRegex.test('user@email.com.br');  // true
</code></pre>

<h3>2. Validar CPF (formato)</h3>

<pre><code class="language-javascript">const cpfRegex = /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/;

cpfRegex.test('123.456.789-00'); // true
cpfRegex.test('12345678900');    // false (sem máscara)

// Para aceitar com ou sem máscara:
const cpfFlexivel = /^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$/;
</code></pre>

<h3>3. Validar CNPJ (formato)</h3>

<pre><code class="language-javascript">const cnpjRegex = /^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$/;

cnpjRegex.test('12.345.678/0001-00'); // true
</code></pre>

<h3>4. Validar Telefone Brasileiro</h3>

<pre><code class="language-javascript">const phoneRegex = /^\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}$/;

phoneRegex.test('(11) 98765-4321'); // true
phoneRegex.test('11987654321');     // true
phoneRegex.test('(21) 3456-7890'); // true
</code></pre>

<h3>5. Validar URL</h3>

<pre><code class="language-javascript">const urlRegex = /^https?:\\/\\/[\\w.-]+(?:\\.[\\w.-]+)+[\\/\\w.-]*\\/?$/;

urlRegex.test('https://devthru.com');       // true
urlRegex.test('http://sub.domain.com/path'); // true
urlRegex.test('ftp://invalid');              // false
</code></pre>

<h3>6. Extrair Hashtags</h3>

<pre><code class="language-javascript">const hashtagRegex = /#[\\w\\u00C0-\\u00FF]+/g;

'Post sobre #JavaScript e #Python'.match(hashtagRegex);
// ['#JavaScript', '#Python']
</code></pre>

<h3>7. Validar Senha Forte</h3>

<pre><code class="language-javascript">// Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 especial
const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$/;

senhaRegex.test('Abc@1234');  // true
senhaRegex.test('abc12345');  // false (sem maiúscula e especial)
</code></pre>

<h3>8. Validar CEP</h3>

<pre><code class="language-javascript">const cepRegex = /^\\d{5}-?\\d{3}$/;

cepRegex.test('01234-567'); // true
cepRegex.test('01234567');  // true
</code></pre>

<h3>9. Remover Tags HTML</h3>

<pre><code class="language-javascript">const htmlRegex = /&lt;[^&gt;]*&gt;/g;

'&lt;p&gt;Texto &lt;strong&gt;bold&lt;/strong&gt;&lt;/p&gt;'.replace(htmlRegex, '');
// 'Texto bold'
</code></pre>

<h3>10. Validar Data (DD/MM/AAAA)</h3>

<pre><code class="language-javascript">const dataRegex = /^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$/;

dataRegex.test('25/12/2024'); // true
dataRegex.test('32/13/2024'); // false
</code></pre>

<h2>Regex em Python</h2>

<p>O módulo <code>re</code> do Python funciona de forma similar:</p>

<pre><code class="language-python">import re

# Validar email
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
print(re.match(email_pattern, 'user@email.com'))  # Match object

# Extrair todos os números de um texto
numeros = re.findall(r'\\d+', 'Pedido 123 com 5 itens por R$ 99')
print(numeros)  # ['123', '5', '99']

# Substituir padrões
texto = re.sub(r'\\b\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}\\b', '[CPF OCULTO]',
                'O CPF 123.456.789-00 foi encontrado')
print(texto)  # 'O CPF [CPF OCULTO] foi encontrado'
</code></pre>

<h2>Dicas de Performance</h2>

<ol>
<li><strong>Compile regex que serão reutilizadas:</strong> Em Python, use <code>re.compile()</code>. Em JS, use var em vez de criar inline em loops.</li>
<li><strong>Evite backtracking:</strong> Padrões como <code>(a+)+</code> podem causar ReDoS (regex denial of service). Use quantificadores possessivos ou atomic groups quando possível.</li>
<li><strong>Use ferramentas visuais:</strong> Teste suas regex interativamente antes de implementar no código.</li>
</ol>

<h2>Perguntas Frequentes</h2>

<h3>Regex serve para validar formulários?</h3>
<p>Sim, mas combine com validação server-side. Regex no front-end melhora a UX, mas nunca deve ser a única linha de defesa.</p>

<h3>Existe diferença entre regex em JavaScript e Python?</h3>
<p>A sintaxe base é a mesma, mas existem diferenças em flags. JS usa <code>/padrão/gi</code>, Python usa <code>re.IGNORECASE</code>. Lookaheads e lookbehinds também variam.</p>

<h3>Como debugar regex complexas?</h3>
<p>Use ferramentas visuais como o <a href="/tools/development/regex">Testador de Regex do DevThru</a> que mostra matches em tempo real com explicações.</p>
`
}
