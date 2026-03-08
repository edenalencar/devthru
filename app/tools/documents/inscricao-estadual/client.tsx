'use client'

import { Navbar } from '@/components/layout/navbar'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'
import { RelatedTools } from "@/components/tools/related-tools"
import { StateRegistrationLinks } from '@/components/tools/state-registration-links'
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

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
                
                {/* FAQ SEO Section */}
                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <section className="space-y-6">
                        <div className="text-center space-y-2 mb-8">
                            <h2 className="text-3xl font-bold tracking-tight">Perguntas Frequentes</h2>
                            <p className="text-muted-foreground">Tudo o que você precisa saber sobre a validação de IE para testes e nota fiscal.</p>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full bg-card border rounded-lg p-4 shadow-sm">
                            <AccordionItem value="diferenca-documentos">
                                <AccordionTrigger className="text-left font-medium text-lg">Qual a diferença de CPF, CNPJ e Inscrição Estadual?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    Enquanto o <strong>CPF</strong> (Cadastro de Pessoas Físicas) é civil e o <strong>CNPJ</strong> (Cadastro Nacional da Pessoa Jurídica) é o registro principal da empresa na Receita Federal, a <strong>Inscrição Estadual (IE)</strong> é exclusividade do sistema tributário estadual. A IE é fornecida pela Sefaz (Secretaria de Estado da Fazenda) e serve como registro no cadastro do ICMS. Se seu software lida com emissão de notas fiscais (NF-e/NFC-e), o validador de IE se torna obrigatório.
                                </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="validade-governo">
                                <AccordionTrigger className="text-left font-medium text-lg">A Inscrição Estadual gerada aqui é vinculada à Sefaz?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    <strong>Completamente não.</strong> As Inscrições Estaduais concebidas no nosso gerador são fabricadas isoladamente no seu navegador cruzando dados sintéticos contra a tabela do algoritmo do dígito verificador estipulado por cada estado matriz. Atendem à conformidade técnica para passar pelos bloqueios locais do seu ERP ou código antes da ida ao servidor de homologação da Sefaz (SEFAZ AM, SEFAZ SP, etc), mas nunca terão validade civil no painel do Sintegra.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="testes-nfe">
                                <AccordionTrigger className="text-left font-medium text-lg">Como essas IE falsas ajudam meus testes de NF-e?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    Quando você vai disparar um payload WebService XML ou JSON para os webservices da Secretaria da Fazenda nos ambientes Web, é requisitado que o <i>Schema</i> seja blindado. Preencher formulários com dados vazios rejeita rapidamente na porta XML. A validação técnica salva horas enviando lotes de validação já pré-computadas na sua estrutura de testes Mockados (Mockito, Jest), simulando dados limpos antes dos Certificados A1 de homologação.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </div>

                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t">
                    <StateRegistrationLinks />
                </div>
                <div className="pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <RelatedTools currentToolSlug="inscricao-estadual" category="documents" customSlugs={['cpf', 'cnpj', 'nfe-generator', 'cte-generator']} />
                </div>
            </main>
        </div>
    )
}
