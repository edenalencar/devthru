# Gerador de Senhas Seguras (Password Generator)

> [!NOTE]
> Ferramenta essencial de segurança para criar senhas aleatórias e altamente seguras contendo controle detalhado de entropia e análise de força localmente no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera senhas aleatórias fortes baseadas em critérios de tamanho e tipos de caracteres, avaliando visualmente a força (complexidade) da senha gerada.
* **Problema que resolve:** Usuários costumam adotar senhas fracas ou previsíveis de fácil memorização. A ferramenta cria senhas com alta entropia impossíveis de serem descobertas por ataques de força bruta, garantindo que o processamento seja feito localmente para segurança da credencial.
* **Público-alvo:** Administradores de sistemas, desenvolvedores cadastrando usuários de teste com credenciais fortes e usuários finais.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros de Complexidade (Entropia)
O gerador permite personalizar a composição da senha por meio de opções ligadas/desligadas:
* **Comprimento:** Tamanho da senha (ex: mínimo 8 e máximo 64 caracteres).
* **Maiúsculas:** Inclusão de caracteres de `A` a `Z`.
* **Minúsculas:** Inclusão de caracteres de `a` a `z`.
* **Números:** Inclusão de dígitos de `0` a `9`.
* **Símbolos (Especiais):** Inclusão de caracteres como `! @ # $ % ^ & * ( ) _ + - = { } [ ] | \ : ; " ' < > , . ? /`.
* **Evitar Caracteres Ambíguos (Opcional):** Permite excluir do sorteio caracteres visualmente similares que confundem a leitura (como `i, l, 1, L`, `o, O, 0`, `s, S, 5`).

### 2. Indicador de Força da Senha (Entropy Meter)
A ferramenta analisa a entropia da senha gerada e apresenta uma classificação visual:
* **Fraca (Vermelho):** Entropia muito baixa (ex: senhas curtas ou apenas com letras minúsculas).
* **Média (Laranja/Amarelo):** Senha com segurança intermediária.
* **Forte (Verde):** Alta entropia (ex: mais de 12 caracteres combinando letras maiúsculas/minúsculas, números e símbolos).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Senha Forte Completa
* **Dado** que o usuário está na tela do Gerador de Senhas
* **Quando** ele define o comprimento como `16`
* **E** ativa as opções: "Maiúsculas", "Minúsculas", "Números" e "Símbolos"
* **E** clica em "Gerar Senha"
* **Então** o sistema deve compor uma senha aleatória contendo pelo menos um caractere de cada categoria selecionada
* **E** exibir o indicador de força na cor verde ("Forte").

---

## 🎨 Design & UX

* **Visualização da Senha:**
  * A senha gerada é exibida em destaque com fonte monoespaçada de tamanho grande, facilitando a leitura de caracteres especiais.
  * Botão de cópia rápida com Sonner Toast de confirmação visual.
* **Controles Visuais Simples:**
  * Checkboxes organizados lado a lado ou em grade para selecionar os tipos de caracteres.
  * Controle deslizante (slider) reativo para ajustar de forma intuitiva o comprimento da senha.
  * Barra de progresso colorida abaixo da senha indicando a força da senha de forma instantânea.
