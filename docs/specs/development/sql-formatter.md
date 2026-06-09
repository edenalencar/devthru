# Formatador SQL (SQL Formatter)

> [!NOTE]
> Ferramenta essencial de produtividade para embelezar, formatar e organizar consultas SQL complexas, aumentando a legibilidade e otimizando a manutenção do código de banco de dados.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Recebe instruções SQL brutas ou mal formatadas em linha única e as reorganiza com identação consistente, quebras de linha e palavras-chave em caixa alta.
* **Problema que resolve:** Consultas SQL longas ou geradas automaticamente por ORMs são extremamente difíceis de ler e depurar. O formatador transforma o código bruto em um formato estruturado que segue boas práticas de engenharia de software em segundos.
* **Público-alvo:** Administradores de banco de dados (DBAs), desenvolvedores backend e analistas de dados.

---

## ⚙️ Regras de Negócio & Validações

### 1. Dialetos SQL Suportados
A ferramenta realiza formatação compatível com a sintaxe SQL padrão (ANSI SQL) e principais dialetos relacionais (MySQL, PostgreSQL, Oracle, SQL Server, SQLite).

### 2. Regras de Formatação Padrão
O formatador aplica as seguintes transformações:
* **Palavras-chave em Caixa Alta:** Transforma comandos SQL em maiúsculo (ex: `select`, `from`, `where`, `join`, `and` viram `SELECT`, `FROM`, `WHERE`, `JOIN`, `AND`).
* **Identação Consistente:** Insere espaços ou tabulações de forma hierárquica após cláusulas principais (ex: alinhar colunas do SELECT e condições do WHERE).
* **Quebras de Linha:** Adiciona quebras de linha antes de palavras-chave estruturais principais para facilitar o escaneamento visual da query.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Formatar Query Simples
* **Dado** que o usuário está na tela do Formatador SQL
* **Quando** ele cola a consulta em linha única:
  ```sql
  select id,name from users where active=1 order by name desc
  ```
* **E** clica em "Formatar SQL"
* **Então** o sistema deve retornar a consulta organizada:
  ```sql
  SELECT
    id,
    name
  FROM
    users
  WHERE
    active = 1
  ORDER BY
    name DESC
  ```
* **E** habilitar o botão de cópia rápida.

---

## 🎨 Design & UX

* **Estrutura de Entrada e Saída:**
  * Painel de texto amplo para entrada e painel de resultados com destaque de sintaxe SQL (syntax highlighting) ativo para facilitar a leitura.
  * O painel de resultados é somente leitura e contém botão de cópia rápida e opção de limpar campos.
* **Controles Rápidos:**
  * Opções de preenchimento com exemplos de queries comuns (SELECT simples, JOINs complexos) para teste imediato do funcionamento da ferramenta.
