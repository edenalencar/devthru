"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Trash2, AlertCircle, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

import { Navbar } from "@/components/layout/navbar"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const JWT_JS_CODE = `function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
// Exemplo: decodeJwtPayload("eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiRGV2VGhydSJ9.sig") -> { name: "DevThru" }`;

const JWT_PYTHON_CODE = `import base64
import json

def decode_jwt_payload(token):
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
        payload = parts[1]
        payload += '=' * (4 - len(payload) % 4)
        decoded_bytes = base64.urlsafe_b64decode(payload)
        return json.loads(decoded_bytes.decode('utf-8'))
    except Exception:
        return None
# Exemplo: decode_jwt_payload("...") -> {"name": "DevThru"}`;

const JWT_CSHARP_CODE = `using System;
using System.Text;

public static class JwtDecoder
{
    public static string DecodePayload(string token)
    {
        try
        {
            var parts = token.Split('.');
            if (parts.Length != 3) return null;
            
            var payload = parts[1];
            payload = payload.Replace('-', '+').Replace('_', '/');
            switch (payload.Length % 4)
            {
                case 2: payload += "=="; break;
                case 3: payload += "="; break;
            }
            var bytes = Convert.FromBase64String(payload);
            return Encoding.UTF8.GetString(bytes);
        }
        catch
        {
            return null;
        }
    }
}`;

const JWT_JAVA_CODE = `import java.util.Base64;
import java.nio.charset.StandardCharsets;

public class JwtDecoder {
    public static String decodePayload(String token) {
        try {
            String[] parts = token.split("\\\\.");
            if (parts.length != 3) return null;
            
            String payload = parts[1];
            byte[] decodedBytes = Base64.getUrlDecoder().decode(payload);
            return new String(decodedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            return null;
        }
    }
}`;

export function JwtDebuggerPage() {
    const [token, setToken] = useState("")
    const [header, setHeader] = useState("")
    const [payload, setPayload] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!token.trim()) {
            setHeader("")
            setPayload("")
            setError("")
            return
        }

        try {
            // Validate basic structure
            const parts = token.split('.')
            if (parts.length !== 3) {
                throw new Error("Token inválido: deve ter 3 partes separadas por ponto.")
            }

            // Decode Header (Part 1)
            const decodedHeader = JSON.parse(atob(parts[0]))
            setHeader(JSON.stringify(decodedHeader, null, 2))

            // Decode Payload (Part 2)
            // Using jwtDecode specifically for payload for robustness, although atob also works
            const decodedPayload = jwtDecode(token)
            setPayload(JSON.stringify(decodedPayload, null, 2))

            setError("")
        } catch (err) {
            setError("Token inválido ou mal formatado.")
            setHeader("")
            setPayload("")
        }
    }, [token])

    const copyToClipboard = (text: string, label: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        toast.success(`${label} copiado!`)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dev Tools" }, { "label": "JWT Debugger" }]} className="mb-6" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold tracking-tight">JWT Debugger</h1>
                        <p className="text-muted-foreground text-lg">
                            Decodifique e inspecione JSON Web Tokens (JWT).
                        </p>
                        <Alert variant="default" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-50">
                            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertTitle>Privacidade Garantida</AlertTitle>
                            <AlertDescription>
                                A decodificação é feita 100% no seu navegador. Seu token nunca é enviado para nossos servidores.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="grid lg:grid-cols-[1fr,1fr] gap-8">
                        {/* Input Column */}
                        <div className="space-y-6">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Encoded Token</CardTitle>
                                    <CardDescription>Cole seu JWT aqui.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea
                                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                        className="min-h-[400px] font-mono text-sm break-all"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setToken("")}
                                            disabled={!token}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Limpar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={async () => {
                                                const text = await navigator.clipboard.readText()
                                                setToken(text)
                                            }}
                                        >
                                            Colar
                                        </Button>
                                    </div>

                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Erro</AlertTitle>
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Output Column */}
                        <div className="space-y-6">
                            {/* Header */}
                            <Card>
                                <CardHeader className="py-3 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base text-red-500 font-mono">HEADER: Algorithm & Token Type</CardTitle>
                                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(header, "Header")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4">
                                    <pre className="font-mono text-sm text-red-500 overflow-auto max-h-[200px]">
                                        {header || "..."}
                                    </pre>
                                </CardContent>
                            </Card>

                            {/* Payload */}
                            <Card>
                                <CardHeader className="py-3 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base text-purple-500 font-mono">PAYLOAD: Data</CardTitle>
                                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(payload, "Payload")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4">
                                    <pre className="font-mono text-sm text-purple-500 overflow-auto min-h-[200px]">
                                        {payload || "..."}
                                    </pre>
                                </CardContent>
                            </Card>

                            {/* Signature Info */}
                            <Card>
                                <CardHeader className="py-3 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base text-blue-500 font-mono">SIGNATURE</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4 text-sm text-muted-foreground">
                                    <p>
                                        A assinatura verifica se o remetente do JWT é quem diz ser e assegura que a mensagem não foi alterada ao longo do caminho.
                                    </p>
                                    <p className="mt-2 text-xs italic">
                                        *Nota: Não validamos a assinatura aqui pois exigiria sua chave secreta, o que não é seguro fazer no navegador.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o JWT Debugger e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O JWT Debugger é uma ferramenta indispensável para analisar JSON Web Tokens de forma instantânea. Com ele, você pode inspecionar rapidamente as partes que compõem o token, ajudando na identificação de erros de integração, expiração de sessões e permissões incorretas.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>O que é um JSON Web Token (JWT) e sua estrutura?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Um JWT é um padrão aberto (RFC 7519) usado para transmitir de forma segura informações estruturadas como um objeto JSON. Ele é composto por três partes separadas por pontos (.): Header (indica o algoritmo de criptografia e tipo de token), Payload (dados do usuário e metadados de sessão, conhecidos como claims) e Signature (garante que o token não foi adulterado).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como funciona a decodificação local e qual a garantia de privacidade?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Nesta ferramenta, toda a decodificação é feita diretamente no navegador utilizando JavaScript local (`atob` e `jwt-decode`). Seu token nunca é enviado ou transmitido para servidores de terceiros, o que garante 100% de privacidade para inspecionar payloads de teste e tokens de APIs em desenvolvimento.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Por que a assinatura (Signature) não é validada aqui?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Para verificar a assinatura de um token criptografado simetricamente (como HS256), seria necessário que você inserisse a sua chave secreta (secret key) no navegador. Inserir chaves privadas em ferramentas web terceiras é uma prática de alto risco de segurança. Por esse motivo, limitamos a depuração à visualização do Header e Payload, mantendo o processo seguro.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como decodificar um JWT em código? (Exemplos de Código)"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: JWT_JS_CODE },
                                        { language: "python", label: "Python", code: JWT_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: JWT_CSHARP_CODE },
                                        { language: "java", label: "Java", code: JWT_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>
                        </CardContent>
                    </Card>

                    <RelatedTools currentToolSlug="jwt-debugger" category="development" />
                </div>
            </main>
        </div>
    )
}
