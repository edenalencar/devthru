import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { SqlFormatterPage } from "./client"

const title = "SQL Formatter Online | Beautifier e Minifier Grátis"
const description = "Formate, indente e organize suas queries SQL online. Suporte para PostgreSQL, MySQL, SQL Server e mais. Deixe seu código SQL legível instantaneamente."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
    keywords: ["sql formatter", "formatar sql", "beautify sql", "indenar sql", "postgresql formatter", "mysql formatter", "ferramentas dev"],
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
                            "name": title,
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
                            "description": description,
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            }
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
                                    "item": "https://devhubtools.com/tools"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "SQL Formatter",
                                    "item": "https://devhubtools.com/tools/development/sql-formatter"
                                }
                            ]
                        }
                    ]
                }}
            />
            <SqlFormatterPage />
        </>
    )
}
