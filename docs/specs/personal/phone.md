# Gerador de Telefone de Teste (Phone Generator)

> [!NOTE]
> Ferramenta de apoio para testes cadastrais, gerando números de telefones celulares e fixos brasileiros válidos de acordo com as regras nacionais de DDD e do 9º dígito.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera números de telefone celular (padrão com 9º dígito) ou telefone fixo (padrão com 8 dígitos) brasileiros, com a possibilidade de selecionar o DDD do estado emissor e formatar com máscara.
* **Problema que resolve:** Permite obter telefones válidos para popular formulários de cadastro que validam a estrutura ou máscara dos números de telefone, sem a necessidade de expor telefones reais de usuários.
* **Público-alvo:** Desenvolvedores e testadores de software.

---

## ⚙️ Regras de Negócio & Validações

### 1. Padrões de Numeração (Brasil)
* **Celular:** Formato com 9 dígitos numéricos. O primeiro dígito (9º dígito) é sempre **9** (ex: `9xxxx-xxxx`).
* **Telefone Fixo:** Formato com 8 dígitos numéricos, iniciando com dígitos de 2 a 5 (ex: `[2-5]xxx-xxxx`).
* **DDD:** Permite selecionar códigos de área brasileiros válidos de 2 dígitos (ex: `11` a `99`).

### 2. Formatações Suportadas
* **Formatado:** Aplica a máscara nacional clássica `(xx) xxxxx-xxxx` ou `(xx) xxxx-xxxx`.
* **Apenas Números (Sem máscara):** Retorna o número bruto contendo apenas dígitos numéricos (ex: `11999999999` para celulares ou `1133334444` para fixos).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Celular com DDD 11 Formatado
* **Dado** que o usuário está na tela do Gerador de Telefone
* **Quando** ele escolhe o Tipo como "Celular", seleciona o DDD `"11 (São Paulo)"` e marca "Formatar"
* **E** clica em "Gerar"
* **Então** o sistema deve retornar um celular válido iniciado com 9 (ex: `(11) 98765-4321`)
* **E** exibir o botão de cópia de um clique.

---

## 🎨 Design & UX

* **Visualização:**
  * O telefone gerado é exibido em fonte monoespaçada com caixa de destaque e botão para cópia rápida.
* **Geração em Massa:**
  * Aba que permite gerar múltiplos números simultaneamente em bloco de texto para copiar de uma vez.
* **Configuração:**
  * Presença de seletores dropdown simples para o Tipo (Fixo/Celular) e para a lista de DDDs nacionais organizada por estado.
