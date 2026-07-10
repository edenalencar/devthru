import { BlogPost } from '../index'

export const postPxVsRemComoEPorQueAdotarUnidadesRelativasNoCss: BlogPost = {
    slug: 'px-vs-rem-como-e-por-que-adotar-unidades-relativas-no-css',
    title: 'PX vs REM: Como e Por Que Adotar no CSS',
    description: 'Entenda a diferença técnica entre pixels e REM. Descubra a importância das unidades relativas para acessibilidade e design responsivo moderno.',
    date: '2026-07-13',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['CSS', 'Design Responsivo', 'PX', 'REM', 'Acessibilidade', 'Web Design'],
    relatedTools: ['/tools/converters/pixel-to-rem'],
    content: `
<p>Durante muito tempo no desenvolvimento web, a unidade de medida padrão absoluta para quase tudo no CSS foi o pixel (<code>px</code>). De larguras de containers a tamanhos de fontes, margens e espaçamentos internos, colocar valores estáticos em pixels parecia a maneira mais segura de garantir que o design ficasse idêntico ao protótipo do Figma em todas as telas.</p>

<p>Contudo, na era do design responsivo dinâmico e, acima de tudo, da <strong>acessibilidade digital</strong>, o pixel estático tornou-se um grande vilão. Hoje, as boas práticas de desenvolvimento web ditam o uso de unidades relativas, principalmente o <strong>REM</strong>. Neste artigo, vamos entender por que você deve fazer a transição de PX para REM em suas folhas de estilo.</p>

<h2>1. A Diferença Fundamental entre PX e REM</h2>

<p>Para entender o benefício, primeiro precisamos diferenciar a natureza matemática dessas duas unidades:</p>

<ul>
  <li><strong>Pixel (px)</strong>: É uma unidade de medida física absoluta. Definir <code>font-size: 16px</code> diz ao navegador para renderizar o texto exatamente com 16 pixels de altura, ignorando qualquer configuração externa ou preferência do usuário.</li>
  <li><strong>REM (Root EM)</strong>: É uma unidade de medida relativa baseada diretamente no tamanho de fonte do elemento raiz do documento HTML (a tag <code>html</code>). Por padrão, a maioria dos navegadores modernos define o tamanho de fonte raiz padrão como <code>16px</code>. Logo, <code>1rem</code> equivale a <code>16px</code>, <code>2rem</code> equivale a <code>32px</code>, e assim por diante.</li>
</ul>

<h2>2. Por Que Usar REM? O Pilar da Acessibilidade</h2>

<p>O maior motivo para usar REM não é apenas visual, mas sim social e técnico. Muitos usuários com problemas de visão (ou que simplesmente usam monitores de alta resolução ou telas pequenas) ajustam o tamanho padrão de fonte em suas configurações de sistema ou do próprio navegador de "Médio/Padrão" para "Grande" ou "Muito Grande".</p>

<p>Se as fontes do seu site forem definidas em pixels absolutos:</p>
<ul>
  <li>O navegador do usuário irá ignorar a preferência de acessibilidade configurada e exibirá o texto pequeno e ilegível em pixels fixos.</li>
  <li>Isso quebra a experiência do usuário e viola diretrizes internacionais de acessibilidade (WCAG).</li>
</ul>

<p>Se as fontes forem definidas em REM:</p>
<ul>
  <li>O navegador calculará o tamanho proporcionalmente. Se o usuário aumentar a fonte raiz para <code>20px</code>, um texto definido como <code>1.5rem</code> se ajustará dinamicamente para <code>30px</code> (1.5 x 20), mantendo a proporção ideal do layout e a legibilidade.</li>
</ul>

<div class="info-box">
  <strong>💡 Regra Prática:</strong> Use <strong>REM</strong> para tudo que envolve texto, espaçamentos internos (padding), margens externas (margin) e dimensões de layout que precisam expandir conforme as fontes escalam. Deixe o <strong>Pixel</strong> apenas para bordas muito finas (ex: <code>border: 1px solid</code>) onde o tamanho não deve flutuar.
</div>

<h2>3. A Fórmula de Conversão de PX para REM</h2>

<p>Para converter qualquer valor em pixels para REM, basta dividir o valor desejado em pixels pelo tamanho de fonte base (raiz) do projeto. Considerando a base padrão de <code>16px</code>, a fórmula matemática é simples:</p>

<p style="text-align: center; font-size: 1.1rem; font-weight: bold; margin: 1.5rem 0;">
  Valor em REM = Valor em PX ÷ 16
</p>

<p>Por exemplo, se você tem um título com <code>24px</code> no seu layout, o cálculo para REM seria:</p>

<p style="text-align: center; font-size: 1.1rem; font-weight: bold; margin: 1.5rem 0;">
  24 ÷ 16 = 1.5rem
</p>

<p>Se você tem um padding de <code>40px</code>:</p>

<p style="text-align: center; font-size: 1.1rem; font-weight: bold; margin: 1.5rem 0;">
  40 ÷ 16 = 2.5rem
</p>

<h2>Conclusão</h2>

<p>Substituir PX por REM no CSS do seu projeto garante que o seu site seja acessível, escalável e se comporte de forma consistente nas mãos de qualquer tipo de usuário, independentemente de suas preferências ou limitações visuais.</p>

<p>Precisa acelerar a conversão dos valores do Figma para CSS sem perder tempo fazendo cálculos de divisão de cabeça a cada linha de código? Utilize o <a href="/tools/converters/pixel-to-rem">Conversor de Pixel para REM</a> do DevThru para traduzir seus pixels instantaneamente.</p>
`
}
