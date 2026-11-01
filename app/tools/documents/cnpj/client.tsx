"use client"

import Link from "next/link"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToolResult } from "@/components/tools/tool-result"
import { generateCNPJ, validateCNPJ, formatCNPJ } from "@/lib/utils/validators/cnpj"
import { Code2, CheckCircle2, XCircle } from "lucide-react"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { ShareButtons } from "@/components/share-buttons"

import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const CNPJ_JS_CODE = `function validateCNPJ(cnpj) {
  const cleaned = cnpj.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length !== 14 || /^([A-Z0-9])\\1+$/.test(cleaned)) return false;

  const getCharValue = (char) => {
    const code = char.charCodeAt(0);
    return code - 48;
  };

  const calculateDigit = (slice, weights) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += getCharValue(slice[i]) * weights[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit1 = calculateDigit(cleaned.substring(0, 12), weights1);
  const digit2 = calculateDigit(cleaned.substring(0, 12) + digit1, weights2);

  return digit1 === getCharValue(cleaned[12]) && digit2 === getCharValue(cleaned[13]);
}`;

const CNPJ_PYTHON_CODE = `import re

def validate_cnpj(cnpj: str) -> bool:
    cleaned = re.sub(r'[^A-Z0-9]', '', cnpj.upper())
    if len(cleaned) != 14 or len(set(cleaned)) == 1:
        return False

    def get_char_value(char: str) -> int:
        return ord(char) - 48

    def calculate_digit(slice_chars: str, weights: list) -> int:
        total_sum = sum(get_char_value(char) * weights[idx] for idx, char in enumerate(slice_chars))
        remainder = total_sum % 11
        return 0 if remainder < 2 else 11 - remainder

    weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    digit1 = calculate_digit(cleaned[:12], weights1)
    digit2 = calculate_digit(cleaned[:12] + str(digit1), weights2)

    return digit1 == get_char_value(cleaned[12]) and digit2 == get_char_value(cleaned[13])`;

const CNPJ_CSHARP_CODE = `using System;
using System.Linq;
using System.Text.RegularExpressions;

public static class CNPJValidator
{
    public static bool Validate(string cnpj)
    {
        if (string.IsNullOrEmpty(cnpj)) return false;
        string cleaned = Regex.Replace(cnpj.ToUpper(), @"[^A-Z0-9]", "");
        
        if (cleaned.Length != 14 || cleaned.All(c => c == cleaned[0]))
            return false;

        int GetCharValue(char c) => c - 48;

        int CalculateDigit(string slice, int[] weights)
        {
            int sum = 0;
            for (int i = 0; i < slice.Length; i++)
            {
                sum += GetCharValue(slice[i]) * weights[i];
            }
            int remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        }

        int[] weights1 = { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
        int[] weights2 = { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

        int digit1 = CalculateDigit(cleaned.Substring(0, 12), weights1);
        int digit2 = CalculateDigit(cleaned.Substring(0, 12) + digit1.ToString(), weights2);

        return digit1 == GetCharValue(cleaned[12]) && digit2 == GetCharValue(cleaned[13]);
    }
}`;

const CNPJ_JAVA_CODE = `public class CNPJValidator {
    public static boolean validate(String cnpj) {
        if (cnpj == null) return false;
        String cleaned = cnpj.toUpperCase().replaceAll("[^A-Z0-9]", "");
        if (cleaned.length() != 14 || cleaned.matches("^([A-Z0-9])\\\\1+$")) return false;

        int[] weights1 = { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
        int[] weights2 = { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

        int digit1 = calculateDigit(cleaned.substring(0, 12), weights1);
        int digit2 = calculateDigit(cleaned.substring(0, 12) + digit1, weights2);

        return digit1 == (cleaned.charAt(12) - 48) && digit2 == (cleaned.charAt(13) - 48);
    }

    private static int calculateDigit(String slice, int[] weights) {
        int sum = 0;
        for (int i = 0; i < slice.length(); i++) {
            sum += (slice.charAt(i) - 48) * weights[i];
        }
        int remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
}`;

export function CNPJGeneratorPage() {
    const [generatedCNPJ, setGeneratedCNPJ] = useState("")
    const [formatted, setFormatted] = useState(true)
    const [alphanumeric, setAlphanumeric] = useState(false)
    const [establishmentType, setEstablishmentType] = useState<"matriz" | "filial" | "random">("random")
    const [valid, setValid] = useState<boolean>(true)
    const [bulkQuantity, setBulkQuantity] = useState<number>(5)
    const [validationInput, setValidationInput] = useState("")
    const [validationResult, setValidationResult] = useState<boolean | null>(null)

    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const cnpj = generateCNPJ({ alphanumeric, establishmentType, valid })
        setGeneratedCNPJ(formatted ? formatCNPJ(cnpj) : cnpj)
    }

    const handleValidate = () => {
        setValidationResult(validateCNPJ(validationInput))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Documentos Pessoais" }, { "label": "CNPJ" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Code2 className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de CNPJ</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere CNPJs válidos para testes e desenvolvimento. Valide CNPJs existentes.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar CNPJ</CardTitle>
                                <CardDescription>
                                    Gere um CNPJ aleatório (Tradicional ou Alfanumérico)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Formatar CNPJ (xx.xxx.xxx/xxxx-xx)</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="alphanumeric"
                                            checked={alphanumeric}
                                            onChange={(e) => setAlphanumeric(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="alphanumeric">Gerar CNPJ Alfanumérico</Label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="space-y-2">
                                            <Label>Estabelecimento</Label>
                                            <Select value={establishmentType} onValueChange={(val: "matriz" | "filial" | "random") => setEstablishmentType(val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="random">Aleatório</SelectItem>
                                                    <SelectItem value="matriz">Matriz (/0001)</SelectItem>
                                                    <SelectItem value="filial">Filial (Outros)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Situação</Label>
                                            <Select value={valid ? "valido" : "invalido"} onValueChange={(val) => setValid(val === "valido")}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a situação" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="valido">Válido</SelectItem>
                                                    <SelectItem value="invalido">Inválido</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={handleGenerate} className="w-full" size="lg">
                                    Gerar CNPJ
                                </Button>

                                {generatedCNPJ && (
                                    <ToolResult
                                        result={generatedCNPJ}
                                        toolId="cnpj"
                                        toolName="CNPJ"
                                        input={{ formatted, alphanumeric, establishmentType, valid }}
                                        successMessage={validateCNPJ(generatedCNPJ) ? "CNPJ válido gerado com sucesso" : "CNPJ inválido gerado com sucesso para testes de falha"}
                                    />
                                )}
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Geração em Massa</CardTitle>
                                    <CardDescription>
                                        {getPlanLimitMessage(limit)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BulkGenerator
                                        generatorFn={() => {
                                            const cnpj = generateCNPJ({ alphanumeric, establishmentType, valid })
                                            return formatted ? formatCNPJ(cnpj) : cnpj
                                        }}
                                        label="CNPJs"
                                        limit={limit}
                                        isPro={isPro}
                                        quantity={bulkQuantity}
                                        onQuantityChange={setBulkQuantity}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Validar CNPJ</CardTitle>
                                    <CardDescription>
                                        Verifique se um CNPJ é válido
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cnpj-input">CNPJ para validar</Label>
                                        <Input
                                            id="cnpj-input"
                                            placeholder="00.000.000/0000-00"
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
                                                        <p className="font-semibold text-accent">CNPJ Válido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CNPJ passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <XCircle className="h-6 w-6 text-destructive" />
                                                    <div>
                                                        <p className="font-semibold text-destructive">CNPJ Inválido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CNPJ não passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Configuration Manager */}
                    <div className="mt-8">
                        <Card>
                            <CardContent className="pt-6">
                                <ConfigurationManager
                                    toolId="cnpj"
                                    currentConfig={{ formatted, alphanumeric, establishmentType, valid, quantity: bulkQuantity }}
                                    onLoadConfig={(config) => {
                                        if (config.formatted !== undefined) {
                                            setFormatted(config.formatted)
                                        }
                                        if (config.alphanumeric !== undefined) {
                                            setAlphanumeric(config.alphanumeric)
                                        }
                                        if (config.establishmentType !== undefined) {
                                            setEstablishmentType(config.establishmentType)
                                        }
                                        if (config.valid !== undefined) {
                                            setValid(config.valid)
                                        }
                                        if (config.quantity) {
                                            setBulkQuantity(config.quantity)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de CNPJ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O CNPJ (Cadastro Nacional da Pessoa Jurídica) <strong>é composto por quatorze</strong> caracteres. Na estrutura tradicional, o <strong>cnpj é composto</strong> apenas por números, onde os <strong>doze primeiros</strong> identificam a inscrição da empresa e da filial, e os <strong>dois últimos</strong> são os dígitos de verificação. Nosso sistema foi criado para <strong>auxiliar programadores</strong> e <strong>programadores analistas</strong> que precisam <strong>gerar cnpj válidos</strong> de forma rápida e segura.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção e Termos de Uso:</strong> Os dados gerados servem unicamente para testes de software e desenvolvimento. A <strong>má utilização</strong> desse recurso ou o uso indevido de dados em ambientes reais <strong>é de total responsabilidade do usuário</strong>.
                                </p>
                            </div>

                            <div className="pt-4 border-t">

                                <Label className="text-sm text-muted-foreground mb-2 block">Artigos e Guias Relacionados:</Label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link href="/blog/validacao-cnpj-algoritmo-completo" className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium">
                                        📖 Artigo: Como Validar CNPJ (Algoritmo Completo)
                                    </Link>
                                    <Link href="/guides/validation/cnpj/python" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors">
                                        Como validar CNPJ em Python
                                    </Link>
                                    <Link href="/guides/validation/cnpj/javascript" className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/60 transition-colors">
                                        Como validar CNPJ em JavaScript
                                    </Link>
                                </div>
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de CNPJ"
                                    description="Gere e valide números de CNPJ para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="cnpj">
                        <CodeExamplesAccordion
                            examples={[
                                { language: "javascript", label: "JavaScript / TS", code: CNPJ_JS_CODE },
                                { language: "python", label: "Python", code: CNPJ_PYTHON_CODE },
                                { language: "csharp", label: "C#", code: CNPJ_CSHARP_CODE },
                                { language: "java", label: "Java", code: CNPJ_JAVA_CODE }
                            ]}
                        />
                    </ToolFaqSection>
                    <RelatedTools currentToolSlug="cnpj" category="documents" />
                </div>
            </main>

        </div>
    )
}
