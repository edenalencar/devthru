# Calculadora de Prazos e Dias Úteis (Deadline Calculator)

> [!NOTE]
> Ferramenta essencial de produtividade para cálculo de prazos administrativos, contratuais ou processuais, adicionando ou subtraindo dias úteis e corridos a partir de uma data de referência.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Adiciona ou subtrai uma quantidade específica de dias (corridos ou úteis) a partir de uma data inicial definida pelo usuário, retornando a data de vencimento exata.
* **Problema que resolve:** Elimina o erro humano de contar manualmente dias no calendário para prever entregas de projetos, vencimentos de boletos ou prazos jurídicos, considerando finais de semana e feriados.
* **Público-alvo:** Gerentes de projetos, advogados, analistas financeiros e desenvolvedores web.

---

## ⚙️ Regras de Negócio & Validações

### 1. Modos de Contagem
* **Dias Corridos:** Conta todos os dias consecutivos do calendário, incluindo sábados, domingos e feriados.
* **Dias Úteis:** Desconsidera sábados e domingos no cálculo.

### 2. Tratamento de Feriados (Opcional)
* A ferramenta deve permitir, de forma opcional, ignorar feriados nacionais brasileiros no cálculo dos dias úteis para conformidade com calendários comerciais nacionais.

### 3. Direção do Cálculo
* **Adicionar Dias:** Soma dias à data de início.
* **Subtrair Dias:** Retrocede dias a partir da data de início.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Somar Dias Corridos
* **Dado** que o usuário está na Calculadora de Prazos
* **Quando** ele escolhe a data de início como `10/12/2025`
* **E** define a quantidade como `15` dias no modo **Dias Corridos** (Adicionar)
* **Então** o sistema deve retornar a data final exata como `25/12/2025`.

### Cenário 2: Somar Dias Úteis Pulando Fim de Semana
* **Dado** que a data de início é `05/12/2025` (uma sexta-feira)
* **Quando** ele escolhe somar `2` **Dias Úteis**
* **Então** o sistema deve desconsiderar sábado (06/12) e domingo (07/12) no cálculo
* **E** retornar a data de vencimento como `09/12/2025` (uma terça-feira).

---

## 🎨 Design & UX

* **Visualização:**
  * O formulário apresenta seletores simples: Data de Início (seletor de calendário nativo), Operação (Somar/Subtrair), Tipo de Contagem (Corridos/Úteis), e Quantidade de dias (input numérico).
  * Exibição em destaque da data de vencimento final calculada acompanhada do dia da semana correspondente (ex: `"Terça-feira, 09 de Dezembro de 2025"`).
* **Simplicidade:**
  * Interface limpa livre de excesso de campos para facilitar a inserção e leitura rápida de prazos.
