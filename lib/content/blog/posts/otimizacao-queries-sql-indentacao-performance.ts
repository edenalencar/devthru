import { BlogPost } from '../index'

export const postOtimizacaoQueriesSql: BlogPost = {
    slug: 'otimizacao-queries-sql-indentacao-performance',
    title: 'Otimização de Queries SQL',
    description: 'Aprenda como queries mal formatadas escondem graves gargalos no PostgreSQL e MySQL. Guia prático de legibilidade, análise de EXPLAIN e uso de índices.',
    date: '2026-06-04',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 9,
    tags: ['SQL', 'PostgreSQL', 'MySQL', 'banco de dados', 'performance', 'query', 'EXPLAIN', 'desenvolvimento'],
    relatedTools: ['/tools/development/sql-formatter', '/tools/development/mock-data', '/tools/utilities/json'],
    content: `
<p>Na correria do dia a dia do desenvolvimento full stack, é muito comum darmos foco quase exclusivo às regras de negócio e deixarmos as consultas ao banco de dados em segundo plano. O resultado? Queries gigantescas, com centenas de linhas coladas em strings do ORM, sem nenhuma formatação ou padrão.</p>

<p>Mas o problema de uma consulta SQL desorganizada vai muito além da estética: <strong>código desestruturado esconde redundâncias e graves gargalos de performance</strong>. Joins duplicados, subqueries aninhadas desnecessárias e filtros ineficientes passam facilmente despercebidos em revisões de código de arquivos mal formatados.</p>

<p>Neste guia, vamos analisar como a formatação adequada e técnicas modernas de estruturação de SQL ajudam você a identificar gargalos, como desvendar o plano de execução do banco de dados com a instrução <code>EXPLAIN</code>, e como manter um padrão limpo e eficiente no seu time.</p>

<h2>1. Como a Má Formatação Oculta Gargalos de Desempenho</h2>

<p>Considere uma consulta SQL complexa de 150 linhas sem recuos, espaçamentos ou quebras de linha lógicas. Encontrar um erro de lógica nessa query é como procurar uma agulha no palheiro. Além do desperdício de tempo na leitura, a falta de formatação esconde armadilhas comuns:</p>

<ul>
  <li><strong>Subqueries Repetitivas:</strong> O mesmo sub-SELECT é executado múltiplas vezes no SELECT principal em vez de ser resolvido uma única vez.</li>
  <li><strong>Joins Duplicados:</strong> Junções com a mesma tabela de metadados em partes distintas do código, forçando o banco a varrer os mesmos índices repetidamente.</li>
  <li><strong>Filtros Incoerentes:</strong> Condições na cláusula <code>WHERE</code> que anulam filtros anteriores ou que inviabilizam o uso de índices existentes devido à ordem incorreta das colunas.</li>
</ul>

<p>A legibilidade é a primeira linha de defesa contra a ineficiência de consultas. Um SQL limpo permite que qualquer desenvolvedor do time bata o olho e perceba se a lógica está realizando operações redundantes.</p>

<h2>2. Legibilidade na Prática: CTEs (Common Table Expressions) vs Subqueries</h2>

<p>Subqueries aninhadas (uma consulta dentro do <code>FROM</code> ou do <code>WHERE</code> de outra) são extremamente difíceis de ler porque exigem uma interpretação "de dentro para fora". Se você tem múltiplos níveis de aninhamento, a query torna-se ilegível.</p>

<p>A melhor prática moderna para bancos de dados relacionais como PostgreSQL e MySQL (a partir da versão 8.0) é o uso de <strong>CTEs (Common Table Expressions)</strong> por meio da cláusula <code>WITH</code>. As CTEs funcionam como "variáveis temporárias" que permitem ler o SQL de cima para baixo, de forma sequencial e puramente declarativa.</p>

<p>Veja a diferença de legibilidade:</p>

<h3>Abordagem Confusa (Subquery Aninhada)</h3>
<pre><code class="language-sql">SELECT p.nome, vendas_totais.total
FROM parceiros p
INNER JOIN (
  SELECT pedido.parceiro_id, SUM(pedido.valor_total) as total
  FROM pedidos pedido
  WHERE pedido.status = 'pago' AND pedido.criado_em >= '2026-01-01'
  GROUP BY pedido.parceiro_id
) as vendas_totais ON vendas_totais.parceiro_id = p.id
ORDER BY vendas_totais.total DESC;
</code></pre>

<h3>Abordagem Limpa (Common Table Expression - CTE)</h3>
<pre><code class="language-sql">WITH vendas_filtradas AS (
  SELECT 
    parceiro_id, 
    SUM(valor_total) AS total
  FROM pedidos
  WHERE status = 'pago' 
    AND criado_em >= '2026-01-01'
  GROUP BY parceiro_id
)

SELECT 
  p.nome, 
  vf.total
FROM parceiros p
INNER JOIN vendas_filtradas vf ON vf.parceiro_id = p.id
ORDER BY vf.total DESC;
</code></pre>

<p>A segunda query é infinitamente mais simples de manter e revisar, pois isola a agregação dos dados da exibição final. No PostgreSQL moderno, o planejador de consultas otimiza as CTEs perfeitamente, garantindo que não haja perda de performance em relação às subqueries tradicionais.</p>

<h2>3. Desvendando a Caixa Preta com o EXPLAIN</h2>

<p>Depois de estruturar a sua query de forma legível, o próximo passo é analisar como o banco de dados realmente processa as informações. Para isso, utilizamos a instrução <code>EXPLAIN</code> antes da consulta (ou <code>EXPLAIN ANALYZE</code> para executar a query e exibir os tempos reais de execução).</p>

<p>O retorno do <code>EXPLAIN</code> detalha o plano de execução, que é o mapa de decisões tomado pelo otimizador do banco de dados. Os dois principais pontos de atenção que você deve procurar no output são:</p>

<table>
<thead>
<tr>
  <th>Operação no Plano</th>
  <th>Impacto na Performance</th>
  <th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>Seq Scan (ou Table Scan)</strong></td>
  <td>Alta Ineficiência 🔴</td>
  <td>O banco lê a tabela inteira, linha por linha, do disco. Aceitável apenas em tabelas minúsculas.</td>
</tr>
<tr>
  <td><strong>Index Scan</strong></td>
  <td>Alta Eficiência 🟢</td>
  <td>O banco localiza os registros correspondentes utilizando a estrutura em árvore do índice.</td>
</tr>
<tr>
  <td><strong>Index Only Scan</strong></td>
  <td>Excelente Performance 🚀</td>
  <td>Toda a informação solicitada está no próprio índice. O banco de dados nem precisa acessar a tabela principal.</td>
</tr>
</tbody>
</table>

<p>Veja um exemplo simplificado da saída do <code>EXPLAIN ANALYZE</code> no PostgreSQL:</p>

<pre><code class="language-text">EXPLAIN ANALYZE SELECT email FROM usuarios WHERE id = 12345;

Index Scan using usuarios_pkey on usuarios  (cost=0.29..8.30 rows=1 width=32) (actual time=0.015..0.016 rows=1 loops=1)
  Index Cond: (id = 12345)
Planning Time: 0.082 ms
Execution Time: 0.035 ms
</code></pre>

<p>Ao analisar a saída, se você visualizar um <strong>Seq Scan</strong> em uma tabela com milhões de registros, significa que está faltando um índice adequado para a condição do seu <code>WHERE</code> ou <code>JOIN</code>.</p>

<div class="info-box">
<strong>💡 Dica:</strong> Planos de execução complexos podem retornar milhares de linhas em formato JSON. Se você estiver trabalhando com queries muito ramificadas no PostgreSQL ou MySQL, gere e analise o plano de execução em formato JSON estruturado e use um formatador para facilitar a leitura das ramificações.
</div>

<h2>4. Por que o Banco Ignora seus Índices?</h2>

<p>Criar um índice na coluna não garante que o banco de dados irá utilizá-lo. Existem cenários clássicos de codificação que "quebram" o uso de índices e derrubam o desempenho da sua aplicação em produção:</p>

<h3>A. Funções no WHERE</h3>
<p>Ao aplicar uma função em uma coluna indexada, o banco de dados precisa computar o resultado da função para todas as linhas da tabela antes de comparar, invalidando o índice:</p>
<pre><code class="language-sql">-- Ineficiente (Ignora o índice na coluna email):
SELECT id FROM usuarios WHERE LOWER(email) = 'contato@empresa.com';

-- Otimizado (Mantém o valor da coluna intacto):
SELECT id FROM usuarios WHERE email = 'contato@empresa.com';
</code></pre>
<p>Se você realmente precisa de buscas case-insensitive, utilize um <strong>índice funcional</strong> (Expression Index) no PostgreSQL ou salve os e-mails sempre em minúsculo na inserção.</p>

<h3>B. Busca de Texto Ineficiente (LIKE '%termo')</h3>
<p>Índices do tipo B-Tree tradicionais são lidos da esquerda para a direita. Usar um caractere coringa (<code>%</code>) no início do termo impede que o otimizador use o índice:</p>
<pre><code class="language-sql">-- Ineficiente (Força um Seq Scan):
SELECT id FROM produtos WHERE codigo LIKE '%1234';

-- Otimizado (Usa o índice):
SELECT id FROM produtos WHERE codigo LIKE '1234%';
</code></pre>

<h2>5. Automatização e Padronização em Times Distribuídos</h2>

<p>Manter o código SQL limpo e padronizado em repositórios com muitos desenvolvedores trabalhando em paralelo é difícil se for feito apenas de forma manual. Revisar cada pull request caçando SQLs mal formatados consome energia preciosa do time.</p>

<p>A melhor abordagem de engenharia de software para resolver isso envolve:</p>

<ol>
  <li><strong>Configurar Linters de SQL:</strong> Ferramentas como o <em>SQLFluff</em> integradas ao pipeline de CI/CD para bloquear commits com formatações fora de padrão.</li>
  <li><strong>Utilizar Formatadores Online Rápidos:</strong> Permitir que os desenvolvedores formatem suas consultas localmente durante a etapa de debug antes de submeter o código.</li>
  <li><strong>Criar Massa de Testes de Carga:</strong> Popular as bases locais de desenvolvimento e homologação com dados volumosos e realistas para que consultas lentas gritem nos logs de desenvolvimento antes de chegarem aos clientes finais.</li>
</ol>

<p>No DevThru, disponibilizamos utilitários focados para o seu fluxo de desenvolvimento local:</p>

<ul>
  <li>Organize suas consultas em segundos usando o nosso <a href="/tools/development/sql-formatter">SQL Formatter</a>.</li>
  <li>Gere dados realistas para simular performance com o <a href="/tools/development/mock-data">Gerador de Dados de Teste</a>.</li>
  <li>Estruture planos de execução complexos e logs de banco com o nosso <a href="/tools/utilities/json">Formatador JSON</a>.</li>
</ul>

<h2>Conclusão</h2>

<p>Otimizar banco de dados não é uma tarefa reservada apenas para DBAs seniores. Como desenvolvedor full stack, escrever queries legíveis e organizadas, saber interpretar o output de um <code>EXPLAIN</code> e entender o comportamento de índices básicos garante que seu sistema escale de maneira sustentável e sem custos desnecessários de infraestrutura.</p>
`
}
