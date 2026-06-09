# Codificador e Decodificador Base64 (Base64 Encoder/Decoder)

> [!NOTE]
> Ferramenta clássica de desenvolvimento para codificação e decodificação reativa de dados binários em formato de texto Base64 executada de forma local e segura no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte textos planos em codificação Base64 (codificar) e strings em Base64 de volta para texto plano UTF-8 (decodificar).
* **Problema que resolve:** Permite codificar parâmetros de URLs, embutir imagens de forma inline em arquivos HTML/CSS ou inspecionar payloads codificados que transitam em cabeçalhos de requisições HTTP (como o cabeçalho Basic Auth) sem expor as informações a servidores externos.
* **Público-alvo:** Programadores web, analistas de segurança da informação e desenvolvedores frontend/backend.

---

## ⚙️ Regras de Negócio & Validações

### 1. Codificação (UTF-8 para Base64)
* A codificação deve tratar corretamente caracteres especiais e acentuados (UTF-8), garantindo que a conversão não corrompa emojis ou pontuações brasileiras.

### 2. Decodificação (Base64 para UTF-8)
* O sistema deve validar a string Base64 inserida. Se contiver caracteres inválidos fora da tabela Base64 (`A-Z`, `a-z`, `0-9`, `+`, `/`, `=`), o sistema deve exibir um aviso de formato inválido em tempo real, em vez de lançar exceções não tratadas na interface.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Codificar Texto com Acentuação
* **Dado** que o usuário está na tela do Conversor Base64
* **Quando** ele insere o texto `"Desenvolvimento"` no campo de texto plano e clica em "Codificar"
* **Então** o sistema deve retornar a string codificada correspondente: `RGVzZW52b2x2aW1lbnRv`
* **E** habilitar o botão de cópia rápida.

### Cenário 2: Decodificar String Base64
* **Dado** que o usuário insere a string `RGV2VGhydQ==` no campo Base64
* **Quando** ele clica no botão "Decodificar"
* **Então** o sistema deve decodificar e retornar a string correspondente em texto plano: `"DevThru"`.

---

## 🎨 Design & UX

* **Layout de Painel Duplo:**
  * Painel superior (ou esquerdo) para texto plano e painel inferior (ou direito) para texto em Base64.
  * O processamento e sincronização ocorrem em tempo real ou através de botões de conversão bidirecional destacados.
  * Botões de cópia rápida e limpeza de dados integrados individualmente em cada caixa de texto.
