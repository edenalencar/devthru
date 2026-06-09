# Gerador de Boleto (Mock)

> [!NOTE]
> Ferramenta visual de utilidade para desenvolvedores testarem layouts de cobrança, fluxo de emissão e alinhamento de impressão ou geração de PDFs bancários de forma simulada.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Cria a representação visual estruturada de um boleto de cobrança bancário brasileiro no padrão Febraban.
* **Problema que resolve:** Permite que equipes de engenharia de software e QA testem geradores de PDF, estilos CSS de impressão e leitores de código de barras em ambiente local ou homologação sem precisar registrar boletos reais ou transacionar dinheiro.
* **Público-alvo:** Desenvolvedores frontend/backend integrando sistemas financeiros, testadores de software e designers de interfaces.

---

## ⚙️ Regras de Negócio & Validações

### 1. Caráter Fictício
* A ferramenta gera um boleto com o nome destacado de **"BANCO MOCK"** e código de compensação fictício **"999-9"**.
* Exibe um aviso ostensivo no cabeçalho alertando que o boleto é falso e não deve ser pago.

### 2. Parâmetros de Entrada e Validação
A interface permite personalizar:
* **Beneficiário:** Nome da empresa ou pessoa que recebe o pagamento.
* **Pagador:** Nome de quem efetua o pagamento.
* **Valor (R$):** Valor nominal a ser exibido no documento.
* **Vencimento:** Data limite para pagamento (formatada em padrão brasileiro DD/MM/AAAA no documento final).
* **Linha Digitável:** Código numérico de representação de barras.

### 3. Algoritmo de Validação do Boleto (FAQ de Apoio)
A ferramenta valida ou ensina a validar a linha digitável com base no módulo 10:
* Linha digitável deve possuir 47 ou 48 caracteres numéricos após remover pontuações.
* O primeiro bloco de 9 dígitos possui um dígito verificador na 10ª posição calculado através da multiplicação dos dígitos da direita para a esquerda por pesos alternados de 2 e 1. Se a multiplicação der um resultado com 2 dígitos (ex: 12), soma-se as dezenas e unidades (1 + 2 = 3). O resultado total acumulado é submetido ao cálculo `10 - (soma % 10)` para encontrar o dígito verificador.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Personalização com Sucesso
* **Dado** que o usuário está na tela do Gerador de Boleto
* **Quando** ele altera o campo "Beneficiário" para `"Minha Loja S/A"`
* **E** define o valor como `"250,00"` e vencimento como `"2025-12-25"`
* **Então** a visualização do boleto à direita deve refletir instantaneamente a razão social `"Minha Loja S/A"`
* **E** o valor como `R$ 250,00`
* **E** a data de vencimento como `25/12/2025`.

### Cenário 2: Download do PDF do Boleto
* **Dado** que o usuário preencheu os dados do boleto
* **Quando** ele clica no botão "PDF" (ou "Download")
* **Então** o sistema deve renderizar o layout do boleto em um arquivo PDF nomeado `boleto-mock.pdf` e disparar o download no navegador.

### Cenário 3: Impressão Direta
* **Dado** que o usuário está visualizando o boleto gerado
* **Quando** ele clica no botão "Print" (ou "Imprimir")
* **Então** o sistema deve acionar a caixa de diálogo nativa de impressão do navegador (`window.print()`)
* **E** ocultar todos os elementos de controle e cabeçalho da página (utilizando estilos CSS de `@media print`), mostrando apenas o boleto limpo na folha.

---

## 🎨 Design & UX

* **Layout de Visualização (Preview):**
  * O boleto segue a estrutura clássica brasileira: ficha de compensação com campos delimitados por linhas pretas finas de 1px.
  * O código de barras é representado graficamente por barras verticais de larguras aleatórias simulando um leitor real.
  * Fonte monoespaçada para a linha digitável e dados numéricos.
* **Responsividade:**
  * Em telas grandes (desktop), o painel de configuração fica à esquerda e a visualização do boleto à direita.
  * Em telas pequenas (mobile), o formulário de configuração aparece acima e o preview do boleto abaixo com barra de rolagem horizontal se necessário para evitar quebras.
* **Estilos de Impressão:**
  * Regra de mídia `@media print` ativa para ocultar a barra de navegação superior, painel de controle e FAQ durante a impressão física.
