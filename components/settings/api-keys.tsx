"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CopyButton } from "@/components/copy-button"
import { Loader2, Trash2, Key, Plus, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface ApiKey {
    id: string
    name: string
    key_prefix: string
    created_at: string
    last_used_at: string | null
}

export function ApiKeysSettings() {
    const [keys, setKeys] = useState<ApiKey[]>([])
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [newKeyName, setNewKeyName] = useState("")
    const [generatedKey, setGeneratedKey] = useState<string | null>(null)

    useEffect(() => {
        fetchKeys()
    }, [])

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/settings/api-keys")
            if (!res.ok) throw new Error("Failed to fetch keys")
            const data = await res.json()
            setKeys(data)
        } catch (error) {
            toast.error("Erro ao carregar chaves de API")
        } finally {
            setLoading(false)
        }
    }

    const handleCreateKey = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newKeyName.trim()) return

        setCreating(true)
        try {
            const res = await fetch("/api/settings/api-keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newKeyName }),
            })

            if (!res.ok) throw new Error("Failed to create key")

            const data = await res.json()
            setGeneratedKey(data.key)
            setNewKeyName("")
            fetchKeys()
            toast.success("Chave de API criada com sucesso")
        } catch (error) {
            toast.error("Erro ao criar chave de API")
        } finally {
            setCreating(false)
        }
    }

    const handleRevokeKey = async (id: string) => {
        if (!confirm("Tem certeza que deseja revogar esta chave? Esta ação não pode ser desfeita.")) return

        try {
            const res = await fetch(`/api/settings/api-keys/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) throw new Error("Failed to revoke key")

            setKeys(keys.filter((k) => k.id !== id))
            toast.success("Chave revogada com sucesso")
        } catch (error) {
            toast.error("Erro ao revogar chave")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Chaves de API</h3>
                    <p className="text-sm text-muted-foreground">
                        Gerencie as chaves de API para acessar a plataforma programaticamente.
                    </p>
                </div>
            </div>

            {generatedKey && (
                <Alert className="border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400">
                    <Key className="h-4 w-4" />
                    <AlertTitle>Nova chave criada!</AlertTitle>
                    <AlertDescription>
                        <p className="mb-2 mt-2 font-medium">
                            Copie sua chave agora. Você não poderá vê-la novamente.
                        </p>
                        <div className="flex items-center gap-2">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                {generatedKey}
                            </code>
                            <CopyButton text={generatedKey} />
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Criar nova chave</CardTitle>
                    <CardDescription>
                        Crie uma nova chave para integrar suas aplicações.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateKey} className="flex gap-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="key-name">Nome da chave</Label>
                            <Input
                                id="key-name"
                                placeholder="Ex: Integração CI/CD"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <Button type="submit" disabled={creating || !newKeyName.trim()}>
                                {creating ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Plus className="mr-2 h-4 w-4" />
                                )}
                                Criar Chave
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : keys.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                            <Key className="mb-4 h-12 w-12 opacity-20" />
                            <p>Nenhuma chave de API encontrada.</p>
                        </CardContent>
                    </Card>
                ) : (
                    keys.map((key) => (
                        <Card key={key.id}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="space-y-1">
                                    <p className="font-medium leading-none">{key.name}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                                            {key.key_prefix}
                                        </code>
                                        <span>•</span>
                                        <span>Criada em {new Date(key.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={() => handleRevokeKey(key.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
