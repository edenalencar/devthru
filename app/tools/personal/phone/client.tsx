"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw, AlertTriangle } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import Link from "next/link"

const PHONE_JS_CODE = `function generateBrPhone(type = "mobile", formatted = true) {
  const ddds = [11, 21, 31, 41, 51, 61, 71, 81, 91];
  const ddd = ddds[Math.floor(Math.random() * ddds.length)];
  
  let number = "";
  if (type === "mobile") {
    const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    number = \`9\${part1}\${part2}\`;
  } else {
    const firstDigit = Math.floor(Math.random() * 4) + 2; // 2 a 5
    const part1 = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    number = \`\${firstDigit}\${part1}\${part2}\`;
  }
  
  if (formatted) {
    return type === "mobile" 
      ? \`(\${ddd}) \${number.substring(0, 5)}-\${number.substring(5)}\`
      : \`(\${ddd}) \${number.substring(0, 4)}-\${number.substring(4)}\`;
  }
  return \`\${ddd}\${number}\`;
}`;

const PHONE_PYTHON_CODE = `import random

def generate_br_phone(phone_type="mobile", formatted=True):
    ddds = [11, 21, 31, 41, 51, 61, 71, 81, 91]
    ddd = random.choice(ddds)
    
    if phone_type == "mobile":
        part1 = f"{random.randint(0, 9999):04d}"
        part2 = f"{random.randint(0, 9999):04d}"
        number = f"9{part1}{part2}"
    else:
        first = random.randint(2, 5)
        part1 = f"{random.randint(0, 999):03d}"
        part2 = f"{random.randint(0, 9999):04d}"
        number = f"{first}{part1}{part2}"
        
    if formatted:
        if phone_type == "mobile":
            return f"({ddd}) {number[:5]}-{number[5:]}"
        else:
            return f"({ddd}) {number[:4]}-{number[4:]}"
            
    return f"{ddd}{number}"`;

const PHONE_CSHARP_CODE = `using System;

public static class PhoneGenerator
{
    private static readonly int[] Ddds = { 11, 21, 31, 41, 51, 61, 71, 81, 91 };
    private static readonly Random Rand = new Random();

    public static string Generate(string type = "mobile", bool formatted = true)
    {
        int ddd = Ddds[Rand.Next(Ddds.Length)];
        string number = "";

        if (type == "mobile")
        {
            number = "9" + Rand.Next(10000).ToString("D4") + Rand.Next(10000).ToString("D4");
        }
        else
        {
            int first = Rand.Next(4) + 2; // 2 a 5
            number = first.ToString() + Rand.Next(1000).ToString("D3") + Rand.Next(10000).ToString("D4");
        }

        if (formatted)
        {
            return type == "mobile"
                ? $"({ddd}) {number.Substring(0, 5)}-{number.Substring(5)}"
                : $"({ddd}) {number.Substring(0, 4)}-{number.Substring(4)}";
        }
        return $"{ddd}{number}";
    }
}`;

const PHONE_JAVA_CODE = `import java.util.Random;

public class PhoneGenerator {
    private static final int[] DDDS = { 11, 21, 31, 41, 51, 61, 71, 81, 91 };
    private static final Random RAND = new Random();

    public static String generate(String type, boolean formatted) {
        int ddd = DDDS[RAND.nextInt(DDDS.length)];
        String number;

        if ("mobile".equals(type)) {
            number = "9" + String.format("%04d", RAND.nextInt(10000)) + String.format("%04d", RAND.nextInt(10000));
        } else {
            int first = RAND.nextInt(4) + 2; // 2 a 5
            number = String.valueOf(first) + String.format("%03d", RAND.nextInt(1000)) + String.format("%04d", RAND.nextInt(10000));
        }

        if (formatted) {
            return "mobile".equals(type)
                ? String.format("(%d) %s-%s", ddd, number.substring(0, 5), number.substring(5))
                : String.format("(%d) %s-%s", ddd, number.substring(0, 4), number.substring(4));
        }
        return String.valueOf(ddd) + number;
    }
}`;

const ddds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
    21, 22, 24, // RJ
    27, 28, // ES
    31, 32, 33, 34, 35, 37, 38, // MG
    41, 42, 43, 44, 45, 46, // PR
    47, 48, 49, // SC
    51, 53, 54, 55, // RS
    61, // DF
    62, 64, // GO
    71, 73, 74, 75, 77, // BA
    81, 87, // PE
    85, 88, // CE
    91, 93, 94, // PA
    92, 97, // AM
    98, 99 // MA
]

function generatePhone(
    phoneType: "mobile" | "landline" = "mobile",
    isFormatted: boolean = true,
    selectedCountry: "BR" | "US" = "BR",
    selectedState: string = "all"
): string {
    if (selectedCountry === "US") {
        const areaCodes = [201, 202, 212, 305, 312, 415, 602, 702, 808, 901]
        const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)]
        const part1 = Math.floor(Math.random() * 900) + 100 // 100 to 999
        const part2 = Math.floor(Math.random() * 9000) + 1000 // 1000 to 9999
        if (isFormatted) {
            return `+1 (${areaCode}) ${part1}-${part2}`
        }
        return `1${areaCode}${part1}${part2}`
    }

    const dddsByState: Record<string, number[]> = {
        SP: [11, 12, 13, 14, 15, 16, 17, 18, 19],
        RJ: [21, 22, 24],
        MG: [31, 32, 33, 34, 35, 37, 38],
        PR: [41, 42, 43, 44, 45, 46],
        SC: [47, 48, 49],
        RS: [51, 53, 54, 55],
        BA: [71, 73, 74, 75, 77],
        PE: [81, 87],
        CE: [85, 88],
        DF: [61]
    }

    let dddList = ddds
    if (selectedState !== "all" && dddsByState[selectedState]) {
        dddList = dddsByState[selectedState]
    }
    const ddd = dddList[Math.floor(Math.random() * dddList.length)]

    let number = ""
    if (phoneType === "mobile") {
        // Mobile: 9XXXX-XXXX
        const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
        const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
        number = `9${part1}${part2}`
    } else {
        // Landline: [2-5]XXX-XXXX
        const firstDigit = Math.floor(Math.random() * 4) + 2 // 2 to 5
        const part1 = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
        const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
        number = `${firstDigit}${part1}${part2}`
    }

    if (isFormatted) {
        const n = number
        if (phoneType === "mobile") {
            return `(${ddd}) ${n.substring(0, 5)}-${n.substring(5)}`
        } else {
            return `(${ddd}) ${n.substring(0, 4)}-${n.substring(4)}`
        }
    }

    return `${ddd}${number}`
}

export function PhoneGeneratorPage() {
    const [type, setType] = useState<"mobile" | "landline">("mobile")
    const [formatted, setFormatted] = useState<boolean>(true)
    const [country, setCountry] = useState<"BR" | "US">("BR")
    const [state, setState] = useState<string>("all")
    const [phone, setPhone] = useState<string>(() => generatePhone("mobile", true, "BR", "all"))
    const [bulkQuantity, setBulkQuantity] = useState<number>(5)
    const { isPro, limit } = useUser()

    const handleGenerate = (currentType = type, currentFormatted = formatted, currentCountry = country, currentState = state) => {
        setPhone(generatePhone(currentType, currentFormatted, currentCountry, currentState))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8 max-w-7xl px-4">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Dados Pessoais", href: "/ferramentas-pessoais" },
                        { label: "Gerador de Telefone" }
                    ]} className="mb-6" />
                    
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Telefone e Celular</h1>
                        <p className="text-muted-foreground">
                            Gere números de telefone celular e fixo do Brasil (com DDD por estado) e dos Estados Unidos (EUA) para testes.
                        </p>
                    </div>

                    {/* SMS Warning Alert */}
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-950/10 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
                        <div>
                            <p className="font-semibold text-sm text-amber-900 dark:text-amber-200">Aviso Importante sobre SMS</p>
                            <p className="text-xs mt-1 text-amber-800 dark:text-amber-300 leading-relaxed">
                                Esta ferramenta gera números de telefone <strong>fictícios para testes de desenvolvimento e design (mocks)</strong>. Ela <strong>NÃO</strong> recebe chamadas ou mensagens SMS reais. Se você precisa de um número temporário para receber códigos de ativação do WhatsApp, Telegram ou outras plataformas, este gerador de números estáticos não servirá.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Telefone</CardTitle>
                                <CardDescription>Gere um único número de telefone</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>País / Região</Label>
                                            <Select value={country} onValueChange={(val: "BR" | "US") => {
                                                setCountry(val)
                                                handleGenerate(type, formatted, val, state)
                                            }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o país" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="BR">Brasil (+55)</SelectItem>
                                                    <SelectItem value="US">Estados Unidos (+1)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {country === "BR" && (
                                            <div className="space-y-2">
                                                <Label>Estado (DDD)</Label>
                                                <Select value={state} onValueChange={(val) => {
                                                    setState(val)
                                                    handleGenerate(type, formatted, country, val)
                                                }}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o estado" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">Aleatório (Qualquer)</SelectItem>
                                                        <SelectItem value="SP">São Paulo (SP)</SelectItem>
                                                        <SelectItem value="RJ">Rio de Janeiro (RJ)</SelectItem>
                                                        <SelectItem value="MG">Minas Gerais (MG)</SelectItem>
                                                        <SelectItem value="PR">Paraná (PR)</SelectItem>
                                                        <SelectItem value="SC">Santa Catarina (SC)</SelectItem>
                                                        <SelectItem value="RS">Rio Grande do Sul (RS)</SelectItem>
                                                        <SelectItem value="BA">Bahia (BA)</SelectItem>
                                                        <SelectItem value="PE">Pernambuco (PE)</SelectItem>
                                                        <SelectItem value="CE">Ceará (CE)</SelectItem>
                                                        <SelectItem value="DF">Distrito Federal (DF)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </div>

                                    {country === "BR" && (
                                        <div className="space-y-3">
                                            <Label>Tipo de Linha</Label>
                                            <RadioGroup
                                                defaultValue="mobile"
                                                value={type}
                                                onValueChange={(v) => {
                                                    const val = v as "mobile" | "landline"
                                                    setType(val)
                                                    handleGenerate(val, formatted, country, state)
                                                }}
                                                className="flex space-x-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="mobile" id="mobile" />
                                                    <Label htmlFor="mobile">Celular</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="landline" id="landline" />
                                                    <Label htmlFor="landline">Fixo</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => {
                                                setFormatted(e.target.checked)
                                                handleGenerate(type, e.target.checked, country, state)
                                            }}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Com formatação visual</Label>
                                    </div>
                                </div>

                                {phone && (
                                    <ToolResult
                                        result={phone}
                                        toolId="phone"
                                        toolName="Telefone"
                                        input={{ type, formatted, country, state }}
                                        successMessage="Telefone gerado com sucesso"
                                    />
                                )}

                                <Button onClick={() => handleGenerate()} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Telefone
                                </Button>
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
                                    generatorFn={() => generatePhone(type, formatted, country, state)}
                                    label="Telefones"
                                    limit={limit}
                                    isPro={isPro}
                                    quantity={bulkQuantity}
                                    onQuantityChange={setBulkQuantity}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Configuration Manager */}
                    <div className="mt-8">
                        <Card>
                            <CardContent className="pt-6">
                                <ConfigurationManager
                                    toolId="phone"
                                    currentConfig={{ formatted, country, state, type, quantity: bulkQuantity }}
                                    onLoadConfig={(config) => {
                                        if (config.formatted !== undefined) {
                                            setFormatted(config.formatted)
                                        }
                                        if (config.country) {
                                            setCountry(config.country)
                                        }
                                        if (config.state) {
                                            setState(config.state)
                                        }
                                        if (config.type) {
                                            setType(config.type)
                                        }
                                        if (config.quantity) {
                                            setBulkQuantity(config.quantity)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Telefone e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O <strong>Gerador de Telefone e Celular do DevThru</strong> cria números válidos de acordo com as especificações oficiais da Anatel (Agência Nacional de Telecomunicações) para todos os 67 DDDs do Brasil e também números do Plano de Numeração da América do Norte (NANP - EUA), com formatação padrão ou apenas dígitos limpos.
                                </p>
                                <div className="p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between gap-3">
                                    <span>
                                        💡 <strong>Quer implementar a validação em seu projeto?</strong> Confira nosso guia completo sobre como validar e formatar telefones com Regex em TypeScript e Python.
                                    </span>
                                    <Link
                                        href="/blog/como-validar-formatar-telefone-celular-brasil-ddd"
                                        className="font-semibold underline shrink-0 hover:text-primary transition-colors"
                                    >
                                        Ler Guia Técnico →
                                    </Link>
                                </div>
                                <p className="text-amber-600 dark:text-amber-400 text-xs">
                                    <strong>Atenção:</strong> Os números são gerados dinamicamente seguindo os padrões e regras de prefixos oficiais apenas para <strong>fins de teste e desenvolvimento de software</strong> (mocks, automação QA, testes de API e formulários). Eles não correspondem a linhas ativas reais.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Como funciona o gerador de telefone e celular?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Nossa ferramenta seleciona um DDD válido entre os 67 códigos de área brasileiros (ou código de área dos EUA) e monta a sequência numérica segundo a regulamentação: celulares no Brasil sempre iniciam com o dígito 9 e possuem 9 dígitos após o DDD (formato <code>(XX) 9XXXX-XXXX</code>), enquanto telefones fixos possuem 8 dígitos com prefixos de 2 a 5 (formato <code>(XX) XXXX-XXXX</code>).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Qual é a regra do nono dígito (9) no celular brasileiro?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Instituído pela Resolução nº 553/2010 da Anatel, o nono dígito é obrigatório em todas as linhas móveis do território nacional. Ele padronizou os números de celular com 11 algarismos (2 dígitos do DDD + dígito 9 + 8 dígitos da linha). Além disso, o segundo dígito após o 9 sempre pertence ao intervalo de 6 a 9 (ex: 96xxx, 97xxx, 98xxx ou 99xxx).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Qual a diferença entre telefone celular e telefone fixo no Brasil?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        A principal diferença estrutural está na quantidade de dígitos e nos prefixos:
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li><strong>Celular (Móvel):</strong> 11 dígitos no total com DDD. O primeiro dígito após o DDD é obrigatoriamente 9 e o segundo dígito varia de 6 a 9.</li>
                                            <li><strong>Telefone Fixo (STFC):</strong> 10 dígitos no total com DDD. O primeiro dígito após o DDD varia obrigatoriamente de 2 a 5.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Quais DDDs são suportados pela ferramenta?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        A ferramenta suporta todos os 67 DDDs oficiais do Brasil distribuídos em todas as regiões:
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li><strong>Sudeste:</strong> SP (11 a 19), RJ (21, 22, 24), ES (27, 28), MG (31 a 35, 37, 38).</li>
                                            <li><strong>Sul:</strong> PR (41 a 46), SC (47 a 49), RS (51, 53 a 55).</li>
                                            <li><strong>Centro-Oeste:</strong> DF (61), GO (62, 64), TO (63), MT (65, 66), MS (67).</li>
                                            <li><strong>Nordeste:</strong> BA (71, 73 a 75, 77), SE (79), PE (81, 87), AL (82), PB (83), RN (84), CE (85, 88), PI (86, 89), MA (98, 99).</li>
                                            <li><strong>Norte:</strong> PA (91, 93, 94), AM (92, 97), RR (95), AP (96), AC (68), RO (69).</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>Posso usar estes números para receber SMS de confirmação ou WhatsApp?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        <strong>Não.</strong> Esses números são fictícios e gerados por algoritmos matemáticos diretamente no seu navegador. Como não estão vinculados a chips físicos (SIM cards) ou operadoras de telefonia ativas, não é possível receber mensagens SMS, chamadas ou códigos de verificação neles. Eles servem exclusivamente para testar validações em formulários, APIs e bancos de dados.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger>Como gerar números de telefone em lote?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Basta utilizar a seção de <strong>Geração em Massa</strong> acima. Informe a quantidade desejada de números e clique em Gerar. Você poderá copiar a lista completa com ou sem formatação, ideal para alimentar planilhas, seeders de testes e migrações de dados.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: PHONE_JS_CODE },
                                        { language: "python", label: "Python", code: PHONE_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: PHONE_CSHARP_CODE },
                                        { language: "java", label: "Java", code: PHONE_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Ferramentas Relacionadas:</Label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link href="/tools/personal/name" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                        👤 Gerador de Nomes
                                    </Link>
                                    <Link href="/tools/personal/person" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                        👥 Gerador de Pessoas (Dados Completos)
                                    </Link>
                                    <Link href="/tools/documents/cpf" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                        📋 Gerador de CPF
                                    </Link>
                                    <Link href="/tools/documents/rg" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                        🪪 Gerador de RG
                                    </Link>
                                </div>

                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Telefone"
                                    description="Gere números de celular e telefone fixo brasileiros e americanos."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="phone" category="personal" />
                </div>
            </main>
        </div>
    )
}
