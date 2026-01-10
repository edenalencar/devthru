import { Metadata } from "next"
import { JSONFormatterPage } from "./client"

export const metadata: Metadata = {
    title: "JSON Formatter e Validator Online - Formatar e Minificar",
    description: "Formate, valide e minifique código JSON online com nossa ferramenta gratuita. Visualize a estrutura, corrija erros de sintaxe e otimize seus dados para APIs.",
}

export default function Page() {
    return <JSONFormatterPage />
}
