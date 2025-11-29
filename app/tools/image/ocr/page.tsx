"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Upload, FileText, Copy, Loader2 } from "lucide-react"
import Tesseract from "tesseract.js"
import { toast } from "sonner"

export default function OCRPage() {
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImage(e.target?.result as string)
                setText("") // Clear previous text
            }
            reader.readAsDataURL(file)
        }
    }

    const handleExtractText = async () => {
        if (!image) return

        setLoading(true)
        setProgress(0)

        try {
            const result = await Tesseract.recognize(
                image,
                'eng+por', // English and Portuguese
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100))
                        }
                    }
                }
            )
            setText(result.data.text)
            toast.success("Texto extraído com sucesso!")
        } catch (error) {
            console.error("OCR Error:", error)
            toast.error("Erro ao extrair texto da imagem.")
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        toast.success("Texto copiado!")
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
                            <h1 className="text-4xl font-bold">OCR - Extrair Texto de Imagem</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Converta imagens em texto editável usando reconhecimento óptico de caracteres.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Upload Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload de Imagem</CardTitle>
                                <CardDescription>
                                    Selecione uma imagem (PNG, JPG, WebP)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div
                                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors min-h-[300px]"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {image ? (
                                        <img src={image} alt="Preview" className="max-h-[300px] max-w-full object-contain" />
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

                                <Button
                                    onClick={handleExtractText}
                                    className="w-full"
                                    size="lg"
                                    disabled={!image || loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processando ({progress}%)
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="mr-2 h-4 w-4" />
                                            Extrair Texto
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle>Texto Extraído</CardTitle>
                                    <CardDescription>
                                        Resultado do reconhecimento
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copiar
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={text}
                                    readOnly
                                    className="min-h-[400px] font-mono text-sm resize-none"
                                    placeholder="O texto extraído aparecerá aqui..."
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
