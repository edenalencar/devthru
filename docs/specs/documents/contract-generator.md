# Gerador de Contrato

> [!NOTE]
> Ferramenta utilitária de produtividade para gerar rascunhos rápidos e minutas de contratos de uso comum (prestação de serviços, locação, compra e venda) a partir de parâmetros básicos preenchidos pelo usuário.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Oferece modelos padronizados de contratos comuns do dia a dia corporativo e pessoal, permitindo o preenchimento de campos essenciais (partes, objeto, valores e datas) e exportando o documento estruturado.
* **Problema que resolve:** Agiliza a criação de minutas contratuais de teste para departamentos jurídicos simulados, além de servir como ferramenta de apoio rápido para autônomos formalizarem pequenas prestações de serviços sem precisar redigir do zero.
* **Público-alvo:** Desenvolvedores, pequenos empreendedores, freelancers e analistas administrativos.

---

## ⚙️ Regras de Negócio & Validações

### 1. Modelos Disponíveis
A ferramenta disponibiliza templates padrão de:
* **Contrato de Prestação de Serviços:** Foco em freelancers e desenvolvedores autônomos.
* **Contrato de Locação Residencial:** Regras básicas de aluguel de imóvel.
* **Contrato de Compra e Venda:** Regras gerais de transação de bens móveis ou serviços de valor fixo.

### 2. Parâmetros e Variáveis de Substituição
O documento é montado dinamicamente com base em:
* **Contratante / Locatário / Vendedor:** Razão social/Nome completo, CPF/CNPJ, endereço.
* **Contratado / Locador / Comprador:** Razão social/Nome completo, CPF/CNPJ, endereço.
* **Objeto do Contrato:** Descrição do serviço prestado ou bem locado/vendido.
* **Valor e Forma de Pagamento:** Valores monetários envolvidos e periodicidade.
* **Data e Foro:** Localidade para resolução de conflitos e data de assinatura.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Selecionar Modelo de Contrato
* **Dado** que o usuário está na tela do Gerador de Contrato
* **Quando** ele altera a opção de modelo para `"Contrato de Prestação de Serviços"`
* **Então** a visualização textual do contrato deve carregar as cláusulas correspondentes à prestação de serviços (prazos, escopo, obrigações).

### Cenário 2: Preenchimento Dinâmico de Variáveis
* **Dado** que um modelo de contrato está selecionado
* **Quando** o usuário altera o campo "Nome do Contratado" para `"Lucas Santos"` no formulário
* **Então** todas as instâncias da variável de Contratado no texto do contrato devem ser substituídas dinamicamente por `"Lucas Santos"`.

### Cenário 3: Impressão ou Download em PDF
* **Dado** que a minuta está preenchida e revisada
* **Quando** o usuário clica em "Download PDF" ou "Print"
* **Então** o sistema deve formatar o contrato em folhas no padrão A4 e acionar o fluxo de download/impressão limpo, omitindo os painéis de formulário da tela.

---

## 🎨 Design & UX

* **Visualização da Minuta:**
  * O texto do contrato é exibido em um container estilizado simulando uma folha de papel A4 com margens adequadas e tipografia séria e legível.
* **Interface Dinâmica:**
  * Painel lateral expansível ou abas com os formulários de preenchimento agrupados (Dados das Partes, Objeto e Cláusulas, Assinaturas) para evitar sobrecarga cognitiva.
  * Botão de cópia de todo o texto formatado com um único clique.
