# Gerador de Número Aleatório

> [!NOTE]
> Sorteia números inteiros em qualquer intervalo, com ou sem repetição, usando o gerador criptográfico do navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera de 1 a 1.000 números inteiros aleatórios entre um mínimo e um máximo.
* **Problema que resolve:** Sorteios de rifas, Instagram e listas, e massa de números para testes, sem viés estatístico.
* **Público-alvo:** Organizadores de sorteios, professores, criadores de conteúdo e QA.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/calculators/everyday.ts` (`generateRandomNumbers`, `parseBrazilianNumber`).

* **Fonte de aleatoriedade:** `crypto.getRandomValues` (32 bits). A função aceita um gerador alternativo para testes.
* **Sem viés de módulo:** valores acima do maior múltiplo do intervalo são descartados (rejection sampling).
* **Validações (`RangeError`):**
  * Mínimo e máximo devem ser inteiros e `mínimo ≤ máximo`.
  * Intervalo de até 2³² valores.
  * Quantidade deve ser um inteiro ≥ 1 (a interface limita a 1.000).
  * Sem repetição: quantidade não pode ser maior que o tamanho do intervalo.
  * Campo vazio: "Preencha mínimo, máximo e quantidade".
* **Opções:** "Sem repetição" (padrão ligado) e "Ordenar resultado".

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Sorteio simples
* **Dado** mínimo `1`, máximo `100` e quantidade `1`
* **Quando** o usuário clica em "Sortear"
* **Então** um número entre 1 e 100 é exibido em destaque, com botão "Copiar"

### Cenário 2: Todos os números sem repetição
* **Dado** mínimo `1`, máximo `10`, quantidade `10`, sem repetição e ordenado
* **Então** o resultado é `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`

### Cenário 3: Quantidade maior que o intervalo
* **Dado** mínimo `1`, máximo `5`, quantidade `10` e sem repetição
* **Então** o sistema exibe "Quantidade maior que o intervalo sem repetição"

---

## 🎨 Design & UX

* **Formulário:** três campos numéricos (mínimo, máximo, quantidade) e dois switches.
* **Resultado:** número único em fonte grande; vários números separados por vírgula em fonte monoespaçada; botão "Copiar".
* **Conteúdo:** explicação sobre `crypto.getRandomValues` e FAQ com schema `FAQPage`.
* **Testes:** `__tests__/everyday-tools.test.ts`.
