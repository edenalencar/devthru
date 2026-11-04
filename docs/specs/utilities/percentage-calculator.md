# Calculadora de Porcentagem

> [!NOTE]
> Cinco cálculos de porcentagem lado a lado, com resultado em tempo real: X% de Y, proporção, variação, aumento e desconto.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Resolve os cálculos de porcentagem mais buscados em uma única página.
* **Problema que resolve:** Evita erros de fórmula em descontos, reajustes, comissões e comparações entre valores.
* **Público-alvo:** Consumidores, vendedores, estudantes, analistas e desenvolvedores.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/calculators/everyday.ts` (`percentage`, `parseBrazilianNumber`).

| Cálculo | Fórmula | Erro |
|---|---|---|
| Quanto é X% de Y | `(X × Y) ÷ 100` | — |
| X é qual % de Y | `(X ÷ Y) × 100` | `Y = 0` |
| Variação de A para B | `((B − A) ÷ |A|) × 100` | `A = 0` |
| Y com aumento de X% | `Y × (1 + X/100)` | — |
| Y com desconto de X% | `Y × (1 − X/100)` | — |

* **Entrada:** formato brasileiro e internacional (`1.234,56`, `2,5`, `1.000`). Campo vazio ou erro exibe `—`.
* **Exibição:** até 4 casas decimais em `pt-BR`; proporção e variação com sufixo `%`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Porcentagem de um valor
* **Quando** o usuário informa `15` e `200` em "Quanto é X% de Y"
* **Então** o resultado é `30`

### Cenário 2: Variação percentual negativa
* **Quando** o usuário informa de `100` para `80`
* **Então** o resultado é `-20%`

### Cenário 3: Divisão por zero
* **Quando** o usuário informa Y = `0` em "X é qual % de Y"
* **Então** o resultado exibido é `—`

---

## 🎨 Design & UX

* **Layout:** uma linha por cálculo, em formato de frase ("Quanto é [15] % de [200] = 30"), já preenchida com exemplos.
* **Resultado:** atualizado a cada tecla, destacado na cor primária.
* **Conteúdo:** seção com as fórmulas e FAQ com schema `FAQPage`.
* **Testes:** `__tests__/everyday-tools.test.ts`.
