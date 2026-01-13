import { Metadata } from 'next'
import { PISPage } from './client'

const title = 'Gerador de PIS/PASEP Online - Gerar e Validar PIS Grátis'
const description = 'Ferramenta online gratuita para gerar e validar números de PIS/PASEP válidos para testes. Ideal para desenvolvedores e analistas de QA.'

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <PISPage />
}
