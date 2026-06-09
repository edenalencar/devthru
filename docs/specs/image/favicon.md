# Gerador de Favicon (Favicon Generator)

> [!NOTE]
> Ferramenta essencial para otimização visual de sites (branding), convertendo imagens comuns no arquivo de ícone clássico do navegador (.ico) e gerando o pacote de tags para dispositivos móveis de forma automatizada no cliente.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Transforma imagens comuns em arquivos `.ico` multi-resolução para navegadores e empacota ícones otimizados para Apple Touch e Android.
* **Problema que resolve:** A criação manual de múltiplos tamanhos de ícones e arquivos `.ico` estruturalmente válidos exige ferramentas de design complexas. A ferramenta automatiza esse processo localmente no navegador, gerando também o código HTML correto para colar no `<head>` do site.
* **Público-alvo:** Desenvolvedores web, web designers e administradores de sites.

---

## ⚙️ Regras de Negócio & Validações

### 1. Requisitos da Imagem de Entrada
* A imagem enviada pelo usuário deve idealmente ser quadrada (proporção 1:1) e em alta resolução (mínimo de 260x260 pixels para resultados ideais). Se não for quadrada, a ferramenta realiza o corte centralizado.

### 2. Pacote de Ícones Gerados
O pacote ZIP de download deve conter as seguintes saídas criadas dinamicamente:
* **favicon.ico:** Arquivo no formato ícone do Windows contendo as resoluções de 16x16, 32x32 e 48x48 pixels embutidas.
* **favicon-32x32.png** e **favicon-16x16.png**: Arquivos PNG clássicos para navegadores modernos.
* **apple-touch-icon.png:** Ícone de alta definição (180x180 pixels) para dispositivos iOS.
* **android-chrome-192x192.png** e **android-chrome-512x512.png**: Ícones para atalhos de tela em dispositivos Android e PWA.

### 3. Código HTML Prontamente Gerado
* A ferramenta exibe na tela o bloco de código HTML contendo as referências `<link rel="...">` correspondentes ao pacote gerado, prontas para serem coladas no projeto do desenvolvedor.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar e Baixar Pacote de Favicon
* **Dado** que o usuário está na tela do Gerador de Favicon
* **Quando** ele carrega um arquivo de logotipo em PNG de `512x512`
* **E** clica em "Gerar Favicon"
* **Então** o sistema deve renderizar e compilar todos os ícones necessários localmente
* **E** disparar o download de um arquivo comprimido `favicon-package.zip` contendo os arquivos estruturados
* **E** exibir a caixa de código HTML contendo as tags corretas de inclusão com botão de copiar.

---

## 🎨 Design & UX

* **Visualização dos Ícones:**
  * Exibição de previews de como o ícone aparecerá na aba de um navegador simulado para avaliação estética imediata pelo usuário.
* **Área de Carregamento Limpa:**
  * Zona de arrastar e soltar (drag and drop) integrada com suporte a visualização prévia da imagem carregada.
  * Código HTML final exibido em container escuro com syntax highlighting e cópia rápida de um clique.
