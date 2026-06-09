# Conversor de Moedas

> [!NOTE]
> Ferramenta reativa para conversão de moedas estrangeiras, com suporte a cotações comerciais atualizadas em tempo real.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte valores monetários entre Real (BRL), Dólar Americano (USD), Euro (EUR), Libra Esterlina (GBP) e outras moedas principais com base em taxas de câmbio atualizadas.
* **Problema que resolve:** Permite estimar rapidamente o valor de compras internacionais, transações financeiras ou cotações de serviços em moeda estrangeira de forma ágil e integrada.
* **Público-alvo:** Desenvolvedores simulando pagamentos internacionais, profissionais de e-commerce e usuários em geral.

---

## ⚙️ Regras de Negócio & Validações

### 1. Dados de Entrada
* **Valor de Origem:** Quantidade de moeda a ser convertida (formatada dinamicamente).
* **Moeda de Origem:** Moeda inicial (ex: USD).
* **Moeda de Destino:** Moeda final para conversão (ex: BRL).

### 2. Taxas de Câmbio e Cálculo
* A conversão é calculada multiplicando o valor de origem pela taxa de câmbio de mercado atualizada:

$$\text{Valor Convertido} = \text{Valor de Origem} \times \text{Taxa de Câmbio}$$

* As taxas de câmbio são consultadas de forma dinâmica através de uma API pública de taxas de câmbio ou utilizam valores de fallback estáticos se a conexão falhar.
* O valor de destino deve ser exibido com precisão de 2 casas decimais e formatado de acordo com a moeda de destino (ex: `R$ 5,00` ou `$ 1.00`).

### 3. Ação de Inversão (Swap)
* A interface permite inverter a moeda de origem e destino instantaneamente, recalculando o valor final com a taxa recíproca.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Converter Dólar para Real
* **Dado** que o usuário está na tela do Conversor de Moedas
* **Quando** ele escolhe a Moeda de Origem como `"USD"`, Moeda de Destino como `"BRL"`, e digita o valor `"100.00"`
* **Então** o sistema deve aplicar a taxa de câmbio comercial atual (ex: `5.00` BRL por USD)
* **E** exibir o valor convertido como `R$ 500,00`
* **E** mostrar a cotação de referência utilizada para a conversão.

### Cenário 2: Inverter Moedas (Swap)
* **Dado** que o usuário está visualizando a conversão de USD para BRL
* **Quando** ele clica no botão de inversão (ícone de setas bidirecionais)
* **Então** a Moeda de Origem deve virar `"BRL"` e a Moeda de Destino deve virar `"USD"`
* **E** o valor do campo de origem deve ser recalculado com base na taxa de câmbio inversa.

---

## 🎨 Design & UX

* **Campos de Formulário Reativos:**
  * O cálculo ocorre instantaneamente à medida que o usuário digita ou altera as moedas nos seletores dropdown.
  * O input do valor possui formatação monetária automática de acordo com a moeda selecionada.
* **Organização Visual:**
  * Card com o valor convertido em tamanho de fonte grande e destacado.
  * Badge exibindo a data/hora da última atualização da taxa de câmbio comercial.
* **Botão de Inversão:**
  * Botão de inversão posicionado de forma centralizada entre os seletores de moeda para facilitar o clique.
