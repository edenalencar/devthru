# Comparador de Diferenças de Texto (Diff Checker)

> [!NOTE]
> Ferramenta essencial de auditoria e revisão de código, permitindo comparar dois blocos de texto (original e modificado) e realçar visualmente adições, remoções e alterações inline ou lado a lado.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Identifica diferenças linha por linha ou caractere por caractere entre duas versões de um mesmo texto ou código.
* **Problema que resolve:** Permite que desenvolvedores revisem alterações de código rápidas, comparem arquivos de configurações longos ou auditem revisões textuais sem precisar rodar ferramentas de terminal complexas como `git diff`.
* **Público-alvo:** Programadores, analistas de QA, redatores e revisores de texto.

---

## ⚙️ Regras de Negócio & Validações

### 1. Algoritmo de Diferenciação (Diff)
* A comparação deve identificar precisamente:
  * **Adições:** Linhas ou palavras novas (destacadas visualmente em verde com sinal de `+`).
  * **Remoções:** Linhas ou palavras deletadas (destacadas em vermelho com sinal de `-`).
  * **Alterações:** Linhas modificadas.

### 2. Modos de Visualização
A interface deve oferecer suporte a dois tipos de visualização do resultado:
* **Lado a Lado (Split View):** Exibe o texto original na coluna da esquerda e o modificado na coluna da direita, alinhando as linhas correspondentes e destacando as diferenças.
* **Consolidado (Unified View):** Exibe as alterações em um único fluxo de texto contínuo, listando as remoções seguidas das inserções.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Comparação de Textos com Diferenças
* **Dado** que o usuário está na tela do Comparador de Diferenças
* **Quando** ele insere no campo **Texto Original**:
  ```
  Olá mundo!
  Desenvolvimento de software.
  ```
* **E** insere no campo **Texto Modificado**:
  ```
  Olá mundo!
  Desenvolvimento de software incremental.
  ```
* **E** clica em "Comparar"
* **Então** o sistema deve destacar a linha 2, indicando que a palavra `"incremental"` foi adicionada (marcada em verde).

---

## 🎨 Design & UX

* **Estrutura de Entrada de Dados:**
  * Dois campos de texto amplos lado a lado: "Texto Original (Antes)" e "Texto Modificado (Depois)".
* **Visualização de Resultados Interativa:**
  * Painel de código de saída com linhas numeradas de forma consistente.
  * Cores clássicas e com contraste acessível para o destaque (fundo vermelho claro para deleções, fundo verde claro para inserções).
  * Chaves seletoras (tabs ou botões de rádio) para alternar dinamicamente entre os modos "Lado a Lado" e "Consolidado".
