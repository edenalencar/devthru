# Codificador e Decodificador de URL (URL Encoder/Decoder)

> [!NOTE]
> Ferramenta essencial de desenvolvimento para codificação e decodificação reativa de parâmetros de URL no padrão percent-encoding (RFC 3986) executada localmente de forma segura.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte caracteres especiais em sequências de escape compatíveis com o padrão Web (codificar URL) e reverte URLs codificadas de volta para o texto legível original (decodificar URL).
* **Problema que resolve:** Caracteres como espaços, acentuações e símbolos especiais (ex: `?`, `&`, `=`, `+`) possuem significados estruturais em consultas HTTP (Query Strings). A ferramenta normaliza esses caracteres em sequências válidas (como `%20` para espaços ou `%3F` para interrogação), evitando requisições HTTP malformadas e links quebrados.
* **Público-alvo:** Desenvolvedores de integrações web, engenheiros backend e testadores de APIs.

---

## ⚙️ Regras de Negócio & Validações

### 1. Codificação (encodeURIComponent)
* Converte caracteres não-alfanuméricos em suas respectivas representações de escape hexadecimal antecedidas por `%` baseadas no padrão UTF-8.

### 2. Decodificação (decodeURIComponent)
* Converte todas as sequências percentuais de volta para a tabela de caracteres original.
* O sistema deve tratar erros de decodificação de strings malformadas de forma suave (ex: sequências de escape incompletas como `%E`), evitando travamentos da interface.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Codificar String com Caracteres Especiais
* **Dado** que o usuário está na tela do Conversor de URL
* **Quando** ele insere o texto plano `"tutoriais & guias?"` e clica em "Codificar"
* **Então** o sistema deve retornar o texto codificado correspondente: `tutoriais%20%26%20guias%3F`
* **E** habilitar o botão de cópia rápida.

### Cenário 2: Decodificar Parâmetros de URL
* **Dado** que o usuário cola a string `slug%3Dspec-driven-development` no campo codificado
* **Quando** ele clica no botão "Decodificar"
* **Então** o sistema deve retornar a string de texto plano correspondente: `"slug=spec-driven-development"`.

---

## 🎨 Design & UX

* **Estrutura de Sincronização Dinâmica:**
  * Layout composto por dois painéis de texto generosos dispostos verticalmente ou lado a lado: "Texto Plano (Decodificado)" e "Texto Codificado (URL)".
  * Opção de processamento em tempo real ou botões bidirecionais de ação dedicados.
  * Botões individuais para cópia e limpeza de campos.
