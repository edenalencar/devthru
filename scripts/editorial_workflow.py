import os
import json
import sys
import urllib.request
from datetime import datetime

# Assegura suporte a UTF-8 para logs no Windows Task Scheduler
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def fetch_trending_topics():
    print("Buscando tópicos em alta no Dev.to...")
    url = "https://dev.to/api/articles?state=rising&per_page=15"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                return data
    except Exception as e:
        print(f"Erro ao buscar do Dev.to: {e}")
    
    # Fallback caso a API falhe ou dê rate limit
    return [
        {"title": "Optimizing React Performance in 2026", "tags": ["react", "webdev"]},
        {"title": "Mastering CSS Grid and Flexbox layouts", "tags": ["css", "frontend"]},
        {"title": "Understanding JWT and Authentication Best Practices", "tags": ["security", "node"]},
        {"title": "How to design robust REST APIs", "tags": ["api", "backend"]}
    ]

def generate_editorial_calendar(articles):
    today_str = datetime.now().strftime("%d/%m/%Y")
    
    markdown_content = f"""# Calendário Editorial Sugerido - {today_str}

Este arquivo foi gerado automaticamente pelo fluxo editorial diário do DevThru.

## 📈 Tendências Identificadas na Web
Abaixo estão os tópicos quentes identificados nas últimas 24 horas:

"""
    for art in articles[:10]:
        title = art.get('title', '')
        tags = ", ".join(art.get('tag_list', art.get('tags', [])))
        url = art.get('url', '#')
        markdown_content += f"- **[{title}]({url})** (Tags: `{tags}`)\n"
    
    markdown_content += """
---

## 📅 Sugestão de 8 Pautas Priorizadas (DevThru)

Abaixo estão 8 sugestões de artigos otimizados para atrair tráfego e promover as ferramentas do DevThru (Estratégia de *Engineering as Marketing*):

### 1. Guia Definitivo de Expressões Cron no Linux
* **Foco da Pauta:** Explicar como funciona a sintaxe do Crontab, os 5 campos principais e exemplos comuns do dia a dia (executar a cada 5 minutos, diariamente, etc.).
* **Palavra-chave Alvo:** `gerador de crontab`, `expressao cron linux`
* **SEO Meta:**
  * **Title:** Como Configurar Cron Jobs no Linux: Guia Prático
  * **Description:** Entenda de uma vez por todas a sintaxe do crontab no Linux. Aprenda a ler e validar expressões cron com exemplos reais.
* **CTA DevThru:** Direcionar o leitor para usar o [Gerador de Crontab](https://www.devthru.com/tools/development/crontab-generator) para criar e decodificar expressões visualmente.

### 2. JWT (JSON Web Tokens) na Prática: Segurança e Decodificação
* **Foco da Pauta:** Como funciona a estrutura de um JWT (Header, Payload, Signature), boas práticas de armazenamento (cookies vs localStorage) e como depurar tokens.
* **Palavra-chave Alvo:** `decodificar jwt`, `como funciona jwt`
* **SEO Meta:**
  * **Title:** O que é JWT e Como Funciona a Autenticação por Token?
  * **Description:** Entenda a estrutura de um JSON Web Token (JWT). Aprenda como decodificar payloads de forma segura e implementar boas práticas de segurança.
* **CTA DevThru:** Indicar o uso do [Decodificador de JWT](https://www.devthru.com/tools/development/jwt-decoder) para inspecionar payloads.

### 3. Por que você deve parar de usar margens fixas em Pixel: Migrando para REM
* **Foco da Pauta:** Diferença entre px, rem e em. Por que o uso de unidades relativas como REM é vital para acessibilidade e design responsivo moderno.
* **Palavra-chave Alvo:** `converter px para rem`, `pixel para rem`
* **SEO Meta:**
  * **Title:** PX vs REM: Por que Usar Unidades Relativas no CSS?
  * **Description:** Aprenda a diferença entre px, rem e em no CSS. Descubra como criar layouts responsivos e acessíveis convertendo pixels para rem facilmente.
* **CTA DevThru:** Recomendar o [Conversor de Pixel para REM](https://www.devthru.com/tools/converters/pixel-to-rem).

### 4. Entendendo Base64: Quando usar para Imagens e Dados
* **Foco da Pauta:** O que é a codificação Base64, quando vale a pena embutir imagens diretamente no HTML/CSS em Base64 e quando isso prejudica a performance.
* **Palavra-chave Alvo:** `converter base64`, `imagem para base64`
* **SEO Meta:**
  * **Title:** Como Funciona a Codificação Base64 e Quando Utilizar?
  * **Description:** Entenda o que é Base64, como converter strings e imagens, e descubra os prós e contras de embutir mídia diretamente no seu código.
* **CTA DevThru:** Linkar para o [Conversor de Base64](https://www.devthru.com/tools/converters/base64).

### 5. Guia de Integração de Tags do Google Tag Manager (GTM)
* **Foco da Pauta:** Como organizar variáveis, acionadores e tags no GTM sem bagunçar a telemetria do seu site. Melhores práticas para tagueamento limpo.
* **Palavra-chave Alvo:** `ajuda google tag manager`, `configurar gtm`
* **SEO Meta:**
  * **Title:** Como Organizar e Configurar o Google Tag Manager (GTM)
  * **Description:** Guia passo a passo para configurar tags, acionadores e variáveis no Google Tag Manager sem prejudicar o desempenho do seu site.
* **CTA DevThru:** Indicar o [GTM Helper / Analytics Helpers](https://www.devthru.com/tools/analytics/gtm-helper).

### 6. Como Formatar e Validar Grandes Arquivos JSON sem Travamentos
* **Foco da Pauta:** Por que navegadores travam ao abrir grandes arquivos JSON e como usar ferramentas de formatação, minificação e validação local de forma eficiente.
* **Palavra-chave Alvo:** `formatar json online`, `validador json`
* **SEO Meta:**
  * **Title:** Como Validar e Formatar Arquivos JSON de Forma Rápida
  * **Description:** Precisa ler ou depurar um arquivo JSON grande? Aprenda a formatar, minificar e validar a estrutura JSON de forma rápida e segura.
* **CTA DevThru:** Sugerir o [Formatador/Validador de JSON](https://www.devthru.com/tools/development/json-formatter).

### 7. Organização e Limpeza de Listas de Texto para Desenvolvedores
* **Foco da Pauta:** Técnicas rápidas para remover duplicatas, ordenar linhas alfabeticamente, inverter ordem e limpar textos bagunçados usando ferramentas rápidas ao invés de scripts ad-hoc.
* **Palavra-chave Alvo:** `remover linhas duplicadas`, `ordenar texto online`
* **SEO Meta:**
  * **Title:** Como Limpar, Ordenar e Organizar Listas de Texto Facilmente
  * **Description:** Economize tempo limpando listas de texto. Aprenda a remover duplicatas, ordenar alfabeticamente e formatar blocos de texto rapidamente.
* **CTA DevThru:** Indicar as [Ferramentas de Texto do DevThru](https://www.devthru.com/tools/text).

### 8. Diferença entre Criptografia, Hash e Codificação
* **Foco da Pauta:** Desmistificar termos comuns de segurança: Criptografia (simétrica/assimétrica), Algoritmos de Hash (MD5, SHA-256) e Codificações (Base64, URL Encode).
* **Palavra-chave Alvo:** `gerador de hash md5`, `diferenca hash e criptografia`
* **SEO Meta:**
  * **Title:** Criptografia vs Hash vs Codificação: Qual a Diferença?
  * **Description:** Aprenda a diferença conceitual e prática entre criptografia, algoritmos de hash (como MD5/SHA) e codificações de dados no desenvolvimento.
* **CTA DevThru:** Convidar o usuário a testar o [Gerador de Hash](https://www.devthru.com/tools/security/hash-generator).
"""
    return markdown_content

def main():
    # Determina a raiz do projeto de forma robusta e independente do CWD do agendador
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    target_dir = os.path.join(project_root, "docs", "editorial")
    
    os.makedirs(target_dir, exist_ok=True)
    
    trending = fetch_trending_topics()
    content = generate_editorial_calendar(trending)
    
    dest_path = os.path.join(target_dir, "calendario_RASCUNHO.md")
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Calendário editorial salvo com sucesso em: {dest_path}")

if __name__ == "__main__":
    main()
