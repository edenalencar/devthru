# Fluxo de Registro e Publicação

Esta seção descreve as etapas práticas para registrar e publicar um novo post de blog no DevThru.

---

## 🚀 Passo a Passo para Publicação

### 1. Criar o Arquivo do Post
Crie um novo arquivo TypeScript no diretório de posts do blog:
`lib/content/blog/posts/nome-do-post.ts`

Defina e exporte o objeto do seu post usando o tipo `BlogPost` conforme os padrões descritos em [Padrões e Formatação](file:///.agent/skills/write-blog-post/formatting.md).

### 2. Registrar no Arquivo de Índice
Abra o arquivo [index.ts](file:///c:/Users/edena/Projetos/devhubtools/lib/content/blog/index.ts):

1. Importe a constante exportada do seu post:
   ```typescript
   import { postMinhaNovaFerramenta } from './posts/nome-do-post'
   ```
2. Adicione a constante importada no topo do array `blogPosts`:
   ```typescript
   export const blogPosts: BlogPost[] = [
       postMinhaNovaFerramenta, // Adicione no topo para que apareça como o primeiro post (mais recente)
       postComoTestarFluxosNfeCteMdfe,
       ...
   ]
   ```

### 3. Validação Local (TypeScript & Build)
Antes de homologar as alterações, garanta que não há erros de tipagem TypeScript ou problemas na compilação do Next.js.
Proponha a execução do comando de build na raiz do projeto:
```powershell
npm run build
```

A compilação deve passar com sucesso (`✓ Compiled successfully`). Caso apareça algum aviso de inferência de pasta do Next.js ou erro de linter, resolva-os antes de finalizar a tarefa.

### 4. Teste em Modo de Desenvolvimento
Suba o servidor de desenvolvimento para homologar visualmente o layout, a formatação e o direcionamento dos links dos botões e do texto:
```powershell
npm run dev
```

Acesse o endereço local correspondente (geralmente `http://localhost:3001` ou `http://localhost:3000`) na subrota `/blog/[seu-slug]` e verifique se tudo é renderizado sem problemas de layout ou CSS.
