import { Metadata } from "next"
import { SlugGeneratorPage } from "./client"

const title = "Gerador de Slug Url Amigável Online"
const description = "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <SlugGeneratorPage />
}
