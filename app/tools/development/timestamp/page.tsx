"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Pause, Play } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TimestampConverterPage() {
    const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000))
    const [isPaused, setIsPaused] = useState(false)

    // Timestamp to Date
    const [tsInput, setTsInput] = useState<string>("")
    const [tsUnit, setTsUnit] = useState<"seconds" | "milliseconds">("seconds")
    const [dateResult, setDateResult] = useState<string>("")

    // Date to Timestamp
    const [dateInput, setDateInput] = useState<string>("")
    const [tsResult, setTsResult] = useState<string>("")

    useEffect(() => {
        if (isPaused) return
        const interval = setInterval(() => {
            setCurrentTimestamp(Math.floor(Date.now() / 1000))
        }, 1000)
        return () => clearInterval(interval)
    }, [isPaused])

    useEffect(() => {
        if (!tsInput) {
            setDateResult("")
            return
        }
        try {
            const ts = Number(tsInput)
            if (isNaN(ts)) throw new Error("Invalid timestamp")
            const date = new Date(tsUnit === "seconds" ? ts * 1000 : ts)
            setDateResult(date.toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "medium" }))
        } catch {
            setDateResult("Timestamp inválido")
        }
    }, [tsInput, tsUnit])

    useEffect(() => {
        if (!dateInput) {
            setTsResult("")
            return
        }
        try {
            const date = new Date(dateInput)
            if (isNaN(date.getTime())) throw new Error("Invalid date")
            setTsResult(Math.floor(date.getTime() / 1000).toString())
        } catch {
            setTsResult("Data inválida")
        }
    }, [dateInput])

    const handleSetCurrent = () => {
        setTsInput(currentTimestamp.toString())
        setTsUnit("seconds")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <Clock className="h-8 w-8" />
                            Conversor de Timestamp
                        </h1>
                        <p className="text-muted-foreground">
                            Converta timestamps Unix para data legível e vice-versa
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <Card className="bg-muted/50">
                            <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
                                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                                    Timestamp Atual (Unix)
                                </div>
                                <div className="text-4xl font-mono font-bold text-primary">
                                    {currentTimestamp}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)}>
                                        {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                                        {isPaused ? "Retomar" : "Pausar"}
                                    </Button>
                                    <CopyButton text={currentTimestamp.toString()} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Timestamp para Data</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Timestamp</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={tsInput}
                                                onChange={(e) => setTsInput(e.target.value)}
                                                placeholder="Ex: 1678900000"
                                                className="font-mono"
                                            />
                                            <Select value={tsUnit} onValueChange={(v) => setTsUnit(v as "seconds" | "milliseconds")}>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="seconds">Sec</SelectItem>
                                                    <SelectItem value="milliseconds">Ms</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button variant="link" className="px-0 h-auto text-xs" onClick={handleSetCurrent}>
                                            Usar timestamp atual
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Data Legível</Label>
                                        <div className="p-3 bg-muted rounded-md min-h-[40px] flex items-center justify-between">
                                            <span className="text-sm">{dateResult}</span>
                                            {dateResult && <CopyButton text={dateResult} />}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Data para Timestamp</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Data e Hora</Label>
                                        <Input
                                            type="datetime-local"
                                            value={dateInput}
                                            onChange={(e) => setDateInput(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Timestamp Resultante</Label>
                                        <div className="p-3 bg-muted rounded-md min-h-[40px] flex items-center justify-between">
                                            <span className="font-mono text-sm">{tsResult}</span>
                                            {tsResult && <CopyButton text={tsResult} />}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Conversor de Timestamp</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Conversor de Timestamp facilita a transformação entre datas legíveis e timestamps Unix (segundos ou milissegundos desde 1 de janeiro de 1970).
                                Útil para depuração de logs, bancos de dados e sistemas que utilizam tempo Unix.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> A conversão utiliza o fuso horário local do seu navegador.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}

