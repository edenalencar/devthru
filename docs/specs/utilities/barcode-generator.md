# Gerador de Código de Barras

> [!NOTE]
> Gera códigos EAN-13 e Code 128 em SVG e PNG, com cálculo do dígito verificador.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Renderiza um código de barras vetorial e permite ajustar altura, largura das barras e exibição do texto.
* **Problema que resolve:** Cria etiquetas e dados de teste para varejo e logística sem instalar software.
* **Público-alvo:** Desenvolvedores de sistemas de varejo, engenheiros de QA e equipes de logística.

---

## ⚙️ Regras de Negócio & Validações

### EAN-13
- **Entrada:** Caracteres não numéricos são removidos.
- **Doze dígitos:** O dígito verificador é calculado e anexado automaticamente.
- **Treze dígitos:** O último dígito precisa coincidir com o DV calculado.
- **Dígito verificador:** Algoritmo GS1, com pesos alternados 1 e 3. O DV completa a soma até o próximo múltiplo de 10.

### Code 128
- **Conjunto:** Subset B, com caracteres ASCII de 32 a 126.

### Exportação
- **Bloqueio:** Código inválido não pode ser baixado.
- **Arquivos:** SVG e PNG com fundo branco e escala 2x, nomeados como `barcode-<valor>`.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: EAN-13 completo
* **Dado** que o tipo selecionado é EAN-13
* **Quando** o usuário informa 13 dígitos com DV correto
* **Então** o sistema deve renderizar o código de barras

### Cenário 2: DV incorreto
* **Dado** que o tipo selecionado é EAN-13
* **Quando** o usuário informa 13 dígitos com DV incorreto
* **Então** o sistema deve sinalizar o código como inválido
* **E** bloquear o download

### Cenário 3: Correção automática do DV
* **Dado** uma entrada com 12 ou 13 dígitos
* **Quando** o usuário aciona o cálculo do DV
* **Então** o valor deve ser atualizado com o dígito correto
* **E** entradas com menos de 12 dígitos devem exibir um erro

### Cenário 4: Presets
* **Dado** que o usuário está na tela da ferramenta
* **Quando** ele escolhe um preset brasileiro (789 ou 790) ou de logística
* **Então** um código válido do tipo correspondente deve ser gerado

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** A tela abre com um EAN-13 válido, altura 90 e largura de barra 2.
  * **Sucesso:** Prévia atualizada a cada alteração.
* **Elementos Interativos:**
  * Seleção de tipo, ajustes de tamanho e alternância do texto.
  * Eventos `load_preset`, `download_svg` e `download_png` são enviados ao GTM.
