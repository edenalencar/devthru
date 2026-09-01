import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"
import { CrontabGeneratorPage } from "./client"

const title = "Gerador de Expressão Cron (Crontab) Online - Grátis"
const description = "Crie, visualize e valide expressões Cron e horários de agendamento Crontab de forma interativa com explicação de sintaxe em português."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/development/crontab-generator",
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Crontab Online",
                    description: "Crie, valide e decodifique expressões cron de forma simples e visual. Gere linhas de comando completas e entenda a recorrência em português brasileiro.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/crontab-generator",
                    toolSlug: "crontab-generator"
                })}
            />
            <CrontabGeneratorPage />
        </>
    )
}
