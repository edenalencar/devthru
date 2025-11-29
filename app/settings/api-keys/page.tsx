'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ApiKeyDisplay } from '@/components/settings/api-key-display'
import { GenerateKeyDialog } from '@/components/settings/generate-key-dialog'
import { UsageStats } from '@/components/settings/usage-stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Key, BarChart3, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateApiKey, revokeApiKey } from '@/lib/api/keys'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ApiKeysPage() {
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [newKey, setNewKey] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadApiKey()
    }, [])

    const loadApiKey = async () => {
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error('Você precisa estar logado')
                return
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('api_key')
                .eq('id', user.id)
                .single()

            if (profile?.api_key) {
                setApiKey(profile.api_key)
            }
        } catch (error) {
            console.error('Error loading API key:', error)
            toast.error('Erro ao carregar API key')
        } finally {
            setLoading(false)
        }
    }

    const handleGenerate = async () => {
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error('Você precisa estar logado')
                return
            }

            const key = await generateApiKey(user.id)
            setNewKey(key)
            setApiKey(key)
            setDialogOpen(true)
            toast.success('Nova API key gerada com sucesso!')
        } catch (error) {
            console.error('Error generating API key:', error)
            toast.error('Erro ao gerar API key')
        }
    }

    const handleRevoke = async () => {
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error('Você precisa estar logado')
                return
            }

            await revokeApiKey(user.id)
            setApiKey(null)
            toast.success('API key revogada com sucesso')
        } catch (error) {
            console.error('Error revoking API key:', error)
            toast.error('Erro ao revogar API key')
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Carregando...</p>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Key className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">API Keys</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gerencie suas chaves de API para acessar o DevHub Tools programaticamente
                        </p>
                    </div>

                    <Tabs defaultValue="keys" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="keys" className="gap-2">
                                <Key className="h-4 w-4" />
                                Chaves
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
                                        <pre>{`fetch('https://devhubtools.com/api/v1/generate/cpf', {
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
                                        Aprenda a usar a API do DevHub Tools
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
                </div>
            </main>

            <Footer />

            {/* Generate Key Dialog */}
            <GenerateKeyDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                newKey={newKey}
            />
        </div>
    )
}
