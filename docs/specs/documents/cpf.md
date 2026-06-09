# Gerador e Validador de CPF (Cadastro de Pessoas Físicas)

> [!NOTE]
> Ferramenta essencial para testar cadastros de pessoas físicas, integrando algoritmos de validação oficiais módulo 11 e suporte à geração em massa formatada ou limpa.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de CPF estruturalmente válidos e verifica a validade de CPFs inseridos pelo usuário.
* **Problema que resolve:** Permite preencher formulários de cadastro em sistemas sob teste (QA) ou desenvolvimento local sem expor dados reais de cidadãos ou violar leis de privacidade de dados (LGPD).
* **Público-alvo:** Desenvolvedores de software, analistas de qualidade (QA) e testadores de sistemas de cadastro.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do CPF
* Um CPF completo possui exatamente 11 dígitos numéricos.
* A formatação padrão do CPF é `xxx.xxx.xxx-xx`.
* CPFs compostos por dígitos repetidos (ex: `111.111.111-11`, `222.222.222-22`, etc.) são considerados **inválidos** estruturalmente.

### 2. Algoritmo de Validação do CPF (Módulo 11)
Os dois últimos dígitos (DV1 e DV2) são calculados da seguinte forma:
* **Primeiro Dígito (DV1):**
  1. Multiplica-se os 9 primeiros dígitos pelos pesos decrescentes de 10 a 2.
  2. Soma-se os produtos obtidos.
  3. O resto da divisão da soma por 11 (`soma % 11`) é calculado.
  4. Se o resto for menor que 2, o DV1 é `0`. Caso contrário, o DV1 é `11 - resto`.
* **Segundo Dígito (DV2):**
  1. Multiplica-se os 10 primeiros dígitos (incluindo o DV1 recém-calculado) pelos pesos decrescentes de 11 a 2.
  2. Soma-se os produtos.
  3. O resto da divisão por 11 (`soma % 11`) é calculado.
  4. Se o resto for menor que 2, o DV2 é `0`. Caso contrário, o DV2 é `11 - resto`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar CPF Único Formatado
* **Dado** que o usuário está na tela do Gerador de CPF
* **Quando** ele marca a opção "Formatar CPF (xxx.xxx.xxx-xx)"
* **E** clica em "Gerar CPF"
* **Então** o sistema deve retornar um CPF válido com a pontuação correta (ex: `123.456.789-01`)
* **E** exibir o botão de cópia rápida.

### Cenário 2: Validação de CPF Válido
* **Dado** que o usuário deseja testar a validade de um CPF
* **Quando** ele digita um CPF matematicamente correto no campo de validação
* **E** clica no botão "Validar"
* **Então** o sistema deve exibir um card verde contendo a mensagem "CPF Válido" e confirmar que passou na verificação.

### Cenário 3: Validação de CPF Inválido
* **Dado** que o usuário digita um CPF incorreto ou com dígitos repetidos (ex: `111.111.111-11`)
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve exibir um card vermelho contendo a mensagem "CPF Inválido".

### Cenário 4: Geração em Massa
* **Dado** que o usuário está na aba "Gerar em Massa"
* **Quando** define a quantidade desejada e a opção de formatação
* **E** clica em gerar
* **Então** o sistema deve renderizar uma lista em bloco de CPFs válidos dentro do limite estabelecido pelo plano do usuário.

---

## 🎨 Design & UX

* **Visualização de Resultados:**
  * O CPF gerado individualmente é apresentado em uma caixa de resultado dedicada com botão de cópia de um clique.
* **Componente de Configuração:**
  * Presença de um checkbox para ativar/desativar a formatação por pontuação.
  * Presença do `ConfigurationManager` para persistir as opções do usuário localmente (LocalStorage) para visitas futuras.
* **FAQ:**
  * Acordeão expansível com exemplos de código em JavaScript, Python, C# e Java demonstrando como aplicar a validação do CPF programaticamente.
