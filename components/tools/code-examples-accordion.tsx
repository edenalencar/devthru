"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

export interface CodeExample {
    language: string
    label: string
    code: string
}

interface CodeExamplesAccordionProps {
    title?: string
    examples: CodeExample[]
    value?: string
}

export function CodeExamplesAccordion({
    title = "Como implementar programaticamente? (Exemplos de Código)",
    examples,
    value = "code-examples"
}: CodeExamplesAccordionProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const handleCopy = async (code: string, index: number) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopiedIndex(index)
            setTimeout(() => setCopiedIndex(null), 2000)
        } catch (err) {
            console.error("Falha ao copiar código", err)
        }
    }

    if (!examples || examples.length === 0) return null

    return (
        <AccordionItem value={value}>
            <AccordionTrigger className="text-left font-semibold text-foreground">
                {title}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
                <Tabs defaultValue={examples[0].language} className="w-full">
                    <div className="flex items-center justify-between border-b pb-2 mb-4">
                        <TabsList className="bg-muted/50 p-0.5 h-auto">
                            {examples.map((example) => (
                                <TabsTrigger
                                    key={example.language}
                                    value={example.language}
                                    className="px-3 py-1.5 text-xs h-7 data-[state=active]:bg-background"
                                >
                                    {example.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                            Snippets prontos para uso
                        </span>
                    </div>

                    {examples.map((example, index) => (
                        <TabsContent key={example.language} value={example.language} className="mt-0 outline-none">
                            <div className="relative rounded-lg overflow-hidden border border-border bg-slate-950 dark:bg-slate-900 font-mono text-sm">
                                <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900/50 dark:bg-slate-900 border-b border-white/5">
                                    <span className="text-xs font-semibold text-slate-400">
                                        exemplo.{example.language === "javascript" ? "js" : example.language === "python" ? "py" : example.language === "csharp" ? "cs" : "java"}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10"
                                        onClick={() => handleCopy(example.code, index)}
                                    >
                                        {copiedIndex === index ? (
                                            <Check className="h-3.5 w-3.5 text-green-500" />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5" />
                                        )}
                                        <span className="sr-only">Copiar código</span>
                                    </Button>
                                </div>
                                <div className="p-4 overflow-x-auto text-xs leading-relaxed text-slate-200">
                                    <pre className="m-0">
                                        <code>{example.code}</code>
                                    </pre>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </AccordionContent>
        </AccordionItem>
    )
}
