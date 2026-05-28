'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ToolResult } from '@/components/tools/tool-result'
import { BulkGenerator } from '@/components/tools/bulk-generator'
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react'
import { generatePIS, validatePIS, formatPIS } from '@/lib/utils/validators/pis'
import { ShareButtons } from "@/components/share-buttons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RelatedTools } from "@/components/tools/related-tools"
import { useUser } from '@/lib/hooks/use-user'
import { getPlanLimitMessage } from "@/lib/constants"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from '@/components/tools/code-examples-accordion'

const PIS_JS_CODE = `function validatePIS(pis) {
  const cleaned = pis.replace(/\\D/g, '');
  if (cleaned.length !== 11 || /^(\\d)\\1+$/.test(cleaned)) return false;

  const base = cleaned.substring(0, 10);
  const checkDigit = cleaned.substring(10, 11);
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(base[i]) * weights[i];
  }

  const rest = sum % 11;
  const digit = 11 - rest;
  const calculatedDigit = (digit === 10 || digit === 11) ? '0' : digit.toString();

  return calculatedDigit === checkDigit;
}`;

const PIS_PYTHON_CODE = `import re

def validate_pis(pis: str) -> bool:
    cleaned = re.sub(r'\\D', '', pis)
    if len(cleaned) != 11 or len(set(cleaned)) == 1:
        return False

    base = cleaned[:10]
    check_digit = cleaned[10]
    weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    total_sum = sum(int(base[i]) * weights[i] for i in range(10))
    rest = total_sum % 11
    digit = 11 - rest
    calculated_digit = '0' if digit in (10, 11) else str(digit)

    return calculated_digit == check_digit`;

const PIS_CSHARP_CODE = `using System;
using System.Linq;
using System.Text.RegularExpressions;

public static class PISValidator
{
    public static bool Validate(string pis)
    {
        string cleaned = Regex.Replace(pis ?? "", @"[^\\d]", "");
        if (cleaned.Length != 11 || cleaned.All(c => c == cleaned[0]))
            return false;

        string baseNum = cleaned.Substring(0, 10);
        string checkDigit = cleaned.Substring(10, 1);
        int[] weights = { 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

        int sum = 0;
        for (int i = 0; i < 10; i++)
        {
            sum += (baseNum[i] - '0') * weights[i];
        }

        int rest = sum % 11;
        int digit = 11 - rest;
        string calculatedDigit = (digit == 10 || digit == 11) ? "0" : digit.ToString();

        return calculatedDigit == checkDigit;
    }
}`;

const PIS_JAVA_CODE = `public class PISValidator {
    public static boolean validate(String pis) {
        if (pis == null) return false;
        String cleaned = pis.replaceAll("[^\\\\d]", "");
        if (cleaned.length() != 11 || cleaned.matches("^(\\\\d)\\\\1+$")) return false;

        String base = cleaned.substring(0, 10);
        String checkDigit = cleaned.substring(10, 11);
        int[] weights = { 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += Character.getNumericValue(base.charAt(i)) * weights[i];
        }

        int rest = sum % 11;
        int digit = 11 - rest;
        String calculatedDigit = (digit == 10 || digit == 11) ? "0" : String.valueOf(digit);

        return calculatedDigit.equals(checkDigit);
    }
}`;

export function PISPage() {
    const [generatedPIS, setGeneratedPIS] = useState('')
    const [validateInput, setValidateInput] = useState('')
    const [validateResult, setValidateResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'generate' | 'validate' | 'bulk'>('generate')
    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const pis = generatePIS()
        const formatted = formatPIS(pis)
        setGeneratedPIS(formatted)
    }

    const handleValidate = () => {
        const isValid = validatePIS(validateInput)
        setValidateResult(isValid)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Documentos Pessoais" }, { "label": "PIS/PASEP" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Gerador de PIS Válido</h1>
                        <p className="text-lg text-muted-foreground">
                            Gere e valide números de PIS/PASEP válidos para testes
                        </p>
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex gap-2 mb-6">
                        <Button
                            variant={activeTab === 'generate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('generate')}
                        >
                            Gerar
                        </Button>
                        <Button
                            variant={activeTab === 'validate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('validate')}
                        >
                            Validar
                        </Button>
                        <Button
                            variant={activeTab === 'bulk' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Geração em Lote
                        </Button>
                    </div>

                    {/* Generate Section */}
                    {activeTab === 'generate' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar PIS/PASEP</CardTitle>
                                <CardDescription>
                                    Gere um número válido de PIS/PASEP
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {generatedPIS && (
                                    <ToolResult
                                        result={generatedPIS}
                                        toolId="pis"
                                        toolName="PIS/PASEP"
                                        successMessage="PIS/PASEP gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar PIS/PASEP
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Validate Section */}
                    {activeTab === 'validate' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Validar PIS/PASEP</CardTitle>
                                <CardDescription>
                                    Verifique se um número de PIS/PASEP é válido
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Número do PIS/PASEP</Label>
                                    <Input
                                        placeholder="000.00000.00-0"
                                        value={validateInput}
                                        onChange={(e) => setValidateInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
                                    />
                                </div>

                                {validateResult !== null && (
                                    <div
                                        className={`flex items-center gap-2 p-4 rounded-lg ${validateResult
                                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                            }`}
                                    >
                                        {validateResult ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span className="font-semibold">PIS/PASEP válido!</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5" />
                                                <span className="font-semibold">PIS/PASEP inválido</span>
                                            </>
                                        )}
                                    </div>
                                )}

                                <Button onClick={handleValidate} className="w-full">
                                    Validar PIS/PASEP
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bulk Section */}
                    {activeTab === 'bulk' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Lote</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => formatPIS(generatePIS())}
                                    label="PIS/PASEP"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Info Card & FAQ */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de PIS e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O PIS (Programa de Integração Social) e o PASEP (Programa de Formação do Patrimônio do Servidor Público)
                                    são programas de contribuição social essenciais. O número de inscrição gerado possui o formato exato oficial, send utilizado
                                    como NIS e NIT.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números gerados por esta ferramenta são <strong>aleatórios e válidos matematicamente apenas para testes</strong> e desenvolvimento de software (Mocks, Automação QA). Não devem ser utilizados para fraudes ou documentos reais.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Para que serve um gerador de PIS?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Nossa ferramenta fornece números válidos do PIS/PASEP instantaneamente para que desenvolvedores, testadores (QA) e estudantes possam preencher campos obrigatórios durante a homologação de sistemas de RH, contabilidade ou e-commerces, sem a necessidade de usar dados sensíveis de pessoas reais.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Qual a diferença entre PIS, PASEP, NIS e NIT?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Na prática computacional e sistêmica, nenhuma. PIS (iniciativa privada), PASEP (servidor público), NIS (projetos sociais) e NIT (autônomos) compartilham a mesma estrutura de 11 dígitos numéricos e a mesma regra de cálculo para o dígito verificador. O gerador atende a todos esses casos.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Como é calculado o dígito verificador do PIS?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O 11º dígito de um PIS é um "módulo matemático". Ele é calculado multiplicando os 10 primeiros dígitos da esquerda para a direita por pesos específicos (3, 2, 9, 8, 7, 6, 5, 4, 3, 2). A soma dos resultados é dividida por 11, e o resto da divisão define o dígito final. Nosso gerador de PIS implementa 100% dessa regra oficial.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: PIS_JS_CODE },
                                        { language: "python", label: "Python", code: PIS_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: PIS_CSHARP_CODE },
                                        { language: "java", label: "Java", code: PIS_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de PIS Válido"
                                    description="Gere e valide números de PIS/PASEP para testes de sistema."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="pis" category="documents" customSlugs={['cpf', 'rg', 'cnh', 'titulo-eleitor']} />
                </div>
            </main>


        </div>
    )
}
