'use client'

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    const faqs = [
        {
            question: "O DevHub Tools é gratuito?",
            answer: "Sim! A maioria das ferramentas é totalmente gratuita para uso ilimitado. Oferecemos planos pagos apenas para acesso avançado à API e recursos de equipe."
        },
        {
            question: "Os dados gerados são reais?",
            answer: "Não. Todos os dados gerados (CPFs, CNPJs, nomes, cartões de crédito) são fictícios e gerados algoritmicamente apenas para fins de teste e desenvolvimento. Eles não pertencem a pessoas reais."
        },
        {
            question: "Posso usar a API no meu projeto?",
            answer: "Sim, oferecemos uma API pública gratuita com limites de uso. Para volumes maiores, consulte nossos planos de preços."
        },
        {
            question: "Como faço para reportar um bug?",
            answer: "Você pode entrar em contato através da nossa página de contato ou abrir uma issue no nosso repositório do GitHub."
        },
        {
            question: "Vocês salvam os dados que eu gero?",
            answer: "Não salvamos os dados gerados, exceto se você explicitamente clicar em 'Salvar no Histórico' estando logado. Mesmo assim, os dados são seus e podem ser excluídos a qualquer momento."
        },
        {
            question: "Posso sugerir uma nova ferramenta?",
            answer: "Com certeza! Adoramos receber sugestões da comunidade. Envie sua ideia através da página de contato."
        }
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
                    <p className="text-xl text-muted-foreground">
                        Tire suas dúvidas sobre o DevHub Tools
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
