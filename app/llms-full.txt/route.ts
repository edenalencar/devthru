import { tools } from '@/lib/tools-list'
import { PROGRAMMATIC_CONTENT } from '@/lib/content/programmatic'
import { getAllPosts } from '@/lib/content/blog'

export async function GET() {
    let content = `# DevThru Full Catalog for LLMs\n\n`;
    content += `> [DevThru](https://www.devthru.com) - Dados rápidos pra viagem. Plataforma moderna e gratuita de ferramentas úteis para desenvolvedores brasileiros.\n\n`;
    
    content += `## Ferramentas Disponíveis\n\n`;
    tools.forEach(tool => {
        content += `- [${tool.title}](https://www.devthru.com/tools/${tool.category}/${tool.slug}) - Gerador e validador online de ${tool.title}.\n`;
    });
    
    content += `\n## Guias e Tutoriais Programáticos\n\n`;
    PROGRAMMATIC_CONTENT.forEach(guide => {
        content += `- [${guide.title}](https://www.devthru.com/guides/${guide.category}/${guide.toolId}/${guide.languageId}) - Código pronto e explicação do algoritmo em ${guide.languageId.toUpperCase()}.\n`;
    });

    content += `\n## Artigos do Blog\n\n`;
    getAllPosts().forEach(post => {
        content += `- [${post.title}](https://www.devthru.com/blog/${post.slug}) - ${post.description}\n`;
    });

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=18000',
        },
    });
}
