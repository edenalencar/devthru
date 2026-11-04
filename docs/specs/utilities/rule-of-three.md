# Calculadora de Regra de 3

> [!NOTE]
> Resolve regra de três simples direta e inversa a partir de três valores, mostrando a conta passo a passo.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Calcula o quarto termo X da proporção "A está para B assim como C está para X".
* **Problema que resolve:** Evita erros de montagem da proporção em cálculos de preço, receitas, escalas e porcentagens.
* **Público-alvo:** Estudantes, profissionais de compras, cozinha e qualquer pessoa resolvendo proporções.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/calculators/everyday.ts` (`ruleOfThree`, `parseBrazilianNumber`).

* **Direta:** `X = (B × C) ÷ A`. Se `A = 0`, erro "A não pode ser zero na regra de três direta".
* **Inversa:** `X = (A × B) ÷ C`. Se `C = 0`, erro "C não pode ser zero na regra de três inversa".
* **Entrada:** aceita formato brasileiro e internacional (`1.234,56`, `2,5`, `2.5`, `1.000`). Campo vazio não calcula.
* **Exibição:** até 6 casas decimais, formatado em `pt-BR`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Regra de três direta
* **Dado** que o modo "Diretamente proporcional" está selecionado
* **Quando** o usuário informa A = `2`, B = `10`, C = `5`
* **Então** X = `25` e o passo a passo exibe `X = (10 × 5) ÷ 2 = 25`

### Cenário 2: Regra de três inversa
* **Dado** que o modo "Inversamente proporcional" está selecionado
* **Quando** o usuário informa A = `4`, B = `6`, C = `8`
* **Então** X = `3`

### Cenário 3: Divisão por zero
* **Quando** A = `0` no modo direto
* **Então** o sistema exibe a mensagem de erro e não mostra resultado

---

## 🎨 Design & UX

* **Layout:** grade "A está para B / C está para X", com X destacado em campo somente leitura.
* **Modo:** dois botões (direta/inversa); o selecionado usa a cor primária. Os botões quebram linha no celular.
* **Resultado:** cálculo em tempo real, passo a passo em fonte monoespaçada e botão "Copiar".
* **Conteúdo:** exemplos de regra direta e inversa e FAQ com schema `FAQPage`.
* **Testes:** `__tests__/everyday-tools.test.ts`.
