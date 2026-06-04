# Regras de SEO e Conversão (Engineering as Marketing)

Esta seção descreve como otimizar o post do blog para mecanismos de busca (SEO) e como converter leitores em usuários das ferramentas do DevThru.

---

## 🔍 SEO Técnico e On-Page

1. **Title e Description**:
   * O `title` do `BlogPost` deve ter no máximo 65 caracteres e conter a palavra-chave foco.
   * A `description` (meta descrição) deve ter entre 120 e 160 caracteres, sendo chamativa e resumindo o valor prático do post.
2. **Heading Hierarchy (Hierarquia de Títulos)**:
   * O título da página já renderiza uma tag `<h1>` automaticamente.
   * No campo `content`, utilize estritamente títulos estruturados em ordem lógica: `<h2>` para seções principais e `<h3>` para subseções secundárias. **Nunca** use a tag `<h1>`.
3. **Palavras-Chave**:
   * Distribua a palavra-chave foco de forma natural. Ela deve aparecer no primeiro parágrafo do texto, em pelo menos um cabeçalho `<h2>` e ao longo do conteúdo.
4. **Imagens**:
   * Sempre utilize caminhos de arquivo absolutos a partir do diretório `/public/images/blog/`.
   * Certifique-se de preencher atributos `alt="..."` descritivos e amigáveis para SEO nas tags de imagem.

---

## 🛠️ Conversão e Links Internos (CTAs)

A principal meta do blog é atuar como topo de funil para as ferramentas de desenvolvimento do DevThru.

1. **Links Contextuais no Texto**:
   * Sempre que citar uma ferramenta (ex: CPF, CNPJ, gerador de chaves, validador de XML), adicione um link âncora redirecionando para a respectiva página usando caminhos relativos:
     ```html
     Gere chaves fiscais fictícias usando o <a href="/tools/business/nfe-generator">Gerador de NF-e</a>.
     ```
2. **O Array `relatedTools`**:
   * Adicione as URLs relativas das ferramentas relacionadas no array `relatedTools` do post.
   * O componente do blog ([page.tsx](file:///c:/Users/edena/Projetos/devhubtools/app/blog/[slug]/page.tsx)) importará esses caminhos e resolverá dinamicamente os botões na seção final do post com seus respectivos nomes configurados em `tools-list.tsx`.
   * Certifique-se de que a ferramenta de destino esteja corretamente cadastrada no [tools-list.tsx](file:///c:/Users/edena/Projetos/devhubtools/lib/tools-list.tsx) com seu respectivo slug.
