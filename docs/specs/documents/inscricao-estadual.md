# Gerador e Validador de Inscrição Estadual (IE)

> [!NOTE]
> Ferramenta essencial para testar integrações de faturamento fiscal (NF-e, NFC-e) B2B no Brasil, contendo lógica específica de validação estrutural para cada uma das 27 Unidades Federativas (UF).

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de Inscrição Estadual (IE) válidos e valida IEs de acordo com as regras específicas do estado selecionado.
* **Problema que resolve:** A Inscrição Estadual brasileira não possui padrão nacional unificado. Cada estado legisla sobre o tamanho, máscara e algoritmo de cálculo da sua IE. A ferramenta unifica essa complexidade em um único local para testes fiscais locais.
* **Público-alvo:** Desenvolvedores de sistemas ERP, softwares de PDV (Ponto de Venda), integradores de faturamento de Nota Fiscal Eletrônica e analistas fiscais.

---

## ⚙️ Regras de Negócio & Validações

### 1. Variação por Estado (UF)
* O validador e o gerador devem se comportar de forma específica com base na UF selecionada.
* O tamanho da Inscrição Estadual varia de 8 a 14 caracteres numéricos dependendo do estado:
  * **São Paulo (SP):** Formato padrão com 12 dígitos, ou 13 dígitos para produtores rurais (iniciando com a letra 'P').
  * **Minas Gerais (MG):** 13 dígitos.
  * **Rio de Janeiro (RJ):** 8 dígitos.
  * **Distrito Federal (DF):** 13 dígitos (iniciando com '07').
* Cada UF possui pesos, divisores e tratamentos de resto de divisão módulo 11 ou módulo 10 particulares para o cálculo do dígito verificador.

### 2. Tratamento de Isenção
* A ferramenta deve contemplar a validação ou indicação de inscrições declaradas como `"ISENTO"`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar IE para Estado Específico
* **Dado** que o usuário está na tela do Gerador de Inscrição Estadual
* **Quando** ele escolhe um estado (ex: `"São Paulo (SP)"`)
* **E** clica no botão "Gerar IE"
* **Then** o sistema deve retornar uma Inscrição Estadual matematicamente correta de acordo com as regras de cálculo e formatação da Sefaz-SP (12 dígitos numéricos).

### Cenário 2: Validação de IE Válida
* **Dado** que o usuário possui uma IE real ou gerada matematicamente válida para determinado estado (ex: RJ)
* **Quando** ele seleciona o estado "Rio de Janeiro (RJ)" no menu, digita a IE correspondente e clica em "Validar"
* **Então** o sistema deve retornar um aviso de sucesso verde "Inscrição Estadual Válida".

### Cenário 3: Validação de IE com Estado Incompatível
* **Dado** que o usuário tem uma IE válida de SP, mas seleciona o estado "Minas Gerais (MG)" no validador
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve identificar o erro de estrutura ou de checksum do dígito e retornar a mensagem de erro vermelha "Inscrição Estadual Inválida".

---

## 🎨 Design & UX

* **Formulário Dinâmico:**
  * Menu de seleção de UF contendo os 26 estados mais o Distrito Federal.
  * O input exibe formatações monoespaçadas.
* **Geração em Lote:**
  * Aba de geração em massa para criar múltiplas IEs de um determinado estado simulando lotes de cadastros B2B.
