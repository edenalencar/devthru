# Comparador Semântico de JSON (JSON Diff)

> [!NOTE]
> Compara a estrutura e os valores de dois JSONs e ignora a ordem das chaves.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Identifica caminhos adicionados, removidos, modificados e inalterados entre dois documentos JSON.
* **Problema que resolve:** Um diff de texto aponta falsas diferenças quando apenas a ordem das chaves muda. A comparação semântica mostra só o que mudou de fato.
* **Público-alvo:** Desenvolvedores e engenheiros de QA que comparam respostas de API e arquivos de configuração.

---

## ⚙️ Regras de Negócio & Validações

- **Campos obrigatórios:** Os dois lados precisam estar preenchidos.
- **Sintaxe:** JSON inválido em qualquer lado interrompe a comparação (`isValid: false`), com o erro associado ao lado correspondente.
- **Objetos:** A ordem das chaves é ignorada. As chaves são percorridas em ordem alfabética.
- **Identidade:** Dois documentos são idênticos quando não há itens adicionados, removidos ou modificados (`isIdentical: true`).
- **Mudança de tipo:** Valores de tipos diferentes no mesmo caminho contam como `modified`.
- **Caminhos:** Propriedades aninhadas usam notação de ponto, como `features.pix_instant`.
- **Estatísticas:** O resultado totaliza `added`, `removed`, `modified` e `unchanged`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Apenas a ordem das chaves mudou
* **Dado** dois JSONs com os mesmos dados e chaves em ordem diferente
* **Quando** o usuário aciona a comparação
* **Então** o sistema deve informar que são semanticamente idênticos

### Cenário 2: Alterações reais
* **Dado** um JSON com uma chave nova, uma removida e um valor alterado
* **Quando** o usuário aciona a comparação
* **Então** o sistema deve listar cada caminho alterado e os totais por tipo

### Cenário 3: JSON malformado
* **Dado** que um dos lados tem erro de sintaxe
* **Quando** o usuário aciona a comparação
* **Então** o sistema deve exibir um erro de sintaxe e nenhum diff

### Cenário 4: Inverter lados
* **Dado** que há um resultado na tela
* **Quando** o usuário inverte os lados
* **Então** os conteúdos devem ser trocados e o diff recalculado

### Cenário 5: Formatar
* **Dado** que os dois lados têm JSON válido
* **Quando** o usuário aciona a formatação
* **Então** ambos devem ser reescritos com indentação de 2 espaços

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** A tela abre com dois JSONs de exemplo.
  * **Carregando (Loading):** O cálculo roda em uma transição do React para não travar a digitação.
  * **Sucesso / Erro:** Avisos toast acompanham o resultado da comparação.
* **Elementos Interativos:**
  * Ações de comparar, formatar, inverter e limpar.
  * O evento `compare` é enviado ao GTM.
