# Conversor de cURL para Código

> [!NOTE]
> Transforma um comando cURL em código pronto para JavaScript, Python, Go e PHP, direto no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Interpreta um comando cURL e gera a requisição equivalente em Fetch, Axios, Python Requests, Go `net/http` e PHP cURL.
* **Problema que resolve:** Elimina a reescrita manual de requisições copiadas de documentações de API e do DevTools.
* **Público-alvo:** Desenvolvedores que integram APIs e engenheiros de QA.

---

## ⚙️ Regras de Negócio & Validações

- **Normalização:** Continuações de linha com `\` e quebras de linha são convertidas em espaços.
- **Tokenização:** Espaços dentro de aspas simples ou duplas são preservados. Fora de aspas simples, `\` escapa o caractere seguinte.
- **Método padrão:** `GET`, a menos que `-X` ou `--request` informe outro. O método é convertido para caixa alta.
- **Flags suportadas:**
  - `-H`, `--header`
  - `-d`, `--data`, `--data-raw`, `--data-binary`, `--data-urlencode`
  - `-u`, `--user`
  - `-A`, `--user-agent`
  - `--url`
- **Processamento local:** Tokens e chaves presentes no comando não saem do navegador.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: POST com JSON e autenticação
* **Dado** que o usuário colou um cURL com `-X POST`, cabeçalhos `-H` e corpo `-d`
* **Quando** ele seleciona "JavaScript (Fetch)"
* **Então** o código gerado deve conter a URL, o método, os cabeçalhos e o corpo do comando

### Cenário 2: Troca de linguagem
* **Dado** que um comando já foi interpretado
* **Quando** o usuário seleciona outra linguagem
* **Então** o código deve ser regenerado para a linguagem escolhida sem alterar a entrada

### Cenário 3: Comando multilinha
* **Dado** que o comando usa `\` ao final das linhas
* **Quando** ele é colado no campo
* **Então** o resultado deve ser o mesmo do comando escrito em uma única linha

### Cenário 4: Exemplos de teste
* **Dado** que o usuário está na tela da ferramenta
* **Quando** ele escolhe um exemplo
* **Então** o comando deve ser carregado e um aviso de confirmação deve ser exibido

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** A tela abre com um exemplo de POST JSON e a saída em Fetch.
  * **Sucesso:** O código é atualizado a cada alteração da entrada, sem botão de envio.
* **Elementos Interativos:**
  * Seletor com as cinco linguagens de destino.
  * Exemplos prontos e botão de copiar o código gerado.
  * Eventos `input_curl` e `select_<linguagem>` são enviados ao GTM.
