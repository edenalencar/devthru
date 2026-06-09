# Contador de Caracteres e Palavras (Character Counter)

> [!NOTE]
> Ferramenta essencial de processamento de texto e análise de strings, fornecendo métricas detalhadas e estatísticas sobre o conteúdo textual de forma instantânea.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Conta em tempo real a quantidade de caracteres (com e sem espaços), palavras, linhas, parágrafos, espaços e tempo estimado de leitura do texto inserido.
* **Problema que resolve:** Permite monitorar limites de tamanho de campos de texto impostos por bancos de dados, redes sociais (como Twitter ou LinkedIn) ou regras de metadados SEO, prevenindo cortes indesejados.
* **Público-alvo:** Desenvolvedores frontend, copywriters, produtores de conteúdo e redatores de SEO.

---

## ⚙️ Regras de Negócio & Validações

### 1. Métricas Calculadas
O contador deve extrair e exibir as seguintes informações estatísticas a partir do texto de entrada:
* **Caracteres com Espaços:** Contagem total de caracteres na string.
* **Caracteres sem Espaços:** Contagem excluindo espaços em branco, tabulações e quebras de linha.
* **Palavras:** Número de palavras (delimitadas por espaços).
* **Linhas:** Quantidade de quebras de linha (`\n`) no texto.
* **Tempo Estimado de Leitura:** Calculado com base em uma velocidade média humana de leitura (geralmente fixada em 200 palavras por minuto):

$$\text{Tempo de Leitura (minutos)} = \frac{\text{Quantidade de Palavras}}{200}$$

### 2. Análise de Frequência (Frequência de Letras)
* A ferramenta deve analisar a distribuição das letras mais frequentes do texto e exibir em formato de ranking (ex: "A letra 'a' apareceu X vezes (Y%)").

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Contagem em Tempo Real
* **Dado** que o usuário está na tela do Contador de Caracteres
* **Quando** ele digita ou cola o texto `"Olá DevThru!"`
* **Então** o sistema deve atualizar instantaneamente os contadores na tela:
  * **Caracteres (com espaços):** `12`
  * **Caracteres (sem espaços):** `11` (excluindo o espaço intermediário)
  * **Palavras:** `2`
  * **Linhas:** `1`.

---

## 🎨 Design & UX

* **Área de Texto Central:**
  * Editor de texto de tamanho livre reativo. À medida que o usuário digita, as estatísticas atualizam suavemente sem recarregar a página.
* **Apresentação em Cards ou Grid:**
  * As principais métricas (Caracteres, Palavras, Linhas e Tempo de Leitura) são exibidas em quatro cards superiores destacados de fácil visualização.
  * Tabela ou gráfico simples de barras listando o ranking de frequência das letras no rodapé da página.
