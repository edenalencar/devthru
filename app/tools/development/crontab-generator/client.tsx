"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Terminal, Copy, RefreshCw, HelpCircle } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { ShareButtons } from "@/components/share-buttons"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { validateCron, parseCron, translateCron } from "@/lib/utils/cron-parser"
import { toast } from "sonner"

export function CrontabGeneratorPage() {
    // Inputs principais
    const [cronInput, setCronInput] = useState<string>("* * * * *")
    const [commandInput, setCommandInput] = useState<string>("")

    // Derivação de estados para evitar renderizações em cascata e lints de useEffect
    const cleanedCron = cronInput.trim()
    const isValid = validateCron(cleanedCron)
    const translationResult = isValid ? translateCron(cleanedCron) : "Expressão cron inválida"

    // Estados detalhados dos seletores
    const [minuteMode, setMinuteMode] = useState<"all" | "step" | "range" | "specific">("all")
    const [minuteStep, setMinuteStep] = useState<string>("5")
    const [minuteRangeStart, setMinuteRangeStart] = useState<string>("0")
    const [minuteRangeEnd, setMinuteRangeEnd] = useState<string>("30")
    const [minuteSpecifics, setMinuteSpecifics] = useState<number[]>([])

    const [hourMode, setHourMode] = useState<"all" | "step" | "range" | "specific">("all")
    const [hourStep, setHourStep] = useState<string>("2")
    const [hourRangeStart, setHourRangeStart] = useState<string>("9")
    const [hourRangeEnd, setHourRangeEnd] = useState<string>("17")
    const [hourSpecifics, setHourSpecifics] = useState<number[]>([])

    const [dayOfMonthMode, setDayOfMonthMode] = useState<"all" | "step" | "range" | "specific">("all")
    const [dayOfMonthStep, setDayOfMonthStep] = useState<string>("2")
    const [dayOfMonthRangeStart, setDayOfMonthRangeStart] = useState<string>("1")
    const [dayOfMonthRangeEnd, setDayOfMonthRangeEnd] = useState<string>("15")
    const [dayOfMonthSpecifics, setDayOfMonthSpecifics] = useState<number[]>([])

    const [monthMode, setMonthMode] = useState<"all" | "specific">("all")
    const [monthSpecifics, setMonthSpecifics] = useState<number[]>([])

    const [dayOfWeekMode, setDayOfWeekMode] = useState<"all" | "specific">("all")
    const [dayOfWeekSpecifics, setDayOfWeekSpecifics] = useState<number[]>([])

    // Presets rápidos
    const presets = [
        { label: "A cada minuto", value: "* * * * *" },
        { label: "A cada 5 min", value: "*/5 * * * *" },
        { label: "Toda hora", value: "0 * * * *" },
        { label: "Diariamente (00:00)", value: "0 0 * * *" },
        { label: "Domingos (00:00)", value: "0 0 * * 0" },
        { label: "Dia 1 (00:00)", value: "0 0 1 * *" },
    ]



    // Sincroniza seletores visuais para gerar o cron expression
    useEffect(() => {
        // Evita loop infinito se a mudança veio de uma decodificação direta
        const genMinute = () => {
            if (minuteMode === "all") return "*"
            if (minuteMode === "step") return `*/${minuteStep}`
            if (minuteMode === "range") return `${minuteRangeStart}-${minuteRangeEnd}`
            if (minuteMode === "specific") {
                if (minuteSpecifics.length === 0) return "*"
                return [...minuteSpecifics].sort((a, b) => a - b).join(",")
            }
            return "*"
        }

        const genHour = () => {
            if (hourMode === "all") return "*"
            if (hourMode === "step") return `*/${hourStep}`
            if (hourMode === "range") return `${hourRangeStart}-${hourRangeEnd}`
            if (hourMode === "specific") {
                if (hourSpecifics.length === 0) return "*"
                return [...hourSpecifics].sort((a, b) => a - b).join(",")
            }
            return "*"
        }

        const genDom = () => {
            if (dayOfMonthMode === "all") return "*"
            if (dayOfMonthMode === "step") return `*/${dayOfMonthStep}`
            if (dayOfMonthMode === "range") return `${dayOfMonthRangeStart}-${dayOfMonthRangeEnd}`
            if (dayOfMonthMode === "specific") {
                if (dayOfMonthSpecifics.length === 0) return "*"
                return [...dayOfMonthSpecifics].sort((a, b) => a - b).join(",")
            }
            return "*"
        }

        const genMonth = () => {
            if (monthMode === "all") return "*"
            if (monthMode === "specific") {
                if (monthSpecifics.length === 0) return "*"
                return [...monthSpecifics].sort((a, b) => a - b).join(",")
            }
            return "*"
        }

        const genDow = () => {
            if (dayOfWeekMode === "all") return "*"
            if (dayOfWeekMode === "specific") {
                if (dayOfWeekSpecifics.length === 0) return "*"
                return [...dayOfWeekSpecifics].sort((a, b) => a - b).join(",")
            }
            return "*"
        }

        const newCron = `${genMinute()} ${genHour()} ${genDom()} ${genMonth()} ${genDow()}`
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCronInput(newCron)
    }, [
        minuteMode, minuteStep, minuteRangeStart, minuteRangeEnd, minuteSpecifics,
        hourMode, hourStep, hourRangeStart, hourRangeEnd, hourSpecifics,
        dayOfMonthMode, dayOfMonthStep, dayOfMonthRangeStart, dayOfMonthRangeEnd, dayOfMonthSpecifics,
        monthMode, monthSpecifics,
        dayOfWeekMode, dayOfWeekSpecifics
    ])

    // Decodifica expressão colada pelo usuário (Modo Bidirecional)
    const handleDecode = (value: string) => {
        setCronInput(value)
        if (!validateCron(value)) {
            toast.error("Expressão Cron inválida para decodificação")
            return
        }

        const { minute, hour, dayOfMonth, month, dayOfWeek } = parseCron(value)

        // Auxiliar para decodificar um campo
        const decodeField = (
            field: string,
            setMode: (m: "all" | "step" | "range" | "specific") => void,
            setStep: (s: string) => void,
            setRangeStart: (s: string) => void,
            setRangeEnd: (e: string) => void,
            setSpecifics: (arr: number[]) => void
        ) => {
            if (field === "*") {
                setMode("all")
            } else if (field.startsWith("*/")) {
                setMode("step")
                setStep(field.substring(2))
            } else if (field.includes("-") && !field.includes(",")) {
                setMode("range")
                const [start, end] = field.split("-")
                setRangeStart(start)
                setRangeEnd(end)
            } else {
                setMode("specific")
                const nums = field.split(",").map(Number).filter(n => !isNaN(n))
                setSpecifics(nums)
            }
        }

        decodeField(minute, setMinuteMode, setMinuteStep, setMinuteRangeStart, setMinuteRangeEnd, setMinuteSpecifics)
        decodeField(hour, setHourMode, setHourStep, setHourRangeStart, setHourRangeEnd, setHourSpecifics)
        decodeField(dayOfMonth, setDayOfMonthMode, setDayOfMonthStep, setDayOfMonthRangeStart, setDayOfMonthRangeEnd, setDayOfMonthSpecifics)

        // Mês (apenas todos ou específicos)
        if (month === "*") {
            setMonthMode("all")
            setMonthSpecifics([])
        } else {
            setMonthMode("specific")
            setMonthSpecifics(month.split(",").map(Number).filter(n => !isNaN(n)))
        }

        // Dia da semana (apenas todos ou específicos)
        if (dayOfWeek === "*") {
            setDayOfWeekMode("all")
            setDayOfWeekSpecifics([])
        } else {
            setDayOfWeekMode("specific")
            setDayOfWeekSpecifics(dayOfWeek.split(",").map(Number).filter(n => !isNaN(n)))
        }

        toast.success("Expressão Cron decodificada com sucesso!")
    }

    const handleToggleSpecific = (val: number, arr: number[], setArr: (a: number[]) => void) => {
        if (arr.includes(val)) {
            setArr(arr.filter(x => x !== val))
        } else {
            setArr([...arr, val])
        }
    }

    // Monta o comando final
    const fullCommand = commandInput.trim() 
        ? `${cronInput} ${commandInput.trim()}` 
        : cronInput

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullCommand)
        toast.success("Comando copiado para a área de transferência!")
    }

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-4xl px-4">
                    <Breadcrumbs 
                        items={[{ "label": "Ferramentas" }, { "label": "Dev Tools" }, { "label": "Gerador de Crontab" }]} 
                        className="mb-6" 
                    />

                    {/* Titulo com Estética Brutalista */}
                    <div className="mb-8 border border-muted-foreground/20 p-6 bg-muted/20 rounded-[2px]">
                        <h1 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
                            <Clock className="h-8 w-8 text-orange-500 shrink-0" />
                            Gerador de Crontab
                        </h1>
                        <p className="text-muted-foreground text-sm font-mono uppercase tracking-wider">
                            {"// Agendamento técnico simplificado e traduzido."}
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {/* Seção 1: Entrada Cron Rápida e Presets (Estilo HUD) */}
                        <Card className="border border-muted-foreground/20 rounded-[2px] shadow-none bg-muted/10">
                            <CardHeader className="border-b border-muted-foreground/10 pb-4">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <Terminal className="h-5 w-5 text-orange-500" />
                                    Importar Expressão ou Usar Presets
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-mono uppercase text-muted-foreground">Expressão Cron Atual</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={cronInput}
                                            onChange={(e) => setCronInput(e.target.value)}
                                            placeholder="Ex: */5 * * * *"
                                            className="font-mono text-lg border-muted-foreground/30 focus-visible:ring-orange-500 rounded-[2px]"
                                        />
                                        <Button 
                                            onClick={() => handleDecode(cronInput)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-[2px]"
                                        >
                                            Decodificar
                                        </Button>
                                    </div>
                                    {!isValid && (
                                        <p className="text-red-500 text-xs font-mono">{"// Expressão cron inválida. Verifique os 5 campos."}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-mono uppercase text-muted-foreground">Modelos de Recorrência Rápidos</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                                        {presets.map((preset, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDecode(preset.value)}
                                                className="border-muted-foreground/20 hover:border-orange-500/50 hover:bg-orange-500/10 font-mono text-[11px] h-9 p-1 rounded-[2px] truncate block text-center"
                                            >
                                                {preset.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seção 2: Configuração Detalhada (Tabs) */}
                        <Card className="border border-muted-foreground/20 rounded-[2px] shadow-none">
                            <CardHeader className="border-b border-muted-foreground/10 pb-2 bg-muted/5">
                                <CardTitle className="text-base font-bold uppercase tracking-wider text-muted-foreground font-mono">
                                    Configurador de Campos
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Tabs defaultValue="minute" className="w-full">
                                    <TabsList className="w-full grid grid-cols-5 bg-muted/40 rounded-none border-b border-muted-foreground/10 h-11 p-0">
                                        <TabsTrigger value="minute" className="rounded-none border-r border-muted-foreground/10 data-[state=active]:bg-background data-[state=active]:text-orange-500 font-mono text-xs">Minutos</TabsTrigger>
                                        <TabsTrigger value="hour" className="rounded-none border-r border-muted-foreground/10 data-[state=active]:bg-background data-[state=active]:text-orange-500 font-mono text-xs">Horas</TabsTrigger>
                                        <TabsTrigger value="dom" className="rounded-none border-r border-muted-foreground/10 data-[state=active]:bg-background data-[state=active]:text-orange-500 font-mono text-xs">Dia do Mês</TabsTrigger>
                                        <TabsTrigger value="month" className="rounded-none border-r border-muted-foreground/10 data-[state=active]:bg-background data-[state=active]:text-orange-500 font-mono text-xs">Meses</TabsTrigger>
                                        <TabsTrigger value="dow" className="rounded-none data-[state=active]:bg-background data-[state=active]:text-orange-500 font-mono text-xs">Dia da Semana</TabsTrigger>
                                    </TabsList>

                                    {/* MINUTOS */}
                                    <TabsContent value="minute" className="p-6 focus-visible:ring-0 mt-0">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-4 border-b border-muted-foreground/5 pb-4">
                                                <Button size="sm" variant={minuteMode === "all" ? "default" : "outline"} onClick={() => setMinuteMode("all")} className={`rounded-[2px] ${minuteMode === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Todos (*)</Button>
                                                <Button size="sm" variant={minuteMode === "step" ? "default" : "outline"} onClick={() => setMinuteMode("step")} className={`rounded-[2px] ${minuteMode === "step" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>A cada X minutos (*/X)</Button>
                                                <Button size="sm" variant={minuteMode === "range" ? "default" : "outline"} onClick={() => setMinuteMode("range")} className={`rounded-[2px] ${minuteMode === "range" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Intervalo (A-B)</Button>
                                                <Button size="sm" variant={minuteMode === "specific" ? "default" : "outline"} onClick={() => setMinuteMode("specific")} className={`rounded-[2px] ${minuteMode === "specific" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Específicos (lista)</Button>
                                            </div>

                                            {minuteMode === "step" && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">A cada</span>
                                                    <Input type="number" min="1" max="59" value={minuteStep} onChange={(e) => setMinuteStep(e.target.value)} className="w-20 rounded-[2px]" />
                                                    <span className="text-sm">minuto(s)</span>
                                                </div>
                                            )}

                                            {minuteMode === "range" && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">Do minuto</span>
                                                    <Input type="number" min="0" max="59" value={minuteRangeStart} onChange={(e) => setMinuteRangeStart(e.target.value)} className="w-20 rounded-[2px]" />
                                                    <span className="text-sm">ao minuto</span>
                                                    <Input type="number" min="0" max="59" value={minuteRangeEnd} onChange={(e) => setMinuteRangeEnd(e.target.value)} className="w-20 rounded-[2px]" />
                                                </div>
                                            )}

                                            {minuteMode === "specific" && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <Label className="text-xs text-muted-foreground font-mono">Selecione um ou mais minutos:</Label>
                                                        <Button variant="link" size="sm" className="h-auto p-0 font-mono text-xs text-orange-500 hover:text-orange-600" onClick={() => setMinuteSpecifics([])}>Limpar tudo</Button>
                                                    </div>
                                                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 p-3 border border-muted-foreground/10 bg-muted/5 rounded-[2px]">
                                                        {Array.from({ length: 60 }).map((_, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleToggleSpecific(i, minuteSpecifics, setMinuteSpecifics)}
                                                                className={`h-8 font-mono text-xs border rounded-[2px] transition-colors ${minuteSpecifics.includes(i) ? "bg-orange-500 border-orange-500 text-white font-bold" : "bg-background border-muted-foreground/20 hover:border-orange-500/50"}`}
                                                            >
                                                                {i.toString().padStart(2, "0")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {minuteMode === "all" && (
                                                <p className="text-sm text-muted-foreground italic font-mono">{"// Executa em todos os minutos de forma contínua."}</p>
                                            )}
                                        </div>
                                    </TabsContent>

                                    {/* HORAS */}
                                    <TabsContent value="hour" className="p-6 focus-visible:ring-0 mt-0">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-4 border-b border-muted-foreground/5 pb-4">
                                                <Button size="sm" variant={hourMode === "all" ? "default" : "outline"} onClick={() => setHourMode("all")} className={`rounded-[2px] ${hourMode === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Todos (*)</Button>
                                                <Button size="sm" variant={hourMode === "step" ? "default" : "outline"} onClick={() => setHourMode("step")} className={`rounded-[2px] ${hourMode === "step" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>A cada X horas (*/X)</Button>
                                                <Button size="sm" variant={hourMode === "range" ? "default" : "outline"} onClick={() => setHourMode("range")} className={`rounded-[2px] ${hourMode === "range" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Intervalo (A-B)</Button>
                                                <Button size="sm" variant={hourMode === "specific" ? "default" : "outline"} onClick={() => setHourMode("specific")} className={`rounded-[2px] ${hourMode === "specific" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Específicas (lista)</Button>
                                            </div>

                                            {hourMode === "step" && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">A cada</span>
                                                    <Input type="number" min="1" max="23" value={hourStep} onChange={(e) => setHourStep(e.target.value)} className="w-20 rounded-[2px]" />
                                                    <span className="text-sm">hora(s)</span>
                                                </div>
                                            )}

                                            {hourMode === "range" && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">Da hora</span>
                                                    <Input type="number" min="0" max="23" value={hourRangeStart} onChange={(e) => setHourRangeStart(e.target.value)} className="w-20 rounded-[2px]" />
                                                    <span className="text-sm">à hora</span>
                                                    <Input type="number" min="0" max="23" value={hourRangeEnd} onChange={(e) => setHourRangeEnd(e.target.value)} className="w-20 rounded-[2px]" />
                                                </div>
                                            )}

                                            {hourMode === "specific" && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <Label className="text-xs text-muted-foreground font-mono">Selecione uma ou mais horas:</Label>
                                                        <Button variant="link" size="sm" className="h-auto p-0 font-mono text-xs text-orange-500 hover:text-orange-600" onClick={() => setHourSpecifics([])}>Limpar tudo</Button>
                                                    </div>
                                                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-3 border border-muted-foreground/10 bg-muted/5 rounded-[2px]">
                                                        {Array.from({ length: 24 }).map((_, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleToggleSpecific(i, hourSpecifics, setHourSpecifics)}
                                                                className={`h-8 font-mono text-xs border rounded-[2px] transition-colors ${hourSpecifics.includes(i) ? "bg-orange-500 border-orange-500 text-white font-bold" : "bg-background border-muted-foreground/20 hover:border-orange-500/50"}`}
                                                            >
                                                                {i.toString().padStart(2, "0")}:00
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {hourMode === "all" && (
                                                <p className="text-sm text-muted-foreground italic font-mono">{"// Executa em todas as horas de forma contínua."}</p>
                                            )}
                                        </div>
                                    </TabsContent>

                                    {/* DIA DO MÊS */}
                                    <TabsContent value="dom" className="p-6 focus-visible:ring-0 mt-0">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-4 border-b border-muted-foreground/5 pb-4">
                                                <Button size="sm" variant={dayOfMonthMode === "all" ? "default" : "outline"} onClick={() => setDayOfMonthMode("all")} className={`rounded-[2px] ${dayOfMonthMode === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Todos (*)</Button>
                                                <Button size="sm" variant={dayOfMonthMode === "step" ? "default" : "outline"} onClick={() => setDayOfMonthMode("step")} className={`rounded-[2px] ${dayOfMonthMode === "step" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>A cada X dias (*/X)</Button>
                                                <Button size="sm" variant={dayOfMonthMode === "range" ? "default" : "outline"} onClick={() => setDayOfMonthMode("range")} className={`rounded-[2px] ${dayOfMonthMode === "range" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Intervalo (A-B)</Button>
                                                <Button size="sm" variant={dayOfMonthMode === "specific" ? "default" : "outline"} onClick={() => setDayOfMonthMode("specific")} className={`rounded-[2px] ${dayOfMonthMode === "specific" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Específicos (lista)</Button>
                                            </div>

                                            {dayOfMonthMode === "step" && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">A cada</span>
                                                    <Input type="number" min="1" max="31" value={dayOfMonthStep} onChange={(e) => setDayOfMonthStep(e.target.value)} className="w-20 rounded-[2px]" />
                                                    <span className="text-sm">dia(s)</span>
                                                </div>
                                            )}

                                            {dayOfMonthMode === "range" && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">Do dia</span>
                                                    <Input type="number" min="1" max="31" value={dayOfMonthRangeStart} onChange={(e) => setDayOfMonthRangeStart(e.target.value)} className="w-20 rounded-[2px]" />
                                                    <span className="text-sm">ao dia</span>
                                                    <Input type="number" min="1" max="31" value={dayOfMonthRangeEnd} onChange={(e) => setDayOfMonthRangeEnd(e.target.value)} className="w-20 rounded-[2px]" />
                                                </div>
                                            )}

                                            {dayOfMonthMode === "specific" && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <Label className="text-xs text-muted-foreground font-mono">Selecione os dias do mês:</Label>
                                                        <Button variant="link" size="sm" className="h-auto p-0 font-mono text-xs text-orange-500 hover:text-orange-600" onClick={() => setDayOfMonthSpecifics([])}>Limpar tudo</Button>
                                                    </div>
                                                    <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 p-3 border border-muted-foreground/10 bg-muted/5 rounded-[2px]">
                                                        {Array.from({ length: 31 }).map((_, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleToggleSpecific(i + 1, dayOfMonthSpecifics, setDayOfMonthSpecifics)}
                                                                className={`h-8 font-mono text-xs border rounded-[2px] transition-colors ${dayOfMonthSpecifics.includes(i + 1) ? "bg-orange-500 border-orange-500 text-white font-bold" : "bg-background border-muted-foreground/20 hover:border-orange-500/50"}`}
                                                            >
                                                                {(i + 1).toString().padStart(2, "0")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {dayOfMonthMode === "all" && (
                                                <p className="text-sm text-muted-foreground italic font-mono">{"// Executa todos os dias do mês."}</p>
                                            )}
                                        </div>
                                    </TabsContent>

                                    {/* MESES */}
                                    <TabsContent value="month" className="p-6 focus-visible:ring-0 mt-0">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-4 border-b border-muted-foreground/5 pb-4">
                                                <Button size="sm" variant={monthMode === "all" ? "default" : "outline"} onClick={() => setMonthMode("all")} className={`rounded-[2px] ${monthMode === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Todos (*)</Button>
                                                <Button size="sm" variant={monthMode === "specific" ? "default" : "outline"} onClick={() => setMonthMode("specific")} className={`rounded-[2px] ${monthMode === "specific" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Meses específicos</Button>
                                            </div>

                                            {monthMode === "specific" && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <Label className="text-xs text-muted-foreground font-mono">Selecione os meses:</Label>
                                                        <Button variant="link" size="sm" className="h-auto p-0 font-mono text-xs text-orange-500 hover:text-orange-600" onClick={() => setMonthSpecifics([])}>Limpar tudo</Button>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 border border-muted-foreground/10 bg-muted/5 rounded-[2px]">
                                                        {[
                                                            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                                                            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                                                        ].map((m, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleToggleSpecific(i + 1, monthSpecifics, setMonthSpecifics)}
                                                                className={`h-9 font-mono text-xs border rounded-[2px] transition-colors ${monthSpecifics.includes(i + 1) ? "bg-orange-500 border-orange-500 text-white font-bold" : "bg-background border-muted-foreground/20 hover:border-orange-500/50"}`}
                                                            >
                                                                {m}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {monthMode === "all" && (
                                                <p className="text-sm text-muted-foreground italic font-mono">{"// Executa em todos os meses do ano."}</p>
                                            )}
                                        </div>
                                    </TabsContent>

                                    {/* DIA DA SEMANA */}
                                    <TabsContent value="dow" className="p-6 focus-visible:ring-0 mt-0">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-4 border-b border-muted-foreground/5 pb-4">
                                                <Button size="sm" variant={dayOfWeekMode === "all" ? "default" : "outline"} onClick={() => setDayOfWeekMode("all")} className={`rounded-[2px] ${dayOfWeekMode === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Todos (*)</Button>
                                                <Button size="sm" variant={dayOfWeekMode === "specific" ? "default" : "outline"} onClick={() => setDayOfWeekMode("specific")} className={`rounded-[2px] ${dayOfWeekMode === "specific" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}>Dias específicos</Button>
                                            </div>

                                            {dayOfWeekMode === "specific" && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <Label className="text-xs text-muted-foreground font-mono">Selecione os dias da semana:</Label>
                                                        <Button variant="link" size="sm" className="h-auto p-0 font-mono text-xs text-orange-500 hover:text-orange-600" onClick={() => setDayOfWeekSpecifics([])}>Limpar tudo</Button>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 p-3 border border-muted-foreground/10 bg-muted/5 rounded-[2px]">
                                                        {[
                                                            { label: "Domingo", val: 0 },
                                                            { label: "Segunda", val: 1 },
                                                            { label: "Terça", val: 2 },
                                                            { label: "Quarta", val: 3 },
                                                            { label: "Quinta", val: 4 },
                                                            { label: "Sexta", val: 5 },
                                                            { label: "Sábado", val: 6 },
                                                        ].map((d, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleToggleSpecific(d.val, dayOfWeekSpecifics, setDayOfWeekSpecifics)}
                                                                className={`h-9 font-mono text-xs border rounded-[2px] transition-colors ${dayOfWeekSpecifics.includes(d.val) ? "bg-orange-500 border-orange-500 text-white font-bold" : "bg-background border-muted-foreground/20 hover:border-orange-500/50"}`}
                                                            >
                                                                {d.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {dayOfWeekMode === "all" && (
                                                <p className="text-sm text-muted-foreground italic font-mono">{"// Executa em todos os dias da semana."}</p>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Seção 3: Comando a Executar */}
                        <Card className="border border-muted-foreground/20 rounded-[2px] shadow-none">
                            <CardHeader className="border-b border-muted-foreground/10 pb-4">
                                <CardTitle className="text-base font-bold uppercase tracking-wider text-muted-foreground font-mono">
                                    Comando a ser Executado (Opcional)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-mono uppercase text-muted-foreground">Linha de Comando</Label>
                                    <Input
                                        value={commandInput}
                                        onChange={(e) => setCommandInput(e.target.value)}
                                        placeholder="Ex: curl https://meusite.com/cron-job.php ou php /var/www/artisan schedule:run"
                                        className="font-mono border-muted-foreground/30 focus-visible:ring-orange-500 rounded-[2px]"
                                    />
                                    <p className="text-xs text-muted-foreground font-mono">{"// Insira o script ou comando HTTP para gerar a linha completa do crontab."}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seção 4: Output Terminal (O Grande WOW) */}
                        <Card className="border border-orange-500 bg-zinc-950 text-zinc-100 rounded-[2px] shadow-none relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl pointer-events-none" />
                            <CardHeader className="border-b border-orange-500/20 pb-3 bg-zinc-900/50 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-orange-500 font-mono flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                                    Terminal Output // Linha de Comando Gerada
                                </CardTitle>
                                <span className="text-[10px] text-zinc-500 font-mono">DEVTHRU-CRONTAB v1.0</span>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-[2px] font-mono relative group">
                                    <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 select-none">$ crontab -e</div>
                                    <div className="text-lg md:text-xl font-bold break-all text-white pr-10 selection:bg-orange-500/30 selection:text-white">
                                        {fullCommand}
                                    </div>
                                    <div className="absolute right-3 bottom-3 md:top-1/2 md:-translate-y-1/2 md:bottom-auto">
                                        <CopyButton 
                                            text={fullCommand} 
                                            className="bg-zinc-800 hover:bg-orange-500 hover:text-white text-zinc-300 border-none h-8 w-8 rounded-[2px]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 border-t border-zinc-800/60 pt-4">
                                    <div className="text-xs font-mono uppercase text-orange-500 tracking-wider flex items-center gap-1.5">
                                        <HelpCircle className="h-4 w-4" />
                                        Tradução da Recorrência (Português)
                                    </div>
                                    <div className="text-sm text-zinc-300 bg-zinc-900/40 p-4 border border-zinc-800/40 rounded-[2px] leading-relaxed font-sans font-medium">
                                        {translationResult}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    <Button 
                                        onClick={copyToClipboard}
                                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-[2px] font-mono text-xs flex items-center gap-2 h-9"
                                    >
                                        <Copy className="h-4 w-4" />
                                        COPIAR COMANDO COMPLETO
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        onClick={() => handleDecode("* * * * *")}
                                        className="border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 rounded-[2px] font-mono text-xs flex items-center gap-2 h-9"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        RESETAR CAMPOS
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Seção 5: Info e SEO On-Page */}
                    <Card className="mt-8 border border-muted-foreground/20 rounded-[2px] shadow-none bg-muted/5">
                        <CardHeader className="border-b border-muted-foreground/10 pb-4">
                            <CardTitle className="text-lg font-bold">O que é um Crontab e como funciona?</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert pt-6 space-y-4 text-sm text-muted-foreground">
                            <p>
                                O **Crontab** (cron table) é um utilitário do sistema operacional Unix/Linux usado para agendar a execução periódica de tarefas (conhecidas como *cron jobs*).
                                Ele permite que desenvolvedores e administradores de sistemas automatizem scripts de backup, atualizações de banco de dados, disparos de emails e muito mais.
                            </p>
                            <p>
                                A expressão de agendamento é composta por **5 campos obrigatórios** na seguinte ordem:
                            </p>
                            <div className="bg-muted p-4 rounded-[2px] border border-muted-foreground/10 overflow-x-auto">
                                <pre className="font-mono text-xs text-foreground m-0 leading-relaxed">
{`┌─────────────── minuto (0 - 59)
│ ┌───────────── hora (0 - 23)
│ │ ┌─────────── dia do mês (1 - 31)
│ │ │ ┌───────── mês (1 - 12)
│ │ │ │ ┌─────── dia da semana (0 - 6) (0 = domingo)
│ │ │ │ │
* * * * * [comando a ser executado]`}
                                </pre>
                            </div>
                            <h3 className="text-base font-bold text-foreground mt-4">Principais Caracteres Especiais:</h3>
                            <ul className="list-disc pl-5 space-y-2 font-mono text-xs">
                                <li><strong>*</strong> : Qualquer valor (representa a execução em todas as ocorrências do campo).</li>
                                <li><strong>,</strong> : Separador de valores específicos (ex: <code className="bg-muted px-1 py-0.5 rounded text-foreground">1,15</code> no dia do mês executa nos dias 1 e 15).</li>
                                <li><strong>-</strong> : Define um intervalo (ex: <code className="bg-muted px-1 py-0.5 rounded text-foreground">9-17</code> no campo de horas executa a cada hora entre 9h e 17h).</li>
                                <li><strong>/</strong> : Incrementos ou passos (ex: <code className="bg-muted px-1 py-0.5 rounded text-foreground">*/5</code> no minuto executa a cada 5 minutos).</li>
                            </ul>
                        </CardContent>
                        <div className="pt-4 border-t border-muted-foreground/10 px-6 pb-6 bg-muted/10">
                            <Label className="text-sm text-muted-foreground mb-2 block font-mono">{"// Compartilhe esta ferramenta:"}</Label>
                            <ShareButtons
                                title="Gerador de Crontab Online - DevThru"
                                description="Crie, valide e decodifique expressões cron e agendamentos Linux de forma visual e intuitiva."
                            />
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}
