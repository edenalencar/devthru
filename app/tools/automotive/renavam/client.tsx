"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shield, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

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
    const [renavam, setRenavam] = useState("")

    const generateRenavam = () => {
        const random = Math.floor(Math.random() * 9999999999).toString().padStart(10, '0')
        const renavamWithoutDigit = random.substring(0, 10)

        const renavamArr = renavamWithoutDigit.split("").reverse()
        let sum = 0
        for (let i = 0; i < 8; i++) {
            sum += parseInt(renavamArr[i]) * (i + 2)
        }
        sum += parseInt(renavamArr[8]) * 2
        sum += parseInt(renavamArr[9]) * 3

        const mod = sum % 11
        const digit = 11 - mod
        const finalDigit = digit >= 10 ? 0 : digit

        setRenavam(renavamWithoutDigit + finalDigit)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copiado para a área de transferência")
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

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar RENAVAM</CardTitle>
                                <CardDescription>
                                    Gera um número de RENAVAM válido com 11 dígitos
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={generateRenavam} className="w-full" size="lg">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar RENAVAM
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    RENAVAM gerado
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renavam ? (
                                    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/50">
                                        <div className="text-4xl font-mono font-bold tracking-wider mb-6">
                                            {renavam}
                                        </div>
                                        <Button variant="outline" onClick={() => copyToClipboard(renavam)}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copiar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-lg border-dashed">
                                        <Shield className="h-12 w-12 mb-2 opacity-20" />
                                        <p>Clique em gerar para começar</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de RENAVAM e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O RENAVAM (Registro Nacional de Veículos Automotores) é um código único de 11 dígitos atribuído a cada veículo registrado no Brasil. Este número é essencial para identificação do veículo em transações, multas e documentação.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Nota:</strong> Os números gerados são matematicamente válidos mas fictícios, não correspondendo a veículos reais. Use apenas para testes de software.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="faq-1">
                                    <AccordionTrigger>Como funciona o cálculo do dígito verificador do RENAVAM?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O RENAVAM possui 11 dígitos. Os primeiros 10 dígitos representam o número identificador e o 11º dígito é o Dígito Verificador (DV). O DV é calculado utilizando uma variante do algoritmo de módulo 11, multiplicando os dígitos de trás para frente pelos pesos de 2 a 9 e reiniciando a sequência em 2. A soma dessas multiplicações é multiplicada por 10 e depois dividida por 11. O resto é o dígito verificador. Se o resto for maior ou igual a 10, assume-se o dígito verificador como 0.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="faq-2">
                                    <AccordionTrigger>Para que serve o RENAVAM de teste?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Ele é amplamente utilizado por desenvolvedores de software, analistas de qualidade (QA) e engenheiros de sistemas para validar campos cadastrais em ERPs, sistemas de transportes, multas e faturamento automotivo, evitando o uso de dados de veículos reais.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: RENAVAM_JS_CODE },
                                        { language: "python", label: "Python", code: RENAVAM_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: RENAVAM_CSHARP_CODE },
                                        { language: "java", label: "Java", code: RENAVAM_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de RENAVAM Online"
                                    description="Gere números de RENAVAM válidos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="renavam" category="automotive" />
                </div>
            </main>

        </div>
    )
}

