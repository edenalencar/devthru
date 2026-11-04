// Esse arquivo contém o catálogo central de FAQs para Rich Snippets (Schema FAQPage)
// e acordeões de FAQ de todas as ferramentas do DevThru.

export interface FAQItem {
    question: string;
    answer: string;
}

export const TOOL_FAQS: Record<string, FAQItem[]> = {
    "barcode-generator": [
        {
            "question": "O que é o código de barras EAN-13 e o que significa o prefixo 789?",
            "answer": "O EAN-13 (GS1) é o padrão global de código de barras para produtos comerciais. No Brasil, os prefixos 789 e 790 indicam que a empresa associada foi cadastrada na GS1 Brasil, facilitando a identificação em caixas e supermercados."
        },
        {
            "question": "Como funciona o cálculo do dígito verificador no EAN-13?",
            "answer": "O 13º dígito é calculado através do algoritmo Módulo 10 da GS1: multiplica-se os dígitos de posições ímpares por 1 e os de posições pares por 3. A soma total é subtraída do próximo múltiplo de 10."
        },
        {
            "question": "Qual a diferença entre EAN-13 e Code 128?",
            "answer": "O EAN-13 é estritamente numérico e fixo em 13 dígitos para comércio varejista (PDV). Já o Code 128 é alfanumérico e de tamanho variável, ideal para etiquetas de transporte, rastreamento de encomendas e inventário."
        }
    ],
    "hmac-generator": [
        {
            "question": "O que é HMAC e para que serve em APIs?",
            "answer": "HMAC (Hash-based Message Authentication Code) é um padrão criptográfico que combina uma função de hash (como SHA-256 ou SHA-512) com uma chave secreta compartilhada. Ele é amplamente utilizado por gateways (Stripe, Asaas, Mercado Pago, GitHub) para autenticar webhooks e garantir que a requisição não foi adulterada."
        },
        {
            "question": "Por que webhooks usam HMAC em vez de hash simples?",
            "answer": "Um hash simples pode ser recalculado por qualquer interceptador. O HMAC garante a autenticidade da origem porque somente quem tem posse da chave secreta (secret key) consegue gerar uma assinatura válida para aquele payload específico."
        },
        {
            "question": "Como prevenir Timing Attacks na validação de webhooks?",
            "answer": "Evite operadores normais de igualdade como ===, que encerram no primeiro caractere divergente. Sempre utilize funções de tempo constante como crypto.timingSafeEqual no Node.js ou hmac.compare_digest no Python."
        }
    ],
    "json-diff": [
        {
            "question": "O que é um comparador semântico de JSON?",
            "answer": "É uma ferramenta que analisa a árvore de dados de dois arquivos JSON estruturalmente, identificando valores modificados, chaves adicionadas e removidas, sem gerar falsos positivos caso as propriedades estejam em ordens diferentes ou com quebras de linha distintas."
        },
        {
            "question": "Por que a ordem das chaves não altera o resultado no JSON Diff?",
            "answer": "Segundo a especificação RFC 8259, objetos JSON são coleções não ordenadas de pares chave/valor. Nossa ferramenta normaliza os nós antes da comparação, garantindo que { a: 1, b: 2 } seja reconhecido como semanticamente idêntico a { b: 2, a: 1 }."
        },
        {
            "question": "Meus dados de JSON são enviados para algum servidor?",
            "answer": "Não. Todo o processamento, parse e comparação do JSON Diff acontecem de forma 100% segura e privada diretamente no seu próprio navegador (client-side), sem tráfego de dados para servidores externos."
        }
    ],
    "license-plate": [
        {
            "question": "Qual é o padrão da Placa Mercosul no Brasil?",
            "answer": "O padrão Mercosul para veículos no Brasil é composto por 4 letras e 3 números no formato LLLNLNN (exemplo: ABC1D23). A placa antiga utilizava o formato LLL-NNNN (exemplo: ABC-1234)."
        },
        {
            "question": "Como converter uma placa antiga cinza para a placa Mercosul?",
            "answer": "A conversão do padrão cinza para o Mercosul substitui o segundo dígito numérico (o 5º caractere da placa) por uma letra correspondente (0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J)."
        },
        {
            "question": "Para que serve o gerador de placa de veículos?",
            "answer": "É uma ferramenta para desenvolvedores de software, analistas de QA e empresas de logística e estacionamento gerarem placas fictícias válidas para testes de sistemas de trânsito, radares e ERPs automotivos."
        }
    ],
    "chassi": [
        {
            "question": "O que é o Chassi do Veículo (Código VIN)?",
            "answer": "O número de chassi, também conhecido como VIN (Vehicle Identification Number), é um código único de 17 caracteres que identifica cada veículo fabricado no mundo. É como se fosse o \"CPF\" ou RG do veículo.\n\nEstrutura do VIN:\n\n• WMI (1-3): Identificador do fabricante mundial (World Manufacturer Identifier).\n• VDS (4-9): Seção descritiva do veículo (modelo, motor, tipo de carroceria).\n• VIS (10-17): Seção indicadora do veículo (ano de fabricação, código da planta fabril e número de série)."
        },
        {
            "question": "É possível gerar um chassi fictício válido?",
            "answer": "Sim. O nosso gerador de chassi de veículos utiliza a regra matemática e o padrão internacional ISO 3779 para criar um código com 17 dígitos onde o nono dígito (dígito verificador) é precisamente calculado com base em pesos pré-definidos.\n\nDessa forma, você obtém um chassi fictício, porém estruturalmente idêntico e válido para passar pelas validações de formulários de software e banco de dados."
        },
        {
            "question": "Como usar este gerador de chassi para testes de software?",
            "answer": "Para desenvolvedores, QAs (Analistas de Qualidade) e equipes de TI, testar formulários de cadastro de frotas de ERPs, seguradoras e sistemas automotivos exige dados em formato realista.\n\nBasta clicar no botão \"Gerar Chassi\" (ou utilizar a aba \"Geração em Lote\" para obter múltiplos códigos) e copiar o código de 17 caracteres oferecido. Nós aplicamos cálculos para garantir que softwares de validação de concessionárias e detrans o validem corretamente nos testes de homologação."
        },
        {
            "question": "Por que as letras I, O e Q não são permitidas no número de chassi (VIN)?",
            "answer": "De acordo com a norma internacional ISO 3779, as letras I (i), O (o) e Q (q) são estritamente proibidas em qualquer número de chassi.\n\nEssa restrição existe para evitar fraudes e erros de leitura humana ou de escaneamento ótico (OCR), pois a letra I pode ser facilmente confundida com o número 1, e as letras O e Q com o número 0. Nosso gerador de chassi segue rigorosamente essa especificação internacional."
        },
        {
            "question": "Como o chassi de moto se diferencia do de carro?",
            "answer": "A principal diferença está no código WMI (os 3 primeiros dígitos do VIN). No Brasil:\n\n• Carros: Normalmente utilizam WMIs como 9BW (Volkswagen), 9BD (Fiat) ou 9BG (General Motors).\n• Motos: Frequentemente utilizam o prefixo 9C (como 9C2 para Honda e 9CD para Yamaha).\n\nAmbos os tipos de veículos seguem a mesma regra matemática de verificação no 9º dígito. Nosso gerador permite selecionar a categoria específica do veículo para trazer mais realismo às suas simulações de homologação."
        },
        {
            "question": "Como funciona o cálculo do dígito verificador do chassi?",
            "answer": "O 9º dígito do chassi é o dígito verificador, calculado por um algoritmo de pesos ponderados baseado no padrão internacional ISO 3779."
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
    "fipe": [
        {
            "question": "O que é a Tabela FIPE?",
            "answer": "A Tabela FIPE expressa os preços médios de veículos no mercado nacional brasileiro, calculada pela Fundação Instituto de Pesquisas Econômicas para carros, motos e caminhões."
        },
        {
            "question": "Com que frequência a Tabela FIPE é atualizada?",
            "answer": "A tabela é atualizada mensalmente com base na coleta de preços de veículos anunciados em todo o território nacional."
        }
    ],
    "nfe-decoder": [
        {
            "question": "Como é formada a chave de acesso de 44 dígitos da SEFAZ?",
            "answer": "A chave é uma concatenação rigorosa de 8 blocos de informação:\n\n• cUF (2 dígitos): Código IBGE do estado emissor (ex: 35 para SP).\n• AAMM (4 dígitos): Ano e mês da emissão da nota fiscal.\n• CNPJ (14 dígitos): Cadastro Nacional da Pessoa Jurídica da empresa emissora.\n• Modelo (2 dígitos): 55 para NF-e, 65 para NFC-e, 57 para CT-e e 58 para MDF-e.\n• Série (3 dígitos): Série do documento fiscal (001 a 999).\n• Número da Nota (9 dígitos): Sequencial da nota no emissor.\n• Tipo de Emissão (1 dígito): Normal (1) ou modalidades de contingência (2 a 9).\n• Código Numérico (8 dígitos): Código aleatório para dificultar a adivinhação de chaves.\n• Dígito Verificador (1 dígito): Checksum calculado com o algoritmo Módulo 11."
        },
        {
            "question": "Como funciona o cálculo do Dígito Verificador (Módulo 11)?",
            "answer": "Multiplica-se cada um dos 43 primeiros dígitos da direita para a esquerda por uma sequência de pesos de 2 a 9 (reiniciando em 2 ao atingir 9). Soma-se todos os produtos e divide-se por 11. Se o resto da divisão for 0 ou 1, o dígito verificador é 0. Nos demais casos, o DV é 11 menos o resto."
        },
        {
            "question": "Esta ferramenta consulta dados diretamente no servidor da SEFAZ?",
            "answer": "Não. Este decodificador faz a análise estática e sintática da string de 44 dígitos diretamente no seu navegador, sem expor chaves ou dados de sua empresa para servidores externos."
        }
    ],
    "nfe-generator": [
        {
            "question": "Como testar a chave de acesso em ambiente de homologação?",
            "answer": "Ao preencher formulários do seu sistema emissor de nota ou portal do ERP em ambiente de homologação, insira a chave com 44 dígitos numéricos gerada nesta ferramenta.\n\nNós garantimos que o cálculo do último algarismo (o dígito verificador - DV) esteja 100% correto de acordo com a base de regras e documentação técnica da Secretaria de Estado da Fazenda (SEFAZ), garantindo aprovação em rotinas de verificação local do seu software."
        },
        {
            "question": "Qual a diferença do Modelo 55 (NF-e) e 65 (NFC-e)?",
            "answer": "A estrutura de uma chave de 44 posições suporta a identificação do modelo da nota inserida (do pŕoximo ao centro da chave):\n\n• Modelo 55 (NF-e): É a Nota Fiscal Eletrônica tradicional, comummente utilizada em vendas B2B e envio por transportadoras.\n• Modelo 65 (NFC-e): É a Nota Fiscal de Consumidor Eletrônica, focada no varejo presencial B2C e transações diárias (o antigo cupom fiscal).\n\nNossa ferramenta permite gerar livremente qualquer um dos dois modelos, ajustando a estrutura de 44 dígitos instantaneamente."
        },
        {
            "question": "A chave de acesso gerada é verdadeira?",
            "answer": "Não. A chave é válida formatando-se do ponto de vista matemático, contendo um dígito verificador calculado. Contudo, ela é composta de numeração fictícia e aleatória e não possui validade tributária ou legal na base de dados receptora da SEFAZ na produção. Ela serve estritamente para simulação em rotinas de teste."
        },
        {
            "question": "Como funciona o gerador de chave de acesso NF-e?",
            "answer": "Gera chaves estruturadas no padrão oficial da SEFAZ com 44 dígitos numéricos, incluindo UF, data, CNPJ, modelo 55, série, número da nota, código aleatório e DV calculado via Módulo 11."
        }
    ],
    "cte-generator": [
        {
            "question": "O que é a chave de acesso de Conhecimento de Transporte Eletrônico (CT-e)?",
            "answer": "O CT-e (Modelo 57 da SEFAZ) é o documento fiscal digital emitido por transportadoras para acobertar a prestação de serviços de transporte de cargas (rodoviário, aéreo, aquaviário, ferroviário ou dutoviário)."
        },
        {
            "question": "Como testar a chave de CT-e em sistemas de logística?",
            "answer": "Nossa ferramenta gera chaves válidas no modelo 57 com Dígito Verificador Módulo 11 correto para testes de integração em TMS, WMS e ERPs de frete."
        }
    ],
    "mdfe-generator": [
        {
            "question": "O que é o Manifesto Eletrônico de Documentos Fiscais (MDF-e)?",
            "answer": "O MDF-e (Modelo 58 da SEFAZ) é o documento emitido para vincular vários documentos fiscais (NF-e e CT-e) a uma mesma unidade de carga e transporte interestadual ou intermunicipal."
        },
        {
            "question": "Como validar uma chave de MDF-e para testes?",
            "answer": "A chave de MDF-e possui 44 dígitos no padrão SEFAZ contendo o código de modelo 58 nas posições 21 e 22 e dígito verificador calculado por Módulo 11."
        }
    ],
    "nfce-generator": [
        {
            "question": "O que é a NFC-e (Nota Fiscal de Consumidor Eletrônica)?",
            "answer": "A NFC-e (Modelo 65) substitui o antigo cupom fiscal de ECF e a nota fiscal de venda a consumidor modelo 2, sendo emitida em pontos de venda (PDV) no varejo."
        },
        {
            "question": "Como usar o gerador de NFC-e para testes de PDV?",
            "answer": "Gere chaves de 44 dígitos com modelo 65 válidas para homologar sistemas de frente de caixa, impressoras térmicas e integrações de pagamento."
        }
    ],
    "cnae-search": [
        {
            "question": "O que é o código CNAE?",
            "answer": "CNAE significa Classificação Nacional de Atividades Econômicas. É um código padronizado pelo IBGE e pela Receita Federal para identificar as atividades produtivas exercidas por empresas."
        },
        {
            "question": "Qual a importância do CNAE para a tributação da empresa?",
            "answer": "O CNAE determina o enquadramento tributário da empresa (como os anexos do Simples Nacional), a incidência de alíquotas de ISS, ICMS e exigências de licenças municipais e estaduais."
        }
    ],
    "phone": [
        {
            "question": "Como funciona o gerador de telefone e celular?",
            "answer": "Nossa ferramenta seleciona um DDD válido entre os 67 códigos de área brasileiros (ou código de área dos EUA) e monta a sequência numérica segundo a regulamentação: celulares no Brasil sempre iniciam com o dígito 9 e possuem 9 dígitos após o DDD (formato (XX) 9XXXX-XXXX), enquanto telefones fixos possuem 8 dígitos com prefixos de 2 a 5 (formato (XX) XXXX-XXXX)."
        },
        {
            "question": "Qual é a regra do nono dígito (9) no celular brasileiro?",
            "answer": "Instituído pela Resolução nº 553/2010 da Anatel, o nono dígito é obrigatório em todas as linhas móveis do território nacional. Ele padronizou os números de celular com 11 algarismos (2 dígitos do DDD + dígito 9 + 8 dígitos da linha). Além disso, o segundo dígito após o 9 sempre pertence ao intervalo de 6 a 9 (ex: 96xxx, 97xxx, 98xxx ou 99xxx)."
        },
        {
            "question": "Qual a diferença entre telefone celular e telefone fixo no Brasil?",
            "answer": "A principal diferença estrutural está na quantidade de dígitos e nos prefixos:\n\n• Celular (Móvel): 11 dígitos no total com DDD. O primeiro dígito após o DDD é obrigatoriamente 9 e o segundo dígito varia de 6 a 9.\n• Telefone Fixo (STFC): 10 dígitos no total com DDD. O primeiro dígito após o DDD varia obrigatoriamente de 2 a 5."
        },
        {
            "question": "Quais DDDs são suportados pela ferramenta?",
            "answer": "A ferramenta suporta todos os 67 DDDs oficiais do Brasil distribuídos em todas as regiões:\n\n• Sudeste: SP (11 a 19), RJ (21, 22, 24), ES (27, 28), MG (31 a 35, 37, 38).\n• Sul: PR (41 a 46), SC (47 a 49), RS (51, 53 a 55).\n• Centro-Oeste: DF (61), GO (62, 64), TO (63), MT (65, 66), MS (67).\n• Nordeste: BA (71, 73 a 75, 77), SE (79), PE (81, 87), AL (82), PB (83), RN (84), CE (85, 88), PI (86, 89), MA (98, 99).\n• Norte: PA (91, 93, 94), AM (92, 97), RR (95), AP (96), AC (68), RO (69)."
        },
        {
            "question": "Posso usar estes números para receber SMS de confirmação ou WhatsApp?",
            "answer": "Não. Esses números são fictícios e gerados por algoritmos matemáticos diretamente no seu navegador. Como não estão vinculados a chips físicos (SIM cards) ou operadoras de telefonia ativas, não é possível receber mensagens SMS, chamadas ou códigos de verificação neles. Eles servem exclusivamente para testar validações em formulários, APIs e bancos de dados."
        },
        {
            "question": "Como gerar números de telefone em lote?",
            "answer": "Basta utilizar a seção de Geração em Massa acima. Informe a quantidade desejada de números e clique em Gerar. Você poderá copiar a lista completa com ou sem formatação, ideal para alimentar planilhas, seeders de testes e migrações de dados."
        }
    ],
    "address": [
        {
            "question": "Como o gerador de endereços e CEPs funciona?",
            "answer": "Ele gera endereços realistas com CEPs de formato válido, logradouro, bairro, cidade e estado brasileiros correspondentes aos padrões dos Correios."
        },
        {
            "question": "Como usar este gerador de endereços para testes de sistema?",
            "answer": "Durante a homologação de sistemas de entrega, e-commerce ou cadastros em geral, desenvolvedores e analistas de QA necessitam preencher endereços estruturados de forma ágil. Em vez de preencher manualmente campo por campo, você pode gerar um endereço completo aleatório (ou em lote na aba ao lado) e simplesmente copiá-lo."
        },
        {
            "question": "Os CEPs e endereços gerados são reais?",
            "answer": "Os endereços gerados são totalmente fictícios e gerados combinando logradouros, bairros, cidades e estados reais de forma aleatória. Os CEPs são gerados com a máscara correta e no intervalo correspondente às regiões (como SP, RJ, MG), mas podem não estar ativamente cadastrados na base de dados oficial dos Correios. Use apenas para fins de simulação."
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
        },
        {
            "question": "O que inclui o gerador de pessoa completa?",
            "answer": "Gera um perfil cadastral completo para testes contendo nome, CPF válido, RG, data de nascimento, gênero, e-mail, telefone celular com DDD, endereço completo e dados profissionais."
        }
    ],
    "name": [
        {
            "question": "Como são gerados os nomes brasileiros?",
            "answer": "A ferramenta combina os primeiros nomes e sobrenomes mais comuns do Brasil com base nos censos do IBGE, permitindo filtrar por gênero masculino, feminino ou aleatório."
        },
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
            "answer": "Use a aba Geração em Massa na lateral direita. Defina a quantidade de nomes que precisa e a ferramenta gerará uma lista contínua pronta para copiar, perfeita para popular bases SQL, planilhas ou arquivos JSON."
        }
    ],
    "email": [
        {
            "question": "Para que serve o gerador de e-mail?",
            "answer": "Cria endereços de e-mail sintéticos com domínios variados para preenchimento de formulários, testes de fluxo de cadastro e automação QA."
        },
        {
            "question": "O que é um e-mail fictício/fake?",
            "answer": "É um endereço de e-mail estruturalmente válido, contendo um nome de usuário gerado aleatoriamente e um provedor comum ou personalizado. O objetivo principal é satisfazer a validação sintática de formulários de cadastro durante fases de testes de software."
        },
        {
            "question": "Estes e-mails gerados possuem caixa de entrada ativa?",
            "answer": "Não. Nossos e-mails são fictícios (mocks) e não possuem servidores de correio eletrônico ou caixas de entrada associadas para receber mensagens. Se o seu fluxo de teste exige a verificação ou o recebimento de mensagens (como validação de Token/OTP, redefinição de senha ou links de confirmação), você deve utilizar serviços especializados em caixas temporárias (\"temp mail\")."
        },
        {
            "question": "Posso gerar e-mails com domínios corporativos personalizados?",
            "answer": "Sim. Ao alterar a opção \"Domínio\" para Personalizado, você pode digitar qualquer extensão de domínio (ex: empresa.com.br) e a ferramenta gerará e-mails aleatórios utilizando esse domínio específico. Isso é muito útil para testar regras internas de negócio em fluxos corporativos (B2B)."
        }
    ],
    "lgpd-data": [
        {
            "question": "Como funciona a geração de dados de teste aderentes à LGPD?",
            "answer": "Gera massas de dados totalmente anonimizadas e sintéticas para que equipes de tecnologia testem sistemas em staging sem violar a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
        },
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
            "answer": "Não. Toda a operação de geração e anonimização de texto é feita 100% no lado do cliente (client-side) utilizando Javascript no seu próprio navegador. As informações nunca são enviadas a servidores externos ou gravadas em bancos de dados, oferecendo total privacidade e segurança."
        }
    ],
    "cpf": [
        {
            "question": "Para que serve um gerador de CPF?",
            "answer": "Nossa ferramenta fornece CPFs válidos instantaneamente para preenchimento de formulários de cadastro em sistemas em fase de testes (QA) ou desenvolvimento local. Isso impede a utilização de dados reais de pessoas físicas durante o ciclo de homologação do software."
        },
        {
            "question": "É possível gerar CPF de um estado/região específico?",
            "answer": "Sim! No Brasil, o nono dígito do CPF (o número que antecede o traço e os dois dígitos verificadores) indica a Região Fiscal onde o CPF foi emitido. Por exemplo, CPFs emitidos em São Paulo (SP) possuem o nono dígito igual a 8, enquanto no Rio de Janeiro (RJ) e Espírito Santo (ES) possuem o nono dígito igual a 7.\n\nSelecionando o estado no nosso gerador, você obtém códigos válidos simulando a emissão daquela região fiscal específica. Correspondência completa das Regiões Fiscais do CPF:\n\n• 1 — Distrito Federal, Goiás, Mato Grosso do Sul, Mato Grosso e Tocantins (DF, GO, MS, MT, TO)\n• 2 — Amazonas, Acre, Amapá, Pará, Rondônia e Roraima (AC, AM, AP, PA, RO, RR)\n• 3 — Ceará, Maranhão e Piauí (CE, MA, PI)\n• 4 — Alagoas, Paraíba, Pernambuco e Rio Grande do Norte (AL, PB, PE, RN)\n• 5 — Bahia e Sergipe (BA, SE)\n• 6 — Minas Gerais (MG)\n• 7 — Espírito Santo e Rio de Janeiro (ES, RJ)\n• 8 — São Paulo (SP)\n• 9 — Paraná e Santa Catarina (PR, SC)\n• 0 — Rio Grande do Sul (RS)"
        },
        {
            "question": "Por que gerar um CPF inválido?",
            "answer": "Durante o desenvolvimento de validações de formulários e APIs, é essencial verificar se o seu sistema rejeita de forma correta dados errados ou corrompidos. Com a nossa ferramenta, você pode gerar um CPF inválido matematicamente (com dígitos verificadores incorretos) para rodar testes negativos no fluxo da sua aplicação."
        },
        {
            "question": "Como funciona o cálculo do dígito verificador do CPF?",
            "answer": "O CPF possui 11 dígitos, sendo os dois últimos os dígitos verificadores (DV1 e DV2). Eles são calculados por meio de uma operação matemática (\"módulo 11\") com pesos decrescentes baseados nos 9 dígitos iniciais. Nosso gerador calcula esses dígitos automaticamente segundo as regras oficiais da Receita Federal."
        },
        {
            "question": "O que é a região fiscal indicada pelo nono dígito do CPF?",
            "answer": "O 9º dígito do CPF identifica a Região Fiscal onde foi emitido (ex: 8 para São Paulo, 7 para RJ/ES, 1 para DF/GO/MT/MS/TO, 6 para Minas Gerais, 9 para PR/SC, 0 para RS)."
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
            "answer": "O CNPJ possui 14 dígitos. Os dígitos da 9ª à 12ª posição (logo após a barra) identificam a ordem do estabelecimento. A matriz de uma empresa sempre possui o código de ordem 0001 (ex: /0001-xx). As filiais da mesma empresa possuem ordens subsequentes como 0002, 0003 e assim por diante. Nosso gerador permite selecionar explicitamente se você deseja obter um CNPJ de matriz ou filial para seus cenários de teste de faturamento."
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
            "answer": "De acordo com a norma da Receita Federal, a validação do CNPJ alfanumérico mantém os mesmos pesos do cálculo tradicional. A única diferença é a conversão das letras nas 12 primeiras posições para números, utilizando a fórmula Valor = Código ASCII do caractere - 48.\n\nNossos exemplos de código abaixo (em Java, Python, JavaScript e C#) já contemplam essa regra de forma otimizada. Por exemplo, em Java/C#, a conversão é feita nativamente subtraindo o char de '0' (ou ASCII 48), garantindo que tanto números ('0' a '9') quanto letras ('A' a 'Z') tenham os valores corretos."
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
        },
        {
            "question": "Como funciona o número de RG no Brasil?",
            "answer": "O Registro Geral é emitido pelas Secretarias de Segurança Pública (SSP) de cada estado e normalmente possui 8 a 9 dígitos mais um dígito verificador."
        }
    ],
    "cnh": [
        {
            "question": "Como é calculado o dígito verificador da CNH?",
            "answer": "A Carteira Nacional de Habilitação possui 11 dígitos, sendo os dois últimos os dígitos verificadores calculados pelo algoritmo oficial do Denatran/Senatran."
        }
    ],
    "inscricao-estadual": [
        {
            "question": "O que é e para que serve a Inscrição Estadual (IE)?",
            "answer": "A Inscrição Estadual é o registro formal do contribuinte junto à Secretaria de Estado da Fazenda (Sefaz) de cada UF. Ela é obrigatória para empresas que realizam circulação de mercadorias (comércio, indústria e transporte interestadual), permitindo a apuração e o recolhimento do ICMS."
        },
        {
            "question": "Como consultar a Inscrição Estadual de uma empresa no Sintegra ou CCC?",
            "answer": "A consulta pública pode ser realizada pelo portal do Sintegra de cada estado ou no Cadastro Centralizado de Contribuinte (CCC) mantido pela Sefaz Nacional, bastando informar o CNPJ da pessoa jurídica para verificar sua situação cadastral (Habilitado, Não Habilitado ou Baixado)."
        },
        {
            "question": "Por que a Inscrição Estadual possui formato e regras de validação diferentes em cada estado?",
            "answer": "Como o ICMS é um tributo de competência estadual, cada Secretaria de Fazenda instituiu sua própria regra de formação (variando de 8 dígitos no Rio de Janeiro a 14 dígitos no Amapá) e seus próprios algoritmos de dígitos verificadores (Módulo 11, Módulo 10 ou pesos ponderados específicos)."
        },
        {
            "question": "Microempreendedor Individual (MEI) precisa ter Inscrição Estadual?",
            "answer": "Somente o MEI que desempenha atividades de comércio, indústria ou transporte intermunicipal/interestadual possui Inscrição Estadual automática emitida no ato de abertura do CNPJ. Prestadores de serviços puros possuem apenas Inscrição Municipal (ISS)."
        },
        {
            "question": "É obrigatório informar a Inscrição Estadual na emissão de NF-e e NFC-e?",
            "answer": "Sim. Para destinatários contribuintes do ICMS, a identificação da IE é campo de preenchimento obrigatório no Schema XML da Nota Fiscal Eletrônica. Caso o destinatário não seja contribuinte ou isento, utiliza-se a indicação específica no documento fiscal."
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
        },
        {
            "question": "Como funciona a estrutura do Título de Eleitor?",
            "answer": "Possui 12 dígitos: 8 dígitos sequenciais, 2 dígitos indicando o estado de emissão (código de 01 a 28) e 2 dígitos verificadores calculados por Módulo 11."
        }
    ],
    "certificate-generator": [
        {
            "question": "Como gerar certificados digitais e de conclusão para testes?",
            "answer": "Crie modelos de certificados personalizáveis com dados fictícios para validar módulos de cursos, LMS e emissão de diplomas em PDF de alta resolução (A4 Paisagem)."
        },
        {
            "question": "Qual a validade jurídica de um certificado de curso livre gerado online?",
            "answer": "Certificados de cursos livres possuem validade para comprovação de horas complementares, atividades extracurriculares e capacitação profissional em conformidade com a Lei nº 9.394/96 (Diretrizes e Bases da Educação Nacional), desde que emitidos por instituição ou instrutor devidamente identificado."
        },
        {
            "question": "Como testar a emissão de certificados em sistemas LMS e plataformas EAD?",
            "answer": "Desenvolvedores utilizam o gerador para validar pipelines de renderização de PDF (como jsPDF, Puppeteer e html2pdf), testando o ajuste de nomes longos, quebra de linha de títulos de cursos e resolução de fontes antes de liberar o fluxo para produção."
        },
        {
            "question": "Quais elementos são essenciais em um certificado de conclusão profissional?",
            "answer": "Um certificado completo deve conter o nome do aluno, título do curso ou treinamento, carga horária total, data de conclusão, nome e assinatura do instrutor ou instituição emissora, além de identificador ou código de autenticidade."
        },
        {
            "question": "Posso imprimir o certificado gerado diretamente em papel A4?",
            "answer": "Sim. O gerador exporta o documento em dimensões padrão A4 no formato Paisagem (Landscape) e alta densidade de pixels (2x pixel ratio), permitindo impressão direta em papel offset, couchê ou diplomata com máxima nitidez."
        }
    ],
    "contract-generator": [
        {
            "question": "Para que serve o gerador de contratos?",
            "answer": "Permite gerar minutas de contratos de prestação de serviços, locação e acordos de confidencialidade (NDA) com cláusulas padrão para testes."
        }
    ],
    "cnab-parser": [
        {
            "question": "Como identificar se um arquivo é CNAB 240 ou CNAB 400?",
            "answer": "A forma mais direta é medindo a quantidade de caracteres de cada linha. No CNAB 240, todas as linhas possuem exatamente 240 caracteres. No CNAB 400, cada linha possui exatamente 400 caracteres."
        },
        {
            "question": "O que significa o código de ocorrência nos arquivos de retorno?",
            "answer": "O código de ocorrência indica qual ação foi efetuada pelo banco sobre o título. Por exemplo: o código 06 indica que o boleto foi pago (liquidado), o código 02 indica entrada confirmada e o código 03 sinaliza que a remessa foi rejeitada devido a algum erro cadastral."
        },
        {
            "question": "Meus dados bancários são salvos nos servidores do DevThru?",
            "answer": "Não. Todo o processo de leitura e decodificação do arquivo CNAB é executado exclusivamente no seu navegador via JavaScript client-side. Nenhum dado do seu arquivo é enviado para servidores externos."
        }
    ],
    "boleto-validator": [
        {
            "question": "Qual a diferença entre Linha Digitável e Código de Barras do boleto?",
            "answer": "O código de barras possui 44 dígitos contínuos. A linha digitável possui 47 ou 48 dígitos divididos em campos com dígitos verificadores próprios para digitação manual."
        },
        {
            "question": "Como saber o banco emissor, valor e vencimento do boleto?",
            "answer": "Os 3 primeiros dígitos indicam o código do banco no Bacen (ex: 001 Banco do Brasil, 237 Bradesco, 341 Itaú). Os últimos dígitos contêm o fator de vencimento e o valor em centavos."
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
        },
        {
            "question": "Como gerar boletos bancários para testes?",
            "answer": "A ferramenta gera linhas digitáveis e códigos de barras no padrão FEBRABAN com valores e datas de vencimento configuráveis para testes de checkout e conciliação."
        }
    ],
    "pix-parser": [
        {
            "question": "O que é o payload do Pix Copia e Cola?",
            "answer": "É uma string codificada no padrão internacional EMVCo contendo tags identificadoras (TLVs) com a chave Pix, valor, identificador de transação (txid) e checksum CRC16."
        },
        {
            "question": "Como alterar o valor de um Pix Copia e Cola e recalcular o QR Code?",
            "answer": "Nossa ferramenta permite editar o campo de valor (Tag 54) e recalcula instantaneamente o CRC16 final e o QR Code visual."
        }
    ],
    "placa-pix": [
        {
            "question": "Como gerar placa de Pix para balcão de loja?",
            "answer": "Permite criar e baixar placas personalizadas em PDF ou imagem com sua chave Pix, QR Code gerado, nome do recebedor e redes sociais."
        }
    ],
    "credit-card-generator": [
        {
            "question": "Como funciona o algoritmo de Luhn nos cartões de crédito?",
            "answer": "O Algoritmo de Luhn (fórmula Módulo 10) valida o número do cartão dobrando os dígitos alternados da direita para a esquerda e somando os algarismos resultantes. Se a soma total for divisível por 10, o número é estruturalmente válido."
        },
        {
            "question": "Os cartões de crédito gerados aqui possuem saldo ou realizam compras reais?",
            "answer": "Não. Todos os números gerados são estritamente fictícios e matematicamente válidos pelo algoritmo de Luhn para fins de desenvolvimento de software, testes de QA e integração de checkouts. Não possuem vínculo bancário, saldo ou titularidade civil."
        },
        {
            "question": "Como testar pagamentos em ambiente Sandbox de gateways (Stripe, Pagar.me, Mercado Pago)?",
            "answer": "Ambientes de teste (sandbox) exigem que o número passe pela validação de máscara e checksum de Luhn no front-end antes de simular aprovações ou recusas no gateway. Além disso, as adquirentes fornecem códigos CVV específicos para simular cenários de aprovação, saldo insuficiente ou cartão recusado."
        },
        {
            "question": "Qual é a estrutura do BIN/IIN nas principais bandeiras de cartão?",
            "answer": "Os primeiros 6 a 8 dígitos correspondem ao BIN (Bank Identification Number). A bandeira Visa inicia com o prefixo 4; Mastercard utiliza prefixos de 51 a 55 e a faixa 2221 a 2720; American Express inicia com 34 ou 37; e a bandeira Elo possui faixas nacionais específicas como 401178, 5067 e 636368."
        },
        {
            "question": "Para que serve o código CVV/CVC e a data de validade nos testes?",
            "answer": "O CVV (Card Verification Value) e a expiração garantem a integridade dos dados durante transações 'card-not-present' (online). Nos testes, simulam a passagem correta do payload para tokens de pagamento criptografados em conformidade com o padrão PCI-DSS."
        }
    ],
    "tax-calculator": [
        {
            "question": "Como funciona a calculadora de alíquota efetiva do Simples Nacional?",
            "answer": "A alíquota efetiva é calculada pela fórmula: (RBT12 x Alíquota Nominal - Parcela a Deduzir) / RBT12, de acordo com as tabelas dos Anexos I a V da Lei Complementar 123/2006."
        }
    ],
    "split-payment": [
        {
            "question": "O que é o Split Payment na Reforma Tributária?",
            "answer": "O Split Payment é o mecanismo em que o imposto (IBS + CBS) é separado e recolhido automaticamente pelos bancos, credenciadoras de cartão ou arranjos de pagamento no exato momento da liquidação financeira da transação."
        },
        {
            "question": "Qual a diferença entre IBS e CBS?",
            "answer": "O IBS (Imposto sobre Bens e Serviços) substitui o ICMS estadual e o ISS municipal. Já a CBS (Contribuição sobre Bens e Serviços) substitui o PIS e a COFINS federais."
        },
        {
            "question": "Como o Split Payment afeta o desenvolvimento de ERPs e E-commerces?",
            "answer": "Os sistemas precisarão ajustar os fluxos de conciliação bancária: a conta da empresa não receberá mais o valor bruto da venda para depois pagar a guia de imposto. O valor que entra na conta será o líquido, exigindo integração de webhooks e relatórios detalhados de retenção da adquirente."
        },
        {
            "question": "Como testar a retenção em ambiente de desenvolvimento (Staging)?",
            "answer": "Recomendamos utilizar o payload JSON simulado gerado nesta ferramenta para criar testes unitários e testes de integração de conciliação bancária na sua aplicação."
        }
    ],
    "vet-efx-calculator": [
        {
            "question": "O que é o VET (Valor Efetivo Total) exigido pelo Banco Central?",
            "answer": "O Valor Efetivo Total (VET) representa o custo total em Reais de cada unidade de moeda estrangeira comprada ou vendida, englobando a taxa de câmbio comercial, as tarifas/spread da instituição e o IOF incidente. O Banco Central torna obrigatória a exibição clara do VET ao cliente antes da finalização de qualquer operação de câmbio ou eFX."
        },
        {
            "question": "O que é uma prestadora eFX e quem pode atuar?",
            "answer": "As prestadoras eFX (Electronic Foreign Exchange) são instituições autorizadas pelo Banco Central a realizar serviços de pagamento internacional, como viabilização de compras em sites estrangeiros, transferências unilaterais e envio de remessas sem a necessidade de celebração de um contrato formal de câmbio tradicional para valores de até US$ 10.000,00."
        },
        {
            "question": "Qual a alíquota atual do IOF para e-commerce e serviços no exterior?",
            "answer": "Para aquisição de bens e serviços no exterior via e-commerce/SaaS, a alíquota padrão do IOF é de 4,38% (seguindo o cronograma de redução gradual do governo). Para transferências de disponibilidade no exterior entre contas do mesmo titular, a alíquota é de 1,10%, e para demais remessas padrão é de 0,38%."
        }
    ],
    "iban-validator": [
        {
            "question": "Como é a estrutura de um código IBAN?",
            "answer": "Um código IBAN tem comprimento variável (de até 34 caracteres alfanuméricos) dependendo do país. Ele é composto por:\n\n• Código do país: 2 letras (ex: BR, PT, DE).\n• Dígito verificador: 2 números calculados matematicamente.\n• BBAN (Basic Bank Account Number): Identificador local da conta bancária que inclui o código do banco, agência e conta."
        },
        {
            "question": "Como funciona a validação matemática do IBAN (Modulo 97)?",
            "answer": "A validação segue o padrão ISO 7064 (Mod 97-10). Para validar, movemos os 4 primeiros caracteres (país e dígitos verificadores) para o final do código, convertemos todas as letras em valores numéricos (A=10, B=11 ... Z=35) e efetuamos a operação número % 97. O resultado deve ser exatamente igual a 1 para o IBAN ser considerado válido."
        },
        {
            "question": "Qual o tamanho do IBAN no Brasil?",
            "answer": "No Brasil, o IBAN é padronizado com 29 caracteres alfanuméricos, iniciando sempre com BR nas duas primeiras posições, seguidos por 2 dígitos verificadores e os dados completos da conta bancária nacional."
        }
    ],
    "json": [
        {
            "question": "O formatador JSON envia dados para a internet?",
            "answer": "Não. A validação e formatação (beautify/minify) de JSON ocorrem 100% no navegador do usuário, garantindo privacidade total para dados e payloads confidenciais."
        },
        {
            "question": "Como corrigir erros comuns de sintaxe no JSON?",
            "answer": "Erros comuns incluem vírgulas no final de objetos (trailing commas), chaves sem aspas duplas e uso de aspas simples. O validador do DevThru aponta a linha e coluna exatas do erro."
        }
    ],
    "base64": [
        {
            "question": "O que é a codificação Base64 e quando utilizá-la?",
            "answer": "Base64 é um algoritmo que converte dados binários ou texto em um conjunto de 64 caracteres ASCII legíveis, muito utilizado para enviar anexos em e-mails e tokens JWT."
        },
        {
            "question": "Base64 é considerado um método de criptografia?",
            "answer": "Não. Base64 é apenas um esquema de codificação reversível e não oferece segurança criptográfica. Qualquer pessoa pode decodificar uma string Base64."
        }
    ],
    "qrcode": [
        {
            "question": "Como funciona o gerador de QR Code do DevThru?",
            "answer": "Permite criar códigos QR 2D para URLs, textos, redes Wi-Fi e contatos, com opções de download em alta resolução (PNG/SVG)."
        },
        {
            "question": "O QR Code gerado tem prazo de validade?",
            "answer": "Não. Trata-se de um QR Code estático que armazena as informações diretamente no padrão de pontos, funcionando indefinidamente sem depender de redirecionamento de servidor."
        }
    ],
    "whatsapp-link-generator": [
        {
            "question": "Como funciona o link direto wa.me do WhatsApp?",
            "answer": "O link no formato https://wa.me/<numero> é o padrão oficial desenvolvido pela Meta. Quando alguém clica no link pelo celular, o aplicativo do WhatsApp abre diretamente na conversa com o número informado. Pelo computador, o link redireciona para o WhatsApp Web ou para o aplicativo de desktop."
        },
        {
            "question": "É necessário ter o número salvo na agenda para abrir a conversa?",
            "answer": "Não! Essa é a principal vantagem do link wa.me: qualquer pessoa pode iniciar uma conversa com você sem precisar salvar seu número na agenda telefônica do smartphone."
        },
        {
            "question": "Como colocar o link do WhatsApp na bio do Instagram?",
            "answer": "Basta gerar o link com seu número e mensagem desejada, clicar em Copiar Link, abrir o Instagram, ir em Editar Perfil > Links > Adicionar Link Externo e colar a URL."
        }
    ],
    "curl-converter": [
        {
            "question": "Como copiar uma requisição em cURL diretamente do navegador?",
            "answer": "No Chrome, Firefox, Edge ou Safari, abra as Ferramentas do Desenvolvedor (F12), vá até a aba Rede (Network), realize a ação desejada no site, clique com o botão direito na requisição e selecione Copiar > Copiar como cURL (Copy as cURL). Em seguida, cole aqui no DevThru."
        },
        {
            "question": "O código convertido envia dados para algum servidor?",
            "answer": "Não! Todo o processo de parsing da sintaxe cURL e a geração do código em JavaScript, Python, Go e PHP ocorre inteiramente no seu navegador de forma local e segura."
        },
        {
            "question": "Quais linguagens são suportadas no conversor de cURL?",
            "answer": "Gera código pronto para JavaScript (Fetch nativo e Axios), Python (Requests), Go (net/http) e PHP (curl_exec)."
        }
    ],
    "password": [
        {
            "question": "Como é gerada uma senha segura?",
            "answer": "A ferramenta utiliza o gerador criptograficamente seguro do navegador (crypto.getRandomValues) combinando letras maiúsculas, minúsculas, números e símbolos especiais."
        },
        {
            "question": "As senhas geradas são armazenadas?",
            "answer": "Não. Todo o processo é executado na memória do cliente e nenhuma senha gerada é gravada ou enviada para servidores."
        },
        {
            "question": "Qual o tamanho ideal de uma senha forte?",
            "answer": "Use pelo menos 12 caracteres, de preferência 16 ou mais, combinando letras maiúsculas, minúsculas, números e símbolos. Cada caractere extra multiplica o número de combinações possíveis e torna ataques de força bruta inviáveis."
        },
        {
            "question": "Devo usar a mesma senha em vários sites?",
            "answer": "Não. Se um site vazar sua senha, todas as contas que a reutilizam ficam expostas. Gere uma senha aleatória diferente para cada serviço e guarde-as em um gerenciador de senhas, ativando a verificação em duas etapas sempre que possível."
        },
        {
            "question": "Uma senha aleatória é melhor que uma frase-senha?",
            "answer": "Ambas são seguras se forem longas. Senhas aleatórias de 16+ caracteres são ideais para guardar em gerenciadores; frases-senha com 4 ou mais palavras aleatórias são mais fáceis de memorizar para a senha mestra."
        }
    ],
    "hash": [
        {
            "question": "Quais algoritmos de Hash estão disponíveis?",
            "answer": "Suporta geração instantânea de SHA-256, SHA-512, SHA-1, SHA-384 e MD5 utilizando a Web Cryptography API do navegador."
        },
        {
            "question": "É possível reverter uma função de hash?",
            "answer": "Não. Hashes criptográficos são funções de mão única (one-way functions) projetadas para serem matematicamente irreversíveis."
        }
    ],
    "case-converter": [
        {
            "question": "Quais formatos de texto são suportados no conversor?",
            "answer": "Converte textos para camelCase, snake_case, PascalCase, kebab-case, UPPERCASE, lowercase, Title Case e CONSTANT_CASE."
        },
        {
            "question": "Como transformar um texto todo em letra maiúscula?",
            "answer": "Cole o texto na caixa e escolha a opção MAIÚSCULAS (UPPERCASE). O resultado aparece na hora e pode ser copiado com um clique. Acentos e cedilha são preservados (ex.: \"ação\" vira \"AÇÃO\")."
        },
        {
            "question": "Como converter texto de maiúsculo para minúsculo?",
            "answer": "Selecione a opção minúsculas (lowercase). É útil para corrigir textos digitados com o Caps Lock ligado. Para deixar só a primeira letra de cada palavra maiúscula, use Title Case."
        },
        {
            "question": "Existe atalho no Word ou Google Docs para mudar maiúsculas e minúsculas?",
            "answer": "No Word, selecione o texto e pressione Shift + F3 para alternar entre maiúsculas, minúsculas e iniciais maiúsculas. No Google Docs, use o menu Formatar > Texto > Maiúsculas e minúsculas. O conversor online funciona em qualquer lugar, sem instalar nada."
        }
    ],
    "diff-checker": [
        {
            "question": "Como funciona o comparador de texto e código?",
            "answer": "Analisa dois blocos de texto linha por linha ou caractere por caractere, destacando adições em verde e remoções em vermelho com visualização lado a lado."
        }
    ],
    "email-validator": [
        {
            "question": "Como é feita a validação de e-mail?",
            "answer": "Verifica a conformidade sintática com as RFCs 5322 e 5321, checando estrutura de usuário, arroba, domínio válido e restrições de caracteres."
        }
    ],
    "url-encoder": [
        {
            "question": "Qual a diferença entre encodeURI e encodeURIComponent?",
            "answer": "encodeURI codifica uma URL completa preservando delimitadores como / e ?, enquanto encodeURIComponent codifica todos os caracteres especiais para passar parâmetros em query strings."
        }
    ],
    "uuid": [
        {
            "question": "O que é um UUID v4 e qual o seu tamanho?",
            "answer": "O UUID Versão 4 é um identificador gerado de forma puramente aleatória. Ele possui o tamanho exato de 36 caracteres, contendo 32 caracteres hexadecimais separados por 4 hifens no formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.\n\nO dígito \"4\" na terceira seção indica que se trata de uma versão 4, e o caractere \"y\" na quarta seção é restrito aos valores 8, 9, a ou b."
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
            "question": "Como validar e formatar um arquivo XML?",
            "answer": "O validador checa se as tags estão devidamente fechadas, se a estrutura hierárquica é válida e aponta erros de parse diretamente no código."
        },
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
            "answer": "Ao colar o código e clicar em \"Validar\", caso o XML possua erros, o validador indicará a linha exata e a mensagem de erro fornecida pelo parser (ex: \"Mismatch tag\" ou \"Attribute value expected\"). A causa mais comum é a falta de fechamento de alguma tag ou caracteres especiais inválidos como o & que deve ser escrito como &amp; no padrão XML."
        }
    ],
    "crontab-generator": [
        {
            "question": "Como funciona a sintaxe do Crontab?",
            "answer": "A sintaxe padrão de 5 campos representa: Minuto (0-59), Hora (0-23), Dia do Mês (1-31), Mês (1-12) e Dia da Semana (0-7)."
        }
    ],
    "sql-formatter": [
        {
            "question": "Quais dialetos SQL são suportados no formatador?",
            "answer": "Formata e indenta consultas para PostgreSQL, MySQL, SQL Server (T-SQL), SQLite, Oracle e MariaDB."
        }
    ],
    "jwt-debugger": [
        {
            "question": "O que é um JSON Web Token (JWT) e sua estrutura?",
            "answer": "Um JWT é um padrão aberto (RFC 7519) usado para transmitir de forma segura informações estruturadas como um objeto JSON. Ele é composto por três partes separadas por pontos (.): Header (indica o algoritmo de criptografia e tipo de token), Payload (dados do usuário e metadados de sessão, conhecidos como claims) e Signature (garante que o token não foi adulterado)."
        },
        {
            "question": "Como funciona a decodificação local e qual a garantia de privacidade?",
            "answer": "Nesta ferramenta, toda a decodificação é feita diretamente no navegador utilizando JavaScript local (atob e jwt-decode). Seu token nunca é enviado ou transmitido para servidores de terceiros, o que garante 100% de privacidade para inspecionar payloads de teste e tokens de APIs em desenvolvimento."
        },
        {
            "question": "Por que a assinatura (Signature) não é validada aqui?",
            "answer": "Para verificar a assinatura de um token criptografado simetricamente (como HS256), seria necessário que você inserisse a sua chave secreta (secret key) no navegador. Inserir chaves privadas em ferramentas web terceiras é uma prática de alto risco de segurança. Por esse motivo, limitamos a depuração à visualização do Header e Payload, mantendo o processo seguro."
        }
    ],
    "minifier": [
        {
            "question": "Para que serve a minificação de código?",
            "answer": "Remove espaços em branco, comentários e quebras de linha de arquivos CSS, JavaScript e HTML para reduzir o tamanho do payload e acelerar o carregamento web."
        }
    ],
    "timestamp": [
        {
            "question": "O que é o Unix Timestamp Epoch?",
            "answer": "É a contagem de segundos (ou milissegundos) decorridos desde 1 de Janeiro de 1970 UTC. É o formato padrão para armazenamento de datas em bancos de dados e APIs."
        }
    ],
    "mock-data": [
        {
            "question": "Como gerar dados de mock em lote para testes?",
            "answer": "Permite criar arrays e objetos estruturados em JSON ou CSV contendo nomes, e-mails, números, IDs e endereços fictícios para desenvolvimento de interfaces."
        }
    ],
    "regex": [
        {
            "question": "Qual a diferença entre os seletores .+ e .* no Regex?",
            "answer": "Ambos são quantificadores usados combinando o caractere ponto (. - que representa qualquer caractere) com um quantificador de repetição:\n\n• .+ (Um ou mais): O sinal de adição (+) exige que ocorra pelo menos um caractere correspondente. A busca falhará se a linha estiver vazia.\n• .* (Zero ou mais): O asterisco (*) permite que ocorra qualquer quantidade de caracteres correspondentes, incluindo nenhuma (zero). Ele corresponderá a linhas vazias."
        },
        {
            "question": "O que fazem as flags g, i e m no Regex?",
            "answer": "• g (Global): Procura todas as correspondências no texto de entrada em vez de parar após encontrar a primeira ocorrência.\n• i (Case Insensitive): Ignora a diferença entre letras maiúsculas e minúsculas durante a busca (ex: /abc/i encontrará \"ABC\").\n• m (Multiline): Faz com que os caracteres de início (^) e fim ($) correspondam ao início e fim de cada linha individual do texto, e não apenas ao início e fim do texto completo."
        },
        {
            "question": "Como testar expressões regulares online?",
            "answer": "Permite testar e validar padrões de Regex em tempo real com explicação de grupos de captura, flags (g, i, m) e substituições de texto."
        }
    ],
    "currency": [
        {
            "question": "Como funciona o conversor de moedas do DevThru?",
            "answer": "Converte valores entre Real (BRL), Dólar (USD), Euro (EUR), Libra (GBP) e outras moedas com base em cotações cambiais atualizadas."
        }
    ],
    "pixel-to-rem": [
        {
            "question": "Como converter Pixels (px) para REM no CSS?",
            "answer": "A conversão padrão divide o valor em pixels pelo tamanho base da fonte (geralmente 16px). Exemplo: 24px / 16px = 1.5rem."
        }
    ],
    "unit": [
        {
            "question": "Quais unidades de medida podem ser convertidas?",
            "answer": "Suporta conversão entre unidades de comprimento, peso, volume, temperatura, área e velocidade nos sistemas métrico e imperial."
        },
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
        },
        {
            "question": "Como converter números entre diferentes bases numéricas?",
            "answer": "Converte instantaneamente valores entre Binário (base 2), Octal (base 8), Decimal (base 10) e Hexadecimal (base 16)."
        }
    ],
    "lorem": [
        {
            "question": "O que é o texto Lorem Ipsum?",
            "answer": "É um texto de preenchimento padrão utilizado na indústria gráfica e web design para diagramação e visualização de layouts antes da inserção do conteúdo final."
        }
    ],
    "deadline-calculator": [
        {
            "question": "Como calcular prazos em dias úteis?",
            "answer": "Calcula a data final de um prazo considerando apenas dias úteis e excluindo finais de semana e feriados nacionais brasileiros."
        }
    ],
    "nick-generator": [
        {
            "question": "Como criar um nick legal para jogos?",
            "answer": "Escolha um estilo (gamer, fofo, sombrio ou engraçado), digite seu nome ou apelido se quiser personalizar e clique em Gerar nicks. O gerador combina palavras, prefixos e sufixos do estilo escolhido. Clique várias vezes até achar um que combine com você."
        },
        {
            "question": "Qual o limite de caracteres do nick no Free Fire?",
            "answer": "O Free Fire aceita nicks de até 12 caracteres. Letras diferentes e símbolos contam como caracteres e alguns podem não ser aceitos; se o jogo recusar, troque o estilo de letra para Normal, Negrito ou Versalete."
        },
        {
            "question": "Posso usar letras diferentes no nick?",
            "answer": "Sim. Use o campo \"Letras diferentes\" para aplicar estilos como negrito, cursiva, gótica ou círculos a todos os nicks gerados. São caracteres Unicode, que funcionam na maioria dos jogos, no Discord e no Instagram."
        },
        {
            "question": "O nick gerado é único?",
            "answer": "Os nicks são combinações aleatórias e não verificamos a disponibilidade em cada jogo. Se o nick já estiver em uso, ligue a opção de números ou gere outra lista."
        }
    ],
    "cep": [
        {
            "question": "O CEP gerado existe de verdade?",
            "answer": "O CEP gerado fica dentro da faixa oficial dos Correios para o estado escolhido e tem formato válido, mas não há garantia de que corresponda a um logradouro real. Ele é feito para testes de software, como preencher formulários e validar regras por UF."
        },
        {
            "question": "Como saber de qual estado é um CEP?",
            "answer": "Pelos 5 primeiros dígitos. Cada estado tem uma faixa: São Paulo vai de 01000-000 a 19999-999, Rio de Janeiro de 20000-000 a 28999-999, Minas Gerais de 30000-000 a 39999-999 e assim por diante. Digite o CEP no campo \"Descobrir o estado de um CEP\" para ver a UF."
        },
        {
            "question": "O que significam os dígitos do CEP?",
            "answer": "O primeiro dígito indica a região (ex.: 0 e 1 para São Paulo), o segundo a sub-região, o terceiro o setor, o quarto o subsetor e o quinto o divisor de subsetor. Os três últimos (sufixo) identificam o logradouro; sufixos de 900 a 999 são usados para CEPs especiais, como Caixas Postais e grandes usuários."
        },
        {
            "question": "Como validar CEP em formulários?",
            "answer": "Verifique se o valor tem 8 dígitos (com ou sem hífen, regex /^\\d{5}-?\\d{3}$/) e, se precisar conferir o estado, compare o prefixo com a faixa da UF. Para confirmar o endereço completo, consulte uma base atualizada dos Correios."
        }
    ],
    "fancy-letters": [
        {
            "question": "Como usar letras diferentes no Instagram?",
            "answer": "Digite seu texto, escolha o estilo e clique em copiar. Depois cole na bio, no nome de perfil, na legenda ou nos comentários do Instagram. Funciona porque as letras são caracteres Unicode, não uma fonte."
        },
        {
            "question": "As letras diferentes funcionam em nick de Free Fire e outros jogos?",
            "answer": "Na maioria dos jogos e apps, sim. Alguns jogos limitam os caracteres aceitos no nick; se um estilo aparecer como quadrado ou for recusado, teste outro, como Versalete, Negrito ou Círculos."
        },
        {
            "question": "Por que algumas letras aparecem como quadrados?",
            "answer": "O aparelho ou aplicativo não tem uma fonte com aquele caractere Unicode. Celulares mais antigos podem não exibir alfabetos raros. Estilos como Negrito, Itálico e Versalete têm a maior compatibilidade."
        },
        {
            "question": "Letras com acento funcionam?",
            "answer": "Sim. O acento é preservado como um sinal combinante sobre a letra estilizada (ex.: ã, é, ç). A aparência pode variar um pouco entre aplicativos."
        }
    ],
    "number-to-words": [
        {
            "question": "Como escrever um valor em reais por extenso?",
            "answer": "Escreva a parte inteira seguida de \"real\" ou \"reais\" e os centavos seguidos de \"centavo\" ou \"centavos\", ligados por \"e\". Ex.: R$ 1.250,99 = mil duzentos e cinquenta reais e noventa e nove centavos."
        },
        {
            "question": "Quando usar \"cem\" e quando usar \"cento\"?",
            "answer": "Use \"cem\" só para o número 100 exato. De 101 a 199 usa-se \"cento\": cento e um, cento e cinquenta, cento e noventa e nove."
        },
        {
            "question": "Escreve-se \"mil\" ou \"um mil\"?",
            "answer": "O correto é apenas \"mil\" (1.000 = mil; 1.500 = mil e quinhentos). A forma \"um mil\" aparece às vezes em cheques para evitar fraudes, mas não é a norma padrão."
        },
        {
            "question": "Quando vai \"de\" antes de reais?",
            "answer": "Quando o valor termina em milhão, bilhão ou trilhão exatos: R$ 2.000.000,00 = dois milhões de reais. Já R$ 2.500.000,00 = dois milhões e quinhentos mil reais."
        }
    ],
    "rule-of-three": [
        {
            "question": "Como fazer regra de 3 simples?",
            "answer": "Monte a proporção A está para B assim como C está para X. Na regra direta, multiplique em cruz: X = (B × C) ÷ A. Ex.: se 2 kg custam R$ 10, 5 kg custam (10 × 5) ÷ 2 = R$ 25."
        },
        {
            "question": "Qual a diferença entre regra de 3 direta e inversa?",
            "answer": "Na direta, as grandezas crescem juntas (mais quilos, maior preço). Na inversa, quando uma cresce a outra diminui (mais trabalhadores, menos dias). Na inversa a conta é X = (A × B) ÷ C."
        },
        {
            "question": "Como usar regra de 3 para calcular porcentagem?",
            "answer": "Use 100% como um dos termos. Ex.: se 200 é 100%, quanto é 30? 200 está para 100 assim como 30 está para X: X = (100 × 30) ÷ 200 = 15%. Para isso também existe a Calculadora de Porcentagem."
        }
    ],
    "percentage-calculator": [
        {
            "question": "Como calcular porcentagem de um valor?",
            "answer": "Multiplique o valor pela porcentagem e divida por 100. Ex.: 15% de 200 = (15 × 200) ÷ 100 = 30."
        },
        {
            "question": "Como calcular desconto em porcentagem?",
            "answer": "Multiplique o valor por (1 − desconto ÷ 100). Ex.: R$ 200 com 10% de desconto = 200 × 0,9 = R$ 180. Para aumento, use (1 + aumento ÷ 100)."
        },
        {
            "question": "Como calcular a variação percentual entre dois valores?",
            "answer": "Subtraia o valor antigo do novo, divida pelo antigo e multiplique por 100. Ex.: de 80 para 100 = (100 − 80) ÷ 80 × 100 = 25% de aumento."
        },
        {
            "question": "Um aumento de 10% seguido de desconto de 10% volta ao valor original?",
            "answer": "Não. 100 + 10% = 110; 110 − 10% = 99. O desconto incide sobre um valor maior, então o resultado final fica 1% abaixo do original."
        }
    ],
    "random-number": [
        {
            "question": "Como sortear um número aleatório entre 1 e 100?",
            "answer": "Deixe o mínimo em 1, o máximo em 100, a quantidade em 1 e clique em Sortear. Para sortear vários números sem repetir, aumente a quantidade e mantenha \"Sem repetição\" ligado."
        },
        {
            "question": "O sorteio é realmente aleatório?",
            "answer": "Sim. Usamos crypto.getRandomValues, o gerador criptográfico do navegador, com descarte de valores para eliminar o viés de módulo. Todos os números do intervalo têm a mesma probabilidade."
        },
        {
            "question": "Posso usar para sorteio de rifa ou de Instagram?",
            "answer": "Sim. Numere os participantes, defina o intervalo (ex.: 1 a 350) e sorteie. Para mais transparência, grave a tela no momento do sorteio."
        }
    ],
    "character-counter": [
        {
            "question": "O que é medido no contador de caracteres?",
            "answer": "Conta o número total de caracteres, palavras, linhas, parágrafos e tempo estimado de leitura de qualquer bloco de texto."
        },
        {
            "question": "Espaços contam como caracteres?",
            "answer": "Sim. Espaços, quebras de linha e pontuação contam como caracteres na maioria das plataformas (X, Instagram, formulários). Por isso o contador mostra dois números: caracteres com espaço e caracteres sem espaço."
        },
        {
            "question": "Quantos caracteres cabem em um post do X (Twitter) e do Instagram?",
            "answer": "No X, o limite é de 280 caracteres por post para contas gratuitas. No Instagram, a legenda aceita até 2.200 caracteres e a bio até 150. Links no X contam sempre como 23 caracteres, independente do tamanho real."
        },
        {
            "question": "Qual o tamanho ideal de title e meta description para SEO?",
            "answer": "O title deve ter entre 50 e 60 caracteres e a meta description entre 150 e 160 caracteres para não serem cortados nos resultados do Google. O limite real é medido em pixels, então letras largas (como M e W) ocupam mais espaço."
        },
        {
            "question": "Meu texto é enviado para algum servidor?",
            "answer": "Não. A contagem é feita localmente no seu navegador, em tempo real. Nenhum texto digitado é armazenado ou transmitido."
        }
    ],
    "email-signature": [
        {
            "question": "Como criar uma assinatura de e-mail profissional em HTML?",
            "answer": "Gera assinaturas de e-mail estilizadas com foto, nome, cargo, redes sociais e logotipo para uso no Gmail, Outlook e Apple Mail."
        }
    ],
    "slug-generator": [
        {
            "question": "O que é um Slug de URL amigável?",
            "answer": "É a parte da URL que identifica uma página com palavras legíveis separadas por hífens, sem caracteres especiais ou acentos, otimizado para SEO."
        }
    ],
    "converter": [
        {
            "question": "Quais formatos de imagem podem ser convertidos?",
            "answer": "Converte imagens entre PNG, JPG, WebP, AVIF e ICO diretamente no navegador sem enviar arquivos para servidores."
        }
    ],
    "favicon": [
        {
            "question": "Como gerar um Favicon para sites?",
            "answer": "Gera o pacote completo de ícones em formatos .ico, .png (16x16, 32x32, 192x192) e apple-touch-icon para navegadores modernos."
        }
    ],
    "ocr": [
        {
            "question": "Como extrair texto de imagens com OCR online?",
            "answer": "Utiliza reconhecimento ótico de caracteres (OCR) para extrair textos legíveis de fotos, documentos escaneados e capturas de tela."
        }
    ],
    "placeholder": [
        {
            "question": "Como gerar imagens de placeholder para desenvolvimento?",
            "answer": "Cria imagens temporárias com dimensões, cores e textos personalizados para mockup de interfaces e wireframes."
        }
    ]
};
