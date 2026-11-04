# Número por Extenso

> [!NOTE]
> Escreve números inteiros (até 999 trilhões) e valores em reais com centavos por extenso, seguindo as regras do português do Brasil.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte um número ou valor monetário em texto por extenso, com botão de copiar.
* **Problema que resolve:** Preencher cheques, contratos, recibos e notas promissórias sem erros de concordância ("cem" × "cento", "mil e cem", "milhão de reais").
* **Público-alvo:** Profissionais administrativos, advogados, contadores, estudantes e desenvolvedores que precisam validar a regra.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/calculators/everyday.ts` (`integerToWords`, `currencyToWords`, `parseBrazilianNumber`).

### 1. Leitura da entrada (`parseBrazilianNumber`)
* Aceita `1.234,56`, `1234,56`, `1234.56`, `R$ 10,50` e `1.000` (ponto como separador de milhar quando seguido de grupos de 3 dígitos).
* Entrada vazia ou inválida não gera resultado.

### 2. Inteiros (`integerToWords`)
* Grupos de 3 dígitos: unidades, mil, milhão/milhões, bilhão/bilhões, trilhão/trilhões.
* `100` = "cem"; `101`–`199` usam "cento".
* "Mil" sem "um": `1000` = "mil".
* Conector antes do último grupo: "e" quando ele é menor que 100 ou centena exata (`1100` = "mil e cem", `2000005` = "dois milhões e cinco"); vírgula entre os demais grupos.
* Negativos recebem o prefixo "menos". Limite: ±999.999.999.999.999 (fora disso, `RangeError`).

### 3. Reais (`currencyToWords`)
* Arredonda para centavos. "real"/"reais" e "centavo"/"centavos" no singular ou plural.
* Valores com milhões, bilhões ou trilhões exatos levam "de": `1000000` = "um milhão de reais".
* `0` = "zero real".

### 4. Modos da interface
* **Reais (padrão):** aceita casas decimais.
* **Número:** exige inteiro; decimais mostram o aviso "Para números com casas decimais, use o modo Reais."

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Valor em reais com centavos
* **Dado** que o usuário está no modo Reais
* **Quando** ele digita `1.250,99`
* **Então** o sistema exibe "mil duzentos e cinquenta reais e noventa e nove centavos"

### Cenário 2: Milhar sem vírgula
* **Dado** que o usuário está no modo Número
* **Quando** ele digita `1.000`
* **Então** o sistema exibe "mil" (e não "um")

### Cenário 3: Decimal no modo Número
* **Quando** ele digita `2,5` no modo Número
* **Então** o sistema mostra o aviso para usar o modo Reais e não exibe resultado

---

## 🎨 Design & UX

* **Estado inicial:** modo Reais com `1.250,99` preenchido como exemplo.
* **Resultado:** caixa com o texto (primeira letra maiúscula) e botão "Copiar"; calculado a cada tecla.
* **Erro:** mensagem em vermelho abaixo do campo.
* **Conteúdo:** seção "Como escrever números por extenso" com as regras e FAQ com schema `FAQPage`.
* **Testes:** `__tests__/everyday-tools.test.ts`.
