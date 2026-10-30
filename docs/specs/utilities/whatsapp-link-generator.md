# Gerador de Link do WhatsApp

> [!NOTE]
> Cria um link `wa.me` com mensagem pré-preenchida, além de QR Code e código HTML para incorporar.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera, a partir de um telefone e uma mensagem opcional, um link direto para conversa no WhatsApp.
* **Problema que resolve:** Dispensa a montagem manual da URL e a codificação da mensagem.
* **Público-alvo:** Pequenos negócios, profissionais de marketing e desenvolvedores web.

---

## ⚙️ Regras de Negócio & Validações

- **Telefone:** Caracteres não numéricos são removidos. Números sem o prefixo `55` recebem o DDI do Brasil.
- **Sem telefone:** Nenhum link é gerado.
- **Formato da URL:** `https://wa.me/<telefone>?text=<mensagem>`.
- **Mensagem:** Espaços nas pontas são removidos e o texto passa por `encodeURIComponent`. Sem mensagem, o parâmetro `text` é omitido.
- **QR Code:** É regenerado sempre que o link muda, em tamanho médio.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Link com mensagem
* **Dado** que o usuário informou telefone e mensagem
* **Quando** os campos são atualizados
* **Então** o sistema deve exibir o link `wa.me` com a mensagem codificada e o QR Code correspondente

### Cenário 2: Link sem mensagem
* **Dado** que a mensagem está vazia
* **Quando** o link é gerado
* **Então** a URL não deve conter o parâmetro `text`

### Cenário 3: Telefone formatado
* **Dado** um telefone com parênteses, espaços e hífen
* **Quando** o link é gerado
* **Então** a URL deve conter apenas dígitos, com o DDI `55`

### Cenário 4: Modelos de mensagem
* **Dado** que o usuário escolhe um modelo, como "Comercial / Vendas"
* **Quando** o modelo é aplicado
* **Então** o texto deve preencher a mensagem e atualizar o link

### Cenário 5: Incorporação
* **Dado** que há um link gerado
* **Quando** o usuário copia o código HTML
* **Então** a área de transferência deve receber um elemento `<a>` com `target="_blank"` e `rel="noopener noreferrer"`

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** A tela abre com telefone e mensagem de exemplo.
  * **Carregando (Loading):** O QR Code mostra estado de geração.
* **Elementos Interativos:**
  * Modelos prontos, atalhos de emoji, teste do link e download do QR Code em PNG.
  * Eventos `input_phone`, `test_link` e `copy_html_embed` são enviados ao GTM.
