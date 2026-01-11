import { Metadata } from 'next'
import { PISPage } from './client'

export const metadata: Metadata = {
    title: 'Gerador de PIS/PASEP Online - Gerar e Validar PIS Grátis',
    description: 'Ferramenta online gratuita para gerar e validar números de PIS/PASEP válidos para testes. Ideal para desenvolvedores e analistas de QA.',
}

export default function Page() {
    return <PISPage />
}
