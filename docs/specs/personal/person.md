# Gerador de Perfis de Pessoas (Person Generator)

> [!NOTE]
> Ferramenta completa de simulação para gerar identidades completas e realistas de pessoas fictícias com dados cadastrais e de localização unificados de forma consistente.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera um perfil de pessoa fictícia contendo Nome completo, CPF, RG, Idade, Data de Nascimento, E-mail, Telefone, CEP, Endereço completo, e outras informações acessórias (como signo e tipo sanguíneo).
* **Problema que resolve:** A criação manual de perfis de teste consistentes e estruturalmente corretos para testes de integração complexos ou simulações cadastrais completas consome muito tempo. A ferramenta consolida toda essa geração em um único clique.
* **Público-alvo:** Testadores de software (QA), analistas de sistemas e desenvolvedores integrando telas de cadastro completas.

---

## ⚙️ Regras de Negócio & Validações

### 1. Consistência de Dados
Os dados gerados devem ser estruturalmente corretos individuais e coerentes entre si:
* A data de nascimento deve corresponder exatamente à idade exibida.
* Os documentos (CPF, RG) devem ser matematicamente válidos sob as regras de checksum oficiais.
* O CEP e os dados de endereço devem estar estruturalmente alinhados com o padrão brasileiro.
* O signo deve corresponder à data de nascimento de acordo com o zodíaco.

### 2. Ações de Exportação
* O usuário pode copiar dados individuais ou o perfil completo estruturado em formato JSON.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Perfil Completo
* **Dado** que o usuário está na tela do Gerador de Pessoas
* **Quando** ele clica no botão "Gerar Pessoa"
* **Então** o sistema deve compor e exibir um perfil fictício completo na tela
* **E** certificar que todos os campos obrigatórios (Nome, CPF, RG, Telefone, Endereço) estão preenchidos com dados consistentes e válidos estruturalmente.

---

## 🎨 Design & UX

* **Visualização Estruturada:**
  * O perfil é exibido de forma organizada em seções com divisórias limpas: Dados Pessoais (Nome, Idade, Tipo Sanguíneo), Documentos (CPF, RG) e Localização (CEP, Endereço).
  * Cada campo possui um botão de cópia de um clique posicionado na lateral direita.
* **Exportação JSON:**
  * Opção de visualizar e copiar o perfil completo em estrutura de objeto JSON formatado para facilitar a inclusão direta em payloads de testes de API (Postman/Insomnia).
