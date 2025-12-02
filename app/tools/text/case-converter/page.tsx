'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { convertCase } from '@/lib/utils/text'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function CaseConverterPage() {
    const [text, setText] = useState('')
    const [copiedType, setCopiedType] = useState<string | null>(null)

    const handleCopy = (content: string, type: string) => {
        navigator.clipboard.writeText(content)
        setCopiedType(type)
        toast.success('Texto copiado!')
        setTimeout(() => setCopiedType(null), 2000)
    }

    const CaseOption = ({ type, label, description }: { type: any; label: string; description: string }) => {
        const converted = convertCase(text || 'Exemplo de Texto', type)

        return (
            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">{label}</CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleCopy(converted, type)}
                            disabled={!text}
                        >
                            {copiedType === type ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    <CardDescription className="text-xs">{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-4 bg-background">
                    <div className="font-mono text-sm break-all">
                        {text ? converted : <span className="text-muted-foreground italic">O resultado aparecerá aqui...</span>}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Conversor de Case</h1>
                        <p className="text-muted-foreground">
                            Transforme seus textos para diferentes formatos de capitalização instantaneamente.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Texto Original</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Digite seu texto aqui..."
                                        className="min-h-[200px] resize-y text-lg"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <Button variant="outline" onClick={() => setText('')} disabled={!text}>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Limpar
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Resultados</h3>
                            <div className="grid gap-4">
                                <CaseOption type="upper" label="UPPERCASE" description="Todas as letras maiúsculas" />
                                <CaseOption type="lower" label="lowercase" description="Todas as letras minúsculas" />
                                <CaseOption type="title" label="Title Case" description="Primeira Letra Maiúscula" />
                                <CaseOption type="sentence" label="Sentence case" description="Apenas a primeira letra da frase" />
                                <CaseOption type="camel" label="camelCase" description="Padrão para variáveis em JS/Java" />
                                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                                    <p>
                                        O Conversor de Case é uma ferramenta essencial para desenvolvedores e redatores que precisam ajustar a capitalização de textos rapidamente.
                                        Com suporte a diversos formatos como UPPERCASE, lowercase, camelCase e snake_case, ele agiliza a formatação de variáveis, títulos e documentos.
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        <strong>Nota:</strong> O processamento é feito inteiramente no seu navegador, garantindo que seus textos permaneçam privados e seguros.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>


                    </div>
                </div>
            </main>
        </div>
    )
}

