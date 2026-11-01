"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shield, RefreshCw } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

import { ToolResult } from "@/components/tools/tool-result"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { generateRenavam, formatRenavam } from "@/lib/utils/validators/renavam"

const RENAVAM_JS_CODE = `function validateRenavam(renavam) {
  if (!renavam) return false;
  
  // Limpeza de caracteres não numéricos
  const cleaned = String(renavam).replace(/\\D/g, "");
  
  // O RENAVAM deve ter exatamente 11 dígitos
  if (cleaned.length !== 11) {
    return false;
  }
  
  // Evita números com todos os dígitos iguais
  if (/^(\\d)\\1+$/.test(cleaned)) {
    return false;
  }
  
  const renavamWithoutDigit = cleaned.substring(0, 10);
  const digit = parseInt(cleaned.charAt(10));
  
  const renavamArr = renavamWithoutDigit.split("").reverse();
  let sum = 0;
  
  for (let i = 0; i < 8; i++) {
    sum += parseInt(renavamArr[i]) * (i + 2);
  }
  sum += parseInt(renavamArr[8]) * 2;
  sum += parseInt(renavamArr[9]) * 3;
  
  const mod = sum % 11;
  let calculatedDigit = 11 - mod;
  if (calculatedDigit >= 10) {
    calculatedDigit = 0;
  }
  
  return calculatedDigit === digit;
}`;

const RENAVAM_PYTHON_CODE = `import re

def validate_renavam(renavam: str) -> bool:
    if not renavam:
        return False
        
    # Limpeza de caracteres não numéricos
    cleaned = re.sub(r'\\D', '', str(renavam))
    
    # O RENAVAM deve ter exatamente 11 dígitos
    if len(cleaned) != 11:
        return False
        
    # Evita números com todos os dígitos iguais
    if cleaned == cleaned[0] * 11:
        return False
        
    renavam_without_digit = cleaned[:10]
    digit = int(cleaned[10])
    
    # Inverte os primeiros 10 dígitos
    renavam_arr = list(map(int, reversed(renavam_without_digit)))
    
    total_sum = 0
    for i in range(8):
        total_sum += renavam_arr[i] * (i + 2)
        
    total_sum += renavam_arr[8] * 2
    total_sum += renavam_arr[9] * 3
    
    mod = total_sum % 11
    calculated_digit = 11 - mod
    if calculated_digit >= 10:
        calculated_digit = 0
        
    return calculated_digit == digit`;

const RENAVAM_CSHARP_CODE = `using System;
using System.Text.RegularExpressions;
using System.Linq;

public static class RenavamValidator
{
    public static bool Validate(string renavam)
    {
        if (string.IsNullOrWhiteSpace(renavam))
            return false;

        // Limpeza de caracteres não numéricos
        string cleaned = Regex.Replace(renavam, @"[^\\d]", "");

        // O RENAVAM deve ter exatamente 11 dígitos
        if (cleaned.Length != 11)
            return false;

        // Evita números com todos os dígitos iguais
        if (cleaned.All(c => c == cleaned[0]))
            return false;

        string renavamWithoutDigit = cleaned.Substring(0, 10);
        int digit = cleaned[10] - '0';

        // Inverte a string
        char[] reversedChars = renavamWithoutDigit.ToCharArray();
        Array.Reverse(reversedChars);
        
        int sum = 0;
        for (int i = 0; i < 8; i++)
        {
            sum += (reversedChars[i] - '0') * (i + 2);
        }
        sum += (reversedChars[8] - '0') * 2;
        sum += (reversedChars[9] - '0') * 3;

        int mod = sum % 11;
        int calculatedDigit = 11 - mod;
        if (calculatedDigit >= 10)
        {
            calculatedDigit = 0;
        }

        return calculatedDigit == digit;
    }
}`;

const RENAVAM_JAVA_CODE = `public class RenavamValidator {
    public static boolean validate(String renavam) {
        if (renavam == null) {
            return false;
        }

        // Limpeza de caracteres não numéricos
        String cleaned = renavam.replaceAll("[^\\\\d]", "");

        // O RENAVAM deve ter exatamente 11 dígitos
        if (cleaned.length() != 11) {
            return false;
        }

        // Evita números com todos os dígitos iguais
        if (cleaned.matches("^(\\\\d)\\\\1{10}$")) {
            return false;
        }

        String renavamWithoutDigit = cleaned.substring(0, 10);
        int digit = Character.getNumericValue(cleaned.charAt(10));

        // Inverte a string de 10 caracteres
        String reversed = new StringBuilder(renavamWithoutDigit).reverse().toString();

        int sum = 0;
        for (int i = 0; i < 8; i++) {
            sum += Character.getNumericValue(reversed.charAt(i)) * (i + 2);
        }
        sum += Character.getNumericValue(reversed.charAt(8)) * 2;
        sum += Character.getNumericValue(reversed.charAt(9)) * 3;

        int mod = sum % 11;
        int calculatedDigit = 11 - mod;
        if (calculatedDigit >= 10) {
            calculatedDigit = 0;
        }

        return calculatedDigit == digit;
    }
}`;

export function RenavamGeneratorPage() {
    const [renavam, setRenavam] = useState<string>(() => formatRenavam(generateRenavam()))
    const [formatted, setFormatted] = useState(true)
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')
    const [bulkQuantity, setBulkQuantity] = useState<number>(5)

    const { isPro, limit } = useUser()

    const handleGenerate = (currentFormatted = formatted) => {
        const code = generateRenavam()
        setRenavam(currentFormatted ? formatRenavam(code) : code)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Veículos" }, { "label": "Renavam" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de RENAVAM</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere códigos RENAVAM válidos para testes de sistemas automotivos.
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
                            /* Single Generator Card */
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gerar RENAVAM</CardTitle>
                                    <CardDescription>
                                        Gera um número de RENAVAM válido com 11 dígitos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => {
                                                setFormatted(e.target.checked)
                                                handleGenerate(e.target.checked)
                                            }}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Formatar RENAVAM (XXXXXXXXXX-X)</Label>
                                    </div>

                                    {renavam && (
                                        <ToolResult
                                            result={renavam}
                                            toolId="renavam"
                                            toolName="RENAVAM"
                                            input={{ formatted }}
                                            successMessage="RENAVAM válido gerado com sucesso"
                                        />
                                    )}

                                    <Button onClick={() => handleGenerate()} className="w-full" size="lg">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Gerar RENAVAM
                                    </Button>
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
                                            const code = generateRenavam()
                                            return formatted ? formatRenavam(code) : code
                                        }}
                                        label="RENAVAMs"
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
                                        <Label htmlFor="formatted-bulk">Formatar RENAVAMs</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Configuration Manager */}
                    <div className="mt-8">
                        <Card>
                            <CardContent className="pt-6">
                                <ConfigurationManager
                                    toolId="renavam"
                                    currentConfig={{ formatted, activeTab, quantity: bulkQuantity }}
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
                            <CardTitle>Sobre o Gerador de RENAVAM</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O RENAVAM (Registro Nacional de Veículos Automotores) é um código único de 11 dígitos atribuído a cada veículo registrado no Brasil. Este número é essencial para identificação do veículo em transações, multas, licenciamento e documentação do DETRAN.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Nota:</strong> Os números gerados por esta ferramenta são matematicamente válidos mas fictícios, não correspondendo a veículos reais no cadastro da SENATRAN. Use apenas para homologação e testes de software.
                                </p>
                            </div>

                            <div className="pt-4 border-t">

                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de RENAVAM Online"
                                    description="Gere números de RENAVAM válidos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="renavam">
                        <CodeExamplesAccordion
                            examples={[
                                { language: "javascript", label: "JavaScript / TS", code: RENAVAM_JS_CODE },
                                { language: "python", label: "Python", code: RENAVAM_PYTHON_CODE },
                                { language: "csharp", label: "C#", code: RENAVAM_CSHARP_CODE },
                                { language: "java", label: "Java", code: RENAVAM_JAVA_CODE }
                            ]}
                        />
                    </ToolFaqSection>
                    <RelatedTools currentToolSlug="renavam" category="automotive" />
                </div>
            </main>
        </div>
    )
}
