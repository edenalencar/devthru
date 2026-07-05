"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Barcode, CheckCircle2, AlertTriangle, Calendar, Coins, Landmark, FileText, ArrowRight, ShieldCheck, Copy, Check } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { Accordion } from "@/components/ui/accordion"
import Link from "next/link"

const BOLETO_VALIDATOR_JS = `function validarBoleto(codigo) {
    const cleaned = codigo.replace(/\\D/g, "");
    if (cleaned.length !== 47 && cleaned.length !== 48) {
        return { valido: false, erro: "Tamanho inválido" };
    }

    if (cleaned.startsWith("8")) {
        // Concessionárias e Tributos (48 dígitos)
        return validarConcessionaria(cleaned);
    } else {
        // Cobrança comercial (47 dígitos)
        return validarCobranca(cleaned);
    }
}

function validarCobranca(ld) {
    const blocos = [
        { num: ld.substring(0, 9), dv: ld[9] },
        { num: ld.substring(10, 19), dv: ld[20] },
        { num: ld.substring(21, 30), dv: ld[31] }
    ];

    const blocosValidos = blocos.every(bloco => {
        let soma = 0;
        let multiplicador = 2;
        for (let i = bloco.num.length - 1; i >= 0; i--) {
            let res = parseInt(bloco.num[i]) * multiplicador;
            soma += res > 9 ? Math.floor(res / 10) + (res % 10) : res;
            multiplicador = multiplicador === 2 ? 1 : 2;
        }
        const resto = soma % 10;
        const dvCalculado = resto === 0 ? 0 : 10 - resto;
        return dvCalculado === parseInt(bloco.dv);
    });

    return { valido: blocosValidos };
}`;

const BOLETO_VALIDATOR_PYTHON = `def validar_boleto(codigo: str) -> dict:
    cleaned = "".join(filter(str.isdigit, codigo))
    if len(cleaned) not in (47, 48):
        return {"valido": False, "erro": "Tamanho incorreto"}
        
    if cleaned.startswith("8"):
        return validar_concessionaria(cleaned)
    else:
        return validar_cobranca(cleaned)

def validar_cobranca(ld: str) -> dict:
    blocos = [
        (ld[0:9], ld[9]),
        (ld[10:19], ld[20]),
        (ld[21:30], ld[31])
    ]
    
    for num, dv in blocos:
        soma = 0
        multiplicador = 2
        for char in reversed(num):
            res = int(char) * multiplicador
            soma += (res // 10) + (res % 10) if res > 9 else res
            multiplicador = 1 if multiplicador == 2 else 2
            
        resto = soma % 10
        dv_calculado = 0 if resto == 0 else 10 - resto
        if dv_calculado != int(dv):
            return {"valido": False, "erro": "Dígito verificador do bloco incorreto"}
            
    return {"valido": True}`;

const BOLETO_VALIDATOR_CSHARP = `using System;
using System.Text.RegularExpressions;

public class BoletoValidator
{
    public static bool ValidarBoleto(string codigo)
    {
        string cleaned = Regex.Replace(codigo ?? "", @"\\D", "");
        if (cleaned.Length != 47 && cleaned.Length != 48) return false;

        return cleaned.StartsWith("8") ? ValidarConcessionaria(cleaned) : ValidarCobranca(cleaned);
    }

    private static bool ValidarCobranca(string ld)
    {
        var blocos = new[]
        {
            new { Num = ld.Substring(0, 9), Dv = ld[9] - '0' },
            new { Num = ld.Substring(10, 9), Dv = ld[20] - '0' },
            new { Num = ld.Substring(21, 9), Dv = ld[31] - '0' }
        };

        foreach (var bloco in blocos)
        {
            int soma = 0;
            int mult = 2;
            for (int i = bloco.Num.Length - 1; i >= 0; i--)
            {
                int res = (bloco.Num[i] - '0') * mult;
                soma += res > 9 ? (res / 10) + (res % 10) : res;
                mult = mult == 2 ? 1 : 2;
            }
            int resto = soma % 10;
            int dvCalc = resto == 0 ? 0 : 10 - resto;
            if (dvCalc != bloco.Dv) return false;
        }
        return true;
    }
}`;

const BANCOS: Record<string, string> = {
    "001": "Banco do Brasil S.A.",
    "003": "Banco da Amazônia S.A.",
    "004": "Banco do Nordeste do Brasil S.A.",
    "021": "BANESTES S.A. Banco do Estado do Espírito Santo",
    "033": "Banco Santander (Brasil) S.A.",
    "041": "Banco do Estado do Rio Grande do Sul S.A. (Banrisul)",
    "047": "Banco do Estado de Sergipe S.A. (Banese)",
    "070": "BRB - Banco de Brasília S.A.",
    "077": "Banco Inter S.A.",
    "104": "Caixa Econômica Federal",
    "136": "UNICRED",
    "237": "Banco Bradesco S.A.",
    "260": "Nu Pagamentos S.A. (Nubank)",
    "290": "PagSeguro Internet S.A.",
    "318": "Banco BMG S.A.",
    "336": "Banco C6 S.A. (C6 Bank)",
    "341": "Itaú Unibanco S.A.",
    "389": "Banco Mercantil do Brasil S.A.",
    "422": "Banco Safra S.A.",
    "623": "Banco Pan S.A.",
    "633": "Banco Rendimento S.A.",
    "655": "Banco Votorantim S.A. (BV)",
    "707": "Banco Daycoval S.A.",
    "748": "Banco Cooperativo Sicredi S.A. (Sicredi)",
    "756": "Banco Cooperativo do Brasil S.A. (Sicoob)"
}

interface ValidationResult {
    isValid: boolean
    errorMessage?: string
    tipo?: "cobranca" | "concessionaria"
    emissor?: string
    vencimento?: string
    valor?: string
    codigoBarras?: string
}

const title = "Validador de Boleto Bancário Online - Linha Digitável e Emissor"

export function BoletoValidatorPage() {
    const [inputValue, setInputValue] = useState("")
    const [result, setResult] = useState<ValidationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const handleValidate = () => {
        const cleaned = inputValue.replace(/\D/g, "")

        if (!cleaned) {
            setResult({ isValid: false, errorMessage: "Insira a linha digitável ou código de barras." })
            return
        }

        if (cleaned.length !== 47 && cleaned.length !== 48 && cleaned.length !== 44) {
            setResult({
                isValid: false,
                errorMessage: `Tamanho inválido (${cleaned.length} dígitos). Um boleto comercial deve conter 47 dígitos e um de água/luz/tributos deve conter 48 dígitos. Códigos de barras contêm 44 dígitos.`
            })
            return
        }

        if (cleaned.startsWith("8")) {
            // Concessionária (48 dígitos)
            validateConcessionaria(cleaned)
        } else {
            // Cobrança Comercial (47 ou 44 dígitos)
            validateCobranca(cleaned)
        }
    }

    const validateCobranca = (ld: string) => {
        // Se colar código de barras (44 dígitos), reconstrói a linha digitável aproximada para validação básica
        let ldFinal = ld
        if (ld.length === 44) {
            // Reconstrução simplificada de código de barras para linha digitável comercial
            // O padrão de código de barras comercial:
            // Banco(3) + Moeda(1) + DV Geral(1) + Fator(4) + Valor(10) + Campo Livre(25)
            const banco = ld.substring(0, 3)
            const moeda = ld.substring(3, 4)
            const dvGeral = ld.substring(4, 5)
            const fator = ld.substring(5, 9)
            const valor = ld.substring(9, 19)
            const campoLivre = ld.substring(19, 44)

            // Linha digitável aproximada
            const c1 = banco + moeda + campoLivre.substring(0, 5)
            const dv1 = calcularModulo10(c1)
            const c2 = campoLivre.substring(5, 15)
            const dv2 = calcularModulo10(c2)
            const c3 = campoLivre.substring(15, 25)
            const dv3 = calcularModulo10(c3)

            ldFinal = `${c1}${dv1}${c2}${dv2}${c3}${dv3}${dvGeral}${fator}${valor}`
        }

        const bloco1 = ldFinal.substring(0, 9)
        const dv1 = parseInt(ldFinal[9])
        const bloco2 = ldFinal.substring(10, 19)
        const dv2 = parseInt(ldFinal[20])
        const bloco3 = ldFinal.substring(21, 30)
        const dv3 = parseInt(ldFinal[31])
        const dvGeral = parseInt(ldFinal[32])
        const fatorVenc = ldFinal.substring(33, 37)
        const valorStr = ldFinal.substring(37, 47)

        const dv1Valido = calcularModulo10(bloco1) === dv1
        const dv2Valido = calcularModulo10(bloco2) === dv2
        const dv3Valido = calcularModulo10(bloco3) === dv3

        if (!dv1Valido || !dv2Valido || !dv3Valido) {
            setResult({
                isValid: false,
                tipo: "cobranca",
                errorMessage: "Dígito verificador incorreto em um ou mais blocos da linha digitável."
            })
            return
        }

        // Reconstrói código de barras
        const codigoBarras = ldFinal.substring(0, 3) + ldFinal[3] + ldFinal[32] + ldFinal.substring(33, 47) + ldFinal.substring(4, 9) + ldFinal.substring(10, 20) + ldFinal.substring(21, 31)

        // Valida DV Geral do código de barras (Módulo 11)
        const digitosBarrasSemDv = codigoBarras.substring(0, 4) + codigoBarras.substring(5, 44)
        const dvGeralCalculado = calcularModulo11Boleto(digitosBarrasSemDv)

        if (dvGeralCalculado !== dvGeral) {
            setResult({
                isValid: false,
                tipo: "cobranca",
                errorMessage: `Dígito verificador geral do boleto inválido (esperado: ${dvGeralCalculado}, informado: ${dvGeral}).`
            })
            return
        }

        // Decodifica Emissor
        const codBanco = ldFinal.substring(0, 3)
        const emissorName = BANCOS[codBanco] || `Banco não identificado (Código: ${codBanco})`

        // Fator de vencimento
        const fator = parseInt(fatorVenc)
        let vencimento = "Sem data de vencimento"
        if (fator >= 1000) {
            const baseDate = new Date(1997, 9, 7) // 7 de Outubro de 1997
            let diasAdicionais = fator
            // Ajuste FEBRABAN para estouro do fator 9999 em 22/02/2025
            let dataCalculada = new Date(baseDate.getTime() + diasAdicionais * 24 * 60 * 60 * 1000)
            const corteEstouro = new Date(2025, 1, 22)
            if (dataCalculada < corteEstouro) {
                // Adiciona o ciclo de 9000 dias
                dataCalculada = new Date(dataCalculada.getTime() + 9000 * 24 * 60 * 60 * 1000)
            }
            vencimento = dataCalculada.toLocaleDateString("pt-BR")
        }

        // Valor
        const valorCentavos = parseInt(valorStr)
        const valorFormatado = (valorCentavos / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        setResult({
            isValid: true,
            tipo: "cobranca",
            emissor: emissorName,
            vencimento,
            valor: valorFormatado,
            codigoBarras
        })
    }

    const validateConcessionaria = (ld: string) => {
        // Se colar código de barras de concessionária (44 dígitos), converte em 48 com DVs
        let ldFinal = ld
        if (ld.length === 44) {
            const b1 = ld.substring(0, 11)
            const b2 = ld.substring(11, 22)
            const b3 = ld.substring(22, 33)
            const b4 = ld.substring(33, 44)

            const crit = parseInt(ld[2])
            const usarModulo11 = crit === 8 || crit === 9

            const dv1 = usarModulo11 ? calcularModulo11Concessionaria(b1) : calcularModulo10(b1)
            const dv2 = usarModulo11 ? calcularModulo11Concessionaria(b2) : calcularModulo10(b2)
            const dv3 = usarModulo11 ? calcularModulo11Concessionaria(b3) : calcularModulo10(b3)
            const dv4 = usarModulo11 ? calcularModulo11Concessionaria(b4) : calcularModulo10(b4)

            ldFinal = `${b1}${dv1}${b2}${dv2}${b3}${dv3}${b4}${dv4}`
        }

        const b1 = ldFinal.substring(0, 11)
        const dv1 = parseInt(ldFinal[11])
        const b2 = ldFinal.substring(12, 23)
        const dv2 = parseInt(ldFinal[23])
        const b3 = ldFinal.substring(24, 35)
        const dv3 = parseInt(ldFinal[35])
        const b4 = ldFinal.substring(36, 47)
        const dv4 = parseInt(ldFinal[47])

        // Critério de validação definido no 3º dígito da linha (ou código de barras)
        // 6 ou 7 = Módulo 10 | 8 ou 9 = Módulo 11
        const criterioDígito = parseInt(ldFinal[2])
        const usarModulo11 = criterioDígito === 8 || criterioDígito === 9

        const dv1Calculado = usarModulo11 ? calcularModulo11Concessionaria(b1) : calcularModulo10(b1)
        const dv2Calculado = usarModulo11 ? calcularModulo11Concessionaria(b2) : calcularModulo10(b2)
        const dv3Calculado = usarModulo11 ? calcularModulo11Concessionaria(b3) : calcularModulo10(b3)
        const dv4Calculado = usarModulo11 ? calcularModulo11Concessionaria(b4) : calcularModulo10(b4)

        if (
            dv1Calculado !== dv1 ||
            dv2Calculado !== dv2 ||
            dv3Calculado !== dv3 ||
            dv4Calculado !== dv4
        ) {
            setResult({
                isValid: false,
                tipo: "concessionaria",
                errorMessage: `Dígito verificador inválido para blocos de concessionária (Critério: Módulo ${usarModulo11 ? 11 : 10}).`
            })
            return
        }

        // Reconstrói o código de barras de 44 dígitos
        const codigoBarras = b1 + b2 + b3 + b4

        // Emissor baseado no segmento (4º dígito)
        const segmento = ldFinal[3]
        let emissor = "Concessionária / Serviços de Utilidade"
        if (segmento === "1") emissor = "Prefeituras e Órgãos Estaduais"
        else if (segmento === "2") emissor = "Saneamento (Água/Esgoto)"
        else if (segmento === "3") emissor = "Energia Elétrica"
        else if (segmento === "4") emissor = "Telecomunicações (Telefone/Internet)"
        else if (segmento === "5") emissor = "Órgãos Governamentais / Impostos"
        else if (segmento === "6") emissor = "Carnês e Cobranças Bancárias Auxiliares"
        else if (segmento === "7") emissor = "Multas de Trânsito / Detran"

        // Valor a partir do código de barras posições 4 a 14 (11 dígitos)
        const valorString = codigoBarras.substring(4, 15)
        const valorCentavos = parseInt(valorString)
        const valorFormatado = (valorCentavos / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        setResult({
            isValid: true,
            tipo: "concessionaria",
            emissor,
            vencimento: "Vencimento variável / consultar fatura",
            valor: valorFormatado,
            codigoBarras
        })
    }

    const calcularModulo10 = (bloco: string): number => {
        let soma = 0
        let peso = 2
        for (let i = bloco.length - 1; i >= 0; i--) {
            let res = parseInt(bloco[i]) * peso
            soma += res > 9 ? Math.floor(res / 10) + (res % 10) : res
            peso = peso === 2 ? 1 : 2
        }
        const resto = soma % 10
        return resto === 0 ? 0 : 10 - resto
    }

    const calcularModulo11Boleto = (bloco: string): number => {
        let soma = 0
        let peso = 2
        for (let i = bloco.length - 1; i >= 0; i--) {
            soma += parseInt(bloco[i]) * peso
            peso = peso === 9 ? 2 : peso + 1
        }
        const resto = soma % 11
        const diferenca = 11 - resto
        if (diferenca === 0 || diferenca === 10 || diferenca === 11) return 1
        return diferenca
    }

    const calcularModulo11Concessionaria = (bloco: string): number => {
        let soma = 0
        let peso = 2
        for (let i = bloco.length - 1; i >= 0; i--) {
            soma += parseInt(bloco[i]) * peso
            peso = peso === 9 ? 2 : peso + 1
        }
        const resto = soma % 11
        if (resto === 0 || resto === 1) return 0
        if (resto === 10) return 1
        return 11 - resto
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            
            <main className="flex-grow py-8">
                <div className="container mx-auto max-w-4xl px-4">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Ferramentas", href: "/ferramentas" },
                            { label: "Finanças", href: "/tools/finance" },
                            { label: "Validador de Boleto" }
                        ]}
                    />

                    <div className="my-6">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Validador de Boleto Bancário
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Valide e decodifique linhas digitáveis ou códigos de barras comerciais (bancos) e de concessionárias (água, luz, tributos).
                        </p>
                    </div>

                    <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-lg mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Barcode className="h-5 w-5 text-primary" />
                                Validar Linha Digitável ou Código de Barras
                            </CardTitle>
                            <CardDescription>
                                Cole o número do boleto completo para validar e extrair as informações.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="boleto-input">Número do boleto (apenas números ou formatado):</Label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Input
                                        id="boleto-input"
                                        placeholder="Ex: 34191.79001 01043.513184 91020.150008 7 98760000015000"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="font-mono text-sm h-11"
                                    />
                                    <Button onClick={handleValidate} size="lg" className="h-11">
                                        Validar Boleto
                                    </Button>
                                </div>
                            </div>

                            {result && (
                                <div className="mt-6 pt-6 border-t">
                                    {result.isValid ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span>Boleto Válido!</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Card className="bg-muted/40 border-none">
                                                    <CardContent className="p-4 space-y-3">
                                                        <div className="flex items-start gap-2">
                                                            <Landmark className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                            <div>
                                                                <span className="text-xs text-muted-foreground block">Emissor / Convênio</span>
                                                                <span className="text-sm font-semibold">{result.emissor}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                            <div>
                                                                <span className="text-xs text-muted-foreground block">Data de Vencimento</span>
                                                                <span className="text-sm font-semibold">{result.vencimento}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="bg-muted/40 border-none">
                                                    <CardContent className="p-4 space-y-3">
                                                        <div className="flex items-start gap-2">
                                                            <Coins className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                            <div>
                                                                <span className="text-xs text-muted-foreground block">Valor do Boleto</span>
                                                                <span className="text-sm font-bold text-primary">{result.valor}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                            <div>
                                                                <span className="text-xs text-muted-foreground block">Tipo do Segmento</span>
                                                                <span className="text-sm font-semibold capitalize">
                                                                    {result.tipo === "cobranca" ? "Cobrança Bancária (Comercial)" : "Concessionárias / Tributos Públicos"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>

                                            {result.codigoBarras && (
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="barcode-out">Código de Barras Reconstruído (44 dígitos):</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="barcode-out"
                                                            readOnly
                                                            value={result.codigoBarras}
                                                            className="font-mono text-xs bg-muted h-10 pr-10"
                                                        />
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                                                            onClick={() => handleCopy(result.codigoBarras!)}
                                                        >
                                                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-2 text-destructive dark:text-red-400 font-medium p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                                            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-base">Inconsistência Identificada</div>
                                                <div className="text-sm mt-1">{result.errorMessage}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Guias do Blog de Integração */}
                    <div className="pt-4 border-t mb-8">
                        <Label className="text-base text-foreground font-semibold mb-2 block">
                            Artigos e Guias Relacionados:
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/blog/como-decodificar-boleto-bancario" className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium">
                                📖 Artigo: Como Decodificar Boleto Bancário Programaticamente
                            </Link>
                            <Link href="/tools/finance/boleto-generator" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                🛠️ Ferramenta: Gerador de Boleto para Testes
                            </Link>
                        </div>
                    </div>

                    <div className="mb-8">
                        <Accordion type="single" collapsible className="w-full">
                            <CodeExamplesAccordion
                                title="Como validar boletos no seu sistema? (Exemplos de Código)"
                                examples={[
                                    { language: "javascript", label: "JavaScript", code: BOLETO_VALIDATOR_JS },
                                    { language: "python", label: "Python", code: BOLETO_VALIDATOR_PYTHON },
                                    { language: "csharp", label: "C#", code: BOLETO_VALIDATOR_CSHARP }
                                ]}
                            />
                        </Accordion>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between border-t py-6 gap-4">
                        <ShareButtons url="https://www.devthru.com/tools/finance/boleto-validator" title={title} />
                    </div>

                    <RelatedTools currentToolSlug="boleto-validator" category="finance" />
                </div>
            </main>
            
            <Footer />
        </div>
    )
}
