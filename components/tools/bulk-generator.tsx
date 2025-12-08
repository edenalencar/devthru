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
}

export function BulkGenerator({ generatorFn, label, limit, isPro }: BulkGeneratorProps) {
    const [quantity, setQuantity] = useState<number>(10)
    const [results, setResults] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)

    useEffect(() => {
        if (limit > 0 && quantity > limit) {
            setQuantity(limit)
        }
    }, [limit])

    const handleGenerate = async () => {
        setError(null)
        setLoading(true)

        try {
            if (quantity > limit) {
                setError(`O limite para o seu plano é de ${limit} itens. Atualize para o plano Pro para gerar até 10.000 itens.`)
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
            setShowUpgradeDialog(true)
            return
        }
        downloadCSV(results, `bulk_${label.toLowerCase()}_${Date.now()}`)
    }

    const handleDownloadJSON = () => {
        if (!isPro) {
            setShowUpgradeDialog(true)
            return
        }
        downloadJSON(results, `bulk_${label.toLowerCase()}_${Date.now()}`)
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 items-end">
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade (Máx: {limit})</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min={1}
                        max={limit}
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) || 0
                            // Allow typing, but maybe show warning? 
                            // For now, let's just let them type but disable button if > limit
                            setQuantity(val)
                        }}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={loading || quantity > limit}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Gerar {label} em Massa
                </Button>
            </div>

            {quantity > limit && (
                <p className="text-sm text-destructive font-medium">
                    A quantidade excede o limite do seu plano ({limit}).
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
                        <DialogTitle>Exportação Bloqueada</DialogTitle>
                        <DialogDescription>
                            Faça upgrade para o plano Pro para exportar seus dados.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-center">
                        <p className="text-muted-foreground mb-4">
                            A exportação para CSV e JSON está disponível apenas nos planos Pro e Business.
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
