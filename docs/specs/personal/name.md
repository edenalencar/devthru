# Gerador de Nomes de Teste (Name Generator)

> [!NOTE]
> Ferramenta de produtividade para gerar nomes de pessoas fictícios e realistas em português do Brasil com sobrenomes comuns para popular bancos de dados locais.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera nomes de pessoas fictícios, masculinos, femininos ou mistos (neutros) com sobrenomes tradicionais do Brasil.
* **Problema que resolve:** Agiliza a criação de registros de testes, evitando a digitação manual repetitiva de nomes aleatórios ou o uso de nomes de pessoas reais em bancos de dados locais de desenvolvimento.
* **Público-alvo:** Desenvolvedores e testadores de software.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros de Entrada
* **Gênero:** Permite filtrar nomes comumente masculinos, femininos ou mistos (combinação aleatória).
* **Quantidade:** Permite selecionar quantos nomes serão gerados em lote.

### 2. Algoritmo de Geração
* Combina nomes próprios selecionados aleatoriamente de um dicionário interno de nomes brasileiros comuns com um ou dois sobrenomes de um dicionário de sobrenomes populares do Brasil (ex: "Silva", "Santos", "Souza", "Oliveira", "Pereira").

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Nome Feminino
* **Dado** que o usuário está na tela do Gerador de Nomes
* **Quando** ele escolhe o gênero "Feminino" e clica em "Gerar"
* **Então** o sistema deve retornar um nome composto e sobrenomes associados (ex: `"Ana Julia Silva"`)
* **E** disponibilizar o botão de cópia rápida.

---

## 🎨 Design & UX

* **Visualização:**
  * O nome gerado é exibido em fonte de destaque com botão de cópia rápido de um clique.
* **Geração em Massa:**
  * Aba que permite gerar dezenas de nomes listados em bloco de texto para copiar de forma integral para povoar tabelas de banco de dados.
