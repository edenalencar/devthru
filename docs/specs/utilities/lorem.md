# Gerador de Lorem Ipsum (Lorem Ipsum Generator)

> [!NOTE]
> Ferramenta clássica de produtividade de design para gerar blocos de textos temporários de preenchimento (placeholders de texto) sob medida para testes de layout e tipografia.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera palavras, frases, parágrafos ou listas de texto fictício em latim (Lorem Ipsum).
* **Problema que resolve:** Permite preencher containers de texto de interfaces e páginas web durante o design e codificação de telas, permitindo avaliar a distribuição tipográfica e quebras de linha sem a necessidade de redigir conteúdo real ou copiar textos aleatórios desconexos.
* **Público-alvo:** Desenvolvedores frontend, web designers e especialistas em UI/UX.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros de Geração
A ferramenta permite configurar a saída a partir dos seguintes critérios:
* **Tipo de Unidade:** Palavras, Frases, Parágrafos ou Itens de Lista.
* **Quantidade:** Quantos itens da unidade escolhida serão gerados (ex: de 1 a 50).
* **Parâmetro Iniciar com "Lorem Ipsum":** Opção para iniciar o primeiro bloco de texto gerado com a clássica frase `"Lorem ipsum dolor sit amet..."` ou gerar frases aleatórias alternativas em latim.

### 2. Geração e Cópia
* O texto gerado deve ser atualizado instantaneamente ou ao acionar o botão de geração.
* Oferece botão para cópia total do bloco gerado com um único clique.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar 3 Parágrafos Iniciando com Lorem Ipsum
* **Dado** que o usuário está na tela do Gerador de Lorem Ipsum
* **Quando** ele define a unidade como "Parágrafos", a quantidade como `3` e ativa a opção "Iniciar com Lorem Ipsum"
* **E** clica em "Gerar"
* **Então** o sistema deve renderizar 3 parágrafos de texto em latim na tela
* **E** certificar que o primeiro parágrafo começa exatamente com a string `"Lorem ipsum dolor sit amet,"`
* **E** habilitar o botão de cópia rápida.

---

## 🎨 Design & UX

* **Visualização da Saída:**
  * O texto gerado é apresentado de forma legível em uma caixa de texto limpa com boa altura de linha (line-height) para fácil visualização do contraste tipográfico.
  * Botões simples e diretos para copiar todo o texto ou limpar.
* **Barra de Controles Simples:**
  * Controles de formulário inline (quantidade, tipo de unidade e o checkbox "Iniciar com Lorem...") alinhados de forma compacta para otimizar espaço de tela.
