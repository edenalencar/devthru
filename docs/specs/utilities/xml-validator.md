# Validador e Formatador de XML (XML Validator)

> [!NOTE]
> Ferramenta essencial de desenvolvimento para checagem sintática de arquivos e payloads em XML, garantindo estrutura bem-formada e identação legível localmente.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Analisa a estrutura de strings XML inseridas pelo usuário, valida se estão bem-formadas de acordo com as regras sintáticas e as formata/indenta de forma organizada.
* **Problema que resolve:** Permite depurar erros estruturais de marcação XML (como tags não fechadas, atributos sem aspas ou hierarquia inválida) de forma local e rápida, muito comum em integrações de sistemas legados ou emissão de notas fiscais eletrônicas.
* **Público-alvo:** Desenvolvedores integrando APIs baseadas em SOAP/XML, integradores de sistemas corporativos e analistas fiscais.

---

## ⚙️ Regras de Negócio & Validações

### 1. Validação Sintática Rígida (Well-Formed Check)
* A validação deve processar a string XML utilizando o analisador nativo do navegador (`DOMParser`).
* Se houver erros estruturais (ex: tag de fechamento incompatível ou ausente), a ferramenta deve interceptar o erro e exibir um alerta vermelho contendo a mensagem descritiva do erro e a indicação aproximada de linha/coluna onde o problema foi detectado.

### 2. Formatação e Embelezamento (Pretty Print)
* Oferece formatação e recuo hierárquico consistente para as tags com quebras de linha limpas, facilitando o escaneamento visual do código.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Formatar XML Válido
* **Dado** que o usuário está na tela do Validador de XML
* **Quando** ele insere o código em linha única: `<pessoa><nome>João</nome><idade>30</idade></pessoa>`
* **E** clica em "Formatar/Validar"
* **Então** o sistema deve retornar a saída estruturada:
  ```xml
  <pessoa>
    <nome>João</nome>
    <idade>30</idade>
  </pessoa>
  ```
* **E** exibir a confirmação verde "XML Válido".

### Cenário 2: XML Malformado com Tag Não Fechada
* **Dado** que o usuário cola o XML: `<config><api_key>12345</config>` (tag `<api_key>` sem fechamento)
* **Quando** ele aciona a validação
* **Então** o sistema deve recusar a formatação
* **E** exibir a mensagem de erro vermelha descrevendo o erro sintático de tag não correspondente.

---

## 🎨 Design & UX

* **Visualização:**
  * Painel de entrada amplo e painel de resultados com destaque de sintaxe XML ativo.
  * O painel de resultados é somente leitura e possui botões de cópia rápida.
  * Área de mensagens de erro detalhadas vermelhas logo abaixo do input do usuário para correção dinâmica.
