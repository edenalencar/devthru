# Conversor de Timestamp Unix (Epoch Converter)

> [!NOTE]
> Ferramenta essencial de tempo e data para desenvolvedores manipularem carimbos de data/hora no padrão Epoch Unix de forma bidirecional.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte números de Timestamp Unix (em segundos ou milissegundos) para datas legíveis formatadas em fuso horário local e UTC/GMT, e realiza a conversão reversa de datas para timestamps.
* **Problema que resolve:** Os computadores registram tempo como uma contagem inteira de segundos decorridos desde 1º de janeiro de 1970 (UTC). A ferramenta traduz instantaneamente essa contagem abstrata para formatos humanos compreensíveis, auxiliando na depuração de logs, bancos de dados e APIs.
* **Público-alvo:** Desenvolvedores backend, administradores de sistemas e analistas de dados.

---

## ⚙️ Regras de Negócio & Validações

### 1. Conversão Bidirecional
* **Timestamp para Data:**
  * O usuário insere um número inteiro de segundos (ex: 10 dígitos) ou milissegundos (ex: 13 dígitos).
  * O sistema detecta automaticamente a escala (segundos ou milissegundos) e calcula a data correspondente.
  * Devem ser exibidas duas saídas:
    * **Fuso Horário Local:** Formatado no padrão local do navegador do usuário.
    * **Fuso Horário UTC/GMT:** Horário de referência global coordenado.
* **Data para Timestamp:**
  * O usuário insere valores de data/hora por meio de um seletor (calendário e relógio).
  * O sistema calcula a contagem Epoch correspondente em segundos e milissegundos.

### 2. Ticker de Tempo Real
* A tela deve exibir um contador contínuo mostrando o Timestamp Unix atual atualizado a cada segundo, permitindo copiar o valor atual de forma instantânea.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Converter Timestamp de 10 Dígitos (Segundos)
* **Dado** que o usuário está na tela do Conversor de Timestamp
* **Quando** ele digita o valor `"1767225600"` (timestamp para 01/01/2026 UTC)
* **E** clica em "Converter"
* **Então** o sistema deve decodificar o valor
* **E** exibir o resultado em UTC como `"2026-01-01 00:00:00 UTC"`
* **E** exibir a correspondente data/hora local convertida para o fuso horário do usuário.

### Cenário 2: Converter Data Local para Unix Timestamp
* **Dado** que o usuário está na seção de conversão de data para timestamp
* **Quando** ele preenche a data como `01/01/2026` às `00:00:00`
* **E** clica em "Converter"
* **Então** o sistema deve retornar a contagem equivalente em segundos (`1767225600`) e em milissegundos (`1767225600000`).

---

## 🎨 Design & UX

* **Painel do Relógio Ativo:**
  * No topo da página, um card destacado mostra o timestamp Unix atual em tempo real com micro-animação de atualização e botão "Copiar Atual".
* **Interface Simples de Inputs:**
  * Formulários limpos com validação numérica, impedindo a inserção de letras nos campos de carimbo Epoch.
  * Resultados estruturados em uma lista contendo a data formatada, o fuso horário relativo e a descrição relativa (ex: "Em 3 anos").
