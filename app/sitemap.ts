import { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'
import { tools } from '@/lib/tools-list'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url

    // Core static routes
    // Core static routes
    const coreRoutes = [
        '',
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
        priority: route === '' ? 1 : 0.8,
    }))

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...coreRoutes, ...toolRoutes]
}
