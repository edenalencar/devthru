"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, CheckCircle2, AlertTriangle, User, Key, MapPin, Coins, Info, Copy, Check, Eye, PenTool, FileText } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { Accordion } from "@/components/ui/accordion"
import Link from "next/link"
import QRCode from "qrcode"

const PIX_PARSER_JS = `// Função para calcular o CRC16 CCITT padrão EMV do Pix
function calculateCRC16(data) {
    let crc = 0xFFFF;
    const polynomial = 0x1021;
    for (let i = 0; i < data.length; i++) {
        const b = data.charCodeAt(i);
        for (let j = 0; j < 8; j++) {
            const bit = ((b >> (7 - j)) & 1) === 1;
            const c15 = ((crc >> 15) & 1) === 1;
            crc <<= 1;
            if (c15 !== bit) crc ^= polynomial;
        }
    }
    crc &= 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Parser simples TLV
function parseEMV(payload) {
    const result = {};
    let i = 0;
    while (i < payload.length) {
        if (i + 4 > payload.length) break;
        const tag = payload.substring(i, i + 2);
        const len = parseInt(payload.substring(i + 2, i + 4), 10);
        if (isNaN(len)) break;
        const value = payload.substring(i + 4, i + 4 + len);
        result[tag] = value;
        i += 4 + len;
    }
    return result;
}`;

const PIX_PARSER_PYTHON = `# Cálculo do CRC16 do Pix em Python
def calculate_crc16(data: str) -> str:
    crc = 0xFFFF
    polynomial = 0x1021
    for char in data:
        b = ord(char)
        for j in range(8):
            bit = ((b >> (7 - j)) & 1) == 1
            c15 = ((crc >> 15) & 1) == 1
            crc <<= 1
            if c15 != bit:
                crc ^= polynomial
    crc &= 0xFFFF
    return f"{crc:04X}"

# Parser TLV
def parse_emv(payload: str) -> dict:
    result = {}
    i = 0
    while i < len(payload):
        if i + 4 > len(payload):
            break
        tag = payload[i:i+2]
        length = int(payload[i+2:i+4])
        value = payload[i+4:i+4+length]
        result[tag] = value
        i += 4 + length
    return result`;

interface PixParsedInfo {
    isValid: boolean
    errorMessage?: string
    chave?: string
    nome?: string
    cidade?: string
    valor?: string
    txid?: string
    tipo?: "estatico" | "dinamico"
    originalString: string
}

const title = "Decodificador e Gerador de Pix Copia e Cola - QR Code Online"

export function PixParserPage() {
    const [inputValue, setInputValue] = useState("")
    const [parsedInfo, setParsedInfo] = useState<PixParsedInfo | null>(null)
    const [newValue, setNewValue] = useState("")
    const [editedPixString, setEditedPixString] = useState("")
    const [copiedOriginal, setCopiedOriginal] = useState(false)
    const [copiedEdited, setCopiedEdited] = useState(false)

    const originalCanvasRef = useRef<HTMLCanvasElement>(null)
    const editedCanvasRef = useRef<HTMLCanvasElement>(null)

    // Renderiza QR Code Original
    useEffect(() => {
        if (parsedInfo?.isValid && originalCanvasRef.current) {
            QRCode.toCanvas(
                originalCanvasRef.current,
                parsedInfo.originalString,
                {
                    width: 240,
                    margin: 1.5,
                    color: {
                        dark: "#0f172a",
                        light: "#ffffff"
                    }
                },
                (err) => {
                    if (err) console.error("Falha ao gerar QR Code Original", err)
                }
            )
        }
    }, [parsedInfo])

    // Renderiza QR Code Editado
    useEffect(() => {
        if (editedPixString && editedCanvasRef.current) {
            QRCode.toCanvas(
                editedCanvasRef.current,
                editedPixString,
                {
                    width: 240,
                    margin: 1.5,
                    color: {
                        dark: "#0f172a",
                        light: "#ffffff"
                    }
                },
                (err) => {
                    if (err) console.error("Falha ao gerar QR Code Editado", err)
                }
            )
        }
    }, [editedPixString])

    const parseEMV = (payload: string): Record<string, string> => {
        const result: Record<string, string> = {}
        let i = 0
        while (i < payload.length) {
            if (i + 4 > payload.length) break
            const tag = payload.substring(i, i + 2)
            const lengthVal = parseInt(payload.substring(i + 2, i + 4), 10)
            if (isNaN(lengthVal)) break
            const value = payload.substring(i + 4, i + 4 + lengthVal)
            result[tag] = value
            i += 4 + lengthVal
        }
        return result
    }

    const calculateCRC16 = (data: string): string => {
        let crc = 0xFFFF
        const polynomial = 0x1021
        for (let i = 0; i < data.length; i++) {
            const b = data.charCodeAt(i)
            for (let j = 0; j < 8; j++) {
                const bit = ((b >> (7 - j)) & 1) === 1
                const c15 = ((crc >> 15) & 1) === 1
                crc <<= 1
                if (c15 !== bit) {
                    crc ^= polynomial
                }
            }
        }
        crc &= 0xFFFF
        return crc.toString(16).toUpperCase().padStart(4, "0")
    }

    const handleParse = () => {
        const cleaned = inputValue.trim()

        if (!cleaned) {
            setParsedInfo({ isValid: false, errorMessage: "Cole a string do Pix Copia e Cola.", originalString: "" })
            return
        }

        if (!cleaned.startsWith("000201")) {
            setParsedInfo({
                isValid: false,
                errorMessage: "Estrutura inválida. Um código Pix Copia e Cola válido deve iniciar com o indicador de payload '000201'.",
                originalString: cleaned
            })
            return
        }

        try {
            const tags = parseEMV(cleaned)

            // Validação de segurança final via Checksum CRC16 (Tag 63)
            if (!tags["63"]) {
                setParsedInfo({
                    isValid: false,
                    errorMessage: "Código inválido: Não foi encontrado o campo de CRC16 (Tag 63) no final do payload.",
                    originalString: cleaned
                })
                return
            }

            // Calcula CRC do payload sem os 4 dígitos finais do CRC
            const payloadSemCRC = cleaned.substring(0, cleaned.length - 4)
            const crcCalculado = calculateCRC16(payloadSemCRC)
            const crcOriginal = tags["63"]

            if (crcCalculado !== crcOriginal) {
                setParsedInfo({
                    isValid: false,
                    errorMessage: `Erro de integridade: Checksum CRC16 inválido (calculado: ${crcCalculado}, informado: ${crcOriginal}). A string de dados pode ter sido truncada ou corrompida.`,
                    originalString: cleaned
                })
                return
            }

            // Decodifica Tag 26 (sub-TLV do comerciante - Pix)
            const tag26 = tags["26"]
            if (!tag26) {
                setParsedInfo({
                    isValid: false,
                    errorMessage: "Informações da conta do recebedor (Tag 26) ausentes no payload.",
                    originalString: cleaned
                })
                return
            }

            const subTags26 = parseEMV(tag26)
            const chave = subTags26["01"] || "Chave não informada"
            const urlDinamico = subTags26["25"]

            // Nome e Cidade (Tags 59 e 60)
            const nome = tags["59"] || "Não identificado"
            const cidade = tags["60"] || "Não identificado"

            // Valor (Tag 54)
            let valor = "Variável (Definido pelo pagador)"
            if (tags["54"]) {
                const valorFloat = parseFloat(tags["54"])
                if (!isNaN(valorFloat)) {
                    valor = valorFloat.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                    setNewValue(valorFloat.toFixed(2))
                }
            } else {
                setNewValue("")
            }

            // ID da transação (Tag 62 > 05)
            let txid = "Não informado (Sem transação id)"
            if (tags["62"]) {
                const subTags62 = parseEMV(tags["62"])
                txid = subTags62["05"] || txid
            }

            setParsedInfo({
                isValid: true,
                chave,
                nome,
                cidade,
                valor,
                txid,
                tipo: urlDinamico ? "dinamico" : "estatico",
                originalString: cleaned
            })
            setEditedPixString("")
        } catch (err: any) {
            setParsedInfo({
                isValid: false,
                errorMessage: `Erro de parse interno: ${err.message}`,
                originalString: cleaned
            })
        }
    }

    const handleUpdateValue = () => {
        if (!parsedInfo?.isValid) return

        const cleaned = parsedInfo.originalString
        const valueNum = parseFloat(newValue)

        if (isNaN(valueNum) || valueNum <= 0) {
            alert("Por favor, insira um valor válido maior que zero.")
            return
        }

        try {
            const tags = parseEMV(cleaned)
            
            // Substitui ou adiciona a tag 54 (Valor)
            const formattedValue = valueNum.toFixed(2)
            const valueLenStr = formattedValue.length.toString().padStart(2, "0")
            tags["54"] = formattedValue

            // Reconstrói todo o payload EMV na ordem crescente das tags (menos a 63 do CRC)
            let newPayload = ""
            const sortedTags = Object.keys(tags).sort((a, b) => parseInt(a) - parseInt(b))

            sortedTags.forEach(tag => {
                if (tag === "63") return // Pula a tag de CRC para calcular no final
                
                const val = tags[tag]
                const lenStr = val.length.toString().padStart(2, "0")
                newPayload += `${tag}${lenStr}${val}`
            })

            // Concatena indicador da tag 63 + length 04 do CRC
            newPayload += "6304"

            // Calcula novo CRC16
            const newCrc = calculateCRC16(newPayload)
            const finalPayload = newPayload + newCrc

            setEditedPixString(finalPayload)
        } catch (err: any) {
            alert(`Falha ao alterar o valor do Pix: ${err.message}`)
        }
    }

    const handleCopy = (text: string, type: "original" | "edited") => {
        navigator.clipboard.writeText(text)
        if (type === "original") {
            setCopiedOriginal(true)
            setTimeout(() => setCopiedOriginal(false), 2000)
        } else {
            setCopiedEdited(true)
            setTimeout(() => setCopiedEdited(false), 2000)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            
            <main className="flex-grow py-8">
                <div className="container mx-auto max-w-5xl px-4">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Ferramentas", href: "/ferramentas" },
                            { label: "Finanças", href: "/tools/finance" },
                            { label: "Decodificador Pix" }
                        ]}
                    />

                    <div className="my-6">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Decodificador de Pix Copia e Cola
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Faça o parse da string do Pix Copia e Cola, decodifique o recebedor, gere o QR Code correspondente na tela ou altere o valor de Pix estáticos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Coluna da Esquerda: Entrada */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <QrCode className="h-5 w-5 text-primary" />
                                        Código Pix Copia e Cola
                                    </CardTitle>
                                    <CardDescription>
                                        Cole o código do Pix Copia e Cola (padrão EMV) para extrair os dados.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="pix-input">String do Pix Copia e Cola:</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="pix-input"
                                                placeholder="Ex: 00020101021226...6304D1B2"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                className="font-mono text-xs h-11"
                                            />
                                            <Button onClick={handleParse} size="lg" className="h-11 flex-shrink-0">
                                                Analisar Pix
                                            </Button>
                                        </div>
                                    </div>

                                    {parsedInfo && !parsedInfo.isValid && (
                                        <div className="flex items-start gap-2 text-destructive dark:text-red-400 font-medium p-4 bg-destructive/10 rounded-xl border border-destructive/20 mt-4">
                                            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold">Código Pix Inválido</div>
                                                <div className="text-sm mt-1">{parsedInfo.errorMessage}</div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {parsedInfo?.isValid && (
                                <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Info className="h-4 w-4 text-primary" />
                                            Informações Decodificadas
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-3">
                                                <div className="flex items-start gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <span className="text-xs text-muted-foreground block">Recebedor</span>
                                                        <span className="text-sm font-semibold">{parsedInfo.nome}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Key className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <span className="text-xs text-muted-foreground block">Chave Pix</span>
                                                        <span className="text-sm font-mono break-all">{parsedInfo.chave}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <span className="text-xs text-muted-foreground block">Cidade do Recebedor</span>
                                                        <span className="text-sm font-semibold">{parsedInfo.cidade}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-3">
                                                <div className="flex items-start gap-2">
                                                    <Coins className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <span className="text-xs text-muted-foreground block">Valor</span>
                                                        <span className="text-sm font-bold text-primary">{parsedInfo.valor}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Eye className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <span className="text-xs text-muted-foreground block">Tipo de Pix</span>
                                                        <span className="text-sm font-semibold capitalize">
                                                            {parsedInfo.tipo === "dinamico" ? "Dinâmico (Gerido por API de banco)" : "Estático (Transferência Comum)"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <span className="text-xs text-muted-foreground block">Transaction ID (txid)</span>
                                                        <span className="text-sm font-mono text-xs break-all">{parsedInfo.txid}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {parsedInfo.tipo === "estatico" && (
                                            <div className="pt-4 border-t space-y-3">
                                                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                                                    <PenTool className="h-4 w-4 text-primary" />
                                                    Deseja alterar o valor do Pix Estático?
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    Digite o novo valor. Nós reconstruiremos a string EMV e recalcularemos o checksum CRC16 de segurança automaticamente.
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <div className="relative flex-grow">
                                                        <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">R$</span>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            placeholder="0.00"
                                                            value={newValue}
                                                            onChange={(e) => setNewValue(e.target.value)}
                                                            className="pl-8 h-10"
                                                        />
                                                    </div>
                                                    <Button onClick={handleUpdateValue} variant="outline" className="h-10">
                                                        Recalcular Pix
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Coluna da Direita: QR Code */}
                        <div className="lg:col-span-1">
                            {parsedInfo?.isValid ? (
                                <div className="space-y-6">
                                    {/* QR Code Original */}
                                    <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-lg text-center">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base font-semibold">QR Code do Pix</CardTitle>
                                            <CardDescription className="text-xs">
                                                Aponte o app do banco para pagar a partir do computador.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center justify-center py-4">
                                            <div className="p-3 bg-white rounded-xl shadow-inner border">
                                                <canvas ref={originalCanvasRef} className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]"></canvas>
                                            </div>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="mt-4 font-mono text-xs w-full flex items-center gap-1.5"
                                                onClick={() => handleCopy(parsedInfo.originalString, "original")}
                                            >
                                                {copiedOriginal ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                                                Copiar Código Pix
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* QR Code Editado (se gerado) */}
                                    {editedPixString && (
                                        <Card className="border-border/60 bg-emerald-950/10 dark:bg-emerald-950/20 backdrop-blur-md shadow-lg text-center border-emerald-500/20">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base font-semibold text-emerald-600 dark:text-emerald-400">Pix com Novo Valor</CardTitle>
                                                <CardDescription className="text-xs">
                                                    QR Code atualizado com o valor de R$ {parseFloat(newValue).toLocaleString("pt-BR")}.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center justify-center py-4">
                                                <div className="p-3 bg-white rounded-xl shadow-inner border border-emerald-500/30">
                                                    <canvas ref={editedCanvasRef} className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]"></canvas>
                                                </div>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="mt-4 font-mono text-xs w-full flex items-center gap-1.5"
                                                    onClick={() => handleCopy(editedPixString, "edited")}
                                                >
                                                    {copiedEdited ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                                                    Copiar Pix Reconstruído
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            ) : (
                                <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-lg text-center p-8 flex flex-col items-center justify-center min-h-[300px]">
                                    <QrCode className="h-16 w-16 text-muted-foreground/30 animate-pulse" />
                                    <h3 className="mt-4 font-semibold text-lg">QR Code do Pix</h3>
                                    <p className="text-xs text-muted-foreground mt-2 max-w-[200px] mx-auto">
                                        Insira um código válido para gerar o QR Code correspondente na tela.
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Guias do Blog de Integração */}
                    <div className="pt-4 border-t my-8">
                        <Label className="text-base text-foreground font-semibold mb-2 block">
                            Artigos e Guias Relacionados:
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/blog/como-decodificar-pix-copia-e-cola" className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium">
                                📖 Artigo: Como Decodificar String Pix Copia e Cola Programaticamente
                            </Link>
                            <Link href="/tools/utilities/qrcode" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                🛠️ Ferramenta: Gerador de QR Code
                            </Link>
                        </div>
                    </div>

                    <div className="mb-8">
                        <Accordion type="single" collapsible className="w-full">
                            <CodeExamplesAccordion
                                title="Como decodificar o Pix no seu código? (Exemplos de Código)"
                                examples={[
                                    { language: "javascript", label: "JavaScript (Node)", code: PIX_PARSER_JS },
                                    { language: "python", label: "Python", code: PIX_PARSER_PYTHON }
                                ]}
                            />
                        </Accordion>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between border-t py-6 gap-4">
                        <ShareButtons url="https://www.devthru.com/tools/finance/pix-parser" title={title} />
                    </div>

                    <RelatedTools currentToolSlug="pix-parser" category="finance" />
                </div>
            </main>
            
            <Footer />
        </div>
    )
}
