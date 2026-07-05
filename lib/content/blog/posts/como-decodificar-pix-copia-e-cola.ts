import { BlogPost } from '../index'

export const postComoDecodificarPix: BlogPost = {
    slug: 'como-decodificar-pix-copia-e-cola',
    title: 'Como Decodificar String Pix Copia e Cola Programaticamente (Padrão EMV)',
    description: 'Entenda como funciona a string do Pix Copia e Cola. Aprenda a decodificar chaves, nomes e valores no formato EMV TLV e recalcular o checksum CRC16 de segurança.',
    date: '2026-07-05',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 8,
    tags: ['Pix', 'EMV', 'algoritmo', 'pagamentos', 'JavaScript', 'Python'],
    relatedTools: ['/tools/finance/pix-parser', '/tools/utilities/qrcode'],
    content: `
<p>O <strong>Pix Copia e Cola</strong> é um formato prático que permite aos usuários realizar pagamentos instantâneos copiando e colando uma string alfanumérica. Mas você sabia que esse formato segue um padrão internacional chamado <strong>EMV QR Code</strong> definido pela Europay, Mastercard e Visa, e adaptado pelo <strong>Banco Central do Brasil</strong>?</p>

<p>Neste artigo, vamos analisar como a string do Pix é estruturada no formato <strong>TLV (Tag-Length-Value)</strong>, aprender a ler os dados do recebedor e valor programaticamente e entender como calcular e recalcular o checksum de segurança <strong>CRC16</strong>.</p>

<h2>1. A Estrutura EMV TLV (Tag-Length-Value)</h2>
<p>O padrão do Pix Copia e Cola organiza seus dados em pequenos blocos sequenciais onde cada campo é composto por três partes:</p>
<ol>
  <li><strong>Tag (2 dígitos):</strong> Identificador do campo (ex: <code>00</code> representa o formato, <code>54</code> representa o valor).</li>
  <li><strong>Length (2 dígitos):</strong> O tamanho exato do valor em quantidade de caracteres.</li>
  <li><strong>Value (Variável):</strong> Os dados do campo correspondente.</li>
</ol>
<p>Por exemplo, a string inicial <code>000201</code> significa:</p>
<ul>
  <li>Tag: <code>00</code></li>
  <li>Length: <code>02</code></li>
  <li>Value: <code>01</code></li>
</ul>

<h2>2. Tags Principais do Pix</h2>
<p>O Banco Central mapeou dados específicos em tags do padrão EMV:</p>
<ul>
  <li><strong>Tag 00 (Payload Format Indicator):</strong> Sempre fixo como <code>01</code> (resultando em <code>000201</code>).</li>
  <li><strong>Tag 26 (Merchant Account Information - Pix):</strong> Um campo complexo (sub-TLV) contendo a chave Pix do recebedor na subtag <code>01</code> e, em boletos dinâmicos, a URL do banco na subtag <code>25</code>.</li>
  <li><strong>Tag 52 (Merchant Category Code):</strong> Sempre <code>0000</code>.</li>
  <li><strong>Tag 53 (Transaction Currency):</strong> Código ISO da moeda (<code>986</code> para o Real brasileiro).</li>
  <li><strong>Tag 54 (Transaction Amount):</strong> O valor do Pix (ex: <code>540510.50</code> representa R$ 10,50). Omissa em boletos de valor variável definidos pelo pagador.</li>
  <li><strong>Tag 58 (Country Code):</strong> Código do país (<code>BR</code>).</li>
  <li><strong>Tag 59 (Merchant Name):</strong> Nome completo do recebedor (com limite de 25 caracteres).</li>
  <li><strong>Tag 60 (Merchant City):</strong> Cidade do recebedor (com limite de 15 caracteres).</li>
  <li><strong>Tag 62 (Additional Data Field):</strong> Sub-TLV contendo o ID da transação (txid) na subtag <code>05</code>.</li>
  <li><strong>Tag 63 (CRC16 Checksum):</strong> É o campo de integridade. Sempre tem a estrutura <code>6304</code> seguida pelo hash hexadecimal de 4 dígitos (ex: <code>6304D1B2</code>) calculados a partir de todo o payload anterior.</li>
</ul>

<h2>3. Calculando o Checksum CRC16</h2>
<p>O CRC16 garante que a string não foi alterada ou corrompida. O algoritmo utilizado é o <strong>CRC-16 CCITT</strong> com o polinômio <code>0x1021</code>, valor inicial <code>0xFFFF</code>, sem reversão de bits no input ou no output.
Toda vez que você altera o valor da Tag 54, você é obrigado a reconstruir o payload e recalcular o CRC16 correspondente, caso contrário o aplicativo do banco rejeitará o Pix como corrompido.</p>

<h2>4. Implementação em Python</h2>
<p>Abaixo está um script em Python para fazer o parse básico e calcular o CRC16 de um Pix Copia e Cola:</p>

<pre><code class="language-python">def calcular_crc16(data: str) -> str:
    crc = 0xFFFF
    polynomial = 0x1021
    for char in data:
        b = ord(char)
        for j in range(8):
            bit = ((b >> (7 - j)) & 1) == 1
            c15 = ((crc >> 15) & 1) == 1
            crc <<= 1
            if c15 != bit:
                crc ^= polynomial
    crc &= 0xFFFF
    return f"{crc:04X}"

# Exemplo de uso:
payload_sem_crc = "00020101021226580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913DevThru Ltda6009Sao Paulo62070503***6304"
crc = calcular_crc16(payload_sem_crc)
print("CRC16:", crc) # Exemplo de retorno: D1B2
print("Pix Final:", payload_sem_crc + crc)
</code></pre>

<h2>Erros Comuns na Integração do Pix</h2>
<ol>
  <li><strong>Caracteres Especiais no Nome:</strong> A Tag 59 (Merchant Name) e 60 (Merchant City) não devem conter acentos ou caracteres especiais (ex: substituia <code>ã</code> por <code>a</code>, <code>ç</code> por <code>c</code>). A acentuação pode estourar o tamanho do byte do length e invalidar o parser do app do banco.</li>
  <li><strong>Não respeitar o limite de tamanho:</strong> O nome do recebedor tem limite de 25 caracteres. Se passar disso, o banco costuma rejeitar a transferência.</li>
  <li><strong>Ignorar o recálculo do Checksum:</strong> Alterar o valor direto na string de texto sem calcular o CRC16 correspondente fará o Pix falhar na leitura do aplicativo do banco.</li>
</ol>
`,
    faqs: [
        {
            question: 'O que significa EMV no Pix Copia e Cola?',
            answer: 'EMV é um padrão global de especificações financeiras mantido pela Europay, Mastercard e Visa. O Banco Central do Brasil adotou o padrão EMV QR Code Merchant-Presented para estruturar a string alfanumérica do Pix Copia e Cola de forma padronizada mundialmente.'
        },
        {
            question: 'É possível alterar o valor de um Pix Copia e Cola?',
            answer: 'Sim, desde que seja um Pix Estático. Você pode alterar a Tag 54 da string com o novo valor correspondente e recalcular o checksum CRC16 final (Tag 63) para gerar a nova string ou QR Code válido.'
        },
        {
            question: 'Por que o Pix Copia e Cola dá erro de chave inválida em alguns bancos?',
            answer: 'Geralmente ocorre por erros na estruturação das tags TLV (como tamanho incompatível do campo), caracteres acentuados no nome do recebedor que alteram o comprimento real em bytes, ou um checksum CRC16 calculado incorretamente.'
        }
    ]
}
