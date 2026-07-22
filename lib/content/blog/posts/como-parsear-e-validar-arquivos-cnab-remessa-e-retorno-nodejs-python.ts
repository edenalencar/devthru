import { BlogPost } from '../index'

export const postComoParsearEValidarArquivosCnabRemessaERetornoNodejsPython: BlogPost = {
    slug: 'como-parsear-e-validar-arquivos-cnab-remessa-e-retorno-nodejs-python',
    title: 'Como Parsear Arquivos CNAB em Node.js e Python',
    description: 'Aprenda a ler, fatiar e validar arquivos de remessa e retorno CNAB 240 e 400 em Node.js e Python com exemplos de código prontos.',
    date: '2026-07-22',
    author: 'DevThru',
    category: 'dev-tools',
    readingTime: 6,
    tags: ['CNAB', 'Node.js', 'Python', 'parsing', 'FEBRABAN', 'boletos', 'fintech'],
    relatedTools: ['/tools/finance/cnab-parser', '/tools/finance/boleto-validator'],
    content: `
<p>Integrar sistemas com arquivos bancários <strong>CNAB 240 e CNAB 400 (FEBRABAN)</strong> costuma ser um desafio para desenvolvedores. Por se tratar de um formato posicional de colunas fixas sem delimitadores como vírgula ou ponto e vírgula, qualquer erro no fatiamento da string pode corromper dados financeiros importantes, como valores pagos, datas de liquidação ou códigos de ocorrência.</p>

<p>Neste artigo prático, vamos mostrar como estruturar um parser robusto em <strong>Node.js (TypeScript)</strong> e <strong>Python</strong> para ler arquivos de <strong>Remessa (<code>.rem</code>)</strong> e <strong>Retorno (<code>.ret</code>)</strong>, extrair registros com segurança e validar a integridade do arquivo.</p>

<h2>O Conceito de Slicing Posicional</h2>

<p>No padrão CNAB, cada linha representa um registro e cada campo ocupa posições específicas (1-indexed na documentação da FEBRABAN). Em linguagens de programação (0-indexed), devemos converter essas posições para índices de substring:</p>

<table>
  <thead>
    <tr>
      <th>Campo FEBRABAN</th>
      <th>Posição Manual (FEBRABAN)</th>
      <th>Índices em Código (0-indexed)</th>
      <th>Tamanho</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Código do Banco</td>
      <td>001 a 003</td>
      <td><code>slice(0, 3)</code></td>
      <td>3 caracteres</td>
    </tr>
    <tr>
      <td>Lote de Serviço</td>
      <td>004 a 007</td>
      <td><code>slice(3, 7)</code></td>
      <td>4 caracteres</td>
    </tr>
    <tr>
      <td>Tipo de Registro</td>
      <td>008 a 008</td>
      <td><code>slice(7, 8)</code></td>
      <td>1 caractere</td>
    </tr>
  </tbody>
</table>

<div class="info-box">
  <strong>💡 Dica de Ouro:</strong> Antes de processar um arquivo CNAB em produção, certifique-se de que cada linha possède exatamente 240 caracteres (para CNAB 240) ou 400 caracteres (para CNAB 400). Se a linha tiver comprimento diferente, trate como um arquivo inválido.
</div>

<h2>Exemplo 1: Parser CNAB em Node.js / TypeScript</h2>

<p>Abaixo está um exemplo limpo utilizando TypeScript para parsear o Header e os Detalhes de um arquivo CNAB 240 de Retorno Bancário:</p>

<pre><code class="language-javascript">import * as fs from 'fs';
import * as path from 'path';

interface CNAB240Header {
  codigoBanco: string;
  lote: string;
  tipoInscricao: string;
  numeroInscricao: string;
  nomeEmpresa: string;
}

interface CNAB240SegmentoP {
  nossoNumero: string;
  vencimento: string;
  valorTitulo: number;
}

export function parseCNAB240(conteudoArquivo: string) {
  const linhas = conteudoArquivo.split(/\r?\n/).filter(l => l.length > 0);

  const titulos: CNAB240SegmentoP[] = [];

  for (const linha of linhas) {
    // Validação de comprimento da linha
    if (linha.length !== 240) {
      console.warn(\`Linha ignorada: tamanho \${linha.length} é diferente de 240.\`);
      continue;
    }

    const tipoRegistro = linha.slice(7, 8); // Posição 8

    // Registro Tipo 0: Header de Arquivo
    if (tipoRegistro === '0') {
      const banco = linha.slice(0, 3);
      const empresa = linha.slice(72, 102).trim();
      console.log(\`Processando arquivo do banco \${banco} para \${empresa}\`);
    }

    // Registro Tipo 3: Segmento de Detalhe
    if (tipoRegistro === '3') {
      const codigoSegmento = linha.slice(13, 14); // Posição 14
      
      // Segmento P (Dados do Título)
      if (codigoSegmento === 'P') {
        const nossoNumero = linha.slice(37, 57).trim();
        const dataVenc = linha.slice(77, 85); // DDMMAAAA
        const valorEmCents = parseInt(linha.slice(85, 100), 10);
        
        titulos.push({
          nossoNumero,
          vencimento: \`\${dataVenc.slice(0,2)}/\${dataVenc.slice(2,4)}/\${dataVenc.slice(4,8)}\`,
          valorTitulo: valorEmCents / 100
        });
      }
    }
  }

  return titulos;
}
</code></pre>

<h2>Exemplo 2: Parser CNAB em Python</h2>

<p>Em Python, podemos utilizar a sintaxe nativa de fatiamento de strings (<code>string[start:end]</code>) para ler um arquivo CNAB 400 de cobrança:</p>

<pre><code class="language-python">def parse_cnab_400(filepath: str):
    registros_pagos = []

    with open(filepath, 'r', encoding='latin1') as f:
        for index, line in enumerate(f, start=1):
            line = line.rstrip('\r\n')
            
            if len(line) != 400:
                print(f"Alerta Linha {index}: Comprimento incorreto ({len(line)} caracteres)")
                continue

            tipo_registro = line[0:1]

            # Registro Detalhe Tipo 1 (Cobrança)
            if tipo_registro == '1':
                nosso_numero = line[62:70].strip()
                carteira = line[107:108]
                ocorrencia = line[108:110] # 06 = Liquidação/Pago
                data_ocorrencia = line[110:116] # DDMMAA
                valor_pago_cents = int(line[253:266] or '0')

                # Ocorrência 06 indica título pago
                if ocorrencia == '06':
                    registros_pagos.append({
                        "nosso_numero": nosso_numero,
                        "carteira": carteira,
                        "data_pagamento": f"{data_ocorrencia[0:2]}/{data_ocorrencia[2:4]}/20{data_ocorrencia[4:6]}",
                        "valor_pago": valor_pago_cents / 100.0
                    })

    return registros_pagos

# Exemplo de execução
# pagamentos = parse_cnab_400('retorno_itau.ret')
# print(pagamentos)
</code></pre>

<h2>Boas Práticas de Engenharia ao Tratar CNAB</h2>

<ol>
  <li><strong>Encoding de Caracteres:</strong> Muitos bancos legados enviam arquivos CNAB em encoding <code>ISO-8859-1 (Latin1)</code> ou <code>ASCII</code> em vez de <code>UTF-8</code>. Sempre trate a codificação do arquivo ao ler o buffer.</li>
  <li><strong>Tratamento de Valores Monetários:</strong> Nunca converta diretamente os dígitos inteiros sem dividir por 100.0 (ex: <code>000000015050</code> representa <code>R$ 150,50</code>).</li>
  <li><strong>Idempotência na Processamento de Retorno:</strong> Arquivos de retorno bancários podem ser baixados mais de uma vez. Sempre utilize a combinação de <code>Banco + Nosso Número + Data de Ocorrência</code> como chave de idempotência no banco de dados.</li>
</ol>

<h2>Testando e Inspecionando Arquivos CNAB</h2>

<p>Quer verificar se o seu arquivo CNAB está configurado corretamente com as posições certas antes de colocar o código em produção? Utilize a ferramenta <a href="/tools/finance/cnab-parser">Leitor e Decodificador de CNAB do DevThru</a> para visualizar os campos fatiados com syntax highlighting instantâneo!</p>
`,
    faqs: [
        {
            question: 'Como converter o valor financeiro do CNAB para float ou decimal?',
            answer: 'Os valores no CNAB não possuem ponto decimal. Os últimos 2 dígitos são os centavos. Deve-se converter o trecho em inteiro e dividir por 100 (ex: "00001250" -> 1250 / 100 = 12.50).'
        },
        {
            question: 'Qual o encoding recomendado para ler arquivos CNAB?',
            answer: 'Arquivos CNAB legados frequentemente utilizam Latin1 (ISO-8859-1) ou ASCII. Se o arquivo contiver acentos incorretos ao ler em UTF-8, altere a leitura do buffer para latin1.'
        }
    ]
}
