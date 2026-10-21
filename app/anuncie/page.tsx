import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { AnuncieClient } from "./client"

export const metadata: Metadata = {
    title: "Anuncie no DevThru | Mídia Kit & Patrocínios para Empresas Tech",
    description: "Conecte sua marca, API, nuvem ou produto diretamente a milhares de desenvolvedores, QAs e arquitetos de software em ambiente de trabalho no Brasil. Anúncios 100% nativos e imunes a AdBlock.",
    alternates: {
        canonical: `${siteConfig.url}/anuncie`,
    },
    openGraph: {
        title: "Anuncie no DevThru | Mídia Kit & Patrocínios Tech",
        description: "Alcance desenvolvedores e tomadores de decisão técnica no momento em que estão codificando e testando sistemas. Formatos nativos e alta visibilidade.",
        url: `${siteConfig.url}/anuncie`,
        siteName: siteConfig.name,
        locale: "pt_BR",
        type: "website",
    },
    keywords: [
        "anuncie no devthru",
        "midia kit desenvolvedores",
        "patrocinio newsletter tech brasil",
        "anunciar para programadores",
        "publicidade devtools brasil",
        "patrocinio de software",
        "midia kit dev brasil",
    ],
}

export default function AnunciePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Espaços Publicitários e Patrocínio Nativo DevThru",
        "description": "Formatos de patrocínio e banners nativos para empresas alcançarem desenvolvedores de software e equipes de engenharia no Brasil.",
        "brand": {
            "@type": "Brand",
            "name": siteConfig.name,
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "url": `${siteConfig.url}/anuncie`,
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AnuncieClient />
        </>
    )
}
