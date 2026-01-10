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
                            <CardTitle>Sobre o Gerador de Certificados</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Certificados permite criar documentos profissionais para cursos, workshops e eventos.
                                Você pode personalizar o nome do aluno, curso, instrutor e organização, gerando um arquivo PDF pronto para impressão.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> O certificado gerado é um modelo visual e não possui validação acadêmica oficial, a menos que emitido por uma instituição credenciada.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
