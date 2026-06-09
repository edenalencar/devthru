# Conversor de Caixa de Texto (Case Converter)

> [!NOTE]
> Ferramenta essencial de processamento de texto e formatação de strings, auxiliando desenvolvedores a converterem a capitalização de textos em múltiplos padrões do mercado de forma instantânea.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte o texto digitado pelo usuário para diferentes estilos de caixa (capitalização).
* **Problema que resolve:** Evita a redigitação de blocos de texto inteiros quando há necessidade de padronização (ex: converter tudo para minúsculas ou kebab-case para chaves ou classes CSS), além de auxiliar na normalização de nomes próprios.
* **Público-alvo:** Desenvolvedores frontend/backend, redatores e analistas de conteúdo.

---

## ⚙️ Regras de Negócio & Validações

### 1. Modos de Conversão Suportados
A ferramenta realiza as seguintes transformações no texto de entrada:
* **MAIÚSCULAS (UPPER CASE):** Converte todos os caracteres para caixa alta.
* **minúsculas (lower case):** Converte todos os caracteres para caixa baixa.
* **Título (Title Case):** Capitaliza a primeira letra de todas as palavras.
* **Sentença (Sentence case):** Capitaliza apenas a primeira letra da primeira palavra de cada frase (identificada por pontuação final `.`, `?`, `!`).
* **Alternado (aLtErNaTe CaSe):** Alterna letras maiúsculas e minúsculas sucessivamente.
* **Inverso (iNVERSE cASE):** Inverte a caixa atual de cada caractere (maiúscula vira minúscula e vice-versa).
* **CamelCase (camelCase):** Remove espaços e pontuações e capitaliza cada palavra a partir da segunda.
* **snake_case (snake_case):** Converte para minúsculas e substitui espaços por sublinhados (`_`), removendo acentos.
* **kebab-case (kebab-case):** Converte para minúsculas e substitui espaços por hifens (`-`), removendo acentos.

### 2. Contadores e Métricas
* A tela exibe contadores em tempo real para a quantidade de caracteres e palavras contidas no texto original de entrada.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Converter para UPPER CASE
* **Dado** que o usuário está na tela do Conversor de Caixa
* **Quando** ele insere o texto `"Olá DevThru"`
* **E** clica no botão "MAIÚSCULAS"
* **Então** o sistema deve converter e exibir o texto resultante como `"OLÁ DEVTHRU"`
* **E** atualizar a contagem de caracteres e palavras correspondente.

### Cenário 2: Converter para snake_case
* **Dado** que o usuário insere a string `"Nome do Titular"`
* **Quando** ele clica no botão "snake_case"
* **Então** o sistema deve converter para `"nome_do_titular"`.

---

## 🎨 Design & UX

* **Área de Texto Dinâmica:**
  * Caixa de texto de entrada generosa. O usuário pode colar ou digitar livremente.
  * O resultado atualiza instantaneamente ou através de botões de ação dedicados organizados em uma barra de botões ou painel lateral.
* **Ações de Cópia e Limpeza:**
  * Botões de ação rápida para copiar o texto convertido de um clique e para limpar toda a entrada de uma única vez.
