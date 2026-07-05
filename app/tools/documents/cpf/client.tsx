"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ToolResult } from "@/components/tools/tool-result"
import { generateCPF, validateCPF, formatCPF } from "@/lib/utils/validators/cpf"
import { FileText, CheckCircle2, XCircle } from "lucide-react"

import { ShareButtons } from "@/components/share-buttons"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const CPF_JS_CODE = `function validateCPF(cpf) {
  const cleaned = cpf.replace(/\\D/g, "");
  if (cleaned.length !== 11 || /^(\\d)\\1+$/.test(cleaned)) return false;

  const digits = cleaned.split("").map(Number);
  const calculateDigit = (slice, factor) => {
    const sum = slice.reduce((acc, digit, index) => acc + digit * (factor - index), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calculateDigit(digits.slice(0, 9), 10);
  const digit2 = calculateDigit(digits.slice(0, 10), 11);

  return digit1 === digits[9] && digit2 === digits[10];
}`;

const CPF_PYTHON_CODE = `import re

def validate_cpf(cpf: str) -> bool:
    cleaned = re.sub(r'\\D', '', cpf)
    if len(cleaned) != 11 or len(set(cleaned)) == 1:
        return False

    digits = [int(d) for d in cleaned]
    
    def calculate_digit(slice_digits, factor):
        total_sum = sum(digit * (factor - idx) for idx, digit in enumerate(slice_digits))
        remainder = total_sum % 11
        return 0 if remainder < 2 else 11 - remainder

    digit1 = calculate_digit(digits[:9], 10)
    digit2 = calculate_digit(digits[:10], 11)

    return digit1 == digits[9] and digit2 == digits[10]`;

const CPF_CSHARP_CODE = `using System;
using System.Linq;
using System.Text.RegularExpressions;

public static class CPFValidator
{
    public static bool Validate(string cpf)
    {
        string cleaned = Regex.Replace(cpf ?? "", @"[^\\d]", "");
        if (cleaned.Length != 11 || cleaned.All(c => c == cleaned[0]))
            return false;

        int[] digits = cleaned.Select(c => c - '0').ToArray();

        int CalculateDigit(int[] slice, int factor)
        {
            int sum = 0;
            for (int i = 0; i < slice.Length; i++)
            {
                sum += slice[i] * (factor - i);
            }
            int remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        }

        int digit1 = CalculateDigit(digits.Take(9).ToArray(), 10);
        int digit2 = CalculateDigit(digits.Take(10).ToArray(), 11);

        return digit1 == digits[9] && digit2 == digits[10];
    }
}`;

const CPF_JAVA_CODE = `public class CPFValidator {
    public static boolean validate(String cpf) {
        if (cpf == null) return false;
        String cleaned = cpf.replaceAll("[^\\\\d]", "");
        if (cleaned.length() != 11 || cleaned.matches("^(\\\\d)\\\\1+$")) return false;

        int[] digits = new int[11];
        for (int i = 0; i < 11; i++) {
            digits[i] = Character.getNumericValue(cleaned.charAt(i));
        }

        int digit1 = calculateDigit(digits, 9, 10);
        int digit2 = calculateDigit(digits, 10, 11);

        return digit1 == digits[9] && digit2 == digits[10];
    }

    private static int calculateDigit(int[] digits, int length, int factor) {
        int sum = 0;
        for (int i = 0; i < length; i++) {
            sum += digits[i] * (factor - i);
        }
        int remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
}`;

export function CPFGeneratorPage() {
    const [generatedCPF, setGeneratedCPF] = useState("")
    const [formatted, setFormatted] = useState(true)
    const [validationInput, setValidationInput] = useState("")
    const [validationResult, setValidationResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')
    const [bulkQuantity, setBulkQuantity] = useState<number>(5)

    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const cpf = generateCPF()
        setGeneratedCPF(formatted ? formatCPF(cpf) : cpf)
    }

    const handleValidate = () => {
        setValidationResult(validateCPF(validationInput))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Documentos Pessoais" }, { "label": "CPF" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de CPF</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere CPFs válidos para testes e desenvolvimento. Valide CPFs existentes.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6">
                        <Button
                            variant={activeTab === 'single' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('single')}
                        >
                            Gerar Único
                        </Button>
                        <Button
                            variant={activeTab === 'bulk' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Gerar em Massa
                        </Button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {activeTab === 'single' ? (
                            /* Generator Card */
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gerar CPF</CardTitle>
                                    <CardDescription>
                                        Gere um CPF válido aleatório
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Formatar CPF (xxx.xxx.xxx-xx)</Label>
                                    </div>

                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        Gerar CPF
                                    </Button>

                                    {generatedCPF && (
                                        <ToolResult
                                            result={generatedCPF}
                                            toolId="cpf"
                                            toolName="CPF"
                                            input={{ formatted }}
                                            successMessage="CPF válido gerado com sucesso"
                                            isPro={isPro}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            /* Bulk Generator Card */
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Geração em Massa</CardTitle>
                                    <CardDescription>
                                        {getPlanLimitMessage(limit)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BulkGenerator
                                        generatorFn={() => {
                                            const cpf = generateCPF()
                                            return formatted ? formatCPF(cpf) : cpf
                                        }}
                                        label="CPFs"
                                        limit={limit}
                                        isPro={isPro}
                                        quantity={bulkQuantity}
                                        onQuantityChange={setBulkQuantity}
                                    />
                                    <div className="flex items-center space-x-2 mt-4">
                                        <input
                                            type="checkbox"
                                            id="formatted-bulk"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted-bulk">Formatar CPFs</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Validator Card - Always visible in Single mode, hidden or moved in Bulk? Keeping it visible only in Single for now to match layout */}
                        {activeTab === 'single' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Validar CPF</CardTitle>
                                    <CardDescription>
                                        Verifique se um CPF é válido
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf-input">CPF para validar</Label>
                                        <Input
                                            id="cpf-input"
                                            placeholder="000.000.000-00"
                                            value={validationInput}
                                            onChange={(e) => setValidationInput(e.target.value)}
                                            className="font-mono"
                                        />
                                    </div>

                                    <Button onClick={handleValidate} className="w-full" size="lg" variant="outline">
                                        Validar
                                    </Button>

                                    {validationResult !== null && (
                                        <div className="rounded-lg border p-4">
                                            {validationResult ? (
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 className="h-6 w-6 text-accent" />
                                                    <div>
                                                        <p className="font-semibold text-accent">CPF Válido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CPF passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <XCircle className="h-6 w-6 text-destructive" />
                                                    <div>
                                                        <p className="font-semibold text-destructive">CPF Inválido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CPF não passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Configuration Manager */}
                    <div className="mt-8">
                        <Card>
                            <CardContent className="pt-6">
                                <ConfigurationManager
                                    toolId="cpf"
                                    currentConfig={{
                                        formatted,
                                        activeTab,
                                        quantity: bulkQuantity
                                    }}
                                    onLoadConfig={(config) => {
                                        if (config.formatted !== undefined) {
                                            setFormatted(config.formatted)
                                        }
                                        if (config.activeTab) {
                                            setActiveTab(config.activeTab)
                                        }
                                        if (config.quantity) {
                                            setBulkQuantity(config.quantity)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de CPF e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O CPF (Cadastro de Pessoas Físicas) é o documento de identificação fiscal do cidadão brasileiro. 
                                    Nossa ferramenta gera CPFs válidos matematicamente seguindo o algoritmo oficial da Receita Federal.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números gerados por esta ferramenta são <strong>aleatórios e válidos apenas para testes de software</strong> e desenvolvimento de sistemas (mocks, homologação, automação QA). Eles não possuem validade legal na Receita Federal.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Para que serve um gerador de CPF?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Nossa ferramenta fornece CPFs válidos instantaneamente para preenchimento de formulários de cadastro em sistemas em fase de testes (QA) ou desenvolvimento local. Isso impede a utilização de dados reais de pessoas físicas durante o ciclo de homologação do software.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como funciona o cálculo do dígito verificador do CPF?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O CPF possui 11 dígitos, sendo os dois últimos os dígitos verificadores (DV1 e DV2). Eles são calculados por meio de uma operação matemática ("módulo 11") com pesos decrescentes baseados nos 9 dígitos iniciais. Nosdo gerador calcula esses dígitos automaticamente segundo as regras oficiais da Receita Federal.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: CPF_JS_CODE },
                                        { language: "python", label: "Python", code: CPF_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: CPF_CSHARP_CODE },
                                        { language: "java", label: "Java", code: CPF_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Artigos e Guias Relacionados:</Label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link href="/blog/validacao-cpf-algoritmo-completo" className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium">
                                        📖 Artigo: Como Validar CPF (Algoritmo Completo)
                                    </Link>
                                    <Link href="/guides/validation/cpf/python" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors">
                                        Como validar CPF em Python
                                    </Link>
                                    <Link href="/guides/validation/cpf/javascript" className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300 rounded hover:bg-yellow-200 dark:hover:bg-yellow-200/60 transition-colors">
                                        Como validar CPF em JavaScript
                                    </Link>
                                </div>
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de CPF"
                                    description="Gere e valide números de CPF para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="cpf" category="documents" />
                </div>
            </main>

        </div>
    )
}
