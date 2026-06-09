# Conversor de Imagem (Image Converter)

> [!NOTE]
> Ferramenta de manipulação de mídia executada inteiramente local no navegador, permitindo a conversão de formatos de imagem e compressão rápida sem upload de arquivos para servidores externos.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte arquivos de imagem entre formatos populares (PNG, JPEG, WEBP) e oferece controle de compressão de qualidade.
* **Problema que resolve:** A conversão de imagens em servidores de terceiros expõe a privacidade dos arquivos do usuário e consome internet. A ferramenta resolve essa dor processando as imagens localmente via Canvas API, além de ajudar a otimizar o tamanho do arquivo para publicação web.
* **Público-alvo:** Desenvolvedores web, criadores de conteúdo e designers de interface.

---

## ⚙️ Regras de Negócio & Validações

### 1. Formatos de Entrada e Saída
A ferramenta suporta o carregamento de arquivos de imagem e conversão para as seguintes saídas:
* **Entradas aceitas:** PNG, JPEG, JPG, WEBP, GIF, BMP.
* **Saídas geradas:** PNG, JPEG, WEBP.

### 2. Processamento Local e Ajuste de Qualidade
* O processamento é realizado no navegador desenhando a imagem carregada em um elemento `<canvas>` HTML5 e exportando via `canvas.toDataURL(mimeType, quality)`.
* **Controle de Qualidade:** Permite definir um fator de compressão entre 0.1 (baixa qualidade, menor tamanho) e 1.0 (alta qualidade, maior tamanho) para os formatos que aceitam compressão com perdas (JPEG e WEBP).
* **Métricas de Otimização:** Exibe o tamanho original do arquivo (KB/MB), tamanho convertido e percentual de economia de espaço em disco obtido.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Converter PNG para WEBP com Compressão
* **Dado** que o usuário está na tela do Conversor de Imagem
* **Quando** ele carrega um arquivo PNG de `1.2 MB`
* **E** seleciona o formato de saída como `"WEBP"` com qualidade definida em `0.8` (80%)
* **E** aciona a conversão
* **Então** o sistema deve renderizar o arquivo convertido localmente
* **E** exibir o novo tamanho resultante (ex: `150 KB`)
* **E** apresentar o botão para baixar a imagem em formato WEBP.

---

## 🎨 Design & UX

* **Área de Drag and Drop (Arrastar e Soltar):**
  * Zona de upload destacada com suporte para arrastar arquivos ou clicar para abrir o seletor nativo do sistema operacional.
* **Painel de Ajuste:**
  * Controles visuais (slider) para ajustar a qualidade em tempo real (habilitado apenas para formatos que suportam controle de compactação).
  * Exibição de miniaturas (thumbnail preview) da imagem original e da convertida lado a lado para avaliação rápida de qualidade visual.
* **Privacidade Garantida:**
  * Informação explícita na tela afirmando que as imagens são convertidas localmente e não são armazenadas nem enviadas para nenhum servidor.
