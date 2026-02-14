import { BlogPost } from '../index'

export const postValidacaoCpf: BlogPost = {
    slug: 'validacao-cpf-algoritmo-completo',
    title: 'Guia Completo: Algoritmo de Validação de CPF',
    description: 'Aprenda como funciona o algoritmo de validação de CPF passo a passo. Com exemplos em Python, JavaScript, Java e C# para implementar no seu sistema.',
    date: '2026-02-14',
    author: 'DevThru',
    category: 'documentos',
    readingTime: 8,
    tags: ['CPF', 'validação', 'algoritmo', 'documentos brasileiros', 'Python', 'JavaScript'],
    relatedTools: ['/tools/documents/cpf'],
    content: `
<p>O <strong>CPF (Cadastro de Pessoas Físicas)</strong> é o documento mais utilizado em sistemas brasileiros. Saber validar corretamente um CPF é essencial para qualquer desenvolvedor que trabalha com cadastros, e-commerce ou sistemas fiscais no Brasil.</p>

<p>Neste guia, vamos explicar o algoritmo oficial da Receita Federal, implementá-lo em múltiplas linguagens e mostrar os erros mais comuns que desenvolvedores cometem.</p>

<h2>O Que É o CPF?</h2>

<p>O CPF é um número de 11 dígitos no formato <code>XXX.XXX.XXX-DD</code>, onde os dois últimos dígitos (<code>DD</code>) são <strong>dígitos verificadores</strong> calculados a partir dos 9 primeiros. É esse cálculo que permite validar se um CPF é matematicamente válido.</p>

<div class="info-box">
<strong>💡 Importante:</strong> Validação matemática ≠ CPF real. Um CPF pode ser matematicamente válido sem estar cadastrado na Receita Federal. Para testes de software, usamos CPFs válidos mas fictícios.
</div>

<h2>Como Funciona o Algoritmo</h2>

<p>O algoritmo de validação do CPF usa o método de <strong>módulo 11</strong> em duas etapas:</p>

<h3>Passo 1: Calcular o primeiro dígito verificador</h3>

<ol>
<li>Multiplique os 9 primeiros dígitos por pesos decrescentes: <code>10, 9, 8, 7, 6, 5, 4, 3, 2</code></li>
<li>Some todos os resultados</li>
<li>Calcule o resto da divisão por 11</li>
<li>Se o resto for menor que 2, o dígito é <code>0</code>. Senão, o dígito é <code>11 - resto</code></li>
</ol>

<h3>Passo 2: Calcular o segundo dígito verificador</h3>

<ol>
<li>Multiplique os 10 primeiros dígitos (incluindo o primeiro verificador) por pesos: <code>11, 10, 9, 8, 7, 6, 5, 4, 3, 2</code></li>
<li>Repita o mesmo cálculo do módulo 11</li>
</ol>

<h3>Exemplo prático</h3>

<p>Para o CPF <code>529.982.247-25</code>:</p>

<pre><code>Dígitos: 5 2 9 9 8 2 2 4 7
Pesos:  10 9 8 7 6 5 4 3 2

5×10 + 2×9 + 9×8 + 9×7 + 8×6 + 2×5 + 2×4 + 4×3 + 7×2
= 50 + 18 + 72 + 63 + 48 + 10 + 8 + 12 + 14 = 295

295 % 11 = 9 → 11 - 9 = 2 ✅ (primeiro dígito)
</code></pre>

<h2>Implementação em JavaScript</h2>

<pre><code class="language-javascript">function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\\d)\\1{10}$/.test(cpf)) return false;
  
  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i &lt; 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  
  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i &lt; 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

// Exemplos de uso
console.log(validarCPF('529.982.247-25')); // true
console.log(validarCPF('111.111.111-11')); // false
</code></pre>

<h2>Implementação em Python</h2>

<pre><code class="language-python">def validar_cpf(cpf: str) -> bool:
    # Remove caracteres não numéricos
    cpf = ''.join(filter(str.isdigit, cpf))
    
    # Verifica se tem 11 dígitos
    if len(cpf) != 11:
        return False
    
    # Rejeita CPFs com todos os dígitos iguais
    if cpf == cpf[0] * 11:
        return False
    
    # Calcula o primeiro dígito verificador
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    resto = (soma * 10) % 11
    if resto == 10:
        resto = 0
    if resto != int(cpf[9]):
        return False
    
    # Calcula o segundo dígito verificador
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    resto = (soma * 10) % 11
    if resto == 10:
        resto = 0
    if resto != int(cpf[10]):
        return False
    
    return True

# Exemplos de uso
print(validar_cpf('529.982.247-25'))  # True
print(validar_cpf('111.111.111-11'))  # False
</code></pre>

<h2>Implementação em Java</h2>

<pre><code class="language-java">public class CPFValidator {
    public static boolean validar(String cpf) {
        cpf = cpf.replaceAll("\\\\D", "");
        
        if (cpf.length() != 11) return false;
        if (cpf.matches("(\\\\d)\\\\1{10}")) return false;
        
        // Primeiro dígito verificador
        int soma = 0;
        for (int i = 0; i &lt; 9; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }
        int resto = (soma * 10) % 11;
        if (resto == 10) resto = 0;
        if (resto != Character.getNumericValue(cpf.charAt(9))) return false;
        
        // Segundo dígito verificador
        soma = 0;
        for (int i = 0; i &lt; 10; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto == 10) resto = 0;
        if (resto != Character.getNumericValue(cpf.charAt(10))) return false;
        
        return true;
    }
}
</code></pre>

<h2>Erros Comuns na Validação</h2>

<ol>
<li><strong>Não rejeitar CPFs com dígitos iguais:</strong> CPFs como <code>000.000.000-00</code> e <code>111.111.111-11</code> passam no algoritmo de módulo 11 mas são inválidos.</li>
<li><strong>Esquecer de limpar a máscara:</strong> Sempre remova pontos e traços antes de validar.</li>
<li><strong>Confundir validação com verificação:</strong> Validar matematicamente é diferente de consultar na Receita Federal.</li>
<li><strong>Usar dados reais em testes:</strong> Use geradores de CPF para criar dados fictícios válidos.</li>
</ol>

<h2>Perguntas Frequentes</h2>

<h3>Posso usar CPFs gerados em produção?</h3>
<p>Não. CPFs gerados por ferramentas são para <strong>testes de software apenas</strong>. Usar dados fictícios em cadastros reais é ilegal.</p>

<h3>O que é o dígito verificador?</h3>
<p>São os dois últimos dígitos do CPF, calculados matematicamente a partir dos 9 primeiros. Servem como "checksum" para detectar erros de digitação.</p>

<h3>Por que existem CPFs inválidos com dígitos iguais?</h3>
<p>CPFs como 111.111.111-11 passam no algoritmo de módulo 11 por uma coincidência matemática. Por isso, uma verificação adicional é necessária.</p>
`
}
