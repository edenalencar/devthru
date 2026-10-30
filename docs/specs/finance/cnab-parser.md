# Leitor e Decodificador de CNAB

> [!NOTE]
> Inspeciona arquivos posicionais de remessa e retorno CNAB 240 e 400 no navegador, sem envio ao servidor.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Detecta o padrão do arquivo, identifica o banco e classifica cada linha por tipo de registro.
* **Problema que resolve:** Torna legível um arquivo posicional e aponta linhas fora do tamanho esperado.
* **Público-alvo:** Desenvolvedores de integrações bancárias, analistas financeiros e engenheiros de QA.

---

## ⚙️ Regras de Negócio & Validações

- **Entrada:** Texto colado ou arquivo `.rem`, `.ret` ou `.txt`, lido com codificação `latin1`.
- **Linhas:** Separadas por `\n` ou `\r\n`. Linhas vazias são descartadas.
- **Detecção do padrão:** Feita pelo tamanho da primeira linha: 240 ou 400 colunas.
- **Banco:** Colunas 1 a 3 no CNAB 240 e 77 a 79 no CNAB 400. Códigos fora da tabela aparecem como `Banco Código XXX`.
- **Tipo de registro no CNAB 240:** Coluna 8: `0` header de arquivo, `1` header de lote, `3` detalhe com segmento da coluna 14, `5` trailer de lote e `9` trailer de arquivo.
- **Tipo de registro no CNAB 400:** Coluna 1: `0` header, `1` detalhe e `9` trailer.
- **Ocorrência no CNAB 400:** Em detalhes, as colunas 109 e 110 são traduzidas quando estão na tabela, como `06` para liquidação.
- **Validação de tamanho:** Toda linha com tamanho diferente de 240 e 400 é contada como fora do padrão.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Arquivo CNAB 240
* **Dado** que o usuário carregou um arquivo com linhas de 240 colunas
* **Quando** o conteúdo é lido
* **Então** o sistema deve exibir o padrão, o banco e o tipo de cada linha

### Cenário 2: Retorno CNAB 400 com liquidação
* **Dado** um detalhe com ocorrência `06`
* **Quando** o conteúdo é lido
* **Então** a linha deve ser rotulada como "Liquidação (Título Pago)"

### Cenário 3: Linha fora do padrão
* **Dado** um arquivo com uma linha de tamanho incorreto
* **Quando** o conteúdo é lido
* **Então** o resumo deve contar a linha como fora do padrão
* **E** a linha deve ser destacada com o tamanho encontrado

### Cenário 4: Exemplos
* **Dado** que o usuário está na tela da ferramenta
* **Quando** ele escolhe "Exemplo CNAB 240" ou "Exemplo CNAB 400"
* **Então** um arquivo fictício deve ser carregado e inspecionado

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** Área de texto com placeholder e sem resumo.
  * **Sucesso:** Três cartões com padrão, banco e validação de tamanho, seguidos da inspeção por linha.
  * **Erro:** Linhas inválidas recebem borda de erro.
* **Elementos Interativos:**
  * A análise acontece enquanto o usuário digita ou cola.
  * Ações de subir arquivo e copiar o conteúdo.
  * Eventos `generate_result` e `copy_result` são enviados ao GTM.
