"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

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

export function PhoneGeneratorPage() {
    const [phone, setPhone] = useState<string>("")
    const [type, setType] = useState<"mobile" | "landline">("mobile")
    const [formatted, setFormatted] = useState<boolean>(true)
    const { isPro, limit } = useUser()

    const generatePhone = (phoneType: "mobile" | "landline" = type, isFormatted: boolean = formatted): string => {
        const ddd = ddds[Math.floor(Math.random() * ddds.length)]

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

    const handleGenerate = () => {
        setPhone(generatePhone())
    }

    if (!phone) {
        handleGenerate()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Dados Pessoais", href: "/ferramentas-pessoais" },
                        { label: "Gerador de Telefone" }
                    ]} className="mb-6" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Telefone</h1>
                        <p className="text-muted-foreground">
                            Gere números de telefone celular e fixo brasileiros para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Telefone</CardTitle>
                                <CardDescription>Gere um único número de telefone</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <Label>Tipo</Label>
                                        <RadioGroup
                                            defaultValue="mobile"
                                            value={type}
                                            onValueChange={(v) => setType(v as any)}
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

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Com formatação</Label>
                                    </div>
                                </div>

                                {phone && (
                                    <ToolResult
                                        result={phone}
                                        toolId="phone"
                                        toolName="Telefone"
                                        input={{ type, formatted }}
                                        successMessage="Telefone gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
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
                                    generatorFn={() => generatePhone(type, formatted)}
                                    label="Telefones"
                                    limit={limit}
                                    isPro={isPro}
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
                                    O Gerador de Telefone cria números de celular e telefone fixo brasileiros com DDDs de todos os estados do Brasil, formatados ou apenas números limpos.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números são gerados dinamicamente seguindo os padrões e regras de prefixos brasileiros apenas para <strong>fins de teste e desenvolvimento de software</strong>. Eles não correspondem a linhas ativas reais.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Como funciona o gerador de telefone?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Nossa ferramenta escolhe aleatoriamente um DDD válido da lista de estados brasileiros e gera uma sequência numérica de acordo com o tipo escolhido: celulares sempre iniciam com o dígito 9 e possuem 9 dígitos após o DDD, enquanto telefones fixos são gerados com 8 dígitos iniciados de 2 a 5.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Qual o formato dos números de celular e fixo no Brasil?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Os números formatados de celular seguem o padrão <code>(DD) 9XXXX-XXXX</code> (total de 11 dígitos numéricos). Os números de telefone fixo utilizam o padrão <code>(DD) XXXX-XXXX</code> (total de 10 dígitos numéricos).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Posso usar estes números para cadastro real?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Não. Esses números são puramente fictícios e fictícios matematicamente. Se você tentar usá-los para criar contas reais, não receberá códigos de ativação por SMS ou chamadas de verificação, pois não há linhas de rede associadas a eles. Use apenas para simulação e QA.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Como gerar telefones em lote?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Utilize o card de **Geração em Massa** ao lado. Insira a quantidade desejada de telefones que deseja obter, e a ferramenta gerará uma lista completa contendo os números solicitados com ou sem formatação, pronta para ser copiada para planilhas ou arquivos de banco de dados.
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
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Telefone"
                                    description="Gere números de celular e telefone fixo brasileiros."
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
