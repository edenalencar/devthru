require('dotenv').config({ path: '.env.local' });
const https = require('https');

const urls = [
    // Main Pages
    "https://devthru.com/",
    "https://devthru.com/about",
    "https://devthru.com/contact",
    "https://devthru.com/faq",
    "https://devthru.com/pricing",
    "https://devthru.com/privacy",
    "https://devthru.com/terms",
    "https://devthru.com/updates",
    "https://devthru.com/ferramentas-fiscais",

    // Auth & Dashboard
    "https://devthru.com/login",
    "https://devthru.com/register",
    "https://devthru.com/forgot-password",
    "https://devthru.com/dashboard",

    // Documentation
    "https://devthru.com/docs/api",

    // Tools - Automotive
    "https://devthru.com/tools/automotive/fipe",
    "https://devthru.com/tools/automotive/license-plate",
    "https://devthru.com/tools/automotive/chassi",
    "https://devthru.com/tools/automotive/renavam",

    // Tools - Business
    "https://devthru.com/tools/business/cnae-search",
    "https://devthru.com/tools/business/cte-generator",
    "https://devthru.com/tools/business/mdfe-generator",
    "https://devthru.com/tools/business/nfce-generator",
    "https://devthru.com/tools/business/nfe-generator",

    // Tools - Converters
    "https://devthru.com/tools/converters/base",
    "https://devthru.com/tools/converters/currency",
    "https://devthru.com/tools/converters/unit",

    // Tools - Development
    "https://devthru.com/tools/development/minifier",
    "https://devthru.com/tools/development/mock-data",
    "https://devthru.com/tools/development/regex",
    "https://devthru.com/tools/development/timestamp",
    "https://devthru.com/tools/development/crontab-generator",

    // Tools - Documents
    "https://devthru.com/tools/documents/certificate-generator",
    "https://devthru.com/tools/documents/cnh",
    "https://devthru.com/tools/documents/cnpj",
    "https://devthru.com/tools/documents/contract-generator",
    "https://devthru.com/tools/documents/cpf",
    "https://devthru.com/tools/documents/inscricao-estadual",
    "https://devthru.com/tools/documents/pis",
    "https://devthru.com/tools/documents/rg",
    "https://devthru.com/tools/documents/titulo-eleitor",

    // Tools - Finance
    "https://devthru.com/tools/finance/boleto-generator",
    "https://devthru.com/tools/finance/boleto-validator",
    "https://devthru.com/tools/finance/credit-card-generator",
    "https://devthru.com/tools/finance/iban-validator",
    "https://devthru.com/tools/finance/pix-parser",
    "https://devthru.com/tools/finance/tax-calculator",

    // Tools - Image
    "https://devthru.com/tools/image/converter",
    "https://devthru.com/tools/image/favicon",
    "https://devthru.com/tools/image/ocr",
    "https://devthru.com/tools/image/placeholder",

    // Tools - Personal
    "https://devthru.com/tools/personal/address",
    "https://devthru.com/tools/personal/email",
    "https://devthru.com/tools/personal/lgpd-data",
    "https://devthru.com/tools/personal/name",

    // Blog
    "https://devthru.com/blog/como-decodificar-boleto-bancario",
    "https://devthru.com/blog/como-decodificar-pix-copia-e-cola"
];

const key = process.env.INDEXNOW_KEY;
if (!key) {
    console.error("Erro: INDEXNOW_KEY não encontrada no .env.local");
    process.exit(1);
}

const data = JSON.stringify({
    "host": "devthru.com",
    "key": key,
    "keyLocation": `https://devthru.com/${key}.txt`,
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
