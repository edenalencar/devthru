import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PROGRAMMATIC_CONTENT } from "@/lib/content/programmatic"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

interface PageProps {
    params: Promise<{
        category: string
        tool: string
        language: string
    }>
}

export async function generateStaticParams() {
    return PROGRAMMATIC_CONTENT.map((content) => ({
        category: content.category,
        tool: content.toolId,
        language: content.languageId,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, tool, language } = await params
    const content = PROGRAMMATIC_CONTENT.find(
        (c) => c.category === category && c.toolId === tool && c.languageId === language
    )

    if (!content) {
        return {
            title: "Guia não encontrado",
        }
    }

    return {
        title: content.title,
        description: content.description,
        alternates: {
            canonical: `https://devthru.com/guides/${category}/${tool}/${language}`,
        },
    }
}

export default async function GuidePage({ params }: PageProps) {
    const { category, tool, language } = await params
    const content = PROGRAMMATIC_CONTENT.find(
        (c) => c.category === category && c.toolId === tool && c.languageId === language
    )

    if (!content) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="mb-8">
                <Breadcrumbs
                    items={[
                        { label: "Guias", href: "/guides" },
                        { label: category === "validation" ? "Validação" : category === "formatting" ? "Formatação" : category === "generation" ? "Geração" : category, href: `/guides` },
                        { label: content.title }
                    ]}
                    className="mb-6"
                />
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {content.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {content.description}
                </p>
            </div>

            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Introdução</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {content.content.intro}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">O Algoritmo</h2>
                    <div className="bg-muted/50 p-6 rounded-xl border border-border">
                        <p className="leading-relaxed">
                            {content.content.algorithm}
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Implementação em {content.languageId.charAt(0).toUpperCase() + content.languageId.slice(1)}</h2>
                    <CodeBlock
                        code={content.content.code}
                        language={content.languageId}
                        filename={`${tool}.${content.languageId === 'python' ? 'py' : 'js'}`}
                    />
                    <p className="mt-4 text-muted-foreground">
                        {content.content.explanation}
                    </p>
                </section>

                <div className="bg-blue-50 dark:bg-blue-950 p-8 rounded-xl border border-blue-200 dark:border-blue-900 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                        Não quer escrever código?
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-lg mx-auto">
                        Use nossa ferramenta online gratuita para processar {tool.toUpperCase()} instantaneamente. Perfeito para testes rápidos.
                    </p>
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Link
                            href={`/tools/${content.toolCategory}/${tool}`}
                            className="flex items-center gap-2"
                        >
                            Usar Ferramenta de {tool.toUpperCase()} Online
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
