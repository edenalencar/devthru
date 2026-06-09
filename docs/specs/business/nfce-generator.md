# Gerador de NFC-e (Nota Fiscal de Consumidor Eletrônica)

> [!NOTE]
> Ferramenta auxiliar de testes para o varejo brasileiro, gerando chaves de acesso válidas de NFC-e para testes em sistemas de ponto de venda (PDV).

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera chaves de acesso estruturalmente corretas de 44 dígitos para o modelo de Nota Fiscal do Consumidor (Modelo 65).
* **Problema que resolve:** Permite que desenvolvedores de softwares de PDV e frentes de caixa varejistas testem validadores e geradores de XML sem a necessidade de emitir cupons fiscais reais que gerem obrigações tributárias.
* **Público-alvo:** Desenvolvedores e testadores de sistemas de ponto de venda (PDV) e automação comercial.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura da Chave de Acesso da NFC-e (44 dígitos)
Segue a mesma estrutura da NF-e, variando o modelo fiscal:
* **UF (2 dígitos):** Código do estado de origem do emitente.
* **AAMM (4 dígitos):** Ano e mês da emissão.
* **CNPJ (14 dígitos):** CNPJ do estabelecimento varejista emitente.
* **Modelo (2 dígitos):** Código do modelo (sempre **65** para NFC-e).
* **Série (3 dígitos):** Série do cupom.
* **Número (9 dígitos):** Número sequencial do cupom fiscal.
* **Tipo de Emissão (1 dígito):** Tipo de emissão.
* **Código Numérico (8 dígitos):** Número aleatório do emitente.
* **Dígito Verificador (1 dígito):** DV calculado sobre as 43 posições anteriores via módulo 11.

### 2. Algoritmo de Validação do DV
* Idêntico ao cálculo da NF-e (módulo 11 com pesos de 2 a 9 da direita para a esquerda). Se o resto for 0 ou 1, o DV é 0; caso contrário, é `11 - resto`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Chave de NFC-e Válida
* **Dado** que o usuário está na tela do Gerador de NFC-e
* **Quando** ele insere os parâmetros básicos (CNPJ, UF, etc.)
* **E** clica em "Gerar NFC-e"
* **Então** o sistema deve compor os 43 dígitos iniciais contendo o modelo `65` nas posições 21 e 22
* **E** calcular o dígito verificador módulo 11
* **E** exibir a chave de 44 dígitos resultante.

---

## 🎨 Design & UX

* **Visualização:**
  * Painel rápido de preenchimento de dados de simulação de cupom fiscal.
  * Fonte monoespaçada de fácil leitura para a chave de acesso final.
