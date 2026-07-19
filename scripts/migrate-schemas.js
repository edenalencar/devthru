const fs = require('fs');
const path = require('path');

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

// Recursively find all page.tsx files under app/tools
function findPageFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            findPageFiles(filePath, files);
        } else if (file === 'page.tsx') {
            files.push(filePath);
        }
    });
    return files;
}

function processPage(pagePath) {
    const relativePath = path.relative(path.join(__dirname, '..'), pagePath).replace(/\\/g, '/');
    const pathParts = relativePath.split('/'); // e.g., ["app", "tools", "documents", "cpf", "page.tsx"]
    
    if (pathParts.length < 5) return;
    
    const category = pathParts[2];
    const slug = pathParts[3];
    const toolUrlPath = `/tools/${category}/${slug}`;
    const categoryLabel = getCategoryLabel(category);
    
    let content = fs.readFileSync(pagePath, 'utf8');

    // 1. Check if the page already uses JsonLd. If not, we skip or add it.
    if (!content.includes('JsonLd')) {
        console.log(`Skipping ${slug} (no JsonLd found)`);
        return;
    }

    // 2. Extract title and description constants
    let title = '';
    let description = '';

    const titleConstMatch = content.match(/const\s+title\s*=\s*"([^"]+)"/);
    const descConstMatch = content.match(/const\s+description\s*=\s*"([^"]+)"/);

    if (titleConstMatch) {
        title = titleConstMatch[1];
    }
    if (descConstMatch) {
        description = descConstMatch[1];
    }

    // If not found in const, try metadata title/description
    if (!title) {
        const metaTitleMatch = content.match(/title:\s*"([^"]+)"/);
        if (metaTitleMatch) title = metaTitleMatch[1];
    }
    if (!description) {
        const metaDescMatch = content.match(/description:\s*"([^"]+)"/);
        if (metaDescMatch) description = metaDescMatch[1];
    }

    // Clean title and description of [Grátis], Válido, etc. if needed, or keep them
    if (!title) {
        // Fallback to slug title case
        title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    if (!description) {
        description = `Ferramenta online gratuita para ${title}.`;
    }

    // 3. Add schema-helper import and remove duplicate JsonLd imports if necessary
    const schemaImport = 'import { getToolSchemaGraph } from "@/lib/seo/schema-helper"';
    if (!content.includes('schema-helper')) {
        // Inject import at the top
        content = `${schemaImport}\n${content}`;
    }

    // 4. Replace the static <JsonLd ... /> block
    // We match from `<JsonLd` to `/>` including any nested braces
    const jsonLdBlockRegex = /<JsonLd\s+data=\{[\s\S]*?\}\s*\/>/g;
    
    // Check if we can find the block
    if (content.match(jsonLdBlockRegex)) {
        const replacement = `<JsonLd
                data={getToolSchemaGraph({
                    name: "${title.replace(/"/g, '\\"')}",
                    description: "${description.replace(/"/g, '\\"')}",
                    categoryLabel: "${categoryLabel}",
                    path: "${toolUrlPath}",
                    toolSlug: "${slug}"
                })}
            />`;
        
        content = content.replace(jsonLdBlockRegex, replacement);
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Migrated page schema for ${slug}`);
    } else {
        console.warn(`Could not match JsonLd block in ${pagePath}`);
    }
}

function migrateAll() {
    const pageFiles = findPageFiles(TOOLS_DIR);
    console.log(`Found ${pageFiles.length} page.tsx files under app/tools`);
    pageFiles.forEach(processPage);
    console.log('Migration completed!');
}

migrateAll();
