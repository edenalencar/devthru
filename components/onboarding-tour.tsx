"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Rocket, Search, LayoutGrid } from "lucide-react"

export function OnboardingTour() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const hasSeenTour = localStorage.getItem("devhubtools-tour-seen")
        if (!hasSeenTour) {
            // Small delay to not overwhelm the user immediately
            const timer = setTimeout(() => setOpen(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setOpen(false)
        localStorage.setItem("devhubtools-tour-seen", "true")
    }

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1)
        } else {
            handleClose()
        }
    }

    const steps = [
        {
            title: "Bem-vindo ao DevTools Hub!",
            description: "Sua coleção completa de ferramentas de desenvolvimento em um só lugar. Vamos fazer um tour rápido?",
            icon: Rocket,
        },
        {
            title: "Busca Global",
            description: "Pressione Ctrl+K (ou Cmd+K) a qualquer momento para abrir a busca global e encontrar ferramentas rapidamente.",
            icon: Search,
        },
        {
            title: "Categorias",
            description: "Explore ferramentas organizadas por categorias como Desenvolvimento, Imagem, Conversores e Documentos.",
            icon: LayoutGrid,
        },
    ]

    const CurrentIcon = steps[step].icon

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <CurrentIcon className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <DialogTitle className="text-center">{steps[step].title}</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        {steps[step].description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                    <div className="flex justify-center w-full gap-1 mb-2 sm:mb-0 sm:w-auto sm:justify-start">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 w-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <Button variant="ghost" onClick={handleClose}>
                            Pular
                        </Button>
                        <Button onClick={handleNext}>
                            {step === steps.length - 1 ? "Começar" : "Próximo"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
