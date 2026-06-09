# Gerador e Validador de RG (Registro Geral)

> [!NOTE]
> Ferramenta auxiliar de testes cadastrais, gerando e validando números de RG sob o padrão do estado de São Paulo, adotando o algoritmo clássico de multiplicação por pesos crescentes.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números estruturalmente corretos de Registro Geral (RG) e verifica a validade matemática de números inseridos.
* **Problema que resolve:** Permite preencher formulários de cadastro geral ou validação de identidade em sistemas legados ou portais governamentais simulados sem precisar expor RGs reais de pessoas físicas.
* **Público-alvo:** Engenheiros de software, testadores e analistas de QA brasileiros.

---

## ⚙️ Regras de Negócio & Validações

### 1. Descentralização e Padrão Adotado
* O RG brasileiro é descentralizado e cada estado possui seu próprio padrão e órgão emissor (SSP/UF).
* Esta ferramenta adota por padrão o algoritmo estrutural do **estado de São Paulo (SP)**, que é o padrão numérico mais comumente utilizado para validação estrutural em sistemas.

### 2. Estrutura do RG
* O RG do estado de São Paulo possui 9 dígitos no total: 8 dígitos de identificação + 1 dígito verificador.
* O dígito verificador pode ser um número (de 0 a 9) ou a letra **X** (representando o valor 10).
* A formatação padrão do RG é `xx.xxx.xxx-x`.

### 3. Algoritmo de Validação (SSP-SP)
O dígito verificador (9ª posição) é calculado pela seguinte operação sobre os 8 primeiros dígitos:
1. Multiplica-se cada um dos 8 primeiros dígitos por pesos crescentes correspondentes de 2 a 9: `2, 3, 4, 5, 6, 7, 8, 9` (da esquerda para a direita).
2. Soma-se os produtos obtidos.
3. Calcula-se o resto da divisão da soma por 11 (`soma % 11`).
4. Calcula-se a diferença: `11 - resto`.
5. Se a diferença for **10**, o dígito verificador final é **X**.
6. Se a diferença for **11**, o dígito verificador final é **0**.
7. Caso contrário, o dígito verificador é igual à própria diferença.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar RG Formatado
* **Dado** que o usuário está na tela do Gerador de RG
* **Quando** ele marca a opção de formatar
* **E** clica no botão "Gerar RG"
* **Então** o sistema deve retornar um RG válido com a pontuação correta (ex: `12.345.678-9` ou `12.345.678-X`)
* **E** exibir a opção de cópia rápida.

### Cenário 2: Validação de RG Válido
* **Dado** que o usuário digita um número de RG estruturalmente correto
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve exibir a mensagem verde "RG Válido".

### Cenário 3: Validação de RG Inválido
* **Dado** que o usuário insere uma sequência inválida
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve exibir um aviso vermelho de erro "RG Inválido".

---

## 🎨 Design & UX

* **Visualização:**
  * O RG gerado é apresentado em uma caixa de resultado dedicada com fonte monoespaçada e botão de cópia rápida.
* **Geração em Lote:**
  * Aba de geração em massa para criar múltiplos RGs de teste de uma única vez.
* **Flexibilidade na Digitação:**
  * O validador ignora automaticamente pontos, traços e espaços, e aceita a letra "x" em caixa alta ou baixa (`X` ou `x`).
