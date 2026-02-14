'use client'

import { Navbar } from '@/components/layout/navbar'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function InscricaoEstadualPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto pt-6">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Documentos Pessoais", href: "/ferramentas-documentos" },
                        { label: "Inscrição Estadual" }
                    ]} />
                </div>
                <StateRegistrationGenerator />
            </main>
        </div>
    )
}
