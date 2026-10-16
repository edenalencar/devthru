export interface FAQItem {
    question: string;
    answer: string;
}

export const FAQS_DATA: FAQItem[] = [
    {
        question: "O DevThru é gratuito?",
        answer: "Sim! Disponibilizamos um plano gratuito permanente para desenvolvedores individuais. Você pode utilizar todas as ferramentas da plataforma (geradores de CPF, CNPJ, Inscrição Estadual, PIX, chaves fiscais, validadores e utilitários) sem necessidade de cadastro prévio. Para geração em lote de grandes massas de dados (até 1.000 itens por vez), exportação para formatos CSV/JSON e acesso ao histórico persistente, oferecemos planos profissionais."
    },
    {
        question: "Os dados gerados pelo DevThru são válidos para testes?",
        answer: "Sim. Todos os documentos gerados pelo DevThru são rigorosamente válidos do ponto de vista algorítmico, atendendo às regras oficiais de dígitos verificadores calculados via Módulo 11, Módulo 10, algoritmos de Luhn e especificações técnicas oficiais da Receita Federal, SEFAZ estaduais e Banco Central do Brasil. No entanto, são dados puramente fictícios destinados a testes de software, QA e ambientes de desenvolvimento."
    },
    {
        question: "Como funciona a conformidade com a LGPD nos testes?",
        answer: "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) proíbe a utilização de dados pessoais reais de clientes em ambientes de homologação, desenvolvimento e testes automatizados. O DevThru resolve esse desafio fornecendo massas de testes sintéticas, permitindo que seu time teste cenários complexos com total segurança jurídica e conformidade regulatória."
    },
    {
        question: "Qual a diferença entre validação algorítmica e consulta cadastral?",
        answer: "A validação algorítmica realiza a checagem matemática dos dígitos verificadores (checksums) do documento no próprio navegador ou via API, garantindo que o número respeite a regra do emissor. A consulta cadastral, por sua vez, verifica se o contribuinte ou empresa possui inscrição ativa na base governamental. O DevThru é focado na validação algorítmica e geração para testes, sem consultar bases de dados governamentais restritas."
    },
    {
        question: "O plano Business inclui acesso à API RESTful?",
        answer: "Sim! O plano Business desbloqueia acesso completo à nossa API RESTful de alta disponibilidade com SLA de 99.9%. Com ela, sua equipe pode provisionar massas de dados dinamicamente dentro de suítes de testes (Jest, Vitest, Cypress, Playwright) ou integrar validadores em pipelines de CI/CD via GitHub Actions e GitLab CI."
    },
    {
        question: "Quais são as vantagens do plano Pro?",
        answer: "O plano Pro é ideal para desenvolvedores independentes e analistas de QA que precisam de alta produtividade: geração em massa de até 1.000 registros simultâneos, exportação direta em CSV e JSON estruturado, salvamento de configurações e preferências favoritas, além de histórico de gerações recentes."
    },
    {
        question: "Como funciona o período de teste grátis (Trial de 7 dias)?",
        answer: "Ao criar uma conta no DevThru, você ganha automaticamente 7 dias de acesso completo aos recursos do plano Pro, sem a necessidade de cadastrar cartão de crédito ou compromisso financeiro. Ao término do período de teste, sua conta migra automaticamente para o plano Gratuito, a menos que você decida assinar."
    },
    {
        question: "Posso cancelar minha assinatura a qualquer momento?",
        answer: "Sim, com total liberdade e sem multas contratuais. O cancelamento pode ser realizado com 1 clique diretamente pelo painel do usuário através do portal seguro da Stripe. Seus recursos do plano contratado permanecerão ativos até o último dia do ciclo mensal já faturado."
    },
    {
        question: "Como são tratados os dados e a segurança dos pagamentos?",
        answer: "Não armazenamos dados sensíveis de pagamento em nossos servidores. Todas as transações financeiras e dados de cartões de crédito são processados diretamente pela Stripe, líder mundial em infraestrutura de pagamentos com certificação PCI-DSS Level 1."
    },
    {
        question: "Como funciona a emissão de notas fiscais para planos empresariais?",
        answer: "Emitimos notas fiscais de serviço para todas as assinaturas empresariais no Brasil. No caso de assinaturas via Stripe, você recebe os recibos fiscais com os dados cadastrais da sua empresa (CNPJ e Razão Social) automaticamente em seu e-mail após cada cobrança."
    },
    {
        question: "Quais formatos de exportação de dados são suportados?",
        answer: "Para usuários dos planos Pro e Business, oferecemos exportação em arquivos CSV prontos para importação em bancos relacionais ou planilhas, arquivos JSON estruturados para consumo em APIs e testes, além de botão rápido para cópia com formatação."
    }
];
