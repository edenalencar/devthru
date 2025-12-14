"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Download, FileJson, AlertCircle, Loader2, Lock } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { downloadCSV, downloadJSON } from "@/lib/utils/export"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface BulkGeneratorProps {
    generatorFn: () => string
    label: string
    limit: number
    isPro: boolean
    quantity?: number
    onQuantityChange?: (quantity: number) => void
}

export function BulkGenerator({ generatorFn, label, limit, isPro, quantity: propQuantity, onQuantityChange }: BulkGeneratorProps) {
    const [internalQuantity, setInternalQuantity] = useState<number>(5)
    const [results, setResults] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
    const [upgradeReason, setUpgradeReason] = useState<'export' | 'limit'>('limit')

    const quantity = propQuantity !== undefined ? propQuantity : internalQuantity
    const setQuantity = onQuantityChange || setInternalQuantity

    const handleGenerate = async () => {
        setError(null)
        setLoading(true)

        try {
            if (quantity > limit) {
                setUpgradeReason('limit')
                setShowUpgradeDialog(true)
                setLoading(false)
                return
            }

            if (quantity <= 0) {
                setError("A quantidade deve ser maior que 0.")
                setLoading(false)
                return
            }

            // Simulate async generation to avoid freezing UI for large numbers
            await new Promise(resolve => setTimeout(resolve, 100))

            const newResults = Array.from({ length: quantity }, () => generatorFn())
            setResults(newResults)
        } catch (err) {
            console.error("Erro na geração em massa:", err)
            setError("Ocorreu um erro ao gerar os dados.")
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadCSV = () => {
        if (!isPro) {
            setUpgradeReason('export')
            setShowUpgradeDialog(true)
            return
        }
        downloadCSV(results, `bulk_${label.toLowerCase()}_${Date.now()}`)
    }

    const handleDownloadJSON = () => {
        if (!isPro) {
            setUpgradeReason('export')
            setShowUpgradeDialog(true)
            return
        }
        downloadJSON(results, `bulk_${label.toLowerCase()}_${Date.now()}`)
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 items-end">
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade (Máx: 10.000)</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min={1}
                        max={10000}
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) || 0
                            setQuantity(val)
                        }}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Gerar {label} em Massa
                </Button>
            </div>

            {quantity > limit && (
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Gerar {quantity} itens requer plano Pro. O seu limite atual é {limit}.
                </p>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2">
                        <span>{error}</span>
                        {!isPro && (
                            <Link href="/pricing" className="font-bold underline">
                                Assinar Pro agora
                            </Link>
                        )}
                    </AlertDescription>
                </Alert>
            )}

            {results.length > 0 && (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <CopyButton text={results.join("\n")} />
                        <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
                            {!isPro ? <Lock className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
                            CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
                            {!isPro ? <Lock className="mr-2 h-4 w-4" /> : <FileJson className="mr-2 h-4 w-4" />}
                            JSON
                        </Button>
                    </div>

                    <div className="relative">
                        <Textarea
                            value={results.join("\n")}
                            readOnly
                            className="min-h-[300px] font-mono text-sm"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                            {results.length} itens gerados
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {upgradeReason === 'limit' ? 'Limite do Plano Atingido' : 'Exportação Bloqueada'}
                        </DialogTitle>
                        <DialogDescription>
                            {upgradeReason === 'limit'
                                ? `Você atingiu o limite de geração do seu plano (${limit} itens).`
                                : 'A exportação de dados é um recurso exclusivo.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-center">
                        <p className="text-muted-foreground mb-4">
                            {upgradeReason === 'limit'
                                ? 'Faça upgrade para o plano Pro para gerar até 10.000 registros de uma vez e desbloquear exportações.'
                                : 'Faça upgrade para o plano Pro para exportar seus dados em CSV e JSON e aumentar seus limites de geração.'}
                        </p>
                        <Button className="w-full" onClick={() => window.location.href = '/pricing'}>
                            Fazer Upgrade Agora
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
