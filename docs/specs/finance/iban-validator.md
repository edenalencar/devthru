# Validador e Gerador de IBAN (International Bank Account Number)

> [!NOTE]
> Ferramenta essencial para testar integrações bancárias globais, permitindo validar e gerar em lote códigos IBAN matematicamente corretos seguindo a especificação ISO 7064.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Permite que desenvolvedores validem e gerem códigos IBAN matematicamente corretos com cálculo do dígito verificador. Oferece suporte a múltiplos países e geração em lote para testes automatizados.
* **Problema que resolve:** Facilita a criação de dados de teste bancários internacionais e validação estrutural sem a necessidade de realizar consultas ativas à rede bancária (evitando riscos de segurança e custos).
* **Público-alvo:** Engenheiros de software que trabalham com sistemas de pagamento internacional, analistas de QA e desenvolvedores web em geral.

---

## ⚙️ Regras de Negócio & Validações

### 1. Algoritmo de Validação (Mod 97)
A validação segue o padrão internacional **ISO 7064 (Modulo 97-10)**:
1. Limpar a entrada removendo espaços em branco, hifens e convertendo tudo para caixa alta.
2. O código limpo deve ter no mínimo 5 caracteres (tamanho mínimo estrutural de um IBAN).
3. Mover os 4 primeiros caracteres (os dois do código do país + os dois dígitos verificadores) para o final do código.
4. Converter todas as letras em valores numéricos correspondentes (`A = 10`, `B = 11`, ..., `Z = 35`).
5. Calcular o resto da divisão do número resultante por 97 (`número % 97`).
6. Se o resto for exatamente igual a **1**, o IBAN é considerado **válido**. Caso contrário, é inválido.

### 2. Regras de Geração
* O IBAN gerado deve ser matematicamente válido (checksum correto).
* Deve suportar a estrutura específica de países selecionados. Países suportados inicialmente:
  * **Brasil (BR):** 29 caracteres alfanuméricos.
  * **Alemanha (DE):** 22 caracteres.
  * **França (FR):** 27 caracteres.
  * **Reino Unido (GB):** 22 caracteres.
  * **Portugal (PT):** 25 caracteres.
  * **Espanha (ES):** 24 caracteres.

### 3. Geração em Massa
* A geração em lote (massa) deve respeitar os limites de plano do usuário logado (usuários Pro possuem limites maiores ou ilimitados; usuários gratuitos possuem limite básico).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Validação de IBAN Correto
* **Dado** que o usuário está na tela do Validador de IBAN e com a aba "Gerar Único" ativa
* **Quando** ele insere um IBAN matematicamente válido no campo de validação (ex: `BR90...` correto)
* **E** clica no botão "Validar"
* **Então** o sistema deve exibir um card de sucesso com a mensagem "IBAN Válido" e um ícone verde de confirmação
* **E** informar que o checksum está correto.

### Cenário 2: Validação de IBAN Incorreto
* **Dado** que o usuário está na tela do Validador de IBAN
* **Quando** ele insere um código inválido ou malformado
* **E** clica no botão "Validar"
* **Então** o sistema deve exibir um card de alerta com a mensagem "IBAN Inválido" e um ícone vermelho de erro.

### Cenário 3: Geração de IBAN de Teste Único
* **Dado** que o usuário está na tela de Geração de IBAN
* **Quando** ele seleciona um país (ex: "Brasil (BR)")
* **E** clica no botão "Gerar IBAN"
* **Então** o sistema deve gerar um código IBAN compatível com o formato brasileiro
* **E** exibir o resultado formatado em blocos legíveis
* **E** oferecer opções para copiar o código gerado com um único clique.

### Cenário 4: Geração em Massa para Testes
* **Dado** que o usuário está na aba "Gerar em Massa"
* **Quando** ele define a quantidade desejada dentro de seus limites de plano
* **E** escolhe o país e clica em gerar
* **Então** o sistema deve listar os IBANs gerados em lote em uma área de texto
* **E** permitir a exportação ou cópia rápida de toda a lista gerada.

---

## 🎨 Design & UX

* **Estrutura de Abas:**
  * Duas abas de nível superior: "Gerar Único" (que engloba o gerador simples e o validador lado a lado) e "Gerar em Massa".
* **Formatação de Exibição:**
  * O input do validador converte automaticamente letras para caixa alta e utiliza fonte monoespaçada (`font-mono`) para melhor legibilidade estrutural.
  * O resultado gerado deve ser formatado em agrupamentos de 4 caracteres separados por espaço (ex: `BR90 0011 2233...`).
* **Mensagens e Feedbacks Visuais:**
  * Caixa de resultado de validação com bordas suaves: verde para sucesso (`text-accent`) e vermelha para erro (`text-destructive`).
  * Tooltip ou toast de confirmação rápida "Copiado!" ao clicar no botão de copiar.
* **Componente FAQ e Exemplos:**
  * Sanfona de acordeão com perguntas frequentes na base da página.
  * Aba interna com exemplos de código em JavaScript, Python, C# e Java demonstrando como aplicar a validação Mod 97 programaticamente.
