import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CertificateGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Certificados"
const description = "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/certificate-generator",
    keywords: ["gerador certificado", "criar certificado", "certificado online", "certificado curso", "pdf generator"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Certificados",
                    description: "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/certificate-generator",
                    toolSlug: "certificate-generator"
                })}
            />
            <CertificateGeneratorPage />
        </>
    )
}
