---
name: write-blog-post
description: Diretrizes e padrões para criação e registro de posts no blog do DevThru
---

# Skill: Escrever Posts de Blog (DevThru)

Esta skill define as regras de criação, formatação e fluxo de publicação de posts no blog do DevThru.

> [!NOTE]
> **Progressive Disclosure:** Para evitar sobrecarga de contexto, esta skill é dividida em módulos focados. Leia este índice e abra apenas os arquivos correspondentes à tarefa específica que está executando.

---

## 🗺️ Índice de Tópicos

Selecione a seção desejada e utilize a ferramenta `view_file` para ler as instruções detalhadas:

### 1. [Padrões e Formatação do Tipo BlogPost](file:///.agent/skills/write-blog-post/formatting.md)
* Tipagem do objeto `BlogPost` no TypeScript.
* Tags HTML autorizadas para a string de conteúdo (`content`).
* Cuidados com termos de escrita técnica e tradução de termos de desenvolvimento.
* **Aviso crítico sobre a proibição do uso de sintaxe Markdown pura no conteúdo.**

### 2. [Regras de SEO e Conversão (Engineering as Marketing)](file:///.agent/skills/write-blog-post/seo.md)
* Meta título e meta descrição otimizados.
* Hierarquia estrutural das tags de cabeçalho (`<h2>` e `<h3>`).
* Estratégia de links internos contextuais e integração dos CTAs com o array `relatedTools`.

### 3. [Fluxo de Registro e Publicação](file:///.agent/skills/write-blog-post/publishing.md)
* Criação do arquivo físico em `lib/content/blog/posts/`.
* Importação e registro no índice `lib/content/blog/index.ts`.
* Processo de build e homologação local.
