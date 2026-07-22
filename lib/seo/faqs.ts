// Esse arquivo foi gerado automaticamente pelo script scripts/extract-faqs.js

export interface FAQItem {
    question: string;
    answer: string;
}

export const TOOL_FAQS: Record<string, FAQItem[]> = {
    "chassi": [
        {
            "question": "O que é o Chassi do Veículo (Código VIN)?",
            "answer": "O número de chassi, também conhecido como VIN (Vehicle Identification Number), é um código único de 17 caracteres que identifica cada veículo fabricado no mundo. É como se fosse o \"CPF\" ou RG do veículo. Estrutura do VIN: WMI (1-3): Identificador do fabricante mundial (World Manufacturer Identifier). VDS (4-9): Seção descritiva do veículo (modelo, motor, tipo de carroceria). VIS (10-17): Seção indicadora do veículo (ano de fabricação, código da planta fabril e número de série)."
        },
        {
            "question": "É possível gerar um chassi fictício válido?",
            "answer": "Sim. O nosso **gerador de chassi de veículos** utiliza a regra matemática e o padrão internacional ISO 3779 para criar um código com 17 dígitos onde o nono dígito (dígito verificador) é precisamente calculado com base em pesos pré-definidos. Dessa forma, você obtém um chassi fictício, porém estruturalmente idêntico e válido para passar pelas validações de formulários de software e banco de dados."
        },
        {
            "question": "Como usar este gerador de chassi para testes de software?",
            "answer": "Para desenvolvedores, QAs (Analistas de Qualidade) e equipes de TI, testar formulários de cadastro de frotas de ERPs, seguradoras e sistemas automotivos exige dados em formato realista. Basta clicar no botão **\"Gerar Chassi\"** (ou utilizar a aba **\"Geração em Lote\"** para obter múltiplos códigos) e copiar o código de 17 caracteres oferecido. Nós aplicamos cálculos para garantir que softwares de validação de concessionárias e detrans o validem corretamente nos testes de homologação."
        },
        {
            "question": "Por que as letras I, O e Q não são permitidas no número de chassi (VIN)?",
            "answer": "De acordo com a norma internacional ISO 3779, as letras I (i), O (o) e Q (q) são estritamente proibidas em qualquer número de chassi. Essa restrição existe para evitar fraudes e erros de leitura humana ou de escaneamento ótico (OCR), pois a letra I pode ser facilmente confundida com o número 1, e as letras O e Q com o número 0. Nosso gerador de chassi segue rigorosamente essa especificação internacional."
        },
        {
            "question": "Como o chassi de moto se diferencia do de carro?",
            "answer": "A principal diferença está no código WMI (os 3 primeiros dígitos do VIN). No Brasil: Carros: Normalmente utilizam WMIs como `9BW` (Volkswagen), `9BD` (Fiat) ou `9BG` (General Motors). Motos: Frequentemente utilizam o prefixo `9C` (como `9C2` para Honda e `9CD` para Yamaha). Ambos os tipos de veículos seguem a mesma regra matemática de verificação no 9º dígito. Nosso gerador permite selecionar a categoria específica do veículo para trazer mais realismo às suas simulações de homologação."
        }
    ],
    "renavam": [
        {
            "question": "Como funciona o cálculo do dígito verificador do RENAVAM?",
            "answer": "O RENAVAM possui 11 dígitos. Os primeiros 10 dígitos representam o número identificador e o 11º dígito é o Dígito Verificador (DV). O DV é calculado utilizando uma variante do algoritmo de módulo 11, multiplicando os dígitos de trás para frente pelos pesos de 2 a 9 e reiniciando a sequência em 2. A soma dessas multiplicações é multiplicada por 10 e depois dividida por 11. O resto é o dígito verificador. Se o resto for maior ou igual a 10, assume-se o dígito verificador como 0."
        },
        {
            "question": "Para que serve o RENAVAM de teste?",
            "answer": "Ele é amplamente utilizado por desenvolvedores de software, analistas de qualidade (QA) e engenheiros de sistemas para validar campos cadastrais em ERPs, sistemas de transportes, multas e faturamento automotivo, evitando o uso de dados de veículos reais."
        }
    ],
    "nfe-generator": [
        {
            "question": "Como testar a chave de acesso em ambiente de homologação?",
            "answer": "Ao preencher formulários do seu sistema emissor de nota ou portal do ERP em ambiente de homologação, insira a chave com 44 dígitos numéricos gerada nesta ferramenta. Nós garantimos que o cálculo do último algarismo (o dígito verificador - DV) esteja 100% correto de acordo com a base de regras e documentação técnica da Secretaria de Estado da Fazenda (SEFAZ), garantindo aprovação em rotinas de verificação local do seu software."
        },
        {
            "question": "Qual a diferença do Modelo 55 (NF-e) e 65 (NFC-e)?",
            "answer": "A estrutura de uma chave de 44 posições suporta a identificação do modelo da nota inserida (do pŕoximo ao centro da chave): Modelo 55 (NF-e): É a Nota Fiscal Eletrônica tradicional, comummente utilizada em vendas B2B e envio por transportadoras. Modelo 65 (NFC-e): É a Nota Fiscal de Consumidor Eletrônica, focada no varejo presencial B2C e transações diárias (o antigo cupom fiscal). Nossa ferramenta permite gerar livremente qualquer um dos dois modelos, ajustando a estrutura de 44 dígitos instantaneamente."
        },
        {
            "question": "A chave de acesso gerada é verdadeira?",
            "answer": "Não. A chave é válida formatando-se do ponto de vista matemático, contendo um dígito verificador calculado. Contudo, ela é composta de numeração fictícia e aleatória e não possui validade tributária ou legal na base de dados receptora da SEFAZ na produção. Ela serve estritamente para simulação em rotinas de teste."
        }
    ],
    "base": [
        {
            "question": "O que são bases numéricas (Base 2, 8, 10, 16)?",
            "answer": "Bases numéricas (ou sistemas de numeração) representam a quantidade de símbolos distintos utilizados para expressar valores numéricos. Na computação, as principais bases são a Binária (base 2 - usa apenas 0 e 1), Octal (base 8 - dígitos de 0 a 7), Decimal (base 10 - sistema tradicional do dia a dia de 0 a 9) e Hexadecimal (base 16 - inclui letras de A a F para representar valores de 10 a 15)."
        },
        {
            "question": "Como funciona a conversão manual de decimal para binário ou hexadecimal?",
            "answer": "Para converter manualmente um número Decimal para outra base, realizamos divisões sucessivas pelo número da base desejada (2 para binário, 16 para hexadecimal) até obter quociente zero. O resultado é composto pelos restos dessas divisões lidos de trás para frente. Para o hexadecimal, os valores de 10 a 15 são mapeados para as letras A a F, respectivamente."
        },
        {
            "question": "Esta ferramenta suporta números muito grandes ou negativos?",
            "answer": "Esta ferramenta online é projetada especificamente para conversões rápidas de números inteiros positivos e não-negativos. Para números que excedem os limites padrão de precisão de inteiros do JavaScript, recomendamos o uso de tipos de dados dedicados no seu código backend (como BigInt em JS/Python, ou BigInteger em Java/C#)."
        }
    ],
    "unit": [
        {
            "question": "Como converter unidades usando esta ferramenta?",
            "answer": "Basta selecionar a aba correspondente à categoria da grandeza (como Peso ou Temperatura), definir a unidade de origem no campo \"De\" e a de destino no campo \"Para\". O cálculo é exibido instantaneamente à medida que você insere os valores."
        },
        {
            "question": "Quais unidades de comprimento posso converter?",
            "answer": "Nosso sistema suporta a conversão de diversas unidades de comprimento, abrangendo desde o sistema métrico (metros, quilômetros, centímetros e milímetros) até o sistema imperial (milhas, jardas, pés e polegadas), facilitando o trabalho em projetos de engenharia ou desenvolvimento global."
        },
        {
            "question": "Como é garantida a precisão da conversão de unidades?",
            "answer": "Todas as operações para converter unidades utilizam fatores de conversão baseados nos padrões internacionais de pesos e medidas do SI (Sistema Internacional de Unidades), garantindo cálculos precisos para o seu dia a dia profissional."
        }
    ],
    "jwt-debugger": [
        {
            "question": "O que é um JSON Web Token (JWT) e sua estrutura?",
            "answer": "Um JWT é um padrão aberto (RFC 7519) usado para transmitir de forma segura informações estruturadas como um objeto JSON. Ele é composto por três partes separadas por pontos (.): Header (indica o algoritmo de criptografia e tipo de token), Payload (dados do usuário e metadados de sessão, conhecidos como claims) e Signature (garante que o token não foi adulterado)."
        },
        {
            "question": "Como funciona a decodificação local e qual a garantia de privacidade?",
            "answer": "Nesta ferramenta, toda a decodificação é feita diretamente no navegador utilizando JavaScript local (`atob` e `jwt-decode`). Seu token nunca é enviado ou transmitido para servidores de terceiros, o que garante 100% de privacidade para inspecionar payloads de teste e tokens de APIs em desenvolvimento."
        },
        {
            "question": "Por que a assinatura (Signature) não é validada aqui?",
            "answer": "Para verificar a assinatura de um token criptografado simetricamente (como HS256), seria necessário que você inserisse a sua chave secreta (secret key) no navegador. Inserir chaves privadas em ferramentas web terceiras é uma prática de alto risco de segurança. Por esse motivo, limitamos a depuração à visualização do Header e Payload, mantendo o processo seguro."
        }
    ],
    "regex": [
        {
            "question": "Qual a diferença entre os seletores `.+` e `.*` no Regex?",
            "answer": "Ambos são quantificadores usados combinando o caractere ponto (. - que representa qualquer caractere) com um quantificador de repetição: .+ (Um ou mais): O sinal de adição (+) exige que ocorra pelo menos um caractere correspondente. A busca falhará se a linha estiver vazia. .* (Zero ou mais): O asterisco (*) permite que ocorra qualquer quantidade de caracteres correspondentes, incluindo **nenhuma** (zero). Ele corresponderá a linhas vazias."
        },
        {
            "question": "O que fazem as flags `g`, `i` e `m` no Regex?",
            "answer": "g (Global): Procura todas as correspondências no texto de entrada em vez de parar após encontrar a primeira ocorrência. i (Case Insensitive): Ignora a diferença entre letras maiúsculas e minúsculas durante a busca (ex: /abc/i encontrará \"ABC\"). m (Multiline): Faz com que os caracteres de início (^) e fim ($) correspondam ao início e fim de cada linha individual do texto, e não apenas ao início e fim do texto completo."
        }
    ],
    "cnpj": [
        {
            "question": "Para que serve um gerador de CNPJ?",
            "answer": "Ele é utilizado por programadores, testadores e analistas de qualidade (QA) para preencher campos obrigatórios de CNPJ de forma ágil em ambientes de testes e homologação local, sem expor dados reais de empresas."
        },
        {
            "question": "O que é o CNPJ Alfanumérico?",
            "answer": "Devido ao esgotamento das combinações puramente numéricas, a Receita Federal do Brasil implementou uma nova regra que permite a inserção de letras de A a Z nas primeiras 8 posições do CNPJ (mantendo apenas números nas posições de ordem e dígitos verificadores). Se você está testando integrações modernas, nosso gerador permite gerar este novo cnpj alfanumérico, garantindo a validação de um cnpj válido em sistemas atualizados."
        },
        {
            "question": "Qual a diferença entre CNPJ Matriz e Filial?",
            "answer": "O CNPJ possui 14 dígitos. Os dígitos da 9ª à 12ª posição (logo após a barra) identificam a ordem do estabelecimento. A matriz de uma empresa sempre possui o código de ordem `0001` (ex: `/0001-xx`). As filiais da mesma empresa possuem ordens subsequentes como `0002`, `0003` e assim por diante. Nosso gerador permite selecionar explicitamente se você deseja obter um CNPJ de matriz ou filial para seus cenários de teste de faturamento."
        },
        {
            "question": "Por que gerar um CNPJ inválido?",
            "answer": "Ao construir formulários e integrações de APIs, é fundamental validar se o sistema rejeita corretamente dados corrompidos. Com a nossa ferramenta, você pode gerar um CNPJ inválido estruturalmente (com dígitos verificadores incorretos) para testar os caminhos de erro das suas validações e garantir a blindagem do seu código."
        },
        {
            "question": "Como é feito o cálculo do dígito verificador do CNPJ?",
            "answer": "O CNPJ possui 14 dígitos, onde os dígitos 13 e 14 são os verificadores. O cálculo utiliza um módulo matemático com pesos específicos aplicados aos 12 primeiros caracteres. Na versão alfanumérica, as letras são convertidas para seus valores numéricos correspondentes (ASCII - 48)."
        },
        {
            "question": "Como validar o CNPJ Alfanumérico em Java, Python ou JavaScript?",
            "answer": "De acordo com a norma da Receita Federal, a validação do CNPJ alfanumérico mantém os mesmos pesos do cálculo tradicional. A única diferença é a conversão das letras nas 12 primeiras posições para números, utilizando a fórmula Valor = Código ASCII do caractere - 48. Nossos exemplos de código abaixo (em Java, Python, JavaScript e C#) já contemplam essa regra de forma otimizada. Por exemplo, em Java/C#, a conversão é feita nativamente subtraindo o char de '0' (ou ASCII 48), garantindo que tanto números ('0' a '9') quanto letras ('A' a 'Z') tenham os valores corretos."
        }
    ],
    "cpf": [
        {
            "question": "Para que serve um gerador de CPF?",
            "answer": "Nossa ferramenta fornece CPFs válidos instantaneamente para preenchimento de formulários de cadastro em sistemas em fase de testes (QA) ou desenvolvimento local. Isso impede a utilização de dados reais de pessoas físicas durante o ciclo de homologação do software."
        },
        {
            "question": "É possível gerar CPF de um estado/região específico?",
            "answer": "Sim! No Brasil, o nono dígito do CPF (o número que antecede o traço e os dois dígitos verificadores) indica a Região Fiscal onde o CPF foi emitido. Por exemplo, CPFs emitidos em São Paulo (SP) possuem o nono dígito igual a 8, enquanto no rio de janeiro (RJ) e Espírito Santo (ES) possuem o nono dígito igual a 7. Selecionando o estado no nosso gerador, você obtém códigos válidos simulando a emissão daquela região fiscal específica. Veja a tabela de correspondência completa das Regiões Fiscais do CPF: Nono Dígito Estados / Região Fiscal 1 Distrito federal goiás mato grosso, distrito federal goiás mato, mato grosso do sul, sul e tocantins (DF, GO, MS, MT, TO) 2 amazonas acre amapá rondônia, amapá rondônia e roraima, Pará e Acre (AC, AM, AP, PA, RO, RR) 3 Ceará, Maranhão e Piauí (CE, MA, PI) 4 Alagoas, Paraíba, Pernambuco e grande do norte paraíba, norte paraíba e alagoas, pernambuco rio grande do norte (AL, PB, PE, RN) 5 Bahia e Sergipe (BA, SE) 6 Minas Gerais (MG) 7 Espírito Santo e rio de janeiro (ES, RJ) 8 São Paulo (SP) 9 Paraná e Santa Catarina (PR, SC) 0 rio grande do sul, ou seja, 0 rio grande do sul (RS)"
        },
        {
            "question": "Por que gerar um CPF inválido?",
            "answer": "Durante o desenvolvimento de validações de formulários e APIs, é essencial verificar se o seu sistema rejeita de forma correta dados errados ou corrompidos. Com a nossa ferramenta, você pode gerar um CPF inválido matematicamente (com dígitos verificadores incorretos) para rodar testes negativos no fluxo da sua aplicação."
        },
        {
            "question": "Como funciona o cálculo do dígito verificador do CPF?",
            "answer": "O CPF possui 11 dígitos, sendo os dois últimos os dígitos verificadores (DV1 e DV2). Eles são calculados por meio de uma operação matemática (\"módulo 11\") com pesos decrescentes baseados nos 9 dígitos iniciais. Nosso gerador calcula esses dígitos automaticamente segundo as regras oficiais da Receita Federal."
        }
    ],
    "inscricao-estadual": [
        {
            "question": "Qual a diferença de CPF, CNPJ e Inscrição Estadual?",
            "answer": "Enquanto o CPF (Cadastro de Pessoas Físicas) é civil e o CNPJ (Cadastro Nacional da Pessoa Jurídica) é o registro principal da empresa na Receita Federal, a Inscrição Estadual (IE) é exclusividade do sistema tributário estadual. A IE é fornecida pela Sefaz (Secretaria de Estado da Fazenda) e serve como registro no cadastro do ICMS. Se seu software lida com emissão de notas fiscais (NF-e/NFC-e), o validador de IE se torna obrigatório."
        },
        {
            "question": "A Inscrição Estadual gerada aqui é vinculada à Sefaz?",
            "answer": "Completamente não. As Inscrições Estaduais concebidas no nosso gerador são fabricadas isoladamente no seu navegador cruzando dados sintéticos contra a tabela do algoritmo do dígito verificador estipulado por cada estado matriz. Atendem à conformidade técnica para passar pelos bloqueios locais do seu ERP ou código antes da ida ao servidor de homologação da Sefaz (SEFAZ AM, SEFAZ SP, etc), mas nunca terão validade civil no painel do Sintegra."
        },
        {
            "question": "Como essas IE falsas ajudam meus testes de NF-e?",
            "answer": "Quando você vai disparar um payload WebService XML ou JSON para os webservices da Secretaria da Fazenda nos ambientes Web, é requisitado que o Schema seja blindado. Preencher formulários com dados vazios rejeita rapidamente na porta XML. A validação técnica salva horas enviando lotes de validação já pré-computadas na sua estrutura de testes Mockados (Mockito, Jest), simulando dados limpos antes dos Certificados A1 de homologação."
        }
    ],
    "pis": [
        {
            "question": "Para que serve um gerador de PIS?",
            "answer": "Ele é ideal para testar telas de cadastro e fluxos de folha de pagamento de empresas. Fornecendo um pis pasep válido, você pode validar o comportamento das suas APIs locais e processos de eSocial sem expor dados reais de colaboradores durante o desenvolvimento de software."
        },
        {
            "question": "Qual a diferença entre PIS, PASEP, NIS e NIT?",
            "answer": "Na prática computacional e sistêmica, nenhuma. PIS (iniciativa privada), PASEP (servidor público), NIS (projetos sociais) e NIT (autônomos) compartilham a mesma estrutura de 11 dígitos numéricos e a mesma regra de cálculo para o dígito verificador. O gerador atende a todos esses casos."
        },
        {
            "question": "Como é calculado o dígito verificador do PIS?",
            "answer": "O 11º dígito de um PIS é um \"módulo matemático\". Ele é calculado multiplicando os 10 primeiros dígitos da esquerda para a direita por pesos específicos (3, 2, 9, 8, 7, 6, 5, 4, 3, 2). A soma dos resultados é dividida por 11, e o resto da divisão define o dígito final. Nosso gerador de PIS implementa 100% dessa regra oficial."
        },
        {
            "question": "Como gerar PIS em lote para testes em massa?",
            "answer": "Nossa ferramenta possui uma aba dedicada de \"Geração em Lote\". Com ela, você pode escolher a quantidade desejada de números de PIS/PASEP e NIS válidos e gerá-los todos de uma vez, copiando ou salvando com facilidade para utilizar em cargas de homologação e testes de banco de dados."
        }
    ],
    "rg": [
        {
            "question": "Como é calculada a validação do RG?",
            "answer": "Como a emissão do RG é de responsabilidade de cada Estado, não há uma regra única nacional. No entanto, o padrão mais comum em validadores baseia-se nas diretrizes do Estado de São Paulo. Ele usa uma fórmula de soma ponderada com pesos de 2 a 9 aplicada aos primeiros 8 dígitos, calculando o resto da divisão por 11. O dígito verificador final pode ser de 0 a 9 ou a letra \"X\" quando o resto é 10."
        },
        {
            "question": "Para que usar dados de RG fictícios em testes?",
            "answer": "Para assegurar a conformidade com a LGPD (Lei Geral de Proteção de Dados) no desenvolvimento de software, QAs e desenvolvedores usam chaves de RG sintéticas em bancos de dados de teste, garantindo que o fluxo cadastral do sistema funcione sem expor dados pessoais reais."
        }
    ],
    "titulo-eleitor": [
        {
            "question": "O documento gerado tem valor civil na Justiça?",
            "answer": "De forma alguma. Nossos geradores de dados fabricam dígitos a partir de matrizes matemáticas locais que servem exclusivamente para saltar barreiras de validação (Front-End e Back-End) e Regras de Negócio na hora em que o programador está testando os próprios formulários. Nenhum dos Títulos de Eleitor gerados pertence ao cadastro real do TSE."
        },
        {
            "question": "O que significam os dois últimos dígitos do Título de Eleitor?",
            "answer": "Os últimos dois algarismos formam o dígito verificador (\"Checksum\"). A estrutura completa retém 12 números: os primeiros oito (8) representam o código sequencial único do eleitor, os dois sub-consequentes (nono e décimo) declaram o código do estado de origem (UF, selecionado no nosso painel acima), e os dois terminais blindam o código como uma chave inquebrável por chute, utilizando cálculo de mod 11."
        },
        {
            "question": "Para que usar um gerador de Título?",
            "answer": "Ao construir ERPs de companhias de RH, agências bancárias ou softwares de admissão é recorrente a requisição do Título de Eleitor em cadastros \"E2E\". Para não expor repetidamente os dados verídicos e sensíveis dos Devs nos bancos de dados temporários de Homologação, é padrão da indústria automatizar e submeter massivamente dados mockados limpos."
        }
    ],
    "boleto-generator": [
        {
            "question": "Como é calculada a linha digitável e o código de barras de um boleto?",
            "answer": "O código de barras oficial contém 44 dígitos numéricos estruturados com dados do banco, moeda, data de vencimento, valor e conta. A linha digitável de 47 dígitos é uma representação do código de barras dividida em 3 blocos de 9 dígitos (cada um com seu próprio dígito verificador módulo 10), mais o dígito verificador geral no meio e o fator de vencimento no fim."
        },
        {
            "question": "Para que serve um gerador de boleto mock?",
            "answer": "Desenvolvedores utilizam essa ferramenta para simular a emissão de boletos, testar o alinhamento de impressão, exportação para PDF, e validar se o leitor de código de barras ou a câmera de aplicativos bancários em ambiente de homologação leem a linha digitável simulada sem problemas de layout."
        },
        {
            "question": "Qual a diferença do boleto mock para um boleto registrado?",
            "answer": "Boletos registrados são cadastrados na rede bancária via APIs da instituição ou arquivos de remessa CNAB. Boletos mock são gerados apenas na interface (HTML/CSS) com números estáticos ou aleatórios. Eles não existem para a rede bancária e qualquer tentativa de pagamento resultará em erro de \"Boleto não encontrado\"."
        }
    ],
    "credit-card-generator": [
        {
            "question": "Para que serve esta ferramenta de geração de cartões?",
            "answer": "Ela permite gerar cartões com dados fictícios para fins de testes. O desenvolvedor pode gerar dados simulando bandeiras como visa mastercard ou american express para validar se as integrações respondem corretamente aos formatos exigidos. Os dados gerados vêm formatados corretamente segundo a estrutura lógica e comprimento de cada bandeira, assegurando que os campos de validação de formulários (como número do cartão, CVV e data de expiração) passem em testes sintáticos locais."
        },
        {
            "question": "O que é o Algoritmo de Luhn?",
            "answer": "O algoritmo de Luhn (também conhecido como fórmula \"módulo 10\") é uma fórmula de soma de verificação simples usada para validar uma variedade de números de identificação, como números de cartões de crédito. A maioria das bandeiras de cartões (Visa, Mastercard, Discover, Amex) adota esse algoritmo para evitar erros acidentais de digitação."
        },
        {
            "question": "O gerador fornece dados completos de cobrança?",
            "answer": "Sim. Além de gerar o número do cartão estruturalmente correto, nossa ferramenta fornece um nome de portador fictício (John Doe), data de expiração futura válida e código de segurança (CVV) compatível com a bandeira selecionada. Isso é ideal para testar formulários que exigem o fluxo completo de pagamento e validações de endereço de faturamento (Billing Address)."
        }
    ],
    "split-payment": [
        {
            "question": "O que é o Split Payment na Reforma Tributária?",
            "answer": "O Split Payment é a retenção automática dos impostos IBS e CBS realizada diretamente pelas instituições financeiras e credenciadoras no momento do pagamento via Pix, cartão ou boleto."
        },
        {
            "question": "Como o simulador calcula o valor líquido do vendedor?",
            "answer": "A ferramenta aplica as alíquotas estimadas de IBS (Estadual/Municipal) e CBS (Federal) sobre o valor bruto da transação, subtraindo os impostos para exibir a quantia exata enviada para a conta bancária do vendedor."
        }
    ],
    "vet-efx-calculator": [
        {
            "question": "O que é o VET (Valor Efetivo Total) exige pelo Banco Central?",
            "answer": "O Valor Efetivo Total (VET) representa o custo final em Reais de cada unidade de moeda estrangeira em operações de câmbio ou eFX, somando a taxa PTAX, spread da corretora e IOF."
        },
        {
            "question": "O que são serviços de pagamento internacional eFX?",
            "answer": "O eFX é a modalidade regulada pelo Banco Central que permite intermediar pagamentos internacionais de até US$ 10.000,00 por transação sem contrato formal de câmbio."
        }
    ],
    "iban-validator": [
        {
            "question": "Como é a estrutura de um código IBAN?",
            "answer": "Um código IBAN tem comprimento variável (de até 34 caracteres alfanuméricos) dependendo do país. Ele é composto por: Código do país: 2 letras (ex: BR, PT, DE). Dígito verificador: 2 números calculados matematicamente. BBAN (Basic Bank Account Number): Identificador local da conta bancária que inclui o código do banco, agência e conta."
        },
        {
            "question": "Como funciona a validação matemática do IBAN (Modulo 97)?",
            "answer": "A validação segue o padrão ISO 7064 (Mod 97-10). Para validar, movemos os 4 primeiros caracteres (país e dígitos verificadores) para o final do código, convertemos todas as letras em valores numéricos (A=10, B=11 ... Z=35) e efetuamos a operação número % 97. O resultado deve ser exatamente igual a 1 para o IBAN ser considerado válido."
        },
        {
            "question": "Qual o tamanho do IBAN no Brasil?",
            "answer": "No Brasil, o IBAN é padronizado com **29 caracteres** alfanuméricos, iniciando sempre com BR nas duas primeiras posições, seguidos por 2 dígitos verificadores e os dados completos da conta bancária nacional."
        }
    ],
    "address": [
        {
            "question": "Como usar este gerador de endereços para testes de sistema?",
            "answer": "Durante a homologação de sistemas de entrega, e-commerce ou cadastros em geral, desenvolvedores e analistas de QA necessitam preencher endereços estruturados de forma ágil. Em vez de preencher manualmente campo por campo, você pode gerar um endereço completo aleatório (ou em lote na aba ao lado) e simplesmente copiá-lo."
        },
        {
            "question": "Os CEPs e endereços gerados são reais?",
            "answer": "Os endereços gerados são totalmente fictícios e gerados combinando logradouros, bairros, cidades e estados reais de forma aleatória. Os CEPs são gerados com a máscara correta e no intervalo correspondente às regiões (como SP, RJ, MG), mas podem não estar ativamente cadastrados na base de dados oficial dos Correios. Use apenas para fins de simulação."
        }
    ],
    "email": [
        {
            "question": "O que é um e-mail fictício/fake?",
            "answer": "É um endereço de e-mail estruturalmente válido, contendo um nome de usuário gerado aleatoriamente e um provedor comum ou personalizado. O objetivo principal é satisfazer a validação sintática de formulários de cadastro durante fases de testes de software."
        },
        {
            "question": "Estes e-mails gerados possuem caixa de entrada ativa?",
            "answer": "Não. Nossos e-mails são **fictícios (mocks)** e não possuem servidores de correio eletrônico ou caixas de entrada associadas para receber mensagens. Se o seu fluxo de teste exige a verificação ou o recebimento de mensagens (como validação de Token/OTP, redefinição de senha ou links de confirmação), você deve utilizar serviços especializados em caixas temporárias (\"temp mail\")."
        },
        {
            "question": "Posso gerar e-mails com domínios corporativos personalizados?",
            "answer": "Sim. Ao alterar a opção \"Domínio\" para **Personalizado**, você pode digitar qualquer extensão de domínio (ex: empresa.com.br) e a ferramenta gerará e-mails aleatórios utilizando esse domínio específico. Isso é muito útil para testar regras internas de negócio em fluxos corporativos (B2B)."
        }
    ],
    "lgpd-data": [
        {
            "question": "O que é anonimização de dados sob a LGPD?",
            "answer": "Segundo a Lei Geral de Proteção de Dados (LGPD), a anonimização é o processo pelo qual um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo. Uma vez anonimizado, o dado deixa de ser considerado dado pessoal para fins da lei."
        },
        {
            "question": "Como funciona o Anonimizador de Texto (mascaramento)?",
            "answer": "Nossa ferramenta analisa o texto de entrada em busca de padrões sintáticos definidos (regex) para CPFs (com e sem pontos), e-mails e telefones formatados. Quando um desses padrões é encontrado, ele é substituído por uma máscara de asteriscos, preservando a estrutura de layout do texto original sem expor a informação sensível."
        },
        {
            "question": "Esta ferramenta envia os dados colados para algum servidor?",
            "answer": "Não. Toda a operação de geração e anonimização de texto é feita **100% no lado do cliente (client-side)** utilizando Javascript no seu próprio navegador. As informações nunca são enviadas a servidores externos ou gravadas em bancos de dados, oferecendo total privacidade e segurança."
        }
    ],
    "name": [
        {
            "question": "Para que serve um gerador de nomes aleatórios?",
            "answer": "Esta ferramenta ajuda programadores e analistas de QA a criar rapidamente massa de dados fictícios para testar a validação de formulários, persistência em bancos de dados, renderização de layouts com diferentes tamanhos de nomes e exportação de relatórios sem infringir a LGPD (Lei Geral de Proteção de Dados)."
        },
        {
            "question": "Como a filtragem por gênero funciona?",
            "answer": "Ao selecionar \"Masculino\" ou \"Feminino\", a ferramenta restringe o primeiro nome à lista correspondente de nomes comuns no Brasil, mantendo a aleatoriedade e integridade estrutural dos sobrenomes gerados."
        },
        {
            "question": "Como gerar nomes em lote?",
            "answer": "Use a aba **Geração em Massa** na lateral direita. Defina a quantidade de nomes que precisa e a ferramenta gerará uma lista contínua pronta para copiar, perfeita para popular bases SQL, planilhas ou arquivos JSON."
        }
    ],
    "person": [
        {
            "question": "Para que serve esta ferramenta de simulação de perfil?",
            "answer": "Ela serve para apoiar desenvolvedores de software, analistas de qualidade (QA) e administradores de banco de dados na criação de dados sintéticos realistas. Popula tabelas locais para simular fluxos completos de checkout, faturamento e entrega em e-commerces ou CRMs de forma simplificada."
        },
        {
            "question": "Como exportar os dados da pessoa gerada em JSON?",
            "answer": "Assim que você gera um perfil de pessoa, a ferramenta monta automaticamente um objeto no formato JSON estruturado na lateral esquerda. Você pode copiar o conteúdo inteiro de forma estruturada em apenas um clique para usar em requisições de API ou scripts de carga."
        },
        {
            "question": "Esta ferramenta está em conformidade com a LGPD?",
            "answer": "Sim. Por gerar dados de forma 100% sintética baseados em listas genéricas e algoritmos matemáticos públicos (sem vazamento de pessoas reais), a ferramenta elimina qualquer risco de exposição de dados sensíveis e ajuda a manter seu ambiente de desenvolvimento em plena conformidade com a LGPD."
        }
    ],
    "phone": [
        {
            "question": "Como funciona o gerador de telefone?",
            "answer": "Nossa ferramenta escolhe aleatoriamente um DDD válido da lista de estados brasileiros (ou código de área dos EUA) e gera uma sequência numérica de acordo com o tipo escolhido: celulares no Brasil sempre iniciam com o dígito 9 e possuem 9 dígitos após o DDD, enquanto telefones fixos são gerados com 8 dígitos iniciados de 2 a 5."
        },
        {
            "question": "Como é a estrutura de números dos EUA?",
            "answer": "Os números norte-americanos seguem o padrão do Plano de Numeração da América do Norte (NANP). Eles possuem 10 dígitos compostos por um código de área de 3 dígitos (Area Code), um código de escritório central de 3 dígitos (Central Office Code) e 4 dígitos para a linha. A formatação segue o modelo +1 (Area Code) XXX-XXXX."
        },
        {
            "question": "Posso usar estes números para receber SMS de confirmação?",
            "answer": "Não. Esses números são fictícios e gerados por algoritmos matemáticos no seu próprio navegador. Como não estão vinculados a chips físicos (SIM cards) ou operadoras de telefonia ativa, não é possível receber mensagens SMS ou chamadas neles. Eles servem exclusivamente para testar máscaras de inputs e rotinas de validação de formulários locais."
        },
        {
            "question": "Como gerar telefones em lote?",
            "answer": "Utilize o card de **Geração em Massa** acima. Insira a quantidade desejada de telefones que deseja obter, e a ferramenta gerará uma lista completa contendo os números solicitados com ou sem formatação, pronta para ser copiada para planilhas ou arquivos de banco de dados."
        }
    ],
    "uuid": [
        {
            "question": "O que é um UUID v4 e qual o seu tamanho?",
            "answer": "O UUID Versão 4 é um identificador gerado de forma puramente aleatória. Ele possui o tamanho exato de **36 caracteres**, contendo 32 caracteres hexadecimais separados por 4 hifens no formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. O dígito \"4\" na terceira seção indica que se trata de uma versão 4, e o caractere \"y\" na quarta seção é restrito aos valores 8, 9, a ou b."
        },
        {
            "question": "Existe o risco de colisão ao usar UUID v4?",
            "answer": "Na prática, o risco de colisão (gerar dois UUIDs iguais) é matematicamente desprezível. Com 122 bits de aleatoriedade, você precisaria gerar bilhões de UUIDs por segundo durante centenas de anos para ter 50% de chance de uma única colisão. Por isso, são ideais como chaves primárias em bancos de dados distribuídos."
        },
        {
            "question": "Qual a diferença de UUID v4 para UUID v7?",
            "answer": "Diferente do UUID v4 (que é 100% aleatório), o UUID v7 incorpora um carimbo de data/hora (timestamp) de milissegundos nas primeiras posições. Isso torna o UUID v7 ordenável no tempo (time-ordered), o que melhora consideravelmente o desempenho de indexação em bancos de dados relacionais (evitando a fragmentação do índice B-Tree causada pela inserção aleatória do v4)."
        }
    ],
    "xml-validator": [
        {
            "question": "Meu XML de Nota Fiscal (NF-e) é enviado para a nuvem?",
            "answer": "Não, em hipótese alguma. Seu código XML de Nota Fiscal, CT-e ou código privado nunca sai da sua máquina. Esta ferramenta foi construída utilizando arquitetura estrita em Client-Side (através do DOMParser nativo do seu navegador). Toda a validação acontece de forma local e offline na exata hora em que você clica em \"Validar\", protegendo dados críticos de integração."
        },
        {
            "question": "Como é feita a validação das Tags?",
            "answer": "A ferramenta opera uma verificação de well-formedness (boa formação de raiz). Isso significa que nosso parser inteligente busca erros clássicos de sintaxe, como: tags que foram abertas mas não fechadas, atributos corrompidos sem aspas, nós sobrepostos e quebras nulas que anulam a compilação do arquivo pelo receptor da fazenda."
        },
        {
            "question": "É confiável colar código privado de sistemas bancários?",
            "answer": "Sim. Nossa infraestrutura do site preza pela máxima confidencialidade em ferramentas para desenvolvedores (\"Dev Tools\"). Diferente das dezenas de sites pesados na rede, nós não rodamos bancos de dados SQL/NoSQL em background capturando dados submetidos anonimamente, tampouco guardamos histórico (logs) do payload (conteúdo cru) colado aqui. Sinta-se a vontade para debugar envios XML/SOAP sigilosos antes da homologação final em produção!"
        },
        {
            "question": "Como encontrar e corrigir erros de estrutura no validador?",
            "answer": "Ao colar o código e clicar em \"Validar\", caso o XML possua erros, o validador indicará a linha exata e a mensagem de erro fornecida pelo parser (ex: \"Mismatch tag\" ou \"Attribute value expected\"). A causa mais comum é a falta de fechamento de alguma tag ou caracteres especiais inválidos como o & que deve ser escrito como & no padrão XML."
        }
    ]
};
