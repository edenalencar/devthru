# Gerador de CEP

> [!NOTE]
> Gera CEPs dentro da faixa oficial dos Correios de cada estado e identifica a UF de qualquer CEP pelo prefixo.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera de 1 a 100 CEPs válidos para a UF escolhida (ou aleatória), com ou sem hífen, e consulta a UF de um CEP digitado.
* **Problema que resolve:** Testes de formulários e regras que dependem do estado (frete, impostos, cadastro) precisam de CEPs coerentes com a UF; CEPs totalmente aleatórios falham nessas validações.
* **Público-alvo:** Desenvolvedores, QA e analistas que testam cadastros e cálculos por região.

---

## ⚙️ Regras de Negócio & Validações

Lógica em `lib/utils/generators/cep.ts`.

### 1. Faixas por UF (`CEP_RANGES`)
* Prefixos de 5 dígitos por estado, cobrindo de `01000` a `99999` sem lacunas nem sobreposição (verificado em teste).
* Estados com mais de uma faixa: AM (`69000–69299`, `69400–69899`), DF (`70000–72799`, `73000–73699`), GO (`72800–72999`, `73700–76799`) e RO (`76800–76999`, `78900–78999`).

### 2. Geração (`generateCep`)
* Prefixo sorteado de forma uniforme entre todas as faixas da UF.
* Sufixo de `000` a `899` (`900–999` são CEPs especiais: Caixas Postais e grandes usuários).
* Formato `00000-000` ou `00000000`.

### 3. Capitais (`generateCepForCity`)
* Usado pelo gerador de endereço e de pessoa: quando a cidade é uma capital conhecida, o CEP sai da faixa da capital (ex.: Porto Alegre `90000–91999`); senão, da faixa da UF.

### 4. Consulta (`findUfByCep`)
* Aceita com ou sem hífen. Retorna a UF ou `null` se não tiver 8 dígitos ou estiver fora das faixas (ex.: `00500-000`).

### Limites
* O CEP é válido para a UF, mas não garante que o logradouro exista.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: CEP de um estado
* **Dado** que o usuário escolheu "São Paulo (SP)"
* **Quando** clica em "Gerar CEP"
* **Então** o CEP gerado começa entre `01000` e `19999` e tem sufixo menor que `900`

### Cenário 2: Consulta de UF
* **Quando** o usuário digita `78900-000` em "Descobrir o estado de um CEP"
* **Então** o sistema mostra "Rondônia (RO)"

### Cenário 3: CEP fora das faixas
* **Quando** digita `00500-000`
* **Então** o sistema mostra "Este CEP está fora das faixas dos Correios."

---

## 🎨 Design & UX

* **Layout:** dois cards (gerar e consultar) lado a lado no desktop e empilhados no celular; abaixo, a tabela com as faixas de todos os estados.
* **Estado inicial:** um CEP de SP gerado no carregamento (só no cliente, para evitar erro de hidratação).
* **Resultado:** CEP único em fonte grande; vários CEPs um por linha; botão "Copiar".
* **Testes:** `__tests__/cep-nick.test.ts`.
