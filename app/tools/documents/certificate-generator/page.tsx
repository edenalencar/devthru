import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CertificateGeneratorPage } from "./client"

const title = "Gerador de Certificados Online Grátis - Cursos e Eventos"
const description = "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "Gerador de Certificados Online Grátis - Cursos e Eventos",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional."
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://devhubtools.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://devhubtools.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Documentos",
                                    "item": "https://devhubtools.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Certificados",
                                    "item": "https://devhubtools.com/tools/documents/certificate-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CertificateGeneratorPage />
        </>
    )
}
