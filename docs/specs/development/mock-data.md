# Gerador de Dados de Simulação (Mock Data Generator)

> [!NOTE]
> Ferramenta de produtividade que gera listas estruturadas de dados sintéticos realistas (JSON/CSV) para apoiar o desenvolvimento local, testes de carga e prototipação de banco de dados.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera um conjunto customizado de dados fictícios simulando registros de usuários ou entidades comerciais em formato JSON, CSV ou SQL Insert.
* **Problema que resolve:** Elimina o tempo gasto digitando manualmente listas de testes (ex: criar 100 registros com nome, e-mail, telefone e cidade) e evita o uso de dados de produção reais em ambientes de testes e homologação.
* **Público-alvo:** Desenvolvedores de software, testadores (QA) e arquitetos de banco de dados.

---

## ⚙️ Regras de Negócio & Validações

### 1. Campos e Tipos de Dados Suportados
A ferramenta permite ao usuário escolher quais colunas/campos deseja incluir no mock:
* **Identificação:** ID sequencial, UUID.
* **Dados Pessoais:** Nome completo, Primeiro nome, Sobrenome, E-mail, Telefone, Gênero.
* **Documentos:** CPF, CNPJ, RG.
* **Endereço:** CEP, Rua, Número, Cidade, Estado (UF).

### 2. Configurações de Geração
* **Quantidade de Registros:** O usuário pode definir a quantidade de linhas a serem geradas (ex: de 1 a 100, ou mais dependendo dos limites de plano).
* **Formatos de Exportação:**
  * **JSON:** Lista estruturada de objetos.
  * **CSV:** Tabela separada por vírgulas ou ponto e vírgula com cabeçalho de colunas.
  * **SQL:** Lista de instruções `INSERT INTO tabela (campos) VALUES (...)`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Lista de Usuários em JSON
* **Dado** que o usuário está na tela do Gerador de Dados Mock
* **Quando** ele escolhe as colunas: `id`, `name`, `email`
* **E** define a quantidade como `10` registros e o formato como `JSON`
* **E** clica em "Gerar Dados"
* **Então** o sistema deve compor uma lista de 10 objetos JSON contendo as propriedades correspondentes com dados sintéticos aleatórios
* **E** exibir o resultado em uma área de código formatada com opção de download do arquivo `.json`.

### Cenário 2: Exportar Dados em CSV
* **Dado** que os dados já foram gerados com sucesso
* **Quando** o usuário muda o formato de saída para "CSV"
* **Então** o sistema deve reorganizar instantaneamente a exibição no formato tabular separado por vírgula
* **E** disponibilizar o download do arquivo `.csv`.

---

## 🎨 Design & UX

* **Construtor de Esquema (Schema Builder):**
  * Interface intuitiva para adicionar, remover e reordenar as colunas do dataset.
  * Seletores dropdown para escolher o tipo de gerador para cada coluna (ex: Nome, E-mail, Telefone).
* **Painel de Configuração de Saída:**
  * Controle deslizante ou input numérico para definir a quantidade de linhas.
  * Seletor de formato (JSON, CSV, SQL).
  * Painel de código de saída com destaque de sintaxe e botão para download do arquivo.
