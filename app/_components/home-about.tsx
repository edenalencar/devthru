import { ShieldCheck, Zap, Wrench } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const highlights = [
    {
        icon: Wrench,
        title: "Tudo num lugar só",
        text: "Geradores, validadores, conversores e calculadoras para CPF, CNPJ, cartões, NF‑e, JSON, datas e moedas, sem montar planilha nem escrever script.",
    },
    {
        icon: ShieldCheck,
        title: "Válidos, mas fictícios",
        text: "Os documentos seguem as regras de dígito verificador da Receita Federal e das SEFAZ, mas são criados ao acaso e não pertencem a ninguém.",
    },
    {
        icon: Zap,
        title: "Grátis e sem cadastro",
        text: "A maioria das ferramentas roda direto no navegador: o que você digita para validar ou converter fica no seu computador.",
    },
]

const questions = [
    {
        q: "O CPF ou CNPJ gerado pertence a alguém?",
        a: "Não. O número é sorteado e só os dígitos verificadores são calculados, por isso ele passa na validação de formulários e sistemas. A chance de coincidir com um documento real existe, mas ele não está ligado a nenhum cadastro feito pelo DevThru.",
    },
    {
        q: "Posso usar esses dados num cadastro de verdade?",
        a: "Não. Os dados servem para testar sistemas, preencher ambientes de homologação, treinar equipes e estudar as regras de cada documento. Usar um documento falso para se identificar ou abrir uma conta é crime.",
    },
    {
        q: "Preciso criar conta para usar?",
        a: "Não. Todas as ferramentas gratuitas funcionam sem login. A conta só é necessária para recursos do plano Pro, como gerar até 1.000 itens de uma vez, salvar configurações e consultar o histórico.",
    },
    {
        q: "Onde aprendo como cada cálculo funciona?",
        a: "No blog e nos guias. Eles explicam, passo a passo, o dígito verificador do CPF, do CNPJ e do RENAVAM, o algoritmo de Luhn dos cartões, a chave de acesso da NF-e e trazem exemplos de código em JavaScript, Python, Java e C#.",
    },
]

/** Bloco fixo abaixo da grade: dá contexto a quem chega pela busca. */
export function HomeAbout() {
    return (
        <section className="mt-20 border-t pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
                Por que usar o DevThru
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
                {highlights.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="rounded-xl border bg-card p-6">
                        <div className="mb-4 inline-flex p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-3xl mx-auto mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-center mb-6">Dúvidas frequentes</h2>
                <Accordion type="single" collapsible>
                    {questions.map(({ q, a }, i) => (
                        <AccordionItem key={q} value={`home-${i}`}>
                            <AccordionTrigger className="text-base">{q}</AccordionTrigger>
                            {/* forceMount: a resposta fica no HTML mesmo fechada, para os buscadores lerem */}
                            <AccordionContent forceMount className="text-base">
                                {a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
