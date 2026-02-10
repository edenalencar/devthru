const fs = require('fs');
const path = require('path');

// Tool definitions (copied from lib/tools-list.tsx)
const tools = [
    // Automotive
    { slug: 'fipe', category: 'automotive', title: 'Tabela FIPE', icon: 'Calculator' },
    { slug: 'license-plate', category: 'automotive', title: 'Placa', icon: 'Car' },
    { slug: 'chassi', category: 'automotive', title: 'Chassi', icon: 'Car' },
    { slug: 'renavam', category: 'automotive', title: 'Renavam', icon: 'Shield' },

    // Business
    { slug: 'cnae-search', category: 'business', title: 'Busca de CNAE', icon: 'Briefcase' },
    { slug: 'cte-generator', category: 'business', title: 'Gerador de CT-e', icon: 'Truck' },
    { slug: 'mdfe-generator', category: 'business', title: 'Gerador de MDF-e', icon: 'FileText' },
    { slug: 'nfce-generator', category: 'business', title: 'Gerador de NFC-e', icon: 'ShoppingCart' },
    { slug: 'nfe-generator', category: 'business', title: 'Gerador de NF-e', icon: 'FileText' },

    // Converters
    { slug: 'base', category: 'converters', title: 'Conversor de Base', icon: 'Calculator' },
    { slug: 'currency', category: 'converters', title: 'Conversor de Moeda', icon: 'Coins' },
    { slug: 'unit', category: 'converters', title: 'Conversor de Unidades', icon: 'ArrowRightLeft' },

    // Development
    { slug: 'minifier', category: 'development', title: 'Minificador', icon: 'FileCode' },
    { slug: 'mock-data', category: 'development', title: 'Dados de Teste', icon: 'Database' },
    { slug: 'regex', category: 'development', title: 'Regex', icon: 'Terminal' },
    { slug: 'timestamp', category: 'development', title: 'Timestamp', icon: 'Clock' },

    // Documents
    { slug: 'certificate-generator', category: 'documents', title: 'Certificados', icon: 'Award' },
    { slug: 'cnh', category: 'documents', title: 'CNH', icon: 'CreditCard' },
    { slug: 'cnpj', category: 'documents', title: 'CNPJ', icon: 'Code2' },
    { slug: 'contract-generator', category: 'documents', title: 'Contratos', icon: 'FileText' },
    { slug: 'cpf', category: 'documents', title: 'CPF', icon: 'FileText' },
    { slug: 'inscricao-estadual', category: 'documents', title: 'Inscrição Estadual', icon: 'FileText' },
    { slug: 'pis', category: 'documents', title: 'PIS/PASEP', icon: 'CreditCard' },
    { slug: 'rg', category: 'documents', title: 'RG', icon: 'CreditCard' },
    { slug: 'titulo-eleitor', category: 'documents', title: 'Título de Eleitor', icon: 'CreditCard' },

    // Finance
    { slug: 'boleto-generator', category: 'finance', title: 'Gerador de Boleto', icon: 'Barcode' },
    { slug: 'credit-card-generator', category: 'finance', title: 'Cartão de Crédito', icon: 'CreditCard' },
    { slug: 'iban-validator', category: 'finance', title: 'Validador IBAN', icon: 'CreditCard' },
    { slug: 'tax-calculator', category: 'finance', title: 'Calculadora de Impostos', icon: 'Calculator' },

    // Image
    { slug: 'converter', category: 'image', title: 'Conversor de Imagem', icon: 'ImageIcon' },
    { slug: 'favicon', category: 'image', title: 'Gerador de Favicon', icon: 'ImageIcon' },
    { slug: 'ocr', category: 'image', title: 'OCR', icon: 'ImageIcon' },
    { slug: 'placeholder', category: 'image', title: 'Placeholder', icon: 'ImageIcon' },

    // Personal
    { slug: 'address', category: 'personal', title: 'Endereço (CEP)', icon: 'MapPin' },
    { slug: 'email', category: 'personal', title: 'Gerador de Email', icon: 'Mail' },
    { slug: 'lgpd-data', category: 'personal', title: 'Dados LGPD', icon: 'Shield' },
    { slug: 'name', category: 'personal', title: 'Gerador de Nomes', icon: 'User' },
    { slug: 'person', category: 'personal', title: 'Pessoa Completa', icon: 'User' },
    { slug: 'phone', category: 'personal', title: 'Telefone/Celular', icon: 'Phone' },

    // Text
    { slug: 'case-converter', category: 'text', title: 'Maiúsculas/Minúsculas', icon: 'Type' },
    { slug: 'character-counter', category: 'text', title: 'Contador de Caracteres', icon: 'Type' },
    { slug: 'diff-checker', category: 'text', title: 'Comparador de Texto', icon: 'FileDiff' },
    { slug: 'email-signature', category: 'text', title: 'Assinatura de Email', icon: 'Mail' },
    { slug: 'email-validator', category: 'text', title: 'Validador de Email', icon: 'Mail' },
    { slug: 'slug-generator', category: 'text', title: 'Gerador de Slug', icon: 'Link' },

    // Utilities
    { slug: 'base64', category: 'utilities', title: 'Base64', icon: 'Binary' },
    { slug: 'deadline-calculator', category: 'utilities', title: 'Calculadora de Prazo', icon: 'Calendar' },
    { slug: 'hash', category: 'utilities', title: 'Gerador de Hash', icon: 'Hash' },
    { slug: 'json', category: 'utilities', title: 'Formatador JSON', icon: 'Braces' },
    { slug: 'lorem', category: 'utilities', title: 'Lorem Ipsum', icon: 'Type' },
    { slug: 'password', category: 'utilities', title: 'Gerador de Senha', icon: 'Key' },
    { slug: 'qrcode', category: 'utilities', title: 'QR Code', icon: 'QrCode' },
    { slug: 'uuid', category: 'utilities', title: 'Gerador de UUID', icon: 'Hash' },
    { slug: 'xml-validator', category: 'utilities', title: 'Validador XML', icon: 'FileCode' },
];

const TOOLS_DIR = path.join(__dirname, '../app/tools');

function getCategoryLabel(category) {
    const map = {
        'automotive': 'Automotivo',
        'business': 'Negócios',
        'converters': 'Conversores',
        'development': 'Desenvolvimento',
        'documents': 'Documentos',
        'finance': 'Finanças',
        'image': 'Imagem',
        'personal': 'Pessoal',
        'text': 'Texto',
        'utilities': 'Utilidades'
    };
    return map[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function processTool(tool) {
    // console.log(`Processing ${tool.slug}...`);
    const toolDir = path.join(TOOLS_DIR, tool.category, tool.slug);
    const pagePath = path.join(toolDir, 'page.tsx');
    const clientPath = path.join(toolDir, 'client.tsx');

    if (!fs.existsSync(pagePath) || !fs.existsSync(clientPath)) {
        console.warn(`Files not found for ${tool.slug}`);
        return;
    }

    // 1. Modify page.tsx
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    if (!pageContent.includes('JsonLd')) {
        // Extract Metadata
        let title = tool.title;
        let description = `Ferramenta ${tool.title}`; // Default

        const titleMatch = pageContent.match(/const title = "(.*?)"/) || pageContent.match(/title:\s*"(.*?)"/);
        if (titleMatch) title = titleMatch[1];

        const descMatch = pageContent.match(/const description = "(.*?)"/) || pageContent.match(/description:\s*"(.*?)"/);
        if (descMatch) description = descMatch[1];

        // Add Import
        const importStmt = 'import { JsonLd } from "@/components/seo/json-ld"';
        if (!pageContent.includes(importStmt)) {
            pageContent = importStmt + '\n' + pageContent;
        }

        // Prepare JsonLd Component
        const jsonLdComponent = `
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "${title}",
                            "operatingSystem": "Web",
                            "applicationCategory": "${getCategoryLabel(tool.category)}Application",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "${description}"
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://devhubtools.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://devhubtools.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "${getCategoryLabel(tool.category)}",
                                    "item": "https://devhubtools.com/tools/${tool.category}"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "${tool.title}",
                                    "item": "https://devhubtools.com/tools/${tool.category}/${tool.slug}"
                                }
                            ]
                        }
                    ]
                }}
            />`;

        // Inject Component
        const returnRegex = /return\s+(<[A-Z][a-zA-Z0-9]+.*?\/>)/;
        const match = pageContent.match(returnRegex);

        if (match) {
            const originalReturn = match[1];
            const newReturn = `return (\n        <>\n            ${jsonLdComponent}\n            ${originalReturn}\n        </>\n    )`;
            pageContent = pageContent.replace(match[0], newReturn);
            fs.writeFileSync(pagePath, pageContent);
            console.log(`Updated page.tsx for ${tool.slug}`);
        } else {
            // Try matching return ( ... ) block
            // const returnBlockRegex = /return\s+\(\s*<[A-Z][a-zA-Z0-9]+.*?\/>\s*\)/s;
            // This is getting complicated to regex perfectly. 
            // If the simple regex failed, we log warning.
            console.warn(`Could not find simple return statement in ${tool.slug} page.tsx`);
        }
    }

    // 2. Modify client.tsx
    let clientContent = fs.readFileSync(clientPath, 'utf8');
    if (!clientContent.includes('Breadcrumbs')) {
        // Add Import
        const importStmt = 'import { Breadcrumbs } from "@/components/ui/breadcrumbs"';
        if (!clientContent.includes(importStmt)) {
            const lastImportIdx = clientContent.lastIndexOf('import ');
            const endOfLastImport = clientContent.indexOf('\n', lastImportIdx);
            clientContent = clientContent.slice(0, endOfLastImport + 1) + importStmt + '\n' + clientContent.slice(endOfLastImport + 1);
        }

        // Prepare Breadcrumbs Component
        const items = [
            { label: 'Ferramentas' },
            { label: getCategoryLabel(tool.category) },
            { label: tool.title }
        ];

        if (tool.category === 'business') {
            items[0].href = '/ferramentas-fiscais';
            items[1].label = 'Negócios';
            items[1].href = '/ferramentas-fiscais';
        }

        const breadcrumbsComponent = `<Breadcrumbs items={${JSON.stringify(items)}} className="mb-6" />`;

        // Inject Component
        // Look for the header section. Usually starts with <div className="mb-8"> or similar containing h1.
        // We match <div className="...mb-8...">
        const headerRegex = /(<div\s+className="[^"]*mb-8[^"]*">)/;
        const match = clientContent.match(headerRegex);

        if (match) {
            clientContent = clientContent.replace(match[0], `${breadcrumbsComponent}\n                    ${match[0]}`);
            fs.writeFileSync(clientPath, clientContent);
            console.log(`Updated client.tsx for ${tool.slug}`);
        } else {
            console.warn(`Could not find header section in ${tool.slug} client.tsx`);
        }
    }
}

tools.forEach(processTool);
