"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Image as ImageIcon, Upload, Download, RefreshCw } from "lucide-react"
import JSZip from "jszip"
import { CopyButton } from "@/components/copy-button"

const FAVICON_SIZES = [16, 32, 180, 192, 512]

export function FaviconGeneratorPage() {
    const [image, setImage] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const generateFavicons = useCallback(async () => {
        if (!image) return
        setIsGenerating(true)

        try {
            const zip = new JSZip()
            const img = document.createElement("img")
            img.src = image

            await new Promise((resolve) => {
                img.onload = resolve
            })

            for (const size of FAVICON_SIZES) {
                const canvas = document.createElement("canvas")
                canvas.width = size
                canvas.height = size
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    ctx.drawImage(img, 0, 0, size, size)
                    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))
                    if (blob) {
                        zip.file(`favicon-${size}x${size}.png`, blob)
                        if (size === 16) zip.file("favicon.ico", blob) // Simple rename for now, ideally use proper ICO encoder
                    }
                }
            }

            // Add manifest.json
            const manifest = {
                name: "My App",
                short_name: "App",
                icons: [
                    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
                    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
                ],
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone"
            }
            zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

            const content = await zip.generateAsync({ type: "blob" })
            const url = URL.createObjectURL(content)
            const a = document.createElement("a")
            a.href = url
            a.download = "favicons.zip"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

        } catch (error) {
            console.error("Error generating favicons:", error)
        } finally {
            setIsGenerating(false)
        }
    }, [image])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <ImageIcon className="h-8 w-8" />
                            Gerador de Favicon
                        </h1>
                        <p className="text-muted-foreground">
                            Gere favicons em diversos tamanhos a partir de uma imagem
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload de Imagem</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center gap-6 py-8">
                                <div className="flex flex-col items-center gap-4">
                                    {image ? (
                                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                                            <Image src={image} alt="Preview" fill className="object-cover" unoptimized />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
                                            <Upload className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                <Upload className="h-4 w-4" />
                                                Escolher Imagem
                                            </div>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </Label>
                                        {image && (
                                            <Button onClick={generateFavicons} disabled={isGenerating}>
                                                {isGenerating ? (
                                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Download className="h-4 w-4 mr-2" />
                                                )}
                                                Gerar & Baixar ZIP
                                            </Button>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Recomendado: Imagem quadrada, min. 512x512px (PNG, JPG)
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {image && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Pré-visualização</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-4 items-end">
                                            {FAVICON_SIZES.map((size) => (
                                                <div key={size} className="flex flex-col items-center gap-2">
                                                    <div className="border rounded-md p-1 bg-background" style={{ width: size > 64 ? 64 : size + 8, height: size > 64 ? 64 : size + 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image
                                                            src={image}
                                                            alt={`${size}x${size}`}
                                                            width={size}
                                                            height={size}
                                                            className="object-contain"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{size}x{size}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Código HTML</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Adicione ao &lt;head&gt;</Label>
                                            <div className="relative">
                                                <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                                                    {`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">`}
                                                </pre>
                                                <div className="absolute top-2 right-2">
                                                    <CopyButton text={`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="manifest" href="/site.webmanifest">`} />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Favicon</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Favicon cria ícones para seu site em todos os tamanhos necessários (16x16, 32x32, 180x180, etc.) a partir de uma única imagem.
                                Ele gera um arquivo ZIP contendo os ícones e o código HTML necessário para inclusão.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Para melhores resultados, utilize uma imagem quadrada de alta resolução (pelo menos 512x512 pixels). O gerador suporta formatos PNG, JPG e WEBP.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
