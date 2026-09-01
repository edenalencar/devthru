// Esse arquivo contém o catálogo central de FAQs para Rich Snippets (Schema FAQPage)
// e acordeões de FAQ de todas as ferramentas do DevThru.

export interface FAQItem {
    question: string;
    answer: string;
}

export const TOOL_FAQS: Record<string, FAQItem[]> = {
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
            "answer": "O número de chassi, também conhecido como VIN (Vehicle Identification Number), é um código único de 17 caracteres que identifica cada veículo fabricado no mundo. Estrutura: WMI (1-3: Fabricante), VDS (4-9: Modelo e motor) e VIS (10-17: Ano e série)."
        },
        {
            "question": "Por que as letras I, O e Q não são permitidas no chassi?",
            "answer": "Segundo a norma ISO 3779, as letras I, O e Q são proibidas em números de chassi para evitar fraudes e erros de leitura ótica (OCR), pois se confundem com os números 1 e 0."
        },
        {
            "question": "Como funciona o cálculo do dígito verificador do chassi?",
            "answer": "O 9º dígito do chassi é o dígito verificador, calculado por um algoritmo de pesos ponderados baseado no padrão internacional ISO 3779."
        }
    ],
    "renavam": [
        {
            "question": "Como funciona o cálculo do dígito verificador do RENAVAM?",
            "answer": "O RENAVAM possui 11 dígitos, sendo os 10 primeiros o identificador e o 11º o Dígito Verificador (DV), calculado por um algoritmo de Módulo 11 com pesos de 2 a 9."
        },
        {
            "question": "Para que serve o gerador de RENAVAM para testes?",
            "answer": "Permite simular cadastros em sistemas de despachantes, concessionárias, seguradoras e sistemas de multas sem utilizar dados de veículos reais."
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
            "answer": "A chave é composta por 8 blocos: cUF (2 dígitos do estado), AAMM (ano e mês), CNPJ do emitente (14 dígitos), Modelo (55 para NF-e, 65 para NFC-e, 57 para CT-e, 58 para MDF-e), Série (3 dígitos), Número da nota (9 dígitos), Tipo de emissão (1 dígito), Código numérico (8 dígitos) e DV Módulo 11 (1 dígito)."
        },
        {
            "question": "Como funciona o cálculo do Dígito Verificador (Módulo 11)?",
            "answer": "Multiplica-se os 43 primeiros dígitos da direita para a esquerda por pesos de 2 a 9. Divide-se a soma por 11; se o resto for 0 ou 1, o DV é 0; caso contrário, é 11 menos o resto."
        },
        {
            "question": "Esta ferramenta consulta dados nos servidores da SEFAZ?",
            "answer": "Não. A análise sintática e o cálculo do DV ocorrem 100% no seu navegador de forma instantânea e segura, sem trafegar dados para servidores."
        }
    ],
    "nfe-generator": [
        {
            "question": "Como funciona o gerador de chave de acesso NF-e?",
            "answer": "Gera chaves estruturadas no padrão oficial da SEFAZ com 44 dígitos numéricos, incluindo UF, data, CNPJ, modelo 55, série, número da nota, código aleatório e DV calculado via Módulo 11."
        },
        {
            "question": "Qual a diferença entre o Modelo 55 (NF-e) e 65 (NFC-e)?",
            "answer": "O Modelo 55 é a Nota Fiscal Eletrônica tradicional para operações B2B e transporte de cargas. O Modelo 65 é a Nota Fiscal de Consumidor Eletrônica usada no varejo direto ao consumidor."
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
            "answer": "Celulares possuem 11 dígitos no total com DDD e primeiro dígito móvel 9 (seguido de 6 a 9). Telefones fixos (STFC) possuem 10 dígitos no total com DDD e primeiro dígito entre 2 e 5."
        },
        {
            "question": "Quais DDDs são suportados pela ferramenta?",
            "answer": "A ferramenta suporta todos os 67 DDDs oficiais do Brasil (SP 11-19, RJ 21-24, MG 31-38, PR 41-46, RS 51-55, DF 61, BA 71-77, PE 81-87, AM 92-97, PA 91-94, etc.)."
        },
        {
            "question": "Posso usar estes números para receber SMS de confirmação ou WhatsApp?",
            "answer": "Não. Esses números são fictícios e gerados por algoritmos matemáticos no navegador para fins de testes de software e validação de formulários. Eles não possuem chips nem linhas ativas em operadoras."
        },
        {
            "question": "Como gerar números de telefone em lote?",
            "answer": "Utilize o card de Geração em Massa, defina a quantidade desejada e copie a lista pronta para testes em planilhas ou seeders de banco de dados."
        }
    ],
    "address": [
        {
            "question": "Como o gerador de endereços e CEPs funciona?",
            "answer": "Ele gera endereços realistas com CEPs de formato válido, logradouro, bairro, cidade e estado brasileiros correspondentes aos padrões dos Correios."
        },
        {
            "question": "Os CEPs gerados são reais?",
            "answer": "Os CEPs seguem a faixa geográfica oficial de cada unidade federativa do Brasil para testes cadastrais e cálculo de frete simulado."
        }
    ],
    "person": [
        {
            "question": "O que inclui o gerador de pessoa completa?",
            "answer": "Gera um perfil cadastral completo para testes contendo nome, CPF válido, RG, data de nascimento, gênero, e-mail, telefone celular com DDD, endereço completo e dados profissionais."
        },
        {
            "question": "O uso destes dados está em conformidade com a LGPD?",
            "answer": "Sim. Todos os dados são 100% fictícios e gerados sinteticamente por algoritmos para desenvolvimento e testes de software, sem expor dados de pessoas reais."
        }
    ],
    "name": [
        {
            "question": "Como são gerados os nomes brasileiros?",
            "answer": "A ferramenta combina os primeiros nomes e sobrenomes mais comuns do Brasil com base nos censos do IBGE, permitindo filtrar por gênero masculino, feminino ou aleatório."
        }
    ],
    "email": [
        {
            "question": "Para que serve o gerador de e-mail?",
            "answer": "Cria endereços de e-mail sintéticos com domínios variados para preenchimento de formulários, testes de fluxo de cadastro e automação QA."
        }
    ],
    "lgpd-data": [
        {
            "question": "Como funciona a geração de dados de teste aderentes à LGPD?",
            "answer": "Gera massas de dados totalmente anonimizadas e sintéticas para que equipes de tecnologia testem sistemas em staging sem violar a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
        }
    ],
    "cpf": [
        {
            "question": "Como funciona a validação do CPF?",
            "answer": "O CPF possui 11 dígitos onde os 9 primeiros são a base e os 2 últimos são Dígitos Verificadores calculados por Módulo 11 com pesos decrescentes de 10 a 2 e de 11 a 2."
        },
        {
            "question": "O que é a região fiscal indicada pelo nono dígito do CPF?",
            "answer": "O 9º dígito do CPF identifica a Região Fiscal onde foi emitido (ex: 8 para São Paulo, 7 para RJ/ES, 1 para DF/GO/MT/MS/TO, 6 para Minas Gerais, 9 para PR/SC, 0 para RS)."
        }
    ],
    "cnpj": [
        {
            "question": "Como funciona o cálculo do CNPJ?",
            "answer": "O CNPJ possui 14 dígitos (8 do número base, 4 da filial e 2 de dígitos verificadores calculados por Módulo 11 com pesos de 2 a 9)."
        },
        {
            "question": "O que muda com o CNPJ Alfanumérico da Receita Federal?",
            "answer": "A partir de 2026, a Receita Federal introduziu letras no número base do CNPJ para expandir a quantidade de registros empresariais disponíveis no Brasil."
        }
    ],
    "rg": [
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
            "question": "O que é a Inscrição Estadual (IE)?",
            "answer": "É o número de registro das empresas contribuintes do ICMS junto à Secretaria da Fazenda de cada estado. Cada UF possui um formato e algoritmo de validação próprio."
        }
    ],
    "pis": [
        {
            "question": "Como é calculado o PIS/PASEP/NIT?",
            "answer": "O PIS possui 11 dígitos, onde os 10 primeiros são o número sequencial e o 11º é o dígito verificador calculado por Módulo 11 com pesos de 3, 2, 9, 8, 7, 6, 5, 4, 3, 2."
        }
    ],
    "titulo-eleitor": [
        {
            "question": "Como funciona a estrutura do Título de Eleitor?",
            "answer": "Possui 12 dígitos: 8 dígitos sequenciais, 2 dígitos indicando o estado de emissão (código de 01 a 28) e 2 dígitos verificadores calculados por Módulo 11."
        }
    ],
    "certificate-generator": [
        {
            "question": "Como gerar certificados digitais e de conclusão para testes?",
            "answer": "Crie modelos de certificados personalizáveis com dados fictícios para validar módulos de cursos, LMS e emissão de diplomas em PDF."
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
            "answer": "O código de ocorrência indica qual ação foi efetuada pelo banco sobre o título. Por exemplo: o código 06 indica que o boleto foi pago (liquidado), o código 02 indica entrada confirmada e o código 03 sinaliza que a remessa foi rejeitada."
        },
        {
            "question": "Meus dados bancários são salvos nos servidores do DevThru?",
            "answer": "Não. Todo o processo de leitura e decodificação do arquivo CNAB é executado exclusivamente no seu navegador via JavaScript client-side."
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
            "answer": "O Algoritmo de Luhn (Módulo 10) valida o número do cartão dobrando os dígitos alternados da direita para a esquerda e somando os resultados para verificar se a soma é múltipla de 10."
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
            "question": "O que é o Split Payment na Reforma Tributária (IBS e CBS)?",
            "answer": "É o mecanismo onde o imposto (IBS e CBS) é retido e recolhido automaticamente pelas instituições financeiras no ato da liquidação do pagamento eletrônico."
        }
    ],
    "vet-efx-calculator": [
        {
            "question": "O que é o Valor Efetivo Total (VET) em operações de câmbio?",
            "answer": "O VET representa o custo real de uma operação de câmbio em reais por moeda estrangeira, considerando a taxa de câmbio, tarifas bancárias e o IOF."
        }
    ],
    "iban-validator": [
        {
            "question": "Como validar o código bancário IBAN internacional?",
            "answer": "O IBAN possui até 34 caracteres alfanuméricos com código do país e dois dígitos de controle calculados pelo algoritmo MOD-97 (ISO 7064)."
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
            "answer": "O link no formato https://wa.me/<numero> abre diretamente a conversa no WhatsApp Mobile ou Web com a mensagem predefinida."
        },
        {
            "question": "É necessário ter o número salvo na agenda para iniciar a conversa?",
            "answer": "Não. O link wa.me permite iniciar conversas instantaneamente com qualquer número sem precisar adicioná-lo aos contatos."
        }
    ],
    "curl-converter": [
        {
            "question": "Como copiar uma requisição cURL do navegador?",
            "answer": "Abra o DevTools (F12), vá em Rede (Network), clique com o botão direito na requisição e selecione Copiar > Copiar como cURL."
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
            "question": "Qual a diferença entre UUID v4 e UUID v7?",
            "answer": "O UUID v4 é 100% aleatório. O UUID v7 é ordenável no tempo (time-ordered), combinando timestamp Unix com aleatoriedade, ideal para chaves primárias em bancos de dados."
        }
    ],
    "xml-validator": [
        {
            "question": "Como validar e formatar um arquivo XML?",
            "answer": "O validador checa se as tags estão devidamente fechadas, se a estrutura hierárquica é válida e aponta erros de parse diretamente no código."
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
            "question": "O que é um JSON Web Token (JWT)?",
            "answer": "É um padrão aberto (RFC 7519) composto por três partes separadas por pontos: Header (cabeçalho), Payload (dados) e Signature (assinatura)."
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
        }
    ],
    "base": [
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
    "character-counter": [
        {
            "question": "O que é medido no contador de caracteres?",
            "answer": "Conta o número total de caracteres, palavras, linhas, parágrafos e tempo estimado de leitura de qualquer bloco de texto."
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
