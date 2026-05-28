import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'
import { IE_STATES } from '@/lib/utils/validators/inscricao-estadual'
import { generateToolMetadata } from '@/lib/seo-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { StateRegistrationLinks } from '@/components/tools/state-registration-links'
import { RelatedTools } from "@/components/tools/related-tools"

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
                <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Documentos Pessoais", href: "/ferramentas-documentos" },
                        { label: "Inscrição Estadual", href: "/ferramentas/inscricao-estadual" },
                        { label: stateInfo.uf }
                    ]} />
                </div>
                <StateRegistrationGenerator defaultState={stateInfo.uf} />
                
                {/* FAQ SEO Section */}
                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t">
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Perguntas Frequentes sobre a Inscrição Estadual de {stateInfo.name} ({stateInfo.uf})</h2>
                            <p className="text-muted-foreground">Tire suas dúvidas sobre consultas no Sintegra, validação junto à SEFAZ {stateInfo.uf} e regras de emissão.</p>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full bg-card border rounded-lg p-4 shadow-sm">
                            <AccordionItem value="faq-1">
                                <AccordionTrigger className="text-left font-medium text-lg">O que é a Inscrição Estadual de {stateInfo.name} ({stateInfo.uf}) e para que serve?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    A Inscrição Estadual (IE) em {stateInfo.name} é o registro obrigatório que as empresas com atividades de comércio, indústria e prestação de serviços de transporte intermunicipal ou interestadual devem manter junto à <strong>SEFAZ {stateInfo.uf}</strong> (Secretaria de Estado da Fazenda de {stateInfo.name}). Esse registro identifica a empresa como contribuinte do ICMS, permitindo a emissão legal de documentos fiscais como a NF-e e a NFC-e.
                                </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="faq-2">
                                <AccordionTrigger className="text-left font-medium text-lg">Como posso consultar uma Inscrição Estadual na SEFAZ {stateInfo.uf}?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    Para consultar e verificar o status cadastral de um contribuinte em {stateInfo.name}, você pode acessar o site oficial da <strong>SEFAZ {stateInfo.uf}</strong> através do módulo de consulta de cadastro, ou realizar a busca no portal do <strong>Sintegra {stateInfo.uf}</strong>. Também é possível efetuar essa consulta no Cadastro Centralizado de Contribuintes (CCC), bastando informar o CNPJ da empresa para obter os dados completos e confirmar se a inscrição está ativa, baixada ou suspensa.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="faq-3">
                                <AccordionTrigger className="text-left font-medium text-lg">Como funciona o cálculo de validação da IE de {stateInfo.name}?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    Diferente do CPF e CNPJ, que possuem regras nacionais únicas, o cálculo e o formato de dígitos da Inscrição Estadual variam em cada estado brasileiro. O algoritmo para {stateInfo.name} segue uma regra matemática própria regida pela <strong>SEFAZ {stateInfo.uf}</strong>, empregando o sistema de Módulo 11 (ou Módulo 9, dependendo do estado) com pesos ponderados específicos para gerar um ou dois dígitos verificadores ao final da sequência. Isso evita erros de digitação e validações em lote inconsistentes em softwares emissores de Notas Fiscais Eletrônicas.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </div>

                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <StateRegistrationLinks />
                </div>
                <div className="pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <RelatedTools currentToolSlug="inscricao-estadual" category="documents" customSlugs={['cpf', 'cnpj', 'nfe-generator', 'cte-generator']} />
                </div>
            </main>
        </div>
    )
}

