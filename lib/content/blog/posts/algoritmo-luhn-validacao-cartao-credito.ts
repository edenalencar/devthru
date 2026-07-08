import { BlogPost } from '../index'

export const postAlgoritmoLuhn: BlogPost = {
    slug: 'algoritmo-luhn-validacao-cartao-credito',
    title: 'Algoritmo de Luhn: Validação de Cartão',
    description: 'Entenda o funcionamento do algoritmo de Luhn (módulo 10), utilizado mundialmente para validar números de cartões de crédito, e veja como implementá-lo.',
    date: '2026-06-16',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['Luhn', 'cartão de crédito', 'validação', 'algoritmo', 'JavaScript', 'Python'],
    relatedTools: ['/tools/finance/credit-card-generator'],
    content: `
<p>Se você já comprou online, com certeza digitou o número do seu cartão de crédito e, em milissegundos, o sistema identificou se ele era válido ou não, antes mesmo de processar o pagamento. Esse teste rápido de integridade é possível graças ao <strong>Algoritmo de Luhn</strong>.</p>

<p>Desenvolvido pelo cientista da IBM Hans Peter Luhn em 1954, esse algoritmo (também conhecido como fórmula de <strong>módulo 10</strong>) é uma fórmula de checksum simples usada para validar uma variedade de números de identificação, como cartões de crédito, IMEI de celulares e até números de previdência social em alguns países.</p>

<p>Neste post, vamos entender a matemática por trás do algoritmo de Luhn, acompanhar um exemplo passo a passo e ver como implementá-lo de forma eficiente em JavaScript e Python.</p>

<h2>Como o Algoritmo de Luhn Funciona</h2>

<p>O algoritmo verifica se o último dígito do número (chamado de <strong>dígito verificador</strong>) é matematicamente consistente com os outros dígitos. O processo segue estas três etapas simples:</p>

<ol>
  <li>A partir do penúltimo dígito e movendo-se para a esquerda (da direita para a esquerda), multiplique cada segundo dígito por 2.</li>
  <li>Se o resultado da multiplicação de um dígito for maior que 9 (por exemplo, 2 × 8 = 16), some os dígitos do resultado (ex: 1 + 6 = 7) ou simplesmente subtraia 9 dele (ex: 16 - 9 = 7).</li>
  <li>Some todos os dígitos do número (tanto os que foram multiplicados quanto os que não foram). Se o total final terminar em 0 (ou seja, for múltiplo de 10), o número é válido de acordo com a fórmula de Luhn.</li>
</ol>

<div class="info-box">
  <strong>💡 Importante:</strong> O algoritmo de Luhn valida apenas a <strong>sintaxe matemática</strong> do número do cartão de crédito. Ele não verifica o limite do cartão, a data de expiração ou se o cartão realmente existe e está ativo no banco emissor.
</div>

<h2>Exemplo Prático de Validação</h2>

<p>Vamos testar o número fictício <code>49927398716</code>:</p>

<table>
  <thead>
    <tr>
      <th>Dígito Original</th>
      <td>4</td>
      <td>9</td>
      <td>9</td>
      <td>2</td>
      <td>7</td>
      <td>3</td>
      <td>9</td>
      <td>8</td>
      <td>7</td>
      <td>1</td>
      <td>6 (verificador)</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Multiplicar por 2?</th>
      <td>Sim</td>
      <td>Não</td>
      <td>Sim</td>
      <td>Não</td>
      <td>Sim</td>
      <td>Não</td>
      <td>Sim</td>
      <td>Não</td>
      <td>Sim</td>
      <td>Não</td>
      <td>Não (dígito de checksum)</td>
    </tr>
    <tr>
      <th>Resultado / Ajuste</th>
      <td>8</td>
      <td>9</td>
      <td>18 (1+8=9)</td>
      <td>2</td>
      <td>14 (1+4=5)</td>
      <td>3</td>
      <td>18 (1+8=9)</td>
      <td>8</td>
      <td>14 (1+4=5)</td>
      <td>1</td>
      <td>6</td>
    </tr>
  </tbody>
</table>

<p>Agora somamos todos os dígitos resultantes:</p>
<pre><code>8 + 9 + 9 + 2 + 5 + 3 + 9 + 8 + 5 + 1 + 6 = 70</code></pre>
<p>Como 70 é múltiplo de 10 (70 % 10 === 0), o número é <strong>válido</strong>.</p>

<h2>Implementação em JavaScript</h2>

<p>Aqui está uma implementação em JavaScript otimizada para validar strings contendo números de cartões de crédito de qualquer tamanho:</p>

<pre><code class="language-javascript">function validarLuhn(numeroCartao) {
  // Remove espaços e traços
  const cleanNumber = String(numeroCartao).replace(/\\D/g, '');
  
  if (!cleanNumber || cleanNumber.length < 2) {
    return false;
  }

  let soma = 0;
  let deveDuplicar = false;

  // Percorre o número de trás para frente
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digito = parseInt(cleanNumber.charAt(i), 10);

    if (deveDuplicar) {
      digito *= 2;
      if (digito > 9) {
        digito -= 9;
      }
    }

    soma += digito;
    deveDuplicar = !deveDuplicar;
  }

  return (soma % 10) === 0;
}

// Testando a função
console.log(validarLuhn('49927398716')); // true
console.log(validarLuhn('49927398717')); // false
</code></pre>

<h2>Implementação em Python</h2>

<p>A mesma lógica aplicada em Python, de forma limpa e idiomática:</p>

<pre><code class="language-python">def validar_luhn(numero_cartao: str) -> bool:
    # Remove qualquer caractere que não seja número
    clean_number = "".join(filter(str.isdigit, str(numero_cartao)))
    
    if len(clean_number) < 2:
        return False
        
    soma = 0
    deve_duplicar = False
    
    # Percorre de trás para frente
    for digito_str in reversed(clean_number):
        digito = int(digito_str)
        
        if deve_duplicar:
            digito *= 2
            if digito > 9:
                digito -= 9
                
        soma += digito
        deve_duplicar = not deve_duplicar
        
    return soma % 10 == 0

# Exemplos de uso
print(validar_luhn("49927398716"))  # True
print(validar_luhn("49927398717"))  # False
</code></pre>

<h2>Por que Validar o Luhn no Frontend?</h2>

<p>A validação do algoritmo de Luhn é uma excelente prática de <strong>UX (User Experience)</strong>. Ao validar o número no lado do cliente (frontend) antes de enviar a requisição de pagamento ao gateway:</p>

<ul>
  <li>Evitam-se chamadas desnecessárias à API de pagamento, economizando custos de infraestrutura e processamento.</li>
  <li>Dá-se feedback imediato ao usuário caso ele cometa um erro de digitação ao inserir o número do cartão.</li>
</ul>

<p>Caso precise gerar dados de cartão de crédito válidos e fictícios para testar a sua implementação, utilize o nosso <a href="/tools/finance/credit-card-generator">Gerador de Cartão de Crédito</a>.</p>
`
}
