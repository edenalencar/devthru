import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/dashboard',
                '/dashboard/',
                '/auth/',
                '/login',
                '/register',
                '/forgot-password',
                '/_next/',
            ],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    }
}
