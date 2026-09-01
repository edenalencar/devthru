import { BlogPost } from '../index'

export const postComoValidarTelefoneBrasil: BlogPost = {
    slug: 'como-validar-formatar-telefone-celular-brasil-ddd',
    title: 'Como Validar e Formatar Telefones e Celulares no Brasil com Regex',
    description: 'Aprenda as regras oficiais da Anatel para validação de telefones fixos e celulares no Brasil. Padrões de Regex, validação de DDDs e exemplos prontos em TypeScript e Python.',
    date: '2026-08-31',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['Telefone', 'Celular', 'Regex', 'TypeScript', 'Python', 'Anatel', 'Validação'],
    relatedTools: ['/tools/personal/phone', '/tools/utilities/whatsapp-link-generator', '/tools/development/regex'],
    content: `
<p>Validar e formatar números de telefone no Brasil é um dos desafios mais comuns em cadastros, checkouts e formulários de autenticação via SMS/WhatsApp. Embora pareça uma tarefa simples, o sistema telefônico brasileiro possui regras rígidas estabelecidas pela <strong>Anatel</strong>, envolvendo <strong>DDDs geográficos</strong>, o <strong>nono dígito obrigatório</strong> para celulares e a diferenciação entre linhas móveis e fixas.</p>

<p>Neste guia prático, vamos entender a anatomia dos números de telefone no Brasil, como validar DDDs reais, aplicar máscaras dinâmicas e implementar expressões regulares (Regex) robustas em <strong>JavaScript/TypeScript</strong> e <strong>Python</strong>.</p>

<h2>1. A Anatomia do Telefone no Brasil</h2>
<p>Um número de telefone brasileiro completo no padrão internacional (E.164) é composto por três partes:</p>
<ol>
  <li><strong>DDI (Código do País):</strong> <code>+55</code> para o Brasil.</li>
  <li><strong>DDD (Código de Área Nacional):</strong> 2 dígitos (de <code>11</code> a <code>99</code>, com lacunas que não existem).</li>
  <li><strong>Número do Assinante:</strong>
    <ul>
      <li><strong>Telefonia Móvel (Celular):</strong> 9 dígitos (ex: <code>9XXXX-XXXX</code>). O primeiro dígito é <strong>sempre o número 9</strong>, e o segundo dígito varia entre <strong>6, 7, 8 ou 9</strong>.</li>
      <li><strong>Telefonia Fixa:</strong> 8 dígitos (ex: <code>[2-5]XXX-XXXX</code>). O primeiro dígito começa entre <strong>2 e 5</strong>.</li>
    </ul>
  </li>
</ol>

<div class="info-box">
  <strong>💡 Dica Importante:</strong> Celulares no Brasil <strong>sempre têm 11 dígitos no total</strong> (2 do DDD + 9 do número), enquanto telefones fixos possuem <strong>10 dígitos no total</strong> (2 do DDD + 8 do número).
</div>

<h2>2. Lista de DDDs Válidos no Brasil</h2>
<p>Nem todas as combinações de dois dígitos são DDDs válidos. Existem exatamente <strong>67 DDDs ativos</strong> no Brasil divididos por regiões:</p>

<table>
  <thead>
    <tr>
      <th>Região</th>
      <th>Estados</th>
      <th>DDDs Válidos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sudeste</strong></td>
      <td>SP, RJ, MG, ES</td>
      <td><code>11 a 19</code> (SP), <code>21, 22, 24</code> (RJ), <code>27, 28</code> (ES), <code>31 a 35, 37, 38</code> (MG)</td>
    </tr>
    <tr>
      <td><strong>Sul</strong></td>
      <td>PR, SC, RS</td>
      <td><code>41 a 46</code> (PR), <code>47 a 49</code> (SC), <code>51, 53 a 55</code> (RS)</td>
    </tr>
    <tr>
      <td><strong>Centro-Oeste</strong></td>
      <td>DF, GO, TO, MT, MS</td>
      <td><code>61</code> (DF/GO), <code>62, 64</code> (GO), <code>63</code> (TO), <code>65, 66</code> (MT), <code>67</code> (MS)</td>
    </tr>
    <tr>
      <td><strong>Nordeste</strong></td>
      <td>BA, SE, PE, AL, PB, RN, CE, PI, MA</td>
      <td><code>71, 73 a 75, 77</code> (BA), <code>79</code> (SE), <code>81, 87</code> (PE), <code>82</code> (AL), <code>83</code> (PB), <code>84</code> (RN), <code>85, 88</code> (CE), <code>86, 89</code> (PI), <code>98, 99</code> (MA)</td>
    </tr>
    <tr>
      <td><strong>Norte</strong></td>
      <td>PA, AM, RR, AP, AC, RO</td>
      <td><code>91, 93, 94</code> (PA), <code>92, 97</code> (AM), <code>95</code> (RR), <code>96</code> (AP), <code>68</code> (AC), <code>69</code> (RO)</td>
    </tr>
  </tbody>
</table>

<h2>3. Expressão Regular (Regex) para Validação Completa</h2>
<p>Abaixo está o padrão Regex rigoroso que aceita números com ou sem pontuação (parênteses, espaços e hifens), aceitando tanto telefones fixos (8 dígitos) quanto celulares com o 9º dígito obrigatório:</p>

<pre><code class="language-javascript">
// Aceita formatos: (11) 99999-9999, 11999999999, (11) 3333-3333, 1133333333
const PHONE_BR_REGEX = /^(?:(?:\+|00)?55\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-5])\d{3})\-?(\d{4}))$/;
</code></pre>

<h2>4. Implementação em TypeScript / JavaScript</h2>
<p>A função abaixo limpa caracteres não numéricos, valida a existência do DDD e formata o número com a máscara correta:</p>

<pre><code class="language-javascript">
const VALID_DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99
]);

export function validateAndFormatPhone(phone: string): { isValid: boolean; formatted: string; type?: 'mobile' | 'landline' } {
  // Remove tudo que não for dígito
  let clean = phone.replace(/\\D/g, '');

  // Remove DDI 55 inicial se existir
  if (clean.length > 11 && clean.startsWith('55')) {
    clean = clean.substring(2);
  }

  // Celular (11 dígitos) ou Fixo (10 dígitos)
  if (clean.length !== 10 && clean.length !== 11) {
    return { isValid: false, formatted: phone };
  }

  const ddd = parseInt(clean.substring(0, 2), 10);
  if (!VALID_DDDS.has(ddd)) {
    return { isValid: false, formatted: phone };
  }

  const numberPart = clean.substring(2);

  // Validação de Celular: 9 dígitos iniciando com 9 e segundo dígito [6-9]
  if (clean.length === 11) {
    if (numberPart[0] !== '9' || !['6', '7', '8', '9'].includes(numberPart[1])) {
      return { isValid: false, formatted: phone };
    }
    const formatted = \`(\${ddd}) \${numberPart.substring(0, 5)}-\${numberPart.substring(5)}\`;
    return { isValid: true, formatted, type: 'mobile' };
  }

  // Validação de Fixo: 8 dígitos iniciando com [2-5]
  if (!['2', '3', '4', '5'].includes(numberPart[0])) {
    return { isValid: false, formatted: phone };
  }
  const formatted = \`(\${ddd}) \${numberPart.substring(0, 4)}-\${numberPart.substring(4)}\`;
  return { isValid: true, formatted, type: 'landline' };
}
</code></pre>

<h2>5. Implementação em Python</h2>
<p>Para pipelines de backend ou rotinas de limpeza de dados em Python:</p>

<pre><code class="language-python">
import re

VALID_DDDS = {
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28,
    31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48, 49,
    51, 53, 54, 55,
    61, 62, 63, 64, 65, 66, 67, 68, 69,
    71, 73, 74, 75, 77, 79,
    81, 82, 83, 84, 85, 86, 87, 88, 89,
    91, 92, 93, 94, 95, 96, 97, 98, 99
}

def validate_brazilian_phone(phone_str: str) -> dict:
    digits = re.sub(r'\\D', '', phone_str)
    
    if len(digits) > 11 and digits.startswith('55'):
        digits = digits[2:]
        
    if len(digits) not in (10, 11):
        return {"valid": False, "error": "Tamanho de dígitos inválido"}
        
    ddd = int(digits[:2])
    if ddd not in VALID_DDDS:
        return {"valid": False, "error": f"DDD {ddd} inexistente no Brasil"}
        
    number = digits[2:]
    
    if len(digits) == 11:
        if number[0] != '9' or number[1] not in '6789':
            return {"valid": False, "error": "Celular deve iniciar com 9 seguido de [6-9]"}
        formatted = f"({ddd}) {number[:5]}-{number[5:]}"
        return {"valid": True, "formatted": formatted, "type": "mobile", "e164": f"+55{digits}"}
        
    # Telefone fixo (10 dígitos)
    if number[0] not in '2345':
        return {"valid": False, "error": "Telefone fixo deve iniciar com [2-5]"}
    formatted = f"({ddd}) {number[:4]}-{number[4:]}"
    return {"valid": True, "formatted": formatted, "type": "landline", "e164": f"+55{digits}"}
</code></pre>

<h2>6. Gerando Números Válidos para Testes em Staging</h2>
<p>Se você precisa de números de celular ou fixo matematicamente válidos por estado para popular seus testes automatizados no Cypress, Playwright ou Selenium sem usar números de pessoas reais, utilize o nosso <a href="/tools/personal/phone">Gerador de Telefone Online</a> no DevThru.</p>
`
}
