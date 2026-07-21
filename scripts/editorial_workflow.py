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

# Catálogo de pautas Mapeado 100% para Ferramentas Existentes no DevThru
DEVTHRU_PAUTAS_POOL = [
    {
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
        "tool_name": "Gerador de Senhas Seguras",
        "tool_url": "https://www.devthru.com/tools/utilities/password-generator",
        "keywords": ["security", "password", "crypto", "auth", "devops"],
        "pauta_title": "Entropia e Segurança de Senhas: Como Gerar Chaves Forte no Desenvolvimento",
        "target_keyword": "gerador de senhas seguras, entropia de senha",
        "meta_title": "Como Gerar Senhas e Chaves de API Seguras",
        "meta_desc": "Entenda o conceito de entropia em senhas e aprenda a gerar chaves aleatórias e seguras para suas aplicações e ambientes de staging.",
        "focus": "Diferença entre caracteres aleatórios, frases secretas (passphrases) e como evitar chaves fracas em conexões com bancos e APIs.",
    },
    {
        "tool_name": "Gerador de Cartão de Crédito para Testes",
        "tool_url": "https://www.devthru.com/tools/finance/credit-card-generator",
        "keywords": ["stripe", "payment", "finance", "testing", "qa", "ecommerce"],
        "pauta_title": "Como Testar Integrações de Checkout (Stripe/PagSeguro) sem Usar Cartões Reais",
        "target_keyword": "gerador de cartao de credito teste, cartao sandbox stripe",
        "meta_title": "Testando Checkouts com Cartões de Crédito Fictícios Válidos",
        "meta_desc": "Aprenda a testar o fluxo de pagamento do seu e-commerce ou SaaS gerando números de cartão de teste válidos no algoritmo de Luhn.",
        "focus": "Como funciona o Algoritmo de Luhn para validação de números de cartão e boas práticas de sandbox em gateway de pagamento.",
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
    trending_tags = set()
    for art in trending_articles:
        tags = art.get('tag_list', art.get('tags', []))
        for t in tags:
            trending_tags.add(t.lower())
            
    scored_pautas = []
    for pauta in DEVTHRU_PAUTAS_POOL:
        score = 0
        for kw in pauta["keywords"]:
            if kw.lower() in trending_tags:
                score += 2
        scored_pautas.append((score, pauta))
        
    today_seed = int(datetime.now().strftime("%Y%m%d"))
    rng = random.Random(today_seed)
    
    rng.shuffle(scored_pautas)
    scored_pautas.sort(key=lambda x: x[0], reverse=True)
    
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
