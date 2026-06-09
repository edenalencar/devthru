# Gerador de CT-e (Conhecimento de Transporte Eletrônico)

> [!NOTE]
> Ferramenta auxiliar de testes para o segmento logístico e de transportes brasileiro, permitindo gerar chaves de acesso válidas de CT-e para homologação de sistemas de frete.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera chaves de acesso estruturalmente válidas de 44 dígitos para documentos do tipo CT-e (Modelo 57).
* **Problema que resolve:** Permite que desenvolvedores de softwares de logística (TMS) e ERP testem validadores e importadores de arquivos de frete sem a necessidade de emitir documentos de transporte reais.
* **Público-alvo:** Desenvolvedores e testadores de sistemas de transporte e logística (TMS) no Brasil.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura da Chave de Acesso do CT-e (44 dígitos)
A chave de acesso do CT-e segue a mesma estrutura geral da NF-e, alterando o modelo fiscal:
* **UF (2 dígitos):** Código do estado de origem do emitente.
* **AAMM (4 dígitos):** Ano e mês da emissão do CT-e.
* **CNPJ (14 dígitos):** CNPJ da transportadora emitente.
* **Modelo (2 dígitos):** Código do modelo da nota (sempre **57** para CT-e).
* **Série (3 dígitos):** Série do documento.
* **Número (9 dígitos):** Número sequencial do CT-e.
* **Tipo de Emissão (1 dígito):** Tipo de contingência ou emissão normal.
* **Código Numérico (8 dígitos):** Número aleatório do emitente.
* **Dígito Verificador (1 dígito):** DV calculado sobre as 43 posições anteriores via módulo 11.

### 2. Algoritmo de Validação do DV
* Idêntico ao cálculo da NF-e (módulo 11 com pesos de 2 a 9 da direita para a esquerda). Se o resto for 0 ou 1, o DV é 0; caso contrário, é `11 - resto`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Chave de CT-e Válida
* **Dado** que o usuário está na tela do Gerador de CT-e
* **Quando** ele insere os parâmetros (CNPJ da transportadora, UF, Ano/Mês, etc.)
* **E** clica em "Gerar CT-e"
* **Então** o sistema deve compor os 43 dígitos iniciais contendo o modelo `57` nas posições 21 e 22
* **E** calcular o dígito verificador módulo 11
* **E** exibir a chave de 44 dígitos pronta para cópia.

---

## 🎨 Design & UX

* **Interface e Facilidades:**
  * Layout similar ao gerador de NF-e, mantendo familiaridade de uso.
  * Inputs organizados com formatação automática de números.
  * Função de preenchimento automático para acelerar testes de desenvolvimento local.
