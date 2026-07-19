const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../app/tools');
const OUTPUT_FILE = path.join(__dirname, '../lib/seo/faqs.ts');

// Helper to recursively find all client.tsx files in a directory
function findClientFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            findClientFiles(filePath, files);
        } else if (file === 'client.tsx') {
            files.push(filePath);
        }
    });
    return files;
}

// Clean JSX/HTML formatting to plain text
function cleanText(text) {
    return text
        .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '$1')
        .replace(/<code[^>]*>([\s\S]*?)<\/code>/g, '$1')
        .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1\n')
        .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '$2 ($1)')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&apos;/g, "'")
        .replace(/\{`([\s\S]*?)`\}/g, '$1')
        .replace(/\{"([\s\S]*?)"\}/g, '$1')
        .replace(/<[^>]+>/g, '') // remove remaining HTML tags
        .replace(/\s+/g, ' ')
        .trim();
}

function extractFAQs() {
    const clientFiles = findClientFiles(TOOLS_DIR);
    const faqDatabase = {};

    clientFiles.forEach(filePath => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Find Accordion Items
        const accordionItemRegex = /<AccordionItem\s+[^>]*>[\s\S]*?<AccordionTrigger[^>]*>([\s\S]*?)<\/AccordionTrigger>[\s\S]*?<AccordionContent[^>]*>([\s\S]*?)<\/AccordionContent>[\s\S]*?<\/AccordionItem>/g;
        
        let match;
        const faqs = [];
        
        while ((match = accordionItemRegex.exec(fileContent)) !== null) {
            const question = cleanText(match[1]);
            const answer = cleanText(match[2]);
            if (question && answer && !question.includes('Exemplo') && !answer.includes('examples=')) {
                faqs.push({ question, answer });
            }
        }
        
        if (faqs.length > 0) {
            // Extract slug from path (e.g. tools/documents/cpf/client.tsx -> cpf)
            const parts = filePath.split(path.sep);
            const slug = parts[parts.length - 2];
            faqDatabase[slug] = faqs;
        }
    });

    // Write file output
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let outputContent = `// Esse arquivo foi gerado automaticamente pelo script scripts/extract-faqs.js\n\n`;
    outputContent += `export interface FAQItem {\n    question: string;\n    answer: string;\n}\n\n`;
    outputContent += `export const TOOL_FAQS: Record<string, FAQItem[]> = ${JSON.stringify(faqDatabase, null, 4)};\n`;

    fs.writeFileSync(OUTPUT_FILE, outputContent, 'utf8');
    console.log(`FAQs extraídos com sucesso! Total de ferramentas com FAQ: ${Object.keys(faqDatabase).length}`);
}

extractFAQs();
