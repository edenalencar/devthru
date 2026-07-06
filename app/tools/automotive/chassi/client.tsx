"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { BulkGenerator } from '@/components/tools/bulk-generator'
import { useUser } from '@/lib/hooks/use-user'
import { getPlanLimitMessage } from "@/lib/constants"

const CHASSI_JS_CODE = `function validateVIN(vin) {
  const cleaned = vin.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (cleaned.length !== 17) return false;

  // Caracteres I, O, Q são ilegais no VIN
  if (/[IOQ]/.test(cleaned)) return false;

  const values = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2,
    'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
  };

  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const char = cleaned[i];
    sum += (values[char] || 0) * weights[i];
  }

  const remainder = sum % 11;
  const checkDigit = remainder === 10 ? 'X' : remainder.toString();

  return cleaned[8] === checkDigit;
}`;

const CHASSI_PYTHON_CODE = `import re

def validate_vin(vin: str) -> bool:
    cleaned = re.sub(r'[^A-Z0-9]', '', vin.upper())
    if len(cleaned) != 17:
        return False
        
    # Caracteres I, O, Q são proibidos no VIN
    if any(char in cleaned for char in 'IOQ'):
        return False

    values = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2,
        'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
    }

    weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

    total_sum = sum(values[cleaned[i]] * weights[i] for i in range(17))
    remainder = total_sum % 11
    check_digit = 'X' if remainder == 10 else str(remainder)

    return cleaned[8] == check_digit`;

const CHASSI_CSHARP_CODE = `using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public static class VINValidator
{
    private static readonly Dictionary<char, int> Values = new Dictionary<char, int>
    {
        {'A', 1}, {'B', 2}, {'C', 3}, {'D', 4}, {'E', 5}, {'F', 6}, {'G', 7}, {'H', 8},
        {'J', 1}, {'K', 2}, {'L', 3}, {'M', 4}, {'N', 5}, {'P', 7}, {'R', 9}, {'S', 2},
        {'T', 3}, {'U', 4}, {'V', 5}, {'W', 6}, {'X', 7}, {'Y', 8}, {'Z', 9},
        {'0', 0}, {'1', 1}, {'2', 2}, {'3', 3}, {'4', 4}, {'5', 5}, {'6', 6}, {'7', 7}, {'8', 8}, {'9', 9}
    };

    private static readonly int[] Weights = { 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 };

    public static bool Validate(string vin)
    {
        if (string.IsNullOrEmpty(vin)) return false;
        string cleaned = Regex.Replace(vin.ToUpper(), @"[^A-Z0-9]", "");
        
        if (cleaned.Length != 17 || cleaned.IndexOfAny(new[] { 'I', 'O', 'Q' }) != -1)
            return false;

        int sum = 0;
        for (int i = 0; i < 17; i++)
        {
            if (!Values.TryGetValue(cleaned[i], out int val))
                return false;
            sum += val * Weights[i];
        }

        int remainder = sum % 11;
        char checkDigit = remainder == 10 ? 'X' : (char)(remainder + '0');

        return cleaned[8] == checkDigit;
    }
}`;

const CHASSI_JAVA_CODE = `import java.util.HashMap;
import java.util.Map;

public class VINValidator {
    private static final Map<Character, Integer> VALUES = new HashMap<>();
    private static final int[] WEIGHTS = { 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 };

    static {
        char[] chars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789".toCharArray();
        int[] vals = { 
            1, 2, 3, 4, 5, 6, 7, 8, // A-H
            1, 2, 3, 4, 5, 7, 9, 2, // J-S
            3, 4, 5, 6, 7, 8, 9,    // T-Z
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9 // 0-9
        };
        for (int i = 0; i < chars.length; i++) {
            VALUES.put(chars[i], vals[i]);
        }
    }

    public static boolean validate(String vin) {
        if (vin == null) return false;
        String cleaned = vin.toUpperCase().replaceAll("[^A-Z0-9]", "");
        if (cleaned.length() != 17) return false;
        if (cleaned.contains("I") || cleaned.contains("O") || cleaned.contains("Q")) return false;

        int sum = 0;
        for (int i = 0; i < 17; i++) {
            Character c = cleaned.charAt(i);
            if (!VALUES.containsKey(c)) return false;
            sum += VALUES.get(c) * WEIGHTS[i];
        }

        int remainder = sum % 11;
        char checkDigit = remainder == 10 ? 'X' : Character.forDigit(remainder, 10);

        return cleaned.charAt(8) == checkDigit;
    }
}`;

function generateSingleChassis(vehicleType: "all" | "car" | "motorcycle" | "truck" = "all"): string {
    // WMI (World Manufacturer Identifier) - 3 chars
    let wmis = ["9BW", "9BD", "9BG", "93H", "936", "935", "9BF", "94D", "9C2", "9CD", "9BM", "93Y"]
    if (vehicleType === "car") {
        wmis = ["9BW", "9BD", "9BG", "93H", "936", "935", "9BF", "94D"]
    } else if (vehicleType === "motorcycle") {
        wmis = ["9C2", "9CD", "9C9"]
    } else if (vehicleType === "truck") {
        wmis = ["9BM", "93Y", "9BS"]
    }
    
    const wmi = wmis[Math.floor(Math.random() * wmis.length)]

    // VDS (Vehicle Descriptor Section) - 5 chars (Euclidean random)
    const alphaNum = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"
    let vds = ""
    for (let i = 0; i < 5; i++) {
        vds += alphaNum[Math.floor(Math.random() * alphaNum.length)]
    }
    const checkDigitPlaceholder = "0"

    // VIS (Vehicle Identifier Section) - 8 chars
    // 10th char is Year Code (L=2020, M=2021, N=2022, P=2023, R=2024, S=2025)
    const yearCodes = "LMNPRS"
    const yearCode = yearCodes[Math.floor(Math.random() * yearCodes.length)]

    // 11th char is Plant Code
    const plantCode = alphaNum[Math.floor(Math.random() * alphaNum.length)]

    // 12th-17th are sequential numbers
    let sequential = ""
    for (let i = 0; i < 6; i++) {
        sequential += Math.floor(Math.random() * 10).toString()
    }

    const vis = yearCode + plantCode + sequential

    // Calculate Check Digit (9th position)
    const values: { [key: string]: number } = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2,
        'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
    }

    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

    const tempVin = wmi + vds + checkDigitPlaceholder + vis
    let sum = 0
    for (let i = 0; i < 17; i++) {
        if (i === 8) continue // Skip check digit position in sum
        const char = tempVin[i]
        sum += values[char] * weights[i]
    }

    const remainder = sum % 11
    let checkDigit = ""
    if (remainder === 10) checkDigit = "X"
    else checkDigit = remainder.toString()

    return wmi + vds + checkDigit + vis
}

export function ChassiGeneratorPage() {
    const [chassis, setChassis] = useState("")
    const [vehicleType, setVehicleType] = useState<"all" | "car" | "motorcycle" | "truck">("all")
    const [activeTab, setActiveTab] = useState<"generate" | "bulk">("generate")
    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const vin = generateSingleChassis(vehicleType)
        setChassis(vin)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copiado para a área de transferência")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Veículos" }, { "label": "Chassi" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Car className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Chassi de Veículos (VIN)</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere códigos de chassi fictício e válido (VIN) para testes de sistemas automotivos.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6">
                        <Button
                            variant={activeTab === 'generate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('generate')}
                        >
                            Gerar Chassi
                        </Button>
                        <Button
                            variant={activeTab === 'bulk' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Geração em Lote
                        </Button>
                    </div>

                    {/* Individual Generator Tab */}
                    {activeTab === 'generate' && (
                        <div className="grid gap-8 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuração do Chassi (VIN)</CardTitle>
                                    <CardDescription>
                                        Gera um código VIN válido de 17 caracteres seguindo o padrão internacional ISO 3779.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Tipo de Veículo</Label>
                                        <Select value={vehicleType} onValueChange={(val: "all" | "car" | "motorcycle" | "truck") => setVehicleType(val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todos (Aleatório)</SelectItem>
                                                <SelectItem value="car">Carro (Automóvel)</SelectItem>
                                                <SelectItem value="motorcycle">Moto (Motocicleta)</SelectItem>
                                                <SelectItem value="truck">Caminhão / Ônibus</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Gerar Chassi
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resultado</CardTitle>
                                    <CardDescription>
                                        Chassi gerado para o ambiente de testes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {chassis ? (
                                        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/50">
                                            <div className="text-3xl font-mono font-bold tracking-wider mb-6 break-all text-center">
                                                {chassis}
                                            </div>
                                            <Button variant="outline" onClick={() => copyToClipboard(chassis)}>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Copiar
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-lg border-dashed">
                                            <Car className="h-12 w-12 mb-2 opacity-20" />
                                            <p>Clique em gerar para começar</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Bulk Generator Tab */}
                    {activeTab === 'bulk' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Lote</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2 max-w-md mb-4">
                                    <Label>Tipo de Veículo para o Lote</Label>
                                    <Select value={vehicleType} onValueChange={(val: "all" | "car" | "motorcycle" | "truck") => setVehicleType(val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos (Aleatório)</SelectItem>
                                            <SelectItem value="car">Carro (Automóvel)</SelectItem>
                                            <SelectItem value="motorcycle">Moto (Motocicleta)</SelectItem>
                                            <SelectItem value="truck">Caminhão / Ônibus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <BulkGenerator
                                    generatorFn={() => generateSingleChassis(vehicleType)}
                                    label="Chassi (VIN)"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* FAQ & Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <h2 className="text-2xl font-semibold leading-none tracking-tight">Perguntas Frequentes sobre Chassi de Veículos</h2>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>O que é o Chassi do Veículo (Código VIN)?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <p>
                                                O número de chassi, também conhecido como VIN (Vehicle Identification Number), é um código único de 17 caracteres que identifica cada veículo fabricado no mundo. É como se fosse o &quot;CPF&quot; ou RG do veículo.
                                            </p>
                                            <h4 className="font-semibold mt-2">Estrutura do VIN:</h4>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li><strong>WMI (1-3):</strong> Identificador do fabricante mundial (World Manufacturer Identifier).</li>
                                                <li><strong>VDS (4-9):</strong> Seção descritiva do veículo (modelo, motor, tipo de carroceria).</li>
                                                <li><strong>VIS (10-17):</strong> Seção indicadora do veículo (ano de fabricação, código da planta fabril e número de série).</li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>É possível gerar um chassi fictício válido?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <p>
                                                <strong>Sim.</strong> O nosso **gerador de chassi de veículos** utiliza a regra matemática e o padrão internacional ISO 3779 para criar um código com 17 dígitos onde o nono dígito (dígito verificador) é precisamente calculado com base em pesos pré-definidos.
                                            </p>
                                            <p>
                                                Dessa forma, você obtém um chassi fictício, porém estruturalmente idêntico e válido para passar pelas validações de formulários de software e banco de dados.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Como usar este gerador de chassi para testes de software?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            <p>
                                                Para desenvolvedores, QAs (Analistas de Qualidade) e equipes de TI, testar formulários de cadastro de frotas de ERPs, seguradoras e sistemas automotivos exige dados em formato realista.
                                            </p>
                                            <p>
                                                Basta clicar no botão **&quot;Gerar Chassi&quot;** (ou utilizar a aba **&quot;Geração em Lote&quot;** para obter múltiplos códigos) e copiar o código de 17 caracteres oferecido. Nós aplicamos cálculos para garantir que softwares de validação de concessionárias e detrans o validem corretamente nos testes de homologação.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Por que as letras I, O e Q não são permitidas no número de chassi (VIN)?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                            <p>
                                                De acordo com a norma internacional ISO 3779, as letras <strong>I (i)</strong>, <strong>O (o)</strong> e <strong>Q (q)</strong> são estritamente proibidas em qualquer número de chassi. 
                                            </p>
                                            <p>
                                                Essa restrição existe para evitar fraudes e erros de leitura humana ou de escaneamento ótico (OCR), pois a letra <strong>I</strong> pode ser facilmente confundida com o número <strong>1</strong>, e as letras <strong>O</strong> e <strong>Q</strong> com o número <strong>0</strong>. Nosso gerador de chassi segue rigorosamente essa especificação internacional.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>Como o chassi de moto se diferencia do de carro?</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                            <p>
                                                A principal diferença está no código WMI (os 3 primeiros dígitos do VIN). No Brasil:
                                            </p>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li><strong>Carros:</strong> Normalmente utilizam WMIs como `9BW` (Volkswagen), `9BD` (Fiat) ou `9BG` (General Motors).</li>
                                                <li><strong>Motos:</strong> Frequentemente utilizam o prefixo `9C` (como `9C2` para Honda e `9CD` para Yamaha).</li>
                                            </ul>
                                            <p>
                                                Ambos os tipos de veículos seguem a mesma regra matemática de verificação no 9º dígito. Nosso gerador permite selecionar a categoria específica do veículo para trazer mais realismo às suas simulações de homologação.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: CHASSI_JS_CODE },
                                        { language: "python", label: "Python", code: CHASSI_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: CHASSI_CSHARP_CODE },
                                        { language: "java", label: "Java", code: CHASSI_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="prose prose-sm max-w-none dark:prose-invert pt-4">
                                <p className="text-sm text-muted-foreground border-l-4 border-muted pl-4">
                                    <strong>Nota de isenção de responsabilidade:</strong> Os códigos gerados por esta ferramenta são matematicamente válidos mas totalmente <strong>fictícios</strong>, criados aleatoriamente. Não correspondem e não identificam veículos reais em circulação. Utilize a ferramenta exclusivamente para fins acadêmicos, desenvolvimento e testes de software.
                                </p>
                            </div>

                            <div className="pt-6 border-t mt-6 space-y-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground mb-2 block">Ferramentas Relacionadas:</Label>
                                    <div className="flex flex-wrap gap-2">
                                        <Link href="/tools/automotive/license-plate" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                            🚗 Gerador de Placa Mercosul e Antiga
                                        </Link>
                                        <Link href="/tools/automotive/renavam" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium">
                                            📋 Gerador de Renavam
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta utilitária:</Label>
                                    <ShareButtons
                                        title="Gerador de Chassi de Veículos Online"
                                        description="Gere um chassi fictício e código VIN válido rapidamente para testes de software."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="chassi" category="automotive" customSlugs={['license-plate', 'renavam', 'fipe', 'cnh']} />
                </div>
            </main>

            <Footer />
        </div>
    )
}
