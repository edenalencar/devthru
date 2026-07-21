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
        "tool_name": "Gerador de Crontab",
        "tool_url": "https://www.devthru.com/tools/development/crontab-generator",
        "keywords": ["cron", "linux", "devops", "automation", "server", "docker", "bash"],
        "pauta_title": "Como Configurar Cron Jobs no Linux: Guia Prático com Exemplo Real",
        "target_keyword": "gerador de crontab, expressao cron linux",
        "meta_title": "Como Configurar Cron Jobs no Linux: Guia Prático",
        "meta_desc": "Entenda de uma vez por todas a sintaxe do crontab no Linux. Aprenda a ler e validar expressões cron com exemplos reais.",
        "focus": "Explicar a sintaxe dos 5 campos do crontab, casos de uso em automação de servidores e como evitar erros clássicos em cron jobs.",
    },
    {
        "tool_name": "Decodificador de JWT",
        "tool_url": "https://www.devthru.com/tools/development/jwt-decoder",
        "keywords": ["jwt", "security", "auth", "node", "api", "backend", "webdev"],
        "pauta_title": "JWT (JSON Web Tokens) na Prática: Estrutura, Segurança e Decodificação",
        "target_keyword": "decodificar jwt, como funciona jwt",
        "meta_title": "O que é JWT e Como Funciona a Autenticação por Token?",
        "meta_desc": "Entenda a estrutura de um JSON Web Token (JWT). Aprenda como decodificar payloads de forma segura e implementar boas práticas de segurança.",
        "focus": "Como funciona o Header, Payload e Signature do JWT, além das diferenças entre autenticação Stateful vs Stateless.",
    },
    {
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
        "tool_name": "Gerador de Hash MD5/SHA-256",
        "tool_url": "https://www.devthru.com/tools/security/hash-generator",
        "keywords": ["security", "crypto", "hash", "python", "backend", "cybersecurity"],
        "pauta_title": "Diferença Prática entre Criptografia, Algoritmos de Hash e Codificação",
        "target_keyword": "gerador de hash md5, diferenca hash e criptografia",
        "meta_title": "Criptografia vs Hash vs Codificação: Qual a Diferença?",
        "meta_desc": "Aprenda a diferença conceitual e prática entre criptografia, algoritmos de hash (como MD5/SHA) e codificações de dados no desenvolvimento.",
        "focus": "Quando utilizar hash unidirecional (senhas/checksums) vs criptografia assimétrica e por que MD5 não deve ser usado para senhas.",
    },
    {
        "tool_name": "Conversor de Base64",
        "tool_url": "https://www.devthru.com/tools/converters/base64",
        "keywords": ["base64", "webdev", "api", "data", "images", "performance"],
        "pauta_title": "Entendendo Base64: Quando vale a pena converter Imagens e Dados?",
        "target_keyword": "converter base64, imagem para base64",
        "meta_title": "Como Funciona a Codificação Base64 e Quando Utilizar?",
        "meta_desc": "Entenda o que é Base64, como converter strings e imagens, e descubra os prós e contras de embutir mídia diretamente no seu código.",
        "focus": "O overhead de 33% na conversão de dados para Base64, casos em que compensa para Data URLs em CSS/HTML e segurança na transferência.",
    },
    {
        "tool_name": "Gerador de Dados Pessoais (CPF/CNPJ)",
        "tool_url": "https://www.devthru.com/tools/documents/cpf",
        "keywords": ["testing", "qa", "backend", "database", "python", "javascript", "dev"],
        "pauta_title": "Como Automatizar Testes de Software com Dados Sintéticos Válidos (LGPD Compliant)",
        "target_keyword": "gerador de cpf valido testes, dados sinteticos qa",
        "meta_title": "Gerando Dados de Teste Válidos para QA e Automação",
        "meta_desc": "Aprenda a popular seus testes de software com CPFs e CNPJs válidos sem expor dados reais de usuários ou violar a LGPD.",
        "focus": "Importância de utilizar geradores de dados matematicamente válidos em rotinas de teste e staging sem usar dados reais.",
    },
    {
        "tool_name": "Formatador e Validador de JSON",
        "tool_url": "https://www.devthru.com/tools/development/json-formatter",
        "keywords": ["json", "api", "debug", "javascript", "typescript", "backend"],
        "pauta_title": "Como Validar e Formatar Grandes Payloads JSON sem Travamentos no Navegador",
        "target_keyword": "formatar json online, validador json",
        "meta_title": "Como Validar e Formatar Arquivos JSON de Forma Rápida",
        "meta_desc": "Precisa ler ou depurar um arquivo JSON grande? Aprenda a formatar, minificar e validar a estrutura JSON de forma rápida e segura.",
        "focus": "Boas práticas ao consumir APIs REST/GraphQL, depuração de erros sintáticos comuns em JSONs e minificação para produção.",
    },
    {
        "tool_name": "Removedor de Linhas Duplicadas",
        "tool_url": "https://www.devthru.com/tools/text/duplicate-remover",
        "keywords": ["productivity", "data", "text", "logs", "devops", "bash"],
        "pauta_title": "Limpeza Rápida de Logs e Listas: Como Organizar Textos Bagunçados sem Scripts",
        "target_keyword": "remover linhas duplicadas, ordenar texto online",
        "meta_title": "Como Limpar, Ordenar e Organizar Listas de Texto Facilmente",
        "meta_desc": "Economize tempo limpando listas de texto. Aprenda a remover duplicatas, ordenar alfabeticamente e formatar blocos de texto rapidamente.",
        "focus": "Técnicas de higienização de logs de servidor, ordenação alfabética e eliminação de registros duplicados em poucos segundos.",
    },
    {
        "tool_name": "Testador de Expressões Regulares (Regex)",
        "tool_url": "https://www.devthru.com/tools/development/regex-tester",
        "keywords": ["regex", "python", "javascript", "backend", "ai", "llm"],
        "pauta_title": "Dominando Regex no Desenvolvimento: Do Zero à Validação de Formatos Complexos",
        "target_keyword": "testar regex online, validador regex",
        "meta_title": "Guia de Expressões Regulares no Desenvolvimento",
        "meta_desc": "Aprenda a construir e testar expressões regulares (Regex) de alta performance para validação de dados e parse de strings.",
        "focus": "Como funcionam quantificadores, grupos de captura e como testar padrões Regex em tempo real sem travar a thread principal.",
    },
    {
        "tool_name": "Conversor de Markdown para HTML",
        "tool_url": "https://www.devthru.com/tools/converters/markdown-to-html",
        "keywords": ["markdown", "cms", "documentation", "blog", "react", "nextjs"],
        "pauta_title": "Arquitetura Headless CMS & Markdown: Como Renderizar Documentações Rápidas",
        "target_keyword": "converter markdown para html, gerador de html markdown",
        "meta_title": "Como Converter Markdown em HTML para Blogs e Docs",
        "meta_desc": "Descubra como estruturar documentações e posts em Markdown e convertê-los para HTML otimizado para SEO sem dependências pesadas.",
        "focus": "Vantagens da escrita em Markdown para desenvolvedores e integração com geradores de sites estáticos (SSG).",
    },
    {
        "tool_name": "Formatador de SQL Querys",
        "tool_url": "https://www.devthru.com/tools/development/sql-formatter",
        "keywords": ["sql", "database", "postgres", "mysql", "backend"],
        "pauta_title": "Boas Práticas de Leitura e Otimização de SQL Queries Complexas",
        "target_keyword": "formatar sql online, validador sql query",
        "meta_title": "Como Formatar e Indentar Consultas SQL Facilmente",
        "meta_desc": "Aprenda a indentar e organizar consultas SQL complexas para melhorar a legibilidade e facilitar a identificação de gargalos de banco de dados.",
        "focus": "Como a boa formatação de cláusulas JOIN, subselects e CTEs ajuda a identificar problemas de performance em bancos relacionais.",
    },
    {
        "tool_name": "Gerador de Inscrição Estadual",
        "tool_url": "https://www.devthru.com/tools/documents/inscricao-estadual",
        "keywords": ["nfe", "fiscal", "backend", "business", "testing"],
        "pauta_title": "Como Validar Inscrição Estadual por Estado em Sistemas de NF-e",
        "target_keyword": "gerador de inscricao estadual, validar ie nfe",
        "meta_title": "Validação de Inscrição Estadual para Desenvolvedores",
        "meta_desc": "Entenda as regras de validação de Inscrição Estadual (IE) por UF e como testar seu sistema de emissão de NF-e com dados válidos.",
        "focus": "Diferenças nos dígitos verificadores da IE de cada estado brasileiro e como evitar rejeição em APIs da SEFAZ.",
    }
]

def fetch_trending_topics():
    print("Buscando tópicos em alta na Web (Dev.to)...")
    url = "https://dev.to/api/articles?state=rising&per_page=15"
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
    
    # Fallback dinâmico
    return [
        {"title": "Optimizing React Performance in 2026", "tag_list": ["react", "webdev"], "url": "https://dev.to"},
        {"title": "Mastering CSS Grid and Flexbox layouts", "tag_list": ["css", "frontend"], "url": "https://dev.to"},
        {"title": "Understanding JWT and Authentication Best Practices", "tag_list": ["security", "node"], "url": "https://dev.to"},
        {"title": "How to design robust REST APIs", "tag_list": ["api", "backend"], "url": "https://dev.to"}
    ]

def select_dynamic_pautas(trending_articles):
    # Coleta todas as tags em alta no dia
    trending_tags = set()
    for art in trending_articles:
        tags = art.get('tag_list', art.get('tags', []))
        for t in tags:
            trending_tags.add(t.lower())
            
    # Pontua as pautas do pool com base nas tags em alta hoje
    scored_pautas = []
    for pauta in DEVTHRU_PAUTAS_POOL:
        score = 0
        for kw in pauta["keywords"]:
            if kw.lower() in trending_tags:
                score += 2
        scored_pautas.append((score, pauta))
        
    # Ordena por relevância e aplica rotação baseada no dia do mês/ano para ser sempre fresco
    today_seed = int(datetime.now().strftime("%Y%m%d"))
    rng = random.Random(today_seed)
    
    # Mistura pautas com a mesma pontuação usando o seed diário
    rng.shuffle(scored_pautas)
    scored_pautas.sort(key=lambda x: x[0], reverse=True)
    
    # Retorna as 8 melhores pautas do dia
    selected = [p[1] for p in scored_pautas[:8]]
    return selected

def generate_editorial_calendar(trending_articles, selected_pautas):
    today_str = datetime.now().strftime("%d/%m/%Y")
    
    markdown_content = f"""# Calendário Editorial Sugerido - {today_str}

Este arquivo foi gerado automaticamente pelo fluxo editorial diário do DevThru.

## 📈 Tendências Identificadas na Web (Dev.to)
Abaixo estão os tópicos em alta identificados nas últimas 24 horas:

"""
    for art in trending_articles[:10]:
        title = art.get('title', '')
        tags = ", ".join(art.get('tag_list', art.get('tags', [])))
        url = art.get('url', '#')
        markdown_content += f"- **[{title}]({url})** (Tags: `{tags}`)\n"
    
    markdown_content += f"""
---

## 📅 Sugestão de 8 Pautas Priorizadas (DevThru - {today_str})

Abaixo estão 8 sugestões de artigos dinamicamente cruzadas com os tópicos quentes do dia e priorizadas para atrair tráfego orgânico via *Engineering as Marketing*:

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
    
    trending = fetch_trending_topics()
    selected_pautas = select_dynamic_pautas(trending)
    content = generate_editorial_calendar(trending, selected_pautas)
    
    dest_path = os.path.join(target_dir, "calendario_RASCUNHO.md")
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Calendário editorial gerado e salvo com sucesso em: {dest_path}")

if __name__ == "__main__":
    main()
