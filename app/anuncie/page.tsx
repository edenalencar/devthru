import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { AnuncieClient } from "./client"

export const metadata: Metadata = {
    title: "Anuncie no DevThru | Mídia Kit & Patrocínios B2B",
    description: "Conecte sua marca ou produto B2B diretamente a milhares de profissionais, analistas fiscais, desenvolvedores e tomadores de decisão em ambiente de trabalho no Brasil. Anúncios 100% nativos e imunes a AdBlock.",
    alternates: {
        canonical: `${siteConfig.url}/anuncie`,
    },
    openGraph: {
        title: "Anuncie no DevThru | Mídia Kit & Patrocínios B2B",
        description: "Alcance profissionais, analistas e tomadores de decisão no momento em que estão operando, testando e validando fluxos em suas rotinas de trabalho. Formatos nativos e alta visibilidade.",
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
        "description": "Formatos de patrocínio e banners nativos para empresas alcançarem profissionais, analistas fiscais, equipes de tecnologia e tomadores de decisão no Brasil.",
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
