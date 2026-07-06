require('dotenv').config({ path: '.env.local' });
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
    "https://www.devthru.com/blog/o-que-e-sdd-spec-driven-development-focado-em-ia",
    "https://www.devthru.com/blog/skills-de-ia-e-progressive-disclosure-economia-de-contexto",
    "https://www.devthru.com/blog/renavam-chassi-como-validar-antes-de-integrar",
    "https://www.devthru.com/blog/por-que-uuid-v7-esta-substituindo-uuid-v4",
    "https://www.devthru.com/blog/placas-mercosul-vs-padrao-antigo-validacao",
    "https://www.devthru.com/blog/otimizacao-queries-sql-indentacao-performance",
    "https://www.devthru.com/blog/o-que-e-webmcp-model-context-protocol-via-sse",
    "https://www.devthru.com/blog/o-que-e-mcp-model-context-protocol",
    "https://www.devthru.com/blog/jwt-debugger-mock-data-pipelines-teste-agentes-ia",
    "https://www.devthru.com/blog/gerar-massa-dados-teste-cypress-selenium-cpf-cnpj-endereco",
    "https://www.devthru.com/blog/construindo-servidor-mcp-dados-teste-brasileiros",
    "https://www.devthru.com/blog/como-testar-fluxos-nfe-cte-mdfe-homologacao",
    "https://www.devthru.com/blog/tutorial-como-criar-mcp-server-typescript",
    "https://www.devthru.com/blog/algoritmo-luhn-validacao-cartao-credito",
    "https://www.devthru.com/blog/ai-terminal-tools-gemini-cli-cursor-agentes",
    "https://www.devthru.com/blog/como-decodificar-boleto-bancario",
    "https://www.devthru.com/blog/como-decodificar-pix-copia-e-cola",
    "https://www.devthru.com/tools/finance/boleto-validator",
    "https://www.devthru.com/tools/finance/pix-parser"
];

console.log(`Total de URLs a enviar: ${urls.length}`);
console.log('');
console.log('URLs:');
urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
console.log('');

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
