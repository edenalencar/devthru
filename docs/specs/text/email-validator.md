# Validador de E-mail (Email Validator)

> [!NOTE]
> Ferramenta essencial para higienização e validação de e-mails em tempo real, integrando verificação sintática e de domínios temporários descartáveis (disposable email check).

## 🎯 Visão Geral / Objetivo

* **O que faz:** Verifica a estrutura sintática de endereços de e-mail e confere se pertencem a domínios temporários conhecidos.
* **Problema que resolve:** Melhora a qualidade das listas de e-mails, reduzindo a taxa de rejeição (bounce rate) e impedindo cadastros com e-mails falsos/descartáveis que degradam a reputação de envio de servidores de e-mail.
* **Público-alvo:** Desenvolvedores parametrizando validação de formulários de registro e testadores de campanhas de e-mail marketing.

---

## ⚙️ Regras de Negócio & Validações

### 1. Etapas de Validação
A verificação é estruturada em três níveis sequenciais:
1. **Validação Sintática (Formato):** Checa se o e-mail atende ao padrão RFC 5322 usando uma expressão regular avançada (presença de `@`, caracteres válidos no nome e domínio de nível superior com pelo menos dois caracteres).
2. **Inspecionar Domínio Descartável:** Cruza o domínio do e-mail (ex: `tempmail.com`, `yopmail.com`, `mailinator.com`) com uma lista negra de domínios de e-mails temporários conhecidos.
3. **Erros Comuns de Digitação (Dica de Correção):** O sistema deve detectar erros comuns e sugerir correções amigáveis (ex: se o usuário digitar `user@gamil.com`, sugere `"Você quis dizer user@gmail.com?"`).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: E-mail Válido de Domínio Confiável
* **Dado** que o usuário está na tela do Validador de E-mail
* **Quando** ele digita o e-mail `"contato@devthru.com"` e clica em "Validar"
* **Então** o sistema deve verificar a sintaxe correta e a confiabilidade do domínio
* **E** exibir um card verde com a mensagem `"E-mail Válido"`
* **E** indicar que o domínio não é descartável.

### Cenário 2: E-mail de Domínio Descartável
* **Dado** que o usuário digita o e-mail `"teste@yopmail.com"`
* **Quando** ele clica em "Validar"
* **Então** o sistema deve exibir um aviso amarelo/vermelho informando `"E-mail Temporário Detectado"` e recomendando a utilização de um e-mail permanente.

---

## 🎨 Design & UX

* **Visualização de Detalhes:**
  * O resultado exibe uma lista de verificação (checklist) visual:
    * Formato Sintático Correto (Verde/Vermelho).
    * Servidor de Domínio Válido (Verde/Vermelho).
    * Livre de E-mail Temporário (Verde/Amarelo).
* **Sugestões Reativas:**
  * Alerta de dica de correção amigável logo abaixo do campo de input em caso de erro clássico de digitação (ex: `hotamil.com` -> `hotmail.com`).
