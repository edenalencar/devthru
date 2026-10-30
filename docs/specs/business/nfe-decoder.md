# Decodificador de Chave de Acesso SEFAZ

> [!NOTE]
> Decompõe uma chave de 44 dígitos de NF-e, NFC-e, CT-e ou MDF-e em seus campos e confere o dígito verificador, sem consultar a SEFAZ.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Extrai UF, ano/mês, CNPJ do emitente, modelo, série, número, tipo de emissão e código numérico de uma chave de acesso.
* **Problema que resolve:** Evita a leitura manual de uma chave posicional ao depurar integrações fiscais e ao investigar rejeições.
* **Público-alvo:** Desenvolvedores de ERPs, analistas fiscais e engenheiros de QA.

---

## ⚙️ Regras de Negócio & Validações

- **Limpeza:** Todo caractere não numérico é removido antes da análise.
- **Tamanho mínimo:** Com menos de 43 dígitos a chave não é decodificada (`decodeSefazKey` retorna `null`).
- **Layout posicional:** `cUF`(2), `AAMM`(4), `CNPJ`(14), `mod`(2), `serie`(3), `nNF`(9), `tpEmis`(1), `cNF`(8) e `cDV`(1).
- **Dígito verificador (Módulo 11):** Pesos de 2 a 9 aplicados da direita para a esquerda sobre os 43 primeiros dígitos. Se o resto for 0 ou 1, o DV é 0; caso contrário, é `11 - resto`.
- **Chave de 43 dígitos:** O DV é calculado e exibido, mas a chave não é considerada válida (`isValidLength` e `isValidDv` são falsos).
- **Códigos desconhecidos:** UF, modelo e tipo de emissão fora das tabelas recebem um rótulo genérico, como `Modelo 99`, sem interromper a decodificação.
- **Processamento local:** A chave não é enviada a nenhum servidor.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Chave válida
* **Dado** que o usuário está na tela da ferramenta
* **Quando** ele informa uma chave de 44 dígitos com DV correto
* **Então** o sistema deve exibir todos os campos decodificados
* **E** indicar que o dígito verificador confere

### Cenário 2: Dígito verificador incorreto
* **Dado** que o usuário informa uma chave de 44 dígitos
* **Quando** o último dígito difere do DV calculado
* **Então** o sistema deve manter os campos decodificados
* **E** sinalizar a chave como inválida, informando o DV calculado

### Cenário 3: Chave incompleta
* **Dado** que o usuário está digitando a chave
* **Quando** a entrada tem menos de 43 dígitos
* **Então** nenhum resultado deve ser exibido

### Cenário 4: Exemplos de teste
* **Dado** que o usuário está na tela da ferramenta
* **Quando** ele escolhe um exemplo de NF-e, NFC-e, CT-e ou MDF-e
* **Então** a chave correspondente deve ser carregada e decodificada

---

## 🎨 Design & UX

* **Estados do Formulário:**
  * **Vazio / Inicial:** Campo vazio com exemplos prontos para carregar.
  * **Sucesso:** Campos decodificados com indicação visual do resultado do DV.
* **Elementos Interativos:**
  * A decodificação acontece enquanto o usuário digita.
  * Botões para limpar a entrada e copiar os valores.
  * O evento `decode_key` é enviado ao GTM quando a chave tem 44 dígitos.
