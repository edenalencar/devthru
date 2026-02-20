import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PROGRAMMATIC_CONTENT } from "@/lib/content/programmatic"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

interface PageProps {
    params: Promise<{
        category: string
    }>
}

export async function generateStaticParams() {
    // Get unique categories
    const categories = Array.from(new Set(PROGRAMMATIC_CONTENT.map(c => c.category)))
    return categories.map((category) => ({
        category,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params
    const categoryName = category === 'validation' ? 'Validação' : category === 'formatting' ? 'Formatação' : category

    return {
        title: `Guias de ${categoryName} | DevThru`,
        description: `Aprenda a implementar algoritmos de ${categoryName.toLowerCase()} em diversas linguagens.`,
        alternates: {
            canonical: `https://www.devthru.com/guides/${category}`,
        },
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params

    const guides = PROGRAMMATIC_CONTENT.filter(c => c.category === category)
    const categoryName = category === 'validation' ? 'Validação' : category === 'formatting' ? 'Formatação' : category

    if (guides.length === 0) {
        notFound()
    }

    return (
        <div className="container py-12 px-4 max-w-7xl mx-auto">
            <Breadcrumbs
                items={[
                    { label: "Guias", href: "/guides" },
                    { label: categoryName }
                ]}
                className="mb-6"
            />

            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 capitalize">Guias de {categoryName}</h1>
                <p className="text-xl text-muted-foreground">
                    Tutoriais e snippets para {categoryName.toLowerCase()}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                    <Link
                        key={`${guide.toolId}-${guide.languageId}`}
                        href={`/guides/${guide.category}/${guide.toolId}/${guide.languageId}`}
                        className="block group"
                    >
                        <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                            <CardHeader>
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                    {guide.languageId}
                                </span>
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
