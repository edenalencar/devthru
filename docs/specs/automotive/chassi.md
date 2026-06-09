# Gerador e Validador de Chassi (VIN - Vehicle Identification Number)

> [!NOTE]
> Ferramenta essencial para sistemas do setor automotivo, locadoras, seguradoras e oficinas de manutenção, integrando lógica de validação internacional ISO 3779 para números de chassi.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de Chassi (VIN) estruturalmente válidos e valida a integridade matemática e estrutural de chassis informados pelo usuário.
* **Problema que resolve:** O Chassi possui regras rígidas de formatação e um cálculo complexo de dígito verificador. A ferramenta evita o uso de dados de veículos reais em ambientes de testes e facilita a homologação de cadastros veiculares.
* **Público-alvo:** Desenvolvedores de sistemas de trânsito, seguradoras, concessionárias de veículos e analistas de QA.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do Chassi (VIN)
* O número de chassi é composto por exatamente 17 caracteres alfanuméricos.
* **Letras Proibidas:** Nunca deve conter as letras **I**, **O** e **Q** em nenhuma posição (para evitar confusões visuais com os números 1 e 0).
* **Estrutura Básica:**
  * **Dígitos 1 a 3 (WMI):** Identificação do fabricante mundial.
  * **Dígitos 4 a 8 (VDS):** Seção descritiva do veículo (características físicas, motor, etc.).
  * **Dígito 9:** Dígito Verificador (DV), calculado a partir de pesos de outras posições.
  * **Dígito 10 (VIS):** Ano do modelo do veículo (usando a tabela padrão de letras/números do CONTRAN/ISO 3779).
  * **Dígito 11:** Código da planta produtora do veículo.
  * **Dígitos 12 a 17:** Número sequencial de produção.

### 2. Algoritmo de Validação do Dígito Verificador (9ª posição)
O cálculo é feito substituindo cada letra por um valor numérico padrão e multiplicando pelo peso de sua posição:
1. Mapeamento de letras para números:
   * A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8
   * J=1, K=2, L=3, M=4, N=5, P=7, R=9
   * S=2, T=3, U=4, V=5, W=6, X=7, Y=8, Z=9
2. Multiplica-se cada caractere (dígitos 1 a 8 e 10 a 17) pelo seu respectivo peso de posição:
   * Posições: `1, 2, 3, 4, 5, 6, 7, 8, [DV], 10, 11, 12, 13, 14, 15, 16, 17`
   * Pesos: `8, 7, 6, 5, 4, 3, 2, 10,  0,   9,  8,  7,  6,  5,  4,  3,  2`
3. Soma-se todos os produtos.
4. Calcula-se o resto da divisão por 11 (`soma % 11`).
5. Se o resto for **10**, o dígito verificador final é a letra **X**.
6. Caso contrário, o dígito verificador é igual ao resto.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Chassi Válido
* **Dado** que o usuário está na tela do Gerador de Chassi
* **Quando** ele clica no botão "Gerar Chassi"
* **Então** o sistema deve retornar um código de 17 caracteres alfanuméricos
* **E** certificar que não há as letras `I`, `O`, `Q` no código
* **E** certificar que o caractere na 9ª posição bate com o cálculo do DV sobre os demais caracteres.

### Cenário 2: Validação de Chassi Válido
* **Dado** que o usuário digita um VIN correto de 17 caracteres
* **Quando** ele clica em "Validar"
* **Então** o sistema deve exibir a mensagem verde "Chassi Válido".

### Cenário 3: Validação de Chassi com Caractere Proibido
* **Dado** que o usuário insere um chassi que contém a letra `I`, `O` ou `Q`
* **Quando** ele clica em "Validar"
* **Então** o sistema deve recusar a validação e exibir a mensagem vermelha "Chassi Inválido".

---

## 🎨 Design & UX

* **Visualização:**
  * O Chassi gerado é exibido em fonte monoespaçada em caixa alta.
  * O validador ignora espaços em branco ou hifens que possam ter sido digitados acidentalmente.
* **Geração em Massa:**
  * Aba de geração em massa para criar múltiplos Chassis fictícios válidos de uma vez para popular bancos de dados de teste.
