import { BlogPost } from '../index'

export const postComoGerarMassaDeDadosCnabParaTestesEmStaging: BlogPost = {
    slug: 'como-gerar-massa-de-dados-cnab-para-testes-em-staging',
    title: 'Massa de Dados CNAB para Testes em Staging',
    description: 'Como gerar e mockar arquivos CNAB de remessa e retorno sintéticos para testes automatizados e integração contínua sem depender do banco.',
    date: '2026-07-22',
    author: 'DevThru',
    category: 'testes-qa',
    readingTime: 6,
    tags: ['CNAB', 'QA', 'testes', 'mock', 'staging', 'fintech', 'CI/CD'],
    relatedTools: ['/tools/finance/cnab-parser', '/tools/development/mock-data', '/tools/personal/person'],
    content: `
<p>Um dos maiores gargalos no desenvolvimento de software financeiro no Brasil é a dependência de homologação bancária. Em ambientes de **Staging, QA e CI/CD**, nem sempre os desenvolvedores possuem acesso aos portais de sandbox dos bancos para gerar arquivos reais de retorno (<code>.ret</code>) ou validar arquivos de remessa (<code>.rem</code>).</p>

<p>Para manter uma esteira de entregas ágil e automatizada, a melhor abordagem é criar **geradores de massa de dados CNAB sintéticos**. Neste artigo, vamos aprender como estruturar mocks de arquivos CNAB 240 e CNAB 400 para cenários de liquidação, rejeição e alteração de títulos.</p>

<h2>Por que Mockar Arquivos CNAB em Testes?</h2>

<ol>
  <li><strong>Independência de Terceiros:</strong> Testes automatizados unitários e de integração (E2E) não devem falhar por indisponibilidade de APIs ou portais bancários externos.</li>
  <li><strong>Simulação de Erros de Borda (Edge Cases):</strong> É difícil forçar um banco real em homologação a emitir um código de rejeição específico (ex: "CPF do Sacado Inválido" ou "Agência/Conta Destino Inexistente"). Com mocks sintéticos, você pode simular qualquer ocorrência instantaneamente.</li>
  <li><strong>Conformidade com a LGPD:</strong> Arquivos de remessa reais contêm dados sensíveis de clientes (CPF, Nome, Endereço, Valores). Utilizar arquivos de produção em ambientes de desenvolvimento viola a LGPD. Deve-se utilizar sempre <a href="/tools/personal/person">Dados Fictícios de Pessoas</a>.</li>
</ol>

<h2>Estrutura de um Gerador de Mock CNAB 400 em JavaScript</h2>

<p>Abaixo está uma função utilitária em TypeScript/Node.js para construir uma string de arquivo de retorno CNAB 400 mockado com ocorrência de liquidação (pagamento com sucesso):</p>

<pre><code class="language-javascript">interface MockTituloRetorno {
  nossoNumero: string;
  valorPagoCents: number;
  dataPagamentoDDMMAA: string; // ex: '220726'
  codigoOcorrencia?: string; // '06' = Liquidação normal
}

export function gerarMockCnab400Retorno(
  codigoBanco: string, // ex: '341' (Itaú)
  razaoSocialEmpresa: string,
  cnpjEmpresa: string,
  titulos: MockTituloRetorno[]
): string {
  const padRight = (str: string, len: number, char = ' ') =>
    str.padEnd(len, char).slice(0, len);
  const padLeft = (str: string, len: number, char = '0') =>
    str.padStart(len, char).slice(0, len);

  const linhas: string[] = [];

  // 1. Header do Arquivo (400 caracteres)
  let header = '0'; // Tipo Registro Header
  header += '2'; // 2 = Retorno
  header += 'RETORNO'; // Literal
  header += '01'; // Código de Serviço: Cobrança
  header += padRight('COBRANCA', 15);
  header += padLeft(cnpjEmpresa.replace(/\D/g, ''), 14);
  header += padRight(razaoSocialEmpresa, 30);
  header += padLeft(codigoBanco, 3);
  header += padRight('BANCO DE TESTE', 15);
  header += '220726'; // Data da gravação (DDMMAA)
  header += padRight('', 287); // Complemento do registro até 400
  header += padLeft('000001', 6); // Número Sequencial
  linhas.push(header);

  // 2. Linhas de Detalhe (400 caracteres cada)
  titulos.forEach((t, index) => {
    const seq = padLeft((index + 2).toString(), 6);
    const ocorrencia = t.codigoOcorrencia || '06'; // 06 = Pago / Liquidado

    let detalhe = '1'; // Tipo Registro Detalhe
    detalhe += padLeft(cnpjEmpresa.slice(0, 14), 14);
    detalhe += padLeft(t.nossoNumero, 8);
    detalhe += padRight('', 40);
    detalhe += '1'; // Carteira
    detalhe += padLeft(ocorrencia, 2); // Código da Ocorrência
    detalhe += t.dataPagamentoDDMMAA; // Data Ocorrência no Banco
    detalhe += padRight(t.nossoNumero, 8);
    detalhe += padRight('', 175);
    detalhe += padLeft(t.valorPagoCents.toString(), 13); // Valor pago em centavos
    detalhe += padRight('', 120);
    detalhe += seq; // Sequencial da linha

    linhas.push(detalhe);
  });

  // 3. Trailer do Arquivo (400 caracteres)
  const totalLinhas = linhas.length + 1;
  let trailer = '9'; // Tipo Registro Trailer
  trailer += '2'; // Retorno
  trailer += '01'; // Cobrança
  trailer += padLeft(codigoBanco, 3);
  trailer += padRight('', 379);
  trailer += padLeft(totalLinhas.toString(), 6);
  linhas.push(trailer);

  return linhas.join('\r\n');
}
</code></pre>

<h2>Cenários Essenciais de QA para Cobrança Bancária</h2>

<p>Ao construir seus testes automatizados em frameworks como Jest, Vitest ou Cypress, certifique-se de testar pelo menos estes 4 cenários principais:</p>

<table>
  <thead>
    <tr>
      <th>Cenário de Teste</th>
      <th>Ocorrência CNAB</th>
      <th>Resultado Esperado no Sistema</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Liquidação Normal</strong></td>
      <td><code>06</code> (CNAB 400) / <code>06</code> (CNAB 240)</td>
      <td>Marcar fatura/pedido como <strong>Pago</strong> e liberar serviço.</td>
    </tr>
    <tr>
      <td><strong>Título Rejeitado</strong></td>
      <td><code>03</code> (Entrada Rejeitada)</td>
      <td>Notificar a equipe financeira e exibir o motivo da rejeição do banco.</td>
    </tr>
    <tr>
      <td><strong>Baixa Manual ou Expirada</strong></td>
      <td><code>09</code> ou <code>10</code> (Baixado no Banco)</td>
      <td>Marcar título como <strong>Cancelado/Expirado</strong>.</td>
    </tr>
    <tr>
      <td><strong>Entrada Confirmada</strong></td>
      <td><code>02</code> (Entrada Confirmada)</td>
      <td>Confirmar que o boleto foi registrado com sucesso na CIP/Banco.</td>
    </tr>
  </tbody>
</table>

<h2>Inspecionando os Mocks de Teste</h2>

<p>Após gerar seus arquivos sintéticos em seu script de testes, utilize o <a href="/tools/finance/cnab-parser">Leitor de CNAB do DevThru</a> para verificar se todos os campos posicionais e tamanhos de linha estão 100% corretos antes de rodar a suíte de testes E2E!</p>
`,
    faqs: [
        {
            question: 'Como testar liquidação de boleto sem pagar uma tarifa real no banco?',
            answer: 'Gere um arquivo de retorno CNAB mockado contendo o Nosso Número do boleto emitido e o código de ocorrência 06 (Liquidação). Suba o arquivo no seu parser de retorno local.'
        },
        {
            question: 'É permitido usar dados de produção em ambientes de staging?',
            answer: 'Não. Pela LGPD, dados reais de clientes não devem trafegar em ambiente de testes. Utilize sempre geradores de massa sintética (mock data) com CPFs e nomes fictícios.'
        }
    ]
}
