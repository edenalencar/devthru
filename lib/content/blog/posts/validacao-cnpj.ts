import { BlogPost } from '../index'

export const postValidacaoCnpj: BlogPost = {
    slug: 'validacao-cnpj-algoritmo-completo',
    title: 'Como Validar CNPJ: Algoritmo Completo com Exemplos de Código',
    description: 'Aprenda o algoritmo oficial de validação de CNPJ passo a passo. Com implementações prontas em JavaScript, Python e Java para usar no seu sistema fiscal ou ERP.',
    date: '2026-02-28',
    author: 'DevThru',
    category: 'documentos',
    readingTime: 9,
    tags: ['CNPJ', 'validação', 'algoritmo', 'documentos brasileiros', 'Receita Federal', 'sistema fiscal'],
    relatedTools: ['/tools/documents/cnpj', '/tools/documents/cpf'],
    content: `
<p>O <strong>CNPJ (Cadastro Nacional da Pessoa Jurídica)</strong> é o documento que identifica empresas no Brasil. Se você desenvolve sistemas fiscais, ERPs, e-commerces ou qualquer plataforma que cadastra empresas, saber validar um CNPJ corretamente é <strong>obrigatório</strong>.</p>

<p>Neste guia, vamos dissecar o algoritmo oficial da Receita Federal, implementá-lo em 3 linguagens e cobrir os erros mais comuns que levam a bugs em produção.</p>

<h2>Estrutura do CNPJ</h2>

<p>O CNPJ possui <strong>14 dígitos</strong> no formato <code>XX.XXX.XXX/YYYY-DD</code>:</p>

<table>
<thead>
<tr><th>Parte</th><th>Posição</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td>Raiz</td><td>1–8</td><td>Identifica a empresa</td></tr>
<tr><td>Ordem</td><td>9–12</td><td>Filial (0001 = matriz)</td></tr>
<tr><td>Dígitos Verificadores</td><td>13–14</td><td>Checksum (módulo 11)</td></tr>
</tbody>
</table>

<div class="info-box">
<strong>💡 Dica:</strong> O campo "Ordem" (posições 9–12) indica se é matriz (<code>0001</code>) ou filial (<code>0002</code>, <code>0003</code>...). Isso é útil para sistemas que precisam distinguir unidades de uma mesma empresa.
</div>

<h2>O Algoritmo de Validação (Módulo 11)</h2>

<p>Assim como o CPF, o CNPJ usa o método de <strong>módulo 11</strong>, mas com pesos diferentes e em duas etapas:</p>

<h3>Passo 1: Calcular o primeiro dígito verificador</h3>

<ol>
<li>Multiplique os 12 primeiros dígitos pelos pesos: <code>5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2</code></li>
<li>Some todos os resultados</li>
<li>Calcule o resto da divisão por 11</li>
<li>Se o resto for menor que 2, o dígito é <code>0</code>. Senão, é <code>11 - resto</code></li>
</ol>

<h3>Passo 2: Calcular o segundo dígito verificador</h3>

<ol>
<li>Multiplique os 13 primeiros dígitos (incluindo o 1º verificador) pelos pesos: <code>6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2</code></li>
<li>Repita o cálculo de módulo 11</li>
</ol>

<h3>Exemplo prático</h3>

<p>Para o CNPJ <code>11.222.333/0001-81</code>:</p>

<pre><code>Dígitos: 1 1 2 2 2 3 3 3 0 0 0 1
Pesos:   5 4 3 2 9 8 7 6 5 4 3 2

1×5 + 1×4 + 2×3 + 2×2 + 2×9 + 3×8 + 3×7 + 3×6 + 0×5 + 0×4 + 0×3 + 1×2
= 5 + 4 + 6 + 4 + 18 + 24 + 21 + 18 + 0 + 0 + 0 + 2 = 102

102 % 11 = 3 → 11 - 3 = 8 ✅ (primeiro dígito)
</code></pre>

<h2>Implementação em JavaScript</h2>

<pre><code class="language-javascript">function validarCNPJ(cnpj) {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/\\D/g, '');

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false;

  // Rejeita CNPJs com todos os dígitos iguais
  if (/^(\\d)\\1{13}$/.test(cnpj)) return false;

  // Pesos para o cálculo
  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i &lt; 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso1[i];
  }
  let resto = soma % 11;
  const dig1 = resto &lt; 2 ? 0 : 11 - resto;
  if (dig1 !== parseInt(cnpj.charAt(12))) return false;

  // Segundo dígito verificador
  soma = 0;
  for (let i = 0; i &lt; 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso2[i];
  }
  resto = soma % 11;
  const dig2 = resto &lt; 2 ? 0 : 11 - resto;
  if (dig2 !== parseInt(cnpj.charAt(13))) return false;

  return true;
}

// Exemplos
console.log(validarCNPJ('11.222.333/0001-81')); // true
console.log(validarCNPJ('11.111.111/1111-11')); // false
</code></pre>

<h2>Implementação em Python</h2>

<pre><code class="language-python">def validar_cnpj(cnpj: str) -> bool:
    # Remove caracteres não numéricos
    cnpj = ''.join(filter(str.isdigit, cnpj))

    # Verifica se tem 14 dígitos
    if len(cnpj) != 14:
        return False

    # Rejeita CNPJs com todos os dígitos iguais
    if cnpj == cnpj[0] * 14:
        return False

    # Pesos oficiais
    peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    # Primeiro dígito verificador
    soma = sum(int(cnpj[i]) * peso1[i] for i in range(12))
    resto = soma % 11
    dig1 = 0 if resto < 2 else 11 - resto
    if dig1 != int(cnpj[12]):
        return False

    # Segundo dígito verificador
    soma = sum(int(cnpj[i]) * peso2[i] for i in range(13))
    resto = soma % 11
    dig2 = 0 if resto < 2 else 11 - resto
    if dig2 != int(cnpj[13]):
        return False

    return True

# Exemplos
print(validar_cnpj('11.222.333/0001-81'))  # True
print(validar_cnpj('00.000.000/0000-00'))  # False
</code></pre>

<h2>Implementação em Java</h2>

<pre><code class="language-java">public class CNPJValidator {
    private static final int[] PESO1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
    private static final int[] PESO2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

    public static boolean validar(String cnpj) {
        cnpj = cnpj.replaceAll("\\\\D", "");

        if (cnpj.length() != 14) return false;
        if (cnpj.matches("(\\\\d)\\\\1{13}")) return false;

        // Primeiro dígito verificador
        int soma = 0;
        for (int i = 0; i &lt; 12; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * PESO1[i];
        }
        int resto = soma % 11;
        int dig1 = resto &lt; 2 ? 0 : 11 - resto;
        if (dig1 != Character.getNumericValue(cnpj.charAt(12))) return false;

        // Segundo dígito verificador
        soma = 0;
        for (int i = 0; i &lt; 13; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * PESO2[i];
        }
        resto = soma % 11;
        int dig2 = resto &lt; 2 ? 0 : 11 - resto;
        if (dig2 != Character.getNumericValue(cnpj.charAt(13))) return false;

        return true;
    }
}
</code></pre>

<h2>CNPJ vs CPF: Diferenças na Validação</h2>

<table>
<thead>
<tr><th>Aspecto</th><th>CPF</th><th>CNPJ</th></tr>
</thead>
<tbody>
<tr><td>Quantidade de dígitos</td><td>11</td><td>14</td></tr>
<tr><td>Dígitos verificadores</td><td>2 (últimos)</td><td>2 (últimos)</td></tr>
<tr><td>Pesos</td><td>Decrescentes simples</td><td>Alternados (5,4,3,2,9,8...)</td></tr>
<tr><td>Identificação</td><td>Pessoa Física</td><td>Pessoa Jurídica</td></tr>
</tbody>
</table>

<h2>Erros Comuns na Validação de CNPJ</h2>

<ol>
<li><strong>Não rejeitar dígitos repetidos:</strong> CNPJs como <code>11.111.111/1111-11</code> passam no módulo 11 por coincidência matemática.</li>
<li><strong>Confundir máscara com valor:</strong> Sempre limpe a string antes de validar (<code>replace(/\\D/g, '')</code>).</li>
<li><strong>Ignorar o número de ordem:</strong> CNPJs com ordem <code>0000</code> são inválidos (deve ser pelo menos <code>0001</code>).</li>
<li><strong>Usar dados reais em testes:</strong> Use <a href="/tools/documents/cnpj">geradores de CNPJ</a> para criar dados fictícios válidos.</li>
</ol>

<h2>Perguntas Frequentes</h2>

<h3>Qual a diferença entre CNPJ de matriz e filial?</h3>
<p>Os dígitos 9 a 12 do CNPJ indicam a ordem do estabelecimento. <code>0001</code> é sempre a matriz, e a partir de <code>0002</code> são filiais. Todos compartilham a mesma raiz (dígitos 1–8).</p>

<h3>Posso consultar se um CNPJ existe de verdade?</h3>
<p>Sim, através da <strong>API da ReceitaWS</strong> ou do site oficial da Receita Federal. A validação matemática apenas verifica se o número é estruturalmente correto, não se está de fato cadastrado.</p>

<h3>Um CNPJ gerado por ferramenta pode ser usado em nota fiscal?</h3>
<p>Não. CNPJs gerados são para <strong>testes de software apenas</strong>. Usar um CNPJ fictício em documentos fiscais reais é crime de falsidade ideológica.</p>
`
}
