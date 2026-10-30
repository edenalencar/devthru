# Decodificador de Pix Copia e Cola

> [!NOTE]
> Lê um payload Pix no padrão EMV, confere o CRC16 e permite gerar uma nova versão com outro valor.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Extrai recebedor, cidade, chave, valor, txid e tipo de um código Pix Copia e Cola, e renderiza seu QR Code.
* **Problema que resolve:** Facilita depurar cobranças Pix e identificar payloads corrompidos.
* **Público-alvo:** Desenvolvedores de pagamentos, engenheiros de QA e equipes financeiras.

---

## ⚙️ Regras de Negócio & Validações

- **Prefixo:** O payload precisa começar com `000201`.
- **Parser TLV:** Cada campo tem tag de 2 caracteres, tamanho de 2 dígitos e valor.
- **Integridade:** A tag `63` é obrigatória. O CRC16-CCITT (polinômio `0x1021`, valor inicial `0xFFFF`) é calculado sobre todo o payload, exceto os 4 caracteres finais, e precisa coincidir com o informado.
- **Conta do recebedor:** A tag `26` é obrigatória. A subtag `01` traz a chave e a subtag `25` indica URL de Pix dinâmico.
- **Tipo:** Dinâmico quando a subtag `25` existe; estático nos demais casos.
- **Campos opcionais:** Sem as tags `59` e `60`, nome e cidade aparecem como não identificados. Sem a tag `54`, o valor é definido pelo pagador. O txid vem da subtag `05` da tag `62`.
- **Alteração de valor:** O novo valor precisa ser maior que zero. A tag `54` é substituída ou adicionada com 2 casas decimais, as tags são reordenadas e o CRC é recalculado.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Payload válido
* **Dado** que o usuário colou um Pix Copia e Cola íntegro
* **Quando** ele aciona a decodificação
* **Então** o sistema deve exibir os dados e o QR Code original

### Cenário 2: CRC divergente
* **Dado** um payload com caractere alterado
* **Quando** o usuário aciona a decodificação
* **Então** o sistema deve informar o erro de integridade com o CRC calculado e o informado

### Cenário 3: Estrutura inválida
* **Dado** uma entrada que não começa com `000201`
* **Quando** o usuário aciona a decodificação
* **Então** o sistema deve informar que a estrutura é inválida

### Cenário 4: Alteração de valor
* **Dado** um payload decodificado
* **Quando** o usuário informa um valor maior que zero e confirma
* **Então** o sistema deve gerar um novo payload com CRC válido e um novo QR Code

### Cenário 5: Valor inválido
* **Dado** um payload decodificado
* **Quando** o usuário informa zero, valor negativo ou texto
* **Então** o sistema deve recusar a alteração

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** Decodificar sem conteúdo pede que o usuário cole o código.
  * **Sucesso:** Dados decodificados com QR Code de 240 px.
  * **Erro:** Mensagem com a causa, incluindo os CRCs em caso de divergência.
* **Elementos Interativos:**
  * Cópia separada do código original e do editado.
