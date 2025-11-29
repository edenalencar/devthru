"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Image as ImageIcon, Upload, Download, RefreshCw, Loader2 } from "lucide-react"
import { toast } from "sonner"

type ImageFormat = "png" | "jpeg" | "webp"

export default function ImageConverterPage() {
    const [image, setImage] = useState<string | null>(null)
    const [format, setFormat] = useState<ImageFormat>("png")
    const [convertedImage, setConvertedImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImage(e.target?.result as string)
                setConvertedImage(null)
            }
            reader.readAsDataURL(file)
        }
    }

    const convertImage = () => {
        if (!image) return

        setLoading(true)
        const img = new Image()
        img.src = image
        img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext("2d")

            if (ctx) {
                // Fill white background for JPEG/WEBP if transparent
                if (format === "jpeg") {
                    ctx.fillStyle = "#FFFFFF"
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }

                ctx.drawImage(img, 0, 0)

                const mimeType = `image/${format}`
                const dataUrl = canvas.toDataURL(mimeType, 0.9) // 0.9 quality
                setConvertedImage(dataUrl)
                toast.success(`Convertido para ${format.toUpperCase()}!`)
            }
            setLoading(false)
        }
        img.onerror = () => {
            toast.error("Erro ao carregar imagem")
            setLoading(false)
        }
    }

    const downloadImage = () => {
        if (!convertedImage) return
        const link = document.createElement("a")
        link.href = convertedImage
        link.download = `converted-image.${format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <ImageIcon className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Conversor de Imagem</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Converta imagens entre formatos PNG, JPEG e WEBP localmente.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Upload & Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload e Configuração</CardTitle>
                                <CardDescription>
                                    Selecione a imagem e o formato de saída
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div
                                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors min-h-[200px]"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {image ? (
                                        <img src={image} alt="Preview" className="max-h-[200px] max-w-full object-contain" />
                                    ) : (
                                        <>
                                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground">Clique para selecionar uma imagem</p>
                                        </>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Formato de Saída</Label>
                                    <Select value={format} onValueChange={(v) => setFormat(v as ImageFormat)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="png">PNG</SelectItem>
                                            <SelectItem value="jpeg">JPEG</SelectItem>
                                            <SelectItem value="webp">WEBP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    onClick={convertImage}
                                    className="w-full"
                                    size="lg"
                                    disabled={!image || loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Convertendo...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Converter
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    Imagem convertida pronta para download
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
                                {convertedImage ? (
                                    <div className="space-y-4 w-full text-center">
                                        <div className="border rounded-lg p-2 bg-muted/20 inline-block">
                                            <img src={convertedImage} alt="Converted" className="max-h-[300px] max-w-full object-contain" />
                                        </div>
                                        <Button onClick={downloadImage} className="w-full" variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            Baixar Imagem ({format.toUpperCase()})
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <ImageIcon className="h-16 w-16 mb-4 opacity-20 mx-auto" />
                                        <p>A imagem convertida aparecerá aqui</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
