'use client'

import { useEffect, useState } from 'react'

import { ApiKeyDisplay } from '@/components/settings/api-key-display'
import { GenerateKeyDialog } from '@/components/settings/generate-key-dialog'
import { UsageStats } from '@/components/settings/usage-stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Key, BarChart3, BookOpen, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateApiKey, revokeApiKey } from '@/lib/api/keys'
import { toast } from 'sonner'
import Link from 'next/link'
import { useUser } from '@/lib/hooks/use-user'

export function SettingsPage() {
    const { profile, loading: userLoading, refreshUser } = useUser()
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [plan, setPlan] = useState<string>('free')
    const [newKey, setNewKey] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        if (profile) {
            setApiKey(profile.api_key)
            setPlan(profile.subscription_tier || 'free')
        }
    }, [profile])

    const handleGenerate = async () => {
        try {
            const key = await generateApiKey()
            setNewKey(key)
            setApiKey(key)
            setDialogOpen(true)
            toast.success('Nova API key gerada com sucesso!')
            refreshUser()
        } catch (error) {
            console.error('Error generating API key:', error)
            toast.error('Erro ao gerar API key')
        }
    }

    const handleRevoke = async () => {
        try {
            await revokeApiKey()
            setApiKey(null)
            toast.success('API key revogada com sucesso')
            refreshUser()
        } catch (error) {
            console.error('Error revoking API key:', error)
            toast.error('Erro ao revogar API key')
        }
    }

    if (userLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Configurações</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Gerencie suas chaves de API e preferências da conta.
                </p>
            </div>

            <Tabs defaultValue="keys" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="keys" className="gap-2">
                        <Key className="h-4 w-4" />
                        API Keys
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Uso
                    </TabsTrigger>
                    <TabsTrigger value="docs" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Documentação
                    </TabsTrigger>
                </TabsList>

                {/* Keys Tab */}
                <TabsContent value="keys" className="space-y-6">
                    <ApiKeyDisplay
                        apiKey={apiKey}
                        plan={plan}
                        onGenerate={handleGenerate}
                        onRevoke={handleRevoke}
                    />

                    {/* Quick Start */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Start</CardTitle>
                            <CardDescription>
                                Use sua API key para fazer requisições
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                <pre>{`fetch('https://devthru.com/api/v1/generate/cpf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '${apiKey || 'YOUR_API_KEY'}'
  },
  body: JSON.stringify({
    quantity: 10,
    options: { formatted: true }
  })
})`}</pre>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Usage Tab */}
                <TabsContent value="usage">
                    <UsageStats apiKey={apiKey} />
                </TabsContent>

                {/* Docs Tab */}
                <TabsContent value="docs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documentação da API</CardTitle>
                            <CardDescription>
                                Aprenda a usar a API do DevThru
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Acesse nossa documentação completa para ver todos os endpoints disponíveis,
                                exemplos de código e guias de integração.
                            </p>
                            <Link href="/docs/api">
                                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Ver Documentação
                                </button>
                            </Link>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Generate Key Dialog */}
            <GenerateKeyDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                newKey={newKey}
            />
        </div>
    )
}
