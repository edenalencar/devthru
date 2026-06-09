# Gerador de Dados e Termos LGPD (Lei Geral de Proteção de Dados)

> [!NOTE]
> Ferramenta auxiliar de conformidade e testes jurídicos, permitindo gerar termos de consentimento, políticas de privacidade fictícias e dados sensíveis mascarados para simular cenários de proteção de dados.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera termos de consentimento, políticas de privacidade de exemplo e conjuntos de dados sensíveis mascarados em conformidade com as diretrizes da LGPD (Lei 13.709/2018).
* **Problema que resolve:** Permite que desenvolvedores frontend e QAs simulem telas de aceite de cookies, termos de consentimento de coleta de dados e testem mascaramento de logs sem precisar redigir termos jurídicos complexos do zero.
* **Público-alvo:** Desenvolvedores integrando consentimento de LGPD, analistas de privacidade e QAs.

---

## ⚙️ Regras de Negócio & Validações

### 1. Modelos de Documento Gerados
A ferramenta disponibiliza templates customizáveis de:
* **Termo de Consentimento de Uso de Dados:** Autorização explícita do usuário para coleta e tratamento de dados pessoais específicos (nome, e-mail, geolocalização).
* **Política de Privacidade Simplificada:** Rascunho com finalidades de tratamento, direitos dos titulares e compartilhamento de dados com terceiros.
* **Aviso de Cookies (Cookie Consent Banner):** Textos padrão para caixas de diálogo e consentimento de cookies analíticos ou de marketing.

### 2. Parâmetros de Personalização
O usuário insere:
* **Razão Social da Empresa:** Nome jurídico responsável pelo controle de dados.
* **Finalidade da Coleta:** Objetivo de coletar as informações (ex: entrega de produtos, envio de newsletter).
* **Tipo de Dados Coletados:** Nome, CPF, Telefone, Histórico de Compras, etc.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Termo de Consentimento
* **Dado** que o usuário está na tela do Gerador LGPD
* **Quando** ele insere a Empresa como `"Minha Empresa S/A"`
* **E** a finalidade como `"Envio de campanhas promocionais"`
* **E** clica em "Gerar Termo"
* **Então** o sistema deve substituir as variáveis no modelo e retornar o Termo de Consentimento legal formatado
* **E** disponibilizar o botão para baixar em arquivo de texto.

---

## 🎨 Design & UX

* **Visualização da Minuta:**
  * O documento gerado é formatado em uma caixa de texto limpa com margens adequadas para leitura.
  * Presença de botões de cópia rápida e download.
* **Controles:**
  * Painel lateral de configurações agrupadas facilitando o preenchimento de variáveis da empresa e finalidades de forma rápida.
