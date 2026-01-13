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
    return <JSONFormatterPage />
}
