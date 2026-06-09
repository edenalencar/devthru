# Conversor de Pixel (px) para REM

> [!NOTE]
> Ferramenta essencial de produtividade para desenvolvedores frontend e designers UI realizarem a conversão rápida de dimensões para folhas de estilo CSS, garantindo layouts fluidos e acessíveis.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Converte dimensões em Pixels (px) para unidades de medida REM e vice-versa, com base em um tamanho de fonte raiz (base) configurável.
* **Problema que resolve:** O desenvolvimento moderno exige o uso de REM para fins de acessibilidade (ajuste de zoom do navegador). A ferramenta elimina cálculos manuais dividindo/multiplicando por 16 e gera o snippet de código CSS pronto para uso.
* **Público-alvo:** Desenvolvedores frontend, web designers e especialistas em UI/UX.

---

## ⚙️ Regras de Negócio & Validações

### 1. Parâmetros e Fórmulas de Cálculo
* **Fonte Base (Base Root):** Tamanho da fonte padrão do elemento HTML principal (geralmente `16px`). Permite edição pelo usuário.
* **Conversão de PX para REM:**

$$\text{Valor em REM} = \frac{\text{Valor em PX}}{\text{Fonte Base}}$$

* **Conversão de REM para PX:**

$$\text{Valor em PX} = \text{Valor em REM} \times \text{Fonte Base}$$

### 2. Sincronização Reativa e Snippet CSS
* Os campos são bidirecionais e atualizam instantaneamente à medida que o usuário edita.
* A ferramenta gera um trecho de código CSS correspondente ao valor ativo para facilitar a cópia rápida (ex: `font-size: 1rem;` ou `padding: 1.25rem;`).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Converter PX para REM com Base Padrão (16px)
* **Dado** que o usuário está na tela do Conversor de Pixel para REM
* **Quando** ele define a Fonte Base como `16` e digita o valor `"20"` no campo **Pixel (px)**
* **Então** o sistema deve atualizar o campo **REM** com o valor `"1.25"`
* **E** gerar o snippet CSS de exemplo: `font-size: 1.25rem; /* 20px */`.

### Cenário 2: Alterar a Fonte Base Root
* **Dado** que o usuário está utilizando uma base personalizada de `10px`
* **Quando** ele digita `"15"` no campo **Pixel (px)**
* **Então** o sistema deve aplicar a nova base (`15 / 10`)
* **E** exibir o valor convertidos como `"1.5"` REM.

---

## 🎨 Design & UX

* **Campos Reativos Acoplados:**
  * O layout dispõe os campos Pixel, REM e Fonte Base lado a lado ou em grade limpa.
  * O snippet CSS de saída é exibido em uma caixa de código escura com botão de cópia de um clique.
* **Flexibilidade:**
  * O validador de input aceita decimais com pontos ou vírgulas, adaptando o separador numérico automaticamente para o padrão matemático.
