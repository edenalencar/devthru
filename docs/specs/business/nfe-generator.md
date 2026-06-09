# Gerador de NF-e (Nota Fiscal Eletrônica)

> [!NOTE]
> Ferramenta essencial para testar fluxos fiscais B2B brasileiros, permitindo simular a estrutura de dados de uma NF-e e gerar chaves de acesso válidas baseadas em parâmetros reais.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera chaves de acesso de 44 dígitos estruturalmente corretas de Notas Fiscais Eletrônicas (Modelo 55) e minutas de dados estruturados para testes.
* **Problema que resolve:** Permite que desenvolvedores de sistemas ERP e plataformas de e-commerce testem validadores de chaves de acesso de NF-e e processos de download de XML sem a necessidade de emitir notas reais na SEFAZ.
* **Público-alvo:** Engenheiros de software integrando APIs fiscais e testadores de ERPs.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura da Chave de Acesso da NF-e (44 dígitos)
A chave de acesso oficial de uma NF-e é composta por:
* **UF (2 dígitos):** Código do estado do emissor (ex: `35` para SP).
* **AAMM (4 dígitos):** Ano e mês da emissão da nota (ex: `2512` para dezembro de 2025).
* **CNPJ (14 dígitos):** CNPJ do estabelecimento emitente.
* **Modelo (2 dígitos):** Código do modelo da nota (sempre `55` para NF-e).
* **Série (3 dígitos):** Série do documento (ex: `001`).
* **Número (9 dígitos):** Número sequencial da nota fiscal.
* **Tipo de Emissão (1 dígito):** Forma de emissão (ex: `1` para Normal, `9` para Contingência).
* **Código Numérico (8 dígitos):** Código aleatório gerado pelo emitente para evitar fraudes.
* **Dígito Verificador - DV (1 dígito):** Calculado sobre os 43 dígitos anteriores através do módulo 11.

### 2. Algoritmo de Validação do DV (Módulo 11)
1. Multiplica-se os 43 primeiros dígitos por pesos decrescentes repetitivos de 2 a 9 (da direita para a esquerda).
2. Soma-se os produtos obtidos.
3. O resto da divisão por 11 (`soma % 11`) é calculado.
4. Se o resto for **0** ou **1**, o dígito verificador final é **0**.
5. Caso contrário, o dígito verificador é igual a `11 - resto`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Chave de Acesso Válida
* **Dado** que o usuário está na tela do Gerador de NF-e
* **Quando** ele insere ou seleciona o CNPJ do emissor, UF, Ano/Mês, Série e Número da Nota
* **E** clica no botão "Gerar NF-e"
* **Então** o sistema deve compor os 43 dígitos correspondentes
* **E** calcular o Dígito Verificador (DV) correto via módulo 11
* **E** exibir a chave de acesso de 44 dígitos gerada com opção de cópia rápida.

### Cenário 2: Visualizar XML de Exemplo
* **Dado** que a chave de acesso foi gerada com sucesso
* **Quando** o usuário clica na aba "XML de Teste" ou "Dados Estruturados"
* **Então** o sistema deve exibir um código XML simulado (mock) contendo a tag `<infNfe Id="NFe...">` apontando para a chave gerada.

---

## 🎨 Design & UX

* **Visualização:**
  * A chave de acesso gerada é apresentada em destaque com espaçamento visual para facilitar a contagem de dígitos.
  * Presença de abas ou painéis para alternar entre a "Chave de Acesso", "XML/JSON Mock" e "Dados Fiscais".
* **Facilidade de Uso:**
  * Botões de preenchimento automático com dados de teste aleatórios (ex: gerar CNPJ emissor aleatório com um clique).
