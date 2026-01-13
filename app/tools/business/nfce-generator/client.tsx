"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CopyButton } from "@/components/copy-button"
import { RefreshCw, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

// UF Codes (IBGE)
const ufCodes: Record<string, string> = {
    "RO": "11", "AC": "12", "AM": "13", "RR": "14", "PA": "15", "AP": "16", "TO": "17",
    "MA": "21", "PI": "22", "CE": "23", "RN": "24", "PB": "25", "PE": "26", "AL": "27", "SE": "28", "BA": "29",
    "MG": "31", "ES": "32", "RJ": "33", "SP": "35",
    "PR": "41", "SC": "42", "RS": "43",
    "MS": "50", "MT": "51", "GO": "52", "DF": "53"
}

export function NfceGeneratorPage() {
    const [uf, setUf] = useState("SP")
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [cnpj, setCnpj] = useState("")
    const [series, setSeries] = useState("1")
    const [number, setNumber] = useState("")
    const [emissionType, setEmissionType] = useState("1")
    const [generatedKey, setGeneratedKey] = useState("")

    const generateRandomCNPJ = () => {
        const n = 9
        const n1 = Math.floor(Math.random() * n)
        const n2 = Math.floor(Math.random() * n)
        const n3 = Math.floor(Math.random() * n)
        const n4 = Math.floor(Math.random() * n)
        const n5 = Math.floor(Math.random() * n)
        const n6 = Math.floor(Math.random() * n)
        const n7 = Math.floor(Math.random() * n)
        const n8 = Math.floor(Math.random() * n)
        const n9 = 0 // 0001
        const n10 = 0
        const n11 = 0
        const n12 = 1

        let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5
        d1 = 11 - (d1 % 11)
        if (d1 >= 10) d1 = 0

        let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6
        d2 = 11 - (d2 % 11)
        if (d2 >= 10) d2 = 0

        return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`
    }

    const calculateCheckDigit = (keyWithoutDigit: string) => {
        let sum = 0
        let weight = 2
        for (let i = keyWithoutDigit.length - 1; i >= 0; i--) {
            sum += parseInt(keyWithoutDigit[i]) * weight
            weight++
            if (weight > 9) weight = 2
        }
        const remainder = sum % 11
        const digit = remainder === 0 || remainder === 1 ? 0 : 11 - remainder
        return digit.toString()
    }

    const generateKey = () => {
        // 1. cUF - Código da UF do emitente do Documento Fiscal (2 digits)
        const cUF = ufCodes[uf]

        // 2. AAMM - Ano e Mês de emissão da NF-e (4 digits)
        const [year, month] = date.split('-')
        const AAMM = `${year.slice(2)}${month}`

        // 3. CNPJ - CNPJ do emitente (14 digits)
        let cleanCNPJ = cnpj.replace(/\D/g, '')
        if (cleanCNPJ.length !== 14) {
            cleanCNPJ = generateRandomCNPJ()
            setCnpj(cleanCNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"))
        }

        // 4. mod - Modelo do Documento Fiscal (2 digits) - 65 para NFC-e
        const mod = "65"

        // 5. serie - Série do Documento Fiscal (3 digits)
        const serie = series.padStart(3, '0')

        // 6. nNF - Número do Documento Fiscal (9 digits)
        let nNF = number.replace(/\D/g, '')
        if (!nNF) {
            nNF = Math.floor(Math.random() * 999999999).toString()
            setNumber(nNF)
        }
        nNF = nNF.padStart(9, '0')

        // 7. tpEmis - Forma de emissão da NF-e (1 digit)
        const tpEmis = emissionType

        // 8. cNF - Código Numérico que compõe a Chave de Acesso (8 digits)
        const cNF = Math.floor(Math.random() * 99999999).toString().padStart(8, '0')

        // Assemble key without check digit
        const keyBase = `${cUF}${AAMM}${cleanCNPJ}${mod}${serie}${nNF}${tpEmis}${cNF}`

        // 9. cDV - Dígito Verificador da Chave de Acesso (1 digit)
        const cDV = calculateCheckDigit(keyBase)

        setGeneratedKey(`${keyBase}${cDV}`)
        toast.success("Chave NFC-e gerada com sucesso!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                            <ShoppingCart className="h-8 w-8 text-primary" />
                            Gerador de Chave NFC-e
                        </h1>
                        <p className="text-muted-foreground">
                            Gere chaves de acesso de Nota Fiscal de Consumidor Eletrônica (NFC-e) válidas para testes.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuração da Chave</CardTitle>
                                <CardDescription>Personalize os dados para gerar a chave de acesso NFC-e</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>UF do Emitente</Label>
                                        <Select value={uf} onValueChange={setUf}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(ufCodes).sort().map((code) => (
                                                    <SelectItem key={code} value={code}>{code}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Data de Emissão (Mês/Ano)</Label>
                                        <Input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>CNPJ do Emitente (Opcional)</Label>
                                        <Input
                                            placeholder="Gerado automaticamente se vazio"
                                            value={cnpj}
                                            onChange={(e) => setCnpj(e.target.value)}
                                            maxLength={18}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Série (0-999)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="999"
                                            value={series}
                                            onChange={(e) => setSeries(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Número da Nota (Opcional)</Label>
                                        <Input
                                            type="number"
                                            placeholder="Gerado automaticamente se vazio"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Tipo de Emissão</Label>
                                        <Select value={emissionType} onValueChange={setEmissionType}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 - Normal</SelectItem>
                                                <SelectItem value="9">9 - Contingência Offline NFC-e</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button onClick={generateKey} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Chave de Acesso
                                </Button>
                            </CardContent>
                        </Card>

                        {generatedKey && (
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle>Chave Gerada</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 p-4 bg-background border rounded-md font-mono text-lg break-all text-center">
                                            {generatedKey.replace(/(\d{4})(?=\d)/g, '$1 ')}
                                        </div>
                                        <CopyButton text={generatedKey} />
                                    </div>
                                    <div className="mt-4 text-sm text-muted-foreground">
                                        <p><strong>Modelo:</strong> 65 (NFC-e)</p>
                                        <p><strong>Formato:</strong> {generatedKey.length} dígitos</p>
                                        <p><strong>Dígito Verificador:</strong> {generatedKey.slice(-1)}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Chave NFC-e</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Chave NFC-e cria chaves de acesso válidas para Nota Fiscal de Consumidor Eletrônica (modelo 65).
                                A ferramenta utiliza o algoritmo padrão de módulo 11 para calcular o dígito verificador.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> As chaves geradas são para fins de teste e desenvolvimento. Não possuem validade fiscal na SEFAZ.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
