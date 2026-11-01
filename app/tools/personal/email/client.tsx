"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const EMAIL_JS_CODE = `function generateRandomEmail(domainType = "random", customDomain = "") {
  const domains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const length = Math.floor(Math.random() * 10) + 6;
  
  let username = "";
  for (let i = 0; i < length; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  
  const domain = (domainType === "custom" && customDomain)
    ? customDomain
    : domains[Math.floor(Math.random() * domains.length)];
    
  return \`\smash{\${username}}@\${domain}\`;
}`;

const EMAIL_PYTHON_CODE = `import random
import string

def generate_random_email(domain_type="random", custom_domain=""):
    domains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"]
    chars = string.ascii_lowercase + string.digits
    length = random.randint(6, 15)
    
    username = "".join(random.choice(chars) for _ in range(length))
    
    domain = custom_domain if domain_type == "custom" and custom_domain else random.choice(domains)
    return f"{username}@{domain}"`;

const EMAIL_CSHARP_CODE = `using System;
using System.Text;

public static class EmailGenerator
{
    private static readonly string[] Domains = { "gmail.com", "outlook.com", "yahoo.com", "hotmail.com" };
    private static readonly Random Rand = new Random();

    public static string Generate(string domainType = "random", string customDomain = "")
    {
        const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        int length = Rand.Next(10) + 6;
        StringBuilder username = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            username.Append(chars[Rand.Next(chars.Length)]);
        }

        string domain = (domainType == "custom" && !string.IsNullOrEmpty(customDomain))
            ? customDomain
            : Domains[Rand.Next(Domains.Length)];

        return $"{username}@{domain}";
    }
}`;

const EMAIL_JAVA_CODE = `import java.util.Random;

public class EmailGenerator {
    private static final String[] DOMAINS = { "gmail.com", "outlook.com", "yahoo.com", "hotmail.com" };
    private static final Random RAND = new Random();

    public static String generate(String domainType, String customDomain) {
        String chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        int length = RAND.nextInt(10) + 6;
        StringBuilder username = new StringBuilder();

        for (int i = 0; i < length; i++) {
            username.append(chars.charAt(RAND.nextInt(chars.length())));
        }

        String domain = ("custom".equals(domainType) && customDomain != null && !customDomain.isEmpty())
            ? customDomain
            : DOMAINS[RAND.nextInt(DOMAINS.length)];

        return username.toString() + "@" + domain;
    }
}`;

const domains = [
    "gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "uol.com.br", "bol.com.br", "terra.com.br", "icloud.com"
]

export function EmailGeneratorPage() {
    const [email, setEmail] = useState<string>("")
    const [customDomain, setCustomDomain] = useState<string>("")
    const [domainType, setDomainType] = useState<string>("random")
    const { isPro, limit } = useUser()

    const generateEmail = (type: string = domainType, custom: string = customDomain): string => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        const usernameLength = Math.floor(Math.random() * 10) + 6
        let username = ""
        for (let i = 0; i < usernameLength; i++) {
            username += chars[Math.floor(Math.random() * chars.length)]
        }

        let domain = ""
        if (type === "custom" && custom) {
            domain = custom
        } else {
            domain = domains[Math.floor(Math.random() * domains.length)]
        }

        return `${username}@${domain}`
    }

    const handleGenerate = () => {
        setEmail(generateEmail())
    }

    useEffect(() => {
        if (!email) {
            setTimeout(() => handleGenerate(), 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Ferramentas" },
                        { label: "Dados Pessoais" },
                        { label: "Gerador de Email" }
                    ]} className="mb-6" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Email</h1>
                        <p className="text-muted-foreground">
                            Gere endereços de email temporários ou fictícios para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Email</CardTitle>
                                <CardDescription>Gere um único endereço de email</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Domínio</Label>
                                        <Select value={domainType} onValueChange={setDomainType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo de domínio" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="random">Aleatório (Comuns)</SelectItem>
                                                <SelectItem value="custom">Personalizado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {domainType === "custom" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="custom-domain">Domínio Personalizado</Label>
                                            <Input
                                                id="custom-domain"
                                                placeholder="exemplo.com"
                                                value={customDomain}
                                                onChange={(e) => setCustomDomain(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                {email && (
                                    <ToolResult
                                        result={email}
                                        toolId="email"
                                        toolName="Email"
                                        input={{ domainType, customDomain }}
                                        successMessage="Email gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Email
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
                                    generatorFn={() => generateEmail(domainType, customDomain)}
                                    label="Emails"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de E-mails</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O Gerador de Email cria endereços de correio eletrônico fictícios e temporários para preenchimento rápido de cadastros em ambientes de desenvolvimento e controle de qualidade (QA).
                                </p>
                            </div>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Email"
                                    description="Gere endereços de email temporários ou fictícios."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="email">
                        <CodeExamplesAccordion
                            title="Como gerar e-mails aleatórios? (Exemplos de Código)"
                            examples={[
                                { language: "javascript", label: "JavaScript / TS", code: EMAIL_JS_CODE },
                                { language: "python", label: "Python", code: EMAIL_PYTHON_CODE },
                                { language: "csharp", label: "C#", code: EMAIL_CSHARP_CODE },
                                { language: "java", label: "Java", code: EMAIL_JAVA_CODE }
                            ]}
                        />
                    </ToolFaqSection>
                    <RelatedTools currentToolSlug="email" category="personal" />
                </div>
            </main>
        </div>
    )
}
