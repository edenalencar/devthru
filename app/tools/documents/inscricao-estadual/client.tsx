'use client'

import { Navbar } from '@/components/layout/navbar'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'
import { RelatedTools } from "@/components/tools/related-tools"
import { StateRegistrationLinks } from '@/components/tools/state-registration-links'
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function InscricaoEstadualPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Documentos Pessoais", href: "/ferramentas-documentos" },
                        { label: "Inscrição Estadual" }
                    ]} />
                </div>
                <StateRegistrationGenerator />
                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <StateRegistrationLinks />
                </div>
                <div className="pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <RelatedTools currentToolSlug="inscricao-estadual" category="documents" customSlugs={['cpf', 'cnpj', 'nfe', 'cte']} />
                </div>
            </main>
        </div>
    )
}
