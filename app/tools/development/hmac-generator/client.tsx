"use client"

import { useState, useTransition } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { ToolProCta } from "@/components/tools/tool-pro-cta"
import { CopyButton } from "@/components/copy-button"
import { computeHMAC, HMACAlgorithm, HMACResult, verifyHMAC } from "@/lib/utils/generators/hmac"
import { sendGTMEvent } from "@/lib/gtm"
import { toast } from "sonner"
import { 
    Key, 
    ShieldCheck, 
    Code2, 
    Lock, 
    RefreshCw, 
    Eye, 
    EyeOff, 
    Sparkles, 
    CheckCircle2, 
    XCircle,
    Hash
} from "lucide-react"

const SAMPLE_PAYLOAD = JSON.stringify({
    event: "payment.succeeded",
    transaction_id: "tx_981247192",
    amount: 149.90,
    currency: "BRL",
    customer: {
        id: "cus_381920",
        email: "dev@empresa.com.br"
    },
    timestamp: 1793364000
}, null, 2);

const SAMPLE_SECRET = "whsec_984f8a2bc419d2e18503748f50659d81";

export function HMACGeneratorPage() {
    const [algorithm, setAlgorithm] = useState<HMACAlgorithm>("SHA-256");
    const [secret, setSecret] = useState(SAMPLE_SECRET);
    const [message, setMessage] = useState(SAMPLE_PAYLOAD);
    const [showSecret, setShowSecret] = useState(false);
    const [result, setResult] = useState<HMACResult | null>(null);
    const [signatureToVerify, setSignatureToVerify] = useState("");
    const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleGenerate = () => {
        if (!message.trim()) {
            toast.error("Por favor, digite o payload ou mensagem.");
            return;
        }
        if (!secret.trim()) {
            toast.error("Por favor, informe a chave secreta (Secret Key).");
            return;
        }

        startTransition(async () => {
            try {
                const res = await computeHMAC(message, secret, algorithm);
                setResult(res);
                toast.success(`Assinatura HMAC-${algorithm} gerada com sucesso!`);

                sendGTMEvent({
                    event: 'tool_interaction',
                    tool_name: 'hmac-generator',
                    tool_action: 'generate_hmac',
                    tool_category: 'development',
                    algorithm
                });
            } catch (err) {
                toast.error("Erro ao computar assinatura HMAC.");
            }
        });
    };

    const handleVerify = async () => {
        if (!signatureToVerify.trim()) {
            toast.error("Digite a assinatura recebida para validar.");
            return;
        }

        const isValid = await verifyHMAC(message, secret, signatureToVerify, algorithm);
        setVerificationStatus(isValid);
        if (isValid) {
            toast.success("Assinatura autêntica e válida!");
        } else {
            toast.error("Assinatura inválida! O payload ou a chave não conferem.");
        }

        sendGTMEvent({
            event: 'tool_interaction',
            tool_name: 'hmac-generator',
            tool_action: 'verify_signature',
            tool_category: 'development',
            result: isValid ? 'valid' : 'invalid'
        });
    };

    const generateRandomKey = () => {
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        const hex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        setSecret(`whsec_${hex.substring(0, 32)}`);
        toast.success("Nova chave secreta aleatória de 256 bits gerada!");
    };

    const loadPreset = (type: 'stripe' | 'github' | 'mercadopago') => {
        if (type === 'stripe') {
            setMessage(JSON.stringify({
                id: "evt_1N2O3P4Q5R",
                object: "event",
                type: "payment_intent.succeeded",
                data: { object: { amount: 25000, currency: "brl" } }
            }, null, 2));
            setSecret("whsec_test_stripe_secret_key_123");
        } else if (type === 'github') {
            setMessage(JSON.stringify({
                action: "opened",
                pull_request: { id: 42, title: "feat: add webhook integration" },
                repository: { full_name: "devthru/tools" }
            }, null, 2));
            setSecret("gh_webhook_secret_key_987654");
        } else if (type === 'mercadopago') {
            setMessage(JSON.stringify({
                action: "payment.created",
                api_version: "v1",
                data: { id: "9876543210" },
                date_created: "2026-10-30T10:00:00Z",
                type: "payment"
            }, null, 2));
            setSecret("mp_sec_token_54321");
        }
        setAlgorithm("SHA-256");
        setResult(null);
        setVerificationStatus(null);
        toast.info(`Preset de webhook ${type.toUpperCase()} carregado.`);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            
            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Desenvolvimento", href: "/#dev" },
                        { label: "HMAC Generator", href: "/tools/development/hmac-generator" }
                    ]}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Criptografia Web Crypto API</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                            Gerador de HMAC Online
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">
                            Calcule e valide assinaturas criptográficas de webhooks com chave secreta para Stripe, GitHub, Mercado Pago e APIs.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <ShareButtons title="Gerador e Validador de HMAC Online" />
                    </div>
                </div>

                {/* Toolbar de Presets */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/30 p-3 rounded-lg border border-border/60 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Presets de Webhook:</span>
                        <Button onClick={() => loadPreset('stripe')} variant="outline" size="sm" className="text-xs h-8">
                            Stripe Webhook
                        </Button>
                        <Button onClick={() => loadPreset('github')} variant="outline" size="sm" className="text-xs h-8">
                            GitHub Webhook
                        </Button>
                        <Button onClick={() => loadPreset('mercadopago')} variant="outline" size="sm" className="text-xs h-8">
                            Mercado Pago
                        </Button>
                    </div>

                    <Button onClick={generateRandomKey} variant="ghost" size="sm" className="gap-1.5 text-xs text-primary">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Gerar Chave Aleatória (256-bit)
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Painel de Entrada de Dados (Esquerda) */}
                    <div className="lg:col-span-7 space-y-4">
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Key className="w-4 h-4 text-primary" />
                                    <span>Parâmetros Criptográficos</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Seleção de Algoritmo */}
                                <div>
                                    <Label className="text-xs font-semibold mb-2 block">Algoritmo de Hash</Label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(['SHA-256', 'SHA-512', 'SHA-384', 'SHA-1'] as HMACAlgorithm[]).map((algo) => (
                                            <Button
                                                key={algo}
                                                type="button"
                                                size="sm"
                                                variant={algorithm === algo ? "default" : "outline"}
                                                onClick={() => setAlgorithm(algo)}
                                                className="text-xs font-mono"
                                            >
                                                {algo}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Chave Secreta */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <Label htmlFor="secret" className="text-xs font-semibold">Chave Secreta (Secret Key)</Label>
                                        <button
                                            type="button"
                                            onClick={() => setShowSecret(!showSecret)}
                                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                        >
                                            {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                            <span>{showSecret ? "Ocultar" : "Mostrar"}</span>
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="secret"
                                            type={showSecret ? "text" : "password"}
                                            value={secret}
                                            onChange={(e) => setSecret(e.target.value)}
                                            placeholder="Ex: whsec_meu_segredo_super_seguro"
                                            className="font-mono text-xs pr-10"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                            <CopyButton text={secret} />
                                        </div>
                                    </div>
                                </div>

                                {/* Mensagem / Payload */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <Label htmlFor="message" className="text-xs font-semibold">Payload do Webhook ou Texto da Mensagem</Label>
                                        <CopyButton text={message} />
                                    </div>
                                    <Textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='{"event": "order.paid", "amount": 99.00}'
                                        className="font-mono text-xs min-h-[180px] resize-y"
                                        spellCheck={false}
                                    />
                                </div>

                                <Button 
                                    onClick={handleGenerate} 
                                    className="w-full font-semibold gap-2" 
                                    disabled={isPending}
                                >
                                    <Lock className="w-4 h-4" />
                                    {isPending ? "Calculando..." : `Gerar Assinatura HMAC (${algorithm})`}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Painel de Saída & Validação (Direita) */}
                    <div className="lg:col-span-5 space-y-4">
                        <Tabs defaultValue="output" className="w-full">
                            <TabsList className="grid grid-cols-2 w-full">
                                <TabsTrigger value="output" className="text-xs">Assinatura HMAC</TabsTrigger>
                                <TabsTrigger value="code" className="text-xs">Validação Backend</TabsTrigger>
                            </TabsList>

                            {/* Aba de Assinaturas */}
                            <TabsContent value="output" className="space-y-4 mt-3">
                                <Card className="border-border/60">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-semibold flex items-center justify-between">
                                            <span>Hexadecimal (Padrão Webhooks)</span>
                                            <Badge variant="outline" className="text-[10px] font-mono">{algorithm}</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="p-3 bg-muted/40 rounded-lg font-mono text-xs break-all relative border border-border/40 select-all">
                                            {result ? result.hex : "Clique em 'Gerar Assinatura' para calcular"}
                                        </div>
                                        {result && (
                                            <div className="mt-2 flex justify-end">
                                                <CopyButton text={result.hex} />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="border-border/60">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-semibold flex items-center justify-between">
                                            <span>Base64 (Padrão Shopify / AWS)</span>
                                            <Badge variant="outline" className="text-[10px] font-mono">Base64</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="p-3 bg-muted/40 rounded-lg font-mono text-xs break-all relative border border-border/40 select-all">
                                            {result ? result.base64 : "Clique em 'Gerar Assinatura' para calcular"}
                                        </div>
                                        {result && (
                                            <div className="mt-2 flex justify-end">
                                                <CopyButton text={result.base64} />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Card de Verificação Rápida */}
                                <Card className="border-border/60">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                            <span>Validador de Assinatura Recebida</span>
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Cole o valor do cabeçalho de assinatura do webhook para testar a equivalência.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Input
                                            value={signatureToVerify}
                                            onChange={(e) => {
                                                setSignatureToVerify(e.target.value);
                                                setVerificationStatus(null);
                                            }}
                                            placeholder="Cole aqui a assinatura recebida (Hex ou Base64)"
                                            className="font-mono text-xs"
                                        />
                                        <Button onClick={handleVerify} variant="secondary" size="sm" className="w-full text-xs">
                                            Verificar Assinatura
                                        </Button>

                                        {verificationStatus !== null && (
                                            <div className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 font-medium ${
                                                verificationStatus 
                                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600" 
                                                    : "bg-rose-500/10 border-rose-500/30 text-rose-600"
                                            }`}>
                                                {verificationStatus ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                        <span>Assinatura VÁLIDA! O payload e a chave coincidem perfeitamente.</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-4 h-4 shrink-0" />
                                                        <span>Assinatura INVÁLIDA! O conteúdo foi modificado ou a chave está errada.</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Aba de Código para Backend */}
                            <TabsContent value="code" className="mt-3">
                                <Card className="border-border/60">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                            <Code2 className="w-4 h-4 text-primary" />
                                            <span>Código Seguro para seu Backend</span>
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Implementações protegidas contra vulnerabilidades de Timing Attack.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <Label className="text-xs font-semibold">Node.js / TypeScript</Label>
                                                <CopyButton text={result?.snippets.nodejs || ""} />
                                            </div>
                                            <pre className="p-3 bg-muted/60 rounded-lg text-[11px] font-mono overflow-x-auto border border-border/40">
                                                <code>{result ? result.snippets.nodejs : "Calcule a assinatura para gerar o código"}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <Label className="text-xs font-semibold">Python</Label>
                                                <CopyButton text={result?.snippets.python || ""} />
                                            </div>
                                            <pre className="p-3 bg-muted/60 rounded-lg text-[11px] font-mono overflow-x-auto border border-border/40">
                                                <code>{result ? result.snippets.python : "Calcule a assinatura para gerar o código"}</code>
                                            </pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Call to Action PRO */}
                <ToolProCta
                    toolName="HMAC Generator"
                    badge="Segurança para APIs"
                    title="Construindo integrações de webhook e APIs escaláveis?"
                    description="Automatize a geração de chaves criptográficas e teste fluxos de webhook com dados sintéticos e mock data sem expor credenciais reais de produção."
                />

                {/* Seção de FAQ E-E-A-T */}
                <ToolFaqSection
                    toolSlug="hmac-generator"
                    title="Perguntas Frequentes sobre Assinaturas HMAC"
                />

                {/* Ferramentas Relacionadas */}
                <RelatedTools
                    currentToolSlug="hmac-generator"
                    category="development"
                    customSlugs={["hash", "jwt-debugger", "curl-converter", "base64"]}
                />
            </main>

            <Footer />
        </div>
    );
}

