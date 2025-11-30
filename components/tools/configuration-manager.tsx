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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Save, Trash2, Settings, Play, Loader2 } from "lucide-react"
import { saveConfiguration, getConfigurations, deleteConfiguration } from "@/lib/actions/configurations"
import { toast } from "sonner"

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

    const handleSave = async () => {
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
            } else {
                toast.error("Erro ao salvar configuração")
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handleLoad = (config: Configuration) => {
        onLoadConfig(config.configuration)
        toast.success(`Configuração "${config.name}" carregada!`)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering load
        try {
            await deleteConfiguration(id)
            toast.success("Configuração excluída")
            fetchConfigurations()
        } catch (error) {
            console.error("Error deleting configuration:", error)
            toast.error("Erro ao excluir configuração")
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Minhas Configurações
                </h3>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Save className="h-4 w-4" />
                            Salvar Atual
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Salvar Configuração</DialogTitle>
                            <DialogDescription>
                                Salve as opções atuais para usar novamente depois.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    value={configName}
                                    onChange={(e) => setConfigName(e.target.value)}
                                    placeholder="Ex: CPF com Pontuação"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar
                            </Button>
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
                    <p className="text-sm">Configure a ferramenta e clique em "Salvar Atual".</p>
                </div>
            ) : (
                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                    {configurations.map((config) => (
                        <div
                            key={config.id}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                            onClick={() => handleLoad(config)}
                        >
                            <div className="flex items-center gap-3">
                                <Play className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="font-medium">{config.name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => handleDelete(config.id, e)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
