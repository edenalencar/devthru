import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/admin/',
                '/admin',
                '/dashboard',
                '/dashboard/',
                '/auth/',
                '/_next/',
            ],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    }
}
