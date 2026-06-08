"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToolResult } from "@/components/tools/tool-result"
import { generateIBAN, validateIBAN, formatIBAN } from "@/lib/utils/validators/iban"
import { CreditCard, CheckCircle2, XCircle } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const IBAN_JS_CODE = `function validateIBAN(iban) {
  const cleaned = iban.replace(/[\\s-]/g, "").toUpperCase();
  if (cleaned.length < 5) return false;

  const rearranged = cleaned.substring(4) + cleaned.substring(0, 4);
  let numeric = "";
  for (let i = 0; i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      numeric += (code - 55).toString(); // A=10, B=11...
    } else {
      numeric += rearranged[i];
    }
  }

  try {
    return BigInt(numeric) % 97n === 1n;
  } catch (e) {
    let checksum = numeric;
    while (checksum.length > 2) {
      const block = checksum.slice(0, 9);
      checksum = (parseInt(block, 10) % 97).toString() + checksum.slice(block.length);
    }
    return parseInt(checksum, 10) % 97 === 1;
  }
}`;

const IBAN_PYTHON_CODE = `def validate_iban(iban: str) -> bool:
    cleaned = iban.replace(" ", "").replace("-", "").upper()
    if len(cleaned) < 5:
        return False
        
    rearranged = cleaned[4:] + cleaned[:4]
    numeric = ""
    for char in rearranged:
        if char.isalpha():
            numeric += str(ord(char) - 55) # A=10, B=11...
        else:
            numeric += char
            
    return int(numeric) % 97 == 1`;

const IBAN_CSHARP_CODE = `using System;
using System.Numerics;
using System.Text.RegularExpressions;

public static class IBANValidator
{
    public static bool Validate(string iban)
    {
        string cleaned = Regex.Replace(iban ?? "", @"[\\s-]", "").ToUpper();
        if (cleaned.Length < 5) return false;

        string rearranged = cleaned.Substring(4) + cleaned.Substring(0, 4);
        string numeric = "";
        foreach (char c in rearranged)
        {
            if (char.IsLetter(c))
            {
                numeric += (c - 55).ToString(); // A=10, B=11...
            }
            else
            {
                numeric += c;
            }
        }

        if (BigInteger.TryParse(numeric, out BigInteger numVal))
        {
            return numVal % 97 == 1;
        }
        return false;
    }
}`;

const IBAN_JAVA_CODE = `import java.math.BigInteger;

public class IBANValidator {
    public static boolean validate(String iban) {
        if (iban == null) return false;
        String cleaned = iban.replace(" ", "").replace("-", "").toUpperCase();
        if (cleaned.length() < 5) return false;

        String rearranged = cleaned.substring(4) + cleaned.substring(0, 4);
        StringBuilder numeric = new StringBuilder();
        for (int i = 0; i < rearranged.length(); i++) {
            char c = rearranged.charAt(i);
            if (Character.isLetter(c)) {
                numeric.append(c - 55); // A=10, B=11...
            } else {
                numeric.append(c);
            }
        }

        try {
            BigInteger value = new BigInteger(numeric.toString());
            return value.mod(BigInteger.valueOf(97)).intValue() == 1;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}`;

export function IBANValidatorPage() {
    const [generatedIBAN, setGeneratedIBAN] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("BR")
    const [validationInput, setValidationInput] = useState("")
    const [validationResult, setValidationResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')

    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const iban = generateIBAN(selectedCountry)
        setGeneratedIBAN(formatIBAN(iban))
    }

    const handleValidate = () => {
        setValidationResult(validateIBAN(validationInput))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Financeiros" }, { "label": "Validador IBAN" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Validador de IBAN</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere e valide códigos IBAN (International Bank Account Number) para diversos países.
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
                                    <CardTitle>Gerar IBAN</CardTitle>
                                    <CardDescription>
                                        Gere um IBAN válido para testes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="country">País</Label>
                                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o país" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BR">Brasil (BR)</SelectItem>
                                                <SelectItem value="DE">Alemanha (DE)</SelectItem>
                                                <SelectItem value="FR">França (FR)</SelectItem>
                                                <SelectItem value="GB">Reino Unido (GB)</SelectItem>
                                                <SelectItem value="PT">Portugal (PT)</SelectItem>
                                                <SelectItem value="ES">Espanha (ES)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        Gerar IBAN
                                    </Button>

                                    {generatedIBAN && (
                                        <ToolResult
                                            result={generatedIBAN}
                                            toolId="iban"
                                            toolName="IBAN"
                                            input={{ country: selectedCountry }}
                                            successMessage="IBAN gerado com sucesso"
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
                                            const iban = generateIBAN(selectedCountry)
                                            return formatIBAN(iban)
                                        }}
                                        label="IBANs"
                                        limit={limit}
                                        isPro={isPro}
                                    />
                                    <div className="mt-4">
                                        <Label htmlFor="country-bulk">País</Label>
                                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Selecione o país" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BR">Brasil (BR)</SelectItem>
                                                <SelectItem value="DE">Alemanha (DE)</SelectItem>
                                                <SelectItem value="FR">França (FR)</SelectItem>
                                                <SelectItem value="GB">Reino Unido (GB)</SelectItem>
                                                <SelectItem value="PT">Portugal (PT)</SelectItem>
                                                <SelectItem value="ES">Espanha (ES)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Validator Card */}
                        {activeTab === 'single' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Validar IBAN</CardTitle>
                                    <CardDescription>
                                        Verifique se um código IBAN é válido
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="iban-input">IBAN para validar</Label>
                                        <Input
                                            id="iban-input"
                                            placeholder="BR00 0000 0000..."
                                            value={validationInput}
                                            onChange={(e) => setValidationInput(e.target.value)}
                                            className="font-mono uppercase"
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
                                                        <p className="font-semibold text-accent">IBAN Válido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este código IBAN é válido (checksum correto)
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <XCircle className="h-6 w-6 text-destructive" />
                                                    <div>
                                                        <p className="font-semibold text-destructive">IBAN Inválido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este código IBAN não é válido
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

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o IBAN e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O IBAN (International Bank Account Number) é um padrão internacional para identificar contas bancárias globais de maneira unificada e reduzir o risco de erros em transações internacionais.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota de Homologação:</strong> Esta ferramenta valida e gera códigos IBAN matematicamente corretos usando a regra do dígito verificador. Ela não faz chamadas ao sistema bancário para certificar se a conta de fato possui um correntista ativo.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Como é a estrutura de um código IBAN?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Um código IBAN tem comprimento variável (de até 34 caracteres alfanuméricos) dependendo do país. Ele é composto por:
                                        <ul className="list-disc pl-5 space-y-1 mt-2">
                                            <li><strong>Código do país:</strong> 2 letras (ex: BR, PT, DE).</li>
                                            <li><strong>Dígito verificador:</strong> 2 números calculados matematicamente.</li>
                                            <li><strong>BBAN (Basic Bank Account Number):</strong> Identificador local da conta bancária que inclui o código do banco, agência e conta.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como funciona a validação matemática do IBAN (Modulo 97)?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        A validação segue o padrão ISO 7064 (Mod 97-10). Para validar, movemos os 4 primeiros caracteres (país e dígitos verificadores) para o final do código, convertemos todas as letras em valores numéricos (A=10, B=11 ... Z=35) e efetuamos a operação <code>número % 97</code>. O resultado deve ser exatamente igual a 1 para o IBAN ser considerado válido.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Qual o tamanho do IBAN no Brasil?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        No Brasil, o IBAN é padronizado com **29 caracteres** alfanuméricos, iniciando sempre com <code>BR</code> nas duas primeiras posições, seguidos por 2 dígitos verificadores e os dados completos da conta bancária nacional.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como validar IBAN programaticamente? (Exemplos de Código)"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: IBAN_JS_CODE },
                                        { language: "python", label: "Python", code: IBAN_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: IBAN_CSHARP_CODE },
                                        { language: "java", label: "Java", code: IBAN_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Validador de IBAN"
                                    description="Gere e valide códigos IBAN (International Bank Account Number)."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="iban-validator" category="finance" />
                </div>
            </main>
        </div>
    )
}
