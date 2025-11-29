'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/copy-button'
import { Key, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface ApiKeyDisplayProps {
    apiKey: string | null
    onGenerate: () => void
    onRevoke: () => void
}

export function ApiKeyDisplay({ apiKey, onGenerate, onRevoke }: ApiKeyDisplayProps) {
    const [showKey, setShowKey] = useState(false)

    const maskedKey = apiKey ? `${apiKey.substring(0, 8)}${'*'.repeat(32)}` : null

    const handleRevoke = () => {
        if (confirm('Tem certeza que deseja revogar esta API key? Você precisará gerar uma nova.')) {
            onRevoke()
        }
    }

    if (!apiKey) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        API Key
                    </CardTitle>
                    <CardDescription>
                        Você ainda não possui uma API key. Gere uma para começar a usar a API.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={onGenerate} className="w-full gap-2">
                        <Key className="h-4 w-4" />
                        Gerar API Key
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Sua API Key
                        </CardTitle>
                        <CardDescription>
                            Use esta chave no header <code className="bg-muted px-1 rounded">x-api-key</code>
                        </CardDescription>
                    </div>
                    <Badge variant="default">Ativa</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Key Display */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                            {showKey ? apiKey : maskedKey}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowKey(!showKey)}
                            title={showKey ? 'Ocultar' : 'Mostrar'}
                        >
                            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <CopyButton text={apiKey} />
                    </div>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground bg-amber-500/10 p-3 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p>
                            Mantenha sua API key em segredo. Não compartilhe em repositórios públicos ou código client-side.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button onClick={onGenerate} variant="outline" className="flex-1">
                        Gerar Nova Key
                    </Button>
                    <Button onClick={handleRevoke} variant="destructive" className="flex-1">
                        Revogar Key
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
