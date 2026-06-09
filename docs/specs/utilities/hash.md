# Gerador de Hash Criptográfico (Hash Generator)

> [!NOTE]
> Ferramenta essencial de segurança e criptografia de dados, permitindo gerar assinaturas digitais únicas (hashes) para strings de texto localmente no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera sequências criptográficas de hash a partir de um texto inserido pelo usuário, utilizando diferentes algoritmos criptográficos em tempo real.
* **Problema que resolve:** Permite obter assinaturas digitais (checksums) ou hashes de verificação para senhas e integridade de arquivos de forma rápida e segura, sem enviar os dados de entrada para o servidor, mitigando riscos de vazamento de segredos.
* **Público-alvo:** Desenvolvedores de software, engenheiros de segurança (SecOps) e administradores de sistemas.

---

## ⚙️ Regras de Negócio & Validações

### 1. Algoritmos de Hash Suportados
A ferramenta processa o texto inserido e exibe os hashes gerados para as seguintes funções criptográficas:
* **MD5:** Hash de 128 bits (32 caracteres hexadecimais). Usado para compatibilidade legível de integridade.
* **SHA-1:** Hash de 160 bits (40 caracteres hexadecimais).
* **SHA-256:** Hash seguro de 256 bits (64 caracteres hexadecimais). Padrão moderno de mercado.
* **SHA-512:** Hash altamente seguro de 512 bits (128 caracteres hexadecimais).

### 2. Processamento Local e Reatividade
* A geração do hash ocorre de forma assíncrona ou em tempo real enquanto o usuário digita a string na caixa de texto.
* Todo o cálculo criptográfico é realizado no lado do cliente (client-side) usando APIs de criptografia nativas do navegador (Web Crypto API) ou bibliotecas de hash seguras locais.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Hash SHA-256
* **Dado** que o usuário está na tela do Gerador de Hash
* **Quando** ele insere o texto `"devthru"` no campo de entrada
* **Então** o sistema deve calcular e exibir os hashes correspondentes, incluindo o campo SHA-256 contendo a string hexadecimal exata: `e4b0c20a109a96e5d6d8c368d40772f9d6c35c829e0839e4bd33fb0c4b2605e7`
* **E** habilitar o botão de cópia rápida correspondente.

---

## 🎨 Design & UX

* **Visualização Multialgoritmo:**
  * O texto original é digitado em uma caixa de entrada proeminente no topo.
  * Abaixo, uma lista estruturada de resultados disposta verticalmente exibe o nome do algoritmo (MD5, SHA-1, SHA-256, SHA-512) seguido pela string de hash correspondente em fonte monoespaçada com botão de cópia individual.
* **Segurança Visual:**
  * Badge explícito atestando que os dados digitados são mantidos seguros localmente no navegador, sem tráfego de rede ou gravação em banco de dados.
