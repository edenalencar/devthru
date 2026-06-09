# Formatador e Validador de JSON (JSON Formatter/Validator)

> [!NOTE]
> Ferramenta essencial de desenvolvimento para validar a sintaxe de dados em formato JSON, embelezando e estruturando a hierarquia ou minificando as strings localmente.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Recebe strings no formato JSON, valida sua estrutura sintática, embeleza/formata a identação (com espaçamento configurável) ou remove espaços desnecessários (minificação).
* **Problema que resolve:** Permite depurar erros de sintaxe em payloads de APIs (como vírgulas extras, chaves não fechadas ou aspas simples inválidas), além de reordenar e estruturar blocos longos de dados para leitura humana rápida.
* **Público-alvo:** Desenvolvedores frontend, backend, analistas de suporte e engenheiros de dados.

---

## ⚙️ Regras de Negócio & Validações

### 1. Validação Sintática Rígida
* A validação deve seguir estritamente a especificação RFC 8259 do JSON.
* Se a string inserida for inválida, o validador deve capturar a exceção e exibir a mensagem de erro original detalhada de parse (indicando o motivo do erro e, preferencialmente, a linha ou posição aproximada do erro de sintaxe) de forma amigável.

### 2. Formatação e Espaçamento
* **Embelezar (Format):** Permite configurar a identação da saída (2 espaços, 4 espaços ou tabulações).
* **Minificar (Minify):** Remove todas as quebras de linha e espaços em branco estruturais secundários para otimização de payload.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Formatar JSON Válido
* **Dado** que o usuário está na tela do Formatador de JSON
* **Quando** ele insere o JSON desorganizado: `{"nome":"devthru","ativo":true}`
* **E** escolhe a identação de 2 espaços e clica em "Format"
* **Então** o sistema deve retornar e exibir a estrutura indentada corretamente:
  ```json
  {
    "nome": "devthru",
    "ativo": true
  }
  ```
* **E** habilitar o botão de cópia rápida.

### Cenário 2: Capturar Erro de Sintaxe
* **Dado** que o usuário cola um JSON contendo aspas simples (inválidas no padrão JSON): `{'nome': 'teste'}`
* **Quando** ele clica em "Validar" ou tenta formatar
* **Então** o sistema deve recusar a formatação
* **E** exibir um aviso vermelho detalhando o erro de parser sintático.

---

## 🎨 Design & UX

* **Visualização Lado a Lado (Split Screen):**
  * Área de entrada de dados à esquerda e área de resultado formatado à direita (com destaque de sintaxe para facilitar a conferência de tipos de dados).
  * Painel de erros vermelhos proeminentes logo abaixo do campo de entrada quando a validação falhar.
* **Controles:**
  * Dropdown para selecionar o recuo da identação (2 espaços, 4 espaços).
  * Botões de ação rápida: Format (Embelezar), Minify (Minificar), Clear (Limpar) e Copy (Copiar).
