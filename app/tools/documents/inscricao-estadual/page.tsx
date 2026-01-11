import { Metadata } from 'next'
import { InscricaoEstadualPage } from './client'

export const metadata: Metadata = {
    title: 'Gerador de Inscrição Estadual (IE) - Validador Online Grátis',
    description: 'Gere e valide Inscrição Estadual (IE) de todos os estados do Brasil (SP, RJ, MG, RS, etc). Ferramenta essencial para testes fiscais e tributários.',
}

export default function Page() {
    return <InscricaoEstadualPage />
}
