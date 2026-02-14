export interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    author: string
    category: BlogCategory
    readingTime: number
    tags: string[]
    relatedTools: string[]
    content: string
}

export type BlogCategory = 'documentos' | 'dev-tools' | 'testes-qa' | 'automotivo'

export const blogCategories: Record<BlogCategory, { label: string; color: string }> = {
    'documentos': { label: 'Documentos', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    'dev-tools': { label: 'Dev Tools', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
    'testes-qa': { label: 'Testes & QA', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
    'automotivo': { label: 'Automotivo', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
}

// Import posts
import { postValidacaoCpf } from './posts/validacao-cpf'
import { postDadosTesteLgpd } from './posts/dados-teste-lgpd'
import { postRegexGuiaPratico } from './posts/regex-guia-pratico'

export const blogPosts: BlogPost[] = [
    postValidacaoCpf,
    postDadosTesteLgpd,
    postRegexGuiaPratico,
]

export function getAllPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
    return blogPosts
        .filter(post => post.category === category)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
    const current = getPostBySlug(currentSlug)
    if (!current) return []
    return blogPosts
        .filter(post => post.slug !== currentSlug && post.category === current.category)
        .slice(0, limit)
}
