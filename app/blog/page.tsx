import { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, blogCategories, type BlogCategory } from "@/lib/content/blog"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "Blog",
    description: "Tutoriais, guias e artigos sobre desenvolvimento, validação de documentos brasileiros, testes de software e ferramentas para desenvolvedores.",
    alternates: {
        canonical: "/blog",
    },
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="border-b bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20">
                <div className="container mx-auto max-w-5xl px-4 py-16 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6">
                        <BookOpen className="w-4 h-4" />
                        <span>Blog DevThru</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                        Tutoriais & Guias para Devs
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Artigos práticos sobre validação de documentos, testes de software, ferramentas dev e mais. Com exemplos de código prontos para usar.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="container mx-auto max-w-5xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => {
                        const cat = blogCategories[post.category as BlogCategory]
                        return (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800"
                            >
                                <div className="flex flex-col flex-1 p-6">
                                    {/* Category Badge */}
                                    <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 ${cat.color}`}>
                                        {cat.label}
                                    </span>

                                    {/* Title */}
                                    <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                                        {post.description}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readingTime} min
                                        </span>
                                    </div>
                                </div>

                                {/* Read More */}
                                <div className="px-6 py-3 border-t bg-muted/30 rounded-b-xl">
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Ler artigo
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>Nenhum artigo publicado ainda. Em breve!</p>
                    </div>
                )}
            </section>
        </div>
    )
}
