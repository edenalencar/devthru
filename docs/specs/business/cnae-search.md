# Busca de CNAE (Classificação Nacional de Atividades Econômicas)

> [!NOTE]
> Ferramenta de apoio para pesquisa rápida de códigos CNAE e atividades comerciais brasileiras, auxiliando desenvolvedores a parametrizar cadastros empresariais e integrações ERP.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Permite consultar códigos CNAE digitando números ou palavras-chave das atividades comerciais correspondentes.
* **Problema que resolve:** Simplifica a busca manual em tabelas extensas do IBGE, permitindo encontrar rapidamente a classificação exata da atividade comercial de uma empresa para preenchimento de cadastros e emissão de notas fiscais.
* **Público-alvo:** Desenvolvedores parametrizando ERPs, contadores e administradores de empresas.

---

## ⚙️ Regras de Negócio & Validações

### 1. Padrão do Código CNAE
* O código CNAE oficial possui 7 dígitos, estruturado no formato `xxxx-x/xx` (seções de classe e subclasse).
* A pesquisa deve ser tolerante a termos de pesquisa sem pontuação ou parciais.

### 2. Filtros e Mecanismo de Busca
* A ferramenta deve permitir a busca por:
  * **Código Numérico:** Encontrar a atividade exata correspondente a um código específico (completo ou parcial).
  * **Palavra-chave:** Buscar termos como "desenvolvimento", "comércio", "transporte" no nome ou descrição da atividade e listar todos os CNAEs correspondentes.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Buscar CNAE por Palavra-chave
* **Dado** que o usuário está na tela de Busca de CNAE
* **Quando** ele digita `"desenvolvimento"` no campo de pesquisa
* **Então** o sistema deve listar os CNAEs associados (ex: `6201-5/01` - Desenvolvimento de programas de computador sob encomenda)
* **E** exibir a descrição detalhada e o código de cada item encontrado.

### Cenário 2: Buscar CNAE por Código
* **Dado** que o usuário deseja saber a atividade de um código conhecido
* **Quando** ele insere o código `"6202300"` ou `"6202-3/00"`
* **Então** o sistema deve filtrar e exibir a atividade exata: `"Desenvolvimento e licenciamento de programas de computador customizáveis"`.

---

## 🎨 Design & UX

* **Barra de Pesquisa Reativa:**
  * O input realiza a filtragem de forma ágil com feedback visual instantâneo ou botão de busca destacado.
* **Apresentação dos Resultados:**
  * Os resultados são dispostos em formato de lista ou grid de cards limpos.
  * Cada linha do resultado permite copiar o código do CNAE com um único clique.
