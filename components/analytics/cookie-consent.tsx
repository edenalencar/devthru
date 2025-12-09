"use client"

import * as React from "react"
import { Cookie, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// Helper to safely call gtag
function gtag(...args: any[]) {
    if (typeof window === "undefined") return

    window.dataLayer = window.dataLayer || []

    if (!window.gtag) {
        window.gtag = function (...args: any[]) {
            window.dataLayer.push(args)
        }
    }

    window.gtag(...args)
}
type ConsentState = {
    ad_storage: "granted" | "denied"
    analytics_storage: "granted" | "denied"
    ad_user_data: "granted" | "denied"
    ad_personalization: "granted" | "denied"
}

export function CookieConsent() {
    const [open, setOpen] = React.useState(false)
    const [showBanner, setShowBanner] = React.useState(false)

    // Default preferences (all enabled for simple UX, but user can toggle off)
    const [preferences, setPreferences] = React.useState<ConsentState>({
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
    })

    React.useEffect(() => {
        // Check if consent is already saved
        const savedConsent = localStorage.getItem("cookie_consent")
        if (!savedConsent) {
            setShowBanner(true)
            // Set default denied for GTM
            gtag("consent", "default", {
                ad_storage: "denied",
                analytics_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
            })
        } else {
            // Restore consent
            const consent = JSON.parse(savedConsent)
            gtag("consent", "update", consent)
        }
    }, [])

    const handleAcceptAll = () => {
        const allGranted: ConsentState = {
            ad_storage: "granted",
            analytics_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
        }
        saveConsent(allGranted)
    }

    const handleSavePreferences = () => {
        saveConsent(preferences)
        setOpen(false)
    }

    const saveConsent = (consent: ConsentState) => {
        localStorage.setItem("cookie_consent", JSON.stringify(consent))
        gtag("consent", "update", consent)
        setShowBanner(false)
    }

    if (!showBanner) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 md:p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex-1 space-y-2 text-center md:text-left">
                    <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
                        <Cookie className="h-5 w-5 text-primary" />
                        Sua privacidade importa
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Utilizamos cookies para personalizar sua experiência, gerar estatísticas de acesso e garantir o funcionamento seguro do nosso site.
                        Você pode aceitar todos ou configurar suas preferências.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Personalizar
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Preferências de Cookies</DialogTitle>
                                <DialogDescription>
                                    Gerencie suas preferências de consentimento para as tecnologias de rastreamento que utilizamos.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="flex flex-col space-y-1">
                                        <Label htmlFor="necessary" className="font-semibold">Essenciais (Sempre Ativo)</Label>
                                        <span className="text-xs text-muted-foreground">Necessários para o site funcionar.</span>
                                    </div>
                                    <Switch id="necessary" checked disabled />
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                    <div className="flex flex-col space-y-1">
                                        <Label htmlFor="analytics" className="font-semibold">Analíticos</Label>
                                        <span className="text-xs text-muted-foreground">Estatísticas de uso (Analytics).</span>
                                    </div>
                                    <Switch
                                        id="analytics"
                                        checked={preferences.analytics_storage === "granted"}
                                        onCheckedChange={(c) => setPreferences(prev => ({ ...prev, analytics_storage: c ? "granted" : "denied" }))}
                                    />
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                    <div className="flex flex-col space-y-1">
                                        <Label htmlFor="marketing" className="font-semibold">Marketing</Label>
                                        <span className="text-xs text-muted-foreground">Publicidade personalizada.</span>
                                    </div>
                                    <Switch
                                        id="marketing"
                                        checked={preferences.ad_storage === "granted"}
                                        onCheckedChange={(c) => {
                                            const status = c ? "granted" : "denied"
                                            setPreferences(prev => ({
                                                ...prev,
                                                ad_storage: status,
                                                ad_user_data: status,
                                                ad_personalization: status
                                            }))
                                        }}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSavePreferences} className="w-full">Salvar Preferências</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
                        Aceitar Todos
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Extend window interface
declare global {
    interface Window {
        dataLayer: any[]
        gtag: (...args: any[]) => void
    }
}
