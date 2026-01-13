import { Metadata } from "next"
import { NfceGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chave NFC-e - Nota Fiscal de Consumidor",
    description: "Gere chaves de acesso de Nota Fiscal de Consumidor Eletrônica (NFC-e) válidas para testes.",
    keywords: ["gerador nfc-e", "chave nfc-e", "nfce teste", "consumidor eletronica", "dev tools"],
    openGraph: {
        title: "Gerador de Chave NFC-e | DevHub Tools",
        description: "Gere chaves de acesso de Nota Fiscal de Consumidor Eletrônica (NFC-e) válidas para testes.",
        type: "website",
    }
}

export default function Page() {
<<<<<<< HEAD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Gerador de Chave NFC-e",
        "description": "Gere chaves de acesso de Nota Fiscal de Consumidor Eletrônica (NFC-e) válidas para testes.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <NfceGeneratorPage />
        </>
    )
=======
    return <NfceGeneratorPage />
>>>>>>> origin/master
}
