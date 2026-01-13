import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Zap, Wrench, FileText, UserCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata = {
    title: "Atualizações - DevThru",
    description: "Acompanhe as últimas novidades, melhorias e correções do DevThru.",
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
                                                    <CardTitle className="text-lg">{update.title}</CardTitle>
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
