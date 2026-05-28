"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ToolResult } from "@/components/tools/tool-result"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react"
import { generateTituloEleitor, validateTituloEleitor, formatTituloEleitor } from "@/lib/utils/validators/titulo-eleitor"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const TITULO_JS_CODE = `function validateTituloEleitor(titulo) {
  if (!titulo) return false;
  
  // Limpeza de caracteres não numéricos
  const cleaned = String(titulo).replace(/\\D/g, "");
  
  // O Título de Eleitor deve ter exatamente 12 dígitos
  if (cleaned.length !== 12) {
    return false;
  }
  
  const baseNumber = cleaned.substring(0, 8);
  const stateCode = cleaned.substring(8, 10);
  const checkDigits = cleaned.substring(10, 12);
  
  // Valida o código do estado (01 a 28)
  const stateCodeNum = parseInt(stateCode);
  if (stateCodeNum < 1 || stateCodeNum > 28) {
    return false;
  }
  
  // Cálculo do primeiro dígito verificador (D1)
  let sum1 = 0;
  for (let i = 0; i < 8; i++) {
    sum1 += parseInt(baseNumber[i]) * (i + 2);
  }
  const rest1 = sum1 % 11;
  const d1 = rest1 === 10 ? 0 : rest1;
  
  // Cálculo do segundo dígito verificador (D2)
  const v1 = parseInt(stateCode[0]);
  const v2 = parseInt(stateCode[1]);
  const v3 = d1;
  
  const sum2 = v1 * 7 + v2 * 8 + v3 * 9;
  const rest2 = sum2 % 11;
  const d2 = rest2 === 10 ? 0 : rest2;
  
  return checkDigits === \`\${d1}\${d2}\`;
}`;

const TITULO_PYTHON_CODE = `import re

def validate_titulo_eleitor(titulo: str) -> bool:
    if not titulo:
        return False
        
    # Limpeza de caracteres não numéricos
    cleaned = re.sub(r'\\D', '', str(titulo))
    
    # O Título de Eleitor deve ter exatamente 12 dígitos
    if len(cleaned) != 12:
        return False
        
    base_number = cleaned[0:8]
    state_code = cleaned[8:10]
    check_digits = cleaned[10:12]
    
    # Valida o código do estado (01 a 28)
    try:
        state_code_num = int(state_code)
    except ValueError:
        return False
        
    if state_code_num < 1 or state_code_num > 28:
        return False
        
    # Cálculo do primeiro dígito verificador (D1)
    sum1 = 0
    for i in range(8):
        sum1 += int(base_number[i]) * (i + 2)
    rest1 = sum1 % 11
    d1 = 0 if rest1 == 10 else rest1
    
    # Cálculo do segundo dígito verificador (D2)
    v1 = int(state_code[0])
    v2 = int(state_code[1])
    v3 = d1
    
    sum2 = v1 * 7 + v2 * 8 + v3 * 9
    rest2 = sum2 % 11
    d2 = 0 if rest2 == 10 else rest2
    
    return check_digits == f"{d1}{d2}"`;

const TITULO_CSHARP_CODE = `using System;
using System.Text.RegularExpressions;

public static class TituloEleitorValidator
{
    public static bool Validate(string titulo)
    {
        if (string.IsNullOrWhiteSpace(titulo))
            return false;

        // Limpeza de caracteres não numéricos
        string cleaned = Regex.Replace(titulo, @"[^\\d]", "");

        // O Título de Eleitor deve ter exatamente 12 dígitos
        if (cleaned.Length != 12)
            return false;

        string baseNumber = cleaned.Substring(0, 8);
        string stateCode = cleaned.Substring(8, 10);
        string checkDigits = cleaned.Substring(10, 12);

        // Valida o código do estado (01 a 28)
        if (!int.TryParse(stateCode, out int stateCodeNum) || stateCodeNum < 1 || stateCodeNum > 28)
        {
            return false;
        }

        // Cálculo do primeiro dígito verificador (D1)
        int sum1 = 0;
        for (int i = 0; i < 8; i++)
        {
            sum1 += (baseNumber[i] - '0') * (i + 2);
        }
        int rest1 = sum1 % 11;
        int d1 = rest1 == 10 ? 0 : rest1;

        // Cálculo do segundo dígito verificador (D2)
        int v1 = stateCode[0] - '0';
        int v2 = stateCode[1] - '0';
        int v3 = d1;

        int sum2 = v1 * 7 + v2 * 8 + v3 * 9;
        int rest2 = sum2 % 11;
        int d2 = rest2 == 10 ? 0 : rest2;

        return checkDigits == $"{d1}{d2}";
    }
}`;

const TITULO_JAVA_CODE = `public class TituloEleitorValidator {
    public static boolean validate(String titulo) {
        if (titulo == null) {
            return false;
        }

        // Limpeza de caracteres não numéricos
        String cleaned = titulo.replaceAll("[^\\\\d]", "");

        // O Título de Eleitor deve ter exatamente 12 dígitos
        if (cleaned.length() != 12) {
            return false;
        }

        String baseNumber = cleaned.substring(0, 8);
        String stateCode = cleaned.substring(8, 10);
        String checkDigits = cleaned.substring(10, 12);

        // Valida o código do estado (01 a 28)
        int stateCodeNum;
        try {
            stateCodeNum = Integer.parseInt(stateCode);
        } catch (NumberFormatException e) {
            return false;
        }

        if (stateCodeNum < 1 || stateCodeNum > 28) {
            return false;
        }

        // Cálculo do primeiro dígito verificador (D1)
        int sum1 = 0;
        for (int i = 0; i < 8; i++) {
            sum1 += Character.getNumericValue(baseNumber.charAt(i)) * (i + 2);
        }
        int rest1 = sum1 % 11;
        int d1 = rest1 == 10 ? 0 : rest1;

        // Cálculo do segundo dígito verificador (D2)
        int v1 = Character.getNumericValue(stateCode.charAt(0));
        int v2 = Character.getNumericValue(stateCode.charAt(1));
        int v3 = d1;

        int sum2 = v1 * 7 + v2 * 8 + v3 * 9;
        int rest2 = sum2 % 11;
        int d2 = rest2 == 10 ? 0 : rest2;

        return checkDigits.equals("" + d1 + d2);
    }
}`;

const STATES = [
    { uf: "AC", name: "Acre" },
    { uf: "AL", name: "Alagoas" },
    { uf: "AP", name: "Amapá" },
    { uf: "AM", name: "Amazonas" },
    { uf: "BA", name: "Bahia" },
    { uf: "CE", name: "Ceará" },
    { uf: "DF", name: "Distrito Federal" },
    { uf: "ES", name: "Espírito Santo" },
    { uf: "GO", name: "Goiás" },
    { uf: "MA", name: "Maranhão" },
    { uf: "MT", name: "Mato Grosso" },
    { uf: "MS", name: "Mato Grosso do Sul" },
    { uf: "MG", name: "Minas Gerais" },
    { uf: "PA", name: "Pará" },
    { uf: "PB", name: "Paraíba" },
    { uf: "PR", name: "Paraná" },
    { uf: "PE", name: "Pernambuco" },
    { uf: "PI", name: "Piauí" },
    { uf: "RJ", name: "Rio de Janeiro" },
    { uf: "RN", name: "Rio Grande do Norte" },
    { uf: "RS", name: "Rio Grande do Sul" },
    { uf: "RO", name: "Rondônia" },
    { uf: "RR", name: "Roraima" },
    { uf: "SC", name: "Santa Catarina" },
    { uf: "SP", name: "São Paulo" },
    { uf: "SE", name: "Sergipe" },
    { uf: "TO", name: "Tocantins" },
    { uf: "EXTERIOR", name: "Exterior" },
]

export function TituloEleitorPage() {
    const [selectedUF, setSelectedUF] = useState(STATES[0].uf)
    const [generatedTitulo, setGeneratedTitulo] = useState("")
    const [validateInput, setValidateInput] = useState("")
    const [validateResult, setValidateResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<"generate" | "validate" | "bulk">("generate")
    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const titulo = generateTituloEleitor(selectedUF)
        const formatted = formatTituloEleitor(titulo)
        setGeneratedTitulo(formatted)
    }

    const handleValidate = () => {
        const isValid = validateTituloEleitor(validateInput)
        setValidateResult(isValid)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Documentos Pessoais" }, { "label": "Título de Eleitor" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Gerador de Título de Eleitor</h1>
                        <p className="text-lg text-muted-foreground">
                            Gere e valide números de Título de Eleitor válidos para testes
                        </p>
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex gap-2 mb-6">
                        <Button
                            variant={activeTab === "generate" ? "default" : "outline"}
                            onClick={() => setActiveTab("generate")}
                        >
                            Gerar
                        </Button>
                        <Button
                            variant={activeTab === "validate" ? "default" : "outline"}
                            onClick={() => setActiveTab("validate")}
                        >
                            Validar
                        </Button>
                        <Button
                            variant={activeTab === "bulk" ? "default" : "outline"}
                            onClick={() => setActiveTab("bulk")}
                        >
                            Geração em Lote
                        </Button>
                    </div>

                    {/* Generate Section */}
                    {activeTab === "generate" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Título de Eleitor</CardTitle>
                                <CardDescription>
                                    Gere um número válido de Título de Eleitor por estado
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Estado de Origem</Label>
                                    <Select value={selectedUF} onValueChange={setSelectedUF}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {STATES.map((state) => (
                                                <SelectItem key={state.uf} value={state.uf}>
                                                    {state.uf} - {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {generatedTitulo && (
                                    <ToolResult
                                        result={generatedTitulo}
                                        toolId="titulo-eleitor"
                                        toolName="Título de Eleitor"
                                        input={{ uf: selectedUF }}
                                        successMessage="Título de Eleitor gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Título
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Validate Section */}
                    {activeTab === "validate" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Validar Título de Eleitor</CardTitle>
                                <CardDescription>
                                    Verifique se um número de Título de Eleitor é válido
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Número do Título</Label>
                                    <Input
                                        placeholder="0000 0000 0000"
                                        value={validateInput}
                                        onChange={(e) => setValidateInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleValidate()}
                                    />
                                </div>

                                {validateResult !== null && (
                                    <div
                                        className={`flex items-center gap-2 p-4 rounded-lg ${validateResult
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {validateResult ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span className="font-semibold">Título válido!</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5" />
                                                <span className="font-semibold">Título inválido</span>
                                            </>
                                        )}
                                    </div>
                                )}

                                <Button onClick={handleValidate} className="w-full">
                                    Validar Título
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bulk Section */}
                    {activeTab === "bulk" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Lote</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Estado de Origem</Label>
                                    <Select value={selectedUF} onValueChange={setSelectedUF}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {STATES.map((state) => (
                                                <SelectItem key={state.uf} value={state.uf}>
                                                    {state.uf} - {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <BulkGenerator
                                    generatorFn={() => formatTituloEleitor(generateTituloEleitor(selectedUF))}
                                    label="Título de Eleitor"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Info Card */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Sobre o Título de Eleitor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O Título de Eleitor é o documento que comprova que o cidadão está inscrito na Justiça Eleitoral do Brasil
                                    e está apto a exercer o direito de voto.
                                </p>
                                <p>
                                    O número é composto por 12 dígitos, sendo:
                                    <br />- 8 dígitos sequenciais
                                    <br />- 2 dígitos para o código do estado (UF)
                                    <br />- 2 dígitos verificadores
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números gerados são válidos apenas para testes e desenvolvimento.
                                    Não correspondem a documentos reais de cidadãos.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Título de Eleitor"
                                    description="Gere e valide números de Título de Eleitor para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* FAQ SEO Section */}
                    <div className="py-12 w-full">
                        <section className="space-y-6">
                            <div className="text-center space-y-2 mb-8">
                                <h2 className="text-3xl font-bold tracking-tight">Perguntas Frequentes</h2>
                                <p className="text-muted-foreground">Entenda como o gerador calcula formato, zonas eleitorais e os algarismos do documento.</p>
                            </div>
                            
                            <Accordion type="single" collapsible className="w-full bg-card border rounded-lg p-4 shadow-sm">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-left font-medium text-lg">O documento gerado tem valor civil na Justiça?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                        <strong>De forma alguma.</strong> Nossos geradores de dados fabricam dígitos a partir de matrizes matemáticas locais que servem exclusivamente para saltar barreiras de validação (<i>Front-End</i> e <i>Back-End</i>) e Regras de Negócio na hora em que o programador está testando os próprios formulários. Nenhum dos Títulos de Eleitor gerados pertence ao cadastro real do TSE. 
                                    </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-left font-medium text-lg">O que significam os dois últimos dígitos do Título de Eleitor?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                        Os últimos dois algarismos formam o <strong>dígito verificador</strong> ("Checksum"). A estrutura completa retém 12 números: os primeiros oito (8) representam o código sequencial único do eleitor, os dois sub-consequentes (nono e décimo) declaram o código do estado de origem (UF, selecionado no nosso painel acima), e os dois terminais blindam o código como uma chave inquebrável por chute, utilizando cálculo de mod 11.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-left font-medium text-lg">Para que usar um gerador de Título?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                        Ao construir ERPs de companhias de RH, agências bancárias ou softwares de admissão é recorrente a requisição do Título de Eleitor em cadastros "E2E". Para não expor repetidamente os dados verídicos e sensíveis dos Devs nos bancos de dados temporários de Homologação, é padrão da indústria automatizar e submeter massivamente <i>dados mockados limpos</i>. 
                                    </AccordionContent>
                                </AccordionItem>

                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: TITULO_JS_CODE },
                                        { language: "python", label: "Python", code: TITULO_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: TITULO_CSHARP_CODE },
                                        { language: "java", label: "Java", code: TITULO_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>
                        </section>
                    </div>

                    <div className="border-t pt-8">
                        <RelatedTools currentToolSlug="titulo-eleitor" category="documents" />
                    </div>
                </div>
            </main>

        </div>
    )
}
