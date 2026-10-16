---
name: create-devthru-tool
description: Diretrizes, padrões de UI/UX, SEO, GA4/GTM analytics e checklists obrigatórios para criação de novas ferramentas no DevThru
---

# Skill: Criar Novas Ferramentas no DevThru

Esta skill define os requisitos obrigatórios, padrões de UI/UX, SEO, rastreamento analítico (GA4/GTM) e a lista de registros necessários para criar e publicar novas ferramentas no DevThru.

---

## 🛑 CHECKLIST OBRIGATÓRIO PARA CADA NOVA FERRAMENTA

Toda nova ferramenta criada no DevThru **DEVE** seguir impreterivelmente os 8 pilares abaixo:

### 1. 🔗 Tag Canônica e Limite de Caracteres no Título (SEO Title & Canonical)
- **Tamanho Máximo do Título:** O `title` exportado em `page.tsx` **DEVE ter no máximo 50 caracteres**. Como a função `generateToolMetadata` anexa automaticamente o sufixo ` | DevThru` (10 caracteres), qualquer título superior a 50 caracteres excederá os 60 caracteres ideais do Google SERP e disparará o alerta *"Title element is too long"* no SEMrush.
- **Tag Canônica:** A função `generateToolMetadata({ title, description, path, keywords })` em `page.tsx` injeta automaticamente a propriedade `alternates.canonical` apontando para a URL oficial da ferramenta, prevenindo conteúdo duplicado.

### 2. 🏷️ Schema.org SoftwareApplication Completo (`JsonLd` / `SoftwareLd`)
- O Google e validadores de dados estruturados (SEMrush) exigem que o `@type: "SoftwareApplication"` contenha obrigatoriamente:
  - `offers`: Informando preço e moeda (`price: "0"`, `priceCurrency: "BRL"`).
  - `aggregateRating`: Avaliação média agregada (`ratingValue: "4.9"`, `ratingCount: "128"`, `bestRating: "5"`, `worstRating: "1"`). Sem esse campo, o SEMrush reporta erro crítico de markup.
- **Atenção para Guias/Artigos Técnicos:** Em páginas de artigos (`TechArticle`), o campo `"about"` **NUNCA** deve usar `@type: "SoftwareApplication"`, pois isso forçará a exigência indevida de `offers`/`aggregateRating`. Use estritamente `@type: "Thing"`.
- **Como garantir na Ferramenta:** O componente `page.tsx` DEVE renderizar a tag `<JsonLd>` configurada via `getToolSchemaGraph`:
  ```tsx
  <JsonLd
      data={getToolSchemaGraph({
          name: "<Nome da Ferramenta>",
          description: "<Descrição>",
          categoryLabel: "<Categoria>",
          path: "/tools/<category>/<tool-slug>",
          toolSlug: "<tool-slug>"
      })}
  />
  ```

### 3. 📊 Rastreamento Analítico (GA4 / GTM Analytics)
- **Importação:** `import { sendGTMEvent } from "@/lib/gtm"`
- **Eventos:**
  - Ao calcular ou gerar um resultado:
    ```ts
    sendGTMEvent({
      event: "tool_interaction",
      tool_name: "<tool-slug>",
      tool_action: "generate_result", // ou "calculate_<feature>"
      tool_category: "<category>"
    })
    ```
  - Ao clicar para copiar dados/resultados:
    ```ts
    sendGTMEvent({
      event: "tool_interaction",
      tool_name: "<tool-slug>",
      tool_action: "copy_result", // ou "copy_json"
      tool_category: "<category>"
    })
    ```

### 4. 🚫 Proibição Absoluta de Markdown Cru no JSX
- **NUNCA** escreva marcas de markdown (como `**texto**`) diretamente em descrições, headers ou no conteúdo de `<AccordionContent>`. O JSX renderiza o texto literalmente exibindo os asteriscos.
- **SEMPRE** utilize tags HTML/JSX nativas:
  - `<strong>Texto em Negrito</strong>` ou `<span className="font-semibold text-foreground">Texto em Negrito</span>`.

### 5. 🧩 Regras do Componente CodeExamplesAccordion
- O componente `<CodeExamplesAccordion />` retorna um `<AccordionItem />`. Portanto, ele **DEVE** estar envolvido por um componente raiz `<Accordion type="single" collapsible className="w-full">`.
- As propriedades de cada objeto de exemplo devem utilizar `label` (ex: `{ language: "python", label: "Python", code: "..." }`).

### 6. ⚡ Prevenção contra Erros de Hidratação (SSR / React)
- Não utilize `new Date().toISOString()` ou `Math.random()` diretamente na criação de mocks ou estados no render inicial do componente do cliente.
- Utilize valores estáticos determinísticos para a primeira renderização para evitar **Hydration Mismatch Warning** entre o servidor e o cliente.

### 7. 🎨 Densidade Textual Mínima e Padronização de Rodapé (Prevenção de Low Word Count e 404)
- **Densidade Textual (Mínimo de 250 a 300 palavras):** Páginas interativas baseadas apenas em formulários são frequentemente penalizadas pelo Google e SEMrush com avisos de *"Page has a low word count"* e *"Low text-to-HTML ratio"*. Toda ferramenta DEVE incluir:
  - Componente `<ToolFaqSection toolSlug="<tool-slug>" ... />` com perguntas frequentes completas cadastradas em `lib/seo/faqs.ts`.
  - Um bloco textual de guia técnico explicando o funcionamento, algoritmo (ex: Módulo 11, RFCs, normas técnicas) ou casos de uso da ferramenta.
- **Validação Rigorosa de Links Internos (Prevenção de 404):** Ao adicionar links para posts de blog no rodapé, **NUNCA invente ou presuma o slug**. Abra `lib/content/blog/posts/` e confirme o valor exato da propriedade `slug` do post (ex: `slug: 'inscricao-estadual-o-que-e-como-validar'`). Links para slugs inexistentes geram erros 404 que quebram o fluxo de PageRank e disparam alertas críticos no SEMrush e Google Search Console.
- **Estrutura Visual Unificada:**
   ```tsx
   <ToolFaqSection
       toolSlug="<tool-slug>"
       title="Perguntas Frequentes sobre <Nome da Ferramenta>"
       description="Tire suas dúvidas técnicas sobre o algoritmo, validação e uso da ferramenta."
   />

   <div className="pt-4 border-t space-y-4">
     <div>
       <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
         Artigos e Guias Relacionados:
       </span>
       <div className="flex flex-wrap gap-2">
         <Link href="/blog/<post-slug-confirmado>" className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5">
           <span>📖 Artigo: Título do Post</span>
           <ArrowRight className="w-3 h-3" />
         </Link>
       </div>
     </div>

     <div>
       <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
         Compartilhe esta ferramenta:
       </span>
       <ShareButtons title="<Nome da Ferramenta> - DevThru" />
     </div>
   </div>

   <RelatedTools currentToolSlug="<tool-slug>" category="<category>" />
   ```

### 8. 📁 REGISTROS GLOBAIS OBRIGATÓRIOS
Ao criar uma nova ferramenta com o slug `<tool-slug>` na categoria `<category>`, registre-a em todos os 7 locais:
1. `app/tools/<category>/<tool-slug>/page.tsx`
2. `app/tools/<category>/<tool-slug>/client.tsx`
3. `config/tools.ts`
4. `lib/tools-list.tsx`
5. `lib/seo/meta-descriptions.ts` e `lib/seo/faqs.ts`
6. `public/llms.txt`
7. `scripts/submit-indexnow.js`
