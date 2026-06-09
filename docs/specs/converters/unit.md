# Conversor de Unidades de Medida

> [!NOTE]
> Ferramenta versátil para conversão instantânea de grandezas físicas e unidades de medida de uso comum em engenharia, física e atividades domésticas.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Realiza a conversão de valores entre diferentes unidades de medida organizadas por grandezas (Comprimento, Peso/Massa, Área, Temperatura, Volume).
* **Problema que resolve:** Elimina a necessidade de memorizar fatores de conversão matemáticos complexos de sistemas internacionais ou imperiais (ex: converter polegadas para centímetros ou Fahrenheit para Celsius).
* **Público-alvo:** Desenvolvedores, engenheiros, estudantes de física/química e usuários gerais.

---

## ⚙️ Regras de Negócio & Validações

### 1. Grandezas e Unidades Suportadas
A ferramenta suporta as seguintes categorias de grandezas físicas e suas respectivas unidades:
* **Comprimento:** Quilômetro (km), Metro (m), Centímetro (cm), Milímetro (mm), Milha (mi), Jarda (yd), Pé (ft), Polegada (in).
* **Peso/Massa:** Tonelada (t), Quilograma (kg), Grama (g), Miligrama (mg), Libra (lb), Onça (oz).
* **Área:** Quilômetro quadrado ($km^2$), Metro quadrado ($m^2$), Hectare (ha), Acre (ac).
* **Volume:** Metro cúbico ($m^3$), Litro (L), Mililitro (mL), Galão (gal), Quarto (qt), Pint (pt), Xícara (cup).
* **Temperatura:** Celsius (°C), Fahrenheit (°F), Kelvin (K).

### 2. Lógica de Conversão
* A conversão é calculada em tempo real com base na grandeza selecionada e na taxa de proporção matemática de conversão definida.
* **Exceção de Temperatura:** A conversão de temperatura não utiliza fator linear simples de multiplicação, aplicando fórmulas matemáticas dedicadas:
  * De Celsius para Fahrenheit:

$$F = (C \times 1.8) + 32$$

  * De Celsius para Kelvin:

$$K = C + 273.15$$

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Conversão de Comprimento (Linear)
* **Dado** que o usuário está na tela do Conversor de Unidades
* **Quando** ele seleciona a grandeza **Comprimento**
* **E** escolhe a unidade de Origem como `"Polegada (in)"` e Destino como `"Centímetro (cm)"`
* **E** digita o valor `"10"`
* **Então** o sistema deve aplicar a proporção matemática de $2.54$
* **E** exibir o valor convertido resultante como `"25.4"` cm.

### Cenário 2: Conversão de Temperatura (Fórmula Dedicada)
* **Dado** que o usuário seleciona a grandeza **Temperatura**
* **Quando** ele escolhe Origem como `"Celsius (°C)"`, Destino como `"Fahrenheit (°F)"` e digita o valor `"100"`
* **Então** o sistema deve aplicar a fórmula de conversão de temperatura
* **E** exibir o resultado exato como `"212"` °F.

---

## 🎨 Design & UX

* **Interface Intuitiva:**
  * Menu dropdown de nível superior para escolher a grandeza (ex: Comprimento). A escolha da grandeza atualiza dinamicamente as opções de unidades nos seletores de Origem e Destino.
  * Inputs organizados com botões de inversão rápidos para trocar a unidade de origem e destino instantaneamente.
* **Resultados Precisos:**
  * O resultado convertido é apresentado com precisão de casas decimais adequada (ajustada para até 6 casas decimais em casos de precisão científica, ou omitindo decimais desnecessários).
  * Botão de cópia rápida para transferir o resultado numérico final.
