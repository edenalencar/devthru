import { BlogPost } from '../index'

export const postDanfseNt009ValidacaoXmlIbsCbs: BlogPost = {
    slug: 'danfse-nt-009-validacao-xml-ibs-cbs',
    title: 'O que muda no DANFSe com a NT 009 (IBS/CBS)?',
    description: 'Entenda os 4 campos da NT 009 que quebram o DANFSe da Receita, os novos caminhos do XML IBS/CBS e como validar a sintaxe do arquivo no navegador.',
    date: '2026-11-20',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 8,
    tags: ['DANFSe', 'NFS-e', 'NT 009', 'Reforma Tributária', 'IBS', 'CBS', 'XML', 'Receita Federal'],
    relatedTools: [
        '/tools/utilities/xml-validator',
        '/tools/business/nfe-decoder',
        '/tools/business/nfe-generator',
    ],
    content: `
<p><strong>Aviso:</strong> este é um guia técnico independente, baseado na Nota Técnica SE/CGNFS-e nº 009 (v1.01) e nos repositórios públicos da Receita Federal. O DevThru não é um canal oficial do Fisco.</p>

<p>Com a <strong>Nota Técnica nº 009 (v1.01)</strong> da NFS-e de padrão nacional, quatro informações críticas de <strong>IBS, CBS e ISSQN</strong> mudaram de lugar ou de nome no XML: <code>finNFSe</code>, o par <code>CST</code>/<code>cClassTrib</code>, os ajustes de dedução do ISSQN (<code>vAjusteBC</code> / <code>vCalcAjusteBCISSQN</code>) e os ajustes da base de cálculo do IBS/CBS (<code>vCalcAjusteBCIBSCBS</code>). Na versão 1.0.0 do gerador oficial em código aberto (<code>ReceitaFederal/calculadora-rtc-gerador-danfse</code>, issue #11), o serviço ainda procura as tags nos caminhos antigos e imprime traço (<code>-</code>) ou omite valores no PDF do DANFSe. A previsão de entrada em produção do release 1 da NT 009 é <strong>01/12/2026</strong> <!-- A CONFERIR no cronograma oficial em gov.br/nfse antes do deploy -->.</p>

<h2>1. Quais são os 4 campos que mudam no XML da NT 009?</h2>

<p>A tabela abaixo resume o que muda no leiaute da Declaração de Prestação de Serviços (DPS) e da NFS-e conforme a <strong>NT 009 v1.01</strong> (11/09/2026) e o impacto registrado na issue #11 do gerador oficial de DANFSe:</p>

<table>
  <thead>
    <tr>
      <th>Campo no DANFSe</th>
      <th>Caminho / tag anterior</th>
      <th>Caminho / tag na NT 009 v1.01</th>
      <th>Seção da NT 009</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Finalidade</strong></td>
      <td><code>infDPS/IBSCBS/finNFSe</code></td>
      <td><code>NFSe/infNFSe/DPS/infDPS/finNFSe</code> (domínio: <code>0</code> regular, <code>1</code> crédito, <code>2</code> débito)</td>
      <td>§2.2 (p. 4)</td>
    </tr>
    <tr>
      <td><strong>CST e cClassTrib</strong></td>
      <td><code>IBSCBS/valores/trib/gIBSCBS/</code></td>
      <td><code>NFSe/infNFSe/DPS/infDPS/IBSCBS/valores/trib/</code> (antes de <code>gIBSCBS</code>, que passa a ser opcional <code>0-1</code>)</td>
      <td>§2.16 (p. 21–22)</td>
    </tr>
    <tr>
      <td><strong>Total Deduções / Reduções (ISSQN)</strong></td>
      <td><code>vDedRed</code> (DPS) e <code>vCalcDR</code> (NFS-e)</td>
      <td><code>vAjusteBC</code> (DPS) e <code>NFSe/infNFSe/valores/vCalcAjusteBCISSQN</code> (NFS-e)</td>
      <td>§2.3 (p. 4–8)</td>
    </tr>
    <tr>
      <td><strong>Exclusões e Reduções da BC (IBS/CBS)</strong></td>
      <td><code>gReeRepRes</code> (DPS) e <code>vCalcReeRepRes</code> (NFS-e)</td>
      <td>Unificado em <code>vAjusteBC</code> (DPS) e <code>NFSe/infNFSe/IBSCBS/valores/vCalcAjusteBCIBSCBS</code> (NFS-e)</td>
      <td>§2.3 (p. 4–8)</td>
    </tr>
  </tbody>
</table>

<p>O reposicionamento de <code>CST</code> e <code>cClassTrib</code> para fora de <code>gIBSCBS</code> (§2.16) tem um motivo prático: permitir que o sistema identifique o enquadramento tributário antes de decidir se o grupo detalhado <code>gIBSCBS</code> deve existir no XML. Em casos como <strong>CST 400</strong> (Isenção), <strong>CST 410</strong> (Imunidade e não incidência) e <strong>CST 820</strong> (Tributação em documento específico), o grupo <code>gIBSCBS</code> pode ser omitido conforme o indicador <code>ind_gIBSCBS</code> da tabela oficial.</p>

<h2>2. Exemplo passo a passo com XML fictício da NT 009</h2>

<p>Abaixo está um recorte mínimo de XML <strong>100% fictício</strong> (apenas para testes de integração e leitura de tags — nunca use CNPJ ou chaves reais em homologação) já estruturado nos caminhos da NT 009 v1.01:</p>

<pre><code class="language-xml">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;NFSe xmlns="http://www.sped.fazenda.gov.br/nfse" versao="1.01"&gt;
  &lt;infNFSe&gt;
    &lt;valores&gt;
      &lt;vCalcAjusteBCISSQN&gt;1900.00&lt;/vCalcAjusteBCISSQN&gt;
      &lt;vBC&gt;8000.00&lt;/vBC&gt;
    &lt;/valores&gt;
    &lt;IBSCBS&gt;
      &lt;valores&gt;
        &lt;vBC&gt;8975.00&lt;/vBC&gt;
        &lt;vCalcAjusteBCIBSCBS&gt;400.00&lt;/vCalcAjusteBCIBSCBS&gt;
      &lt;/valores&gt;
    &lt;/IBSCBS&gt;
    &lt;DPS&gt;
      &lt;infDPS&gt;
        &lt;finNFSe&gt;0&lt;/finNFSe&gt;
        &lt;valores&gt;
          &lt;vAjusteBC&gt;
            &lt;vAjusteBCISSQN&gt;1900.00&lt;/vAjusteBCISSQN&gt;
          &lt;/vAjusteBC&gt;
        &lt;/valores&gt;
        &lt;IBSCBS&gt;
          &lt;valores&gt;
            &lt;trib&gt;
              &lt;CST&gt;000&lt;/CST&gt;
              &lt;cClassTrib&gt;000001&lt;/cClassTrib&gt;
            &lt;/trib&gt;
          &lt;/valores&gt;
        &lt;/IBSCBS&gt;
      &lt;/infDPS&gt;
    &lt;/DPS&gt;
  &lt;/infNFSe&gt;
&lt;/NFSe&gt;</code></pre>

<p>Para conferir se o seu ERP está gerando a estrutura sem tags abertas, caracteres inválidos ou fechamentos trocados antes de enviar o arquivo ao gerador de DANFSe ou à SEFIN Nacional, faça a checagem em duas camadas:</p>

<ol>
  <li><strong>Camada 1 — Sintaxe (well-formedness):</strong> garanta que o XML esteja bem formado (namespace, fechamento correto de <code>&lt;CST&gt;</code>, <code>&lt;cClassTrib&gt;</code> e <code>&lt;vAjusteBC&gt;</code>, caracteres especiais escapados).</li>
  <li><strong>Camada 2 — Esquema XSD e regras de negócio:</strong> valide o XML contra os arquivos XSD oficiais da NT 009 no ambiente de Produção Restrita ou via endpoint <code>POST /xml/validate</code> da Calculadora oficial da Receita Federal.</li>
</ol>

<p>Para testar sem código, use o <a href="/tools/utilities/xml-validator">Validador de XML do DevThru</a>. Ele roda no seu navegador e não envia os dados.</p>

<p><strong>Limites importantes da ferramenta:</strong> o Validador de XML do DevThru verifica <strong>apenas a sintaxe</strong> (se o XML está bem formado, apontando linha e coluna de tags abertas ou fechadas incorretamente). Ele <strong>não valida contra Schema XSD ou DTD</strong>, não aplica regras de negócio da NT 009 e não substitui o validador da SEFIN Nacional nem a Calculadora de Tributos oficial da Receita Federal. Já quando um documento em <code>vAjusteBC/documentos/docAjusteBC/dFeNacional/chaveDFe</code> referencia uma NF-e ou CT-e de 44 dígitos, você pode inspecionar a estrutura da chave separadamente usando o Decodificador de Chave SEFAZ (que valida o Módulo 11 localmente e não consulta a SEFAZ).</p>

<h2>3. Como conferir os 4 caminhos da NT 009 por código</h2>

<p>Os exemplos abaixo leem o XML fictício da seção anterior e conferem se os quatro pontos alterados pela NT 009 estão presentes nos caminhos novos. Use-os em testes automatizados do seu ERP para evitar regressões ao atualizar o gerador de XML.</p>

<h3>JavaScript (Node.js / navegador com DOMParser ou regex simples de verificação)</h3>
<pre><code class="language-javascript">// Exemplo para navegador (DOMParser nativo)
function verificarCamposNT009(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('XML malformado');
  }
  const texto = (seletor) =&gt; doc.querySelector(seletor)?.textContent?.trim() ?? null;

  return {
    finNFSe: texto('infDPS &gt; finNFSe'),
    cst: texto('infDPS &gt; IBSCBS &gt; valores &gt; trib &gt; CST'),
    cClassTrib: texto('infDPS &gt; IBSCBS &gt; valores &gt; trib &gt; cClassTrib'),
    vCalcAjusteBCISSQN: texto('infNFSe &gt; valores &gt; vCalcAjusteBCISSQN'),
    vCalcAjusteBCIBSCBS: texto('infNFSe &gt; IBSCBS &gt; valores &gt; vCalcAjusteBCIBSCBS'),
  };
}</code></pre>

<h3>Python (biblioteca padrão <code>xml.etree.ElementTree</code>)</h3>
<pre><code class="language-python">import xml.etree.ElementTree as ET

NS = {"nfse": "http://www.sped.fazenda.gov.br/nfse"}

def verificar_campos_nt009(xml_str: str) -&gt; dict:
    root = ET.fromstring(xml_str)
    def achar(caminho: str):
        el = root.find(caminho, NS)
        return el.text.strip() if el is not None and el.text else None

    return {
        "finNFSe": achar(".//nfse:infDPS/nfse:finNFSe"),
        "CST": achar(".//nfse:infDPS/nfse:IBSCBS/nfse:valores/nfse:trib/nfse:CST"),
        "cClassTrib": achar(".//nfse:infDPS/nfse:IBSCBS/nfse:valores/nfse:trib/nfse:cClassTrib"),
        "vCalcAjusteBCISSQN": achar("./nfse:infNFSe/nfse:valores/nfse:vCalcAjusteBCISSQN"),
        "vCalcAjusteBCIBSCBS": achar("./nfse:infNFSe/nfse:IBSCBS/nfse:valores/nfse:vCalcAjusteBCIBSCBS"),
    }</code></pre>

<h3>Java (JDK 21 com <code>javax.xml.xpath</code>)</h3>
<pre><code class="language-java">import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class VerificadorNT009 {
    public static Map&lt;String, String&gt; extrair(String xml) throws Exception {
        var dbf = DocumentBuilderFactory.newInstance();
        dbf.setNamespaceAware(false);
        var doc = dbf.newDocumentBuilder()
            .parse(new ByteArrayInputStream(xml.getBytes(StandardCharsets.UTF_8)));
        XPath xp = XPathFactory.newInstance().newXPath();

        return Map.of(
            "finNFSe", xp.evaluate("//infDPS/finNFSe", doc),
            "CST", xp.evaluate("//infDPS/IBSCBS/valores/trib/CST", doc),
            "cClassTrib", xp.evaluate("//infDPS/IBSCBS/valores/trib/cClassTrib", doc),
            "vCalcAjusteBCISSQN", xp.evaluate("/NFSe/infNFSe/valores/vCalcAjusteBCISSQN", doc),
            "vCalcAjusteBCIBSCBS", xp.evaluate("/NFSe/infNFSe/IBSCBS/valores/vCalcAjusteBCIBSCBS", doc)
        );
    }
}</code></pre>

<h3>C# (.NET com <code>System.Xml.Linq</code>)</h3>
<pre><code class="language-csharp">using System.Xml.Linq;

static Dictionary&lt;string, string?&gt; VerificarCamposNT009(string xml)
{
    XNamespace ns = "http://www.sped.fazenda.gov.br/nfse";
    var doc = XDocument.Parse(xml);
    var infNFSe = doc.Root?.Element(ns + "infNFSe");
    var infDPS = infNFSe?.Element(ns + "DPS")?.Element(ns + "infDPS");
    var trib = infDPS?.Element(ns + "IBSCBS")?.Element(ns + "valores")?.Element(ns + "trib");

    return new Dictionary&lt;string, string?&gt;
    {
        ["finNFSe"] = infDPS?.Element(ns + "finNFSe")?.Value,
        ["CST"] = trib?.Element(ns + "CST")?.Value,
        ["cClassTrib"] = trib?.Element(ns + "cClassTrib")?.Value,
        ["vCalcAjusteBCISSQN"] = infNFSe?.Element(ns + "valores")?.Element(ns + "vCalcAjusteBCISSQN")?.Value,
        ["vCalcAjusteBCIBSCBS"] = infNFSe?.Element(ns + "IBSCBS")?.Element(ns + "valores")?.Element(ns + "vCalcAjusteBCIBSCBS")?.Value,
    };
}</code></pre>

<h2>4. Como isso se conecta ao Split Payment e à Calculadora oficial</h2>

<p>A NT 009 também criou o grupo <code>gPgtoVinc</code> (§2.8, p. 13) para vincular a NFS-e às transações financeiras de pagamento, preparando o terreno para a retenção na liquidação financeira. Para ver como a arquitetura de pagamento se integra aos três repositórios abertos da Receita Federal e ao cuidado com a vigência de <code>cClassTrib</code>, leia o nosso <a href="/blog/split-payment-reforma-tributaria-guia-desenvolvedor">guia de Split Payment na Reforma Tributária para desenvolvedores</a>.</p>

<h2>Fontes oficiais (verificadas em 19/11/2026)</h2>
<ul>
  <li><strong>Nota Técnica SE/CGNFS-e nº 009 – Versão 1.01</strong> (11/09/2026): <a href="https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/rtc/nota-tecnica-009-se-cgnfs-e-v-1-01.pdf" target="_blank" rel="noopener noreferrer">gov.br/nfse — PDF oficial</a> (§2.2, §2.3, §2.8, §2.13 e §2.16).</li>
  <li><strong>Documentação Técnica RTC da NFS-e Nacional:</strong> <a href="https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/rtc" target="_blank" rel="noopener noreferrer">gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/rtc</a>.</li>
  <li><strong>Repositório oficial do gerador de DANFSe (licença MIT) e Issue #11:</strong> <a href="https://github.com/ReceitaFederal/calculadora-rtc-gerador-danfse/issues/11" target="_blank" rel="noopener noreferrer">github.com/ReceitaFederal/calculadora-rtc-gerador-danfse/issues/11</a>.</li>
  <li><strong>Lei Complementar nº 214/2025:</strong> <a href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm" target="_blank" rel="noopener noreferrer">planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm</a>.</li>
</ul>
`,
    faqs: [
        {
            question: 'Por que Finalidade e CST/cClassTrib saem com traço (-) no gerador oficial de DANFSe?',
            answer: 'Na versão 1.0.0 do repositório ReceitaFederal/calculadora-rtc-gerador-danfse (issue #11), o serviço ainda busca finNFSe em infDPS/IBSCBS/ e CST/cClassTrib dentro de gIBSCBS. Na NT 009 v1.01, finNFSe foi movido para infDPS/ (§2.2) e CST/cClassTrib passaram para IBSCBS/valores/trib/ (§2.16).'
        },
        {
            question: 'O Validador de XML do DevThru valida o arquivo contra os esquemas XSD da NT 009?',
            answer: 'Não. O Validador de XML do DevThru roda localmente no navegador e verifica apenas a sintaxe (well-formedness), apontando tags abertas ou fechadas incorretamente. Para validar contra XSD e regras de negócio da NT 009, use o ambiente de Produção Restrita da NFS-e ou o endpoint /xml/validate da Calculadora oficial da Receita.'
        },
        {
            question: 'O grupo gIBSCBS é sempre obrigatório no XML da NFS-e na NT 009?',
            answer: 'Não. Conforme o §2.16 da NT 009 v1.01, o grupo gIBSCBS passou a ter ocorrência 0-1 (opcional) e só deve ser preenchido quando o indicador ind_gIBSCBS da tabela oficial de CST/cClassTrib exigir detalhamento (por exemplo, pode ser omitido nos CSTs 400, 410 e 820).'
        }
    ]
}
