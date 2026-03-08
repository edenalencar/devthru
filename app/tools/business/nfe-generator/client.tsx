"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CopyButton } from "@/components/copy-button"
import { ShareButtons } from "@/components/share-buttons"
import { RefreshCw, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// UF Codes (IBGE)
const ufCodes: Record<string, string> = {
    "RO": "11", "AC": "12", "AM": "13", "RR": "14", "PA": "15", "AP": "16", "TO": "17",
    "MA": "21", "PI": "22", "CE": "23", "RN": "24", "PB": "25", "PE": "26", "AL": "27", "SE": "28", "BA": "29",
    "MG": "31", "ES": "32", "RJ": "33", "SP": "35",
    "PR": "41", "SC": "42", "RS": "43",
    "MS": "50", "MT": "51", "GO": "52", "DF": "53"
}

export function NfeGeneratorPage() {
    const [uf, setUf] = useState("SP")
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [cnpj, setCnpj] = useState("")
    const [model, setModel] = useState("55")
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

        // 4. mod - Modelo do Documento Fiscal (2 digits)
        const mod = model

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
        toast.success("Chave de acesso gerada com sucesso!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="mb-6">
                        <Breadcrumbs
                            items={[
                                { label: "Ferramentas", href: "/ferramentas-fiscais" },
                                { label: "Dados Empresariais", href: "/ferramentas-fiscais" },
                                { label: "Gerador NF-e" }
                            ]}
                        />
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                            <FileText className="h-8 w-8 text-primary" />
                            Gerador de Chave NF-e
                        </h1>
                        <p className="text-muted-foreground">
                            Gere chaves de acesso de Nota Fiscal Eletrônica (NF-e) válidas para testes.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuração da Chave</CardTitle>
                                <CardDescription>Personalize os dados para gerar a chave de acesso</CardDescription>
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
                                        <Label>Modelo</Label>
                                        <Select value={model} onValueChange={setModel}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="55">55 - NF-e</SelectItem>
                                                <SelectItem value="65">65 - NFC-e</SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                                <SelectItem value="2">2 - Contingência FS-IA</SelectItem>
                                                <SelectItem value="3">3 - Contingência SCAN</SelectItem>
                                                <SelectItem value="4">4 - Contingência EPEC</SelectItem>
                                                <SelectItem value="5">5 - Contingência FS-DA</SelectItem>
                                                <SelectItem value="6">6 - Contingência SVC-AN</SelectItem>
                                                <SelectItem value="7">7 - Contingência SVC-RS</SelectItem>
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
                                        <p><strong>Formato:</strong> {generatedKey.length} dígitos</p>
                                        <p><strong>Dígito Verificador:</strong> {generatedKey.slice(-1)}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>



                    {/* FAQ & Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">Sobre o Gerador de Chave de Acesso NF-e / NFC-e</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert mb-6">
                                <p>
                                    O Gerador de Chave NF-e e NFC-e é uma ferramenta voltada para desenvolvedores, testadores de software (QA) e implantadores de ERP que necessitam de chaves de acesso matematicamente válidas para realizar testes de software, integração tributária e homologação de sistemas.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Como testar a chave de acesso em ambiente de homologação?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <p>
                                                Ao preencher formulários do seu sistema emissor de nota ou portal do ERP em ambiente de <strong>homologação</strong>, insira a chave com 44 dígitos numéricos gerada nesta ferramenta.
                                            </p>
                                            <p>
                                                Nós garantimos que o cálculo do último algarismo (o dígito verificador - DV) esteja 100% correto de acordo com a base de regras e documentação técnica da Secretaria de Estado da Fazenda (SEFAZ), garantindo aprovação em rotinas de verificação local do seu software.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Qual a diferença do Modelo 55 (NF-e) e 65 (NFC-e)?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <p>A estrutura de uma chave de 44 posições suporta a identificação do modelo da nota inserida (do pŕoximo ao centro da chave):</p>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li><strong>Modelo 55 (NF-e):</strong> É a Nota Fiscal Eletrônica tradicional, comummente utilizada em vendas B2B e envio por transportadoras.</li>
                                                <li><strong>Modelo 65 (NFC-e):</strong> É a Nota Fiscal de Consumidor Eletrônica, focada no varejo presencial B2C e transações diárias (o antigo cupom fiscal).</li>
                                            </ul>
                                            <p>Nossa ferramenta permite gerar livremente qualquer um dos dois modelos, ajustando a estrutura de 44 dígitos instantaneamente.</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>A chave de acesso gerada é verdadeira?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <p>
                                                <strong>Não.</strong> A chave é válida formatando-se do ponto de vista matemático, contendo um dígito verificador calculado. Contudo, ela é composta de numeração fictícia e aleatória e <strong>não possui validade tributária ou legal</strong> na base de dados receptora da SEFAZ na produção. Ela serve estritamente para simulação em rotinas de teste.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="pt-6 border-t mt-6">
                                <Label className="text-sm font-semibold mb-3 block text-primary">Guias Técnicos Recomendados:</Label>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Link href="/guides/validation/nfe-generator/python" className="text-xs px-3 py-1.5 bg-blue-100/50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-md transition-colors border border-blue-200 dark:border-blue-800">
                                        Validação de NF-e em Python
                                    </Link>
                                    <Link href="/guides/validation/nfe-generator/javascript" className="text-xs px-3 py-1.5 bg-yellow-100/50 hover:bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-md transition-colors border border-yellow-200 dark:border-yellow-800">
                                        Validação de NF-e em JavaScript
                                    </Link>
                                    <Link href="/guides/validation/nfe-generator/java" className="text-xs px-3 py-1.5 bg-red-100/50 hover:bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-md transition-colors border border-red-200 dark:border-red-800">
                                        Validação de NF-e em Java
                                    </Link>
                                    <Link href="/guides/validation/nfe-generator/csharp" className="text-xs px-3 py-1.5 bg-purple-100/50 hover:bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 rounded-md transition-colors border border-purple-200 dark:border-purple-800">
                                        Validação de NF-e em C#
                                    </Link>
                                </div>
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe nosso gerador:</Label>
                                <ShareButtons
                                    title="Gerador de Chave NF-e e NFC-e"
                                    description="Gere chaves de acesso de NF-e/NFC-e válidas para testes de integração e homologação de software."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="nfe-generator" category="business" />
                </div>
            </main>



        </div >
    )
}
