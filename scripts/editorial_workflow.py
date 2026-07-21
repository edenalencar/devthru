import os
import json
import sys
import random
import urllib.request
from datetime import datetime

# Assegura suporte a UTF-8 para logs no Windows Task Scheduler
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Catálogo expandido de pautas associadas às ferramentas do DevThru
DEVTHRU_PAUTAS_POOL = [
    {
        "slug": "guia-de-expressoes-cron-no-linux",
        "tool_name": "Gerador e Decodificador de Crontab",
        "tool_url": "https://www.devthru.com/tools/development/crontab-generator",
        "keywords": ["cron", "linux", "devops", "automation", "server", "docker", "bash"],
        "pauta_title": "Como Configurar Cron Jobs no Linux: Guia Prático com Exemplo Real",
        "target_keyword": "gerador de crontab, expressao cron linux",
        "meta_title": "Como Configurar Cron Jobs no Linux: Guia Prático",
        "meta_desc": "Entenda de uma vez por todas a sintaxe do crontab no Linux. Aprenda a ler e validar expressões cron com exemplos reais.",
        "focus": "Explicar a sintaxe dos 5 campos do crontab, casos de uso em automação de servidores e como evitar erros clássicos em cron jobs.",
    },
    {
        "slug": "jwt-na-pratica-estrutura-seguranca-e-decodificacao",
        "tool_name": "Debugger & Inspector de JWT",
        "tool_url": "https://www.devthru.com/tools/development/jwt-debugger",
        "keywords": ["jwt", "security", "auth", "node", "api", "backend", "webdev"],
        "pauta_title": "JWT (JSON Web Tokens) na Prática: Estrutura, Segurança e Decodificação",
        "target_keyword": "decodificar jwt, como funciona jwt",
        "meta_title": "O que é JWT e Como Funciona a Autenticação por Token?",
        "meta_desc": "Entenda a estrutura de um JSON Web Token (JWT). Aprenda como decodificar payloads de forma segura e implementar boas práticas de segurança.",
        "focus": "Como funciona o Header, Payload e Signature do JWT, além das diferenças entre autenticação Stateful vs Stateless.",
    },
    {
        "slug": "px-vs-rem-como-e-por-que-adotar-unidades-relativas-no-css",
        "tool_name": "Conversor de Pixel para REM",
        "tool_url": "https://www.devthru.com/tools/converters/pixel-to-rem",
        "keywords": ["css", "frontend", "webdev", "ui", "design", "react", "vue"],
        "pauta_title": "Por que você deve parar de usar margens fixas em Pixel: Migrando para REM",
        "target_keyword": "converter px para rem, pixel para rem",
        "meta_title": "PX vs REM: Por que Usar Unidades Relativas no CSS?",
        "meta_desc": "Aprenda a diferença entre px, rem e em no CSS. Descubra como criar layouts responsivos e acessíveis convertendo pixels para rem facilmente.",
        "focus": "Acessibilidade para leitores de tela, zoom do navegador e boas práticas de design responsivo no CSS moderno e Tailwind.",
    },
    {
        "slug": "entendendo-base64-quando-usar-para-imagens-e-dados",
        "tool_name": "Conversor de Base (Base64, Hex, Binário)",
        "tool_url": "https://www.devthru.com/tools/converters/base",
        "keywords": ["base64", "webdev", "api", "data", "images", "performance", "crypto"],
        "pauta_title": "Entendendo Base64 e Hexadecimal: Quando vale a pena converter Dados?",
        "target_keyword": "converter base64, base64 para string",
        "meta_title": "Como Funciona a Codificação Base64 e Quando Utilizar?",
        "meta_desc": "Entenda o que é Base64, como converter strings e dados, e descubra os prós e contras de embutir mídia diretamente no seu código.",
        "focus": "O overhead de 33% na conversão de dados para Base64, casos em que compensa para Data URLs em CSS/HTML e segurança na transferência.",
    },
    {
        "slug": "dados-teste-lgpd",
        "tool_name": "Gerador de Perfil Completo (Pessoa Sintética)",
        "tool_url": "https://www.devthru.com/tools/personal/person-generator",
        "keywords": ["testing", "qa", "backend", "database", "python", "javascript", "dev"],
        "pauta_title": "Como Automatizar Testes de Software com Dados Sintéticos Válidos (LGPD Compliant)",
        "target_keyword": "gerador de pessoa sintetica, dados para testes qa",
        "meta_title": "Gerando Dados de Teste Válidos para QA e Automação",
        "meta_desc": "Aprenda a popular seus testes de software com perfis completos de teste sem expor dados reais de usuários ou violar a LGPD.",
        "focus": "Importância de utilizar geradores de dados matematicamente válidos em rotinas de teste e staging sem usar dados reais.",
    },
    {
        "slug": "como-formatar-e-validar-grandes-arquivos-json-sem-travamentos",
        "tool_name": "Formatador e Minificador de Código / JSON",
        "tool_url": "https://www.devthru.com/tools/development/minifier",
        "keywords": ["json", "api", "debug", "javascript", "typescript", "backend", "performance"],
        "pauta_title": "Como Validar e Minificar Payloads de Código sem Travamentos no Navegador",
        "target_keyword": "minificar codigo online, formatador json",
        "meta_title": "Como Validar e Minificar Códigos de Forma Rápida",
        "meta_desc": "Precisa ler ou otimizar arquivos grandes de código? Aprenda a formatar e minificar payloads de forma rápida e segura.",
        "focus": "Boas práticas ao consumir APIs REST/GraphQL, depuração de erros sintáticos e minificação para produção.",
    },
    {
        "slug": "guia-de-regex-para-desenvolvedores",
        "tool_name": "Testador e Validador de Regex",
        "tool_url": "https://www.devthru.com/tools/development/regex",
        "keywords": ["regex", "python", "javascript", "backend", "ai", "llm"],
        "pauta_title": "Dominando Regex no Desenvolvimento: Do Zero à Validação de Formatos Complexos",
        "target_keyword": "testar regex online, validador regex",
        "meta_title": "Guia de Expressões Regulares no Desenvolvimento",
        "meta_desc": "Aprenda a construir e testar expressões regulares (Regex) de alta performance para validação de dados e parse de strings.",
        "focus": "Como funcionam quantificadores, grupos de captura e como testar padrões Regex em tempo real sem travar a thread principal.",
    },
    {
        "slug": "otimizacao-queries-sql-indentacao-performance",
        "tool_name": "Formatador de SQL Queries",
        "tool_url": "https://www.devthru.com/tools/development/sql-formatter",
        "keywords": ["sql", "database", "postgres", "mysql", "backend"],
        "pauta_title": "Boas Práticas de Leitura e Otimização de SQL Queries Complexas",
        "target_keyword": "formatar sql online, validador sql query",
        "meta_title": "Como Formatar e Indentar Consultas SQL Facilmente",
        "meta_desc": "Aprenda a indentar e organizar consultas SQL complexas para melhorar a legibilidade e facilitar a identificação de gargalos de banco de dados.",
        "focus": "Como a boa formatação de cláusulas JOIN, subselects e CTEs ajuda a identificar problemas de performance em bancos relacionais.",
    },
    {
        "slug": "inscricao-estadual-guia",
        "tool_name": "Gerador de Inscrição Estadual",
        "tool_url": "https://www.devthru.com/tools/documents/inscricao-estadual",
        "keywords": ["nfe", "fiscal", "backend", "business", "testing"],
        "pauta_title": "Como Validar Inscrição Estadual por Estado em Sistemas de NF-e",
        "target_keyword": "gerador de inscricao estadual, validar ie nfe",
        "meta_title": "Validação de Inscrição Estadual para Desenvolvedores",
        "meta_desc": "Entenda as regras de validação de Inscrição Estadual (IE) por UF e como testar seu sistema de emissão de NF-e com dados válidos.",
        "focus": "Diferenças nos dígitos verificadores da IE de cada estado brasileiro e como evitar rejeição em APIs da SEFAZ.",
    },
    {
        "slug": "comparar-diferencas-texto-diff-checker",
        "tool_name": "Comparador de Diferenças de Texto (Diff Checker)",
        "tool_url": "https://www.devthru.com/tools/text/diff-checker",
        "keywords": ["diff", "git", "text", "code", "productivity", "debug"],
        "pauta_title": "Como Comparar Arquivos e Identificar Alterações de Código sem Instalar Git",
        "target_keyword": "comparar textos online, diff checker",
        "meta_title": "Como Comparar Diferenças entre Códigos e Textos",
        "meta_desc": "Identifique rapidamente alterações entre dois blocos de código ou texto com um comparador visual de diff online gratuito.",
        "focus": "Como inspecionar divergências entre payloads JSON, variáveis de ambiente ou trechos de código em instantes.",
    },
    {
        "slug": "entropia-e-seguranca-de-senhas",
        "tool_name": "Gerador de Senhas Seguras",
        "tool_url": "https://www.devthru.com/tools/utilities/password-generator",
        "keywords": ["security", "password", "crypto", "auth", "devops"],
        "pauta_title": "Entropia e Segurança de Senhas: Como Gerar Chaves Fortes no Desenvolvimento",
        "target_keyword": "gerador de senhas seguras, entropia de senha",
        "meta_title": "Como Gerar Senhas e Chaves de API Seguras",
        "meta_desc": "Entenda o conceito de entropia em senhas e aprenda a gerar chaves aleatórias e seguras para suas aplicações e ambientes de staging.",
        "focus": "Diferença entre caracteres aleatórios, frases secretas (passphrases) e como evitar chaves fracas em conexões com bancos e APIs.",
    },
    {
        "slug": "algoritmo-luhn-validacao-cartao-credito",
        "tool_name": "Gerador de Cartão de Crédito para Testes",
        "tool_url": "https://www.devthru.com/tools/finance/credit-card-generator",
        "keywords": ["stripe", "payment", "finance", "testing", "qa", "ecommerce"],
        "pauta_title": "Como Testar Integrações de Checkout (Stripe/PagSeguro) sem Usar Cartões Reais",
        "target_keyword": "gerador de cartao de credito teste, cartao sandbox stripe",
        "meta_title": "Testando Checkouts com Cartões de Crédito Fictícios Válidos",
        "meta_desc": "Aprenda a testar o fluxo de pagamento do seu e-commerce ou SaaS gerando números de cartão de teste válidos no algoritmo de Luhn.",
        "focus": "Como funciona o Algoritmo de Luhn para validação de números de cartão e boas práticas de sandbox em gateway de pagamento.",
    },
    # --- PAUTAS NOVAS INÉDITAS ---
    {
        "slug": "validacao-cnh-codigo-seguranca",
        "tool_name": "Gerador e Validador de CNH",
        "tool_url": "https://www.devthru.com/tools/documents/cnh",
        "keywords": ["cnh", "documents", "validation", "backend", "python"],
        "pauta_title": "Como Funciona o Algoritmo de Validação do Código de Segurança da CNH",
        "target_keyword": "gerador de cnh valida, validar cnh online",
        "meta_title": "Como Validar CNH em Aplicações Web e APIs",
        "meta_desc": "Aprenda os conceitos por trás dos dígitos verificadores da Carteira Nacional de Habilitação (CNH) e como validar documentos em staging.",
        "focus": "Estrutura de 11 dígitos da CNH, rotina de cálculo dos dígitos verificadores e casos de teste automatizados.",
    },
    {
        "slug": "gerador-de-certificados-pdf-dinamico-node",
        "tool_name": "Gerador de Certificados PDF",
        "tool_url": "https://www.devthru.com/tools/documents/certificate-generator",
        "keywords": ["pdf", "javascript", "node", "webdev", "automation"],
        "pauta_title": "Como Gerar Certificados e Diplomas em PDF Dinamicamente no Node.js/Next.js",
        "target_keyword": "gerar certificado pdf online, gerador de certificado nodejs",
        "meta_title": "Gerando Certificados em PDF com HTML e CSS",
        "meta_desc": "Guia prático para emitir certificados personalizados em PDF via backend sem depender de ferramentas pagas.",
        "focus": "Uso de canvas HTML5, renderização estática em PDF e inclusão de QR Code de autenticidade no documento.",
    },
    {
        "slug": "geracao-de-codigo-de-barras-ean13-code128",
        "tool_name": "Gerador de Código de Barras",
        "tool_url": "https://www.devthru.com/tools/business/barcode-generator",
        "keywords": ["barcode", "ean13", "retail", "business", "javascript"],
        "pauta_title": "EAN-13 vs Code 128: Diferenças e Como Gerar Códigos de Barra via Código",
        "target_keyword": "gerador de codigo de barras ean13, barcode generator javascript",
        "meta_title": "Guia de Códigos de Barra EAN-13 e Code 128",
        "meta_desc": "Entenda as diferenças entre padrões de código de barra para varejo e logística e como renderizar imagens de barcode no frontend.",
        "focus": "Algoritmo de cálculo do dígito verificador EAN-13 e renderização via SVG/Canvas.",
    },
    {
        "slug": "correcao-de-erros-reed-solomon-qr-code",
        "tool_name": "Gerador de QR Code",
        "tool_url": "https://www.devthru.com/tools/business/qr-code",
        "keywords": ["qrcode", "webdev", "mobile", "frontend", "design"],
        "pauta_title": "Como Funciona a Correção de Erros Reed-Solomon em QR Codes",
        "target_keyword": "gerador de qr code online, como funciona qr code",
        "meta_title": "A Ciência por Trás dos QR Codes e Correção de Erros",
        "meta_desc": "Descubra como os QR Codes continuam legíveis mesmo quando danificados ou com logotipo customizado no centro.",
        "focus": "Níveis de correção de erro L, M, Q, H do QR Code e dicas para embutir logos sem inviabilizar a leitura por smartphones.",
    },
    {
        "slug": "geracao-de-slugs-seo-friendly-nodejs",
        "tool_name": "Gerador de Slugs SEO",
        "tool_url": "https://www.devthru.com/tools/text/slug-generator",
        "keywords": ["seo", "slug", "nodejs", "cms", "blog", "webdev"],
        "pauta_title": "Como Criar Slugs SEO-Friendly em Node.js com Remoção de Acentos e Caracteres Especiais",
        "target_keyword": "gerador de slug online, criar slug seo",
        "meta_title": "Como Criar Slugs Amigáveis para SEO no Node.js",
        "meta_desc": "Aprenda a sanitizar títulos em português, remover acentuação e caracteres especiais para gerar URLs limpas e otimizadas no Google.",
        "focus": "Tratamento de unicode no JavaScript, remoção de stopwords e impacto dos slugs na arquitetura de URLs do seu site.",
    },
    {
        "slug": "assinar-emails-html-responsivo-sem-quebrar",
        "tool_name": "Gerador de Assinatura de E-mail HTML",
        "tool_url": "https://www.devthru.com/tools/text/email-signature",
        "keywords": ["html", "css", "email", "design", "frontend"],
        "pauta_title": "Como Criar Assinaturas de E-mail em HTML Responsivas sem Quebrar no Outlook",
        "target_keyword": "gerador de assinatura de email html, assinatura email responsiva",
        "meta_title": "Como Criar Assinaturas de E-mail em HTML Limpo",
        "meta_desc": "Descubra as regras de ouro do HTML para e-mails: uso de tabelas, CSS inline e hospedagem de imagens para evitar quebras no Outlook e Gmail.",
        "focus": "Restrições de renderização dos clientes de e-mail tradicionais, CSS inlining e hospedagem de mídias leves.",
    },
    {
        "slug": "conversao-de-casos-camelcase-kebab-snake-pascal",
        "tool_name": "Conversor de Case (camelCase, snake_case)",
        "tool_url": "https://www.devthru.com/tools/text/case-converter",
        "keywords": ["clean-code", "javascript", "python", "productivity", "text"],
        "pauta_title": "camelCase, snake_case, kebab-case e PascalCase: Quando Usar Cada Convenção",
        "target_keyword": "converter camelcase para snake_case, conversoes de texto dev",
        "meta_title": "Guia de Convenções de Nomenclatura no Código",
        "meta_desc": "Entenda as principais convenções de nomes de variáveis, arquivos e rotas de API em JavaScript, Python, C# e Rust.",
        "focus": "Padrões de mercado por linguagem de programação e como automatizar a transformação de chaves de JSON para APIs.",
    },
    # --- PAUTAS COM FOCO EXCLUSIVO NO CONTEXTO E NORMAS DO BRASIL ---
    {
        "slug": "estrutura-payload-pix-copia-e-cola-emv",
        "tool_name": "Gerador e Decodificador de Pix (QR Code)",
        "tool_url": "https://www.devthru.com/tools/finance/pix-qr-code",
        "keywords": ["pix", "banco", "pagamento", "bacen", "qr", "emv", "brasil"],
        "pauta_title": "Como Funciona a Estrutura EMV do Pix Copia e Cola (BR Code) e Validação de Payload",
        "target_keyword": "decodificar pix copia e cola, payload pix emv",
        "meta_title": "Entendendo o Payload EMV do Pix Copia e Cola",
        "meta_desc": "Descubra como funciona o padrão BR Code do Banco Central para o Pix Copia e Cola e como decodificar payloads Pix em aplicações.",
        "focus": "Especificação EMV QRCPS do Banco Central, parsing de TLVs (Tag-Length-Value) e validação de CRC16 no Pix.",
    },
    {
        "slug": "algoritmo-modulo11-validacao-pis-pasep",
        "tool_name": "Gerador e Validador de PIS/PASEP",
        "tool_url": "https://www.devthru.com/tools/documents/pis",
        "keywords": ["pis", "pasep", "nit", "trabalhista", "lgpd", "brasil", "backend"],
        "pauta_title": "Como Funciona o Cálculo Módulo 11 para Validação de PIS/PASEP e NIT",
        "target_keyword": "gerador de pis valido, validar pis pasep",
        "meta_title": "Validação de PIS/PASEP: Algoritmo Módulo 11",
        "meta_desc": "Entenda a matemática por trás da validação do PIS/PASEP no Brasil e como implementar rotinas de checagem em sistemas de RH e folha.",
        "focus": "Pesos do Módulo 11 no PIS (3, 2, 9, 8, 7, 6, 5, 4, 3, 2) e testes com dados sintéticos em rotinas trabalhistas.",
    },
    {
        "slug": "validacao-titulo-eleitor-zona-secao",
        "tool_name": "Gerador e Validador de Título de Eleitor",
        "tool_url": "https://www.devthru.com/tools/documents/titulo-eleitor",
        "keywords": ["eleitor", "tse", "documents", "validation", "brasil"],
        "pauta_title": "Entendendo os Dígitos Verificadores do Título de Eleitor por Estado e Zona Eleitoral",
        "target_keyword": "gerador de titulo de eleitor, validar titulo eleitoral",
        "meta_title": "Como Validar Título de Eleitor via Algoritmo",
        "meta_desc": "Descubra o significado dos 12 dígitos do Título de Eleitor brasileiro, a identificação do estado de origem e a regra de cálculo do DV.",
        "focus": "Códigos de UF do TSE (01 a 28), cálculo dos dois dígitos verificadores e casos de teste em validação cadastral.",
    },
    {
        "tool_name": "Gerador de NF-e e Documentos Fiscais",
        "tool_url": "https://www.devthru.com/tools/business/nfe-generator",
        "slug": "homologacao-nfe-cte-mdfe-sefaz-testes",
        "keywords": ["nfe", "sefaz", "fiscal", "xml", "backend", "brasil"],
        "pauta_title": "Como Testar Fluxos de Emissão de NF-e, CT-e e MDF-e em Ambientes de Homologação da SEFAZ",
        "target_keyword": "gerador de nfe de teste, testar nfe homologacao sefaz",
        "meta_title": "Testando Emissão de NF-e em Staging e Homologação",
        "meta_desc": "Guia de homologação para sistemas fiscais: como estruturar XMLs de teste, gerar chaves de acesso válidas e evitar rejeições da SEFAZ.",
        "focus": "Estrutura da Chave de Acesso de 44 dígitos da NF-e, código de UF, lote de envio e ambiente de homologação sem valor fiscal.",
    }
]

def get_published_slugs(project_root):
    """
    Escaneia a pasta de posts do blog (lib/content/blog/posts) para mapear
    todos os slugs de artigos que JÁ foram publicados no site.
    """
    posts_dir = os.path.join(project_root, "lib", "content", "blog", "posts")
    published = set()
    
    if os.path.exists(posts_dir):
        for fname in os.listdir(posts_dir):
            if fname.endswith(".ts"):
                slug = fname[:-3]  # remove extensao .ts
                published.add(slug.lower())
                
    return published

def fetch_tabnews_topics():
    print("Buscando discussões e tendências BR no TabNews...")
    url = "https://www.tabnews.com.br/api/v1/contents?page=1&per_page=12&strategy=relevant"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                if isinstance(data, list) and len(data) > 0:
                    results = []
                    for item in data[:10]:
                        username = item.get('owner_username', 'autor')
                        slug = item.get('slug', '')
                        results.append({
                            "title": item.get('title', ''),
                            "url": f"https://www.tabnews.com.br/{username}/{slug}",
                            "tabcoins": item.get('tabcoins', 0),
                            "comments": item.get('children_deep_count', 0)
                        })
                    return results
    except Exception as e:
        print(f"Erro ao buscar tendências do TabNews: {e}")
    
    return [
        {"title": "Boas práticas de arquitetura de software no Brasil", "url": "https://www.tabnews.com.br", "tabcoins": 15, "comments": 8},
        {"title": "Como lidamos com LGPD e dados sensíveis em aplicações web", "url": "https://www.tabnews.com.br", "tabcoins": 12, "comments": 5}
    ]

def fetch_devto_topics():
    print("Buscando tópicos em alta na Web Global (Dev.to)...")
    url = "https://dev.to/api/articles?state=rising&per_page=12"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                if isinstance(data, list) and len(data) > 0:
                    return data
    except Exception as e:
        print(f"Erro ao buscar tendências do Dev.to: {e}")
    
    return [
        {"title": "Optimizing React Performance in 2026", "tag_list": ["react", "webdev"], "url": "https://dev.to"},
        {"title": "Mastering CSS Grid and Flexbox layouts", "tag_list": ["css", "frontend"], "url": "https://dev.to"},
        {"title": "Understanding JWT and Authentication Best Practices", "tag_list": ["security", "node"], "url": "https://dev.to"}
    ]

def select_dynamic_pautas(tabnews_articles, devto_articles, published_slugs):
    trending_keywords = set()
    
    # Extrai palavras-chave do TabNews (BR)
    for art in tabnews_articles:
        words = art['title'].lower().replace(":", " ").replace("-", " ").split()
        for w in words:
            if len(w) > 3:
                trending_keywords.add(w)
                
    # Extrai palavras-chave/tags do Dev.to (Global)
    for art in devto_articles:
        tags = art.get('tag_list', art.get('tags', []))
        for t in tags:
            trending_keywords.add(t.lower())
            
    # Filtra APENAS pautas ainda NÃO PUBLICADAS
    available_pautas = []
    for pauta in DEVTHRU_PAUTAS_POOL:
        p_slug = pauta["slug"].lower()
        if p_slug in published_slugs:
            print(f"  [Ignorado] Post já publicado anteriormente: {p_slug}")
            continue
        available_pautas.append(pauta)
        
    scored_pautas = []
    for pauta in available_pautas:
        score = 0
        for kw in pauta["keywords"]:
            if kw.lower() in trending_keywords:
                score += 2
        scored_pautas.append((score, pauta))
        
    today_seed = int(datetime.now().strftime("%Y%m%d"))
    rng = random.Random(today_seed)
    
    rng.shuffle(scored_pautas)
    scored_pautas.sort(key=lambda x: x[0], reverse=True)
    
    selected = [p[1] for p in scored_pautas[:8]]
    return selected

def generate_editorial_calendar(tabnews_articles, devto_articles, selected_pautas):
    today_str = datetime.now().strftime("%d/%m/%Y")
    
    markdown_content = f"""# Calendário Editorial Sugerido - {today_str}

Este arquivo foi gerado automaticamente pelo fluxo editorial diário do DevThru.

## 🇧🇷 Tendências na Comunidade BR (TabNews)
Abaixo estão os assuntos mais debatidos pela comunidade brasileira nas últimas 24 horas:

"""
    for art in tabnews_articles[:8]:
        title = art.get('title', '')
        url = art.get('url', '#')
        tabcoins = art.get('tabcoins', 0)
        comments = art.get('comments', 0)
        markdown_content += f"- **[{title}]({url})** ({tabcoins} tabcoins • {comments} comentários)\n"

    markdown_content += f"""
---

## 🌐 Tendências na Web Global (Dev.to)
Abaixo estão os tópicos quentes no ecossistema global de tecnologia:

"""
    for art in devto_articles[:8]:
        title = art.get('title', '')
        tags = ", ".join(art.get('tag_list', art.get('tags', [])))
        url = art.get('url', '#')
        markdown_content += f"- **[{title}]({url})** (Tags: `{tags}`)\n"
    
    markdown_content += f"""
---

## 📅 Sugestão de 8 Pautas Inéditas Priorizadas (DevThru - {today_str})

Abaixo estão 8 sugestões de artigos INÉDITOS (filtrados contra posts já existentes no blog), combinando os contextos do mercado brasileiro com a web global:

"""
    for i, pauta in enumerate(selected_pautas, 1):
        markdown_content += f"""### {i}. {pauta['pauta_title']}
* **Foco da Pauta:** {pauta['focus']}
* **Palavra-chave Alvo:** `{pauta['target_keyword']}`
* **SEO Meta:**
  * **Title:** {pauta['meta_title']}
  * **Description:** {pauta['meta_desc']}
* **CTA DevThru:** Direcionar o leitor para a ferramenta [{pauta['tool_name']}]({pauta['tool_url']}).

"""

    return markdown_content

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    target_dir = os.path.join(project_root, "docs", "editorial")
    
    os.makedirs(target_dir, exist_ok=True)
    
    # 1. Carrega posts já publicados
    published_slugs = get_published_slugs(project_root)
    print(f"Posts já publicados detectados no blog: {len(published_slugs)}")
    
    # 2. Busca tendências (BR + Global)
    tabnews = fetch_tabnews_topics()
    devto = fetch_devto_topics()
    
    # 3. Seleciona pautas inéditas baseadas no cruzamento de dados
    selected_pautas = select_dynamic_pautas(tabnews, devto, published_slugs)
    
    # 4. Gera o documento markdown
    content = generate_editorial_calendar(tabnews, devto, selected_pautas)
    
    dest_path = os.path.join(target_dir, "calendario_RASCUNHO.md")
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Calendário editorial gerado e salvo com sucesso em: {dest_path}")

if __name__ == "__main__":
    main()

