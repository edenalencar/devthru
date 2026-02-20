import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CertificateGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Certificados Online Grátis - Cursos e Eventos"
const description = "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/certificate-generator",
    keywords: ["gerador certificado", "criar certificado", "certificado online", "certificado curso", "pdf generator"]
})

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
                                    "item": "https://www.devthru.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://www.devthru.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Documentos",
                                    "item": "https://www.devthru.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Certificados",
                                    "item": "https://www.devthru.com/tools/documents/certificate-generator"
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
