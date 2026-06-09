# Gerador de E-mails de Teste

> [!NOTE]
> Ferramenta de produtividade que fornece endereços de e-mail fictícios e válidos estruturalmente para preenchimento de cadastros e simulação de fluxos de login em ambientes de testes locais.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera endereços de e-mail fictícios com nomes aleatórios e domínios comuns de teste (ex: `@example.com`, `@teste.com.br`).
* **Problema que resolve:** Permite popular formulários que exigem e-mails válidos estruturalmente sem a necessidade de expor e-mails pessoais do testador ou encher caixas de entrada de produção com mensagens indesejadas (spam).
* **Público-alvo:** Testadores de software (QA) e desenvolvedores preenchendo cadastros de usuários.

---

## ⚙️ Regras de Negócio & Validações

### 1. Formato e Sufixo
* O e-mail gerado deve estar em total conformidade com a especificação RFC 5322 (formato `usuario@dominio.com`).
* Utiliza domínios neutros de simulação (como `example.com`, `test.com`, `mail.com`, `devthru.com`) para evitar o envio de e-mails indesejados a pessoas reais se o sistema de disparo de e-mails de teste estiver ativo no servidor local.

### 2. Ações Rápidas
* Oferece geração rápida de um único e-mail ou lista em lote.
* Botão de cópia rápida com Sonner Toast de confirmação visual.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar E-mail Único
* **Dado** que o usuário está na tela do Gerador de E-mails
* **Quando** ele clica em "Gerar E-mail"
* **Então** o sistema deve retornar um e-mail válido estruturalmente com caracteres minúsculos (ex: `fulano.silva@example.com`)
* **E** exibir o botão de cópia de um clique.

---

## 🎨 Design & UX

* **Visualização:**
  * O e-mail gerado é exibido em fonte monoespaçada e caixa de texto de destaque para facilitar a cópia rápida.
* **Geração em Massa:**
  * Aba que permite gerar dezenas de e-mails de uma única vez organizados em lista para facilitar a cópia em lote.
