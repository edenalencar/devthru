# Calculadora Simples Nacional

> [!NOTE]
> Ferramenta de estimativa tributária para micro e pequenas empresas brasileiras, simulando a alíquota efetiva e o imposto a pagar de acordo com o anexo da atividade e faturamento.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Calcula de forma rápida e simplificada a alíquota efetiva mensal e a estimativa do valor do DAS (Documento de Arrecadação do Simples Nacional) a pagar.
* **Problema que resolve:** Permite que empreendedores e desenvolvedores de ERP estimem impostos e validem seus motores de cálculo tributário baseados nos anexos do Simples Nacional.
* **Público-alvo:** Desenvolvedores de software de gestão (ERP/Faturamento), contadores, microempreendedores (ME e EPP).

---

## ⚙️ Regras de Negócio & Validações

### 1. Dados de Entrada
* **Anexo da Atividade:** Define a tabela de alíquotas a ser aplicada (Anexos I, II, III, IV ou V).
* **Faturamento Últimos 12 Meses (RBT12):** Utilizado para definir a faixa de enquadramento da empresa.
* **Faturamento do Mês Atual:** Base de cálculo sobre a qual a alíquota efetiva será aplicada.

### 2. Regras de Cálculo da Alíquota Efetiva
A alíquota efetiva é calculada a partir da alíquota nominal e da parcela a deduzir de cada faixa e anexo, seguindo a fórmula oficial:

$$\text{Alíquota Efetiva} = \frac{(\text{RBT12} \times \text{Alíquota Nominal}) - \text{Parcela a Deduzir}}{\text{RBT12}}$$

* **Exceção de Faturamento Zero (RBT12 = 0):** Se a empresa não faturou nada nos últimos 12 meses (por exemplo, primeiro mês de atividade), a alíquota efetiva aplicada é a própria alíquota nominal da primeira faixa do anexo correspondente.
* **Valor do Imposto:** O valor do DAS é o produto do faturamento do mês atual pela alíquota efetiva calculada.

### 3. Faixas e Limites dos Anexos (Tabela Vigente)
* **Faixa 1:** Até R$ 180.000,00
* **Faixa 2:** De R$ 180.000,01 a R$ 360.000,00
* **Faixa 3:** De R$ 360.000,01 a R$ 720.000,00
* **Faixa 4:** De R$ 720.000,01 a R$ 1.800.000,00
* **Faixa 5:** De R$ 1.800.000,01 a R$ 3.600.000,00
* **Faixa 6:** De R$ 3.600.000,01 a R$ 4.800.000,00

Cada faixa possui sua alíquota nominal específica e parcela a deduzir variando por anexo (Comércio, Indústria e diferentes tipos de Serviços).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Cálculo em Primeira Faixa (Sem Dedução)
* **Dado** que o usuário está na Calculadora Simples Nacional
* **Quando** ele escolhe o "Anexo I - Comércio"
* **E** define o faturamento nos últimos 12 meses como `R$ 100.000,00` (Faixa 1, limite de 180k)
* **E** o faturamento do mês atual como `R$ 10.000,00`
* **E** clica em "Calcular Imposto"
* **Então** o sistema deve aplicar a alíquota nominal pura de 4% (sem parcela a deduzir)
* **E** exibir a alíquota efetiva como `4.00%`
* **E** o valor estimado do imposto (DAS) como `R$ 400,00`.

### Cenário 2: Cálculo com Alíquota Efetiva (Faixa Progressiva)
* **Dado** que o usuário preenche a calculadora
* **Quando** escolhe "Anexo I - Comércio", RBT12 de `R$ 200.000,00` (Faixa 2, limite de 360k, nominal 7.3%, dedução 5.940,00) e faturamento mensal de `R$ 20.000,00`
* **E** clica em "Calcular Imposto"
* **Então** o sistema deve aplicar a fórmula oficial:
  $$\text{Alíquota Efetiva} = \frac{(200.000 \times 0.073) - 5.940}{200.000} = \frac{14.600 - 5.940}{200.000} = \frac{8.660}{200.000} = 4.33\%$$
* **E** exibir a alíquota efetiva calculada como `4.33%`
* **E** estimar o valor do DAS como `R$ 866,00`.

---

## 🎨 Design & UX

* **Máscaras de Entrada de Valores:**
  * Os campos de faturamento possuem formatação monetária automática enquanto o usuário digita (ex: o usuário digita `12345` e o campo formata como `R$ 123,45`).
* **Visualização de Resultados:**
  * Card de resultado destacado contendo o Valor do DAS em fonte de tamanho grande.
  * Informações acessórias organizadas (Alíquota Efetiva e o Anexo utilizado) dispostas lado a lado para facilitar a leitura.
  * Caixa de aviso explicativa informando que o cálculo serve apenas como estimativa e recomendando a consulta a um contador.
