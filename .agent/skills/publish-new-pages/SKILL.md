---
name: publish-new-pages
description: Checklist obrigatório sempre que uma nova página pública for criada no DevThru (ferramenta, post do blog, guia, landing page) - atualizar a página Atualizações, enviar ao IndexNow e solicitar indexação no Google Search Console
---

# Skill: Divulgar Novas Páginas Públicas (DevThru)

Toda **nova página pública** do DevThru precisa ser anunciada e enviada aos buscadores. Esta skill vale junto com
[create-devthru-tool](file:///.agent/skills/create-devthru-tool/SKILL.md) (ferramentas) e
[write-blog-post](file:///.agent/skills/write-blog-post/SKILL.md) (posts).

---

## 🎯 Quando aplicar

**Aplica-se** a qualquer URL nova acessível sem login e indexável:
* Ferramentas (`/tools/<categoria>/<slug>`)
* Posts do blog (`/blog/<slug>`)
* Guias programáticos (`/guides/...`) e páginas por estado (`/ferramentas/...`)
* Páginas institucionais ou de marketing novas (ex.: `/anuncie`, `/ferramentas-fiscais`)

**Não se aplica** a páginas administrativas ou privadas — as mesmas bloqueadas em `app/robots.ts`:
`/admin`, `/dashboard`, `/auth`, `/api`, além de `/login`, `/register` e `/forgot-password`.

---

## ✅ Checklist

### 1. Página Atualizações — no mesmo PR da página nova
Adicione uma entrada **no topo** do array `updates` em `app/updates/page.tsx`:

```ts
{
    date: "04 de Novembro de 2026",          // data por extenso, mês com inicial maiúscula
    title: "Nome das novidades",
    description: "O que foi lançado e para que serve, em 2 a 4 frases.",
    type: "feature",                          // feature = ferramenta/página nova; content = blog/guias; fix; security
    version: "1.51.0"
}
```

* Suba a versão em `package.json` e use a mesma na entrada: **minor** (`1.50.0 → 1.51.0`) para ferramentas ou páginas novas, **patch** (`1.51.0 → 1.51.1`) para conteúdo e correções.
* Várias páginas no mesmo PR = **uma** entrada citando todas.

### 2. IndexNow — registrar no mesmo PR, enviar só depois do deploy
1. Adicione cada URL nova em `scripts/submit-indexnow.js`, na seção da categoria (`// Tools - Text`, `// Blog`...). Use sempre `https://www.devthru.com/...`.
2. Confirme que o script continua sem URLs duplicadas.
3. **Depois do deploy em produção** (merge na `master`), confira que cada URL nova responde **200** e só então rode:
   ```bash
   node scripts/submit-indexnow.js
   ```
   A resposta esperada é `Status Code: 200` (ou `202`). Enviar antes do deploy faz os buscadores encontrarem 404.

### 3. Google Search Console — depois do deploy
O Google **não** usa o IndexNow. Para cada URL nova:
1. Abra `https://search.google.com/search-console/inspect?resource_id=sc-domain%3Adevthru.com&id=<URL codificada>`.
2. Clique em **Solicitar indexação** e aguarde a confirmação.
3. Limite de cerca de 10 solicitações por dia por propriedade: priorize ferramentas, depois posts e guias.

### 4. Conferências finais
* A URL aparece em `https://www.devthru.com/sitemap.xml` (ferramentas entram via `lib/tools-list.tsx`, posts via `lib/content/blog`).
* Ferramentas novas também em `public/llms.txt`.
* Informe ao usuário quais URLs foram enviadas ao IndexNow e quais tiveram indexação solicitada no Search Console.

---

## 🔁 Ordem resumida

| Momento | O quê |
|---|---|
| No PR da página | Entrada em `/updates` + versão no `package.json`, URL no `submit-indexnow.js`, `llms.txt` (ferramentas) |
| Após merge na `master` e deploy | Conferir 200 → `node scripts/submit-indexnow.js` → Solicitar indexação no Search Console |
