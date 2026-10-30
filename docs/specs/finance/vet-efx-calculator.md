# Simulador de VET e eFX Cambial

> [!NOTE]
> Calcula o Valor Efetivo Total de uma operação cambial a partir de cotação, spread e IOF informados.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Estima o custo total em reais de uma operação em moeda estrangeira, o VET por unidade e a elegibilidade ao eFX simplificado.
* **Problema que resolve:** Permite comparar custos cambiais e simular respostas de cotação em checkouts internacionais.
* **Público-alvo:** Desenvolvedores de pagamentos internacionais, e-commerces e equipes financeiras.

---

## ⚙️ Regras de Negócio & Validações

- **Valores padrão:** 100 USD, PTAX de R$ 5,60, spread de 2% e natureza e-commerce/serviços.
- **Moedas:** USD, EUR e GBP.
- **IOF por natureza:** E-commerce e serviços 4,38%, mesmo titular 1,10% e disponibilidade ou outros 0,38%.
- **Entrada numérica:** Vírgula é aceita como decimal. Valores inválidos ou negativos são tratados como zero.
- **Cálculo:**
  - `Câmbio com spread = PTAX × (1 + spread / 100)`
  - `Subtotal = valor × câmbio com spread`
  - `IOF = subtotal × alíquota / 100`
  - `Total = subtotal + IOF`
  - `VET = total / valor`
- **Valor zero:** Com valor igual a zero, o VET é zero.
- **Limite eFX:** Valores até 10.000,00 são elegíveis. O limite compara o valor informado, na moeda escolhida, sem conversão para dólar.
- **Valores simulados:** Cotação e alíquotas não são consultadas em fonte externa e devem ser conferidas com as regras vigentes.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Cálculo padrão
* **Dado** que o usuário abriu a ferramenta
* **Quando** nenhum campo foi alterado
* **Então** o sistema deve exibir subtotal de R$ 571,20, IOF de R$ 25,02, total de R$ 596,22 e VET de R$ 5,96

### Cenário 2: Mudança de natureza
* **Dado** um cálculo em andamento
* **Quando** o usuário seleciona "Mesmo Titular no Exterior"
* **Então** o IOF deve passar a usar 1,10% e os totais devem ser recalculados

### Cenário 3: Acima do limite
* **Dado** que o usuário informou valor acima de 10.000,00
* **Quando** o cálculo é feito
* **Então** o sistema deve exibir o alerta de contrato de câmbio tradicional
* **E** o payload deve trazer `simplified_efx_eligible` como `false`

### Cenário 4: Cópia do payload
* **Dado** que há um resultado na tela
* **Quando** o usuário copia o JSON
* **Então** o payload deve ir para a área de transferência com aviso de confirmação

---

## 🎨 Design & UX

* **Layout:** Parâmetros à esquerda e VET em destaque à direita, com a composição do câmbio.
* **Alerta regulatório:** Verde para operação elegível e âmbar acima do limite.
* **Atualização:** O cálculo acontece enquanto o usuário digita.
* **Analytics:** Eventos `calculate_vet` e `copy_json` são enviados ao GTM.
