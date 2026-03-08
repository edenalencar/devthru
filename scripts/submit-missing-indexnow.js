const https = require('https');

// URLs que ainda não foram enviadas ao IndexNow
// Páginas de Guides (conteúdo programático) + Blog + categorias
const urls = [
    // Página principal de Guides
    "https://www.devthru.com/guides",

    // Categorias de Guides
    "https://www.devthru.com/guides/validation",
    "https://www.devthru.com/guides/formatting",
    "https://www.devthru.com/guides/generation",

    // Guides - Validation - CPF
    "https://www.devthru.com/guides/validation/cpf/python",
    "https://www.devthru.com/guides/validation/cpf/javascript",

    // Guides - Validation - CNPJ
    "https://www.devthru.com/guides/validation/cnpj/python",
    "https://www.devthru.com/guides/validation/cnpj/javascript",

    // Guides - Validation - NF-e
    "https://www.devthru.com/guides/validation/nfe-generator/python",
    "https://www.devthru.com/guides/validation/nfe-generator/javascript",
    "https://www.devthru.com/guides/validation/nfe-generator/java",
    "https://www.devthru.com/guides/validation/nfe-generator/csharp",

    // Guides - Validation - CT-e
    "https://www.devthru.com/guides/validation/cte-generator/python",
    "https://www.devthru.com/guides/validation/cte-generator/javascript",
    "https://www.devthru.com/guides/validation/cte-generator/java",
    "https://www.devthru.com/guides/validation/cte-generator/csharp",

    // Guides - Validation - MDF-e
    "https://www.devthru.com/guides/validation/mdfe-generator/python",
    "https://www.devthru.com/guides/validation/mdfe-generator/javascript",
    "https://www.devthru.com/guides/validation/mdfe-generator/java",
    "https://www.devthru.com/guides/validation/mdfe-generator/csharp",

    // Guides - Validation - NFC-e
    "https://www.devthru.com/guides/validation/nfce-generator/python",
    "https://www.devthru.com/guides/validation/nfce-generator/javascript",
    "https://www.devthru.com/guides/validation/nfce-generator/java",
    "https://www.devthru.com/guides/validation/nfce-generator/csharp",

    // Guides - Validation - Email
    "https://www.devthru.com/guides/validation/email-validator/python",
    "https://www.devthru.com/guides/validation/email-validator/javascript",
    "https://www.devthru.com/guides/validation/email-validator/java",
    "https://www.devthru.com/guides/validation/email-validator/csharp",

    // Guides - Validation - Credit Card
    "https://www.devthru.com/guides/validation/credit-card-generator/python",
    "https://www.devthru.com/guides/validation/credit-card-generator/javascript",
    "https://www.devthru.com/guides/validation/credit-card-generator/java",
    "https://www.devthru.com/guides/validation/credit-card-generator/csharp",

    // Guides - Formatting - JSON
    "https://www.devthru.com/guides/formatting/json/python",
    "https://www.devthru.com/guides/formatting/json/javascript",

    // Guides - Generation - UUID
    "https://www.devthru.com/guides/generation/uuid-generator/python",
    "https://www.devthru.com/guides/generation/uuid-generator/javascript",
    "https://www.devthru.com/guides/generation/uuid-generator/java",
    "https://www.devthru.com/guides/generation/uuid-generator/csharp",

    // Guides - Generation - Base64
    "https://www.devthru.com/guides/generation/base64-encoder/python",
    "https://www.devthru.com/guides/generation/base64-encoder/javascript",
    "https://www.devthru.com/guides/generation/base64-encoder/java",
    "https://www.devthru.com/guides/generation/base64-encoder/csharp",

    // Guides - Generation - URL Encoder
    "https://www.devthru.com/guides/generation/url-encoder/python",
    "https://www.devthru.com/guides/generation/url-encoder/javascript",
    "https://www.devthru.com/guides/generation/url-encoder/java",
    "https://www.devthru.com/guides/generation/url-encoder/csharp",

    // Blog
    "https://www.devthru.com/blog",
    "https://www.devthru.com/blog/validacao-cpf-algoritmo-completo",
    "https://www.devthru.com/blog/validacao-cnpj-algoritmo-completo",
    "https://www.devthru.com/blog/uuid-o-que-e-como-gerar",
    "https://www.devthru.com/blog/regex-guia-pratico-desenvolvedores",
    "https://www.devthru.com/blog/jwt-como-funciona-guia-pratico",
    "https://www.devthru.com/blog/inscricao-estadual-o-que-e-como-validar",
    "https://www.devthru.com/blog/dados-ficticios-testes-lgpd",
    "https://www.devthru.com/blog/gerar-dados-ficticios-testes-api",
    "https://www.devthru.com/blog/numero-chassi-vin-significado",
];

console.log(`Total de URLs a enviar: ${urls.length}`);
console.log('');
console.log('URLs:');
urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
console.log('');

const data = JSON.stringify({
    "host": "www.devthru.com",
    "key": "eb6684959a304730afe36988e0ea3db7",
    "keyLocation": "https://www.devthru.com/eb6684959a304730afe36988e0ea3db7.txt",
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

console.log('Enviando para IndexNow...');

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let body = '';
    res.on('data', (d) => {
        body += d;
    });
    res.on('end', () => {
        if (body) console.log(`Resposta: ${body}`);
        if (res.statusCode === 200 || res.statusCode === 202) {
            console.log('✅ URLs enviadas com sucesso ao IndexNow!');
        } else {
            console.log('⚠️ Verifique o status code acima.');
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Erro ao enviar:', error.message);
});

req.write(data);
req.end();
