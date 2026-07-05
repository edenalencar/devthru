import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PixParserPage } from "./client"

const title = "Decodificador e Gerador de Pix Copia e Cola - QR Code Online"
const description = "Cole uma string de Pix Copia e Cola para decodificar todos os dados do recebedor (nome, chave, valor), gerar o QR Code correspondente na tela ou alterar o valor de um Pix estático com recalculo de CRC16."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/pix-parser",
    keywords: [
        "decodificar pix copia e cola",
        "gerar qr code a partir de pix copia e cola",
        "alterar valor do pix copia e cola",
        "parser emv pix",
        "ler chave pix copia e cola",
        "recalcular crc16 pix",
        "pix copia e cola no pc"
    ]
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
                            "name": "Decodificador e Gerador de Pix Copia e Cola - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinanceApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Ferramenta para decodificação de string Pix Copia e Cola. Analise chaves Pix, nomes de recebedores, valores embutidos e gere o QR Code da cobrança na tela."
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
                                    "name": "Finanças",
                                    "item": "https://www.devthru.com/tools/finance"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Decodificador Pix",
                                    "item": "https://www.devthru.com/tools/finance/pix-parser"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PixParserPage />
        </>
    )
}
