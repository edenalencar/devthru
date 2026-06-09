# Gerador e Validador de RENAVAM (Registro Nacional de Veículos Automotores)

> [!NOTE]
> Ferramenta auxiliar de testes para o segmento automotivo e órgãos de trânsito brasileiros, integrando lógica de validação oficial módulo 11 de dígito verificador simples.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de RENAVAM válidos e valida a integridade matemática de códigos inseridos.
* **Problema que resolve:** Permite preencher cadastros de frota, multas e licenciamento de veículos em ambientes locais e testes de QA com dados matematicamente íntegros.
* **Público-alvo:** Desenvolvedores integrando sistemas com o DETRAN ou DENATRAN e testadores de software automotivo.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do RENAVAM
* O número do RENAVAM oficial atual é composto por exatamente 11 dígitos numéricos.
* *(Nota histórica: Antigamente o RENAVAM possuía 9 dígitos. Os sistemas modernos preenchem com zeros à esquerda as duas primeiras posições para totalizar 11 dígitos).*

### 2. Algoritmo de Validação do Dígito Verificador (11ª posição)
O cálculo do dígito de controle do RENAVAM de 11 posições segue o algoritmo de módulo 11:
1. Multiplica-se os 10 primeiros dígitos pelos pesos correspondentes (da esquerda para a direita): `3, 2, 9, 8, 7, 6, 5, 4, 3, 2`.
2. Soma-se todos os produtos obtidos.
3. Multiplica-se a soma por 10.
4. Calcula-se o resto da divisão do resultado por 11 (`(soma * 10) % 11`).
5. Se o resto for **10**, o dígito verificador final é **0**.
6. Caso contrário, o dígito verificador é igual ao resto.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar RENAVAM Válido
* **Dado** que o usuário está na tela do Gerador de RENAVAM
* **Quando** ele clica no botão "Gerar RENAVAM"
* **Então** o sistema deve retornar um código com exatamente 11 dígitos numéricos
* **E** certificar que o último dígito confere com o cálculo do DV sobre as primeiras 10 posições
* **E** disponibilizar o botão de cópia rápida.

### Cenário 2: Validação de RENAVAM Válido
* **Dado** que o usuário possui um número de RENAVAM correto
* **Quando** ele insere o código no validador e clica em "Validar"
* **Então** o sistema deve exibir a mensagem de sucesso verde "RENAVAM Válido".

### Cenário 3: Validação de RENAVAM Inválido
* **Dado** que o usuário insere uma sequência inválida
* **Quando** ele clica em "Validar"
* **Então** o sistema deve exibir o aviso de erro vermelho "RENAVAM Inválido".

---

## 🎨 Design & UX

* **Visualização:**
  * O código gerado é exibido em fonte monoespaçada com opção de cópia rápida de um clique.
  * O validador remove automaticamente espaços, hifens ou pontuações antes de efetuar o cálculo.
* **Geração em Massa:**
  * Aba de geração em lote para criar múltiplos RENAVAMs simultaneamente para simular cargas de dados de frotas de veículos.
