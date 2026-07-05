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
    faqs?: { question: string; answer: string }[]
}

export type BlogCategory = 'documentos' | 'dev-tools' | 'testes-qa' | 'automotivo'

export const blogCategories: Record<BlogCategory, { label: string; color: string }> = {
    'documentos': { label: 'Documentos', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    'dev-tools': { label: 'Dev Tools', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
    'testes-qa': { label: 'Testes & QA', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
    'automotivo': { label: 'Automotivo', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
}

// Import posts
import { postComoDecodificarBoleto } from './posts/como-decodificar-boleto-bancario'
import { postComoDecodificarPix } from './posts/como-decodificar-pix-copia-e-cola'
import { postComoFuncionaAlgoritmoValidacaoPis } from './posts/como-funciona-algoritmo-validacao-pis'
import { postAlgoritmoLuhn } from './posts/algoritmo-luhn-validacao-cartao-credito'
import { postPlacasMercosulVsAntigo } from './posts/placas-mercosul-vs-padrao-antigo-validacao'
import { postMassaDadosCypressSelenium } from './posts/gerar-massa-dados-teste-cypress-selenium'
import { postRenavamChassiValidacao } from './posts/renavam-chassi-como-validar-antes-de-integrar'
import { postJwtDebuggerMockDataAgentesIa } from './posts/jwt-debugger-mock-data-pipelines-teste-agentes-ia'
import { postConstruindoServidorMcpDadosBr } from './posts/construindo-servidor-mcp-dados-teste-brasileiros'
import { postPorQueUuidV7SubstituindoV4 } from './posts/por-que-uuid-v7-esta-substituindo-uuid-v4'
import { postOtimizacaoQueriesSql } from './posts/otimizacao-queries-sql-indentacao-performance'
import { postComoTestarFluxosNfeCteMdfe } from './posts/como-testar-fluxos-nfe-cte-mdfe-homologacao'
import { postValidacaoCpf } from './posts/validacao-cpf'
import { postDadosTesteLgpd } from './posts/dados-teste-lgpd'
import { postRegexGuiaPratico } from './posts/regex-guia-pratico'
import { postValidacaoCnpj } from './posts/validacao-cnpj'
import { postChassiVinSignificado } from './posts/chassi-vin-significado'
import { postDadosFicticiosTestesApi } from './posts/dados-ficticios-testes-api'
import { postUuidGuiaCompleto } from './posts/uuid-guia-completo'
import { postJwtComoFunciona } from './posts/jwt-como-funciona'
import { postInscricaoEstadualGuia } from './posts/inscricao-estadual-guia'
import { postModelContextProtocol } from './posts/o-que-e-mcp-model-context-protocol'
import { postMcpServerTypescript } from './posts/como-criar-mcp-server-typescript'
import { postAITerminalToolsGeminiCLI } from './posts/ai-terminal-tools-gemini-cli'
import { postWebMcpModelContextProtocolViaSse } from './posts/o-que-e-webmcp-model-context-protocol-via-sse'
import { postSddSpecDrivenDevelopmentFocadoEmIa } from './posts/o-que-e-sdd-spec-driven-development-focado-em-ia'
import { postSkillsDeIaEProgressiveDisclosureEconomiaDeContexto } from './posts/skills-de-ia-e-progressive-disclosure-economia-de-contexto'

export const blogPosts: BlogPost[] = [
    postComoDecodificarBoleto,
    postComoDecodificarPix,
    postComoFuncionaAlgoritmoValidacaoPis,
    postAlgoritmoLuhn,
    postPlacasMercosulVsAntigo,
    postMassaDadosCypressSelenium,
    postRenavamChassiValidacao,
    postJwtDebuggerMockDataAgentesIa,
    postConstruindoServidorMcpDadosBr,
    postSkillsDeIaEProgressiveDisclosureEconomiaDeContexto,
    postSddSpecDrivenDevelopmentFocadoEmIa,
    postWebMcpModelContextProtocolViaSse,
    postPorQueUuidV7SubstituindoV4,
    postOtimizacaoQueriesSql,
    postComoTestarFluxosNfeCteMdfe,
    postAITerminalToolsGeminiCLI,
    postMcpServerTypescript,
    postModelContextProtocol,
    postValidacaoCpf,
    postDadosTesteLgpd,
    postRegexGuiaPratico,
    postValidacaoCnpj,
    postChassiVinSignificado,
    postDadosFicticiosTestesApi,
    postUuidGuiaCompleto,
    postJwtComoFunciona,
    postInscricaoEstadualGuia,
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
