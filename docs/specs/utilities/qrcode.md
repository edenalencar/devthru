# Gerador de QR Code (QR Code Generator)

> [!NOTE]
> Ferramenta essencial de conversão visual de informações para o padrão internacional de códigos de barras bidimensionais (QR Code) processada de forma rápida e local no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Transforma textos livres, links de URLs ou chaves de pagamento em imagens de códigos QR legíveis por leitores ópticos e câmeras de celulares.
* **Problema que resolve:** Permite gerar atalhos de navegação móvel rápidos para apresentações, impressões ou testes de fluxos Pix em sistemas B2B de forma local, rápida e sem necessidade de cadastro de contas em serviços terceiros.
* **Público-alvo:** Desenvolvedores integrando códigos QR em portais, designers e usuários corporativos gerais.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros de Entrada e Customização
O usuário insere:
* **Conteúdo (Text/URL):** A string a ser convertida no código QR (limite de tamanho baseado na capacidade do padrão QR).
* **Tamanho (Size):** Dimensão da imagem de saída em pixels (ex: 200x200, 300x300, 400x400).
* **Cor de Fundo (Background Color):** Cor da tela de fundo (geralmente branca).
* **Cor do Código (Foreground Color):** Cor dos módulos e marcações do QR Code (geralmente preta).

### 2. Geração Local e Download
* A geração da imagem do QR Code ocorre totalmente local utilizando bibliotecas Javascript cliente ou renderização via Canvas/SVG.
* Formato de exportação padrão: **PNG**.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar QR Code para Link URL
* **Dado** que o usuário está no Gerador de QR Code
* **Quando** ele insere a URL `"https://www.devthru.com"` no campo de conteúdo e clica em "Gerar"
* **Então** o sistema deve renderizar o código QR correspondente no painel de visualização
* **E** disponibilizar o botão para baixar o arquivo PNG.

---

## 🎨 Design & UX

* **Visualização Lado a Lado (Split View):**
  * Formulário de parametrização de cores e tamanho no painel da esquerda.
  * Preview da imagem do QR Code gerado destacado no painel da direita, garantindo que o usuário veja instantaneamente o código gerado a cada alteração de cor/tamanho.
* **Exportação Acessível:**
  * Botões de ação rápida para baixar a imagem com o nome padronizado `qrcode.png` e limpar campos.
