require('dotenv').config({ path: '.env.local' });
const https = require('https');

const urls = [
    // Main Pages
    "https://www.devthru.com/",
    "https://www.devthru.com/about",
    "https://www.devthru.com/contact",
    "https://www.devthru.com/faq",
    "https://www.devthru.com/pricing",
    "https://www.devthru.com/privacy",
    "https://www.devthru.com/terms",
    "https://www.devthru.com/updates",
    "https://www.devthru.com/ferramentas-fiscais",
    "https://www.devthru.com/blog",
    "https://www.devthru.com/guides",

    // Documentation
    "https://www.devthru.com/docs/api",

    // Tools - Automotive
    "https://www.devthru.com/tools/automotive/fipe",
    "https://www.devthru.com/tools/automotive/license-plate",
    "https://www.devthru.com/tools/automotive/chassi",
    "https://www.devthru.com/tools/automotive/renavam",

    // Tools - Business
    "https://www.devthru.com/tools/business/cnae-search",
    "https://www.devthru.com/tools/business/mdfe-generator",
    "https://www.devthru.com/tools/business/nfe-generator",
    "https://www.devthru.com/tools/business/nfe-decoder",

    // Tools - Converters
    "https://www.devthru.com/tools/converters/base",
    "https://www.devthru.com/tools/converters/currency",
    "https://www.devthru.com/tools/converters/unit",
    "https://www.devthru.com/tools/converters/pixel-to-rem",

    // Tools - Development
    "https://www.devthru.com/tools/development/minifier",
    "https://www.devthru.com/tools/development/mock-data",
    "https://www.devthru.com/tools/development/regex",
    "https://www.devthru.com/tools/development/timestamp",
    "https://www.devthru.com/tools/development/crontab-generator",
    "https://www.devthru.com/tools/development/jwt-debugger",
    "https://www.devthru.com/tools/development/sql-formatter",
    "https://www.devthru.com/tools/development/curl-converter",

    // Tools - Utilities
    "https://www.devthru.com/tools/utilities/whatsapp-link-generator",
    "https://www.devthru.com/tools/utilities/base64",
    "https://www.devthru.com/tools/utilities/deadline-calculator",
    "https://www.devthru.com/tools/utilities/hash",
    "https://www.devthru.com/tools/utilities/json",
    "https://www.devthru.com/tools/utilities/lorem",
    "https://www.devthru.com/tools/utilities/password",
    "https://www.devthru.com/tools/utilities/qrcode",
    "https://www.devthru.com/tools/utilities/uuid",
    "https://www.devthru.com/tools/utilities/xml-validator",
    "https://www.devthru.com/tools/utilities/url-encoder",

    // Tools - Documents
    "https://www.devthru.com/tools/documents/certificate-generator",
    "https://www.devthru.com/tools/documents/cnh",
    "https://www.devthru.com/tools/documents/cnpj",
    "https://www.devthru.com/tools/documents/contract-generator",
    "https://www.devthru.com/tools/documents/cpf",
    "https://www.devthru.com/tools/documents/inscricao-estadual",
    "https://www.devthru.com/tools/documents/pis",
    "https://www.devthru.com/tools/documents/rg",
    "https://www.devthru.com/tools/documents/titulo-eleitor",

    // Tools - Finance
    "https://www.devthru.com/tools/finance/boleto-generator",
    "https://www.devthru.com/tools/finance/boleto-validator",
    "https://www.devthru.com/tools/finance/credit-card-generator",
    "https://www.devthru.com/tools/finance/iban-validator",
    "https://www.devthru.com/tools/finance/cnab-parser",
    "https://www.devthru.com/tools/finance/split-payment",
    "https://www.devthru.com/tools/finance/vet-efx-calculator",
    "https://www.devthru.com/tools/finance/pix-parser",
    "https://www.devthru.com/tools/finance/tax-calculator",
    "https://www.devthru.com/tools/finance/placa-pix",

    // Tools - Image
    "https://www.devthru.com/tools/image/converter",
    "https://www.devthru.com/tools/image/favicon",
    "https://www.devthru.com/tools/image/ocr",
    "https://www.devthru.com/tools/image/placeholder",

    // Tools - Personal
    "https://www.devthru.com/tools/personal/address",
    "https://www.devthru.com/tools/personal/email",
    "https://www.devthru.com/tools/personal/lgpd-data",
    "https://www.devthru.com/tools/personal/name",
    "https://www.devthru.com/tools/personal/person",
    "https://www.devthru.com/tools/personal/phone",

    // Blog
    "https://www.devthru.com/blog/como-decodificar-boleto-bancario",
    "https://www.devthru.com/blog/como-decodificar-pix-copia-e-cola",
    "https://www.devthru.com/blog/como-validar-formatar-telefone-celular-brasil-ddd",
    "https://www.devthru.com/blog/cnab-240-vs-cnab-400-diferencas-e-estrutura-posicional",
    "https://www.devthru.com/blog/como-parsear-e-validar-arquivos-cnab-remessa-e-retorno-nodejs-python",
    "https://www.devthru.com/blog/como-gerar-massa-de-dados-cnab-para-testes-em-staging",
    "https://www.devthru.com/blog/split-payment-reforma-tributaria-guia-desenvolvedor",
    "https://www.devthru.com/blog/normativa-efx-bacen-guia-desenvolvedor-pagamentos-internacionais"
];

const key = process.env.INDEXNOW_KEY;
if (!key) {
    console.error("Erro: INDEXNOW_KEY não encontrada no .env.local");
    process.exit(1);
}

const data = JSON.stringify({
    "host": "www.devthru.com",
    "key": key,
    "keyLocation": `https://www.devthru.com/${key}.txt`,
    "urlList": urls
});

const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data),
        'User-Agent': 'Node.js/HTTP-Client'
    }
};

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Enviando ${urls.length} URLs...`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();

