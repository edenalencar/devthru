"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/copy-button"
import { Calculator } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"

import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const BASE_JS_CODE = `function convertDecimal(decimalStr, toBase) {
  const num = parseInt(decimalStr, 10);
  if (isNaN(num)) return "";
  return num.toString(toBase).toUpperCase();
}
// Exemplo: convertDecimal("255", 2) -> "11111111"
// Exemplo: convertDecimal("255", 16) -> "FF"`;

const BASE_PYTHON_CODE = `def convert_decimal(decimal_str, to_base):
    try:
        num = int(decimal_str)
        if to_base == 2:
            return bin(num)[2:]
        elif to_base == 8:
            return oct(num)[2:]
        elif to_base == 16:
            return hex(num)[2:].upper()
        return str(num)
    except ValueError:
        return ""
# Exemplo: convert_decimal("255", 2) -> "11111111"
# Exemplo: convert_decimal("255", 16) -> "FF"`;

const BASE_CSHARP_CODE = `using System;

public static class BaseConverter
{
    public static string ConvertDecimal(string decimalStr, int toBase)
    {
        if (int.TryParse(decimalStr, out int num))
        {
            return Convert.ToString(num, toBase).ToUpper();
        }
        return string.Empty;
    }
}
// Exemplo: BaseConverter.ConvertDecimal("255", 2) -> "11111111"
// Exemplo: BaseConverter.ConvertDecimal("255", 16) -> "FF"`;

const BASE_JAVA_CODE = `public class BaseConverter {
    public static String convertDecimal(String decimalStr, int toBase) {
        try {
            int num = Integer.parseInt(decimalStr);
            if (toBase == 2) {
                return Integer.toBinaryString(num);
            } else if (toBase == 8) {
                return Integer.toOctalString(num);
            } else if (toBase == 16) {
                return Integer.toHexString(num).toUpperCase();
            }
            return String.valueOf(num);
        } catch (NumberFormatException e) {
            return "";
        }
    }
}`;

export function BaseConverterPage() {
    const [decimal, setDecimal] = useState("")
    const [binary, setBinary] = useState("")
    const [hex, setHex] = useState("")
    const [octal, setOctal] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleDecimalChange = (value: string) => {
        setDecimal(value)
        setError(null)
        if (!value) {
            setBinary("")
            setHex("")
            setOctal("")
            return
        }

        // Allow only numbers
        if (!/^\d*$/.test(value)) {
            return
        }

        try {
            const num = parseInt(value, 10)
            if (isNaN(num)) return

            setBinary(num.toString(2))
            setHex(num.toString(16).toUpperCase())
            setOctal(num.toString(8))
        } catch {
            setError("Número inválido")
        }
    }

    const handleBinaryChange = (value: string) => {
        setBinary(value)
        setError(null)
        if (!value) {
            setDecimal("")
            setHex("")
            setOctal("")
            return
        }

        // Allow only 0 and 1
        if (!/^[01]*$/.test(value)) {
            return
        }

        try {
            const num = parseInt(value, 2)
            if (isNaN(num)) return

            setDecimal(num.toString(10))
            setHex(num.toString(16).toUpperCase())
            setOctal(num.toString(8))
        } catch {
            setError("Número binário inválido")
        }
    }

    const handleHexChange = (value: string) => {
        const cleanValue = value.toUpperCase()
        setHex(cleanValue)
        setError(null)
        if (!value) {
            setDecimal("")
            setBinary("")
            setOctal("")
            return
        }

        // Allow only hex chars
        if (!/^[0-9A-F]*$/.test(cleanValue)) {
            return
        }

        try {
            const num = parseInt(cleanValue, 16)
            if (isNaN(num)) return

            setDecimal(num.toString(10))
            setBinary(num.toString(2))
            setOctal(num.toString(8))
        } catch {
            setError("Número hexadecimal inválido")
        }
    }

    const handleOctalChange = (value: string) => {
        setOctal(value)
        setError(null)
        if (!value) {
            setDecimal("")
            setBinary("")
            setHex("")
            return
        }

        // Allow only 0-7
        if (!/^[0-7]*$/.test(value)) {
            return
        }

        try {
            const num = parseInt(value, 8)
            if (isNaN(num)) return

            setDecimal(num.toString(10))
            setBinary(num.toString(2))
            setHex(num.toString(16).toUpperCase())
        } catch {
            setError("Número octal inválido")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-4xl">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Conversores" }, { "label": "Conversor de Base" }]} className="mb-6" />
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <Calculator className="h-8 w-8" />
                            Conversor de Bases
                        </h1>
                        <p className="text-muted-foreground">
                            Converta números simultaneamente entre Decimal, Binário, Hexadecimal e Octal
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Conversão em Tempo Real</CardTitle>
                            <CardDescription>
                                Digite em qualquer campo para converter para as outras bases
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="decimal">Decimal (Base 10)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="decimal"
                                            value={decimal}
                                            onChange={(e) => handleDecimalChange(e.target.value)}
                                            placeholder="Ex: 255"
                                            className="font-mono"
                                        />
                                        <CopyButton text={decimal} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="binary">Binário (Base 2)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="binary"
                                            value={binary}
                                            onChange={(e) => handleBinaryChange(e.target.value)}
                                            placeholder="Ex: 11111111"
                                            className="font-mono"
                                        />
                                        <CopyButton text={binary} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hex">Hexadecimal (Base 16)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="hex"
                                            value={hex}
                                            onChange={(e) => handleHexChange(e.target.value)}
                                            placeholder="Ex: FF"
                                            className="font-mono"
                                        />
                                        <CopyButton text={hex} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="octal">Octal (Base 8)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="octal"
                                            value={octal}
                                            onChange={(e) => handleOctalChange(e.target.value)}
                                            placeholder="Ex: 377"
                                            className="font-mono"
                                        />
                                        <CopyButton text={octal} />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Conversor de Bases e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O Conversor de Bases permite transformar números entre os sistemas Decimal (base 10), Binário (base 2), Hexadecimal (base 16) e Octal (base 8).
                                    A conversão é feita em tempo real, facilitando o trabalho de programadores e estudantes de ciência da computação.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> A ferramenta suporta números inteiros positivos.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>O que são bases numéricas (Base 2, 8, 10, 16)?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Bases numéricas (ou sistemas de numeração) representam a quantidade de símbolos distintos utilizados para expressar valores numéricos. Na computação, as principais bases são a Binária (base 2 - usa apenas 0 e 1), Octal (base 8 - dígitos de 0 a 7), Decimal (base 10 - sistema tradicional do dia a dia de 0 a 9) e Hexadecimal (base 16 - inclui letras de A a F para representar valores de 10 a 15).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como funciona a conversão manual de decimal para binário ou hexadecimal?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Para converter manualmente um número Decimal para outra base, realizamos divisões sucessivas pelo número da base desejada (2 para binário, 16 para hexadecimal) até obter quociente zero. O resultado é composto pelos restos dessas divisões lidos de trás para frente. Para o hexadecimal, os valores de 10 a 15 são mapeados para as letras A a F, respectivamente.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Esta ferramenta suporta números muito grandes ou negativos?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Esta ferramenta online é projetada especificamente para conversões rápidas de números inteiros positivos e não-negativos. Para números que excedem os limites padrão de precisão de inteiros do JavaScript, recomendamos o uso de tipos de dados dedicados no seu código backend (como BigInt em JS/Python, ou BigInteger em Java/C#).
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como converter bases no código? (Exemplos de Código)"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: BASE_JS_CODE },
                                        { language: "python", label: "Python", code: BASE_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: BASE_CSHARP_CODE },
                                        { language: "java", label: "Java", code: BASE_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Conversor de Bases"
                                    description="Converta números entre Decimal, Binário, Hexadecimal e Octal."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="base" category="converters" />
                </div>
            </main>

        </div>
    )
}
