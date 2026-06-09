# Gerador de Cartão de Crédito

> [!NOTE]
> Ferramenta essencial para testar interfaces de checkout, fluxos de compras em e-commerce e gateways de pagamento em ambiente de homologação e sandbox.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de cartão de crédito estruturalmente válidos (com data de vencimento e CVV) para diversas bandeiras de mercado.
* **Problema que resolve:** Permite que equipes de testes e desenvolvedores realizem fluxos de checkout e validação de formulários sem expor dados reais de cartão ou precisar cadastrar cartões próprios.
* **Público-alvo:** Desenvolvedores web, engenheiros de QA e testadores de gateways de pagamento.

---

## ⚙️ Regras de Negócio & Validações

### 1. Algoritmo de Luhn (Módulo 10)
O número do cartão gerado deve ser estruturalmente válido, passando na validação matemática do **Algoritmo de Luhn**:
1. Da direita para a esquerda, dobre o valor de cada dois dígitos a começar pelo penúltimo.
2. Se o dobro de um dígito for maior que 9 (ex: `8 * 2 = 16`), subtraia 9 dele (ex: `16 - 9 = 7`).
3. Some todos os dígitos resultantes.
4. O número é válido se o total acumulado for divisível por 10 (`soma % 10 === 0`).

### 2. Bandeiras Suportadas e Prefixos
A ferramenta gera cartões adequados a regras de prefixo e tamanho específicos de cada bandeira:
* **Visa:** 16 dígitos, iniciando com `4`.
* **Mastercard:** 16 dígitos, iniciando com prefixos na faixa `51` a `55` ou `2221` a `2720`.
* **American Express (Amex):** 15 dígitos, iniciando com `34` ou `37`. CVV de 4 dígitos.
* **Elo:** 16 dígitos com prefixos específicos (ex: `401178`, `5067`, `636368`).
* **Hipercard:** 16 dígitos, iniciando com `606282`.
* **Discover:** 16 dígitos, iniciando com `6011` ou `65`.

### 3. Dados Auxiliares Gerados
* **Nome do Portador:** Fixado em `"JOHN DOE"` para fins de simulação.
* **Data de Vencimento:** Sempre gerada com um mês aleatório e ano futuro válido (de 1 a 5 anos a partir do ano atual).
* **CVV:** Código verificador aleatório compatível com a bandeira (3 dígitos para a maioria, 4 dígitos para American Express).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Geração de Cartão com Sucesso
* **Dado** que o usuário está na tela do Gerador de Cartão de Crédito
* **Quando** ele seleciona a bandeira "Visa" no menu de opções
* **E** clica no botão "Gerar Cartão"
* **Então** o sistema deve atualizar os dados exibidos à direita
* **E** gerar um número de 16 dígitos começando com `4`
* **E** calcular um CVV de 3 dígitos e uma data de validade futura
* **E** exibir graficamente o cartão com a bandeira correspondente.

### Cenário 2: Cópia Rápida de Campo Individual
* **Dado** que um cartão de teste foi gerado com sucesso
* **Quando** o usuário clica no botão de cópia ao lado do número do cartão
* **Então** o sistema deve transferir apenas a sequência numérica limpa para a área de transferência do usuário
* **E** exibir uma notificação visual (Toast) informando `"Número copiado!"`.

### Cenário 3: Alternar Bandeiras
* **Dado** que o usuário gerou anteriormente um cartão Visa
* **Quando** ele altera a bandeira para "American Express (Amex)" e clica em "Gerar Cartão"
* **Então** o sistema deve gerar um número com 15 dígitos iniciado com `34` ou `37`
* **E** o CVV gerado correspondente deve possuir 4 dígitos.

---

## 🎨 Design & UX

* **Visualização Realista de Cartão Físico:**
  * Apresenta um mockup de cartão de crédito escuro com gradientes modernos, em tamanho proporcional ao real.
  * O número do cartão no mockup é formatado em agrupamentos lógicos de 4 dígitos (ex: `4111 2222 3333 4444`) usando fonte monoespaçada.
  * Logotipo da bandeira correspondente exibido no canto superior direito do cartão físico simulado.
* **Ações Rápidas de Cópia:**
  * Exibição de cards de metadados organizados (Número, Validade e CVV) abaixo do mockup, cada um com um botão para cópia rápida com feedback em Sonner Toast.
* **Seção Informativa:**
  * Links na base da página apontando para guias detalhados sobre como implementar a validação matemática de Luhn em linguagens comuns (Python, JS, C#, Java).
