import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'
import { IE_STATES } from '@/lib/utils/validators/inscricao-estadual'
import { generateToolMetadata } from '@/lib/seo-config'

interface PageProps {
    params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { state } = await params
    const stateInfo = IE_STATES.find(s => s.uf.toLowerCase() === state.toLowerCase())

    if (!stateInfo) {
        return {}
    }

    return generateToolMetadata({
        title: `Gerador de Inscrição Estadual ${stateInfo.uf} (${stateInfo.name}) | Válido e Formatado`,
        description: `Gere números de Inscrição Estadual válidos para ${stateInfo.name} (${stateInfo.uf}). Ferramenta gratuita para testes de software com validação de algoritmo oficial.`,
        path: `/ferramentas/inscricao-estadual/${stateInfo.uf.toLowerCase()}`,
        keywords: ['inscrição estadual', stateInfo.name, stateInfo.uf, 'gerador', 'validador', 'dev tools']
    })
}

export async function generateStaticParams() {
    return IE_STATES.map((state) => ({
        state: state.uf.toLowerCase(),
    }))
}

export default async function StatePage({ params }: PageProps) {
    const { state } = await params
    const stateInfo = IE_STATES.find(s => s.uf.toLowerCase() === state.toLowerCase())

    if (!stateInfo) {
        notFound()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <StateRegistrationGenerator defaultState={stateInfo.uf} />
            </main>
        </div>
    )
}
