# Testador de Expressões Regulares (Regex Tester)

> [!NOTE]
> Ferramenta interativa de desenvolvimento para criação, teste e validação de padrões de expressões regulares (Regex) em tempo real com destaque visual.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Permite que o usuário insira uma expressão regular (padrão e flags) e a teste contra um texto de exemplo, destacando visualmente as ocorrências encontradas.
* **Problema que resolve:** A criação de expressões regulares complexas é propensa a erros de escape e lógica. A ferramenta oferece feedback visual imediato de quais partes do texto são capturadas, além de detalhar os grupos capturados.
* **Público-alvo:** Desenvolvedores de software de todas as especialidades.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros do Mecanismo Regex
A ferramenta deve aceitar:
* **Expressão (Pattern):** O padrão textual da regex.
* **Flags (Modificadores):**
  * `g` (global): Encontra todas as correspondências em vez de parar após a primeira.
  * `i` (case-insensitive): Ignora diferenças entre maiúsculas e minúsculas.
  * `m` (multiline): Trata caracteres de início e fim (`^` e `$`) como trabalhando em múltiplas linhas.

### 2. Validação e Feedback de Erro
* O sistema deve validar a sintaxe da expressão regular enquanto o usuário digita.
* Se a regex contiver um erro de sintaxe (como parênteses ou colchetes não fechados), a ferramenta deve capturar o erro e exibir uma mensagem explicativa amigável de erro de compilação da regex, impedindo o travamento da interface.

### 3. Destaque e Grupos de Captura
* Todas as ocorrências encontradas no texto de teste devem ser realçadas com cores de fundo suaves.
* O sistema deve listar as correspondências individuais e os grupos de captura detalhados (Group 1, Group 2, etc.) na lateral ou rodapé dos resultados.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Testar Correspondência Simples
* **Dado** que o usuário está na tela do Testador de Regex
* **Quando** ele define a Regex como `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b` (validação de e-mail) com a flag `g`
* **E** insere o texto de teste: `"Meu contato é email@teste.com e contato@devthru.com"`
* **Então** o sistema deve destacar visualmente as duas ocorrências de e-mail no texto
* **E** listar a contagem de `2 matches encontrados`.

### Cenário 2: Tratar Regex Inválida
* **Dado** que o usuário digita uma regex malformada (ex: `[a-z`)
* **Quando** o padrão é processado
* **Então** o sistema deve ocultar os realces no texto de teste
* **E** exibir um aviso vermelho indicando o erro de sintaxe da regex.

---

## 🎨 Design & UX

* **Interface Compartimentada:**
  * Linha superior com campo para digitação do padrão regex e checkbox ou seletores para as flags (`g`, `i`, `m`).
  * Área de texto de entrada generosa onde o usuário digita o texto a ser verificado. O realce de correspondências ocorre diretamente sobreposta ao texto digitado em tempo de execução.
  * Painel de resultados exibindo o sumário de correspondências encontradas e a listagem de grupos capturados.
