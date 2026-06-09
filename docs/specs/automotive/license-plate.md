# Gerador e Validador de Placa de Veículo

> [!NOTE]
> Ferramenta utilitária essencial para homologação de sistemas de trânsito, estacionamento, portarias e controle de frotas, com suporte ao padrão cinza e ao novo padrão Mercosul.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera e valida placas de veículos brasileiros de acordo com os padrões vigentes e realiza conversão direta entre eles.
* **Problema que resolve:** Permite obter placas válidas para testes de integração com leitores ópticos de caracteres (OCR/LPR), sistemas de pedágio e estacionamento sem expor placas reais de proprietários.
* **Público-alvo:** Desenvolvedores de sistemas de controle veicular, segurança patrimonial, automação de estacionamento e QAs.

---

## ⚙️ Regras de Negócio & Validações

### 1. Padrões Suportados
* **Padrão Nacional Antigo (Cinza):** Formato `LLL-NNNN` (onde `L` é Letra de A a Z e `N` é Número de 0 a 9). Possui hífen separador na 4ª posição.
* **Padrão Mercosul Novo:** Formato `LLLNNDN` (onde `L` é Letra, `N` é Número, e `D` é uma Letra representando o dígito convertido). Não possui hífen.

### 2. Conversão da Placa Antiga para Mercosul (Tabela de Conversão)
O segundo dígito numérico da placa antiga (5ª posição) é substituído por uma letra correspondente na placa Mercosul:
* `0` vira `A` | `1` vira `B` | `2` vira `C` | `3` vira `D` | `4` vira `E`
* `5` vira `F` | `6` vira `G` | `7` vira `H` | `8` vira `I` | `9` vira `J`

*Exemplo:* A placa antiga `ABC-1234` convertida para Mercosul vira `ABC1C34` (o `2` na 5ª posição virou `C`).

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Gerar Placa Mercosul Válida
* **Dado** que o usuário está na tela do Gerador de Placas
* **Quando** ele escolhe o padrão "Mercosul"
* **E** clica em "Gerar Placa"
* **Então** o sistema deve retornar uma placa com 7 caracteres contendo letras e números na sequência correta (ex: `ABC1C34`)
* **E** disponibilizar o botão de cópia rápida.

### Cenário 2: Converter Placa Cinza para Mercosul
* **Dado** que o usuário tem uma placa do padrão antigo (ex: `XYZ-5678`)
* **Quando** ele insere no campo de conversão e aciona a conversão
* **Então** o sistema deve substituir o dígito `6` pela letra `G` correspondente
* **E** retornar o código Mercosul resultante como `XYZ5G78`.

### Cenário 3: Validar Placa
* **Dado** que o usuário digita uma placa válida (seja no formato antigo ou no padrão Mercosul)
* **Quando** ele clica no botão "Validar"
* **Então** o sistema deve confirmar o formato e exibir um aviso de sucesso verde "Placa Válida".

---

## 🎨 Design & UX

* **Visualização Realista da Placa:**
  * O resultado gerado é exibido dentro de uma representação visual de uma placa física:
    * **Placa Mercosul:** Fundo branco com cabeçalho azul e bandeira do Brasil.
    * **Placa Antiga:** Fundo cinza escuro com o nome do município/estado fictício no topo.
* **Massa de Testes (Bulk Mode):**
  * Aba de geração em massa para criar dezenas de placas simultaneamente (ideal para testadores de OCR/LPR alimentarem pastas de imagem).
