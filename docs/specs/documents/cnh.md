# Gerador e Validador de CNH (Carteira Nacional de Habilitação)

> [!NOTE]
> Ferramenta de apoio para testes de validação de documentos de trânsito brasileiros, integrando algoritmos oficiais módulo 11 de duplo dígito verificador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de CNH estruturalmente corretos e valida a integridade matemática de números de carteira de motorista brasileira digitados pelo usuário.
* **Problema que resolve:** Permite que desenvolvedores de sistemas de logística, seguros, locadoras de veículos ou RH testem formulários de validação e rotinas cadastrais locais com CNHs sintéticas válidas.
* **Público-alvo:** Desenvolvedores e testadores de software trabalhando em sistemas de transporte, seguros e portais de credenciamento.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura da CNH
* O número da CNH oficial é composto por exatamente 11 dígitos numéricos.
* A geração pode ser feita de forma limpa (apenas números) para inserção facilitada em bancos de dados.

### 2. Algoritmo de Validação (Regra Contran)
A validação matemática baseia-se na geração de dois dígitos de controle nas posições 10 e 11, calculados sobre os 9 primeiros dígitos utilizando multiplicação de pesos de 9 a 1:
* **Primeiro Dígito (DV1 - Posição 10):**
  1. Multiplica-se os 9 primeiros dígitos por pesos decrescentes de 9 a 1.
  2. Soma-se os produtos.
  3. O resto da divisão por 11 (`soma % 11`) é calculado.
  4. Se o resto for maior que 9, o dígito verificador provisório é `0` e uma constante de ajuste (`decrement = 2`) é definida. Caso contrário, o dígito verificador é `11 - resto`.
* **Segundo Dígito (DV2 - Posição 11):**
  1. Multiplica-se os 9 primeiros dígitos por pesos crescentes de 1 a 9.
  2. Soma-se os produtos.
  3. O resto da divisão por 11 (`soma % 11`) é calculado.
  4. Se o resto for maior que 9, o DV2 provisório é `0`. Caso contrário, é `11 - resto`.
  5. Aplica-se o decremento de ajuste (se houver) no DV2 para obter o valor final. Se o valor final do DV2 ficar menor que 0, soma-se 11.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar CNH Válida
* **Dado** que o usuário está na tela do Gerador de CNH
* **Quando** ele clica no botão "Gerar CNH"
* **Então** o sistema deve gerar um número com exatamente 11 posições numéricas estruturalmente correto
* **E** exibir o resultado na caixa de texto com botão de cópia de um clique.

### Cenário 2: Validação de CNH Correta
* **Dado** que o usuário digita uma CNH matematicamente válida no campo de entrada
* **Quando** ele clica em "Validar"
* **Então** o sistema deve retornar um aviso de sucesso verde informando "CNH Válida".

### Cenário 3: Validação de CNH Incorreta
* **Dado** que o usuário insere uma sequência numérica inválida no campo
* **Quando** ele clica em "Validar"
* **Então** o sistema deve exibir um aviso de erro vermelho informando "CNH Inválida".

---

## 🎨 Design & UX

* **Interface e Ações Rápidas:**
  * Layout limpo composto por dois painéis lado a lado (Gerador e Validador) no modo de visualização única.
  * Botão de cópia rápida com Sonner Toast de confirmação visual.
* **Geração em Massa:**
  * Aba de geração em lote que permite gerar dezenas de CNHs de uma só vez para testes rápidos de importação de arquivos de motoristas (ex: CSV ou JSON).
