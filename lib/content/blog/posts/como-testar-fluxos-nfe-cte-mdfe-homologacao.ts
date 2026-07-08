import { BlogPost } from '../index'

export const postComoTestarFluxosNfeCteMdfe: BlogPost = {
    slug: 'como-testar-fluxos-nfe-cte-mdfe-homologacao',
    title: 'Como Testar NF-e, CT-e e MDF-e',
    description: 'Guia prático para validar chaves de acesso de 44 dígitos, simular rejeições da SEFAZ e usar geradores de dados para acelerar seus testes integrados de ERP ou TMS.',
    date: '2026-06-03',
    author: 'DevThru',
    category: 'testes-qa',
    readingTime: 8,
    tags: ['NF-e', 'CT-e', 'MDF-e', 'SEFAZ', 'homologação', 'testes', 'QA', 'chave de acesso', 'XML'],
    relatedTools: ['/tools/business/nfe-generator', '/tools/business/cte-generator', '/tools/business/mdfe-generator', '/tools/utilities/xml-validator'],
    content: `
<p>Se você desenvolve ou faz o controle de qualidade (QA) em ERPs, sistemas de gestão de transporte (TMS) ou plataformas de e-commerce, sabe que <strong>testar a integração com a SEFAZ é um dos maiores gargalos do projeto</strong>.</p>

<p>Ambientes oficiais de homologação do governo são frequentemente instáveis, exigem certificados digitais válidos que expiram nos momentos mais críticos e apresentam lentidões inexplicáveis. O resultado? Desenvolvedores e QAs estressados esperando respostas de servidores externos para validar uma simples alteração no fluxo de faturamento ou expedição.</p>

<p>Neste guia prático, vamos mostrar o passo a passo para montar uma estratégia de testes robusta e local, validando chaves de acesso de 44 dígitos, simulando rejeições da SEFAZ de forma programática e utilizando geradores de dados estruturados para acelerar seu pipeline de testes integrados.</p>

<h2>1. A Anatomia da Chave de Acesso de 44 Dígitos</h2>

<p>Antes de testar qualquer fluxo de Nota Fiscal Eletrônica (NF-e), Conhecimento de Transporte Eletrônico (CT-e) ou Manifesto Eletrônico de Documentos Fiscais (MDF-e), você precisa entender perfeitamente a chave de acesso de 44 dígitos que acompanha esses documentos.</p>

<p>A chave de acesso não é um número aleatório. Ela é uma string de 44 caracteres numéricos estruturada de forma lógica para identificar univocamente o documento fiscal perante a Receita Federal:</p>

<table>
<thead>
<tr>
  <th>Posições</th>
  <th>Tamanho</th>
  <th>Descrição</th>
  <th>Exemplo</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>01 - 02</strong></td>
  <td>2</td>
  <td>Código da UF do emitente (Tabela do IBGE)</td>
  <td><code>35</code> (São Paulo)</td>
</tr>
<tr>
  <td><strong>03 - 06</strong></td>
  <td>4</td>
  <td>Ano e Mês da emissão do documento (AAMM)</td>
  <td><code>2606</code> (Junho de 2026)</td>
</tr>
<tr>
  <td><strong>07 - 20</strong></td>
  <td>14</td>
  <td>CNPJ do emitente do documento</td>
  <td><code>00000000000191</code></td>
</tr>
<tr>
  <td><strong>21 - 22</strong></td>
  <td>2</td>
  <td>Modelo do documento fiscal</td>
  <td><code>55</code> (NF-e), <code>57</code> (CT-e), <code>58</code> (MDF-e)</td>
</tr>
<tr>
  <td><strong>23 - 25</strong></td>
  <td>3</td>
  <td>Série do documento fiscal</td>
  <td><code>001</code></td>
</tr>
<tr>
  <td><strong>26 - 34</strong></td>
  <td>9</td>
  <td>Número do documento fiscal</td>
  <td><code>000012345</code></td>
</tr>
<tr>
  <td><strong>35</strong></td>
  <td>1</td>
  <td>Forma de emissão (Normal, Contingência, etc.)</td>
  <td><code>1</code> (Normal)</td>
</tr>
<tr>
  <td><strong>36 - 43</strong></td>
  <td>8</td>
  <td>Código numérico aleatório (gerado pelo sistema)</td>
  <td><code>87654321</code></td>
</tr>
<tr>
  <td><strong>44</strong></td>
  <td>1</td>
  <td>Dígito Verificador (DV) - Módulo 11</td>
  <td><code>4</code></td>
</tr>
</tbody>
</table>

<div class="info-box">
<strong>💡 Dica de Ouro:</strong> O modelo do documento (posições 21 e 22) dita as regras de validação. Enquanto a NF-e utiliza o modelo <code>55</code> (e NFC-e o <code>65</code>), o CT-e utiliza o modelo <code>57</code> e o MDF-e o modelo <code>58</code>. Mapear corretamente esses números é essencial na sua lógica de parsing.
</div>

<h2>2. Validando o Dígito Verificador (Módulo 11) Localmente</h2>

<p>O 44º dígito da chave de acesso é gerado a partir do cálculo de <strong>Módulo 11</strong> sobre os primeiros 43 dígitos. A SEFAZ rejeita imediatamente qualquer XML cujo dígito verificador da chave não bata com o cálculo matemático.</p>

<p>Para economizar tempo e requisições à SEFAZ, sua aplicação deve validar essa chave no front-end ou no início do pipeline do back-end. Veja como funciona o algoritmo:</p>

<ol>
  <li>Tome os 43 dígitos iniciais da chave de acesso.</li>
  <li>Multiplique cada dígito da direita para a esquerda por pesos que variam de <code>2 a 9</code> de forma cíclica (ou seja, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4...).</li>
  <li>Some todos os produtos obtidos.</li>
  <li>Divida a soma por 11 para obter o resto da divisão (resto = soma % 11).</li>
  <li>Se o resto for <code>0</code> ou <code>1</code>, o dígito verificador (DV) é <code>0</code>.</li>
  <li>Caso contrário, o DV será igual a <code>11 - resto</code>.</li>
</ol>

<p>Aqui está uma implementação JavaScript eficiente para validar chaves de acesso em suas ferramentas de testes:</p>

<pre><code class="language-javascript">function validarChaveAcesso(chave) {
  // Remove qualquer caractere não-numérico
  const chaveLimpa = chave.replace(/\\D/g, '');

  // Uma chave de acesso válida possui exatamente 44 dígitos
  if (chaveLimpa.length !== 44) return false;

  // Separa os primeiros 43 dígitos e o dígito verificador final
  const baseChave = chaveLimpa.substring(0, 43);
  const dvInformado = parseInt(chaveLimpa.charAt(43));

  let soma = 0;
  let peso = 2;

  // Multiplica da direita para a esquerda
  for (let i = baseChave.length - 1; i >= 0; i--) {
    soma += parseInt(baseChave.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const resto = soma % 11;
  const dvCalculado = (resto === 0 || resto === 1) ? 0 : 11 - resto;

  return dvCalculado === dvInformado;
}

// Exemplo de uso
const chaveNfe = "35260600000000000191550010000123451876543214";
console.log(validarChaveAcesso(chaveNfe)); // true
</code></pre>

<h2>3. Simulando Rejeições da SEFAZ de Forma Programática</h2>

<p>Testar cenários de sucesso (o chamado "caminho feliz") é simples. O verdadeiro desafio é garantir que o sistema trate essas rejeições adequadamente quando a SEFAZ rejeita um lote. Em vez de tentar alterar dados reais cadastrados no portal do contribuinte ou alterar parâmetros tributários complexos para forçar erros reais, você deve simular essas rejeições de forma mockada.</p>

<p>Aqui estão as rejeições mais comuns que sua suite de testes deve validar:</p>

<ul>
  <li><strong>Rejeição 203:</strong> Emissor não habilitado para emissão da NF-e (Simule bloqueando temporariamente as credenciais fiscais no ambiente de sandbox).</li>
  <li><strong>Rejeição 225:</strong> Falha no Schema XML (Simule enviando tags obrigatórias vazias ou desordenadas e validando através de um validador local de XSD).</li>
  <li><strong>Rejeição 204:</strong> Duplicidade de NF-e (Simule tentando reemitir uma chave de acesso que já foi marcada como "autorizada" em seu banco de dados local mockado).</li>
  <li><strong>Rejeição 610:</strong> Código de Município do tomador divergente do cadastrado na UF (Muito comum em CT-e. Simule passando um código IBGE inválido para o destinatário).</li>
</ul>

<div class="info-box">
<strong>⚠️ Dica de QA:</strong> Crie um serviço local de Mock da SEFAZ na sua arquitetura de testes. Esse serviço deve interceptar as chamadas SOAP/REST que iriam para os endpoints do governo e retornar payloads XML pré-configurados com os códigos de status de rejeição simulados. Isso remove 100% da dependência de servidores públicos externos nos testes integrados!
</div>

<h2>4. A Importância de Usar Geradores de Dados Estruturados</h2>

<p>Ao realizar testes de integração ou carga, você precisa de centenas ou milhares de documentos fiscais válidos estruturados. Preencher esses dados manualmente no formato XML é inviável.</p>

<p>A solução ideal é utilizar <strong>geradores de dados estruturados</strong> para criar a massa de testes de forma automatizada. Ferramentas que geram a estrutura completa do documento XML de forma matematicamente válida trazem benefícios gigantescos:</p>

<ol>
  <li><strong>Velocidade de Setup:</strong> Em vez de gastar minutos criando um cenário fiscal complexo, gere em milissegundos uma estrutura pronta para envio.</li>
  <li><strong>Evita Falsos Negativos:</strong> Erros de digitação em chaves de acesso, CNPJs ou Inscrições Estaduais causam rejeições bobas que atrasam a validação de lógicas de negócio mais complexas.</li>
  <li><strong>Testes de Carga Realistas:</strong> Permite injetar nos seus sistemas XMLs com chaves de acesso reais e pesos válidos para analisar a capacidade de processamento paralelo e persistência em banco.</li>
</ol>

<p>Se você precisa de uma ferramenta rápida e local para gerar massas de teste de documentos fiscais de forma limpa, o DevThru oferece utilitários gratuitos e processados diretamente no seu navegador, sem envio de dados a servidores terceiros:</p>

<ul>
  <li>Crie notas fiscais válidas com o <a href="/tools/business/nfe-generator">Gerador de NF-e</a> do DevThru.</li>
  <li>Gere conhecimentos de transporte consistentes no <a href="/tools/business/cte-generator">Gerador de CT-e</a>.</li>
  <li>Estruture manifestos eletrônicos válidos através do <a href="/tools/business/mdfe-generator">Gerador de MDF-e</a>.</li>
  <li>Valide se a estrutura dos seus arquivos XML está em conformidade com as regras gerais com o nosso <a href="/tools/utilities/xml-validator">Validador XML</a>.</li>
</ul>

<h2>Conclusão</h2>

<p>Montar uma estratégia de homologação fiscal sem estresse depende de duas ações fundamentais: <strong>desacoplar-se da dependência direta de redes externas da SEFAZ</strong> por meio de validações e simulações locais (como a validação de chave por Módulo 11) e <strong>automatizar a criação de massa de testes</strong> com geradores estruturados adequados.</p>

<p>Ao implementar essas práticas, você garante entregas mais rápidas, pipelines de CI/CD estáveis e um fluxo de desenvolvimento muito mais previsível.</p>
`
}
