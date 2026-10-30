# Validador de Boleto Bancário

> [!NOTE]
> Valida linha digitável e código de barras de boletos de cobrança e de concessionárias, e extrai emissor, vencimento e valor.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Confere os dígitos verificadores de um boleto e decodifica seus dados, localmente.
* **Problema que resolve:** Permite testar fluxos de pagamento e identificar códigos digitados errado sem consultar um banco.
* **Público-alvo:** Desenvolvedores de sistemas financeiros, engenheiros de QA e analistas de contas a pagar.

---

## ⚙️ Regras de Negócio & Validações

- **Limpeza:** Caracteres não numéricos são removidos.
- **Tamanhos aceitos:** 47 dígitos (linha digitável de cobrança), 48 (concessionária) e 44 (código de barras). Outros tamanhos geram erro que informa a quantidade recebida.
- **Tipo do boleto:** Códigos iniciados em `8` são concessionária ou tributo. Os demais são cobrança.

### Cobrança
- **Campos:** Os três blocos da linha digitável são validados por Módulo 10.
- **DV geral:** Calculado por Módulo 11 sobre os 43 dígitos do código de barras reconstruído. Pesos de 2 a 9; resultados 0, 10 ou 11 viram 1.
- **Emissor:** Identificado pelos 3 primeiros dígitos. Códigos fora da tabela exibem `Banco não identificado`.
- **Vencimento:** Data-base de 07/10/1997 somada ao fator. Com fator menor que 1000, o boleto é tratado como sem vencimento.
- **Ciclo do fator:** O fator FEBRABAN estourou em 22/02/2025. Datas calculadas até esse limite exibem as duas interpretações possíveis (a segunda soma 9000 dias) e uma nota explicativa.
- **Valor:** Os 10 últimos dígitos da linha, em centavos.

### Concessionária
- **Critério do DV:** O 3º dígito define o cálculo: `8` ou `9` usa Módulo 11; os demais usam Módulo 10.
- **Blocos:** Quatro blocos de 11 dígitos, cada um com seu DV.
- **Segmento:** O 4º dígito define a categoria do emissor, como `3` para energia elétrica.
- **Valor:** Posições 5 a 15 do código de barras, em centavos.
- **Vencimento:** Exibido como variável, para consulta na fatura.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Boleto de cobrança válido
* **Dado** que o usuário informou uma linha digitável de 47 dígitos correta
* **Quando** ele aciona a validação
* **Então** o sistema deve exibir emissor, vencimento, valor e código de barras

### Cenário 2: Código de barras de 44 dígitos
* **Dado** que o usuário colou um código de barras
* **Quando** ele aciona a validação
* **Então** o sistema deve reconstruir os blocos e validar como cobrança ou concessionária

### Cenário 3: Bloco incorreto
* **Dado** uma linha digitável com um dígito alterado em um dos blocos
* **Quando** o usuário aciona a validação
* **Então** o sistema deve informar o erro de dígito verificador

### Cenário 4: Fatura de concessionária
* **Dado** um código de 48 dígitos iniciado em `8`
* **Quando** o usuário aciona a validação
* **Então** o sistema deve aplicar o módulo indicado pelo 3º dígito
* **E** exibir o segmento e o valor

### Cenário 5: Tamanho inválido
* **Dado** uma entrada com quantidade de dígitos fora do padrão
* **Quando** o usuário aciona a validação
* **Então** o sistema deve informar a quantidade recebida e os tamanhos esperados

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** Validar sem conteúdo pede que o usuário informe o código.
  * **Sucesso:** Dados decodificados e opção de copiar o código de barras.
  * **Erro:** Mensagem com a causa da falha, indicando o tipo do boleto quando conhecido.
