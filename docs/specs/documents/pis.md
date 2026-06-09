# Gerador e Validador de PIS/PASEP

> [!NOTE]
> Ferramenta de apoio para testes cadastrais e de folha de pagamento brasileiros, integrando algoritmo de validação módulo 11 clássico de um único dígito verificador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números estruturalmente corretos e valida a integridade estrutural do PIS (Programa de Integração Social) ou PASEP (Programa de Formação do Patrimônio do Servidor Público).
* **Problema que resolve:** Permite preencher cadastros trabalhistas de funcionários, guias do eSocial e sistemas de folha de pagamento com dados válidos de teste sem expor documentos reais de colaboradores.
* **Público-alvo:** Desenvolvedores de sistemas de RH, analistas de departamento pessoal e engenheiros de QA de software corporativo.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura do PIS
* O número do PIS/PASEP completo possui exatamente 11 dígitos numéricos.
* A formatação padrão do PIS é `xxx.xxxxx.xx-x`.
* Pode ser gerado e exibido tanto em formato limpo (apenas dígitos) quanto formatado.

### 2. Algoritmo de Validação (Módulo 11)
O último dígito (posição 11) é o dígito verificador, calculado sobre os 10 primeiros dígitos utilizando a seguinte lógica:
1. Multiplica-se os 10 primeiros dígitos pelos pesos decrescentes correspondentes: `3, 2, 9, 8, 7, 6, 5, 4, 3, 2` (da esquerda para a direita).
2. Soma-se os produtos obtidos.
3. Calcula-se o resto da divisão da soma por 11 (`soma % 11`).
4. Calcula-se a diferença: `11 - resto`.
5. Se a diferença for **10** ou **11**, o dígito verificador final é **0**. Caso contrário, o dígito é igual à própria diferença.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar PIS Único Formatado
* **Dado** que o usuário está na tela do Gerador de PIS/PASEP
* **Quando** ele ativa a opção "Formatar PIS (xxx.xxxxx.xx-x)"
* **E** clica no botão "Gerar PIS"
* **Então** o sistema deve retornar um código com 11 dígitos formatado corretamente (ex: `120.34567.89-0`)
* **E** exibir o botão para cópia imediata do resultado.

### Cenário 2: Validação de PIS Correto
* **Dado** que o usuário digita um número de PIS matematicamente válido no campo de validação
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve exibir um card verde com a confirmação "PIS Válido".

### Cenário 3: Validação de PIS Inválido
* **Dado** que o usuário insere uma sequência incorreta ou com dígito verificador incompatível
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve retornar um aviso vermelho informando "PIS Inválido".

---

## 🎨 Design & UX

* **Visualização:**
  * O PIS gerado individualmente é apresentado em uma caixa de resultado dedicada com botão de cópia de um clique.
* **Massa de Testes (Bulk Mode):**
  * Suporte para geração em lote de múltiplos PIS de uma única vez, formatados ou limpos, facilitando testes de carga ou migração de banco de dados em sistemas de departamento pessoal.
* **Persistência de Opções:**
  * Armazenamento das preferências do usuário (formatação ativada/desativada e tab ativa) via LocalStorage.
