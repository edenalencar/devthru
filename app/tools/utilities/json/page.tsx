import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { JSONFormatterPage } from "./client"

const title = "JSON Formatter e Validator Online - Formatar e Minificar"
const description = "Formate, valide e minifique código JSON online com nossa ferramenta gratuita. Visualize a estrutura, corrija erros de sintaxe e otimize seus dados para APIs."

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
                            "name": "JSON Formatter e Validator Online - Formatar e Minificar",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Formate, valide e minifique código JSON online com nossa ferramenta gratuita. Visualize a estrutura, corrija erros de sintaxe e otimize seus dados para APIs."
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
                                    "name": "Utilidades",
                                    "item": "https://devhubtools.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Formatador JSON",
                                    "item": "https://devhubtools.com/tools/utilities/json"
                                }
                            ]
                        }
                    ]
                }}
            />
            <JSONFormatterPage />
        </>
    )
}
