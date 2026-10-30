"use client"

import { useState, useTransition } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { ToolProCta } from "@/components/tools/tool-pro-cta"
import { CopyButton } from "@/components/copy-button"
import { computeJSONDiff, JSONDiffResult } from "@/lib/utils/generators/json-diff"
import { sendGTMEvent } from "@/lib/gtm"
import { toast } from "sonner"
import { 
    FileDiff, 
    ArrowRightLeft, 
    Sparkles, 
    Trash2, 
    CheckCircle2, 
    AlertCircle, 
    PlusCircle, 
    MinusCircle, 
    HelpCircle,
    Braces
} from "lucide-react"

const SAMPLE_ORIGINAL = JSON.stringify({
    service: "payments-api",
    version: "1.4.0",
    environment: "production",
    features: {
        split_payment: true,
        pix_instant: true,
        crypto_checkout: false
    },
    limits: {
        max_daily_transaction: 50000,
        currency: "BRL"
    },
    maintainers: ["dev-team@empresa.com"]
}, null, 2);

const SAMPLE_MODIFIED = JSON.stringify({
    service: "payments-api",
    version: "2.0.0",
    environment: "production",
    features: {
        crypto_checkout: true,
        pix_instant: true,
        split_payment: true,
        drex_pilot: true
    },
    limits: {
        max_daily_transaction: 100000,
        currency: "BRL"
    },
    maintainers: ["dev-team@empresa.com", "security@empresa.com"]
}, null, 2);

const SAMPLE_REORDERED = JSON.stringify({
    maintainers: ["dev-team@empresa.com"],
    limits: {
        currency: "BRL",
        max_daily_transaction: 50000
    },
    features: {
        crypto_checkout: false,
        split_payment: true,
        pix_instant: true
    },
    environment: "production",
    version: "1.4.0",
    service: "payments-api"
}, null, 2);

export function JSONDiffPage() {
    const [original, setOriginal] = useState(SAMPLE_ORIGINAL);
    const [modified, setModified] = useState(SAMPLE_MODIFIED);
    const [diffResult, setDiffResult] = useState<JSONDiffResult | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleCompare = () => {
        if (!original.trim() || !modified.trim()) {
            toast.error("Por favor, preencha os dois campos JSON para comparar.");
            return;
        }

        startTransition(() => {
            const result = computeJSONDiff(original, modified);
            setDiffResult(result);

            if (result.isValid) {
                if (result.isIdentical) {
                    toast.success("Os dois JSONs são semanticamente idênticos!");
                } else {
                    toast.info(`Diferenças detectadas: ${result.stats.added + result.stats.removed + result.stats.modified} alterações.`);
                }
            } else {
                toast.error("Erro na sintaxe de um dos JSONs.");
            }

            sendGTMEvent({
                event: 'tool_interaction',
                tool_name: 'json-diff',
                tool_action: 'compare',
                tool_category: 'development'
            });
        });
    };

    const handleFormatBoth = () => {
        try {
            if (original.trim()) {
                const parsedA = JSON.parse(original);
                setOriginal(JSON.stringify(parsedA, null, 2));
            }
            if (modified.trim()) {
                const parsedB = JSON.parse(modified);
                setModified(JSON.stringify(parsedB, null, 2));
            }
            toast.success("Ambos os JSONs formatados com sucesso!");
        } catch (e: any) {
            toast.error("Não foi possível formatar: sintaxe JSON inválida.");
        }
    };

    const handleSwap = () => {
        setOriginal(modified);
        setModified(original);
        if (diffResult) {
            setDiffResult(computeJSONDiff(modified, original));
        }
        toast.info("Lados invertidos com sucesso!");
    };

    const handleClear = () => {
        setOriginal("");
        setModified("");
        setDiffResult(null);
        toast.info("Campos limpos.");
    };

    const loadSampleApi = () => {
        setOriginal(SAMPLE_ORIGINAL);
        setModified(SAMPLE_MODIFIED);
        setDiffResult(computeJSONDiff(SAMPLE_ORIGINAL, SAMPLE_MODIFIED));
        toast.success("Exemplo de payload de API carregado!");
    };

    const loadSampleReordered = () => {
        setOriginal(SAMPLE_ORIGINAL);
        setModified(SAMPLE_REORDERED);
        setDiffResult(computeJSONDiff(SAMPLE_ORIGINAL, SAMPLE_REORDERED));
        toast.success("Exemplo de chaves reordenadas carregado!");
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            
            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Desenvolvimento", href: "/#dev" },
                        { label: "JSON Diff", href: "/tools/development/json-diff" }
                    ]}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
                            <Braces className="w-3.5 h-3.5" />
                            <span>Semântico & Deep Comparison</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                            JSON Diff Online
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">
                            Compare dois objetos ou arrays JSON semanticamente, identificando chaves adicionadas, removidas e valores modificados ignorando a ordenação das chaves.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <ShareButtons title="JSON Diff Online: Comparador de JSON Semântico" />
                    </div>
                </div>

                {/* Toolbar de Ações Rápidas */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/30 p-3 rounded-lg border border-border/60 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button onClick={handleCompare} size="sm" className="font-semibold gap-1.5" disabled={isPending}>
                            <FileDiff className="w-4 h-4" />
                            {isPending ? "Comparando..." : "Comparar JSONs"}
                        </Button>
                        <Button onClick={handleFormatBoth} variant="outline" size="sm" className="gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            Formatar Ambos
                        </Button>
                        <Button onClick={handleSwap} variant="ghost" size="sm" className="gap-1.5">
                            <ArrowRightLeft className="w-4 h-4" />
                            Inverter Lados
                        </Button>
                        <Button onClick={handleClear} variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Limpar
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground hidden sm:inline">Exemplos:</span>
                        <Button onClick={loadSampleApi} variant="outline" size="sm" className="text-xs h-8">
                            Payload API (v1 vs v2)
                        </Button>
                        <Button onClick={loadSampleReordered} variant="outline" size="sm" className="text-xs h-8">
                            Chaves Reordenadas
                        </Button>
                    </div>
                </div>

                {/* Painel Duplo de Entrada */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* JSON Original */}
                    <Card className="border-border/60">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle className="text-base font-semibold">1. JSON Original (Base)</CardTitle>
                                <CardDescription className="text-xs">Versão antiga, resposta anterior ou baseline</CardDescription>
                            </div>
                            <CopyButton text={original} />
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={original}
                                onChange={(e) => setOriginal(e.target.value)}
                                placeholder='{"id": 1, "status": "active"}'
                                className="font-mono text-xs sm:text-sm min-h-[300px] resize-y"
                                spellCheck={false}
                            />
                            {diffResult?.errorOriginal && (
                                <p className="text-xs text-destructive mt-2 flex items-center gap-1 font-medium">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {diffResult.errorOriginal}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* JSON Modificado */}
                    <Card className="border-border/60">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle className="text-base font-semibold">2. JSON Modificado (Comparação)</CardTitle>
                                <CardDescription className="text-xs">Nova versão, payload recebido ou teste</CardDescription>
                            </div>
                            <CopyButton text={modified} />
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={modified}
                                onChange={(e) => setModified(e.target.value)}
                                placeholder='{"id": 1, "status": "pending"}'
                                className="font-mono text-xs sm:text-sm min-h-[300px] resize-y"
                                spellCheck={false}
                            />
                            {diffResult?.errorModified && (
                                <p className="text-xs text-destructive mt-2 flex items-center gap-1 font-medium">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {diffResult.errorModified}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Painel de Resultados do Diff */}
                {diffResult && diffResult.isValid && (
                    <Card className="mt-6 border-border/60 shadow-sm animate-in fade-in-50 duration-300">
                        <CardHeader className="pb-3 border-b bg-muted/20">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <FileDiff className="w-5 h-5 text-primary" />
                                        <span>Resultado da Comparação Semântica</span>
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {diffResult.isIdentical 
                                            ? "Nenhuma discrepância encontrada entre as duas estruturas." 
                                            : "Divergências detectadas nó por nó na hierarquia dos objetos."
                                        }
                                    </CardDescription>
                                </div>

                                {/* Badges de Métricas */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {diffResult.isIdentical ? (
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1 text-xs py-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            JSONs Idênticos
                                        </Badge>
                                    ) : (
                                        <>
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1 text-xs">
                                                <PlusCircle className="w-3.5 h-3.5" />
                                                {diffResult.stats.added} Adicionado(s)
                                            </Badge>
                                            <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/30 gap-1 text-xs">
                                                <MinusCircle className="w-3.5 h-3.5" />
                                                {diffResult.stats.removed} Removido(s)
                                            </Badge>
                                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 gap-1 text-xs">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                {diffResult.stats.modified} Modificado(s)
                                            </Badge>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-4">
                            {diffResult.isIdentical ? (
                                <div className="text-center py-10 px-4 bg-muted/10 rounded-lg border border-dashed">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                                    <h3 className="text-base font-bold text-foreground">Estruturas Equivalentes</h3>
                                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
                                        Ambos os JSONs contêm exatamente os mesmos dados e propriedades. Variações na ordem das chaves ou quebras de linha foram ignoradas com sucesso.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs sm:text-sm">
                                        <thead>
                                            <tr className="border-b text-muted-foreground">
                                                <th className="py-2.5 px-3 font-medium">Caminho / Propriedade</th>
                                                <th className="py-2.5 px-3 font-medium">Status</th>
                                                <th className="py-2.5 px-3 font-medium">Valor Original</th>
                                                <th className="py-2.5 px-3 font-medium">Valor Novo</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/40 font-mono">
                                            {diffResult.flatChanges.map((change, idx) => (
                                                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                                                    <td className="py-2.5 px-3 font-semibold text-foreground">
                                                        {change.path}
                                                    </td>
                                                    <td className="py-2.5 px-3">
                                                        {change.type === 'added' && (
                                                            <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30 font-sans text-[11px]">
                                                                + Adicionado
                                                            </Badge>
                                                        )}
                                                        {change.type === 'removed' && (
                                                            <Badge className="bg-rose-500/15 text-rose-600 border-rose-500/30 font-sans text-[11px]">
                                                                - Removido
                                                            </Badge>
                                                        )}
                                                        {change.type === 'modified' && (
                                                            <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/30 font-sans text-[11px]">
                                                                ~ Modificado
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 max-w-[250px] truncate" title={JSON.stringify(change.oldValue)}>
                                                        {change.oldValue !== undefined ? JSON.stringify(change.oldValue) : <span className="text-muted-foreground font-sans italic">—</span>}
                                                    </td>
                                                    <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 max-w-[250px] truncate" title={JSON.stringify(change.newValue)}>
                                                        {change.newValue !== undefined ? JSON.stringify(change.newValue) : <span className="text-muted-foreground font-sans italic">—</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Call to Action PRO */}
                <ToolProCta
                    toolName="JSON Diff"
                    badge="Produtividade para APIs"
                    title="Trabalhando com grandes payloads e schemas de API?"
                    description="Otimize seus testes de regressão de microsserviços e integração de APIs. Exporte diffs com 1 clique e automatize comparações com nossa API para desenvolvedores."
                />

                {/* Seção de FAQ E-E-A-T */}
                <ToolFaqSection
                    toolSlug="json-diff"
                    title="Perguntas Frequentes sobre JSON Diff"
                />

                {/* Ferramentas Relacionadas */}
                <RelatedTools
                    currentToolSlug="json-diff"
                    category="development"
                    customSlugs={["json", "jwt-debugger", "curl-converter", "diff-checker"]}
                />
            </main>

            <Footer />
        </div>
    );
}

