"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, RefreshCw, Copy, EyeOff } from "lucide-react"
import { generateCPF, formatCPF } from "@/lib/utils/validators/cpf"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const LGPD_JS_CODE = `function anonymizeText(text) {
  let result = text;
  // CPF
  result = result.replace(/\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}/g, "***.***.***-**");
  // Email
  result = result.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+)/gi, (match) => {
    const [user, domain] = match.split("@");
    return \`\${user.substring(0, 2)}***@\${domain}\`;
  });
  // Telefone
  result = result.replace(/\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}/g, "(**) *****-****");
  return result;
}`;

const LGPD_PYTHON_CODE = `import re

def anonymize_text(text: str) -> str:
    # CPF
    text = re.sub(r"\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", "***.***.***-**", text)
    # Telefone
    text = re.sub(r"\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}", "(**) *****-****", text)
    # Email
    def mask_email(match):
        email = match.group(0)
        user, domain = email.split("@")
        return f"{user[:2]}***@{domain}"
    text = re.sub(r"[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+", mask_email, text)
    return text`;

const LGPD_CSHARP_CODE = `using System.Text.RegularExpressions;

public static class LgpdAnonymizer
{
    public static string Anonymize(string text)
    {
        if (string.IsNullOrEmpty(text)) return "";

        // CPF
        string result = Regex.Replace(text, @"\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", "***.***.***-**");
        // Telefone
        result = Regex.Replace(result, @"\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}", "(**) *****-****");
        // Email
        result = Regex.Replace(result, @"[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+", m =>
        {
            string[] parts = m.Value.Split('@');
            string user = parts[0];
            string domain = parts[1];
            return user.Length > 2 ? \`\${user.Substring(0, 2)}***@\${domain}\` : \`***@\${domain}\`;
        });

        return result;
    }
}`;

const LGPD_JAVA_CODE = `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LgpdAnonymizer {
    public static String anonymize(String text) {
        if (text == null) return "";

        // CPF
        String result = text.replaceAll("\\\\d{3}\\\\.\\\\d{3}\\\\.\\\\d{3}-\\\\d{2}", "***.***.***-**");
        // Telefone
        result = result.replaceAll("\\\\(\\\\d{2}\\\\)\\\\s\\\\d{4,5}-\\\\d{4}", "(**) *****-****");
        
        // Email
        Pattern emailPattern = Pattern.compile("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\\\.[a-zA-Z0-9._-]+");
        Matcher matcher = emailPattern.matcher(result);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String email = matcher.group();
            String[] parts = email.split("@");
            String user = parts[0];
            String domain = parts[1];
            String masked = (user.length() > 2) ? user.substring(0, 2) + "***@" + domain : "***@" + domain;
            matcher.appendReplacement(sb, Matcher.quoteReplacement(masked));
        }
        matcher.appendTail(sb);
        
        return sb.toString();
    }
}`;

export function LGPDDataPage() {
    const [activeTab, setActiveTab] = useState<'generate' | 'anonymize'>('generate')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fakeData, setFakeData] = useState<any>(null)
    const [inputText, setInputText] = useState("")
    const [anonymizedText, setAnonymizedText] = useState("")

    const generateData = () => {
        const firstNames = ["João", "Maria", "Pedro", "Ana", "Lucas", "Julia", "Carlos", "Fernanda"]
        const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Almeida"]

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const fullName = `${firstName} ${lastName}`
        const cpf = formatCPF(generateCPF())
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@exemplo.com`

        setFakeData({
            name: fullName,
            cpf: cpf,
            email: email,
            phone: `(11) 9${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            address: `Rua Exemplo, ${Math.floor(Math.random() * 1000)}, São Paulo - SP`
        })
    }

    const anonymizeData = () => {
        let text = inputText

        // Mask CPF (xxx.xxx.xxx-xx)
        text = text.replace(/\d{3}\.\d{3}\.\d{3}-\d{2}/g, "***.***.***-**")
        // Mask CPF (plain)
        text = text.replace(/\d{11}/g, "***********")

        // Mask Email
        text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, (match) => {
            const [user, domain] = match.split('@')
            return `${user.substring(0, 2)}***@${domain}`
        })

        // Mask Phone
        text = text.replace(/\(\d{2}\)\s\d{4,5}-\d{4}/g, "(**) *****-****")

        setAnonymizedText(text)
        toast.success("Dados anonimizados!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Pessoais" }, { "label": "Dados LGPD" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Ferramentas LGPD</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere dados fictícios para testes ou anonimize dados reais para conformidade com a LGPD.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6">
                        <Button
                            variant={activeTab === 'generate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('generate')}
                        >
                            Gerar Dados Fictícios
                        </Button>
                        <Button
                            variant={activeTab === 'anonymize' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('anonymize')}
                        >
                            Anonimizar Dados
                        </Button>
                    </div>

                    {activeTab === 'generate' ? (
                        <div className="grid gap-8 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gerador de Dados</CardTitle>
                                    <CardDescription>
                                        Gere um perfil completo de dados fictícios
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={generateData} className="w-full mb-6" size="lg">
                                        <RefreshCw className="mr-2 h-4 w-4" /> Gerar Novo Perfil
                                    </Button>

                                    {fakeData && (
                                        <div className="space-y-4">
                                            {Object.entries(fakeData).map(([key, value]) => (
                                                <div key={key} className="space-y-1">
                                                    <Label className="capitalize">{key}</Label>
                                                    <div className="flex gap-2">
                                                        <Input value={value as string} readOnly />
                                                        <Button variant="outline" size="icon" onClick={() => {
                                                            navigator.clipboard.writeText(value as string)
                                                            toast.success("Copiado!")
                                                        }}>
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Entrada</CardTitle>
                                    <CardDescription>
                                        Cole o texto contendo dados sensíveis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Cole aqui um texto com CPFs, emails ou telefones..."
                                        className="min-h-[300px]"
                                    />
                                    <Button onClick={anonymizeData} className="w-full mt-4">
                                        <EyeOff className="mr-2 h-4 w-4" /> Anonimizar
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Saída</CardTitle>
                                    <CardDescription>
                                        Texto com dados sensíveis mascarados
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={anonymizedText}
                                        readOnly
                                        className="min-h-[300px] bg-muted"
                                        placeholder="O resultado aparecerá aqui..."
                                    />
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(anonymizedText)
                                            toast.success("Copiado!")
                                        }}
                                        variant="outline"
                                        className="w-full mt-4"
                                        disabled={!anonymizedText}
                                    >
                                        <Copy className="mr-2 h-4 w-4" /> Copiar Resultado
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre as Ferramentas LGPD e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    As Ferramentas LGPD auxiliam desenvolvedores, administradores de sistemas e analistas de segurança a simular dados cadastrais ou sanitizar textos brutos mascarando dados pessoais sensíveis (PII).
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>O que é anonimização de dados sob a LGPD?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Segundo a Lei Geral de Proteção de Dados (LGPD), a anonimização é o processo pelo qual um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo. Uma vez anonimizado, o dado deixa de ser considerado dado pessoal para fins da lei.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como funciona o Anonimizador de Texto (mascaramento)?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Nossa ferramenta analisa o texto de entrada em busca de padrões sintáticos definidos (regex) para CPFs (com e sem pontos), e-mails e telefones formatados. Quando um desses padrões é encontrado, ele é substituído por uma máscara de asteriscos, preservando a estrutura de layout do texto original sem expor a informação sensível.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Esta ferramenta envia os dados colados para algum servidor?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Não. Toda a operação de geração e anonimização de texto é feita **100% no lado do cliente (client-side)** utilizando Javascript no seu próprio navegador. As informações nunca são enviadas a servidores externos ou gravadas em bancos de dados, oferecendo total privacidade e segurança.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como criar uma função de anonimização (mascaramento) em código?"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: LGPD_JS_CODE },
                                        { language: "python", label: "Python", code: LGPD_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: LGPD_CSHARP_CODE },
                                        { language: "java", label: "Java", code: LGPD_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Ferramentas LGPD"
                                    description="Gere dados fictícios ou anonimize dados sensíveis para LGPD."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="lgpd-data" category="personal" />
                </div>
            </main>
        </div>
    )
}
