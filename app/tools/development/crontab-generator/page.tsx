import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"
import { CrontabGeneratorPage } from "./client"

const title = "Gerador de Crontab Online - Criar e Validar Expressões Cron"
const description = "Crie, valide e decodifique expressões cron de forma simples e visual. Gere linhas de comando completas e entenda a recorrência em português brasileiro."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/development/crontab-generator",
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
                            "name": "Gerador de Crontab Online - Criar e Validar Expressões Cron",
                            "operatingSystem": "Web",
                            "applicationCategory": "DesenvolvimentoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie, valide e decodifique expressões cron de forma simples e visual. Gere linhas de comando completas com descrição em português."
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
                                    "name": "Desenvolvimento",
                                    "item": "https://www.devthru.com/tools/development"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de Crontab",
                                    "item": "https://www.devthru.com/tools/development/crontab-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CrontabGeneratorPage />
        </>
    )
}
