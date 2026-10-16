import { Metadata } from "next"
import { FAQPage } from "./client"
import { siteConfig } from "@/config/site"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQS_DATA } from "./faqs-data"

export const metadata: Metadata = {
    title: "Perguntas Frequentes (FAQ)",
    description: "Tire suas dúvidas sobre o DevThru, planos, preços, API e privacidade.",
    alternates: {
        canonical: `${siteConfig.url}/faq`,
    },
}

export default function Page() {
    return (
        <>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": FAQS_DATA.map((faq) => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                }}
            />
            <FAQPage />
        </>
    )
}
