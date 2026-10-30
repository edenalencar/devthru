"use client"

import { useState, useTransition, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { ToolProCta } from "@/components/tools/tool-pro-cta"
import { CopyButton } from "@/components/copy-button"
import { generateBarcodeSVG, calculateEan13Checksum, validateEan13 } from "@/lib/utils/generators/barcode"
import { sendGTMEvent } from "@/lib/gtm"
import { toast } from "sonner"
import { 
    Barcode, 
    Download, 
    CheckCircle2, 
    AlertCircle, 
    Sparkles, 
    Printer, 
    Layers, 
    Tag,
    Copy
} from "lucide-react"

export function BarcodeGeneratorPage() {
    const [type, setType] = useState<'ean13' | 'code128'>('ean13');
    const [value, setValue] = useState("7891000315507");
    const [barHeight, setBarHeight] = useState(90);
    const [barWidth, setBarWidth] = useState(2);
    const [showText, setShowText] = useState(true);

    const barcodeData = useMemo(() => {
        return generateBarcodeSVG({
            type,
            value,
            height: barHeight,
            width: barWidth,
            showText
        });
    }, [type, value, barHeight, barWidth, showText]);

    const isEan13Valid = useMemo(() => {
        if (type !== 'ean13') return true;
        const clean = value.replace(/\D/g, "");
        if (clean.length === 12) return true; // Pode autocompletar
        return validateEan13(clean);
    }, [type, value]);

    const handleAutoChecksum = () => {
        const clean = value.replace(/\D/g, "");
        if (clean.length === 12) {
            const dv = calculateEan13Checksum(clean);
            setValue(`${clean}${dv}`);
            toast.success(`Dígito verificador (${dv}) calculado e anexado!`);
        } else if (clean.length === 13) {
            const base12 = clean.substring(0, 12);
            const dv = calculateEan13Checksum(base12);
            setValue(`${base12}${dv}`);
            toast.success(`Dígito verificador recalculado: ${dv}`);
        } else {
            toast.error("Para calcular o DV do EAN-13, digite pelo menos 12 números.");
        }
    };

    const loadPreset = (preset: 'br-789' | 'br-790' | 'logistics') => {
        if (preset === 'br-789') {
            setType('ean13');
            const randomCode = `789${Math.floor(100000000 + Math.random() * 900000000)}`;
            const dv = calculateEan13Checksum(randomCode);
            setValue(`${randomCode}${dv}`);
            toast.info("Código EAN-13 brasileiro (prefixo 789) gerado!");
        } else if (preset === 'br-790') {
            setType('ean13');
            const randomCode = `790${Math.floor(100000000 + Math.random() * 900000000)}`;
            const dv = calculateEan13Checksum(randomCode);
            setValue(`${randomCode}${dv}`);
            toast.info("Código EAN-13 brasileiro (prefixo 790) gerado!");
        } else if (preset === 'logistics') {
            setType('code128');
            setValue(`DEVTHRU-${Math.floor(100000 + Math.random() * 900000)}-BR`);
            toast.info("Código Code 128 de logística gerado!");
        }

        sendGTMEvent({
            event: 'tool_interaction',
            tool_name: 'barcode-generator',
            tool_action: 'load_preset',
            tool_category: 'utilities',
            preset
        });
    };

    const downloadSVG = () => {
        if (!barcodeData.isValid || !barcodeData.svg) {
            toast.error("Código de barras inválido para download.");
            return;
        }

        const blob = new Blob([barcodeData.svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `barcode-${barcodeData.formattedValue}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Download do SVG concluído!");

        sendGTMEvent({
            event: 'tool_interaction',
            tool_name: 'barcode-generator',
            tool_action: 'download_svg',
            tool_category: 'utilities'
        });
    };

    const downloadPNG = () => {
        if (!barcodeData.isValid || !barcodeData.svg) {
            toast.error("Código de barras inválido para download.");
            return;
        }

        const img = new Image();
        const svgBlob = new Blob([barcodeData.svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width * 2; // Alta resolução (2x scale)
            canvas.height = img.height * 2;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.scale(2, 2);
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, img.width, img.height);
                ctx.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = pngUrl;
                link.download = `barcode-${barcodeData.formattedValue}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success("Download do PNG em alta resolução concluído!");
            }
            URL.revokeObjectURL(url);
        };
        img.src = url;

        sendGTMEvent({
            event: 'tool_interaction',
            tool_name: 'barcode-generator',
            tool_action: 'download_png',
            tool_category: 'utilities'
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            
            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Utilidades", href: "/#utilidades" },
                        { label: "Gerador de Código de Barras", href: "/tools/utilities/barcode-generator" }
                    ]}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Padrão GS1 Brasil & Code 128</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                            Gerador de Código de Barras
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">
                            Gere e baixe códigos de barras EAN-13 comerciais e Code 128 com cálculo de dígito verificador e exportação em SVG e PNG.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <ShareButtons title="Gerador de Código de Barras EAN-13 e Code 128" />
                    </div>
                </div>

                {/* Toolbar de Presets Rápidos */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/30 p-3 rounded-lg border border-border/60 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Exemplos Prontos:</span>
                        <Button onClick={() => loadPreset('br-789')} variant="outline" size="sm" className="text-xs h-8">
                            Produto Brasil (789)
                        </Button>
                        <Button onClick={() => loadPreset('br-790')} variant="outline" size="sm" className="text-xs h-8">
                            Produto Brasil (790)
                        </Button>
                        <Button onClick={() => loadPreset('logistics')} variant="outline" size="sm" className="text-xs h-8">
                            Etiqueta Logística (Code 128)
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Painel de Configurações (Esquerda) */}
                    <div className="lg:col-span-5 space-y-4">
                        <Card className="border-border/60">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Barcode className="w-4 h-4 text-primary" />
                                    <span>Configurações do Código</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Seletor de Tipo */}
                                <div>
                                    <Label className="text-xs font-semibold mb-2 block">Padrão do Código</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant={type === 'ean13' ? "default" : "outline"}
                                            onClick={() => {
                                                setType('ean13');
                                                setValue("7891000315507");
                                            }}
                                            className="text-xs font-semibold"
                                        >
                                            EAN-13 (Comércio/Varejo)
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant={type === 'code128' ? "default" : "outline"}
                                            onClick={() => {
                                                setType('code128');
                                                setValue("DEVTHRU-PACK-2026");
                                            }}
                                            className="text-xs font-semibold"
                                        >
                                            Code 128 (Logística)
                                        </Button>
                                    </div>
                                </div>

                                {/* Campo de Entrada */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <Label htmlFor="barcode-value" className="text-xs font-semibold">
                                            {type === 'ean13' ? "Código EAN-13 (12 ou 13 dígitos)" : "Texto / Código Alfanumérico"}
                                        </Label>
                                        {type === 'ean13' && (
                                            <button
                                                type="button"
                                                onClick={handleAutoChecksum}
                                                className="text-xs text-primary hover:underline font-medium"
                                            >
                                                Auto-Calcular DV
                                            </button>
                                        )}
                                    </div>
                                    <Input
                                        id="barcode-value"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder={type === 'ean13' ? "7891234567890" : "CODIGO-123"}
                                        className="font-mono text-sm"
                                    />
                                    {type === 'ean13' && !isEan13Valid && (
                                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1 font-medium">
                                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                            Dígito verificador inválido ou tamanho incorreto.
                                        </p>
                                    )}
                                </div>

                                {/* Customização Visual */}
                                <div className="pt-2 border-t space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-medium">Altura das Barras ({barHeight}px)</Label>
                                        <input
                                            type="range"
                                            min="40"
                                            max="150"
                                            value={barHeight}
                                            onChange={(e) => setBarHeight(parseInt(e.target.value, 10))}
                                            className="w-32"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-medium">Exibir Código em Texto</Label>
                                        <input
                                            type="checkbox"
                                            checked={showText}
                                            onChange={(e) => setShowText(e.target.checked)}
                                            className="rounded h-4 w-4 text-primary"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview e Downloads (Direita) */}
                    <div className="lg:col-span-7 space-y-4">
                        <Card className="border-border/60">
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-base font-semibold">Visualização do Código</CardTitle>
                                    <CardDescription className="text-xs">
                                        Renderização vetorial com alta definição e legibilidade ótica
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CopyButton text={barcodeData.formattedValue} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Área de Renderização Branca */}
                                <div className="p-8 bg-white rounded-xl border border-border/80 flex items-center justify-center min-h-[220px] overflow-x-auto shadow-inner">
                                    {barcodeData.isValid && barcodeData.svg ? (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: barcodeData.svg }} 
                                            className="max-w-full"
                                        />
                                    ) : (
                                        <div className="text-center text-muted-foreground p-4">
                                            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2 opacity-80" />
                                            <p className="text-xs font-medium text-foreground">Código de Barras Inválido</p>
                                            <p className="text-[11px] text-muted-foreground">Verifique se o valor atende aos requisitos do padrão selecionado.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Botões de Exportação */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Button 
                                        onClick={downloadPNG} 
                                        className="font-semibold gap-2 w-full"
                                        disabled={!barcodeData.isValid}
                                    >
                                        <Download className="w-4 h-4" />
                                        Baixar Imagem PNG (Alta Resolução)
                                    </Button>

                                    <Button 
                                        onClick={downloadSVG} 
                                        variant="outline"
                                        className="font-semibold gap-2 w-full"
                                        disabled={!barcodeData.isValid}
                                    >
                                        <Download className="w-4 h-4" />
                                        Baixar Vetor SVG (Gráfica)
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Call to Action PRO */}
                <ToolProCta
                    toolName="Gerador de Código de Barras"
                    badge="Logística & E-commerce"
                    title="Precisa gerar códigos de barras em lote para seu catálogo?"
                    description="Gere etiquetas em grande volume para estoque, cadastro de produtos e emissão de notas fiscais com exportação direta para CSV, planilhas e nossa API."
                />

                {/* Seção de FAQ E-E-A-T */}
                <ToolFaqSection
                    toolSlug="barcode-generator"
                    title="Perguntas Frequentes sobre Códigos de Barras EAN-13"
                />

                {/* Ferramentas Relacionadas */}
                <RelatedTools
                    currentToolSlug="barcode-generator"
                    category="utilities"
                    customSlugs={["qrcode", "nfe-decoder", "boleto-validator", "boleto-generator"]}
                />
            </main>

            <Footer />
        </div>
    );
}
