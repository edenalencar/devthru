import { BlogPost } from '../index'

export const postSkillsDeIaEProgressiveDisclosureEconomiaDeContexto: BlogPost = {
    slug: 'skills-de-ia-e-progressive-disclosure-economia-de-contexto',
    title: 'Skills de IA e Progressive Disclosure',
    description: 'Saiba como aplicar o padrão Progressive Disclosure em Skills de IA para organizar instruções complexas, evitar alucinações e economizar contexto.',
    date: '2026-06-05',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['Progressive Disclosure', 'Skills de IA', 'Engenharia de Prompt', 'Context Window', 'Agentes Inteligentes'],
    relatedTools: ['/tools/utilities/json', '/tools/development/jwt-debugger'],
    content: `
<p>Os modelos de linguagem modernos (LLMs) possuem janelas de contexto (<em>context windows</em>) gigantescas, capazes de ler livros inteiros em segundos. No entanto, na engenharia de software assistida por IA, jogar toda a documentação, padrões de design e regras de código para o modelo de uma única vez é uma receita para o desastre.</p>

<p>Quanto maior o contexto desnecessário que a IA processa, maior a probabilidade de ela se perder, ignorar instruções críticas (fenômeno conhecido como <em>Lost in the Middle</em>) e alucinar. Para resolver isso, arquitetos de prompt e desenvolvedores de agentes estão adaptando um conceito consagrado do design de interfaces humanas para a inteligência artificial: o <strong>Progressive Disclosure</strong> (ou <em>Revelação Progressiva</em>).</p>

<p>Neste artigo, vamos entender como aplicar o Progressive Disclosure no desenvolvimento de <strong>Skills de IA</strong> para criar agentes muito mais focados, rápidos, baratos e precisos.</p>



<h2>O que é Progressive Disclosure?</h2>

<p>No design de interfaces tradicionais (UI/UX), o <strong>Progressive Disclosure</strong> é a prática de exibir apenas as informações e interações essenciais no primeiro contato do usuário, ocultando dados secundários ou avançados atrás de menus, abas ou botões de "Saiba Mais". Isso previne a sobrecarga cognitiva.</p>

<p>Ao transpor esse padrão para a <strong>interação com IAs e Agentes</strong>, a Revelação Progressiva dita que: <strong>não devemos enviar todas as instruções detalhadas de uma tarefa no prompt inicial. Em vez disso, fornecemos um índice de tópicos e deixamos que a IA decida ativamente quando ler os arquivos de detalhes sob demanda.</strong></p>

<div class="info-box">
  <strong>💡 Revelação Progressiva na prática:</strong> O agente de IA lê um arquivo de índice pequeno para entender onde encontrar as regras específicas e só lê essas regras adicionais quando estiver pronto para executar aquela etapa.
</div>



<h2>Anatomia de uma "Skill" Modular com IA</h2>

<p>Uma <strong>Skill</strong> (Habilidade) é um conjunto estruturado de regras e utilitários que ensina o agente de IA a realizar uma tarefa específica (como escrever um post de blog, realizar uma auditoria de segurança ou rodar testes automatizados).</p>

<p>Em um design robusto que utiliza a Revelação Progressiva, dividimos o conhecimento da Skill em sub-arquivos focados:</p>

<ol>
  <li><strong>O Índice (Ex: <code>SKILL.md</code>):</strong> Contém a descrição geral da habilidade e atua como o mapa de navegação com links para as seções específicas. É o único arquivo lido obrigatoriamente no início da sessão.</li>
  <li><strong>Módulos de Regras (Ex: <code>formatting.md</code>, <code>seo.md</code>):</strong> Arquivos contendo instruções detalhadas e específicas de cada fase, que só serão lidos pela IA caso a tarefa atual exija aquela etapa.</li>
</ol>



<h2>Exemplo Prático: Estruturando uma Habilidade Modular</h2>

<p>Imagine que você está ensinando uma IA a escrever e publicar posts no blog do seu projeto. Em vez de criar um único arquivo gigante de regras, estruturamos um diretório modular de Skill:</p>

<pre><code class="language-markdown">skills/
└── write-blog-post/
    ├── SKILL.md          &lt;-- O índice central lido no início
    ├── formatting.md     &lt;-- Regras e estruturas de código do blog
    ├── seo.md            &lt;-- Diretrizes de SEO e palavras-chave
    └── publishing.md     &lt;-- Passo a passo para rodar build e registrar
</code></pre>

<p>O arquivo central <code>SKILL.md</code> serve como o roteador da atenção da IA. Ele é simples e direto:</p>

<pre><code class="language-markdown"># Skill: Escrever Posts de Blog (DevThru)

Esta skill define as regras de criação, formatação e publicação de posts no blog.

&gt; [!NOTE]
&gt; **Progressive Disclosure:** Para evitar sobrecarga de contexto, esta skill é dividida em módulos. Leia este índice e abra apenas os arquivos correspondentes à tarefa específica.

## 🗺️ Índice de Tópicos

Use a ferramenta 'view_file' para ler as instruções detalhadas apenas da seção correspondente:
- 1. [Padrões e Formatação do Tipo BlogPost](file:///skills/write-blog-post/formatting.md)
- 2. [Regras de SEO e Conversão](file:///skills/write-blog-post/seo.md)
- 3. [Fluxo de Registro e Publicação](file:///skills/write-blog-post/publishing.md)
</code></pre>

<p>Quando a IA precisa cadastrar o post, ela lê apenas o arquivo <code>publishing.md</code>. Na hora de escrever o conteúdo, ela foca exclusivamente em <code>formatting.md</code>. Isso mantém a janela de contexto de trabalho limpa.</p>



<h2>Por que isso melhora a precisão dos Agentes?</h2>

<p>Ao limitar o contexto ativo da IA para focar estritamente na tarefa momentânea, colhemos três grandes benefícios técnicos:</p>

<ul>
  <li><strong>Redução drástica de alucinações:</strong> Sem a distração de centenas de linhas de regras de publicação na fase de formatação, a IA se concentra apenas em não errar as tags HTML e estruturas de tipos do código.</li>
  <li><strong>Economia financeira de tokens:</strong> Você evita enviar milhares de palavras de documentação a cada iteração de chat, reduzindo drasticamente o consumo de tokens de entrada das APIs da IA.</li>
  <li><strong>Execução escalável:</strong> Agentes de IA complexos que executam dezenas de passos conseguem alternar de contexto de forma limpa, sabendo exatamente onde encontrar as diretrizes técnicas necessárias para cada sub-tarefa.</li>
</ul>



<h2>Conclusão</h2>

<p>Adotar o padrão <strong>Progressive Disclosure</strong> em Skills de IA nos permite modelar agentes muito mais eficientes e refinados. Em vez de entupir o contexto da inteligência artificial no primeiro prompt, criamos um mapa estruturado e deixamos o agente navegar pelas regras sob demanda.</p>

<p>Desenvolver de forma modular é a chave para escalar a automação de processos de engenharia com segurança e economia em 2026.</p>
`
}
