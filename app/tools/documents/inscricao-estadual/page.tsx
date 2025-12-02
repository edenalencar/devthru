'use client'

import { Navbar } from '@/components/layout/navbar'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'

export default function InscricaoEstadualPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <StateRegistrationGenerator />
            </main>
        </div>
    )
}

