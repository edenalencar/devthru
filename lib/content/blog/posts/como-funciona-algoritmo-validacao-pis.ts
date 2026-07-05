import { BlogPost } from '../index'

export const postComoFuncionaAlgoritmoValidacaoPis: BlogPost = {
    slug: 'como-funciona-algoritmo-validacao-pis',
    title: 'Como Validar PIS/PASEP: Algoritmo e Exemplos de Código',
    description: 'Entenda a regra de validação do PIS/PASEP passo a passo. Aprenda o cálculo do Módulo 11 e veja exemplos de código prontos em JavaScript, Python e C#.',
    date: '2026-07-05',
    author: 'DevThru',
    category: 'documentos',
    readingTime: 6,
    tags: ['PIS', 'PASEP', 'validação', 'algoritmo', 'documentos brasileiros', 'Módulo 11'],
    relatedTools: ['/tools/documents/pis'],
    content: `
<p>O <strong>PIS (Programa de Integração Social)</strong> e o <strong>PASEP (Programa de Formação do Patrimônio do Servidor Público)</strong> utilizam a mesma estrutura de numeração do <strong>NIS (Número de Identificação Social)</strong>. Essa chave de 11 dígitos é amplamente utilizada em cadastros trabalhistas, sistemas de RH, folhas de pagamento e ERPs no Brasil.</p>

<p>Neste guia prático, vamos analisar a estrutura matemática do PIS/PASEP, aprender como calcular o seu dígito verificador utilizando a regra de <strong>Módulo 11</strong> e disponibilizar exemplos de código prontos para integrar em seus sistemas.</p>

<h2>Estrutura do PIS/PASEP</h2>

<p>O PIS/PASEP é composto por <strong>11 dígitos numéricos</strong> e geralmente se apresenta no formato formatado <code>XXX.XXXXX.XX-X</code>:</p>

<table>
<thead>
<tr><th>Componente</th><th>Posição</th><th>Função</th></tr>
</thead>
<tbody>
<tr><td>Identificador único</td><td>1 a 10</td><td>Número base gerado sequencialmente</td></tr>
<tr><td>Dígito Verificador</td><td>11</td><td>Checksum para validação da estrutura</td></tr>
</tbody>
</table>

<div class="info-box">
  <strong>💡 Dica:</strong> Na prática, PIS, PASEP e NIS compartilham a mesma validação matemática. Portanto, um validador de PIS também validará com perfeição registros de PASEP e NIS.
</div>

<h2>O Algoritmo de Validação (Módulo 11)</h2>

<p>O cálculo do dígito verificador do PIS baseia-se na multiplicação de seus primeiros 10 dígitos por uma lista de pesos específicos, seguida pela divisão modular por 11.</p>

<h3>Passo a Passo do Cálculo</h3>

<ol>
  <li>Pegue os primeiros 10 dígitos do PIS.</li>
  <li>Multiplique cada dígito pelos pesos: <code>3, 2, 9, 8, 7, 6, 5, 4, 3, 2</code> (da esquerda para a direita).</li>
  <li>Some todos os resultados das multiplicações.</li>
  <li>Calcule o resto da divisão da soma por 11.</li>
  <li>Subtraia o resto de 11 (<code>Diferença = 11 - resto</code>).</li>
  <li>Se a diferença for <strong>10</strong> ou <strong>11</strong>, o dígito verificador é <code>0</code>. Caso contrário, o dígito é a própria diferença.</li>
</ol>

<h3>Exemplo Prático</h3>

<p>Vamos validar o PIS hipotético <code>120.42283.47-5</code>:</p>

<pre><code>Dígitos: 1  2  0  4  2  2  8  3  4  7
Pesos:   3  2  9  8  7  6  5  4  3  2

Multiplicações:
1×3 = 3
2×2 = 4
0×9 = 0
4×8 = 32
2×7 = 14
2×6 = 12
8×5 = 40
3×4 = 12
4×3 = 12
7×2 = 14

Soma = 3 + 4 + 0 + 32 + 14 + 12 + 40 + 12 + 12 + 14 = 145

Resto = 145 % 11 = 2
Dígito = 11 - 2 = 9 (Diferente de 5) → PIS Inválido!
</code></pre>

<h2>Implementação em JavaScript / TypeScript</h2>

<p>Esta função limpa a formatação do input e valida a chave com base no algoritmo oficial:</p>

<pre><code class="language-javascript">function validarPIS(pis) {
  // Remove caracteres não numéricos
  const cleaned = pis.replace(/\\D/g, "");

  // Deve possuir exatamente 11 dígitos
  if (cleaned.length !== 11) return false;

  // Rejeita padrões conhecidos com dígitos todos repetidos
  if (/^(\\d)\\1{10}$/.test(cleaned)) return false;

  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;

  for (let i = 0; i &lt; 10; i++) {
    soma += parseInt(cleaned.charAt(i), 10) * pesos[i];
  }

  const resto = soma % 11;
  const diferenca = 11 - resto;
  const digitoVerificador = (diferenca === 10 || diferenca === 11) ? 0 : diferenca;

  return digitoVerificador === parseInt(cleaned.charAt(10), 10);
}

// Exemplos
console.log(validarPIS("120.42283.47-9")); // true
console.log(validarPIS("111.11111.11-1")); // false
</code></pre>

<h2>Implementação em Python</h2>

<p>Uma versão simples e legível em Python para utilizar em seus backend ou scripts de validação de dados:</p>

<pre><code class="language-python">def validar_pis(pis: str) -> bool:
    # Remove qualquer caractere não numérico
    cleaned = "".join(filter(str.isdigit, pis))

    # Verifica o tamanho do documento
    if len(cleaned) != 11:
        return False

    # Evita falsos positivos com dígitos repetidos
    if len(set(cleaned)) == 1:
        return False

    pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum(int(cleaned[i]) * pesos[i] for i in range(10))

    resto = soma % 11
    diferenca = 11 - resto
    
    digito_verificador = 0 if diferenca in (10, 11) else diferenca

    return digito_verificador == int(cleaned[10])

# Exemplos
print(validar_pis("120.42283.47-9"))  # True
print(validar_pis("000.00000.00-0"))  # False
</code></pre>

<h2>Implementação em C#</h2>

<pre><code class="language-csharp">using System;
using System.Linq;

public static class PISValidator
{
    public static bool Validate(string pis)
    {
        if (string.IsNullOrEmpty(pis)) return false;
        
        // Remove caracteres não numéricos
        string cleaned = new string(pis.Where(char.IsDigit).ToArray());
        
        if (cleaned.Length != 11) return false;
        
        // Evita repetidos conhecidos
        if (cleaned.Distinct().Count() == 1) return false;
        
        int[] pesos = { 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
        int soma = 0;
        
        for (int i = 0; i &lt; 10; i++)
        {
            soma += (cleaned[i] - '0') * pesos[i];
        }
        
        int resto = soma % 11;
        int diferenca = 11 - resto;
        int digitoVerificador = (diferenca == 10 || diferenca == 11) ? 0 : diferenca;
        
        return digitoVerificador == (cleaned[10] - '0');
    }
}
</code></pre>

<h2>Erros Comuns na Validação do PIS</h2>

<ol>
  <li><strong>Não sanitizar a string:</strong> PIS/PASEP costuma vir com traços e pontos no banco de dados. Limpe tudo com regex ou filtros antes de aplicar o cálculo.</li>
  <li><strong>Não verificar sequências repetidas:</strong> Chaves compostas por apenas um dígito repetido (ex: <code>111.11111.11-1</code>) podem passar no cálculo aritmético do Módulo 11 por coincidência matemática. Sempre valide a unicidade dos dígitos.</li>
  <li><strong>Falta de conversão nas ferramentas:</strong> Lembre-se de fornecer links rápidos para <a href="/tools/documents/pis">geradores de PIS</a> na sua interface de desenvolvimento para que o time de testes consiga gerar massa de dados fictícios sem complicação.</li>
</ol>
`,
    faqs: [
        {
            question: 'Para que serve a validação do PIS/PASEP?',
            answer: 'A validação matemática do PIS/PASEP garante que o número digitado possui uma estrutura coerente segundo a regra oficial do Módulo 11, evitando erros de digitação em cadastros de funcionários.'
        },
        {
            question: 'Qual a diferença entre PIS, PASEP e NIS?',
            answer: 'PIS e PASEP utilizam o mesmo cadastro do NIS (Número de Identificação Social). A diferença é que o PIS é gerado pela Caixa Econômica para trabalhadores do setor privado, o PASEP pelo Banco do Brasil para o setor público, e o NIS é para programas sociais.'
        },
        {
            question: 'O número do PIS gerado online é real?',
            answer: 'Não. Os números gerados por ferramentas online são criados de forma puramente matemática e servem apenas para testes de software, não tendo registro cadastral real nos órgãos públicos.'
        }
    ]
}
