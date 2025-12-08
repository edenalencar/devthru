import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface GenerateMetadataProps {
    title: string
    description: string
    path: string
    keywords?: string[]
}

export function generateToolMetadata({
    title,
    description,
    path,
    keywords = []
}: GenerateMetadataProps): Metadata {
    const url = `${siteConfig.url}${path}`

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        keywords: [...(siteConfig.keywords || []), ...keywords],
        openGraph: {
            type: 'website',
            locale: 'pt_BR',
            url,
            title,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: `${siteConfig.url}/og.jpg`, // Assuming a default OG image exists
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${siteConfig.url}/og.jpg`],
        },
    }
}
