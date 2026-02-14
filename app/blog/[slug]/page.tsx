import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, getPostBySlug, getRelatedPosts, blogCategories, type BlogCategory } from "@/lib/content/blog"
import { JsonLd } from "@/components/seo/json-ld"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag } from "lucide-react"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) return { title: "Post não encontrado" }

    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
        },
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) notFound()

    const relatedPosts = getRelatedPosts(slug)
    const cat = blogCategories[post.category as BlogCategory]

    return (
        <div className="min-h-screen">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.description,
                    "author": {
                        "@type": "Person",
                        "name": post.author
                    },
                    "datePublished": post.date,
                    "dateModified": post.date,
                    "image": `https://devthru.com/api/og/blog?title=${encodeURIComponent(post.title)}`, // dynamic OG image
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://devthru.com/blog/${slug}`
                    }
                }}
            />
            {/* Article Header */}
            <section className="border-b">
                <div className="container mx-auto max-w-3xl px-4 pt-8 pb-12">
                    <Breadcrumbs
                        items={[
                            { label: "Blog", href: "/blog" },
                            { label: cat.label, href: "/blog" },
                            { label: post.title }
                        ]}
                    />

                    <div className="mt-6">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${cat.color}`}>
                            {cat.label}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-4">
                        {post.title}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-6">
                        {post.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} min de leitura
                        </span>
                        <span className="font-medium text-foreground">
                            {post.author}
                        </span>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="container mx-auto max-w-3xl px-4 py-12">
                <div
                    className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:scroll-mt-20 prose-headings:font-semibold
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:leading-relaxed
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                        prose-pre:bg-zinc-950 prose-pre:text-zinc-50 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-800
                        prose-pre:overflow-x-auto prose-pre:text-sm
                        prose-table:border-collapse prose-th:border prose-th:px-4 prose-th:py-2 prose-th:bg-muted
                        prose-td:border prose-td:px-4 prose-td:py-2
                        prose-strong:text-foreground
                        [&_.info-box]:bg-blue-50 [&_.info-box]:dark:bg-blue-950/30 [&_.info-box]:border [&_.info-box]:border-blue-200 [&_.info-box]:dark:border-blue-800 [&_.info-box]:rounded-lg [&_.info-box]:p-4 [&_.info-box]:my-6 [&_.info-box]:text-sm"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA */}
                {post.relatedTools.length > 0 && (
                    <div className="mt-12 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 text-center">
                        <h3 className="text-xl font-semibold mb-2">🛠️ Experimente na prática</h3>
                        <p className="text-muted-foreground mb-4">
                            Use nossas ferramentas online gratuitas — sem cadastro, direto no navegador.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {post.relatedTools.map((toolHref) => {
                                const toolSlug = toolHref.split('/').pop() || ''
                                const toolNameMap: Record<string, string> = {
                                    'cpf': 'Gerador de CPF',
                                    'cnpj': 'Gerador de CNPJ',
                                    'lgpd-data': 'Gerador LGPD',
                                    'person': 'Gerador de Pessoa',
                                    'mock-data': 'Mock Data',
                                    'regex': 'Testador de Regex',
                                }
                                const toolLabel = toolNameMap[toolSlug] || 'Usar Ferramenta'
                                return (
                                    <Button key={toolHref} asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        <Link href={toolHref} className="flex items-center gap-2">
                                            {toolLabel}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mt-8 flex flex-wrap items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="border-t bg-muted/30">
                    <div className="container mx-auto max-w-3xl px-4 py-12">
                        <h2 className="text-2xl font-semibold mb-6">Artigos Relacionados</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/blog/${related.slug}`}
                                    className="group flex flex-col rounded-lg border bg-card p-5 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {related.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Back to Blog */}
            <section className="border-t">
                <div className="container mx-auto max-w-3xl px-4 py-10 flex justify-center">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/blog" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para o Blog
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Article Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "description": post.description,
                        "datePublished": post.date,
                        "author": {
                            "@type": "Organization",
                            "name": post.author,
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "DevThru",
                            "url": "https://www.devthru.com"
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.devthru.com/blog/${slug}`
                        }
                    })
                }}
            />
        </div>
    )
}
