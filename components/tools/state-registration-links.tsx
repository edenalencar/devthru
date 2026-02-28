import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { IE_STATES } from '@/lib/utils/validators/inscricao-estadual'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function StateRegistrationLinks() {
    return (
        <section className="mb-8">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="states-list" className="border rounded-lg px-4 bg-muted/20">
                    <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg text-left">
                                Ver geradores por Estado (27 UFs)
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-4 pb-2">
                            {IE_STATES.map((state) => (
                                <Link
                                    key={state.uf}
                                    href={`/ferramentas/inscricao-estadual/${state.uf.toLowerCase()}`}
                                    className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
                                    prefetch={false}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative w-8 h-6 overflow-hidden rounded shadow-sm border border-black/10 flex-shrink-0">
                                            <Image
                                                src={`/flags/${state.uf.toLowerCase()}.svg`}
                                                alt={`Bandeira do estado de ${state.name}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="font-medium text-sm truncate">{state.name}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded group-hover:bg-background transition-colors ml-2 flex-shrink-0">
                                        {state.uf}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
