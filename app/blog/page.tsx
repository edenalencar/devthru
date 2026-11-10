import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, blogCategories, type BlogCategory } from "@/lib/content/blog"
import { Calendar, Clock, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Blog: Guias sobre Documentos, Dados e Ferramentas",
    description: "Artigos práticos, guias e tutoriais sobre regras e validação de documentos brasileiros, dados fiscais, testes e utilitários essenciais.",
    alternates: {
        canonical: `${siteConfig.url}/blog`,
    },
}

const ITEMS_PER_PAGE = 9
// Texto da seção "Sobre o blog", um card por categoria (mesmos selos da grade de posts)
const aboutCategories: { key: BlogCategory; text: string }[] = [
    { key: 'documentos', text: 'Como funciona o dígito verificador de CPF, CNPJ, PIS e título de eleitor, como ler um boleto ou um Pix copia e cola e a estrutura dos arquivos CNAB 240 e 400.' },
    { key: 'dev-tools', text: 'Textos sobre ferramentas de produtividade e automação: JSON, regex, expressões cron, Base64, JWT e a montagem do código de barras EAN-13.' },
    { key: 'testes-qa', text: 'Tutoriais de testes e qualidade, como gerar massa de dados para homologação sem usar informações reais de pessoas ou empresas.' },
    { key: 'automotivo', text: 'O que significa cada parte de um chassi (VIN), como é calculado o dígito do RENAVAM e as diferenças entre a placa Mercosul e o padrão antigo.' },
]

const pagerButtonClass = "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm font-medium transition-colors"

export default async function BlogPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams
    const page = typeof searchParams.page === 'string' ? Math.max(1, parseInt(searchParams.page) || 1) : 1

    const allPosts = getAllPosts()
    const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE)

    // Páginas além da última não existem: sem isso, ?page=N responde 200 vazio para qualquer N
    if (page > Math.max(1, totalPages)) notFound()

    // Calcula o slice correto dos pots
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentPosts = allPosts.slice(startIndex, endIndex)

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
                        Tutoriais & Guias Práticos
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Artigos práticos sobre validação de documentos, regras fiscais, automação de dados, testes e ferramentas essenciais.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="container mx-auto max-w-5xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post) => {
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

                {allPosts.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>Nenhum artigo publicado ainda. Em breve!</p>
                    </div>
                )}

                {/* Controles de Paginação */}
                {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-16 pt-8 border-t">
                        {page > 1 ? (
                            <Link
                                href={page - 1 === 1 ? "/blog" : `/blog?page=${page - 1}`}
                                aria-label="Página anterior"
                                className={`${pagerButtonClass} hover:bg-muted`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Anterior</span>
                            </Link>
                        ) : (
                            <span aria-disabled="true" className={`${pagerButtonClass} opacity-50`}>
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Anterior</span>
                            </span>
                        )}
                        
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Link
                                    key={i}
                                    href={i === 0 ? "/blog" : `/blog?page=${i + 1}`}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm transition-colors hover:bg-muted ${
                                        page === i + 1 
                                        ? "bg-blue-600 border-blue-600 text-white pointer-events-none hover:bg-blue-600" 
                                        : "bg-background"
                                    }`}
                                >
                                    {i + 1}
                                </Link>
                            ))}
                        </div>

                        {page < totalPages ? (
                            <Link
                                href={`/blog?page=${page + 1}`}
                                aria-label="Próxima página"
                                className={`${pagerButtonClass} hover:bg-muted`}
                            >
                                <span className="hidden sm:inline">Próxima</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <span aria-disabled="true" className={`${pagerButtonClass} opacity-50`}>
                                <span className="hidden sm:inline">Próxima</span>
                                <ChevronRight className="w-4 h-4" />
                            </span>
                        )}
                    </div>
                )}
            </section>

            {/* Sobre o blog: texto fixo para SEO (a grade acima é só de links), no mesmo padrão visual da página */}
            <section className="border-t bg-gradient-to-b from-background to-blue-50/50 dark:to-blue-950/20">
                <div className="container mx-auto max-w-5xl px-4 py-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-4">
                            <BookOpen className="w-4 h-4" />
                            <span>Sobre o blog</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                            Sobre o blog do DevThru
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            O blog explica as regras por trás das ferramentas do DevThru. Os artigos são escritos em português, com exemplos práticos, e cada um aponta para a ferramenta online relacionada, para você testar o que leu na hora.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {aboutCategories.map(({ key, text }) => (
                            <div key={key} className="flex flex-col rounded-xl border bg-card p-6 shadow-sm">
                                <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 ${blogCategories[key].color}`}>
                                    {blogCategories[key].label}
                                </span>
                                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Use a numeração no fim da lista para ver os textos mais antigos. Tem uma dúvida sobre algum cálculo ou quer sugerir um assunto? Muitos dos artigos publicados nasceram de perguntas de quem usa as ferramentas no dia a dia.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
                        >
                            Fale com a gente
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

