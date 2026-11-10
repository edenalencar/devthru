---
name: devthru-seo-content-design
description: Como adicionar texto extra a uma página do DevThru (SEO, "pouco conteúdo"/thin content apontado por Semrush, Ubersuggest ou Search Console, seção "Sobre", introdução, FAQ) sem quebrar o design. Use sempre que for inserir parágrafos, seções de texto ou blocos "Sobre X" em páginas existentes (blog, hubs, home, ferramentas, landing pages).
---

# Texto de SEO sem quebrar o design do DevThru

Texto colocado só para resolver "pouco conteúdo" costuma virar um bloco de parágrafos soltos no fim da página: coluna mais estreita que o resto, alinhado à esquerda num layout centralizado, sem card, sem os componentes da página. Isso aconteceu no `/blog` (corrigido em `app/blog/page.tsx`, seção "Sobre o blog"). Use esta skill para não repetir.

## Regra principal

O texto novo tem que parecer parte da página, não um anexo. Antes de escrever o JSX, leia a página inteira e reuse **os mesmos** padrões que ela já usa:

1. **Largura do container igual à do conteúdo vizinho.** Se a página usa `container mx-auto max-w-5xl px-4`, a seção nova também usa `max-w-5xl`. Nunca abra uma coluna `max-w-3xl` de texto corrido embaixo de uma grade larga.
2. **Mesmo alinhamento.** Hero e cabeçalhos centralizados → cabeçalho da seção nova centralizado (`text-center`, parágrafo `max-w-2xl mx-auto`).
3. **Mesma superfície.** Se o conteúdo está em cards (`rounded-xl border bg-card shadow-sm p-6`), o texto também vai em cards. Nas páginas de ferramenta, use `<Card>` / `CardHeader` / `CardTitle` / `CardContent` de `@/components/ui/card` (padrão "Sobre o …" em `app/tools/**/client.tsx`).
4. **Mesmos elementos visuais.** Reaproveite o selo de pílula do hero (`inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground` + ícone lucide), os selos de categoria (`blogCategories[key].color`), o link de ação azul com `ArrowRight` (`text-blue-600 dark:text-blue-400 hover:gap-2`), o gradiente `from-blue-50/50 … dark:from-blue-950/20`.
5. **Quebre o texto em blocos com estrutura.** Em vez de 3 parágrafos longos: uma introdução curta + grade de cards (um por categoria/tema/passo) + um card de chamada (contato, ferramenta relacionada). O volume de palavras para SEO continua o mesmo, mas a leitura fica escaneável.
6. **Dados em array, não JSX repetido.** Textos por item ficam numa constante no topo do arquivo (ex.: `aboutCategories` em `app/blog/page.tsx`) e são renderizados com `.map`.
7. **Links internos de verdade.** Se o texto cita "página de contato" ou uma ferramenta, transforme em `<Link>` (`/contact`, `/tools/...`). Ajuda SEO e UX.
8. **Só cite o que existe.** Cada assunto mencionado deve ter post ou ferramenta publicada (confira em `lib/content/blog/index.ts` e `app/tools/`).

## Tipografia e cores

- Título de seção: `text-2xl sm:text-3xl font-bold tracking-tight` (h2; a página já tem o h1 no hero).
- Corpo: `text-muted-foreground`; dentro de cards `text-sm leading-relaxed`.
- Use só tokens do tema (`bg-card`, `bg-background`, `text-foreground`, `text-muted-foreground`, `border`) e as cores já usadas na página, sempre com a variante `dark:`.

## Responsividade

- Grades: `grid gap-6 sm:grid-cols-2 lg:grid-cols-4` (ou o número de colunas da grade vizinha).
- Linhas com texto + botão: `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`, botão com `shrink-0`.
- Fileiras de botões (paginação, ações): `flex-wrap`, e rótulos longos `hidden sm:inline` com `aria-label` no link.

## Verificação obrigatória

Com o preview (`.claude/launch.json`, config `devthru`):

1. Screenshot desktop da seção nova junto com o conteúdo de cima — tem que parecer a mesma página.
2. Tema escuro **e** claro.
3. Mobile 375px: `document.documentElement.scrollWidth === clientWidth` (sem scroll horizontal).
4. O banner de cookies e o player "Dev Radio" ficam fixos sobre a página; esconda-os via JS só para a captura (não clique em aceitar).

## Texto

- Português, sem "pra devs" (o público não é só de devs).
- Frases diretas; evite enchimento só para bater contagem de palavras.
