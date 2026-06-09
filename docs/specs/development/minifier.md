# Minificador de Código (Code Minifier)

> [!NOTE]
> Ferramenta de utilidade para otimização de performance web, permitindo reduzir o tamanho de arquivos JavaScript, CSS e HTML removendo dados redundantes localmente.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Remove caracteres desnecessários (espaços em branco, quebras de linha, tabulações e comentários) de códigos-fonte sem alterar seu funcionamento lógico.
* **Problema que resolve:** Reduz o tamanho dos arquivos transferidos pela rede para os navegadores, melhorando o tempo de carregamento de páginas web (Core Web Vitals) e otimizando o consumo de banda.
* **Público-alvo:** Desenvolvedores web, engenheiros de performance e programadores frontend.

---

## ⚙️ Regras de Negócio & Validações

### 1. Linguagens Suportadas
A ferramenta deve minificar os seguintes tipos de arquivos/linguagens com base na seleção do usuário:
* **JavaScript (JS):** Remoção de comentários de linha (`//`) e bloco (`/* */`), quebras de linha de instrução e espaços desnecessários.
* **CSS:** Remoção de espaços entre seletores, propriedades e valores, comentários e quebras de linha.
* **HTML:** Remoção de quebras de linha entre tags, espaços redundantes e comentários HTML (`<!-- -->`).

### 2. Estatísticas de Otimização
O sistema deve apresentar as seguintes métricas após a minificação:
* **Tamanho Original:** Em bytes (ou KB).
* **Tamanho Minificado:** Em bytes (ou KB).
* **Taxa de Economia:** Percentual de redução de tamanho obtido com a minificação:

$$\text{Economia} = \left( 1 - \frac{\text{Tamanho Minificado}}{\text{Tamanho Original}} \right) \times 100$$

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Minificar Código CSS
* **Dado** que o usuário está na tela do Minificador
* **Quando** ele seleciona o tipo de código como `"CSS"`
* **E** insere o código:
  ```css
  /* Estilo do Botão */
  .btn {
    background-color: red;
    color: white;
  }
  ```
* **Então** o sistema deve retornar o código compacto em linha única: `.btn{background-color:red;color:white;}`
* **E** exibir a estatística de economia percentual (ex: `60% de redução`).

### Cenário 2: Limpar Campos
* **Dado** que um código já foi processado e está exibido na tela
* **Quando** o usuário clica no botão "Limpar"
* **Então** o sistema deve zerar o campo de entrada, de saída e as estatísticas de otimização.

---

## 🎨 Design & UX

* **Estrutura de Entrada e Saída:**
  * Dois painéis de texto de tamanho generoso lado a lado ou empilhados: painel de entrada (código bruto) e painel de saída (código minificado).
  * Painel de saída no modo somente leitura com botão proeminente de cópia rápida.
* **Painel de Métricas de Performance:**
  * Indicadores de economia de tamanho em bytes com barras de progresso visual ou badges coloridos para indicar eficiência de otimização.
