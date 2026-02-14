import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PixelToRemPage } from "./client"

const title = "Conversor de Pixel para REM (e Vice-Versa) | Grátis"
const description = "Converta pixels (px) para rem e rem para pixels (px) facilmente. Calculadora essencial para desenvolvedores front-end e web designers."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
    keywords: ["px to rem", "rem to px", "converter pixel rem", "calculadora css", "unidades css", "web design"],
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
                                    "name": "Pixel to REM",
                                    "item": "https://devhubtools.com/tools/converters/pixel-to-rem"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PixelToRemPage />
        </>
    )
}
