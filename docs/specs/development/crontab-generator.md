# Gerador de Expressões Cron (Crontab Generator)

> [!NOTE]
> Ferramenta essencial de produtividade para programadores e administradores de sistemas Linux criarem e compreenderem expressões de agendamento de tarefas em tempo de execução (Cron Jobs).

## 🎯 Visão Geral / Objetivo

* **O que faz:** Traduz configurações de agendamento visuais e intuitivas para a sintaxe padrão de 5 campos do Cron Linux, além de decodificar expressões cron existentes em linguagem natural explicativa.
* **Problema que resolve:** A sintaxe de agendamento do Crontab (`* * * * *`) é propensa a erros manuais e difícil de ler à primeira vista. A ferramenta elimina a ambiguidade permitindo parametrização visual e exibindo as próximas datas de execução projetadas.
* **Público-alvo:** Desenvolvedores backend, engenheiros de DevOps, administradores de sistemas (SysAdmins).

---

## ⚙️ Regras de Negócio & Validações

### 1. Estrutura Padrão da Expressão Cron (5 Campos)
A expressão gerada segue a especificação clássica do Linux:
* **Minuto (0 - 59):** Primeiro campo.
* **Hora (0 - 23):** Segundo campo.
* **Dia do Mês (1 - 31):** Terceiro campo.
* **Mês (1 - 12 ou nomes):** Quarto campo.
* **Dia da Semana (0 - 6, onde 0 é Domingo):** Quinto campo.

### 2. Tradução Bidirecional
* **Modo Visual para Código:** O usuário escolhe opções de tempo nos campos dropdown ou botões de seleção e a string da expressão cron é montada instantaneamente.
* **Modo Código para Tradução:** O usuário digita uma expressão cron diretamente (ex: `*/15 8-17 * * 1-5`) e o sistema gera a descrição traduzida: `"A cada 15 minutos, entre 08:00 e 17:59, de segunda a sexta-feira"`.

### 3. Projeção das Próximas Execuções
* A ferramenta deve listar as próximas 5 execuções calculadas com base na data/hora do sistema atual para conferência visual.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Cron de Agendamento Simples
* **Dado** que o usuário está na tela do Gerador de Cron
* **Quando** ele escolhe as opções visuais:
  * Minuto: `"A cada 5 minutos (*/5)"`
  * Hora: `"Toda hora (*)"`
  * Demais campos como todos/qualquer dia
* **Então** o sistema deve gerar e exibir a expressão cron correspondente: `*/5 * * * *`
* **E** traduzir textualmente: `"A cada 5 minutos"`.

### Cenário 2: Decodificar Expressão Cron Complexa
* **Dado** que o usuário digita uma expressão complexa no input de texto: `30 2 * * 0`
* **Quando** ele submete ou a alteração ocorre
* **Então** o sistema deve traduzir o significado na tela: `"Às 02:30, apenas no domingo"`
* **E** listar as datas correspondentes aos próximos 5 domingos às 02:30.

---

## 🎨 Design & UX

* **Interface de Configuração Dinâmica:**
  * Abas ou agrupamentos de inputs para parametrizar cada um dos cinco campos (Minuto, Hora, Dia, Mês, Dia da Semana) de forma fácil com controles de interface (sliders, select boxes).
  * Card em destaque exibindo a string da Expressão Cron gerada em fonte grande e monoespaçada com botão de cópia rápida.
* **Exibição de Execuções Futuras:**
  * Lista limpa indicando Dia da Semana, Data e Hora exata de cada uma das 5 próximas rodadas projetadas.
