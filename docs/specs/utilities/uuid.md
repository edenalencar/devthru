# Gerador de UUID (Universally Unique Identifier)

> [!NOTE]
> Ferramenta essencial de utilidade para arquitetura de software, gerando identificadores únicos universais de 128 bits (RFC 4122) localmente de forma individual ou em lotes para desenvolvedores.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera chaves de identificação UUID estruturalmente válidas baseadas no padrão RFC 4122.
* **Problema que resolve:** Permite gerar identificadores únicos confiáveis para chaves primárias de bancos de dados de teste locais e payloads de APIs sem risco de colisão de dados e sem precisar escrever scripts de geração.
* **Público-alvo:** Engenheiros de software, administradores de banco de dados (DBAs) e testadores.

---

## ⚙️ Regras de Negócio & Validações

### 1. Versões e Formatos Suportados
A ferramenta permite personalizar a geração com base em:
* **UUID Versão 4 (v4 - Recomendado):** Identificador gerado de forma totalmente aleatória ou pseudo-aleatória.
* **UUID Versão 1 (v1):** Identificador gerado com base em carimbo de data/hora e endereço MAC (simulado para segurança).
* **Caixa Alta (UPPERCASE) ou Caixa Baixa (lowercase):** Opção de formatação de estilo de letras.

### 2. Geração em Lote
* Permite configurar a quantidade a ser gerada (ex: de 1 a 100 UUIDs simultaneamente).
* Exibe a lista final com quebras de linha em uma caixa de texto simples.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar UUID v4 em Caixa Baixa
* **Dado** que o usuário está na tela do Gerador de UUID
* **Quando** ele define a Versão como `"v4"`, a quantidade como `1` e caixa baixa
* **E** clica em "Gerar"
* **Então** o sistema deve retornar uma string contendo exatamente 36 caracteres no formato clássico de 5 grupos separados por hífen (ex: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
* **E** certificar que o dígito na posição do índice 14 (versão) é exatamente `4`
* **E** habilitar o botão de cópia rápida.

---

## 🎨 Design & UX

* **Visualização:**
  * O UUID gerado é apresentado em fonte monoespaçada com botão de cópia de um clique.
* **Massa de Testes (Bulk Mode):**
  * Campo numérico ou slider para definir a quantidade de chaves a gerar.
  * O bloco de UUIDs gerados em lote permite copiar toda a lista com um único clique ou exportar em formato de arquivo `.txt`.
* **Configurações rápidas:**
  * Opções de tab ou rádio simples para alternar entre as versões v1 e v4.
