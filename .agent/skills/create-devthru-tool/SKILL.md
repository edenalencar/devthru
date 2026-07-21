---
name: create-devthru-tool
description: Diretrizes, padrões de UI/UX, SEO, GA4/GTM analytics e checklists obrigatórios para criação de novas ferramentas no DevThru
---

# Skill: Criar Novas Ferramentas no DevThru

Esta skill define os requisitos obrigatórios, padrões de UI/UX, SEO, rastreamento analítico (GA4/GTM) e a lista de registros necessários para criar e publicar novas ferramentas no DevThru.

---

## 🛑 CHECKLIST OBRIGATÓRIO PARA CADA NOVA FERRAMENTA

Toda nova ferramenta criada no DevThru **DEVE** seguir impreterivelmente os 8 pilares abaixo:

### 1. 🔗 Tag Canônica (Canonical URL SEO)
- Toda ferramenta precisa ter a tag `<link rel="canonical">` gerada para o Google evitar conteúdos duplicados.
- **Como garantir:** A função `generateToolMetadata({ title, description, path, keywords })` em `page.tsx` injeta automaticamente a propriedade `alternates.canonical` apontando para a URL oficial da ferramenta.

### 2. 🏷️ Schema.org SoftwareApplication (`JsonLd` / `SoftwareLd`)
- O Google exige a tag de dados estruturados `@type: "SoftwareApplication"` (JSON-LD) para que a ferramenta apareça como aplicativo web gratuito nos resultados de busca com rich snippets.
- **Como garantir:** O componente `page.tsx` DEVE renderizar a tag `<JsonLd>` configurada via `getToolSchemaGraph`:
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

### 7. 🎨 Padronização de Layout e Rodapé (Coesão do Site)
O rodapé da ferramenta DEVE seguir a estrutura visual unificada do DevThru:
1. **Perguntas Frequentes (FAQ)** em `<Accordion>`.
2. **Bloco de Links Relacionados:**
   ```tsx
   <div className="pt-4 border-t space-y-4">
     <div>
       <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
         Artigos e Guias Relacionados:
       </span>
       <div className="flex flex-wrap gap-2">
         <Link href="/blog/<post-slug>" className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5">
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
