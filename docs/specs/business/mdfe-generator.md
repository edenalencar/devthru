# Gerador de MDF-e (Manifesto Eletrônico de Documentos Fiscais)

> [!NOTE]
> Ferramenta auxiliar de testes para o segmento logístico, permitindo gerar chaves de acesso válidas de MDF-e para homologação de sistemas de frete e controle de cargas.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera chaves de acesso de 44 dígitos válidas para o Manifesto Eletrônico (Modelo 58).
* **Problema que resolve:** Permite que desenvolvedores de softwares de controle de frota e rastreamento de cargas testem rotinas de processamento de manifestos de transporte sem a necessidade de emitir manifestos reais na SEFAZ.
* **Público-alvo:** Desenvolvedores e testadores de sistemas ERP logísticos e transportadoras.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura da Chave de Acesso do MDF-e (44 dígitos)
A chave de acesso do MDF-e segue o padrão nacional, configurando o modelo específico:
* **UF (2 dígitos):** Código do estado de origem do emitente.
* **AAMM (4 dígitos):** Ano e mês da emissão do manifesto.
* **CNPJ (14 dígitos):** CNPJ da empresa de transporte emitente.
* **Modelo (2 dígitos):** Código do modelo (sempre **58** para MDF-e).
* **Série (3 dígitos):** Série do manifesto.
* **Número (9 dígitos):** Número sequencial do MDF-e.
* **Tipo de Emissão (1 dígito):** Tipo de emissão.
* **Código Numérico (8 dígitos):** Número aleatório do emitente.
* **Dígito Verificador (1 dígito):** DV calculado sobre as 43 posições anteriores via módulo 11.

### 2. Algoritmo de Validação do DV
* Idêntico ao cálculo da NF-e (módulo 11 com pesos de 2 a 9 da direita para a esquerda). Se o resto for 0 ou 1, o DV é 0; caso contrário, é `11 - resto`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Chave de MDF-e Válida
* **Dado** que o usuário está na tela do Gerador de MDF-e
* **Quando** ele fornece os parâmetros necessários
* **E** clica em "Gerar MDF-e"
* **Então** o sistema deve compor os 43 dígitos iniciais contendo o modelo `58` nas posições 21 e 22
* **E** calcular o dígito verificador módulo 11
* **E** exibir a chave de 44 dígitos gerada.

---

## 🎨 Design & UX

* **Visualização:**
  * Painel intuitivo com opção de gerar dados aleatórios com um único clique.
  * Fonte monoespaçada de fácil leitura para a chave de acesso final.
