# Gerador de Imagens de Marcação (Placeholder Generator)

> [!NOTE]
> Ferramenta de utilidade de design para desenvolvedores frontend gerarem imagens fictícias de tamanho e cores sob medida para testes de layout de forma instantânea no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera imagens temporárias de tamanhos e cores personalizáveis, com rótulos de texto, para preencher espaços reservados de imagem em mockups de sites.
* **Problema que resolve:** Em fases de desenvolvimento de telas, muitas vezes não há imagens definitivas prontas. A ferramenta evita o uso de links quebrados ou imagens desproporcionais gerando placeholders limpos com o tamanho exato indicado.
* **Público-alvo:** Desenvolvedores web, engenheiros frontend e designers de interface.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros de Personalização
A ferramenta aceita os seguintes parâmetros de configuração:
* **Largura (Width) & Altura (Height):** Dimensões da imagem gerada (em pixels).
* **Cor de Fundo (Background Color):** Cor da tela de fundo (em formatos hexadecimais ou RGB).
* **Cor do Texto (Text Color):** Cor da fonte do rótulo.
* **Texto do Rótulo (Label):** Texto personalizado a ser centralizado na imagem. Se deixado em branco, exibe a dimensão da imagem (ex: `"300x250"`).

### 2. Mecanismo de Renderização e Exportação
* A imagem é desenhada localmente através da API de Canvas do HTML5.
* Formatos de download suportados: **PNG** ou **SVG**.
* Disponibiliza o código de inclusão `<img>` com a imagem convertida em string **Base64** para colar direto no código do projeto.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Placeholder Padrão
* **Dado** que o usuário está na tela do Gerador de Placeholder
* **Quando** ele digita largura como `"350"` e altura como `"150"`
* **E** clica em "Gerar" ou a renderização reativa ocorre
* **Então** o sistema deve renderizar um retângulo de 350x150 pixels com a cor cinza padrão de fundo
* **E** exibir centralizado o texto `"350 x 150"`
* **E** habilitar as opções para baixar o arquivo ou copiar o código inline Base64.

---

## 🎨 Design & UX

* **Visualização em Tempo Real (Live Preview):**
  * O painel de visualização à direita atualiza dinamicamente o design do placeholder a cada alteração de tamanho ou cor nos inputs à esquerda.
  * O preview possui grades de fundo quadriculadas transparentes para ajudar a medir a proporção exata da imagem gerada.
* **Seletores de Cores de Fácil Acesso:**
  * Paleta rápida de presets de cores comuns (cinza escuro, azul marinho, verde, etc.) para acelerar a escolha de contraste.
