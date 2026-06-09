# Depurador de JWT (JSON Web Token Debugger)

> [!NOTE]
> Ferramenta essencial de segurança e depuração para desenvolvedores web inspecionarem, decodificarem e validarem a integridade de JSON Web Tokens (JWT) localmente no navegador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Permite colar um JSON Web Token (JWT) e decodificar instantaneamente suas três partes (Header, Payload/Claims e Assinatura), formatando o conteúdo JSON interno de forma legível.
* **Problema que resolve:** Permite inspecionar informações de autenticação (como escopos, dados de usuário e expiração) contidas em tokens JWT sem a necessidade de enviar o token para servidores de terceiros, preservando a segurança das chaves privadas e dados corporativos.
* **Público-alvo:** Desenvolvedores backend, engenheiros de segurança (SecOps) e desenvolvedores frontend manipulando autenticação baseada em tokens.

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura e Decodificação do JWT
* Um token JWT válido possui três partes separadas por pontos (`.`): `Header.Payload.Signature`.
* A ferramenta deve decodificar o Header e o Payload a partir do formato **Base64URL** para texto JSON padrão.
* Se a string colada for inválida ou malformada (número incorreto de pontos, caracteres não-Base64), o sistema deve exibir uma mensagem clara indicando token inválido.

### 2. Seções Inspecionadas
* **Header (Cabeçalho):** Identifica o algoritmo de assinatura (ex: `HS256`, `RS256`) e o tipo de token (`JWT`).
* **Payload (Conteúdo):** Lista os Claims (declarações de dados, ex: `sub`, `name`, `exp`, `iat`).
* **Verificação de Expiração (exp):** O sistema deve analisar a claim `exp` (timestamp Unix) e exibir o status de expiração (se o token ainda é válido ou já expirou, junto com a data/hora local de expiração correspondente).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Decodificar JWT Válido
* **Dado** que o usuário está na tela do Depurador de JWT
* **Quando** ele cola um token válido de três blocos no campo de entrada
* **Então** o sistema deve decodificar as partes e exibir em painéis separados:
  * O **Header** em formato JSON formatado.
  * O **Payload** contendo as claims em formato JSON formatado.
* **E** exibir em destaque o tempo restante ou se o token já expirou de acordo com a claim `exp`.

### Cenário 2: Colar Token Malformado
* **Dado** que o usuário insere uma string inválida no campo (ex: `"token-sem-pontos"`)
* **Quando** o token é processado
* **Então** o sistema deve exibir uma mensagem informativa vermelha informando que a estrutura do token é inválida.

---

## 🎨 Design & UX

* **Visualização Lado a Lado (Split View):**
  * Campo de entrada de texto longo para colar o JWT à esquerda (ou acima em telas menores).
  * Painel de visualização decodificada à direita (ou abaixo), colorido para distinguir Header (geralmente vermelho/rosa), Payload (azul/roxo) e Assinatura (verde/azul).
* **Edição Interativa:**
  * O usuário pode alterar dados do Payload ou Header e o sistema atualiza ou indica que a assinatura correspondente foi alterada (ou invalida).
* **Segurança e Privacidade:**
  * Indicação explícita na tela informando que todo o processamento de decodificação ocorre localmente no navegador, garantindo que o token não é enviado pela rede.
