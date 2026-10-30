# Gerador de Placa Pix

> [!NOTE]
> Cria uma placa personalizada com QR Code Pix estático, pronta para baixar em PNG ou imprimir em PDF A4.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Monta um payload Pix a partir dos dados do recebedor e o aplica em um modelo visual de placa.
* **Problema que resolve:** Permite que comerciantes e autônomos tenham uma placa de pagamento sem ferramenta de design.
* **Público-alvo:** Pequenos negócios, autônomos e profissionais de marketing.

---

## ⚙️ Regras de Negócio & Validações

- **Campos obrigatórios:** Chave Pix, nome e cidade. Sem eles, o QR Code não é gerado.
- **Tipos de chave:** CPF, CNPJ, e-mail, telefone e aleatória.
- **Limpeza da chave:** CPF e CNPJ mantêm só dígitos. Telefone de 11 dígitos recebe `55` e prefixo `+`. Os demais tipos têm espaços das pontas removidos.
- **Limpeza de texto:** Nome, cidade e txid perdem acentos e caracteres especiais, e são convertidos para caixa alta.
- **Limites:** Nome com até 25 caracteres, cidade com até 15 e txid com até 25.
- **Txid padrão:** `***` quando não informado.
- **Payload EMV:** Inclui as tags `00`, `26`, `52`, `53` (986, BRL), `54` (se valor > 0, com 2 casas), `58`, `59`, `60`, `62` e `63`.
- **CRC:** CRC16-CCITT com polinômio `0x1021` e valor inicial `0xFFFF`.
- **Processamento local:** Dados e logotipo permanecem no navegador.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Geração da placa
* **Dado** que o usuário preencheu chave, nome e cidade
* **Quando** os campos são atualizados
* **Então** a placa deve exibir um QR Code com o payload correspondente

### Cenário 2: Valor opcional
* **Dado** que o usuário deixou o valor vazio
* **Quando** o QR Code é gerado
* **Então** a tag `54` não deve existir no payload

### Cenário 3: Telefone como chave
* **Dado** que o tipo é telefone e a entrada tem 11 dígitos
* **Quando** o QR Code é gerado
* **Então** a chave do payload deve usar o formato `+55DDDNUMERO`

### Cenário 4: Exportação
* **Dado** que a placa está preenchida
* **Quando** o usuário baixa PNG ou PDF
* **Então** o arquivo deve ser gerado com nome baseado no recebedor
* **E** o PDF deve ocupar uma página A4 vertical

### Cenário 5: Logotipo
* **Dado** que o usuário enviou uma imagem
* **Quando** a placa é atualizada
* **Então** o logotipo deve aparecer na placa e poder ser removido

---

## 🎨 Design & UX

* **Modelos:** `classic`, `minimalist-light`, `minimalist-dark` e `gradient`.
* **Campos adicionais:** Instagram, WhatsApp e texto de instruções.
* **Exportação:** Renderização em `pixelRatio` 3 para manter a qualidade de impressão.
* **Feedback:** Avisos toast confirmam envio de logotipo e downloads, ou informam falhas.
