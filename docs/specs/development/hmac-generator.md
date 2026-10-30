# Gerador e Validador de HMAC

> [!NOTE]
> Gera e confere assinaturas HMAC de webhooks com a Web Crypto API, sem enviar payload ou chave a um servidor.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Calcula a assinatura HMAC de uma mensagem em Hex e Base64 e verifica uma assinatura recebida.
* **Problema que resolve:** Ajuda a depurar falhas de validação de webhooks de provedores como Stripe, GitHub e Mercado Pago.
* **Público-alvo:** Desenvolvedores backend que integram webhooks e pagamentos.

---

## ⚙️ Regras de Negócio & Validações

- **Algoritmos:** `SHA-256` (padrão), `SHA-512`, `SHA-384` e `SHA-1`.
- **Campos obrigatórios:** Mensagem e chave secreta não podem estar vazias nem conter apenas espaços.
- **Codificação:** Mensagem e chave são codificadas em UTF-8. O resultado é retornado em Hex e Base64.
- **Verificação:** Uma assinatura é válida se coincidir com o Hex (sem diferenciar maiúsculas) ou com o Base64 (diferenciando maiúsculas). Espaços nas pontas são ignorados.
- **Chave aleatória:** A ação de gerar chave usa `crypto.getRandomValues` e produz `whsec_` seguido de 32 caracteres hexadecimais.
- **Snippets:** O resultado inclui exemplos de validação em Node.js e Python, com comparação protegida contra timing attack.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Geração de assinatura
* **Dado** que o usuário informou mensagem e chave
* **Quando** ele aciona a geração com `SHA-256`
* **Então** o sistema deve exibir a assinatura em Hex e Base64

### Cenário 2: Assinatura autêntica
* **Dado** que o usuário colou uma assinatura correta em Hex ou Base64
* **Quando** ele aciona a verificação
* **Então** o sistema deve informar que a assinatura é válida

### Cenário 3: Assinatura divergente
* **Dado** que a mensagem, a chave ou o algoritmo diferem dos usados na assinatura
* **Quando** ele aciona a verificação
* **Então** o sistema deve informar que a assinatura é inválida

### Cenário 4: Campos vazios
* **Dado** que a mensagem ou a chave está vazia
* **Quando** o usuário aciona a geração
* **Então** o sistema deve exibir um aviso de erro e não calcular a assinatura

### Cenário 5: Presets de webhook
* **Dado** que o usuário está na tela da ferramenta
* **Quando** ele escolhe o preset de Stripe, GitHub ou Mercado Pago
* **Então** mensagem e chave devem ser substituídas pelo exemplo, o algoritmo deve voltar para `SHA-256`
* **E** o resultado anterior deve ser limpo

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** A tela abre com payload e chave de exemplo.
  * **Carregando (Loading):** O cálculo roda em uma transição do React.
  * **Sucesso / Erro:** Avisos toast informam o resultado da geração e da verificação.
* **Elementos Interativos:**
  * Alternância para exibir ou ocultar a chave secreta.
  * Eventos `generate_hmac` e `verify_signature` são enviados ao GTM.
