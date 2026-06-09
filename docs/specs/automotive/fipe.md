# Consulta Tabela FIPE

> [!NOTE]
> Ferramenta auxiliar para desenvolvedores integrarem e testarem cadastros de veículos de forma simulada com base nas marcas, modelos e anos da tabela de preços médios FIPE.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Permite que o usuário consulte marcas, modelos e valores médios históricos de carros, motos e caminhões.
* **Problema que resolve:** Oferece uma interface simplificada para simular e testar o fluxo de consultas a APIs de precificação veicular, muito utilizado em ERPs de concessionárias, seguradoras e classificados.
* **Público-alvo:** Desenvolvedores integrando APIs veiculares, avaliadores de veículos e corretores de seguros.

---

## ⚙️ Regras de Negócio & Validações

### 1. Seleção em Cascata
O fluxo de consulta obrigatoriamente segue uma dependência sequencial (cascata):
1. **Tipo de Veículo:** Carros, Motos ou Caminhões.
2. **Marca:** Lista populada dinamicamente após a escolha do tipo.
3. **Modelo:** Lista populada dinamicamente após a escolha da marca.
4. **Ano/Combustível:** Opções populadas com base no modelo selecionado.

### 2. Resultados da Consulta
* Após selecionar todos os parâmetros e submeter, a ferramenta exibe o valor médio de mercado atualizado da FIPE.
* O valor de mercado deve ser formatado em moeda brasileira (`R$`).
* Devem ser mostrados o Código FIPE do veículo e o Mês de Referência do preço.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Consulta Completa de Veículo com Sucesso
* **Dado** que o usuário está na tela da Tabela FIPE
* **Quando** ele escolhe o tipo "Carros", seleciona a marca (ex: "Chevrolet"), o modelo (ex: "Onix") e o ano/combustível (ex: "2022 Gasolina")
* **E** clica em "Consultar"
* **Então** o sistema deve exibir os detalhes completos do veículo:
  * Nome/Modelo
  * Valor de Mercado formatado (ex: `R$ 75.000,00`)
  * Código FIPE correspondente
  * Mês de referência atualizado.

---

## 🎨 Design & UX

* **Campos Dependentes (Cascata UX):**
  * Um seletor só é habilitado para clique após o anterior ser preenchido (ex: o campo Modelo fica desabilitado com estado "Selecione a marca primeiro" até que a Marca seja de fato escolhida).
* **Organização Visual:**
  * O resultado é apresentado em um card de destaque limpo com badges identificadores para o Código FIPE e o Mês de Referência, facilitando o escaneamento visual da informação.
