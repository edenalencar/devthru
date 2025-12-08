"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ArrowRight, CalendarDays } from "lucide-react"
import { addDays, addBusinessDays, format, isWeekend, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"

// Common Brazilian Holidays (Fixed dates for simplicity, moving holidays require more logic)
const HOLIDAYS = [
    { date: "01-01", name: "Confraternização Universal" },
    { date: "04-21", name: "Tiradentes" },
    { date: "05-01", name: "Dia do Trabalho" },
    { date: "09-07", name: "Independência do Brasil" },
    { date: "10-12", name: "Nossa Senhora Aparecida" },
    { date: "11-02", name: "Finados" },
    { date: "11-15", name: "Proclamação da República" },
    { date: "12-25", name: "Natal" },
]

export default function DeadlineCalculatorPage() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [days, setDays] = useState("5")
    const [type, setType] = useState("business") // business or calendar
    const [resultDate, setResultDate] = useState<Date | null>(null)

    const isHoliday = (date: Date) => {
        const dateString = format(date, "MM-dd")
        return HOLIDAYS.some(h => h.date === dateString)
    }

    const calculateDeadline = () => {
        const start = new Date(startDate)
        // Adjust for timezone offset to keep date correct
        const userTimezoneOffset = start.getTimezoneOffset() * 60000
        const adjustedStart = new Date(start.getTime() + userTimezoneOffset)

        const daysToAdd = parseInt(days) || 0
        let current = adjustedStart
        let added = 0

        if (type === "calendar") {
            setResultDate(addDays(adjustedStart, daysToAdd))
        } else {
            // Custom business days logic to include holidays
            while (added < daysToAdd) {
                current = addDays(current, 1)
                if (!isWeekend(current) && !isHoliday(current)) {
                    added++
                }
            }
            setResultDate(current)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Calculadora de Prazo</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Calcule datas finais considerando dias úteis, feriados e fins de semana.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Input Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Calcular Data</CardTitle>
                                <CardDescription>
                                    Informe a data inicial e o prazo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Data Inicial</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="days">Prazo (dias)</Label>
                                    <Input
                                        id="days"
                                        type="number"
                                        min="0"
                                        value={days}
                                        onChange={(e) => setDays(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo de Contagem</Label>
                                    <Select value={type} onValueChange={setType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="business">Dias Úteis</SelectItem>
                                            <SelectItem value="calendar">Dias Corridos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button onClick={calculateDeadline} className="w-full" size="lg">
                                    Calcular Prazo Final
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    Data final calculada
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                                {resultDate ? (
                                    <div className="text-center space-y-4">
                                        <div className="bg-primary/10 p-4 rounded-full inline-flex mb-2">
                                            <CalendarDays className="h-10 w-10 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">O prazo vence em:</p>
                                            <h2 className="text-4xl font-bold text-primary">
                                                {format(resultDate, "dd/MM/yyyy")}
                                            </h2>
                                            <p className="text-lg font-medium mt-2 capitalize">
                                                {format(resultDate, "EEEE", { locale: ptBR })}
                                            </p>
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-4 bg-muted p-3 rounded-md">
                                            Considerando {days} {type === 'business' ? 'dias úteis' : 'dias corridos'} a partir de {format(new Date(startDate), "dd/MM/yyyy")}.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <Calendar className="h-16 w-16 mb-4 opacity-20 mx-auto" />
                                        <p>Preencha os dados para calcular</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre a Calculadora de Prazo</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                A Calculadora de Prazo permite calcular datas finais de projetos e tarefas, considerando dias úteis e feriados nacionais.
                                É ideal para gerentes de projeto, advogados e profissionais que precisam controlar prazos rigorosos.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os feriados considerados são os nacionais fixos. Feriados móveis (como Carnaval e Páscoa) ou regionais não são incluídos automaticamente.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main >


        </div >
    )
}

