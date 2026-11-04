# Plano de crescimento orgânico — novembro/2026

Fontes cruzadas em 04/11/2026: Ubersuggest (concorrência), Google Search Console (últimos 3 meses),
Google Analytics 4 (últimos 28 dias) e Planejador de Palavras-chave do Google Ads (Brasil).

## Diagnóstico

| Fonte | Número | Leitura |
|---|---|---|
| Search Console | 2,85 mil cliques, 116 mil impressões, CTR 2,5%, posição média 9,7 (3 meses) | Já aparecemos bastante; o gargalo é CTR e posições 6–15 |
| Analytics | 581 sessões em 28 dias, 72% orgânico, engajamento médio de 14 s | GA registra ~45% dos cliques do GSC (consentimento de cookies/adblock) — usar o GSC como fonte de verdade para SEO |
| Ubersuggest | devthru 249 visitas/mês estimadas, DA 7, 126 domínios de referência; 4devs 898 mil, DA 44, 1.615 domínios | 4devs caiu 68% em 12 meses (2,8 mi → 0,9 mi) |
| geradordecpf.com.br | 3 palavras-chave, tráfego 0 | Não é concorrente; trocar no Ubersuggest |

### Search Console por grupo de consulta

| Grupo | Impressões | Cliques | Posição | Observação |
|---|---|---|---|---|
| Telefone/celular | 45,9 mil | 875 | 6,6 | Carro-chefe; CTR de 1,9% na página é baixo para a posição |
| Placa | 7,5 mil | 375 | 6,7 | "placa mercosul" na posição 1–2 com CTR de 50%+ |
| Cartão de crédito | 7,4 mil | 225 | 14,2 | Página 2 do Google |
| Chassi | 4,0 mil | 76 | 4,5 | |
| Pessoa | 3,8 mil | 10 | 11,5 | Quase sem cliques |
| PIS/NIS | 3,4 mil | 2 | 9,9 | CTR de 0,1% |
| CPF | 1,9 mil | 42 | 20,8 | Maior mercado (100 mil–1 mi buscas/mês) e estamos na página 3 |
| CNPJ, FIPE, CNAE, boleto | < 700 cada | ~0 | 30–57 | Fora do alcance hoje |

### Demanda (Planejador do Google Ads, buscas/mês no Brasil)

| Palavra-chave | Volume | Situação no devthru |
|---|---|---|
| letras diferentes | 1 mi – 10 mi | **Criada** (`/tools/text/fancy-letters`) |
| gerador de cpf | 100 mil – 1 mi | Existe, posição ~21 |
| regra de 3 | 100 mil – 1 mi | **Criada** (`/tools/utilities/rule-of-three`) |
| contador de caracteres | 100 mil – 1 mi | Existe, 0 impressões — conteúdo reforçado |
| calculadora de porcentagem | 10 mil – 100 mil | **Criada** (`/tools/utilities/percentage-calculator`) |
| número por extenso | 10 mil – 100 mil | **Criada** (`/tools/converters/number-to-words`) |
| número aleatório | 10 mil – 100 mil | **Criada** (`/tools/utilities/random-number`) |
| gerador de senha | 10 mil – 100 mil | Existe, 0 impressões — título corrigido |
| gerador de cnpj / pessoas / cartão / cep / nicks | 10 mil – 100 mil | CEP e nicks ainda não existem |
| gerador de telefone, pis, rg, letra maiúscula, validador de cpf | 1 mil – 10 mil | Existem |

## Feito neste ciclo

1. **Títulos e descrições** reescritos com a consulta principal no início e ≤ 60 caracteres (com " | DevThru"):
   CPF, telefone, pessoa, PIS, RG, contador de caracteres, gerador de senha, maiúsculas/minúsculas.
2. **H1** alinhados com a busca: "Gerador de CPF Válido", "Contador de Caracteres Online",
   "Gerador de Senha Forte", "Converter Maiúsculas e Minúsculas".
3. **FAQ (schema FAQPage)** ampliado: contador de caracteres (1 → 5), senha (2 → 5), maiúsculas/minúsculas (1 → 4);
   contador ganhou tabela de limites (X, Instagram, title, meta description, SMS).
4. **5 ferramentas novas** com FAQ, schema, links relacionados e entrada no sitemap.
5. **Testes**: `__tests__/everyday-tools.test.ts` (lógica) e `__tests__/seo-top-pages.test.ts` cobrindo 13 páginas.
6. **Cores do tema**: `@config "../tailwind.config.ts"` em `app/globals.css` — o Tailwind v4 nunca tinha lido as cores
   (`bg-primary`, `text-muted-foreground`...), nem em produção. Ajustes de layout no celular (breadcrumb, página de nomes)
   e nos blocos de código do blog.
7. **Registro**: changelog v1.50.0 em `/updates`, specs em `docs/specs/`, `public/llms.txt` e `scripts/submit-indexnow.js`
   (96 URLs, agora com todas as 76 ferramentas).

## Próximos passos (em ordem)

1. **Deploy e indexação**: após publicar, pedir indexação no GSC (Inspecionar URL) das 5 páginas novas e das 8 alteradas.
2. **Medir em 3–4 semanas** no GSC: CTR de telefone, pessoa e PIS; impressões de contador de caracteres e senha;
   posição do CPF. Reverter títulos que piorarem o CTR.
3. **Gerador de CEP** (10 mil – 100 mil): precisa de base real de CEPs por faixa/UF — avaliar fonte de dados.
4. **Gerador de nicks** (10 mil – 100 mil): combina com "letras diferentes"; precisa de listas de palavras curadas.
5. **CPF (backlinks)**: o conteúdo já é bom; o 4devs tem 191 domínios apontando só para essa página.
   Divulgar os guias de validação de CPF (Python/JS) em comunidades dev, READMEs e respostas técnicas.
6. **Analytics**: avaliar Consent Mode v2 com modelagem para reduzir a diferença GA × GSC.
7. **Links internos**: linkar as ferramentas novas a partir da home e das páginas com mais tráfego (telefone, placa).
