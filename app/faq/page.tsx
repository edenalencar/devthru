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
            question: "O DevThru é gratuito?",
            answer: "Temos um plano gratuito muito generoso! Você pode usar todas as ferramentas individualmente sem custo. Para geração em massa (mais de 5 itens), exportação de arquivos e histórico ilimitado, oferecemos o plano Pro."
        },
        {
            question: "Quais as vantagens do plano Pro?",
            answer: "O plano Pro desbloqueia o poder total da plataforma: geração de até 1.000 itens de uma vez, exportação para CSV e JSON, salvamento de configurações favoritas e acesso ao histórico completo de gerações."
        },
        {
            question: "O plano Business inclui acesso à API?",
            answer: "Sim! O acesso à nossa API RESTful é exclusivo para assinantes Business. Com ele, você pode integrar nossos geradores e validadores diretamente no seu software ou pipeline de testes automatizados, com SLA garantido e suporte prioritário."
        },
        {
            question: "Os dados gerados são válidos?",
            answer: "Os dados (CPFs, CNPJs, Cartões) são matematicamente válidos (passam nos algoritmos de validação), mas são fictícios. Eles não pertencem a pessoas ou empresas reais e devem ser usados apenas para desenvolvimento e testes (QA)."
        },
        {
            question: "Como funciona o Trial de 7 dias?",
            answer: "Ao criar sua conta, você recebe automaticamente 7 dias de acesso total ao plano Pro (sem precisar cadastrar cartão). Após esse período, sua conta volta para o plano Gratuito automaticamente, a menos que você decida assinar."
        },
        {
            question: "Posso cancelar a qualquer momento?",
            answer: "Sim. Você pode cancelar sua assinatura a qualquer momento diretamente pelo seu painel de usuário. O acesso aos recursos premium continuará ativo até o fim do período já pago."
        },
        {
            question: "Vocês salvam meus dados?",
            answer: "Prezamos pela privacidade. Não salvamos os dados gerados, a menos que você explicitamente use a função de 'Histórico' (disponível no Pro). Seus dados de pagamento são processados de forma segura pelo Stripe e não passam pelos nossos servidores."
        }
    ]

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
