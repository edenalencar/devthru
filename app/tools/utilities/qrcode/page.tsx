"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateQRCode, type QRCodeSize } from "@/lib/utils/generators/qrcode"
import { QrCode, Download } from "lucide-react"
import { toast } from "sonner"

export default function QRCodePage() {
    const [input, setInput] = useState("")
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [size, setSize] = useState<QRCodeSize>("medium")
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        if (!input.trim()) {
            toast.error("Digite um texto ou URL para gerar o QR Code")
            return
        }

        setLoading(true)
        try {
            const dataUrl = await generateQRCode(input, size)
            setQrCode(dataUrl)
            toast.success("QR Code gerado com sucesso!")
        } catch (error) {
            toast.error("Erro ao gerar QR Code")
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (!qrCode) return

        const link = document.createElement("a")
        link.href = qrCode
        link.download = "qrcode.png"
        link.click()
        toast.success("QR Code baixado!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <QrCode className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de QR Code</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere QR Codes a partir de texto, URLs ou qualquer informação.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Configurações</CardTitle>
                                <CardDescription>
                                    Personalize seu QR Code
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="input">Texto ou URL</Label>
                                    <Input
                                        id="input"
                                        placeholder="https://exemplo.com"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Tamanho</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="small"
                                                name="size"
                                                checked={size === "small"}
                                                onChange={() => setSize("small")}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor="small">Pequeno (200x200)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="medium"
                                                name="size"
                                                checked={size === "medium"}
                                                onChange={() => setSize("medium")}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor="medium">Médio (400x400)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="large"
                                                name="size"
                                                checked={size === "large"}
                                                onChange={() => setSize("large")}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor="large">Grande (600x600)</Label>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    className="w-full"
                                    size="lg"
                                    disabled={loading}
                                >
                                    {loading ? "Gerando..." : "Gerar QR Code"}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>QR Code Gerado</CardTitle>
                                <CardDescription>
                                    {qrCode ? "Escaneie com seu smartphone" : "O QR Code aparecerá aqui"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {qrCode ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-center p-8 bg-white rounded-lg">
                                            <img src={qrCode} alt="QR Code" className="max-w-full h-auto" />
                                        </div>
                                        <div className="flex justify-center">
                                            <Button onClick={handleDownload} variant="outline">
                                                <Download className="mr-2 h-4 w-4" />
                                                Baixar QR Code
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-24 text-muted-foreground">
                                        Digite um texto ou URL e clique em "Gerar QR Code"
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre QR Codes</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                QR Code (Quick Response Code) é um código de barras bidimensional que pode armazenar
                                diversos tipos de informação. Casos de uso comuns:
                            </p>
                            <ul>
                                <li>Links para websites</li>
                                <li>Informações de contato (vCard)</li>
                                <li>Credenciais Wi-Fi</li>
                                <li>Pagamentos (PIX, Bitcoin)</li>
                                <li>Autenticação de dois fatores</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>

            
        </div>
    )
}

