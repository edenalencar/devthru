# Gerador e Validador de Título de Eleitor

> [!NOTE]
> Ferramenta de apoio para testes cadastrais e validações de elegibilidade eleitoral brasileira, integrando lógica de validação de dois dígitos de controle baseados no estado emissor.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de Título de Eleitor válidos e verifica a validade de títulos existentes.
* **Problema que resolve:** Permite preencher cadastros eleitorais fictícios e testar fluxos de validação de elegibilidade ou integração com bancos de dados civis simulados.
* **Público-alvo:** Desenvolvedores de sistemas governamentais, portais de cidadania e engenheiros de QA de cadastros públicos brasileiros.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do Título de Eleitor
* O número do Título de Eleitor é composto por exatamente 12 dígitos numéricos.
* Os dígitos 9 e 10 representam a **Unidade Federativa (UF)** de origem de emissão do título (ex: `01` para São Paulo, `02` para Minas Gerais, etc.).
* Os dígitos 11 e 12 são os dígitos verificadores (DV1 e DV2).

### 2. Códigos de Estado (UF)
* `01` - SP | `02` - MG | `03` - RJ | `04` - RS | `05` - BA | `06` - PR | `07` - CE | `08` - PE | `09` - SC | `10` - GO
* `11` - MA | `12` - PB | `13` - PA | `14` - ES | `15` - PI | `16` - RN | `17` - AL | `18` - MT | `19` - MS | `20` - DF
* `21` - SE | `22` - AM | `23` - RO | `24` - AC | `25` - AP | `26` - RR | `27` - TO | `28` - Exterior (ZZ)

### 3. Algoritmo de Validação (Módulo 11)
* **Primeiro Dígito (DV1 - Posição 11):**
  1. Multiplica-se os 8 primeiros dígitos pelos pesos crescentes correspondentes de 2 a 9: `2, 3, 4, 5, 6, 7, 8, 9` (da esquerda para a direita).
  2. Soma-se os produtos.
  3. Calcula-se o resto da divisão da soma por 11 (`soma % 11`).
  4. Se o resto for **0** e o estado emissor for SP ou MG (códigos `01` ou `02`), o DV1 é definido como **1**. Se o resto for **10**, o DV1 é **0**. Caso contrário, o DV1 é igual ao resto.
* **Segundo Dígito (DV2 - Posição 12):**
  1. Multiplica-se os dígitos 9, 10 e o DV1 recém-calculado pelos pesos `7, 8, 9` respectivamente.
  2. Soma-se os produtos.
  3. Calcula-se o resto da divisão da soma por 11 (`soma % 11`).
  4. Se o resto for **0** e o estado emissor for SP ou MG (códigos `01` ou `02`), o DV2 é definido como **1**. Se o resto for **10**, o DV2 é **0**. Caso contrário, o DV2 é igual ao resto.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Título de Eleitor por Estado
* **Dado** que o usuário está na tela do Gerador de Título de Eleitor
* **Quando** ele seleciona a Unidade Federativa (ex: `"Rio de Janeiro (RJ)"` que tem código `03`)
* **E** clica em "Gerar Título"
* **Então** o sistema deve gerar um número de 12 dígitos contendo `03` nas posições 9 e 10
* **E** exibir o título formatado ou limpo na tela de resultados.

### Cenário 2: Validação de Título Correto
* **Dado** que o usuário insere um número de Título de Eleitor matematicamente válido
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve retornar um card verde confirmando "Título Válido".

### Cenário 3: Validação de Título com UF Inválida
* **Dado** que o usuário digita um número onde os dígitos 9 e 10 não correspondem a nenhuma UF válida (ex: código `99`)
* **Quando** ele clica em "Validar"
* **Então** o sistema deve exibir um aviso vermelho de erro "Título Inválido".

---

## 🎨 Design & UX

* **Interface do Formulário:**
  * Menu de seleção de UF contendo os 26 estados mais o Distrito Federal e a opção de Emissão no Exterior.
* **Geração em Lote:**
  * Aba de geração em massa para criar múltiplos títulos de eleitor simultaneamente para simulação de cargas de dados.
