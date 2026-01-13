"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Image as ImageIcon, Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShareButtons } from "@/components/share-buttons"

export function PlaceholderGeneratorPage() {
    const [width, setWidth] = useState<number>(600)
    const [height, setHeight] = useState<number>(400)
    const [bgColor, setBgColor] = useState<string>("#cccccc")
    const [textColor, setTextColor] = useState<string>("#333333")
    const [text, setText] = useState<string>("600x400")
    const [format, setFormat] = useState<"png" | "svg" | "jpg">("png")
    const [previewUrl, setPreviewUrl] = useState<string>("")

    useEffect(() => {
        const generate = () => {
            // For SVG, we can generate a data URI locally
            if (format === "svg") {
                const svg = `
                    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="${bgColor}"/>
                        <text x="50%" y="50%" font-family="Arial" font-size="${Math.min(width, height) * 0.1}" fill="${textColor}" text-anchor="middle" dy=".3em">${text || `${width}x${height}`}</text>
                    </svg>
                `
                const blob = new Blob([svg], { type: "image/svg+xml" })
                setPreviewUrl(URL.createObjectURL(blob))
            } else {
                // For PNG/JPG, we can use a canvas
                const canvas = document.createElement("canvas")
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    ctx.fillStyle = bgColor
                    ctx.fillRect(0, 0, width, height)

                    ctx.fillStyle = textColor
                    ctx.font = `${Math.min(width, height) * 0.1}px Arial`
                    ctx.textAlign = "center"
                    ctx.textBaseline = "middle"
                    ctx.fillText(text || `${width}x${height}`, width / 2, height / 2)

                    setPreviewUrl(canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`))
                }
            }
        }
        generate()
    }, [width, height, bgColor, textColor, text, format])

    const downloadImage = () => {
        const a = document.createElement("a")
        a.href = previewUrl
        a.download = `placeholder-${width}x${height}.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-5xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <ImageIcon className="h-8 w-8" />
                            Gerador de Placeholder
                        </h1>
                        <p className="text-muted-foreground">
                            Crie imagens placeholder personalizadas para seus projetos
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configurações</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Dimensões</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label className="text-xs text-muted-foreground">Largura</Label>
                                            <Input
                                                type="number"
                                                value={width}
                                                onChange={(e) => setWidth(Number(e.target.value))}
                                                min="10"
                                                max="2000"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-muted-foreground">Altura</Label>
                                            <Input
                                                type="number"
                                                value={height}
                                                onChange={(e) => setHeight(Number(e.target.value))}
                                                min="10"
                                                max="2000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Cores</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label className="text-xs text-muted-foreground">Fundo</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="color"
                                                    value={bgColor}
                                                    onChange={(e) => setBgColor(e.target.value)}
                                                    className="w-10 p-1 h-9"
                                                />
                                                <Input
                                                    value={bgColor}
                                                    onChange={(e) => setBgColor(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-xs text-muted-foreground">Texto</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="color"
                                                    value={textColor}
                                                    onChange={(e) => setTextColor(e.target.value)}
                                                    className="w-10 p-1 h-9"
                                                />
                                                <Input
                                                    value={textColor}
                                                    onChange={(e) => setTextColor(e.target.value)}
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Texto Personalizado</Label>
                                    <Input
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder={`${width}x${height}`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Formato</Label>
                                    <Select value={format} onValueChange={(v) => setFormat(v as "png" | "svg" | "jpg")}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="png">PNG</SelectItem>
                                            <SelectItem value="jpg">JPG</SelectItem>
                                            <SelectItem value="svg">SVG</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button className="w-full" onClick={downloadImage}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Baixar Imagem
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle>Pré-visualização</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-center bg-muted/20 p-8 rounded-lg border-dashed border-2 m-6">
                                {previewUrl ? (
                                    <Image
                                        src={previewUrl}
                                        alt="Placeholder Preview"
                                        width={width}
                                        height={height}
                                        unoptimized
                                        style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-muted-foreground">
                                        <RefreshCw className="h-8 w-8 animate-spin mb-2" />
                                        <p>Gerando preview...</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Placeholder</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Placeholder cria imagens de preenchimento personalizadas para uso em design e desenvolvimento.
                                Você pode definir dimensões, cores e texto para simular imagens reais em seus layouts.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Você pode baixar a imagem gerada em formatos PNG, JPG ou SVG. O formato SVG é ideal para escalabilidade sem perda de qualidade.
                            </p>
                        </CardContent>
                        <div className="pt-4 border-t px-6 pb-6">
                            <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                            <ShareButtons
                                title="Gerador de Placeholder"
                                description="Crie imagens placeholder personalizadas para seus projetos."
                            />
                        </div>
                    </Card>
                </div>
            </main>

        </div>
    )
}
