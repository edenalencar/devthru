# Letras Diferentes para Copiar e Colar

> [!NOTE]
> Converte um texto em 17 estilos Unicode (negrito, cursiva, gótica, riscado, de cabeça para baixo...) para colar em bios, nicks e redes sociais sem instalar fontes.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Transforma o texto digitado em variações estilizadas usando alfabetos Unicode e caracteres combinantes, cada uma com botão de copiar.
* **Problema que resolve:** Redes sociais e jogos não permitem trocar a fonte; caracteres Unicode estilizados funcionam em qualquer campo de texto.
* **Público-alvo:** Usuários de Instagram, TikTok, WhatsApp e jogos (nicks), além de criadores de conteúdo.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/fancy-text.ts` (`FANCY_STYLES`).

### 1. Alfabetos matemáticos (Unicode Mathematical Alphanumeric Symbols)
* Letras A–Z e a–z são deslocadas para o bloco do estilo (ex.: negrito `U+1D400`).
* Dígitos 0–9 são convertidos apenas nos estilos que têm dígitos no Unicode (negrito, contorno, negrito sem serifa, máquina de escrever, largo).
* **Exceções do Unicode:** letras que já existiam antes do bloco usam o caractere legado (ex.: itálico `h` → `ℎ`, cursiva `B` → `ℬ`, contorno `R` → `ℝ`, gótica `C` → `ℭ`).

### 2. Acentos
* O texto é normalizado em NFD: a letra base é estilizada e o acento é mantido como caractere combinante (ex.: `ã` → `𝐚` + `U+0303`), depois recomposto em NFC.

### 3. Estilos por mapa ou combinação
* **Versalete:** mapa de letras minúsculas para small caps (`ᴀʙᴄ...`).
* **Riscado / Sublinhado:** adiciona `U+0336` / `U+0332` após cada caractere que não seja espaço.
* **De cabeça para baixo:** mapa de caracteres invertidos e inversão da ordem do texto.

### 4. Limites
* Entrada limitada a 300 caracteres. Caracteres sem mapeamento são mantidos como estão.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Negrito com números e espaços
* **Dado** que o usuário está na tela de Letras Diferentes
* **Quando** ele digita `Ab 1`
* **Então** o estilo Negrito deve exibir `𝐀𝐛 𝟏`, preservando o espaço

### Cenário 2: Letras de exceção do Unicode
* **Quando** ele digita `h` **Então** o estilo Itálico exibe `ℎ`
* **Quando** ele digita `R` **Então** o estilo Contorno exibe `ℝ`

### Cenário 3: De cabeça para baixo
* **Quando** ele digita `abc`
* **Então** o estilo De cabeça para baixo exibe `ɔqɐ`

---

## 🎨 Design & UX

* **Estado inicial:** campo preenchido com "Letras Diferentes" para mostrar todos os estilos de imediato.
* **Resultados:** um card por estilo, com o nome do estilo, a prévia em fonte grande e botão "Copiar".
* **Responsividade:** textos longos quebram em qualquer ponto (`overflow-wrap: anywhere`) para não gerar rolagem horizontal no celular.
* **Testes:** `__tests__/everyday-tools.test.ts`.
