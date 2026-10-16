'use client'

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { FAQS_DATA } from "./faqs-data"

export function FAQPage() {
    const faqs = FAQS_DATA

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
                    <p className="text-xl text-muted-foreground">
                        Tire suas dúvidas sobre o DevThru
                    </p>
                </div>

                <div className="bg-card border rounded-lg p-6 md:p-8">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-medium">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>

            <Footer />
        </div>
    )
}
