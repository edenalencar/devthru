# Padrões e Formatação do Tipo BlogPost (DevThru)

Esta seção descreve a estrutura TypeScript do BlogPost e os padrões de codificação do conteúdo.

---

## 📑 A Estrutura do Tipo `BlogPost`

Cada post de blog deve seguir exatamente o tipo `BlogPost` importado de `../index.ts`:

```typescript
import { BlogPost } from '../index'

export const postExemplo: BlogPost = {
    slug: 'slug-do-post-em-kebab-case',
    title: 'Título Otimizado para SEO (Máximo 65 caracteres)',
    description: 'Meta descrição atraente para o grid e SEO (120-160 caracteres).',
    date: 'YYYY-MM-DD',
    author: 'DevThru',
    category: 'testes-qa', // Categorias: 'documentos' | 'dev-tools' | 'testes-qa' | 'automotivo'
    readingTime: 5, // Estimativa de minutos de leitura
    tags: ['Tag1', 'Tag2', 'Tag3'],
    relatedTools: ['/tools/category/tool-slug1', '/tools/category/tool-slug2'], // Links de ferramentas
    content: `
      <!-- Conteúdo em formato HTML string -->
    `
}
```

---

## ✍️ Formatação do Conteúdo (`content`)

O campo `content` aceita **HTML cru** dentro de uma template string. Use as seguintes tags e classes para garantir a conformidade estética do design do DevThru:

### 1. Elementos Estruturais
* **Parágrafos**: Use `<p>texto</p>`. Destaque termos importantes com `<strong>`.
* **Cabeçalhos**: Use `<h2>` para seções principais e `<h3>` para subseções. **Nunca** use `<h1>`, pois o título principal da página já cumpre esse papel.
* **Listas**: Use `<ul>` e `<li>` para listas não ordenadas, ou `<ol>` e `<li>` para ordenadas.

### 2. Caixas Informativas (Alertas/Dicas)
Use divs com a classe `info-box` para destacar avisos ou dicas importantes:
```html
<div class="info-box">
  <strong>💡 Dica:</strong> Insira o texto de destaque aqui.
</div>
```

### 3. Tabelas
Use tabelas nativas estilizadas para apresentar comparações ou dados estruturados:
```html
<table>
  <thead>
    <tr><th>Coluna 1</th><th>Coluna 2</th></tr>
  </thead>
  <tbody>
    <tr><td>Valor 1</td><td>Valor 2</td></tr>
  </tbody>
</table>
```

### 4. Blocos de Código
Use `<pre><code class="language-nome">` para snippets de código. Especifique a linguagem para habilitar o syntax highlighting (ex: `language-javascript`, `language-python`, `language-json`, `language-bash`):
```html
<pre><code class="language-javascript">
function test() {
  console.log("Hello, World!");
}
</code></pre>
```

---

## ⚠️ Cuidados com a Linguagem e Tradução Técnica

* **Evite Traduções Literais (False Friends):** Expressões técnicas em inglês devem ser adaptadas para o vocabulário real de desenvolvedores no Brasil.
  * **Incorreto**: *"se comporte de forma graciosa"* (de *fail/handle gracefully*).
  * **Correto**: *"trate erros adequadamente"* ou *"se comporte de forma resiliente"*.
  * Prefira termos técnicos consagrados no mercado brasileiro (ex: *mockado*, *endpoint*, *CI/CD*, *pipeline*, *payload*) a traduções literais artificiais.

> [!CAUTION]
> **Proibição de Markdown no Campo `content`:**
> O conteúdo do post é injetado diretamente na página como HTML bruto (`dangerouslySetInnerHTML`).
> * **NUNCA** use sintaxe Markdown para estilização (ex: `**negrito**`, `*itálico*`, `[link](url)`, `- item`). O navegador renderizará os asteriscos e colchetes literalmente sem formatá-los.
> * Use **sempre** tags HTML nativas: `<strong>negrito</strong>`, `<em>itálico</em>`, `<a href="url">link</a>` e `<li>item</li>`.
