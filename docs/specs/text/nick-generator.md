# Gerador de Nicks

> [!NOTE]
> Cria nicks para jogos e redes sociais em quatro estilos, com o nome do usuário e letras diferentes opcionais.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera 12 nicks únicos por clique combinando palavras do estilo escolhido com prefixos, sufixos e números.
* **Problema que resolve:** Encontrar um nick criativo e disponível para Free Fire, Roblox, Discord, Instagram e outros.
* **Público-alvo:** Jogadores e usuários de redes sociais.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/generators/nick.ts`.

### 1. Estilos (`NICK_STYLES`)
* **Gamer, Fofo, Sombrio e Engraçado**, cada um com listas próprias de prefixos, núcleos e sufixos.
* **Misturado:** sorteia o estilo a cada nick.

### 2. Montagem
* Padrões: prefixo+núcleo, núcleo+sufixo, prefixo+núcleo+sufixo, núcleo_sufixo e prefixo_núcleo.
* Palavras compostas viram CamelCase sem espaços ("Pão de Queijo" → `PãoDeQueijo`).
* Nicks gamer que começam com `Xx` terminam com `xX`.
* **Nome do usuário:** vira o núcleo do nick; símbolos são removidos e o nome é limitado a 20 caracteres.
* **Números:** quando ligado, ~60% dos nicks recebem um número de 0 a 99.
* Resultado sem repetições (até 20 tentativas por nick).

### 3. Letras diferentes
* Aplica um dos estilos de `lib/utils/fancy-text.ts` com boa compatibilidade (negrito, itálico, cursiva, gótica, contorno, versalete, círculos, máquina de escrever) a todos os nicks exibidos e copiados.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Nicks por estilo
* **Dado** que o usuário escolheu o estilo "Fofo"
* **Quando** clica em "Gerar nicks"
* **Então** o sistema exibe 12 nicks diferentes, sem espaços

### Cenário 2: Com o nome do usuário
* **Quando** o usuário digita `lu cas!!` e gera
* **Então** todos os nicks contêm `LuCas`

### Cenário 3: Sem números
* **Quando** a opção "Incluir números" está desligada
* **Então** nenhum nick contém dígitos

---

## 🎨 Design & UX

* **Estilo:** botões com o selecionado na cor primária; trocar o estilo já gera uma nova lista.
* **Resultados:** grade de cards (2 colunas no desktop), cada um com botão "Copiar" do texto exibido (já com letras diferentes, se escolhidas).
* **Estado inicial:** 12 nicks gamer gerados no carregamento (só no cliente, para evitar erro de hidratação).
* **Conteúdo:** dicas de nick (limite de 12 caracteres do Free Fire, privacidade) e link para Letras Diferentes.
* **Testes:** `__tests__/cep-nick.test.ts`.
