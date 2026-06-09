# Gerador de Assinatura de E-mail (Email Signature Generator)

> [!NOTE]
> Ferramenta visual de produtividade para criar assinaturas de e-mail profissionais em HTML, prontas para serem copiadas e integradas em clientes comuns (Gmail, Outlook, Thunderbird).

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera um layout de assinatura de e-mail estruturado e responsivo contendo dados de contato pessoais, cargo, empresa, foto do portador e links de redes sociais.
* **Problema que resolve:** A criação de layouts HTML compatíveis com leitores de e-mail é complexa devido ao suporte limitado de CSS no Outlook e Gmail. A ferramenta gera um código HTML embutido limpo (inline styles) garantindo que a assinatura apareça formatada de forma correta para os destinatários.
* **Público-alvo:** Profissionais liberais, desenvolvedores, times de vendas e marketing.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros de Entrada
O formulário de assinatura coleta:
* **Dados Pessoais:** Nome completo, Cargo, Departamento, Empresa.
* **Contatos:** Telefone comercial, Celular, E-mail, Site.
* **Links de Mídia:** URL do perfil no LinkedIn, GitHub, Twitter.
* **Imagens:** URL da foto do perfil ou logotipo da empresa (hospedada externamente).

### 2. Formato e Geração de Código HTML
* A assinatura gerada deve utilizar tabelas HTML (`<table>`) e estilos CSS embutidos (inline) para assegurar a renderização correta em múltiplos clientes de e-mail.
* A ferramenta oferece duas ações de exportação:
  * **Copiar Assinatura (Rich Text):** Copia o resultado formatado pronto para colar na caixa de assinatura do Gmail/Outlook.
  * **Copiar HTML:** Copia o código bruto em formato de texto para inserção em editores avançados.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar e Copiar Assinatura Profissional
* **Dado** que o usuário está no Gerador de Assinatura de E-mail
* **Quando** ele preenche seu Nome como `"Carlos Silva"`, Cargo como `"Software Engineer"` e adiciona seu perfil do GitHub
* **Então** a visualização à direita deve renderizar a assinatura estruturada com o nome do usuário destacado em negrito e link clicável apontando para o seu GitHub
* **E** habilitar os botões "Copiar Assinatura" e "Copiar Código HTML".

---

## 🎨 Design & UX

* **Visualização em Tempo Real (Live Preview):**
  * O painel de visualização atualiza o design em tempo real de forma suave enquanto o usuário preenche os campos do formulário à esquerda.
* **Layouts de Exemplo (Templates):**
  * Opções de seleção de layouts predefinidos (ex: clássico horizontal, moderno com barra vertical colorida, minimalista sem imagens).
* **Copiar de Um Clique:**
  * Botões dedicados com feedbacks de cópia via Toasts explicando como colar a assinatura no Outlook ou Gmail.
