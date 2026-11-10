import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Zap, Wrench, FileText } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Atualizações e Changelog",
    description: "Acompanhe as últimas novidades, melhorias e correções do DevThru.",
    alternates: {
        canonical: `${siteConfig.url}/updates`,
    },
    openGraph: {
        title: "Atualizações e Changelog",
        description: "Acompanhe as últimas novidades, melhorias e correções do DevThru.",
        url: `${siteConfig.url}/updates`,
    },
}


type UpdateType = "security" | "feature" | "fix" | "content"

interface UpdateItem {
    date: string
    title: string
    description: string
    type: UpdateType
    version?: string
}

const updates: UpdateItem[] = [
    {
        date: "10 de Novembro de 2026",
        title: "Contador de Dias e Calculadora de Rescisão",
        description: "Lançamento de 2 novas ferramentas gratuitas: Contador de Dias (dias corridos e dias úteis entre duas datas, descontando fins de semana e feriados nacionais, inclusive os móveis como Sexta-feira Santa, com opção para Carnaval e Corpus Christi) e Calculadora de Rescisão Trabalhista (saldo de salário, aviso prévio proporcional, 13º, férias com 1/3 e multa do FGTS para demissão sem justa causa, pedido de demissão, acordo e justa causa). Também deixamos o site mais rápido no celular, com páginas servidas direto do cache, e corrigimos o Gerador de RG, que passa a calcular o dígito verificador.",
        type: "feature",
        version: "1.52.0"
    },
    {
        date: "04 de Novembro de 2026",
        title: "Gerador de CEP por Estado e Gerador de Nicks",
        description: "Lançamento de 2 novas ferramentas gratuitas: Gerador de CEP (CEPs válidos dentro da faixa oficial dos Correios de cada estado, com ou sem hífen e em lote, além de consulta da UF de qualquer CEP) e Gerador de Nicks (estilos gamer, fofo, sombrio e engraçado, com seu nome e letras diferentes para Free Fire, Roblox, Discord e Instagram). Também corrigimos os geradores de endereço e de pessoa, que agora geram CEPs do mesmo estado e da mesma capital do endereço.",
        type: "feature",
        version: "1.51.0"
    },
    {
        date: "04 de Novembro de 2026",
        title: "Letras Diferentes, Regra de 3, Porcentagem, Número por Extenso e Número Aleatório",
        description: "Lançamento de 5 novas ferramentas gratuitas: Letras Diferentes para copiar e colar (17 estilos Unicode como negrito, cursiva, gótica e riscado, para Instagram, nicks e WhatsApp), Calculadora de Regra de 3 (direta e inversa, com passo a passo), Calculadora de Porcentagem (X% de um valor, aumento, desconto e variação percentual), Número por Extenso (inteiros até trilhões e valores em reais com centavos) e Gerador de Número Aleatório (sorteios com ou sem repetição usando criptografia do navegador). Também reforçamos o Contador de Caracteres (limites de X, Instagram e SEO), o Gerador de Senha e o Conversor de Maiúsculas e Minúsculas, e corrigimos as cores do tema, que voltam a destacar botões, abas selecionadas e textos secundários em todo o site.",
        type: "feature",
        version: "1.50.0"
    },
    {
        date: "30 de Outubro de 2026",
        title: "JSON Diff, Gerador de Código de Barras (EAN-13), HMAC Webhooks e Novos Guias",
        description: "Lançamento de 3 novas ferramentas gratuitas de alta produtividade: JSON Diff (comparador semântico estrutural com detecção de chaves adicionadas, removidas e modificadas ignorando ordenação), Gerador e Validador de Código de Barras EAN-13 e Code 128 (com cálculo automático do dígito verificador módulo 10 e exportação SVG/PNG) e o Gerador de HMAC com Webhook Tester (com cálculo Web Crypto API em SHA-256/SHA-512 e gerador de código com timingSafeEqual). Acompanha 4 novos artigos técnicos no blog cobrindo DREX, arquitetura de webhooks, testes semânticos de APIs e padrões GS1 Brasil.",
        type: "feature",
        version: "1.49.0"
    },
    {
        date: "31 de Agosto de 2026",
        title: "Decodificador SEFAZ, Link WhatsApp, Conversor de cURL e Guia de Telefonia",
        description: "Lançamento de 3 novas ferramentas gratuitas: Decodificador de Chave de Acesso SEFAZ (com desmembramento visual de NF-e/NFC-e/CT-e/MDF-e e cálculo de Módulo 11), Gerador de Link Direto do WhatsApp (wa.me) com QR Code dinâmico e preview de balão, e Conversor de comandos cURL para Fetch, Axios, Python, Go e PHP. Inclui também o novo guia técnico de validação e formatação de telefones e DDDs brasileiros no blog.",
        type: "feature",
        version: "1.47.0"
    },
    {
        date: "22 de Julho de 2026",
        title: "Leitor de CNAB (240 / 400), Split Payment e VET Cambial",
        description: "Lançamento do Leitor e Decodificador de CNAB (com parsing de arquivos de remessa e retorno FEBRABAN), Simulador de Split Payment da Reforma Tributária (IBS + CBS) e Simulador de VET e eFX Cambial do Banco Central. Inclui também 5 novos artigos técnicos no blog.",
        type: "feature",
        version: "1.46.0"
    },
    {
        date: "16 de Julho de 2026",
        title: "DevThru Radio: Lofi & Synthwave Integrado",
        description: "Lançamento da DevThru Radio, um player de áudio flutuante e persistente para te acompanhar durante o código. Ouça streams de Lofi Focus Beats e Retro Synthwave sem interrupções ao navegar pelas páginas. Inclui controle de volume, atalhos rápidos (Alt+P para tocar/pausar, Alt+M para mutar) e um equalizador visual animado.",
        type: "feature",
        version: "1.45.0"
    },
    {
        date: "05 de Julho de 2026",
        title: "Gerador de Placa Pix de Balcão",
        description: "Lançamento do Gerador de Placa Pix de Balcão. Personalize displays de Pix para impressão física (A4) ou download (PNG/PDF) com seu logotipo, temas de cores, redes sociais e notas de rodapé.",
        type: "feature",
        version: "1.44.1"
    },
    {
        date: "05 de Julho de 2026",
        title: "Novas Ferramentas Financeiras: Pix e Boleto",
        description: "Lançamento do Decodificador Pix (com parser EMV, alteração de valor e renderização de QR Code na tela) e do Validador de Boletos (com extração de data, valor, banco emissor e suporte à regra de estouro de fator da FEBRABAN).",
        type: "feature",
        version: "1.44.0"
    },
    {
        date: "21 de Maio de 2026",
        title: "Gerador de Crontab Online",
        description: "Lançamento do gerador e tradutor de expressões cron. Configure agendamentos de forma visual, valide sintaxes e converta a recorrência em linguagem natural em português do Brasil.",
        type: "feature",
        version: "1.43.0"
    },
    {
        date: "14 de Fevereiro de 2026",
        title: "Navegação entre Ferramentas Relacionadas",
        description: "Implementação de uma nova seção 'Ferramentas Relacionadas' em todas as páginas de utilitários e documentos, facilitando a descoberta de ferramentas complementares.",
        type: "feature",
        version: "1.35.0"
    },
    {
        date: "06 de Fevereiro de 2026",
        title: "Nova Suíte de Ferramentas Fiscais",
        description: "Lançamento do hub centralizado com todas as ferramentas fiscais e empresariais. Acesse NF-e, CT-e, MDF-e, NFC-e, CNPJ, CNAE e Inscrição Estadual em um único lugar: /ferramentas-fiscais",
        type: "feature",
        version: "1.34.0"
    },
    {
        date: "13 de Janeiro de 2026",
        title: "Novos Geradores de Documentos Fiscais",
        description: "Lançamento de ferramentas para geração de chaves de acesso válidas de CT-e (Modelo 57), MDF-e (Modelo 58) e NFC-e (Modelo 65) para testes de integração.",
        type: "feature",
        version: "1.3.0"
    },
    {
        date: "07 de Dezembro de 2025",
        title: "Melhoria de Segurança Crítica",
        description: "Implementação de proteção contra vulnerabilidade 'React2Shell' (CVE-2025-55182) no Next.js, garantindo maior integridade e segurança para a aplicação.",
        type: "security",
        version: "1.2.1"
    },
    {
        date: "03 de Dezembro de 2025",
        title: "Correções no Formulário de Contato",
        description: "Resolução de bug que impedia o envio de mensagens pelo formulário de contato. Agora as mensagens são processadas e armazenadas corretamente.",
        type: "fix",
        version: "1.2.0"
    },
    {
        date: "02 de Dezembro de 2025",
        title: "Novo Plano Business & Segurança de API",
        description: "Lançamento do plano Business com recursos exclusivos. Implementação de novas regras de segurança para geração de chaves de API restritas a planos avançados.",
        type: "feature",
        version: "1.1.5"
    },
    {
        date: "30 de Novembro de 2025",
        title: "Gestão de Assinaturas no Perfil",
        description: "Nova funcionalidade permitindo que usuários gerenciem suas assinaturas diretamente na página de perfil, incluindo upgrade, downgrade e cancelamento.",
        type: "feature",
        version: "1.1.0"
    },
    {
        date: "29 de Novembro de 2025",
        title: "Novas Ferramentas Utilitárias",
        description: "Adição dos geradores de UUID v4, validadores de XML e conversores de imagem para a suíte de ferramentas.",
        type: "feature",
        version: "1.0.5"
    },
    {
        date: "27 de Novembro de 2025",
        title: "Lançamento da Página Sobre",
        description: "Publicação da nova página 'Sobre', detalhando a missão do DevThru e a equipe por trás do projeto.",
        type: "content",
        version: "1.0.2"
    }
]

function getIcon(type: UpdateType) {
    switch (type) {
        case "security":
            return <ShieldCheck className="h-5 w-5 text-green-500" />
        case "feature":
            return <Zap className="h-5 w-5 text-yellow-500" />
        case "fix":
            return <Wrench className="h-5 w-5 text-blue-500" />
        case "content":
            return <FileText className="h-5 w-5 text-purple-500" />
        default:
            return <Zap className="h-5 w-5" />
    }
}

function getBadgeVariant(type: UpdateType) {
    switch (type) {
        case "security":
            return "destructive" // or custom green if available, usually destructive implies urgent/security
        case "feature":
            return "default"
        case "fix":
            return "secondary"
        case "content":
            return "outline"
        default:
            return "default"
    }
}

function getTypeName(type: UpdateType) {
    switch (type) {
        case "security":
            return "Segurança"
        case "feature":
            return "Novidade"
        case "fix":
            return "Correção"
        case "content":
            return "Conteúdo"
        default:
            return "Atualização"
    }
}

export default function UpdatesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="container py-12 max-w-4xl mx-auto">
                    <div className="mb-8 text-center sm:text-left">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Atualizações e Changelog</h1>
                        <p className="text-muted-foreground">
                            Acompanhe a evolução do DevThru. Novas ferramentas, melhorias e correções são lançadas constantemente.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {updates.map((update, index) => (
                            <div key={index} className="relative pl-8 sm:pl-0">
                                {/* Timeline connector line for desktop */}
                                <div className="hidden sm:block absolute left-[180px] top-6 bottom-[-32px] w-px bg-border last:hidden"></div>

                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start">
                                    {/* Date Column */}
                                    <div className="sm:w-[160px] flex-shrink-0 pt-1 text-sm text-muted-foreground text-right hidden sm:block">
                                        {update.date}
                                    </div>

                                    {/* Mobile Date */}
                                    <div className="sm:hidden text-sm text-muted-foreground mb-1 -ml-8">
                                        {update.date}
                                    </div>

                                    {/* Content Card */}
                                    <Card className="flex-1 relative">
                                        {/* Timeline Dot */}
                                        <div className="hidden sm:flex absolute -left-[32px] top-5 h-6 w-6 items-center justify-center rounded-full border bg-background z-10">
                                            {getIcon(update.type)}
                                        </div>

                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-lg font-semibold leading-none tracking-tight">{update.title}</h2>
                                                    {update.version && (
                                                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                                            v{update.version}
                                                        </code>
                                                    )}
                                                </div>
                                                <Badge variant={getBadgeVariant(update.type)}>
                                                    {getTypeName(update.type)}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{update.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Separator className="my-6" />
                        <p className="text-sm text-muted-foreground">
                            Para ver o histórico completo ou contribuir, visite nosso repositório no GitHub.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
