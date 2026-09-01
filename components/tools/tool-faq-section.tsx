"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TOOL_FAQS, FAQItem } from "@/lib/seo/faqs"
import { HelpCircle } from "lucide-react"

interface ToolFaqSectionProps {
    toolSlug?: string
    customFaqs?: FAQItem[]
    title?: string
    description?: string
    children?: React.ReactNode
    className?: string
}

export function ToolFaqSection({
    toolSlug,
    customFaqs,
    title = "Perguntas Frequentes (FAQ)",
    description,
    children,
    className
}: ToolFaqSectionProps) {
    const faqs = customFaqs || (toolSlug ? TOOL_FAQS[toolSlug] : undefined)

    if (!faqs || faqs.length === 0) {
        if (!children) return null
    }

    return (
        <Card className={`mt-8 border-border/60 shadow-sm ${className || ""}`}>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <span>{title}</span>
                </CardTitle>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {faqs && faqs.length > 0 && (
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-sm sm:text-base hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        {children}
                    </Accordion>
                )}
                {(!faqs || faqs.length === 0) && children}
            </CardContent>
        </Card>
    )
}
