"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Navbar } from "@/components/layout/navbar"
import { getPlanLimitMessage } from "@/lib/constants"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const RG_JS_CODE = `function validateRG(rg) {
  if (!rg) return false;
  
  // Limpeza de caracteres especiais, mantendo números e a letra X
  const cleaned = String(rg).toUpperCase().replace(/[^0-9X]/g, "");
  
  // O RG (padrão SP) deve ter exatamente 9 caracteres
  if (cleaned.length !== 9) {
    return false;
  }
  
  const base = cleaned.substring(0, 8);
  const digit = cleaned.charAt(8);
  
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(base[i]) * (i + 2);
  }
  
  const mod = sum % 11;
  let calculatedDigit = 11 - mod;
  
  let expectedDigit = "";
  if (calculatedDigit === 11) {
    expectedDigit = "0";
  } else if (calculatedDigit === 10) {
    expectedDigit = "X";
  } else {
    expectedDigit = calculatedDigit.toString();
  }
  
  return digit === expectedDigit;
}`;

const RG_PYTHON_CODE = `import re

def validate_rg(rg: str) -> bool:
    if not rg:
        return False
        
    # Limpeza de caracteres especiais, mantendo números e a letra X
    cleaned = re.sub(r'[^0-9X]', '', str(rg).upper())
    
    # O RG (padrão SP) deve ter exatamente 9 caracteres
    if len(cleaned) != 9:
        return False
        
    base = cleaned[0:8]
    digit = cleaned[8]
    
    total_sum = 0
    for i in range(8):
        total_sum += int(base[i]) * (i + 2)
        
    mod = total_sum % 11
    calculated_digit = 11 - mod
    
    if calculated_digit == 11:
        expected_digit = "0"
    elif calculated_digit == 10:
        expected_digit = "X"
    else:
        expected_digit = str(calculated_digit)
        
    return digit == expected_digit`;

const RG_CSHARP_CODE = `using System;
using System.Text.RegularExpressions;

public static class RGValidator
{
    public static bool Validate(string rg)
    {
        if (string.IsNullOrWhiteSpace(rg))
            return false;

        // Limpeza de caracteres especiais, mantendo números e a letra X
        string cleaned = Regex.Replace(rg.ToUpper(), @"[^0-9X]", "");

        // O RG (padrão SP) deve ter exatamente 9 caracteres
        if (cleaned.Length != 9)
            return false;

        string baseNum = cleaned.Substring(0, 8);
        char digit = cleaned[8];

        int sum = 0;
        for (int i = 0; i < 8; i++)
        {
            sum += (baseNum[i] - '0') * (i + 2);
        }

        int mod = sum % 11;
        int calculatedDigit = 11 - mod;

        string expectedDigit;
        if (calculatedDigit == 11)
        {
            expectedDigit = "0";
        }
        else if (calculatedDigit == 10)
        {
            expectedDigit = "X";
        }
        else
        {
            expectedDigit = calculatedDigit.toString();
        }

        return digit.ToString() == expectedDigit;
    }
}`;

const RG_JAVA_CODE = `public class RGValidator {
    public static boolean validate(String rg) {
        if (rg == null) {
            return false;
        }

        // Limpeza de caracteres especiais, mantendo números e a letra X
        String cleaned = rg.toUpperCase().replaceAll("[^0-9X]", "");

        // O RG (padrão SP) deve ter exatamente 9 caracteres
        if (cleaned.length() != 9) {
            return false;
        }

        String baseNum = cleaned.substring(0, 8);
        char digit = cleaned.charAt(8);

        int sum = 0;
        for (int i = 0; i < 8; i++) {
            sum += Character.getNumericValue(baseNum.charAt(i)) * (i + 2);
        }

        int mod = sum % 11;
        int calculatedDigit = 11 - mod;

        String expectedDigit;
        if (calculatedDigit == 11) {
            expectedDigit = "0";
        } else if (calculatedDigit == 10) {
            expectedDigit = "X";
        } else {
            expectedDigit = String.valueOf(calculatedDigit);
        }

        return String.valueOf(digit).equals(expectedDigit);
    }
}`;

export function RGGeneratorPage() {
    const [rg, setRg] = useState<string>("")
    const [withPunctuation, setWithPunctuation] = useState<boolean>(true)
    const [bulkQuantity, setBulkQuantity] = useState<number>(5)
    const { isPro, limit } = useUser()

    const generateRG = (formatted: boolean = withPunctuation): string => {
        const n1 = Math.floor(Math.random() * 10)
        const n2 = Math.floor(Math.random() * 10)
        const n3 = Math.floor(Math.random() * 10)
        const n4 = Math.floor(Math.random() * 10)
        const n5 = Math.floor(Math.random() * 10)
        const n6 = Math.floor(Math.random() * 10)
        const n7 = Math.floor(Math.random() * 10)
        const n8 = Math.floor(Math.random() * 10)

        const d = Math.floor(Math.random() * 11)
        const digit = d === 10 ? "X" : d.toString()

        const base = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${digit}`

        if (formatted) {
            return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${digit}`
        }
        return base
    }

    const handleGenerate = () => {
        setRg(generateRG())
    }

    useEffect(() => {
        if (!rg) {
            handleGenerate()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Documentos Pessoais", href: "/ferramentas-documentos" },
                        { label: "Gerador de RG" }
                    ]} className="mb-6" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de RG</h1>
                        <p className="text-muted-foreground">
                            Gere números de Registro Geral (RG) válidos para testes.
                            Nota: O algoritmo de RG varia por estado, este gerador cria um formato genérico válido.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar RG</CardTitle>
                                <CardDescription>Gere um único número de RG</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="punctuation"
                                        checked={withPunctuation}
                                        onChange={(e) => setWithPunctuation(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="punctuation">Com pontuação</Label>
                                </div>

                                {rg && (
                                    <ToolResult
                                        result={rg}
                                        toolId="rg"
                                        toolName="RG"
                                        input={{ withPunctuation }}
                                        successMessage="RG gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo RG
                                </Button>

                                <ConfigurationManager
                                    toolId="rg"
                                    currentConfig={{ withPunctuation, quantity: bulkQuantity }}
                                    onLoadConfig={(config) => {
                                        if (config.withPunctuation !== undefined) {
                                            setWithPunctuation(config.withPunctuation)
                                        }
                                        if (config.quantity) {
                                            setBulkQuantity(config.quantity)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Massa</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => generateRG(withPunctuation)}
                                    label="RGs"
                                    limit={limit}
                                    isPro={isPro}
                                    quantity={bulkQuantity}
                                    onQuantityChange={setBulkQuantity}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de RG e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O Gerador de RG cria números de Registro Geral formatados. Como o padrão de RG varia entre os estados brasileiros, esta ferramenta gera um formato comum aceito na maioria dos sistemas de validação.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Nota:</strong> Os números são gerados aleatoriamente e não possuem vínculo com a base de dados oficial dos órgãos emissores.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="faq-1">
                                    <AccordionTrigger>Como é calculada a validação do RG?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Como a emissão do RG é de responsabilidade de cada Estado, não há uma regra única nacional. No entanto, o padrão mais comum em validadores baseia-se nas diretrizes do Estado de São Paulo. Ele usa uma fórmula de soma ponderada com pesos de 2 a 9 aplicada aos primeiros 8 dígitos, calculando o resto da divisão por 11. O dígito verificador final pode ser de 0 a 9 ou a letra &quot;X&quot; quando o resto é 10.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="faq-2">
                                    <AccordionTrigger>Para que usar dados de RG fictícios em testes?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Para assegurar a conformidade com a LGPD (Lei Geral de Proteção de Dados) no desenvolvimento de software, QAs e desenvolvedores usam chaves de RG sintéticas em bancos de dados de teste, garantindo que o fluxo cadastral do sistema funcione sem expor dados pessoais reais.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: RG_JS_CODE },
                                        { language: "python", label: "Python", code: RG_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: RG_CSHARP_CODE },
                                        { language: "java", label: "Java", code: RG_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de RG"
                                    description="Gere números de RG válidos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="rg" category="documents" />
                </div>
            </main>

        </div>
    )
}

