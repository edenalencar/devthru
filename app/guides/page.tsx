
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PROGRAMMATIC_CONTENT } from "@/lib/content/programmatic"

export const metadata = {
    title: "Guias de Implementação | DevThru",
    description: "Aprenda a implementar algoritmos de validação e geração de documentos em diversas linguagens de programação.",
}

export default function GuidesIndex() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-4">Guias de Implementação</h1>
                <p className="text-xl text-muted-foreground">
                    Tutoriais práticos e snippets de código para validação de documentos e algoritmos comuns.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROGRAMMATIC_CONTENT.map((guide) => (
                    <Link
                        key={`${guide.toolId}-${guide.languageId}`}
                        href={`/guides/${guide.category}/${guide.toolId}/${guide.languageId}`}
                        className="block group"
                    >
                        <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {guide.languageId}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
                                        {guide.category === 'validation' ? 'Validação' : guide.category === 'formatting' ? 'Formatação' : guide.category}
                                    </span>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors">
                                    {guide.title}
                                </CardTitle>
                                <CardDescription>
                                    {guide.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
