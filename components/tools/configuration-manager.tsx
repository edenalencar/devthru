"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Trash2, Settings, Play, Loader2, Lock, Info } from "lucide-react"
import { saveConfiguration, getConfigurations, deleteConfiguration } from "@/lib/actions/configurations"
import { toast } from "sonner"
import { useUser } from "@/lib/hooks/use-user"
import { Badge } from "@/components/ui/badge"

interface Configuration {
    id: string
    name: string
    configuration: any
    created_at: string
}

interface ConfigurationManagerProps {
    toolId: string
    currentConfig: any
    onLoadConfig: (config: any) => void
}

export function ConfigurationManager({ toolId, currentConfig, onLoadConfig }: ConfigurationManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [configName, setConfigName] = useState("")
    const [configurations, setConfigurations] = useState<Configuration[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const { permissions, isPro, isInTrial, loading: userLoading } = useUser()

    const fetchConfigurations = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getConfigurations(toolId)
            setConfigurations(data)
        } catch (error) {
            console.error("Error fetching configurations:", error)
            toast.error("Erro ao carregar configurações")
        } finally {
            setIsLoading(false)
        }
    }, [toolId])

    useEffect(() => {
        fetchConfigurations()
    }, [fetchConfigurations])

    const formatConfigKey = (key: string) => {
        const keyMap: Record<string, string> = {
            formatted: "Formatação",
            quantity: "Quantidade",
            activeTab: "Modo de Geração",
            uppercase: "Maiúsculas",
            includeSymbols: "Incluir Símbolos",
            includeNumbers: "Incluir Números",
            length: "Comprimento"
        }
        return keyMap[key] || key
    }

    const formatConfigValue = (key: string, value: any) => {
        if (typeof value === 'boolean') return value ? 'Sim' : 'Não'
        if (key === 'activeTab') {
            return value === 'bulk' ? 'Em Massa' : 'Único'
        }
        return value
    }

    const handleSave = async () => {
        if (!permissions.saved_configs_access.can_create) {
            toast.error("Upgrade para Pro necessário para salvar configurações")
            return
        }

        if (!configName.trim()) {
            toast.error("Digite um nome para a configuração")
            return
        }

        setIsSaving(true)
        try {
            await saveConfiguration(toolId, configName, currentConfig)
            toast.success("Configuração salva com sucesso!")
            setIsOpen(false)
            setConfigName("")
            fetchConfigurations()
        } catch (error: any) {
            console.error("Error saving configuration:", error)
            if (error.message === "User not authenticated") {
                toast.error("Você precisa estar logado para salvar configurações")
            } else if (error.message.includes("Upgrade required")) {
                toast.error("Upgrade para Pro necessário para salvar configurações")
            } else {
                toast.error("Erro ao salvar configuração")
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handleLoad = (config: Configuration) => {
        if (!permissions.saved_configs_access.can_apply) {
            toast.error("Upgrade para Pro necessário para carregar configurações salvas")
            return
        }
        onLoadConfig(config.configuration)

        // Create a summary of what changed for the toast
        const changes = Object.entries(config.configuration)
            .map(([key, value]) => `${formatConfigKey(key)}: ${formatConfigValue(key, value)}`)
            .join(', ')

        toast.success(`Configuração carregada!`, {
            description: changes
        })
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering load
        if (!permissions.saved_configs_access.can_delete) {
            toast.error("Upgrade para Pro necessário para excluir configurações")
            return
        }

        try {
            await deleteConfiguration(id)
            toast.success("Configuração excluída")
            fetchConfigurations()
        } catch (error) {
            console.error("Error deleting configuration:", error)
            toast.error("Erro ao excluir configuração")
        }
    }

    const canSave = permissions.saved_configs_access.can_create

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Minhas Configurações
                    </h3>
                    {isInTrial && <Badge variant="secondary" className="text-xs shrink-0">Trial Ativo</Badge>}
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                            {canSave ? <Save className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                            Salvar Atual
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Salvar Configuração</DialogTitle>
                            <DialogDescription>
                                {canSave
                                    ? "Dê um nome para salvar o estado atual desta ferramenta."
                                    : "Faça upgrade para o plano Pro para salvar suas configurações."}
                            </DialogDescription>
                        </DialogHeader>

                        {canSave ? (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome da Configuração</Label>
                                    <Input
                                        id="name"
                                        value={configName}
                                        onChange={(e) => setConfigName(e.target.value)}
                                        placeholder="Ex: CPF Formatado em Massa"
                                    />
                                </div>

                                <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                        <Info className="h-4 w-4" />
                                        <span>O que será salvo:</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pl-6">
                                        {Object.entries(currentConfig).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <span className="text-xs text-muted-foreground">{formatConfigKey(key)}</span>
                                                <span className="font-medium">{formatConfigValue(key, value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="py-4 text-center">
                                <p className="text-muted-foreground mb-4">
                                    O plano Free permite apenas visualizar configurações salvas anteriormente (durante o trial).
                                </p>
                                <Button className="w-full" onClick={() => window.location.href = '/pricing'}>
                                    Fazer Upgrade Agora
                                </Button>
                            </div>
                        )}

                        <DialogFooter>
                            {canSave && (
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Salvar Configuração
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : configurations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                    <p>Nenhuma configuração salva.</p>
                    <p className="text-sm">Configure a ferramenta como desejar e clique em "Salvar Atual".</p>
                </div>
            ) : (
                <div className="h-[250px] w-full rounded-md border p-4 overflow-y-auto">
                    <div className="grid gap-2">
                        {configurations.map((config) => {
                            const isLocked = !permissions.saved_configs_access.can_apply
                            return (
                                <div
                                    key={config.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isLocked ? 'bg-muted/50 opacity-75' : 'bg-card hover:bg-accent/50 hover:border-primary/50'
                                        }`}
                                >
                                    <div
                                        className="flex items-center gap-3 flex-1 cursor-pointer"
                                        onClick={() => !isLocked && handleLoad(config)}
                                    >
                                        {isLocked ? (
                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Play className="h-4 w-4 text-primary" />
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-medium">{config.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(config.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                        onClick={(e) => handleDelete(config.id, e)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
