import { Metadata } from "next"
import { JSONFormatterPage } from "./client"

export const metadata: Metadata = {
    title: "JSON Formatter e Validator Online - Formatar e Minificar",
    description: "Ferramenta para formatar, validar e minificar JSON online. Visualize erros de sintaxe e melhore a legibilidade.",
}

export default function Page() {
    return <JSONFormatterPage />
}
