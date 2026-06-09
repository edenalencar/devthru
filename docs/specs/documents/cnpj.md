# Gerador e Validador de CNPJ (Cadastro Nacional da Pessoa Jurídica)

> [!NOTE]
> Ferramenta essencial para testar cadastros de pessoas jurídicas brasileiras, integrando algoritmos oficiais de validação módulo 11 de dois dígitos e suporte a lotes.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de CNPJ matematicamente válidos (com opção de formatação) e valida a estrutura de CNPJs inseridos pelo usuário.
* **Problema que resolve:** Permite preencher cadastros comerciais e fiscais fictícios de empresas durante fases de homologação e testes de QA locais, garantindo conformidade estrutural.
* **Público-alvo:** Desenvolvedores web, engenheiros de QA e integradores de sistemas fiscais/B2B brasileiros.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do CNPJ
* Um CNPJ completo possui exatamente 14 dígitos numéricos.
* A formatação padrão do CNPJ é `xx.xxx.xxx/xxxx-xx` (sendo `xxxx` o sufixo da filial, comumente `0001` para matriz).
* CNPJs com todos os dígitos idênticos (ex: `00.000.000/0000-00`, `11.111.111/1111-11`, etc.) são considerados **inválidos** estruturalmente.

### 2. Algoritmo de Validação do CNPJ (Módulo 11)
Os dois últimos dígitos verificadores (DV1 e DV2) são calculados da seguinte forma:
* **Primeiro Dígito (DV1):**
  1. Multiplica-se os 12 primeiros dígitos pelos pesos correspondentes: pesos `5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2` (da esquerda para a direita).
  2. Soma-se os produtos obtidos.
  3. Calcula-se o resto da divisão da soma por 11 (`soma % 11`).
  4. Se o resto for menor que 2, o DV1 é `0`. Caso contrário, o DV1 é `11 - resto`.
* **Segundo Dígito (DV2):**
  1. Multiplica-se os 13 primeiros dígitos (incluindo o DV1 recém-calculado) pelos pesos correspondentes: pesos `6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2` (da esquerda para a direita).
  2. Soma-se os produtos obtidos.
  3. Calcula-se o resto da divisão por 11 (`soma % 11`).
  4. Se o resto for menor que 2, o DV2 é `0`. Caso contrário, o DV2 é `11 - resto`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar CNPJ Único Formatado
* **Dado** que o usuário está na tela do Gerador de CNPJ
* **Quando** ele marca a opção "Formatar CNPJ (xx.xxx.xxx/xxxx-xx)"
* **E** clica em "Gerar CNPJ"
* **Então** o sistema deve retornar um CNPJ válido com a formatação padrão (ex: `12.345.678/0001-90`)
* **E** disponibilizar o botão de cópia rápida.

### Cenário 2: Validação de CNPJ Válido
* **Dado** que o usuário digita um CNPJ correto estruturalmente no campo de validação
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve exibir um card verde com a mensagem "CNPJ Válido" e um ícone de confirmação.

### Cenário 3: Validação de CNPJ Inválido
* **Dado** que o usuário digita um CNPJ incorreto ou fictício inválido
* **Quando** ele clica no botão "Validar"
* **Then** o sistema deve exibir um card vermelho com a mensagem "CNPJ Inválido".

---

## 🎨 Design & UX

* **Formatação de Exibição:**
  * O CNPJ gerado é exibido em fonte monoespaçada com opção de cópia rápida integrada à tela de resultados.
* **Massa de Testes (Bulk Mode):**
  * Aba de "Gerar em Massa" que permite definir a quantidade de CNPJs a serem gerados simultaneamente em um bloco de texto, facilitando o uso para desenvolvedores que precisam preencher bancos de dados locais.
* **Configuração Persistida:**
  * Caixa de ferramentas com suporte à persistência automática das opções de layout e tab ativa via LocalStorage.
