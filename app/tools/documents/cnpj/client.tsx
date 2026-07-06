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
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
                                        successMessage={valid ? "CNPJ válido gerado com sucesso" : "CNPJ inválido gerado com sucesso para testes de falha"}
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
                            <CardTitle>Sobre o Gerador de CNPJ e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O CNPJ (Cadastro Nacional da Pessoa Jurídica) é o identificador único das empresas brasileiras perante a Receita Federal.
                                    Nosso gerador cria CNPJs válidos matematicamente (tanto numéricos tradicionais quanto no novo formato alfanumérico).
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números gerados por esta ferramenta são <strong>aleatórios e válidos apenas para testes de software</strong> e desenvolvimento (mocks, automação QA, homologação). Não possuem vínculo cadastral real na Receita Federal.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Para que serve um gerador de CNPJ?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Ele é utilizado por programadores, testadores e analistas de qualidade (QA) para preencher campos obrigatórios de CNPJ de forma ágil em ambientes de testes e homologação local, sem expor dados reais de empresas.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>O que é o CNPJ Alfanumérico?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Devido ao esgotamento das combinações puramente numéricas, a Receita Federal do Brasil implementou uma nova regra que permite a inserção de letras de A a Z nas primeiras 8 posições do CNPJ (mantendo apenas números nas posições de ordem e dígitos verificadores). Nossa ferramenta já suporta o novo formato alfanumérico.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Qual a diferença entre CNPJ Matriz e Filial?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O CNPJ possui 14 dígitos. Os dígitos da 9ª à 12ª posição (logo após a barra) identificam a ordem do estabelecimento. A matriz de uma empresa sempre possui o código de ordem `0001` (ex: `/0001-xx`). As filiais da mesma empresa possuem ordens subsequentes como `0002`, `0003` e assim por diante. Nosso gerador permite selecionar explicitamente se você deseja obter um CNPJ de matriz ou filial para seus cenários de teste de faturamento.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Por que gerar um CNPJ inválido?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Ao construir formulários e integrações de APIs, é fundamental validar se o sistema rejeita corretamente dados corrompidos. Com a nossa ferramenta, você pode gerar um CNPJ inválido estruturalmente (com dígitos verificadores incorretos) para testar os caminhos de erro das suas validações e garantir a blindagem do seu código.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>Como é feito o cálculo do dígito verificador do CNPJ?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O CNPJ possui 14 dígitos, onde os dígitos 13 e 14 são os verificadores. O cálculo utiliza um módulo matemático com pesos específicos aplicados aos 12 primeiros caracteres. Na versão alfanumérica, as letras são convertidas para seus valores numéricos correspondentes (ASCII - 48).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger>Como validar o CNPJ Alfanumérico em Java, Python ou JavaScript?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground prose prose-sm max-w-none dark:prose-invert">
                                        <p>
                                            De acordo com a norma da Receita Federal, a validação do CNPJ alfanumérico mantém os mesmos pesos do cálculo tradicional. A única diferença é a conversão das letras nas 12 primeiras posições para números, utilizando a fórmula <code>Valor = Código ASCII do caractere - 48</code>.
                                        </p>
                                        <p>
                                            Nossos exemplos de código abaixo (em Java, Python, JavaScript e C#) já contemplam essa regra de forma otimizada. Por exemplo, em Java/C#, a conversão é feita nativamente subtraindo o char de &apos;0&apos; (ou ASCII 48), garantindo que tanto números (&apos;0&apos; a &apos;9&apos;) quanto letras (&apos;A&apos; a &apos;Z&apos;) tenham os valores corretos.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: CNPJ_JS_CODE },
                                        { language: "python", label: "Python", code: CNPJ_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: CNPJ_CSHARP_CODE },
                                        { language: "java", label: "Java", code: CNPJ_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Ferramentas Relacionadas:</Label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link href="/tools/documents/cpf" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                        📋 Gerador de CPF
                                    </Link>
                                    <Link href="/tools/documents/inscricao-estadual" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                        🏢 Gerador de Inscrição Estadual (IE)
                                    </Link>
                                </div>

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
                    <RelatedTools currentToolSlug="cnpj" category="documents" />
                </div>
            </main>


        </div>
    )
}
