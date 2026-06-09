# Gerador de Slug (Slug Generator)

> [!NOTE]
> Ferramenta essencial de otimização on-page de SEO para converter títulos de páginas, posts e categorias em sequências amigáveis de texto para URLs limpas de forma instantânea.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte frases em strings limpas de URL (slugs), em minúsculas, separadas por hifens e livres de acentuações ou caracteres especiais.
* **Problema que resolve:** A presença de espaços, acentuações brasileiras (como ã, ç, é) e caracteres especiais (como ?, &, @) em caminhos de URLs causa codificações confusas no navegador (ex: `%20` ou `%C3%A1`). A ferramenta normaliza o título garantindo uma URL limpa e legível para pessoas e robôs de busca.
* **Público-alvo:** Desenvolvedores frontend/backend, gerentes de conteúdo, blogueiros e analistas de SEO.

---

## ⚙️ Regras de Negócio & Validações

### 1. Regras de Transformação do Slug
A ferramenta aplica as seguintes regras em sequência lógica:
1. **Caixa Baixa:** Converte todas as letras do texto original para minúsculas.
2. **Remover Acentos e Diacríticos:** Normaliza e substitui caracteres acentuados por suas versões equivalentes limpas (ex: `á, à, ã, â` viram `a`; `ç` vira `c`; `é` vira `e`).
3. **Substituição de Espaços e Caracteres Especiais:** Substitui espaços, barras, parênteses e caracteres especiais por hifens (`-`).
4. **Filtro de Caracteres Permitidos:** Remove qualquer caractere que não seja letra de `a` a `z`, número de `0` a `9` ou hífen `-`.
5. **Normalização de Hifens:** Substitui múltiplos hifens seguidos por um único hífen (ex: `--` vira `-`).
6. **Limpeza de Bordas:** Remove hifens posicionados no início ou no final da string resultante.

### 2. Controle Opcional de Stop Words
* Permite ativar/desativar a remoção automática de artigos e preposições (Stop Words brasileiras como: "o", "a", "de", "do", "da", "em", "para", "com") para encurtar o slug final, melhorando a relevância em indexações de SEO.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Slug Padrão com Acentuação
* **Dado** que o usuário está na tela do Gerador de Slug
* **Quando** ele insere o título `"O que é Spec-Driven Development?"`
* **E** clica em "Gerar" ou a conversão reativa ocorre
* **Então** o sistema deve retornar o slug limpo: `o-que-e-spec-driven-development`
* **E** habilitar o botão de cópia de um clique.

### Cenário 2: Gerar Slug com Remoção de Stop Words
* **Dado** que o usuário marcou a opção de "Remover Stop Words (preposições/artigos)"
* **Quando** ele digita o título `"Tutorial de JavaScript para Iniciantes"`
* **Então** o sistema deve remover as stop words "de" e "para" e retornar o slug abreviado: `tutorial-javascript-iniciantes`.

---

## 🎨 Design & UX

* **Processamento Reativo:**
  * O slug final é atualizado instantaneamente em uma caixa de texto somente leitura à medida que o usuário digita a frase de origem.
* **Ações Rápidas:**
  * Botão de cópia rápida integrado ao campo de resultado com Sonner Toast de confirmação visual.
  * Presença de checkbox simples para habilitar/desabilitar a filtragem de Stop Words na barra de controles.
* **Exibição do Snippet de URL:**
  * Exibição visual simulada de uma barra de endereço de navegador ou de um resultado de pesquisa do Google (SERP Preview) contendo o slug gerado para conferência estética da URL.
