'use client'

import { Navbar } from '@/components/layout/navbar'
import Link from 'next/link'
import Image from 'next/image'
import { StateRegistrationGenerator } from '@/components/tools/state-registration-generator'
import { RelatedTools } from "@/components/tools/related-tools"
import { StateRegistrationLinks } from '@/components/tools/state-registration-links'
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IE_STATES } from '@/lib/utils/validators/inscricao-estadual'
import { ExternalLink, ShieldCheck, MapPin, FileSpreadsheet } from 'lucide-react'

export function InscricaoEstadualPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/" },
                        { label: "Inscrição Estadual" }
                    ]} />
                </div>

                <StateRegistrationGenerator />

                {/* Technical Overview & National Directory */}
                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <FileSpreadsheet className="w-5 h-5 text-primary" />
                                <span>Tabela Completa de Inscrição Estadual por Estado (27 UFs)</span>
                            </CardTitle>
                            <CardDescription>
                                Consulte a quantidade de dígitos, máscaras oficiais e acesse os geradores e validadores específicos de cada Secretaria da Fazenda (Sefaz).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    A <strong>Inscrição Estadual (IE)</strong> é o registro que habilita a pessoa jurídica contribuinte do <strong>ICMS (Imposto sobre Circulação de Mercadorias e Serviços)</strong> perante a Secretaria da Fazenda Estadual. Diferentemente do CNPJ (que possui formato unificado em todo o país), a IE possui <strong>estruturas, pesos de cálculo e algoritmos próprios</strong> estipulados de forma autônoma por cada um dos 26 estados brasileiros e pelo Distrito Federal.
                                </p>
                            </div>

                            <div className="overflow-x-auto rounded-lg border bg-card">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/70 text-xs uppercase text-muted-foreground border-b">
                                        <tr>
                                            <th className="py-3 px-4">Estado / UF</th>
                                            <th className="py-3 px-4">Máscara / Formato</th>
                                            <th className="py-3 px-4">Dígitos</th>
                                            <th className="py-3 px-4 text-right">Gerador Específico</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {IE_STATES.map((state) => (
                                            <tr key={state.uf} className="hover:bg-muted/40 transition-colors">
                                                <td className="py-3 px-4 font-medium flex items-center gap-2.5">
                                                    <span className="relative w-6 h-4 overflow-hidden rounded border border-black/10 inline-block flex-shrink-0 shadow-xs">
                                                        <Image
                                                            src={`/flags/${state.uf.toLowerCase()}.svg`}
                                                            alt={`Bandeira de ${state.name}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </span>
                                                    <span>{state.name} ({state.uf})</span>
                                                </td>
                                                <td className="py-3 px-4 font-mono text-xs text-foreground/90">{state.format}</td>
                                                <td className="py-3 px-4 text-muted-foreground">{state.length} dígitos</td>
                                                <td className="py-3 px-4 text-right">
                                                    <Link
                                                        href={`/ferramentas/inscricao-estadual/${state.uf.toLowerCase()}`}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                                    >
                                                        Gerar {state.uf}
                                                        <ExternalLink className="w-3 h-3" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="p-4 rounded-lg border bg-muted/20">
                                    <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-2 text-foreground">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span>Algoritmos Módulo 11 e Módulo 10</span>
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Cada estado aplica somas ponderadas com pesos decrescentes ou regras de exceção para resto 10 e resto 11. Estados como São Paulo, Rio Grande do Sul e Bahia possuem fórmulas específicas que exigem rotinas dedicadas de validação no código.
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg border bg-muted/20">
                                    <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-2 text-foreground">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        <span>Integração Sintegra e CCC (Sefaz)</span>
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Em ambientes de homologação de NF-e e NFC-e, utilizar números estruturalmente válidos evita a rejeição de Schema XML antes da chamada ao WebService da Fazenda, acelerando os testes automatizados da sua aplicação.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* FAQ SEO Section */}
                    <ToolFaqSection
                        toolSlug="inscricao-estadual"
                        title="Perguntas Frequentes sobre Inscrição Estadual"
                        description="Tudo o que você precisa saber sobre a validação de IE para testes de software, Sintegra e emissão de notas fiscais."
                    />

                    {/* Related Articles */}
                    <div className="py-2 border-t">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Artigos Relacionados</h3>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/blog/inscricao-estadual-o-que-e-como-validar" className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5">
                                📖 Artigo: O que é e Como Validar Inscrição Estadual (Guia Completo)
                            </Link>
                        </div>
                    </div>

                    <StateRegistrationLinks />

                    <RelatedTools currentToolSlug="inscricao-estadual" category="documents" customSlugs={['cpf', 'cnpj', 'nfe-generator', 'cte-generator']} />
                </div>
            </main>
        </div>
    )
}
