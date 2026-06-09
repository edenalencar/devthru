# Conversor de Bases Numéricas

> [!NOTE]
> Ferramenta essencial para programadores e estudantes de ciência da computação realizarem conversões reativas entre diferentes sistemas de numeração (Binário, Octal, Decimal e Hexadecimal).

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte números instantaneamente de uma base de origem selecionada para as demais bases de destino.
* **Problema que resolve:** Agiliza a tradução manual de dados de baixo nível (como endereços hexadecimais, máscaras de rede binárias ou dados octais) para decimal e vice-versa, prevenindo erros de cálculo aritmético.
* **Público-alvo:** Programadores, engenheiros de redes, estudantes e entusiastas de computação.

---

## ⚙️ Regras de Negócio & Validações

### 1. Bases Suportadas e Regras de Input
A ferramenta valida os caracteres inseridos dinamicamente de acordo com a base ativa:
* **Binário (Base 2):** Permite apenas os caracteres `0` e `1`.
* **Octal (Base 8):** Permite dígitos de `0` a `7`.
* **Decimal (Base 10):** Permite dígitos de `0` a `9`.
* **Hexadecimal (Base 16):** Permite dígitos de `0` a `9` e letras de `A` a `F` (caixa alta ou baixa).

### 2. Comportamento de Conversão Reativa
* Ao digitar em qualquer um dos campos de base, todos os outros campos correspondentes são atualizados instantaneamente em tempo real.
* Se um caractere inválido para a base ativa for inserido, o sistema impede a digitação ou exibe uma mensagem de erro indicando caractere inválido.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Conversão de Decimal para Outras Bases
* **Dado** que o usuário está na tela do Conversor de Bases
* **Quando** ele digita o número `"255"` no campo **Decimal**
* **Então** o sistema deve preencher e exibir automaticamente os seguintes valores nos respectivos campos:
  * **Binário:** `11111111`
  * **Octal:** `377`
  * **Hexadecimal:** `FF` (ou `ff`).

### Cenário 2: Inserção de Caractere Inválido
* **Dado** que o usuário selecionou o campo **Binário**
* **Quando** ele tenta digitar a sequência `"102"`
* **Então** o sistema deve recusar o caractere `"2"` (por não pertencer à Base 2)
* **E** exibir um aviso visual de formato inválido.

---

## 🎨 Design & UX

* **Campos Sincronizados:**
  * O layout apresenta quatro campos de entrada alinhados verticalmente, cada um com uma etiqueta proeminente indicando a base (Binário, Octal, Decimal, Hexadecimal).
  * Cada campo possui um botão de cópia rápida individual para facilitar a cópia rápida do resultado convertido.
* **Fontes Monoespaçadas:**
  * Os inputs adotam fonte monoespaçada (`font-mono`) para melhor alinhamento e leitura de sequências numéricas longas (especialmente binários).
