# Simulador de Split Payment

> [!NOTE]
> Simula a retenção de IBS e CBS na liquidação de uma venda, com valores estimados para planejamento e testes.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Calcula impostos retidos, repasse líquido e alíquota efetiva de uma transação, e gera um payload JSON de exemplo.
* **Problema que resolve:** Ajuda empresas e desenvolvedores a prever o efeito do Split Payment da Reforma Tributária na conciliação e no caixa.
* **Público-alvo:** Desenvolvedores de ERPs e e-commerces, contadores e equipes financeiras.

---

## ⚙️ Regras de Negócio & Validações

- **Valores padrão:** R$ 1.000,00, IBS de 17,7%, CBS de 8,8%, Pix e operação B2C.
- **Entrada numérica:** Vírgula é aceita como decimal. Valores inválidos ou negativos são tratados como zero.
- **Cálculo:**
  - `IBS = bruto × alíquota IBS / 100`
  - `CBS = bruto × alíquota CBS / 100`
  - `Retenção total = IBS + CBS`
  - `Líquido = máx(0, bruto − retenção total)`
  - `Alíquota efetiva = retenção total / bruto × 100`
- **Valor zero:** Com bruto igual a zero, os percentuais são zero, sem divisão por zero.
- **Meio de pagamento e operação:** Não alteram o cálculo. Eles só compõem o payload simulado.
- **Payload:** Evento `payment.settled_with_split` com valores arredondados para 2 casas.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Cálculo com valores padrão
* **Dado** que o usuário abriu a ferramenta
* **Quando** nenhum campo foi alterado
* **Então** o sistema deve exibir IBS de R$ 177,00, CBS de R$ 88,00 e líquido de R$ 735,00

### Cenário 2: Alteração de alíquota
* **Dado** que o usuário alterou uma alíquota
* **Quando** o campo é atualizado
* **Então** os resultados, a barra de distribuição e o payload devem ser recalculados

### Cenário 3: Retenção maior que o bruto
* **Dado** alíquotas que somam mais de 100%
* **Quando** o cálculo é feito
* **Então** o líquido deve permanecer em zero

### Cenário 4: Cópia do payload
* **Dado** que há um resultado na tela
* **Quando** o usuário copia o JSON
* **Então** o payload deve ir para a área de transferência com aviso de confirmação

---

## 🎨 Design & UX

* **Layout:** Parâmetros à esquerda e resultado da liquidação à direita.
* **Resultado:** Cartões de caixa do vendedor e imposto retido, detalhe de IBS e CBS e barra proporcional.
* **Atualização:** O cálculo acontece enquanto o usuário digita.
* **Analytics:** Eventos `calculate_split` e `copy_json` são enviados ao GTM.
