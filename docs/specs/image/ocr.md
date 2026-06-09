# Reconhecimento Óptico de Caracteres (OCR - Image to Text)

> [!NOTE]
> Ferramenta essencial de produtividade para extrair texto legível a partir de capturas de tela (prints), fotos de documentos e arquivos de imagem de forma automatizada no cliente.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Analisa imagens contendo caracteres escritos e as converte em texto digital editável e copiável.
* **Problema que resolve:** Elimina a digitação manual de informações presentes em imagens de livros, faturas ou prints de código. Permite copiar rapidamente trechos de texto bloqueados em imagens sem precisar redigir do zero.
* **Público-alvo:** Desenvolvedores, digitadores, estudantes e testadores copiando strings de telas.

---

## ⚙️ Regras de Negócio & Validações

### 1. Processamento e Idiomas Suportados
* O reconhecimento é executado totalmente no navegador utilizando a biblioteca **Tesseract.js** (WebAssembly).
* A ferramenta deve permitir a seleção do idioma de reconhecimento para otimizar a precisão (padrão **Português - por** e **Inglês - eng**).

### 2. Feedback de Progresso (UX)
* O processo de OCR possui estágios assíncronos (carregamento do worker do Tesseract, download de arquivos de idioma de cotação e execução de leitura).
* A interface deve exibir uma barra de progresso numérica (`0% a 100%`) indicando o status atual do processamento de leitura da imagem.

### 3. Manipulação do Texto Extraído
* O texto final extraído deve ser apresentado em um campo de texto aberto (textarea) editável para que o usuário possa fazer pequenas correções.
* Opções rápidas de ação: "Copiar Texto" e "Baixar TXT".

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Extrair Texto com Sucesso
* **Dado** que o usuário está na ferramenta OCR
* **Quando** ele faz o upload de uma imagem contendo o texto `"Olá DevThru"` e seleciona o idioma "Português"
* **Então** o sistema deve iniciar o processamento e exibir a barra de progresso
* **E** após concluir a leitura com sucesso, ocultar o carregamento e exibir a string `"Olá DevThru"` no campo de texto editável
* **E** habilitar o botão de cópia rápida.

---

## 🎨 Design & UX

* **Área de Carregamento & Drop:**
  * Zona de arrastar e soltar imagens com preview da imagem carregada.
  * Suporte a colagem de imagem diretamente da área de transferência (atalho `Ctrl+V` ou `Cmd+V`).
* **Editor de Resultados:**
  * Caixa de texto editável com fonte monoespaçada ou sans-serif limpa.
  * Painel inferior com contagem de caracteres e palavras extraídas para auditoria de tamanho.
  * Botões de ação para limpar dados, copiar e baixar arquivo de texto `.txt`.
