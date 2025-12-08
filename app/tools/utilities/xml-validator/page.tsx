"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileCode, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

export default function XMLValidatorPage() {
    const [xml, setXml] = useState("")
    const [result, setResult] = useState<{ isValid: boolean, message: string } | null>(null)

    const validateXML = () => {
        if (!xml.trim()) {
            setResult(null)
            return
        }

        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(xml, "application/xml")
            const errorNode = doc.querySelector("parsererror")

            if (errorNode) {
                setResult({
                    isValid: false,
                    message: errorNode.textContent || "Erro de sintaxe XML desconhecido"
                })
            } else {
                setResult({
                    isValid: true,
                    message: "XML Válido!"
                })
            }
        } catch (error) {
            setResult({
                isValid: false,
                message: "Erro ao processar XML"
            })
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
                            <FileCode className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Validador de XML</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Verifique a sintaxe de seus arquivos XML.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Input Card */}
                        <Card className="h-full flex flex-col">
                            <CardHeader>
                                <CardTitle>Código XML</CardTitle>
                                <CardDescription>
                                    Cole seu XML aqui
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-4">
                                <Textarea
                                    value={xml}
                                    onChange={(e) => setXml(e.target.value)}
                                    placeholder="<root><element>Conteúdo</element></root>"
                                    className="flex-1 min-h-[400px] font-mono text-sm"
                                />
                                <Button onClick={validateXML} className="w-full" size="lg">
                                    Validar XML
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result Card */}
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    Análise da sintaxe
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {result ? (
                                    <div className={`rounded-lg border p-6 flex items-start gap-4 ${result.isValid
                                        ? "bg-green-50 border-green-200 dark:bg-green-950/20"
                                        : "bg-red-50 border-red-200 dark:bg-red-950/20"
                                        }`}>
                                        {result.isValid ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                        ) : (
                                            <XCircle className="h-6 w-6 text-red-600 shrink-0" />
                                        )}

                                        <div className="overflow-hidden">
                                            <h3 className={`font-bold text-lg ${result.isValid ? "text-green-700" : "text-red-700"
                                                }`}>
                                                {result.isValid ? "Válido" : "Inválido"}
                                            </h3>
                                            <p className="text-muted-foreground mt-1 break-words font-mono text-sm">
                                                {result.message}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                        <FileCode className="h-16 w-16 mb-4 opacity-20" />
                                        <p>Aguardando validação...</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Validador de XML</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Validador de XML verifica a sintaxe de arquivos XML (eXtensible Markup Language) para garantir que estejam bem formados.
                                Ele identifica erros de estruturação, tags não fechadas e outros problemas comuns que impedem o processamento correto do arquivo.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Esta ferramenta valida apenas a sintaxe (well-formedness) e não a conformidade com um Schema XSD ou DTD específico.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main >


        </div >
    )
}

