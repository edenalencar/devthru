'use client'

import { useState } from 'react'
import { Copy, Trash2, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface HistoryCardProps {
    id: string
    toolName: string
    timestamp: number
    input: any
    output: any
    onDelete: (id: string) => void
}

export function HistoryCard({
    id,
    toolName,
    timestamp,
    input,
    output,
    onDelete,
}: HistoryCardProps) {
    const [expanded, setExpanded] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            const textToCopy = typeof output === 'string'
                ? output
                : JSON.stringify(output, null, 2)

            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            toast.success('Copiado para área de transferência!')

            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            toast.error('Erro ao copiar')
        }
    }

    const handleDelete = () => {
        if (confirm('Deseja realmente deletar este item do histórico?')) {
            onDelete(id)
        }
    }

    const getPreview = () => {
        if (typeof output === 'string') {
            return output.length > 100 ? output.substring(0, 100) + '...' : output
        }
        if (Array.isArray(output)) {
            return `${output.length} itens gerados`
        }
        return JSON.stringify(output).substring(0, 100) + '...'
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg">{toolName}</CardTitle>
                        <CardDescription>
                            {formatDistanceToNow(new Date(timestamp), {
                                addSuffix: true,
                                locale: ptBR,
                            })}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopy}
                            title="Copiar resultado"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-green-600" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            title="Deletar"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setExpanded(!expanded)}
                            title={expanded ? 'Recolher' : 'Expandir'}
                        >
                            {expanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Preview */}
                    <div>
                        <p className="text-sm font-medium mb-1">Resultado:</p>
                        <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                            {getPreview()}
                        </p>
                    </div>

                    {/* Expanded Details */}
                    {expanded && (
                        <div className="space-y-3 pt-3 border-t">
                            {input && Object.keys(input).length > 0 && (
                                <div>
                                    <p className="text-sm font-medium mb-1">Configurações:</p>
                                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                        {JSON.stringify(input, null, 2)}
                                    </pre>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium mb-1">Resultado Completo:</p>
                                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto max-h-64 overflow-y-auto">
                                    {typeof output === 'string'
                                        ? output
                                        : JSON.stringify(output, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
