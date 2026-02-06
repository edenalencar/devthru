import { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'
import { tools } from '@/lib/tools-list'
import { IE_STATES } from '@/lib/utils/validators/inscricao-estadual'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url

    // Core static routes
    const coreRoutes = [
        '',
        '/ferramentas-fiscais',
        '/pricing',
        '/contact',
        '/about',
        '/faq',
        '/privacy',
        '/terms',
        '/updates',
        '/login',
        '/register',
        '/forgot-password',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : route === '/ferramentas-fiscais' ? 0.9 : 0.8,
    }))

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Inscrição Estadual state-specific routes
    const ieStateRoutes = IE_STATES.map((state) => ({
        url: `${baseUrl}/ferramentas/inscricao-estadual/${state.uf.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...coreRoutes, ...toolRoutes, ...ieStateRoutes]
}
