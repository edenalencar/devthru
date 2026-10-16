"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Award, Download } from "lucide-react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"

export function CertificateGeneratorPage() {
    const [recipientName, setRecipientName] = useState("Nome do Aluno")
    const [courseName, setCourseName] = useState("Curso de Exemplo")
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [instructorName, setInstructorName] = useState("Nome do Instrutor")
    const [organization, setOrganization] = useState("DevHub Tools Academy")

    const certificateRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!certificateRef.current) return

        try {
            // Wait for fonts/images to fully load if needed, though toPng usually handles it.
            // fontEmbedCSS: "" is a workaround for "SecurityError: Failed to read the 'cssRules' property"
            // This prevents the library from trying to parse external stylesheets for fonts, which causes CORS issues.
            const dataUrl = await toPng(certificateRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                fontEmbedCSS: ""
            })

            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            })
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()

            // Calculate dimensions to fit ratio
            // But here we want to fit the A4 landscape specifically
            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
            pdf.save("certificado.pdf")
            toast.success("Certificado baixado com sucesso")
        } catch (error: any) {
            console.error("Error generating PDF:", error)
            toast.error(`Erro ao gerar PDF: ${error.message || "Erro desconhecido"}`)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Documentos Pessoais" }, { "label": "Certificados" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Certificados</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Crie certificados profissionais personalizados para cursos e eventos.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Controls */}
                        <Card className="lg:col-span-1 h-fit">
                            <CardHeader>
                                <CardTitle>Dados do Certificado</CardTitle>
                                <CardDescription>
                                    Preencha as informações
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recipient">Nome do Aluno</Label>
                                    <Input id="recipient" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="course">Nome do Curso/Evento</Label>
                                    <Input id="course" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="organization">Organização</Label>
                                    <Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instructor">Nome do Instrutor</Label>
                                    <Input id="instructor" value={instructorName} onChange={(e) => setInstructorName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Data</Label>
                                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>

                                <Button onClick={handleDownload} className="w-full mt-4">
                                    <Download className="mr-2 h-4 w-4" /> Baixar PDF
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <div className="lg:col-span-2 overflow-auto">
                            <div
                                ref={certificateRef}
                                className="bg-white text-black p-12 border shadow-lg min-w-[800px] aspect-[1.414/1] relative flex flex-col items-center justify-center text-center"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at center, #fff 0%, #f3f4f6 100%)',
                                }}
                            >
                                {/* Border Decoration */}
                                <div className="absolute inset-4 border-4 border-double border-yellow-600 pointer-events-none"></div>
                                <div className="absolute inset-6 border border-yellow-600 pointer-events-none"></div>

                                {/* Content */}
                                <div className="z-10 space-y-8 max-w-2xl">
                                    <div className="space-y-2">
                                        <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                                        <h2 className="text-5xl font-serif font-bold text-gray-900 tracking-wide uppercase">Certificado</h2>
                                        <p className="text-xl text-gray-600 font-serif italic">de Conclusão</p>
                                    </div>

                                    <div className="space-y-4 py-8">
                                        <p className="text-lg text-gray-600">Certificamos que</p>
                                        <h3 className="text-4xl font-bold text-gray-900 font-serif border-b-2 border-gray-300 pb-2 px-8 inline-block min-w-[400px]">
                                            {recipientName}
                                        </h3>
                                        <p className="text-lg text-gray-600 mt-4">
                                            concluiu com êxito o curso de
                                        </p>
                                        <h4 className="text-3xl font-bold text-primary font-serif">
                                            {courseName}
                                        </h4>
                                        <p className="text-lg text-gray-600">
                                            oferecido por <strong>{organization}</strong> em {new Date(date).toLocaleDateString('pt-BR')}.
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end w-full pt-12 px-12">
                                        <div className="text-center">
                                            <div className="border-t border-gray-400 w-48 mx-auto pt-2">
                                                <p className="font-bold text-gray-900">{new Date(date).toLocaleDateString('pt-BR')}</p>
                                                <p className="text-sm text-gray-500">Data</p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="border-t border-gray-400 w-48 mx-auto pt-2">
                                                <p className="font-bold text-gray-900">{instructorName}</p>
                                                <p className="text-sm text-gray-500">Instrutor</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Certificados de Conclusão</CardTitle>
                            <CardDescription>
                                Ferramenta online gratuita para criar, personalizar e exportar certificados profissionais em PDF e imagem de alta resolução.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert space-y-4">
                                <p>
                                    O <strong>Gerador de Certificados do DevThru</strong> foi projetado tanto para instrutores, organizadores de workshops e criadores de cursos livres quanto para <strong>desenvolvedores de software</strong> que precisam de modelos confiáveis para simular fluxos de emissão de certificados em plataformas LMS (Learning Management Systems), portais de membros e sistemas educacionais.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 not-prose">
                                    <div className="p-4 rounded-lg border bg-muted/40">
                                        <h4 className="font-semibold text-sm mb-1 text-foreground">📄 Padrão A4 Paisagem</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Proporção 297x210mm calibrada para exportação em PDF e impressão direta em gráficas ou impressoras convencionais.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-muted/40">
                                        <h4 className="font-semibold text-sm mb-1 text-foreground">⚡ Exportação em Alta Resolução</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Renderização vetorial com densidade de pixels 2x para garantir textos nítidos e bordas de assinatura bem delineadas.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-muted/40">
                                        <h4 className="font-semibold text-sm mb-1 text-foreground">🔒 Privacidade e Segurança</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Processamento 100% no navegador do cliente (client-side). Nenhum dado pessoal ou nome de aluno é enviado a servidores externos.
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold pt-2 text-foreground">Validade Jurídica de Certificados de Cursos Livres</h3>
                                <p>
                                    No Brasil, os <strong>cursos livres</strong> são amparados pela <em>Lei de Diretrizes e Bases da Educação Nacional (Lei nº 9.394/96)</em> e pelo <em>Decreto Presidencial nº 5.154/04</em>. Eles não dependem de autorização prévia do MEC (Ministério da Educação) e os certificados emitidos possuem validade legal em todo o território nacional para:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Comprovação de horas complementares em cursos técnicos, graduações e faculdades;</li>
                                    <li>Enriquecimento de currículo profissional e comprovação de qualificações no LinkedIn;</li>
                                    <li>Pontuação em processos seletivos simplificados e provas de títulos que aceitem cursos de capacitação livre;</li>
                                    <li>Treinamentos corporativos internos e homologação de competências operacionais.</li>
                                </ul>

                                <h3 className="text-lg font-semibold pt-2 text-foreground">Guia para Desenvolvedores: Testando Pipelines de Geração de PDF</h3>
                                <p>
                                    Integrar renderização de documentos dinâmicos em aplicações web exige atenção a armadilhas comuns. Utilize este modelo para validar:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li><strong>Tratamento de nomes longos:</strong> Valide se nomes com mais de 40 caracteres causam quebra indevida de layout ou sobreposição com a borda decorativa.</li>
                                    <li><strong>CORS em fontes web e imagens:</strong> Na geração via canvas (html-to-image/html2canvas), certifique-se de que fontes do Google Fonts ou assets estáticos possuem cabeçalhos <code>Access-Control-Allow-Origin</code> liberados para evitar erros de renderização.</li>
                                    <li><strong>Compactação de arquivos:</strong> Ao salvar em PDF via bibliotecas como <code>jsPDF</code>, avalie o equilíbrio entre qualidade do DPI e o peso final do documento para envios automatizados por e-mail (Resend, SendGrid).</li>
                                </ul>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Certificados"
                                    description="Crie certificados profissionais personalizados em PDF."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="certificate-generator" />
                    <RelatedTools currentToolSlug="certificate-generator" category="documents" />
                </div>
            </main>

        </div>
    )
}
