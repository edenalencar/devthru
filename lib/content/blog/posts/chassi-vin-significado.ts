import { BlogPost } from '../index'

export const postChassiVinSignificado: BlogPost = {
    slug: 'numero-chassi-vin-significado',
    title: 'Número de Chassi (VIN): O Que Cada Dígito Significa',
    description: 'Entenda a estrutura completa do código VIN de 17 caracteres. Descubra como identificar fabricante, modelo, ano e país de origem direto pelo chassi do veículo.',
    date: '2026-02-27',
    author: 'DevThru',
    category: 'automotivo',
    readingTime: 7,
    tags: ['chassi', 'VIN', 'código veicular', 'DENATRAN', 'frota', 'automotivo'],
    relatedTools: ['/tools/automotive/chassi', '/tools/automotive/fipe'],
    content: `
<p>Se você já precisou cadastrar veículos em um sistema, integrar com o DENATRAN ou simplesmente entender aquela sequência de 17 caracteres gravada no painel do carro, este guia é para você. O <strong>número de chassi</strong>, oficialmente chamado de <strong>VIN (Vehicle Identification Number)</strong>, é o "CPF" do veículo — e cada dígito tem um significado.</p>

<h2>O Que É o VIN?</h2>

<p>O VIN é um código alfanumérico de <strong>17 caracteres</strong> padronizado internacionalmente pela norma <strong>ISO 3779</strong>. Ele identifica de forma única cada veículo fabricado no mundo desde 1981. Diferente da placa (que pode mudar), o VIN é permanente e acompanha o veículo por toda a vida.</p>

<div class="info-box">
<strong>💡 Curiosidade:</strong> As letras <code>I</code>, <code>O</code> e <code>Q</code> nunca aparecem no VIN, pois podem ser confundidas com os números <code>1</code>, <code>0</code> e <code>9</code>.
</div>

<h2>Estrutura do VIN: As 3 Seções</h2>

<p>O VIN é dividido em 3 partes principais:</p>

<table>
<thead>
<tr><th>Seção</th><th>Posições</th><th>Nome</th><th>O Que Identifica</th></tr>
</thead>
<tbody>
<tr><td>1ª</td><td>1–3</td><td>WMI</td><td>Fabricante (país + montadora)</td></tr>
<tr><td>2ª</td><td>4–9</td><td>VDS</td><td>Descrição do veículo (modelo, motor, carroceria)</td></tr>
<tr><td>3ª</td><td>10–17</td><td>VIS</td><td>Identificação individual (ano, planta, sequência)</td></tr>
</tbody>
</table>

<h2>WMI – World Manufacturer Identifier (Posições 1–3)</h2>

<p>Os 3 primeiros caracteres identificam <strong>quem fabricou</strong> e <strong>onde</strong>:</p>

<h3>Posição 1: País de origem</h3>

<table>
<thead>
<tr><th>Caractere</th><th>País/Região</th></tr>
</thead>
<tbody>
<tr><td>1, 4, 5</td><td>Estados Unidos</td></tr>
<tr><td>2</td><td>Canadá</td></tr>
<tr><td>3</td><td>México</td></tr>
<tr><td>9</td><td>Brasil</td></tr>
<tr><td>J</td><td>Japão</td></tr>
<tr><td>K</td><td>Coreia do Sul</td></tr>
<tr><td>S–Z</td><td>Europa</td></tr>
</tbody>
</table>

<h3>Posições 2–3: Fabricante</h3>

<p>Exemplos de WMIs de marcas populares no Brasil:</p>

<table>
<thead>
<tr><th>WMI</th><th>Fabricante</th></tr>
</thead>
<tbody>
<tr><td>9BW</td><td>Volkswagen do Brasil</td></tr>
<tr><td>9BG</td><td>Chevrolet (GM Brasil)</td></tr>
<tr><td>9BD</td><td>Fiat do Brasil</td></tr>
<tr><td>93H</td><td>Honda do Brasil</td></tr>
<tr><td>9BF</td><td>Ford do Brasil</td></tr>
</tbody>
</table>

<h2>VDS – Vehicle Descriptor Section (Posições 4–9)</h2>

<p>Cada fabricante define como usar essas 6 posições para descrever o veículo. Geralmente incluem:</p>

<ul>
<li><strong>Tipo de carroceria:</strong> sedan, hatch, SUV, pickup</li>
<li><strong>Motorização:</strong> 1.0, 1.6, 2.0, elétrico</li>
<li><strong>Tipo de transmissão:</strong> manual, automática</li>
<li><strong>Sistema de segurança:</strong> airbags, freios ABS</li>
</ul>

<div class="info-box">
<strong>📌 Posição 9 (Dígito Verificador):</strong> Em veículos norte-americanos, a posição 9 é um dígito verificador calculado pela fórmula do <strong>NHTSA</strong>. No Brasil, essa posição pode conter outros dados dependendo do fabricante.
</div>

<h2>VIS – Vehicle Identifier Section (Posições 10–17)</h2>

<h3>Posição 10: Ano-modelo</h3>

<p>A posição 10 indica o <strong>ano-modelo</strong> do veículo usando um código:</p>

<table>
<thead>
<tr><th>Código</th><th>Ano</th><th>Código</th><th>Ano</th></tr>
</thead>
<tbody>
<tr><td>A</td><td>2010</td><td>J</td><td>2018</td></tr>
<tr><td>B</td><td>2011</td><td>K</td><td>2019</td></tr>
<tr><td>C</td><td>2012</td><td>L</td><td>2020</td></tr>
<tr><td>D</td><td>2013</td><td>M</td><td>2021</td></tr>
<tr><td>E</td><td>2014</td><td>N</td><td>2022</td></tr>
<tr><td>F</td><td>2015</td><td>P</td><td>2023</td></tr>
<tr><td>G</td><td>2016</td><td>R</td><td>2024</td></tr>
<tr><td>H</td><td>2017</td><td>S</td><td>2025</td></tr>
</tbody>
</table>

<h3>Posição 11: Planta de montagem</h3>
<p>Indica em qual fábrica o veículo foi montado. Cada fabricante atribui códigos às suas plantas.</p>

<h3>Posições 12–17: Número sequencial</h3>
<p>É o número de série individual do veículo na linha de produção. Garante a unicidade do VIN.</p>

<h2>Como Decodificar um VIN na Prática</h2>

<p>Vamos decodificar o VIN fictício <code>9BWZZZ377VT004251</code>:</p>

<pre><code>9   → Brasil
BW  → Volkswagen do Brasil
ZZZ → (preenchimento VW)
3   → Gol
77  → Motor 1.0
V   → Ano-modelo (não utilizado neste padrão)
T   → Planta de São Bernardo do Campo
004251 → Unidade nº 4.251 da linha
</code></pre>

<h2>Onde Encontrar o VIN no Veículo</h2>

<ol>
<li><strong>Para-brisa inferior esquerdo:</strong> visível de fora do carro</li>
<li><strong>Coluna da porta do motorista:</strong> na etiqueta fixada</li>
<li><strong>Documento do veículo (CRV/CRLV):</strong> campo "Chassi"</li>
<li><strong>Motor:</strong> gravado no bloco do motor (parcial)</li>
</ol>

<h2>Uso em Sistemas de Software</h2>

<p>Para desenvolvedores que trabalham com sistemas automotivos, o VIN é essencial para:</p>

<ul>
<li><strong>Cadastro de frotas:</strong> identificação única de cada veículo</li>
<li><strong>Integração com DENATRAN:</strong> consulta de multas e restrições</li>
<li><strong>Sistemas de segurança:</strong> verificação de procedência</li>
<li><strong>E-commerce automotivo:</strong> garantia de compatibilidade de peças</li>
</ul>

<p>Para testar esses sistemas sem depender de dados reais, use nosso <a href="/tools/automotive/chassi">Gerador de Chassi (VIN)</a> para criar códigos estruturalmente válidos.</p>

<h2>Perguntas Frequentes</h2>

<h3>O VIN pode mudar?</h3>
<p>Não. O VIN é gravado permanentemente no chassi do veículo e no motor. Adulteração do VIN é crime previsto no Código Penal (Art. 311).</p>

<h3>Todo veículo tem VIN de 17 caracteres?</h3>
<p>Veículos fabricados antes de 1981 podem ter VINs com menos de 17 caracteres, pois a padronização ISO 3779 só foi adotada mundialmente naquele ano.</p>

<h3>É possível descobrir se um VIN é real?</h3>
<p>Sim. Órgãos como o DENATRAN e seguradoras mantêm bancos de dados. Para testes de software, sempre use VINs gerados por ferramentas como o nosso <a href="/tools/automotive/chassi">Gerador de Chassi</a>.</p>
`
}
