export const CONTRACT_TEMPLATES = [
    {
        id: "service-agreement",
        name: "Contrato de Prestação de Serviços",
        fields: [
            { id: "contractorName", label: "Contratada (Nome/Razão Social)" },
            { id: "contractorDoc", label: "Contratada (CPF/CNPJ)" },
            { id: "clientName", label: "Contratante (Nome/Razão Social)" },
            { id: "clientDoc", label: "Contratante (CPF/CNPJ)" },
            { id: "serviceDescription", label: "Descrição do Serviço" },
            { id: "value", label: "Valor Total (R$)" },
            { id: "paymentTerms", label: "Condições de Pagamento" },
            { id: "duration", label: "Prazo de Execução" },
            { id: "city", label: "Cidade de Foro" },
            { id: "date", label: "Data de Assinatura" },
        ],
        content: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Pelo presente instrumento particular, de um lado:

CONTRATADA: {{contractorName}}, inscrita no CPF/CNPJ sob nº {{contractorDoc}}.

CONTRATANTE: {{clientName}}, inscrita no CPF/CNPJ sob nº {{clientDoc}}.

As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços, que se regerá pelas cláusulas seguintes:

CLÁUSULA PRIMEIRA - DO OBJETO
O objeto do presente contrato é a prestação dos serviços de: {{serviceDescription}}.

CLÁUSULA SEGUNDA - DO PREÇO E CONDIÇÕES DE PAGAMENTO
Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor total de R$ {{value}}.
Forma de pagamento: {{paymentTerms}}.

CLÁUSULA TERCEIRA - DO PRAZO
Os serviços serão executados no prazo de {{duration}}, a contar da assinatura deste contrato.

CLÁUSULA QUARTA - DO FORO
Para dirimir quaisquer controvérsias oriundas do CONTRATO, as partes elegem o foro da comarca de {{city}}.

E, por estarem assim justos e contratados, firmam o presente instrumento, em duas vias de igual teor.

{{city}}, {{date}}.

__________________________________
{{contractorName}}
(Contratada)

__________________________________
{{clientName}}
(Contratante)`
    },
    {
        id: "nda",
        name: "Acordo de Confidencialidade (NDA)",
        fields: [
            { id: "disclosingParty", label: "Parte Reveladora" },
            { id: "receivingParty", label: "Parte Receptora" },
            { id: "purpose", label: "Objetivo da Revelação" },
            { id: "duration", label: "Duração do Sigilo (anos)" },
            { id: "city", label: "Cidade" },
            { id: "date", label: "Data" },
        ],
        content: `ACORDO DE CONFIDENCIALIDADE (NDA)

ENTRE:

PARTE REVELADORA: {{disclosingParty}}
PARTE RECEPTORA: {{receivingParty}}

CONSIDERANDO QUE a Parte Reveladora possui certas informações confidenciais e proprietárias;
CONSIDERANDO QUE a Parte Receptora deseja receber tais informações para o fim de: {{purpose}};

AS PARTES ACORDAM O SEGUINTE:

1. DEFINIÇÃO DE INFORMAÇÃO CONFIDENCIAL
"Informação Confidencial" significa toda informação técnica, comercial, financeira ou outra informação relacionada aos negócios da Parte Reveladora.

2. OBRIGAÇÕES DE CONFIDENCIALIDADE
A Parte Receptora concorda em manter em sigilo todas as Informações Confidenciais e não utilizá-las para qualquer fim que não seja o Objetivo descrito acima.

3. VIGÊNCIA
As obrigações de confidencialidade permanecerão em vigor pelo período de {{duration}} anos a partir da data deste acordo.

4. LEI APLICÁVEL E FORO
Este acordo será regido pelas leis do Brasil. Fica eleito o foro da comarca de {{city}} para dirimir quaisquer dúvidas.

{{city}}, {{date}}.

__________________________________
{{disclosingParty}}

__________________________________
{{receivingParty}}`
    }
];
