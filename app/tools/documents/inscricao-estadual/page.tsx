import { Metadata } from 'next'
import { InscricaoEstadualPage } from './client'

const title = 'Gerador de Inscrição Estadual (IE) - Validador Online Grátis'
const description = 'Gere e valide Inscrição Estadual (IE) de todos os estados do Brasil (SP, RJ, MG, RS, etc). Ferramenta essencial para testes fiscais e tributários.'

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <InscricaoEstadualPage />
}
