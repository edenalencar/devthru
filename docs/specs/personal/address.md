# Gerador de Endereços de Teste (Address Generator)

> [!NOTE]
> Ferramenta de produtividade para gerar endereços postais brasileiros válidos estruturalmente (com CEP, rua, número, cidade e UF) para popular cadastros locais.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera conjuntos de dados de endereços fictícios correspondentes ao padrão de endereçamento dos Correios do Brasil (CEP brasileiro de 8 dígitos).
* **Problema que resolve:** Permite preencher formulários de entrega, faturamento e cadastro geográfico em ambiente local e testes de QA sem precisar expor endereços reais de clientes ou inventar dados desconexos manualmente.
* **Público-alvo:** Desenvolvedores e testadores de software de e-commerce, ERPs e sistemas logísticos.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do Endereço Gerado
O endereço gerado de forma sintética contém:
* **CEP (Código de Endereçamento Postal):** 8 dígitos numéricos formatados como `xxxxx-xxx`.
* **Logradouro:** Nome da rua, avenida ou travessa (ex: "Rua das Flores").
* **Número:** Número residencial aleatório.
* **Bairro:** Nome do bairro correspondente.
* **Cidade:** Município correspondente (ex: "São Paulo").
* **Estado (UF):** Sigla da unidade federativa correspondente (ex: "SP").

### 2. Formatos e Cópia
* O endereço gerado pode ser copiado de forma integral estruturada ou campo a campo (apenas o CEP, apenas o logradouro, etc.).
* Opções de geração em massa para exportar lotes de endereços em formato JSON ou CSV.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Endereço Único
* **Dado** que o usuário está na tela do Gerador de Endereço
* **Quando** ele clica no botão "Gerar Endereço"
* **Então** o sistema deve retornar um registro completo de endereço brasileiro estruturalmente correto
* **E** exibir o CEP formatado como `xxxxx-xxx`
* **E** disponibilizar botões de cópia rápida individuais e totais.

---

## 🎨 Design & UX

* **Visualização:**
  * Apresentação clara em blocos de campos com ícones identificadores (ex: mapa para rua, carta para CEP).
  * Painel de resultados somente leitura com botão de cópia de um clique.
* **Geração em Lote:**
  * Aba de geração em massa para criar tabelas de endereços simultaneamente para testes de importação.
